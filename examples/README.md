# Examples

Published examples:
- [example-dd-basic](https://digitaldasein.github.io/compono/example-dd-basic/)

## Building examples

The `example-dd-basic` example is constructed with the quick-start command:

```sh
compono create --theme dd-basic --template example --shower --mathjax
```

## Example `compono` commands

### Create

- with a minimal (default) template:

  ```sh
  compono create
  ```

- with a extensively populated `template`, in a 
  (new/existing) `output directory`, with a built-in `theme`:

  ```sh
  compono create -t example -o my-out-dir -T dd-basic
  ```

- extend with features from the [Shower 
core](https://github.com/shower/shower) as backend, and include a custom CSS 
stylesheet:

  ```sh
  compono create -s -c /path/to/my/styles.css
  ```

### Publish

- to Github/Gitlab (automatically detected based on remote origin):

  ```sh
  compono publish
  ```

  &rarr; (for Github) your slides will shortly be available at: 
  `https://<subdomaim>.github.io/organisation/project`

* to Github/Gitlab, by providing a non-default SSH-key, 
  with a custom commit message:

  ```sh
  compono publish --commit "my commit msg" --ssh-key "$HOME/.ssh/id_rsa"
  ```

- to a remote endpoint (secure copy over SSH):

  ```sh
  compono publish -e mydomain.org -u myusername
  ```

  (In case authentication with SSH key fails, either with default key or set 
  with `--ssh-key`, a **fallback** for a **password** input is initiated)

- to a remote endpoint in a non-default remote directory:

  ```sh
  compono publish -e mydomain.org -u root -o "/var/www/html/my-pressie"
  ```

### Archive

- in the current directory:

  ```sh
  compono archive
  ```

  &rarr; outputs `present-<current-date>.tar.gz`

- with a custom filename, using a compressed ZIP format (deflated)

  ```sh
  compono archive -f my-pressie -m zip
  ```
  &rarr; outputs `./my-pressie.zip`
