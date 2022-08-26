// SPDX-FileCopyrightText: 2022 Digital Dasein <https://digital-dasein.gitlab.io/>
// SPDX-FileCopyrightText: 2022 Senne Van Baelen <senne@digitaldasein.org>
// SPDX-FileCopyrightText: 2022 Gerben Peeters <gerben@digitaldasein.org>
//
// SPDX-License-Identifier: MIT

// TODO:
// - add templates
// - write tests

use std::io::{self, Write, Seek, stdin, stdout, BufReader, prelude::*};
use std::path::Path;
use std::fs;
use std::env;
use std::process;
use std::iter::Iterator;
use chrono::Datelike;

use std::net::TcpStream;
use clap::{Parser, ArgEnum, Subcommand};
use anyhow::{Context, Result};
use git2::{Repository, Remote, PushOptions, RemoteCallbacks, Cred};
use walkdir::{WalkDir};
use glob::glob;
use ssh2::{Session};
//use zip::result::ZipError;
use zip::write::FileOptions;
use flate2::Compression;
use flate2::write::GzEncoder;
use rpassword::read_password;

// relative imports
mod css_vars;

/*---------------------------------------------------------------------
 * Config
 *---------------------------------------------------------------------*/

// default constants
const CREATE_OUTPUT_DIR_STR:&str = "./";
const DIR_LIB:&str = "./lib";
const DIR_STYLES:&str = "./styles";

const LIBCOMPONO_FNAME_OUT:&str = "libcompono.js";
const LIBCOMPONO_STR:&str = include_str!("../lib/libcompono/dist/libcompono.min.js");

const SHOWER_FNAME_OUT_JS:&str = "shower.js";
const SHOWER_STR_JS:&str = include_str!("../lib/libcompono/examples/shower/lib/shower/core/dist/shower.js");

const MATHJAX_SUBDIR:&str = "mathjax";
const MATHJAX_NAME_OUT:&str = "mathjax/tex-chtml.js";
const MATHJAX_JS_STR:&str = include_str!("../lib/mathjax/node_modules/mathjax/es5/tex-chtml.js");
const MATHJAX_FONT_DIR:&str = "output/chtml/fonts/woff-v2/";

const MATHJAX_FONT_FILES: &[(&str, &[u8])] = &include!("./mathjax_font_files.rs");

const SHOWER_FNAME_OUT_CSS:&str = "shower.css";
const SHOWER_STR_CSS:&str = include_str!("./styles/shower.css");

const SHOWER_FONT_BI:&[u8] = include_bytes!("./styles/fonts/roboto-bold-italic.woff2");
const SHOWER_FONT_B:&[u8] = include_bytes!("./styles/fonts/roboto-bold.woff2");
const SHOWER_FONT_I:&[u8] = include_bytes!("./styles/fonts/roboto-italic.woff2");
const SHOWER_FONT_L:&[u8] = include_bytes!("./styles/fonts/roboto-light.woff2");
const SHOWER_FONT_M:&[u8] = include_bytes!("./styles/fonts/roboto-mono-regular.woff2");
const SHOWER_FONT_R:&[u8] = include_bytes!("./styles/fonts/roboto-regular.woff2");
const SHOWER_PROGRESS_HTML:&str = r#"<div class="progress"></div>"#;

const HTML_MINIMAL:&str = include_str!("./templates/minimal.html");
const HTML_MINIMAL_VIM:&str = include_str!("./templates/minimal_vim.html");
const HTML_CSS_VARS:&str = include_str!("./templates/css_vars.html");
const HTML_EXAMPLE:&str = include_str!("./templates/example.html");

const HTML_DEFAULT_STYLE:&str = r#"@media print {@page {margin:0; size:1024px 576px;}}
      /* add custom style here (or in separate stylesheet) */"#;

const HTML_SAMPLE_VIDEO:&[u8] = include_bytes!("./assets/sample.mp4");
const HTML_VIDEO_DIR:&str = "videos";
const HTML_SAMPLE_LOGO:&[u8] = include_bytes!("./assets/logo.svg");
const HTML_IMG_DIR:&str = "img";

const CSS_ROBOTO:&str = include_str!("./styles/roboto_font.css");
const CSS_ROBOTO_INLINE:&str = include_str!("./styles/roboto_font_inline.css");
const CSS_ROBOTO_FNAME:&str = "roboto_font.css";
const CSS_DD_BASIC:&str = include_str!("./styles/dd_basic.css");
const CSS_DD_VARS:&str = include_str!("./styles/dd_vars.css");

const DEFAULT_SSH_KEY_PATH_STR:&str = "$HOME/.ssh/id_ed25519";
const DEFAULT_SSH_KEY_HOME:&str = ".ssh/id_ed25519";
const DEFAULT_SSH_KEY_PASSPHRASE:&str = "None";

const CI_COMMENT:&str = "# Compono CI config";
const GITHUB_CI:&str = include_str!("./ci-configs/github.yml");
const GITHUB_CI_PATH:&str = ".github/workflows/deploy.yml";

const GITLAB_CI:&str = include_str!("./ci-configs/gitlab.yml");
const GITLAB_CI_PATH:&str = ".gitlab-ci.yml";

const SCP_REMOTE_DIR:&str = "$HOME/<input-dir>";
const ARCHIVE_OUT_DIR:&str = "./";
const ARCHIVE_OUT_NAME:&str = "present-<date>";

const ZIP_METHOD_STORED:zip::CompressionMethod = zip::CompressionMethod::Stored;
const ZIP_METHOD_DEFLATED:zip::CompressionMethod = zip::CompressionMethod::Deflated;


// CLI
#[derive(Parser)]
#[clap(author, version,  long_about = None)]
#[clap(propagate_version = true)]
#[clap(term_width = 80)]
/// A batteries-included utility for creating, publishing,
/// and archiving component-based HTML presentations
struct Cli {
    #[clap(subcommand)]
    command: Commands
}

#[derive(Subcommand)]
enum Commands {
    /// Initialise new HTML presentation
    #[clap(visible_aliases = &["init", "new"]) ]
    Create {
        /// Use HTML template for presentation.
        /// For a custom template path, see the `--template-path` option.
        #[clap(short='T', long, value_parser, arg_enum,
               default_value_t = Template::Minimal) ]
        template: Template,

        /// Path to custom HTML template.
        #[clap(short='p', long, value_parser)]
        template_path: Option<std::path::PathBuf>,

        /// filename HTML output
        #[clap(short, long, value_parser)]
        filename: Option<std::path::PathBuf>,

        /// Output directory path
        #[clap(short, long, value_parser, default_value=CREATE_OUTPUT_DIR_STR)]
        output_dir: std::path::PathBuf,

        /// Theme (CSS styles).
        /// For a custom css path, see the `--css-path` option.
        #[clap(short='t', long, value_parser, arg_enum,
               default_value_t = Stylesheet::None)
        ]
        theme: Stylesheet,

        /// Path to custom CSS stylesheet.
        #[clap(short='c', long, value_parser)]
        css_path: Option<std::path::PathBuf>,

        /// Include shower presentation javascript core
        #[clap(short, long, action)]
        shower: bool,

        /// Include mathjax engine for rendering math (LaTeX-like)
        #[clap(short, long, action)]
        mathjax: bool,

        /// Do not inline font binaries in CSS (applicable to most themes)
        #[clap(short, long, action)]
        no_inline_fonts: bool,
    },

    /// Publish HTML presentation
    #[clap(visible_aliases = &["pub"]) ]
    Publish {
        /// Path to presentation directory
        #[clap(short, long, value_parser, default_value="./")]
        input_dir: std::path::PathBuf,

        /// Path to SSH key for gitlab/github authentication
        #[clap(short, long, value_parser, default_value=DEFAULT_SSH_KEY_PATH_STR)]
        ssh_key: std::path::PathBuf,

        /// SSH passphrase for gitlab/github
        #[clap(short='p', long, value_parser, default_value=DEFAULT_SSH_KEY_PASSPHRASE)]
        ssh_pass: String,

        /// Remote endpoint (IP address/URL) (for `scp` method)
        #[clap(short, long, value_parser)]
        endpoint: Option<String>,

        /// Remote server username (for `scp` method)
        #[clap(short, long, value_parser)]
        username: Option<String>,

        /// Remote output directory (for `scp` method). Is directory does not
        /// exist, it will automatically be created.
        #[clap(short='o', long, value_parser, default_value=SCP_REMOTE_DIR)]
        output_dir: String,

        /// Git commit message when pushing to remote
        #[clap(short, long, value_parser,
               default_value="Publish HTML presentation")]
        commit: String,

        /// Publication method
        #[clap(short, long, value_parser, arg_enum,
               default_value_t = PubMethod::Auto) ]
        method: PubMethod,

        /// Determine which files to include for publishing. By default,
        /// the `src` tags in the index.html are checked.
        #[clap(short='I', long, value_parser, arg_enum,
               default_value_t = IncludeOpt::UseHtml) ]
        include: IncludeOpt,
    },

    /// Archive presentation (tar.gz or zip)
    #[clap(visible_aliases = &["zip, bundle"]) ]
    Archive {
        /// Path to presentation directory
        #[clap(short, long, value_parser, default_value="./")]
        input_dir: std::path::PathBuf,

        /// Output directory
        #[clap(short, long, value_parser, default_value=ARCHIVE_OUT_DIR)]
        output_dir: std::path::PathBuf,

        /// Output filename without extension
        #[clap(short, long, value_parser, default_value=ARCHIVE_OUT_NAME)]
        filename: String,

        /// Determine which files to include for publishing. By default,
        /// the `src` tags in the index.html are checked.
        #[clap(short='I', long, value_parser, arg_enum,
               default_value_t = IncludeOpt::UseHtml) ]
        include: IncludeOpt,

        /// Set archive and compression method (`zip-stored` = not compressed)
        #[clap(short='m', long, value_parser, arg_enum,
               default_value_t = ArchiveMethod::Tar) ]
        method: ArchiveMethod,
    }

}

#[derive(Clone, ArgEnum, Debug)]
enum Template {
    Minimal,
    MinimalVim,
    CssVars,
    Example,
    ExampleCssVars,
}

#[derive(Clone, ArgEnum, Debug)]
enum Stylesheet {
    None,
    DdVars,
    DdBasic,
}

#[derive(Clone, ArgEnum, Debug)]
enum UpdateHeaderOpt {
    Style,
    CssLink,
    JsSrc,
    JsSrcModule,
    JsSrcAsync
}

#[derive(Clone, ArgEnum, Debug)]
enum IncludeOpt {
    UseHtml,
    UseGitignore,
    All
}

#[derive(Clone, ArgEnum, Debug)]
enum PubMethod {
    Auto,
    Github,
    Gitlab,
    Scp
}

#[derive(Clone, ArgEnum, Debug)]
enum ArchiveMethod {
    Tar,
    Zip,
    ZipStored,
}

macro_rules! t {
    ($e:expr) => {
        match $e {
            Ok(e) => e,
            Err(e) => panic!("{} failed with {}", stringify!($e), e),
        }
    };
}

/*---------------------------------------------------------------------
 * Helper functinos
 *---------------------------------------------------------------------*/

fn zip_files<T>(
    v_files: & mut Vec::<String>,
    prefix: &str,
    writer: T,
    method: zip::CompressionMethod,
) -> zip::result::ZipResult<()>
where
    T: Write + Seek,
{
    let mut zip = zip::ZipWriter::new(writer);
    let options = FileOptions::default()
        .compression_method(method)
        .unix_permissions(0o755);

    let mut buffer = Vec::new();
    for entry in v_files {
        let path = Path::new(entry);
        let name = path.strip_prefix(Path::new(prefix)).unwrap();

        // Write file or directory explicitly
        // Some unzip tools unzip files with directory paths correctly, some do not!
        if path.is_file() {
            //println!("adding file {:?} as {:?} ...", path, name);
            #[allow(deprecated)]
            zip.start_file_from_path(name, options)?;
            let mut f = fs::File::open(path)?;

            f.read_to_end(&mut buffer)?;
            zip.write_all(&*buffer)?;
            buffer.clear();
        } else if !name.as_os_str().is_empty() {
            // Only if not root! Avoids path spec / warning
            // and mapname conversion failed error on unzip
            println!("adding dir {:?} as {:?} ...", path, name);
            #[allow(deprecated)]
            zip.add_directory_from_path(name, options)?;
        }
    }
    zip.finish()?;
    Result::Ok(())
}


fn tar_files(
    v_files: & mut Vec::<String>,
    tarfile: fs::File,
) -> Result<(), std::io::Error>
{
    let enc = GzEncoder::new(tarfile, Compression::default());
    let mut tar = tar::Builder::new(enc);

    for entry in v_files {
        let path = Path::new(entry);
        let mut file = fs::File::open(path).unwrap();
        tar.append_file(path, &mut file).unwrap();
    }

    Ok(())
}


fn check_dir_and_create(output_dir:&Path) -> Result<(), std::io::Error> {
    if !output_dir.exists(){
        let q_str = format!("The directory `{}` does not exist. \
Create it? ([n]/y): ", output_dir.display());
        stdout().flush().unwrap();
        let answer = user_input(&q_str);
        io::stdout().flush().unwrap();
        if answer == "y" || answer == "yes" {
            fs::create_dir_all(output_dir)?;
        } else {
            println!("Nevermind then, bye!");
            process::exit(1);
        }
    }

    Ok(())
}


fn add_font_files(styles_dir:std::path::PathBuf)
             -> Result<(), Box<dyn std::error::Error>> {
    let fonts_dir = styles_dir.join("fonts");
    fs::create_dir_all(fonts_dir.clone())?;

    let dir_font_bi = fonts_dir.join("roboto-bold-italic.woff2");
    fs::write(dir_font_bi.clone(), SHOWER_FONT_BI)
        .with_context(|| format!("Failed to write file `{}`",
                dir_font_bi.display()))?;
    let dir_font_b = fonts_dir.join("roboto-bold.woff2");
    fs::write(dir_font_b.clone(), SHOWER_FONT_B)
        .with_context(|| format!("Failed to write file `{}`",
                dir_font_b.display()))?;
    let dir_font_i = fonts_dir.join("roboto-italic.woff2");
    fs::write(dir_font_i.clone(), SHOWER_FONT_I)
        .with_context(|| format!("Failed to write file `{}`",
                dir_font_i.display()))?;
    let dir_font_r = fonts_dir.join("roboto-regular.woff2");
    fs::write(dir_font_r.clone(), SHOWER_FONT_R)
        .with_context(|| format!("Failed to write file `{}`",
                dir_font_r.display()))?;
    let dir_font_m = fonts_dir.join("roboto-mono-regular.woff2");
    fs::write(dir_font_m.clone(), SHOWER_FONT_M)
        .with_context(|| format!("Failed to write file `{}`",
                dir_font_m.display()))?;
    let dir_font_l = fonts_dir.join("roboto-light.woff2");
    fs::write(dir_font_l.clone(), SHOWER_FONT_L)
        .with_context(|| format!("Failed to write file `{}`",
                dir_font_l.display()))?;

    Ok(())
}

fn update_header(v_html:& mut Vec<String>, content:&str, part:UpdateHeaderOpt) {

    let new_header = match part {
        UpdateHeaderOpt::Style => {
            format!(r#"{0}
    <style>
      {1}
    </style>"#, v_html[0].trim(), content)
        },
        UpdateHeaderOpt::CssLink => {
            format!(r#"{0}
    <link rel="stylesheet" href="{1}/{2}">"#, v_html[0].trim(),
                                              DIR_STYLES, content)
        },
        UpdateHeaderOpt::JsSrc => {
            format!(r#"{0}
    <script src="{1}/{2}"></script>"#, v_html[0].trim(), DIR_LIB, content)
        },
        UpdateHeaderOpt::JsSrcModule => {
            format!(r#"{0}
    <script type="module" src="{1}/{2}"></script>"#, v_html[0].trim(),
                                                     DIR_LIB, content)
        }
        UpdateHeaderOpt::JsSrcAsync => {
            format!(r#"{0}
    <script async src="{1}/{2}"></script>"#, v_html[0].trim(),
                                             DIR_LIB, content)
        }

    };

    v_html[0] = new_header;

}

fn git_add(repo:&Repository, v_files: & mut Vec::<String>)
            -> Result<(), git2::Error> {

    let mut index = repo.index().expect("cannot get the Index file");

    //index.add_all(v_files.iter(), IndexAddOption::DEFAULT, None)?;

    for filestr in v_files.iter() {
        //index.add_path()?;
        let path = Path::new(filestr).strip_prefix("./").
            expect("Failed to strip prefix from file");
        index.add_path(path)?;
    }

    index.write()?;
    Ok(())
}


//fn git_commit(repo: &Repository, msg:&str) -> (Oid, Oid) {
fn git_commit(repo: &Repository, msg:&str) -> Result<(), git2::Error> {

    let mut index = t!(repo.index());

    let tree_id = t!(index.write_tree());
    let tree = t!(repo.find_tree(tree_id));
    let sig = t!(repo.signature());

    //let head = t!(repo.head());

    let head_id = match repo.refname_to_id("HEAD") {
        Ok(oid) => oid,
        Err(error) => panic!("Failed to get HEAD id, with error `{}`\n
======== HINTS ========
1. Make sure the remote branch is added, e.g., git remote add origin <remote>
2. Make sure to set your git upstream branch, e.g., to `main`.
You could, for instance, performan an (initial) state + commit + push \
to the remote origin, i.e.,:

    git add <some-file>
    git commit -m `initial`
    git push -u origin main

3. When a non-fastforwardable reference error occurs, make sure to fetch from \
remote first (using your own fetch strategy), e.g.:

    git pull origin main

======================", error),
    };

    //let head_id = t!(repo.refname_to_id("HEAD"));
    let parent = t!(repo.find_commit(head_id));
    //let msg = "Publish HTML presentation".to_string();
    t!(repo.commit(Some("HEAD"), &sig, &sig, &msg, &tree, &[&parent]));

    //(commit, tree_id)
    Ok(())
}

fn user_input(question:&str) -> String {

    let mut answer=String::new();
    print!("{}", question);
    let _=stdout().flush();
    stdin().read_line(&mut answer).expect("Did not enter a correct string");

    // trim newlines
    if let Some('\n')=answer.chars().next_back() {
        answer.pop();
    }
    if let Some('\r')=answer.chars().next_back() {
        answer.pop();
    }

    answer
}

fn in_gitignore(gitignore_path:&Path, entry:&Path)
                -> Result<bool, Box<dyn std::error::Error>> {

    /* could probably better read gitignore content one time and pass it as
     * arg in this function */

    if !gitignore_path.exists() {
        return Ok(false)
    }

    let gitignore_file = fs::File::open(gitignore_path)?;
    let gitignore_reader = BufReader::new(gitignore_file);

    for line in gitignore_reader.lines() {
        for git_entry in glob(&line?).expect("Failed to read glob pattern") {
            match git_entry {
                Ok(path) => {
                    if let Some(path_string) = path.to_str() {
                        if let Some(entry_str) = entry.to_str() {
                            if entry_str.contains(path_string) {
                                return Ok(true)
                            }
                        }
                    }

                },
                Err(e) => println!("{:?}", e),
            }
        }
    }

    Ok(false)
}


fn include_files(input_dir:&std::path::PathBuf,
                 method:&IncludeOpt,
                 v_files: & mut Vec::<String>)
                 -> Result<(), Box<dyn std::error::Error>>  {

    let walker = WalkDir::new(input_dir).into_iter()
                                        .filter_map(|e| e.ok());

    let html_file = Path::new(input_dir).join("index.html");
    let html_file_str = html_file.clone()
        .into_os_string()
        .into_string()
        .expect("Failed to convert html path to string");

    v_files.push(html_file_str);

    let gitignore_file = &Path::new(input_dir).join(".gitignore");

    let html_string = fs::read_to_string(&html_file)
            .with_context(|| format!("Failed to read file `{}`",
                                     html_file.display()))?;

    for entry in walker {
        if entry.file_type().is_file() {
            // check if actually used as src in index.html
            let in_html:bool = entry.file_name()
                .to_str()
                .map(|s| html_string.contains(s))
                .unwrap_or(false);

            // check if part of the .git path
            let is_git:bool = entry.path()
                .to_str()
                .map(|s| s.contains(".git"))
                .unwrap_or(false);

            // check if set in gitignore
            let in_gitignore:bool = in_gitignore(gitignore_file, entry.path())?;

            match method {
                IncludeOpt::All => {
                    if !is_git {
                        v_files.push(entry.path()
                            .to_str()
                            .expect("failed to convert entry to string")
                            .to_string());
                    }
                }

                IncludeOpt::UseGitignore => {
                    if !is_git && !in_gitignore {
                        v_files.push(entry.path()
                            .to_str()
                            .expect("failed to convert entry to string")
                            .to_string());
                    }
                }

                IncludeOpt::UseHtml => {
                    if !is_git && !in_gitignore  && in_html {
                        v_files.push(entry.path()
                            .to_str()
                            .expect("failed to convert entry to string")
                            .to_string());
                    }
                }
            };
        }
    }

    Ok(())
}

fn add_ci_configs(ci_path:&Path, ci_content:&str)
                  -> Result<(), Box<dyn std::error::Error>> {

    if ci_path.exists() {
        let ci_content_orig = std::fs::read_to_string(ci_path)
            .with_context(|| format!("Failed to read CI content from `{}`",
                                     ci_path.display()))?;
        if ci_content_orig.contains(CI_COMMENT) {
            println!("Using existing CI config from {}", ci_path.display());
        } else {
            println!("[WARNING] It seems a different CI config already exsists at {}",
                ci_path.display());
            println!("=> Feel free to adjust this file according to your needs. \
A minimalistic example (that can be included/modified) on how to publish a \
compono presentation:
========== CI config file ==========
{0}
====================================
To ignore this warning, add the comment `{1}` to your config",
                ci_content.trim(), CI_COMMENT);
        }
    } else {
        let ci = format!("{}\n{}", CI_COMMENT, ci_content);
        fs::write(ci_path, ci)
            .with_context(|| format!("Failed to write CI file `{}`",
                                     ci_path.display()))?;
    }

    Ok (())
}

fn encode_pages_url_from_ssh(cfg_remote_url:String) -> String {
    let v_split_at: Vec<&str> = cfg_remote_url.split("@").collect();
    let v_split_dot: Vec<&str> = v_split_at[1].split(".").collect();
    let v_split_colon: Vec<&str> = v_split_at[1].split(":").collect();
    let v_split_slash: Vec<&str> = v_split_colon[1].split("/").collect();

    format!("https://{0}.{1}.io/{2}",
        v_split_slash[0],
        v_split_dot[0],
        v_split_slash[1..].join("/")
        .replace(".git", "/"))
}

fn publish_to_git(input_dir:&std::path::PathBuf,
                  commit:&str,
                  method:&PubMethod,
                  ssh_key:&Path,
                  ssh_pass:&str,
                  v_files_incl: & mut Vec::<String>)
                  -> Result<(), Box<dyn std::error::Error>> {

    let repo = Repository::open(input_dir)
        .with_context(|| format!("Failed to open Git repository. Make sure your \
project in under git control (with a remote oriign)"))?;

    let cfg = repo.config()?;
    let cfg_remote_url:String = if let Ok(url) = cfg.get_entry("remote.origin.url"){
        url.value().unwrap().to_string()
    } else {
        "?".to_string()
    };

    let git_platform = match method {
        PubMethod::Auto => {
            if cfg_remote_url.contains("github"){ "github" }
            else if cfg_remote_url.contains("gitlab") { "gitlab" }
            else {
                println!("[ERROR] Failed to auto-detect git platform from remote URL");
                println!("[ERROR] Make sure your remote origin is set");
                process::exit(1);
            }
        },
        PubMethod::Gitlab => { "gitlab" },
        PubMethod::Github => { "github" },
        _ => { panic!("Method not recognized") }
    };

    match git_platform {
        "github" => {
            let ci_path = Path::new(input_dir).join(GITHUB_CI_PATH);
            fs::create_dir_all(ci_path.parent().unwrap())?;
            v_files_incl.push(ci_path.to_str().unwrap().to_string());
            add_ci_configs(&ci_path, GITHUB_CI)?;
        }
        "gitlab" => {
            let ci_path = Path::new(input_dir).join(GITLAB_CI_PATH);
            v_files_incl.push(ci_path.to_str().unwrap().to_string());
            add_ci_configs(&ci_path, GITLAB_CI)?;
        }
        _ => { panic!("Git platform not recognised") }
    }

    git_add(&repo, v_files_incl)?;
    //let (commit, three_id) = git_commit(&repo, &commit);
    git_commit(&repo, &commit)?;

    let mut cb = RemoteCallbacks::new();
    let mut push_opts = PushOptions::new();

    let head = repo.head().unwrap();
    let refspecs: &[&str] = &[head.name().unwrap()];

    // https://github.com/rust-lang/git2-rs/issues/823
    cb.credentials(|_url, username_from_url, _allowed_types| {
        Cred::ssh_key(
            username_from_url.unwrap(),
            None,
            ssh_key,
            Some(ssh_pass),
        )
    });

    push_opts.remote_callbacks(cb);

    //let pushOption: Option<&mut PushOptions<'_>> = Some(pushOpts);
    let mut remote:Remote = t!(repo.find_remote("origin"));

    // push
    println!("Pushing to {}...", git_platform);
    remote.push(refspecs, Some(&mut push_opts))
        .with_context(|| format!("Failed to push to remote repo. \
Make sure to provide proper SSH credentials by using options \
`--ssh-key` and/or `--ssh-pass`{}", ""))?;

    println!("Successfully published presentation!");

    // currently, github and gitlab require same encoding
    if cfg_remote_url.contains("@") {
        println!("Your slides will shortly be available at: {}",
            encode_pages_url_from_ssh(cfg_remote_url));
    }
    Ok(())
}

fn scp_upload_files(remote_endpoint:&Option<String>,
                    username:&Option<String>,
                    output_dir:&str,
                    ssh_key:&Path,
                    ssh_pass:&str,
                    v_files_incl: & mut Vec::<String>,
                    input_dir:&std::path::PathBuf)
                    -> Result<(), Box<dyn std::error::Error>> {

    println!("Initialising secure copy procedure (scp)...");

    // Connect to the local SSH server
    let endpoint_full = if let Some(endpoint) = remote_endpoint {
        format!("{}:22", endpoint)
    } else {
        format!("{}:22", user_input("Enter remote endpoint (IP/URL): "))
    };

    let uname = if let Some(usr) = username {
        usr.to_string()
    } else {
        user_input("Enter username: ")
    };


    let tcp = TcpStream::connect(&endpoint_full).unwrap();
    let mut sess = Session::new().unwrap();
    sess.set_tcp_stream(tcp);
    sess.handshake().unwrap();

    // First try to connect over SSH (preferred method)
    match sess.userauth_pubkey_file(&uname, None, ssh_key, Some(ssh_pass)) {
        Ok(e) => e,
        Err(e) => {
            println!("SSH authentication failed for remote endpoint {}",
                endpoint_full);
            println!("Reason: {}", e);
            print!("Try with password: ");
            stdout().flush().unwrap();
            let pw = read_password().unwrap();
            sess.userauth_password(&uname, &pw).unwrap()
        },
    }

    // create zip
    let odir_basename_str = if output_dir == SCP_REMOTE_DIR {
        let parent_dir = fs::canonicalize(input_dir).unwrap();
        parent_dir.file_name().unwrap().to_str().unwrap().to_string()
    } else {
        Path::new(output_dir).file_name().unwrap().to_str().unwrap().to_string()
    };

    let odir_str = if output_dir == SCP_REMOTE_DIR {
        Path::new("./").join(&odir_basename_str).to_str().unwrap().to_string()
    } else {
        Path::new(output_dir).to_str().unwrap().to_string()
    };

    let tar_o_str = format!("{}.tar.gz", &odir_basename_str);
    let tar_o_path = Path::new(&tar_o_str);
    let tar_o_file = fs::File::create(&tar_o_path).unwrap();

    //zip_files(v_files_incl, prefix, zip_o_file, ZIP_METHOD_DEFLATED)?;
    tar_files(v_files_incl, tar_o_file)?;

    // Write the file
    //let result = fs::read(zip_o).unwrap();
    let result = fs::read(tar_o_path).unwrap();
    //let mut remote_file = sess.scp_send(Path::new(&zip_o_str),
    //println!("{:?}", tar_o_fullpath);
    let mut remote_file = sess.scp_send(&tar_o_path,
        0o644, result.len() as u64, None)
        .expect("Failed to create file at remote endpoint. Make sure \
location exists");
    remote_file.write_all(&result)
        .expect("Failed to write file to remote server");

    // Close the channel and wait for the whole content to be tranferred
    remote_file.send_eof().unwrap();
    remote_file.wait_eof().unwrap();
    remote_file.close().unwrap();
    remote_file.wait_close().unwrap();

    // currently only for servers that support unzip (no OS checks)
    let mut channel = sess.channel_session().unwrap();
    let cmd_1 = format!("mkdir -p {0} && tar -xvf {1} -C {0} && rm -f {1}",
        odir_str,
        //tar_o_fullpath.to_str().unwrap(),
        tar_o_str);
    channel.exec(&cmd_1).unwrap();
    let mut s = String::new();
    channel.read_to_string(&mut s).unwrap();
    //println!("{}", s);
    channel.wait_close()?;
    if channel.exit_status().unwrap() == 0 {
        println!("Successfully copied presentation to remote server!
Your slides are available at remote location `{}`", odir_str);
    } else {
        println!("[ERROR] Command failed with exit status {0}
TIP: check permissions (\
e.g. you cannot perform operations on root-owned files when connected \
as non-root user)",
            channel.exit_status().unwrap());
    }

    fs::remove_file(tar_o_path)?;

    Ok(())
}

/*---------------------------------------------------------------------
 * Main functinos
 *---------------------------------------------------------------------*/

fn create_presentation(template:&Template,
                       template_path:&Option<std::path::PathBuf>,
                       theme:&Stylesheet,
                       css_path:&Option<std::path::PathBuf>,
                       output_dir:&std::path::PathBuf,
                       filename:&Option<std::path::PathBuf>,
                       shower:&bool,
                       mathjax:&bool,
                       no_inline_fonts:&bool)
                       -> Result<(), Box<dyn std::error::Error>> {

    // set output filename
    let output_file = if let Some(ofile) = filename {
        // avoid output filename reference to be shared
        let outputfile = ofile.clone();
        outputfile.into_os_string().into_string().unwrap()
    } else {
        "index.html".to_string()
    };

    // set output directory
    check_dir_and_create(output_dir)?;

    let output_path_html = output_dir.join(output_file);
    // check if file already exists
    if output_path_html.exists() {
        let overwrite = user_input(
            &format!("[WARNING] The file '{}' already exists.
Overwrite it (y/[n])? ", output_path_html.display()));
        if overwrite != "y" && overwrite != "yes" {
            println!("Playing it safe. Bye!");
            process::exit(1);
        }
    }

    let styles_dir = output_dir.join(DIR_STYLES);
    let lib_dir = output_dir.join(DIR_LIB);

    // get html template
    let html_template = if let Some(tpath) = template_path {
        std::fs::read_to_string(tpath)
            .with_context(|| format!("Failed to read HTML template content \
from `{}`", tpath.display()))?
    } else {
        match template {
            Template::Minimal => HTML_MINIMAL,
            Template::MinimalVim => HTML_MINIMAL_VIM,
            Template::CssVars => HTML_CSS_VARS,
            Template::Example | Template::ExampleCssVars => {
                // add additional assets
                let viddir = output_dir.join(HTML_VIDEO_DIR);
                let vidfile = viddir.join("sample.mp4");
                fs::create_dir_all(&viddir)?;
                fs::write(&vidfile, HTML_SAMPLE_VIDEO)
                    .with_context(|| format!("Failed to write video `{}`",
                            vidfile.display()))?;
                let imgdir = output_dir.join(HTML_IMG_DIR);
                let logofile = imgdir.join("logo.svg");
                fs::create_dir_all(&imgdir)?;
                fs::write(&logofile, HTML_SAMPLE_LOGO)
                    .with_context(|| format!("Failed to write logo `{}`",
                            logofile.display()))?;
                HTML_EXAMPLE
            }
        }.to_string()
    };

    let html_split_head_end:Vec<&str> = html_template.split("</head>").collect();
    let html_split_body_start:Vec<&str> = html_split_head_end[1].split("<body>").collect();
    let html_split_body_end:Vec<&str> = html_split_body_start[1].split("</body>").collect();

    let mut v_html_content:Vec<String> = Vec::from([html_split_head_end[0].to_string(),
                                                    html_split_body_start[0].to_string(),
                                                    html_split_body_end[0].to_string(),
                                                    html_split_body_end[1].to_string()]);

    fs::create_dir_all(&styles_dir)?;
    fs::create_dir_all(&lib_dir)?;

    // stylesheets
    // roboto font
    if *shower || matches!(theme, Stylesheet::DdBasic)
               || matches!(theme, Stylesheet::DdVars) {

        if *no_inline_fonts {
            add_font_files(styles_dir.clone())?;
            update_header(&mut v_html_content,
                CSS_ROBOTO_FNAME, UpdateHeaderOpt::CssLink);
            let output_path_css = styles_dir.join(CSS_ROBOTO_FNAME);
            fs::write(output_path_css.clone(), CSS_ROBOTO)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_css.display()))?;

        } else {
            update_header(&mut v_html_content,
                CSS_ROBOTO_FNAME, UpdateHeaderOpt::CssLink);
            let output_path_css = styles_dir.join(CSS_ROBOTO_FNAME);
            fs::write(output_path_css.clone(), CSS_ROBOTO_INLINE)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_css.display()))?;
        }

    }
    if *shower {
        update_header(&mut v_html_content,
                      SHOWER_FNAME_OUT_CSS, UpdateHeaderOpt::CssLink);
        let output_path_shower_css = styles_dir.join(SHOWER_FNAME_OUT_CSS);
        fs::write(output_path_shower_css.clone(), SHOWER_STR_CSS)
            .with_context(|| format!("Failed to write file `{}`",
                    output_path_shower_css.display()))?;

        //add_font_files(styles_dir.clone())?;
    }

    // include stylesheet
    match theme {
        Stylesheet::None => { () }
        Stylesheet::DdBasic => {
            let fname = "dd_basic.css";
            let output_path_css = styles_dir.join(fname);
            fs::write(&output_path_css, CSS_DD_BASIC)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_css.display()))?;
            update_header(&mut v_html_content, fname, UpdateHeaderOpt::CssLink);

        }
        Stylesheet::DdVars => {
            let fname = "dd_vars.css";
            let output_path_css = styles_dir.join(fname);
            fs::write(&output_path_css, CSS_DD_VARS
                .replace("DEFAULT_CSS_VARS", &css_vars::get_default_css_vars("","",""))
                .trim())
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_css.display()))?;

            update_header(&mut v_html_content, fname, UpdateHeaderOpt::CssLink);
        }
    }
    // custom stylesheet
    if let Some(css_path) = css_path {
        let custom_css_content = std::fs::read_to_string(css_path)
            .with_context(|| format!("Failed to read CSS stylesheet \
from `{}`", css_path.display()))?;

        if let Some(fname) = css_path.file_name() {
            let output_path_css = styles_dir.join(fname);
            fs::write(output_path_css.clone(), custom_css_content)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_css.display()))?;

            if let Some(fname_str) = fname.to_str() {
                update_header(&mut v_html_content, fname_str, UpdateHeaderOpt::CssLink);
            }
        }
    }

    // scripts
    if *shower {
        update_header(&mut v_html_content,
                      SHOWER_FNAME_OUT_JS, UpdateHeaderOpt::JsSrc);
        update_header(&mut v_html_content,
                      LIBCOMPONO_FNAME_OUT, UpdateHeaderOpt::JsSrc);
    } else {
        update_header(&mut v_html_content, LIBCOMPONO_FNAME_OUT, UpdateHeaderOpt::JsSrc);
    };

    let output_path_libcompono = lib_dir.join(LIBCOMPONO_FNAME_OUT);
    fs::write(output_path_libcompono.clone(), LIBCOMPONO_STR)
        .with_context(|| format!("Failed to write file `{}`",
                output_path_libcompono.display()))?;

    if *mathjax {
        update_header(&mut v_html_content,

                      MATHJAX_NAME_OUT, UpdateHeaderOpt::JsSrcAsync);
        let odir = lib_dir.join(MATHJAX_SUBDIR);
            fs::create_dir_all(&odir)?;
        let output_path_mathjax = lib_dir.join(MATHJAX_NAME_OUT);
        fs::write(&output_path_mathjax, MATHJAX_JS_STR)
            .with_context(|| format!("Failed to write file `{}`",
                    output_path_mathjax.display()))?;

        // also include fonts
        for (name, data) in MATHJAX_FONT_FILES {
            let odir_fonts = odir.join(MATHJAX_FONT_DIR);
            fs::create_dir_all(&odir_fonts)?;
            let output_fpath = odir_fonts.join(name);
            //println!("File {} is {} bytes", name, data.len());
            fs::write(&output_fpath, data)
            .with_context(|| format!("Failed to write Mathjax Font file `{}`",
                    output_fpath.display()))?;
        }
    }

    // update inline style (as last, to make it a prio)
    match template {
        Template::Minimal |
        Template::MinimalVim |
        Template::Example =>
        {
            update_header(&mut v_html_content,
                HTML_DEFAULT_STYLE, UpdateHeaderOpt::Style)
        }
        Template::CssVars |
        Template::ExampleCssVars =>
        {
            update_header(&mut v_html_content,
                &format!("{0}\n      {1}",
                    HTML_DEFAULT_STYLE,
                    &css_vars::get_default_css_vars("", "      ", "")),
                UpdateHeaderOpt::Style)
        }
    };

    if *shower {
        let output_path_shower_js = lib_dir.join(SHOWER_FNAME_OUT_JS);
        fs::write(output_path_shower_js.clone(), SHOWER_STR_JS)
            .with_context(|| format!("Failed to write file `{}`",
                    output_path_shower_js.display()))?;

        // body start
        v_html_content[1] = format!(r#"
  </head>
  <body class="shower">
    {}"#, v_html_content[1].trim());

        // body content
        v_html_content[2] = format!(r#"{0}
    {1}"#,  v_html_content[2].trim(), SHOWER_PROGRESS_HTML);

        // body end
        v_html_content[3] = format!(r#"
  </body>
{0}"#, v_html_content[3].trim());
    } else {
        // body start
        v_html_content[1] = format!(r#"
  </head>
  <body>{}"#, v_html_content[1].trim());

        // body content
        v_html_content[2] = format!(r#"
    {0}"#, v_html_content[2].trim());

        // body end
        v_html_content[3] = format!(r#"
  </body>
{0}"#, v_html_content[3].trim());
    }

    // update inline style last so it has prio
    let html_content = v_html_content .join("");

    fs::write(output_path_html.clone(), html_content)
        .with_context(|| format!("Failed to write file `{}`",
                                 output_path_html.display()))?;

    println!("Successfully created new presentation at `{}`",
             output_path_html.display());

    Ok(())
}

fn publish_presentation(input_dir:&std::path::PathBuf,
                        commit:&str, method:&PubMethod,
                        ssh_key:&std::path::PathBuf, ssh_pass:&str,
                        remote_endpoint:&Option<String>,
                        username:&Option<String>,
                        output_dir:&str,
                        include:&IncludeOpt)
                       -> Result<(), Box<dyn std::error::Error>> {

    //let username:String = user_input("username: ");
    let mut v_files_incl = Vec::<String>::new();

    include_files(input_dir, include, &mut v_files_incl)?;

    // resolve ssh
    let ssh_key_str = if ssh_key.to_str().unwrap() == DEFAULT_SSH_KEY_PATH_STR {
        format!("{0}/{1}", env::var("HOME").unwrap(), DEFAULT_SSH_KEY_HOME)
    } else {
        ssh_key.clone().into_os_string().into_string().unwrap()
    };
    let ssh_key_path = Path::new(&ssh_key_str);

    match method {
        PubMethod::Auto => {
            if output_dir != SCP_REMOTE_DIR
                || username.is_some()
                || remote_endpoint.is_some()
            {
                scp_upload_files(remote_endpoint, username, output_dir,
                    ssh_key_path, ssh_pass, &mut v_files_incl, input_dir)?;
            } else
            {
                publish_to_git(input_dir, commit, method,
                        ssh_key_path, ssh_pass, &mut v_files_incl)?;
            }
        },
        PubMethod::Github => publish_to_git(input_dir, commit, method,
            ssh_key_path, ssh_pass, &mut v_files_incl)?,
        PubMethod::Gitlab => publish_to_git(input_dir, commit, method,
            ssh_key_path, ssh_pass, &mut v_files_incl)?,
        PubMethod::Scp => scp_upload_files(remote_endpoint, username, output_dir,
            ssh_key_path, ssh_pass, &mut v_files_incl, input_dir)?
    };

    Ok(())
}


fn archive_presentation(input_dir:&std::path::PathBuf,
                        output_dir:&std::path::PathBuf,
                        filename:&str,
                        method:&ArchiveMethod,
                        include:&IncludeOpt)
                       -> Result<(), Box<dyn std::error::Error>> {

    //let username:String = user_input("username: ");
    let mut v_files_incl = Vec::<String>::new();

    include_files(input_dir, include, &mut v_files_incl)?;

    // create zip
    let archive_fname = if filename == ARCHIVE_OUT_NAME {
        let now = chrono::offset::Local::now();
        //let parent_dir = fs::canonicalize(input_dir).unwrap();
        //parent_dir.file_name().unwrap().to_str().unwrap().to_string()
        //    println!("{:?}", chrono::offset::Local::now());
        format!("present-{}-{:02}-{:02}",
            now.year(),
            now.month(),
            now.day())
    } else {
        filename.to_string()
    };

    check_dir_and_create(output_dir)?;

    // resolve ssh
    let output_path_full = match method {
        ArchiveMethod::Tar => {
            let o_str = format!("{}.tar.gz", archive_fname);
            let o_path = output_dir.join(o_str);
            let o_file = fs::File::create(&o_path).unwrap();
            tar_files(&mut v_files_incl, o_file)?;
            o_path
        },
        ArchiveMethod::Zip => {
            let prefix = input_dir.to_str().unwrap();
            let o_str = format!("{}.zip", archive_fname);
            let o_path = output_dir.join(o_str);
            let o_file = fs::File::create(&o_path).unwrap();
            zip_files(&mut v_files_incl, prefix, o_file, ZIP_METHOD_DEFLATED)?;
            o_path
        },
        ArchiveMethod::ZipStored => {
            let prefix = input_dir.to_str().unwrap();
            let o_str = format!("{}.zip", archive_fname);
            let o_path = output_dir.join(o_str);
            let o_file = fs::File::create(&o_path).unwrap();
            zip_files(&mut v_files_incl, prefix, o_file, ZIP_METHOD_STORED)?;
            o_path
        }
    };

    println!("Successfully created `{}`", output_path_full.display());

    Ok(())
}


/*---------------------------------------------------------------------
 * Main
 *---------------------------------------------------------------------*/

fn main() -> Result<(), Box<dyn std::error::Error>> {

    let cli = Cli::parse();

    // You can check for the existence of subcommands, and if found use their
    // matches just as you would the top level cmd
    match &cli.command {
        Commands::Create { template, template_path,
                           theme, css_path, no_inline_fonts,
                           output_dir, filename, shower, mathjax } => {
            create_presentation(&template,
                                template_path,
                                &theme,
                                css_path,
                                output_dir,
                                filename,
                                shower,
                                mathjax,
                                no_inline_fonts)?;
        }
        Commands::Publish { input_dir, commit, method,
                            ssh_key, ssh_pass, endpoint, username, output_dir,
                            include } => {
            publish_presentation(input_dir,
                                 &commit,
                                 &method,
                                 &ssh_key,
                                 ssh_pass,
                                 endpoint,
                                 username,
                                 &output_dir,
                                 &include)?;
        }

        Commands::Archive { input_dir, output_dir, filename, method,
                            include } => {
            archive_presentation(input_dir,
                                 output_dir,
                                 &filename,
                                 &method,
                                 &include)?;
        }
    }

    Ok(())
}
