// SPDX-FileCopyrightText: 2022 Digital Dasein <https://digital-dasein.gitlab.io/>
// SPDX-FileCopyrightText: 2022 Senne Van Baelen <senne@digitaldasein.org>
// SPDX-FileCopyrightText: 2022 Gerben Peeters <gerben@digitaldasein.org>
//
// SPDX-License-Identifier: MIT

use std::{
    error::Error,
    fs::{self, File},
    io::Write,
};

const SOURCE_DIR: &str = "../lib/mathjax/node_modules/mathjax/es5/output/chtml/fonts/woff-v2/";
const OUTDIR_RS_FILE: &str = "../src/mathjax_font_files.rs";

fn main() -> Result<(), Box<dyn Error>> {
    let mut all_the_files = File::create(OUTDIR_RS_FILE)?;

    writeln!(&mut all_the_files, r##"["##,)?;

    for f in fs::read_dir(SOURCE_DIR)? {
        let f = f?;

        if !f.file_type()?.is_file() {
            continue;
        }

        writeln!(
            &mut all_the_files,
            r##"("{fname}", include_bytes!(r#"{path}"#)),"##,
            fname = f.path().file_name().unwrap().to_str().unwrap(),
            path = f.path().display(),
        )?;
    }

    writeln!(&mut all_the_files, r##"]"##,)?;

    Ok(())
}
