<!--
SPDX-FileCopyrightText: 2022 Digital Dasein <https://digital-dasein.gitlab.io/>
SPDX-FileCopyrightText: 2022 Senne Van Baelen <senne@digitaldasein.org>
SPDX-FileCopyrightText: 2022 Gerben Peeters <gerben@digitaldasein.org>

SPDX-License-Identifier: MIT
-->

# Compono

A command-line utility for creating and publishing component-based HTML 
presentations, based on the [`libcompono` 
library](https://gitlab.com/digital-dasein/software/html-presentations/libcompono).

## Submodules

### Install/update

```sh
git submodule update --init --recursive --remote --merge
```

### Build libcompono

```sh
cd lib/libcompono \
  && yarn install \
  && yarn build
```

### Build shower

```sh
cd lib/libcompono && yarn build:shower
```
