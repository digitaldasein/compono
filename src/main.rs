#![allow(unused_variables)]

// TODO:
// - check if file exists and ask to overwrite
// - add templates

use std::io::{self, Write};
use std::path::Path;
use std::fs;
use std::process;
use clap::{Parser, ArgEnum, Subcommand};
use anyhow::{Context, Result};
use const_format::concatcp;
use const_format::formatcp;

/*---------------------------------------------------------------------
 * Config
 *---------------------------------------------------------------------*/

// default constants
const OUTPUT_DIR_STR:&str = "./";
const DIR_LIB:&str = "./lib";
const DIR_STYLES:&str = "./styles";

const LIBCOMPONO_FNAME_OUT:&str = "libcompono.js";
const LIBCOMPONO_STR:&str = include_str!("../lib/libcompono/dist/libcompono.min.js");
const LIBCOMPONO_INLINE_BODY:&str = concat!(
    "  \n\n<!-- ############## -->\n",
    "    <!-- inline scripts -->\n",
    "    <!-- ############## -->\n",
    "    <script>",
    include_str!("../lib/libcompono/dist/libcompono.min.js"),
    "\n</script>\n",
    "</body>",
    );
const LIBCOMPONO_SHOWER_INLINE_BODY:&str = concat!(
    "  <!-- ############## -->\n",
    "    <!-- inline scripts -->\n",
    "    <!-- ############## -->\n",
    "    <script>",
    include_str!("../lib/libcompono/dist/libcompono.min.js"),
    include_str!("../lib/libcompono/examples/shower/lib/shower/core/dist/shower.js"),
    "\n</script>\n",
    "</body>",
    );

const LIBCOMPONO_SCRIPT:&str = formatcp!(r#"<script src="{0}/{1}"></script>"#,
                                         DIR_LIB, LIBCOMPONO_FNAME_OUT);

const SHOWER_FNAME_OUT_JS:&str = "shower.js";
const SHOWER_STR_JS:&str = include_str!("../lib/libcompono/examples/shower/lib/shower/core/dist/shower.js");
const SHOWER_SCRIPT:&str = formatcp!(r#"<script src="{0}/{1}"></script>"#,
                                     DIR_LIB, SHOWER_FNAME_OUT_JS);
const SHOWER_BODY_OPEN:&str = r#"<body class="shower">"#;
const SHOWER_FNAME_OUT_CSS:&str = "shower.css";
const SHOWER_STR_CSS:&str = include_str!("./styles/shower.css");
const SHOWER_CSS_LINK:&str = formatcp!(r#"<link rel="stylesheet" href="{0}/{1}">"#,
                                       DIR_STYLES, SHOWER_FNAME_OUT_CSS);
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
const CSS_ROBOTO_FNAME:&str = "roboto_font.css";
const CSS_DD_BASIC:&str = include_str!("./styles/dd_basic.css");
const CSS_SHOWER_DD_BASIC:&str = include_str!("./styles/shower_dd_basic.css");

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
    #[clap(visible_aliases = &["init", "create"]) ]
    New {
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

        /// Inline all javascript code in the HTML file
        #[clap(short, long, action)]
        inline: bool,

        /// Include shower's presentation javascript core
        #[clap(short, long, action)]
        shower: bool,
    },
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

/*---------------------------------------------------------------------
 * Methods
 *---------------------------------------------------------------------*/

//println!("{}", Path::new("/etc/hosts").exists());

fn add_fonts(styles_dir:std::path::PathBuf)
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

fn create_presentation(template:&Template,
                       template_path:&Option<std::path::PathBuf>,
                       css:&Stylesheet,
                       css_path:&Option<std::path::PathBuf>,
                       output_dir:&Option<std::path::PathBuf>,
                       output_filename:&Option<std::path::PathBuf>,
                       shower:&bool,
                       inline:&bool)
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

    if *inline {
        // https://github.com/jrit/web-resource-inliner>
        // <https://github.com/parcel-bundler/parcel/issues/1704#issuecomment-751494287>
        //
        // NOTE:
        //
        // <https://github.com/jrit/web-resource-inliner/issues/73>
        // font binaries not inlines yet, so Roboto font
        // needs to be installed on the system
        //
        // E.g. on debian:
        //
        //  $ sudo apt install fonts-roboto
        //
        // CentOS
        //
        //  $ sudo yum makecache
        //  $ sudo yum -y install google-roboto-fonts
        //

        /*<link rel="stylesheet"*/
          /*href="https://fonts.googleapis.com/css?family=Tangerine">*/
        /*let shower_style = formatcp!("{}\n  </style>",*/
                                     /*SHOWER_STR_CSS);*/

        /*if *shower {*/
            /*html_template.replace("</body>", LIBCOMPONO_SHOWER_INLINE_BODY)*/
                         /*.replace("<body>", SHOWER_BODY_OPEN)*/
                         /*.replace("</dd-slide-collection>", "") // prog_html*/
                         /*.replace("</style>", shower_style)*/
        /*} else {*/
            /*html_template.replace("</body>", LIBCOMPONO_INLINE_BODY)*/
        /*}*/
    } else {
        fs::create_dir_all(styles_dir.clone())?;
        fs::create_dir_all(lib_dir.clone())?;

        // stylesheets
        if *shower || matches!(css, Stylesheet::DdBasic)
                   || matches!(css, Stylesheet::ShowerDdBasic) {

            update_header(&mut v_html_content,
                          CSS_ROBOTO_FNAME, UpdateHeaderOpt::Css);
            let output_path_css = styles_dir.join(CSS_ROBOTO_FNAME);
            fs::write(output_path_css.clone(), CSS_ROBOTO)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_css.display()))?;

        }
        if *shower {
            update_header(&mut v_html_content,
                          SHOWER_FNAME_OUT_CSS, UpdateHeaderOpt::Css);
            let output_path_shower_css = styles_dir.join(SHOWER_FNAME_OUT_CSS);
            fs::write(output_path_shower_css.clone(), SHOWER_STR_CSS)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_shower_css.display()))?;

            //add_fonts(styles_dir.clone())?;
        }

        // include stylesheet
        match css {
            Stylesheet::None => { () }
            Stylesheet::DdBasic => {
                let fname = "dd_basic.css";
                let output_path_css = styles_dir.join(fname);
                //add_fonts(styles_dir.clone())?;
                fs::write(output_path_css.clone(), CSS_DD_BASIC)
                    .with_context(|| format!("Failed to write file `{}`",
                            output_path_css.display()))?;
                update_header(&mut v_html_content, fname, UpdateHeaderOpt::Css);

            }
            Stylesheet::ShowerDdBasic => {
                let fname = "shower_dd_basic.css";
                let output_path_css = styles_dir.join(fname);
                //add_fonts(styles_dir.clone())?;
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
    };

    let html_content = v_html_content.join("");

    // write html output
    fs::write(output_path_html.clone(), html_content)
        .with_context(|| format!("Failed to write file `{}`",
                                 output_path_html.display()))?;

    println!("Successfully created new presentation at `{}`",
             output_path_html.display());

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
        Commands::New { template, template_path, inline,
                        css, css_path,
                        output_dir, output_filename, shower } => {
            create_presentation(&template,
                                template_path,
                                &css,
                                css_path,
                                output_dir,
                                output_filename,
                                shower,
                                inline)?;
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
