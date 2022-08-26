// SPDX-FileCopyrightText: 2022 Digital Dasein <https://digital-dasein.gitlab.io/>
// SPDX-FileCopyrightText: 2022 Senne Van Baelen <senne@digitaldasein.org>
// SPDX-FileCopyrightText: 2022 Gerben Peeters <gerben@digitaldasein.org>
//
// SPDX-License-Identifier: MIT

use assert_cmd::prelude::*; // Add methods on commands
use predicates::prelude::*; // Used for writing assertions
use std::process::Command; // Run programs
use tempfile::tempdir;

#[test]
fn odir_does_not_exist() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin("compono")?;

    cmd.arg("create").arg("-o /does/not/exists");
    cmd.assert()
        .stdout(predicate::str::contains("directory"))
        .stdout(predicate::str::contains("does not exist"));

    Ok(())
}

#[test]
fn create_minimal_presentation() -> Result<(), Box<dyn std::error::Error>> {
    let mut cmd = Command::cargo_bin("compono")?;

    // Create a directory inside of `std::env::temp_dir()`.
    let temp_dir = tempdir().unwrap();

    cmd.arg("create").arg("-o").arg(temp_dir.path().to_str().unwrap());
    cmd.assert()
        .stdout(predicate::str::contains("Successfully created new presentation"));

    Ok(())
}
