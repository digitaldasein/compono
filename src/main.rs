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

/*---------------------------------------------------------------------
 * Methods
 *---------------------------------------------------------------------*/

//println!("{}", Path::new("/etc/hosts").exists());
//

fn create_presentation(template:&Template,
                       template_path:&Option<std::path::PathBuf>,
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

    // update HTML

    let prog_html = formatcp!("  {}\n    </dd-slide-collection>",
                              SHOWER_PROGRESS_HTML);

    let html_content = if *inline {
        let shower_style = formatcp!("{}\n  </style>",
                                     SHOWER_STR_CSS);

        if *shower {
            html_template.replace("</body>", LIBCOMPONO_SHOWER_INLINE_BODY)
                         .replace("<body>", SHOWER_BODY_OPEN)
                         .replace("</dd-slide-collection>", prog_html)
                         .replace("</style>", shower_style)
        } else {
            html_template.replace("</body>", LIBCOMPONO_INLINE_BODY)
        }
    } else {

        let styles_dir = output_dir.join("styles");
        fs::create_dir_all(styles_dir.clone())?;
        let lib_dir = output_dir.join("lib");
        fs::create_dir_all(lib_dir.clone())?;

        let scripts_str = if *shower {
            concatcp!("  ", SHOWER_CSS_LINK,
                      "\n",
                      "    ", LIBCOMPONO_SCRIPT,
                      "\n",
                      "  ", SHOWER_SCRIPT,
                      "\n",
                      "  ", "</head>")
        } else {
            concatcp!("  ", LIBCOMPONO_SCRIPT,
                      "\n",
                      "  ", "</head>")
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
            let output_path_shower_css = styles_dir.join(SHOWER_FNAME_OUT_CSS);
            fs::write(output_path_shower_css.clone(), SHOWER_STR_CSS)
                .with_context(|| format!("Failed to write file `{}`",
                        output_path_shower_css.display()))?;

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

            html_template.replace("</head>", scripts_str)
                         .replace("<body>", SHOWER_BODY_OPEN)
                         .replace("</dd-slide-collection>", prog_html)
        } else {
            html_template.replace("</head>", scripts_str)
        }
    };

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
                        output_dir, output_filename, shower } => {
            create_presentation(&template,
                                template_path,
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
