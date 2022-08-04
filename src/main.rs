#![allow(unused_variables)]

use std::io::{self, Write};
use std::path::Path;
use std::fs;
use std::process;
use clap::{Parser, ArgEnum, Subcommand};
use anyhow::{Context, Result};
use const_format::concatcp;

/*---------------------------------------------------------------------
 * Config
 *---------------------------------------------------------------------*/

// default constants
const LIBCOMPONO_FNAME_OUT:&str = "libcompono.js";
const LIBCOMPONO_STR:&str = include_str!("../lib/libcompono/dist/libcompono.min.js");
const LIBCOMPONO_INLINE_BODY:&str = concat!(
    "  <!-- ############## -->\n",
    "    <!-- inline scripts -->\n",
    "    <!-- ############## -->\n",
    "    <script>",
    include_str!("../lib/libcompono/dist/libcompono.min.js"),
    "\n</script>\n",
    "</body>",
    );
const HTML_MINIMAL:&str = include_str!("./templates/minimal.html");
const HTML_MINIMAL_VIM:&str = include_str!("./templates/minimal_vim.html");
const OUTPUT_DIR_STR:&str = "./";
const LIBCOMPONO_SCRIPT:&str = r#"<script src="./libcompono.js"></script>"#;
const HTML_HEAD_CLOSE:&str = r#"</head>"#;
const HTML_BODY_CLOSE:&str = r#"</body>"#;

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

        /// Inline all javascript code in the HTML file.
        #[clap(short, long, action)]
        inline: bool,

        /// Output directory path
        #[clap(short, long, value_parser)]
        output_dir: Option<std::path::PathBuf>,
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
            print!("Create new directory? [n]/y: ");
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

    // update HTML with javascript
    let html_content = if *inline {
        html_template.replace(HTML_BODY_CLOSE, LIBCOMPONO_INLINE_BODY)
    } else {
        let libstr = concatcp!("  ", LIBCOMPONO_SCRIPT,
            "\n",
            "  ", HTML_HEAD_CLOSE);
        let output_path_libcompono = output_dir.join(LIBCOMPONO_FNAME_OUT);
        fs::write(output_path_libcompono.clone(), LIBCOMPONO_STR)
            .with_context(|| format!("Failed to write file `{}`",
                    output_path_libcompono.display()))?;

        html_template.replace(HTML_HEAD_CLOSE, libstr)
    };

    // write html output
    fs::write(output_path_html.clone(), html_content)
        .with_context(|| format!("Failed to write file `{}`",
                                 output_path_html.display()))?;

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
                        output_dir, output_filename } => {
            create_presentation(&template,
                                template_path,
                                output_dir,
                                output_filename,
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
