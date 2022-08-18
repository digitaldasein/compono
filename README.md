<!--
SPDX-FileCopyrightText: 2022 Digital Dasein <https://digital-dasein.gitlab.io/>
SPDX-FileCopyrightText: 2022 Senne Van Baelen <senne@digitaldasein.org>
SPDX-FileCopyrightText: 2022 Gerben Peeters <gerben@digitaldasein.org>

SPDX-License-Identifier: MIT
-->

# Compono

A batteries-included **command-line utility** for **creating**, **publishing**, 
and **archiving** component-based **HTML presentations**.  Quickly develop 
content by exploiting a set of _native_ [web 
components](https://developer.mozilla.org/en-US/docs/Web/Web), included via the 
[`libcompono` 
library](https://gitlab.com/digital-dasein/software/html-presentations/libcompono).

## Features

- Batteries included: a **single (*static*) binary** (~4MB)
- Built-in **stylesheets** and **HTML templates** for convenient initialisation
- Automatically publish your presentation to **Gitlab**, **Github**, or to a 
  **remote server**.
- **Archive** and **compress** your presentation to a `.tar.gz`- or 
  `.zip`-file.

## Docs

- [Creating a presentation](#create)
- [Publishing a presentation](#publish)
- [Archiving a presentation](#archive)
- [Custom HTML elements](#custom-html-elements)

### Create

```bash
Initialise new HTML presentation

USAGE:
    compono create [OPTIONS]

OPTIONS:
    -c, --css <CSS>
            Include default CSS stylesheet. For a custom css path, see the
            '--css-path option' [default: none] [possible values: none,
            dd-basic, shower-dd-basic]

    -C, --css-path <CSS_PATH>
            Path to custom CSS stylesheet

    -f, --output-filename <OUTPUT_FILENAME>
            filename HTML output

    -h, --help
            Print help information

    -n, --no-inline-fonts
            Do not inline font binaries in CSS (include separate WOFF files)

    -o, --output-dir <OUTPUT_DIR>
            Output directory path [default: ./]

    -s, --shower
            Include shower presentation javascript core

    -t, --template <TEMPLATE>
            Use HTML template for presentation. For a custom template path, see
            the '--template-path option' [default: minimal] [possible values:
            minimal, minimal-vim, style-ops, full]

    -T, --template-path <TEMPLATE_PATH>
            Path to custom HTML template

    -V, --version
            Print version information
```

### Publish

```bash
Publish HTML presentation

USAGE:
    compono publish [OPTIONS]

OPTIONS:
    -c, --commit-msg <COMMIT_MSG>
            Git commit message when pushing to remote [default: "Publish HTML
            presentation"]

    -e, --endpoint <ENDPOINT>
            Remote endpoint (IP address/URL) (for `scp` method)

    -h, --help
            Print help information

    -i, --input-dir <INPUT_DIR>
            Path to presentation directory [default: ./]

    -I, --include <INCLUDE>
            Determine which files to include for publishing. By default, the
            `src` tags in the index.html are checked [default: use-html]
            [possible values: use-html, use-gitignore, all]

    -m, --method <METHOD>
            Publication method (for the default `auto` option, the preferred
            method is guessed) [default: auto] [possible values: auto, github,
            gitlab, scp]

    -o, --output-dir <OUTPUT_DIR>
            Remote output directory (for `scp` method). Is directory does not
            exist, it will automatically be created [default: $HOME/<input-dir>]

    -p, --ssh-pass <SSH_PASS>
            SSH passphrase for gitlab/github [default: None]

    -s, --ssh-key <SSH_KEY>
            Path to SSH key for gitlab/github authentication [default:
            $HOME/.ssh/id_ed25519]

    -u, --username <USERNAME>
            Remote server username (for `scp` method)

    -V, --version
            Print version information
```

### Archive

```bash
Archive presentation (tar.gz or zip)

USAGE:
    compono archive [OPTIONS]

OPTIONS:
    -f, --filename <FILENAME>
            Output filename without extension [default: <name-input-dir>]

    -h, --help
            Print help information

    -i, --input-dir <INPUT_DIR>
            Path to presentation directory [default: ./]

    -I, --include <INCLUDE>
            Determine which files to include for publishing. By default, the
            `src` tags in the index.html are checked [default: use-html]
            [possible values: use-html, use-gitignore, all]

    -m, --method <METHOD>
            Set archive and compression method (`zip-stored` = not compressed)
            [default: tar] [possible values: tar, zip, zip-stored]

    -o, --output-dir <OUTPUT_DIR>
            Output directory [default: ./]

    -V, --version
            Print version information
```

### Custom HTML elements

Check out documentation for all [included web 
components](https://gitlab.com/digital-dasein/software/html-presentations/libcompono):

- [dd-grid](https://digital-dasein.gitlab.io/software/html-presentations/dd-grid/docs/classes/DdGrid.html)
- [dd-footer](https://digital-dasein.gitlab.io/software/html-presentations/dd-footer/docs/classes/DdFooter.html)
- [dd-titlepage](https://digital-dasein.gitlab.io/software/html-presentations/dd-titlepage/docs/classes/DdTitlepage.html)
- [dd-slide](https://digital-dasein.gitlab.io/software/html-presentations/dd-slide/docs/classes/DdSlide.html)
- [dd-slide-collection](https://digital-dasein.gitlab.io/software/html-presentations/dd-slide-collection/docs/classes/DdSlideCollection.html)

TODO: `dd-code` component

## Examples

TODO

![](compono.gif)

## Development

### Submodules

#### Install/update

```sh
git submodule update --init --recursive --remote --merge
```

#### Build libcompono

```sh
cd lib/libcompono \
  && yarn install \
  && yarn build
```

#### Build shower

```sh
cd lib/libcompono && yarn build:shower
```

### Compono crate (Rust)

Run program:
```
cargo run -- <subcommand> [OPTIONS]
```

Build release:

```sh
cargo build --release
```

## Attribution

### [Shower](https://github.com/shower/shower)
[`libcompono`](https://gitlab.com/digital-dasein/software/html-presentations/libcompono) 
is heavily inspired by the [Shower presentation 
engine](https://github.com/shower/shower). The 
[`dd-slide-collection`](https://digital-dasein.gitlab.io/software/html-presentations/dd-slide-collection/docs/classes/DdSlideCollection.html) 
component in particular adopted several features and styles from Shower.

Even more so, `libcompono` is **fully compatible** with the [shower 
core](https://github.com/shower/core/), which can be automatically included 
using the `--shower` option when creating a presentation.

As such, the Shower core can **extend** the basic `compono` components, which 
aim to merely possess a limited (yet practical) set of functionalities.

Big thanks to all the Shower contributors!
