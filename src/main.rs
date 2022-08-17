// SPDX-FileCopyrightText: 2022 Digital Dasein <https://digital-dasein.gitlab.io/>
// SPDX-FileCopyrightText: 2022 Gerben Peeters <gerben@digitaldasein.org>
// SPDX-FileCopyrightText: 2022 Senne Van Baelen <senne@digitaldasein.org>
//
// SPDX-License-Identifier: MIT

#![allow(unused_variables)]

// TODO:
// - check if file exists and ask to overwrite
// - add templates

//use std::io::{self, Write, stdin, stdout, BufReader, prelude::*};
use std::io::{self, Write, BufReader, prelude::*};
use std::path::Path;
use std::fs;
use std::env;
use std::process;
use clap::{Parser, ArgEnum, Subcommand};
use anyhow::{Context, Result};
use git2::{Repository, Oid, Remote, PushOptions, RemoteCallbacks, Cred};
use walkdir::{WalkDir};
use glob::glob;

/*---------------------------------------------------------------------
 * Config
 *---------------------------------------------------------------------*/

// default constants
const OUTPUT_DIR_STR:&str = "./";
const DIR_LIB:&str = "./lib";
const DIR_STYLES:&str = "./styles";

const LIBCOMPONO_FNAME_OUT:&str = "libcompono.js";
const LIBCOMPONO_STR:&str = include_str!("../lib/libcompono/dist/libcompono.min.js");

const SHOWER_FNAME_OUT_JS:&str = "shower.js";
const SHOWER_STR_JS:&str = include_str!("../lib/libcompono/examples/shower/lib/shower/core/dist/shower.js");

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

const CSS_ROBOTO:&str = include_str!("./styles/roboto_font.css");
const CSS_ROBOTO_INLINE:&str = include_str!("./styles/roboto_font_inline.css");
const CSS_ROBOTO_FNAME:&str = "roboto_font.css";
const CSS_DD_BASIC:&str = include_str!("./styles/dd_basic.css");
const CSS_SHOWER_DD_BASIC:&str = include_str!("./styles/shower_dd_basic.css");

const DEFAULT_SSH_KEY_PATH_STR:&str = "$HOME/.ssh/id_rsa";
const DEFAULT_SSH_KEY_HOME:&str = ".ssh/id_rsa";
const DEFAULT_SSH_KEY_PASSPHRASE:&str = "None";

const CI_COMMENT:&str = "# Compono CI config pages";
const GITHUB_CI:&str = include_str!("./ci-configs/github.yml");
const GITHUB_CI_PATH:&str = ".github/workflows/deploy.yml";

const GITLAB_CI:&str = include_str!("./ci-configs/gitlab.yml");
const GITLAB_CI_PATH:&str = ".gitlab-ci.yml";

// CLI
#[derive(Parser)]
#[clap(author, version,  long_about = None)]
#[clap(propagate_version = true)]
#[clap(term_width = 80)]
/// Utility for making component-based HTML presentations
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
        /// For a custom template path, see the '--template-path option'.
        #[clap(short, long, value_parser, arg_enum,
               default_value_t = Template::Minimal) ]
        template: Template,

        /// Path to custom HTML template.
        #[clap(short='T', long, value_parser)]
        template_path: Option<std::path::PathBuf>,

        /// filename HTML output
        #[clap(short='f', long, value_parser)]
        output_filename: Option<std::path::PathBuf>,

        /// Output directory path
        #[clap(short, long, value_parser)]
        output_dir: Option<std::path::PathBuf>,

        /// Include default CSS stylesheet.
        /// For a custom css path, see the '--css-path option'.
        #[clap(short, long, value_parser, arg_enum,
               default_value_t = Stylesheet::None) ]
        css: Stylesheet,

        /// Path to custom CSS stylesheet.
        #[clap(short='C', long, value_parser)]
        css_path: Option<std::path::PathBuf>,

        /// Include shower's presentation javascript core
        #[clap(short, long, action)]
        shower: bool,

        /// Do not inline font binaries in CSS (include separate WOFF files)
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

        /// Remote endpoint (IP address/URL). By default (git-context), it
        /// uses the remote origin endpoint from the git repo config
        #[clap(short='r', long, value_parser, default_value="auto")]
        remote_endpoint: String,

        /// Git commit message when pushing to remote
        #[clap(short, long, value_parser,
               default_value="Publish HTML presentation")]
        commit_msg: String,

        /// Publication method (for the default `auto` option, the preferred method is
        /// guessed)
        #[clap(short, long, value_parser, arg_enum,
               default_value_t = Method::Auto) ]
        method: Method,

        /// Determine which files to include for publishing. (Note that when
        /// using index.html to check for files, gitignore is also checked.)
        #[clap(short='I', long, value_parser, arg_enum,
               default_value_t = PublishIncludeOpt::UseHtml) ]
        include: PublishIncludeOpt,
    }

}

#[derive(Clone, ArgEnum, Debug)]
enum Template {
    Minimal,
    MinimalVim,
    StyleOps,
    Full,
}

#[derive(Clone, ArgEnum, Debug)]
enum Stylesheet {
    None,
    DdBasic,
    ShowerDdBasic,
}

#[derive(Clone, ArgEnum, Debug)]
enum UpdateHeaderOpt {
    Css,
    Js,
    JsModule
}

#[derive(Clone, ArgEnum, Debug)]
enum PublishIncludeOpt {
    UseHtml,
    UseGitignore,
    All
}

#[derive(Clone, ArgEnum, Debug)]
enum Method {
    Auto,
    Github,
    Gitlab,
    Scp
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

//println!("{}", Path::new("/etc/hosts").exists());

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

fn update_header(v_html:& mut Vec<String>, filename:&str, part:UpdateHeaderOpt) {

    let new_header = match part {
        UpdateHeaderOpt::Css => {
            format!(r#"{0}
    <link rel="stylesheet" href="{1}/{2}">"#, v_html[0].trim(),
                                              DIR_STYLES, filename)
        }
        UpdateHeaderOpt::Js => {
            format!(r#"{0}
    <script src="{1}/{2}"></script>"#, v_html[0].trim(), DIR_LIB, filename)
        }
        UpdateHeaderOpt::JsModule => {
            format!(r#"{0}
    <script type="module" src="{1}/{2}"></script>"#, v_html[0].trim(),
                                                     DIR_LIB, filename)
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


fn git_commit(repo: &Repository, msg:&str) -> (Oid, Oid) {
    let mut index = t!(repo.index());

    let tree_id = t!(index.write_tree());
    let tree = t!(repo.find_tree(tree_id));
    let sig = t!(repo.signature());

    //let head = t!(repo.head());

    let head_id = match repo.refname_to_id("HEAD") {
        Ok(oid) => oid,
        Err(error) => panic!("Failed to get HEAD id\n
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

======================"),
    };

    //let head_id = t!(repo.refname_to_id("HEAD"));
    let parent = t!(repo.find_commit(head_id));
    //let msg = "Publish HTML presentation".to_string();
    let commit = t!(repo.commit(Some("HEAD"), &sig, &sig, &msg, &tree, &[&parent]));

    (commit, tree_id)
}

/*
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
*/

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
                 method:&PublishIncludeOpt,
                 v_files: & mut Vec::<String>,
                 v_files_excl: & mut Vec::<String>)
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
                PublishIncludeOpt::All => {
                    if !is_git {
                        v_files.push(entry.path()
                            .to_str()
                            .expect("failed to convert entry to string")
                            .to_string());
                    }
                }

                PublishIncludeOpt::UseGitignore => {
                    if !is_git && !in_gitignore {
                        v_files.push(entry.path()
                            .to_str()
                            .expect("failed to convert entry to string")
                            .to_string());
                    } else if !is_git {
                        v_files_excl.push(entry.path()
                            .to_str()
                            .expect("failed to convert entry to string")
                            .to_string());
                    }
                }

                PublishIncludeOpt::UseHtml => {
                    if !is_git && !in_gitignore  && in_html {
                        v_files.push(entry.path()
                            .to_str()
                            .expect("failed to convert entry to string")
                            .to_string());
                    } else if !is_git {
                        v_files_excl.push(entry.path()
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

    } else {
        let ci = format!("{}\n{}", CI_COMMENT, ci_content);
        fs::write(ci_path, ci)
            .with_context(|| format!("Failed to write CI file `{}`",
                                     ci_path.display()))?;
    }

    Ok (())
}

fn publish_to_git(input_dir:&std::path::PathBuf,
                  commit_msg:&str,
                  platform:&str,
                  ssh_key:&std::path::PathBuf,
                  ssh_pass:&str,
                  v_files_incl: & mut Vec::<String>,
                  v_files_excl: & mut Vec::<String>)
                  -> Result<(), Box<dyn std::error::Error>> {

    let repo = match Repository::open(input_dir) {
        Ok(repo) => repo,
        Err(e) => panic!("Failed to open git repository: {}", e),
    };

    let cfg = repo.config()?;
    let cfg_remote_url:String = if let Ok(url) = cfg.get_entry("remote.origin.url"){
        url.value().unwrap().to_string()
    } else {
        "?".to_string()
    };

    let git_platform = match platform {
        "git-auto" => {
            if cfg_remote_url.contains("github"){ "github" }
            else if cfg_remote_url.contains("gitlab") { "gitlab" }
            else { panic!("Failed to auto-detect git platform from remote URL") }
        },
        "gitlab" => { "gitlab" },
        "github" => { "github" },
         _ => { panic!("Could not derive git platform") }
    };

    match git_platform {
        "github" => {
            let ci_path = Path::new(input_dir).join(GITHUB_CI_PATH);
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
    let (commit, three_id) = git_commit(&repo, &commit_msg);

    let mut cb = RemoteCallbacks::new();
    let mut push_opts = PushOptions::new();

    let head = repo.head().unwrap();
    let refspecs: &[&str] = &[head.name().unwrap()];

    // https://github.com/rust-lang/git2-rs/issues/823
    if ssh_key.to_str().unwrap() == DEFAULT_SSH_KEY_PATH_STR {

        cb.credentials(|_url, username_from_url, _allowed_types| {
            Cred::ssh_key(
                username_from_url.unwrap(),
                None,
                Path::new(&format!("{0}/{1}", env::var("HOME").unwrap(),
                                   DEFAULT_SSH_KEY_HOME)),
                Some(ssh_pass),
            )
        });
    } else {
        cb.credentials(|_url, username_from_url, _allowed_types| {
            Cred::ssh_key(
                username_from_url.unwrap(),
                None,
                ssh_key,
                Some(ssh_pass),
            )
        });
    };

    push_opts.remote_callbacks(cb);

    //let pushOption: Option<&mut PushOptions<'_>> = Some(pushOpts);
    let mut remote:Remote = t!(repo.find_remote("origin"));

    // push
    println!("Pushing to remote...");
    remote.push(refspecs, Some(&mut push_opts))
        .with_context(|| format!("Failed to push to remote repo. \
Make sure to provide proper SSH credentials by using options \
`--ssh-key` and/or `--ssh-pass`{}", ""))?;

    println!("Successfully published!");

    if git_platform == "github" {
        // TODO
    } else if git_platform == "gitlab" {
        if cfg_remote_url.contains("@") {
            let v_split_at: Vec<&str> = cfg_remote_url.split("@").collect();
            let v_split_dot: Vec<&str> = v_split_at[1].split(".").collect();
            let v_split_colon: Vec<&str> = v_split_at[1].split(":").collect();
            let v_split_slash: Vec<&str> = v_split_colon[1].split("/").collect();

            let remote_url = format!("https://{0}.{1}.io/{2}",
                                     v_split_slash[0],
                                     v_split_dot[0],
                                     v_split_slash[1..].join("/")
                                     .replace(".git", "/"));
            println!("Your presentation will shortly be available at: {}", remote_url);
        }
    }
    Ok(())
}

/*---------------------------------------------------------------------
 * Main functinos
 *---------------------------------------------------------------------*/

fn create_presentation(template:&Template,
                       template_path:&Option<std::path::PathBuf>,
                       css:&Stylesheet,
                       css_path:&Option<std::path::PathBuf>,
                       output_dir:&Option<std::path::PathBuf>,
                       output_filename:&Option<std::path::PathBuf>,
                       shower:&bool,
                       no_inline_fonts:&bool)
                       -> Result<(), Box<dyn std::error::Error>> {

    // set output filename
    let output_file = if let Some(ofile) = output_filename {
        // avoid output filename reference to be shared
        let outputfile = ofile.clone();
        outputfile.into_os_string().into_string().unwrap()
    } else {
        "index.html".to_string()
    };

    // set output directory
    let output_dir = if let Some(odir) = output_dir {
        if !Path::new(odir).exists(){
            println!("The directory `{}` does not exist", odir.display());
            print!("Create it? [n]/y: ");
            io::stdout().flush().unwrap();
            let mut answer = String::new();
            io::stdin().read_line(&mut answer)
                .expect("Error getting user input");
            if answer == "y\n" || answer == "yes\n" {
                fs::create_dir_all(odir)?;
            } else {
                println!("That's it then. Bye!");
                process::exit(1);
            }
        }
        //Path::new(odir).join(output_file)
        Path::new(odir)
    } else {
        Path::new(OUTPUT_DIR_STR)
    };

    let output_path_html = output_dir.join(output_file);

    let styles_dir = output_dir.join(DIR_STYLES);
    let lib_dir = output_dir.join(DIR_LIB);

    // get html template
    let html_template = if let Some(tpath) = template_path {
        std::fs::read_to_string(tpath)
            .with_context(|| format!("Failed to read HTML template content \
from `{}`", tpath.display()))?
    } else {
        match template {
            Template::Minimal => { HTML_MINIMAL }
            Template::MinimalVim => { HTML_MINIMAL_VIM }
            Template::StyleOps => { HTML_MINIMAL_VIM }
            Template::Full => { HTML_MINIMAL_VIM }
        }.to_string()
    };

    let html_split_head_end:Vec<&str> = html_template.split("</head>").collect();
    let html_split_body_start:Vec<&str> = html_split_head_end[1].split("<body>").collect();
    let html_split_body_end:Vec<&str> = html_split_body_start[1].split("</body>").collect();

    let mut v_html_content:Vec<String> = Vec::from([html_split_head_end[0].to_string(),
                                                    html_split_body_start[0].to_string(),
                                                    html_split_body_end[0].to_string(),
                                                    html_split_body_end[1].to_string()]);

    fs::create_dir_all(styles_dir.clone())?;
    fs::create_dir_all(lib_dir.clone())?;

    // stylesheets
    // roboto font
    if *shower || matches!(css, Stylesheet::DdBasic)
               || matches!(css, Stylesheet::ShowerDdBasic) {

        if *no_inline_fonts {
            add_font_files(styles_dir.clone())?;
            update_header(&mut v_html_content,
                CSS_ROBOTO_FNAME, UpdateHeaderOpt::Css);
            let output_path_css = styles_dir.join(CSS_ROBOTO_FNAME);
            fs::write(output_path_css.clone(), CSS_ROBOTO)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_css.display()))?;

        } else {
            update_header(&mut v_html_content,
                CSS_ROBOTO_FNAME, UpdateHeaderOpt::Css);
            let output_path_css = styles_dir.join(CSS_ROBOTO_FNAME);
            fs::write(output_path_css.clone(), CSS_ROBOTO_INLINE)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_css.display()))?;
        }

    }
    if *shower {
        update_header(&mut v_html_content,
                      SHOWER_FNAME_OUT_CSS, UpdateHeaderOpt::Css);
        let output_path_shower_css = styles_dir.join(SHOWER_FNAME_OUT_CSS);
        fs::write(output_path_shower_css.clone(), SHOWER_STR_CSS)
            .with_context(|| format!("Failed to write file `{}`",
                    output_path_shower_css.display()))?;

        //add_font_files(styles_dir.clone())?;
    }

    // include stylesheet
    match css {
        Stylesheet::None => { () }
        Stylesheet::DdBasic => {
            let fname = "dd_basic.css";
            let output_path_css = styles_dir.join(fname);
            //add_font_files(styles_dir.clone())?;
            fs::write(output_path_css.clone(), CSS_DD_BASIC)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_css.display()))?;
            update_header(&mut v_html_content, fname, UpdateHeaderOpt::Css);

        }
        Stylesheet::ShowerDdBasic => {
            let fname = "shower_dd_basic.css";
            let output_path_css = styles_dir.join(fname);
            //add_font_files(styles_dir.clone())?;
            fs::write(output_path_css.clone(), CSS_SHOWER_DD_BASIC)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_css.display()))?;

            update_header(&mut v_html_content, fname, UpdateHeaderOpt::Css);
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
                update_header(&mut v_html_content, fname_str, UpdateHeaderOpt::Css);
            }
        }
    }

    // scripts
    if *shower {
        update_header(&mut v_html_content,
                      SHOWER_FNAME_OUT_JS, UpdateHeaderOpt::Js);
        update_header(&mut v_html_content,
                      LIBCOMPONO_FNAME_OUT, UpdateHeaderOpt::Js);
    } else {
        update_header(&mut v_html_content, LIBCOMPONO_FNAME_OUT, UpdateHeaderOpt::Js);
    };

    let output_path_libcompono = lib_dir.join(LIBCOMPONO_FNAME_OUT);
    fs::write(output_path_libcompono.clone(), LIBCOMPONO_STR)
        .with_context(|| format!("Failed to write file `{}`",
                output_path_libcompono.display()))?;

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
<body>    {}"#, v_html_content[1].trim());

        // body content
        v_html_content[2] = format!(r#"
{0}"#, v_html_content[2].trim());

        // body end
        v_html_content[3] = format!(r#"
</body>
{0}"#, v_html_content[3].trim());
    }

    let html_content = v_html_content.join("");

    // write html output
    fs::write(output_path_html.clone(), html_content)
        .with_context(|| format!("Failed to write file `{}`",
                                 output_path_html.display()))?;

    println!("Successfully created new presentation at `{}`",
             output_path_html.display());

    Ok(())
}

fn publish_presentation(input_dir:&std::path::PathBuf,
                        commit_msg:&str, method:&Method,
                        ssh_key:&std::path::PathBuf, ssh_pass:&str,
                        remote_endpoint:&str, include:&PublishIncludeOpt)
                       -> Result<(), Box<dyn std::error::Error>> {

    //let username:String = user_input("username: ");
    let mut v_files_incl = Vec::<String>::new();
    let mut v_files_excl = Vec::<String>::new();

    include_files(input_dir, include, &mut v_files_incl,  &mut v_files_excl)?;

    let pub_method = match method {
        Method::Auto => { "git-auto" }
        Method::Github => { "github" }
        Method::Gitlab => { "gitlab" }
        Method::Scp => { "scp" }
    };

    if pub_method == "git-auto" ||
       pub_method == "github" ||
       pub_method == "gitlab" {
        publish_to_git(input_dir, commit_msg, pub_method, ssh_key, ssh_pass,
                       &mut v_files_incl, &mut v_files_excl)?;
    }

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
                           css, css_path, no_inline_fonts,
                           output_dir, output_filename, shower } => {
            create_presentation(&template,
                                template_path,
                                &css,
                                css_path,
                                output_dir,
                                output_filename,
                                shower,
                                no_inline_fonts)?;
        }
        Commands::Publish { input_dir, commit_msg, method,
                            ssh_key, ssh_pass, remote_endpoint,
                            include } => {
            publish_presentation(input_dir,
                                 &commit_msg,
                                 &method,
                                 &ssh_key,
                                 ssh_pass,
                                 remote_endpoint,
                                 &include)?;
        }
    }

    Ok(())
}


#[test]
fn find_a_match() {
    let mut result = Vec::new();
    find_matches("lorem ipsum\ndolor sit amet", "lorem", &mut result);
    assert_eq!(result, b"lorem ipsum\n");
}

#[test]
fn verify_cli() {
    use clap::CommandFactory;
    Cli::command().debug_assert()
}
