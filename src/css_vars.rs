// SPDX-FileCopyrightText: 2022 Digital Dasein <https://digitaldasein.org/>
// SPDX-FileCopyrightText: 2022 Senne Van Baelen <senne@digitaldasein.org>
// SPDX-FileCopyrightText: 2022 Gerben Peeters <gerben@digitaldasein.org>
//
// SPDX-License-Identifier: MIT

/* A collection of CSS variables and their corresponding defaults, available
 * on the `dd-component` elements.
 *
 * This file aims to stay up-to-date with the built-in defaults of
 * the various components, defined in separate projects:
 *   - https://github.com/digitaldasein/dd-slide-collection
 *   - https://github.com/digitaldasein/dd-slide
 *   - https://github.com/digitaldasein/dd-titlepage
 *   - https://github.com/digitaldasein/dd-footer
 *   - https://github.com/digitaldasein/dd-grid
 *   - https://github.com/digitaldasein/dd-code
 *
 * These variables can be set on any parent element (e.g.: `:root` up until
 * `dd-slide-collection`), or on the associated custom HTML elements themselves
 * (e.g. `dd-footer`)
 *
 * Outcommented means they are not set, which is NOT the same as
 * assigning a default "none" value, as some variables may have fallback
 * defaults that are component-specific.
 */
pub fn get_default_css_vars(prefix:&str, indent:&str, suffix:&str)
    -> std::string::String
{
    format!(r#"{prefix}dd-slide-collection {{
{indent}    /* Collection */
{indent}    /*--dd-color-prim:                ;*/
{indent}    /*--dd-color-prim-dark:           ;*/
{indent}    /*--dd-color-sec:                 ;*/
{indent}    /*--dd-color-sec-dark:            ;*/
{indent}    /*--dd-color-list-bg:             ;*/
{indent}    /*--dd-color-text:                ;*/
{indent}    /*--dd-color-text-light:          ;*/

{indent}    --dd-color-caption-link:          inherit;
{indent}    /*--dd-color-caption-bg:          var(--dd-color-prim-dark);*/
{indent}    /*--dd-color-caption-fg:          var(--dd-color-text-light);*/
{indent}    /*--dd-color-heading:             var(--dd-color-prim-dark);*/

{indent}    --dd-full-scale-factor:           1;
{indent}    --dd-slide-gap:                   96px;
{indent}    --dd-slide-ratio:                 calc(16/9);
{indent}    --dd-slide-width:                 1024px;
{indent}    --dd-slide-pad-top:               0px;
{indent}    --dd-slide-pad-top-content:       0px;
{indent}    --dd-slide-pad-left:              25px;
{indent}    --dd-slide-pad-right:             25px;

{indent}    --dd-font:                        24px/2 'Roboto', sans-serif;
{indent}    --dd-font-size:                   24px;
{indent}    --dd-caption-height:              250px;
{indent}}}

{indent}/* Slide */
{indent}dd-slide {{
{indent}    --dd-slide-gridspace-row:         10px;
{indent}    --dd-slide-gridspace-col:         10px;
{indent}    --dd-slide-nr-font-size:          16px;
{indent}    --dd-slide-nr-color:              var(--dd-color-text);
{indent}    --dd-slide-nr-right:              13px;
{indent}    --dd-slide-nr-bottom:             var(--dd-footer-bottom);
{indent}}}

{indent}/* Titlepage */
{indent}dd-titlepage {{
{indent}    --dd-titlepage-padding-side:      50px;
{indent}    --dd-titlepage-padding-top-top:   10px;
{indent}    --dd-titlepage-padding-mid-top:   100px;
{indent}    --dd-titlepage-padding-bot-top:   10px;
{indent}    --dd-titlepage-align-lsec:        left;
{indent}    --dd-titlepage-align-rsec:        right;
{indent}    --dd-titlepage-w-left:            100%;
{indent}    --dd-titlepage-h-top:             calc(0.15 * var(--dd-slide-height));
{indent}    --dd-titlepage-h-middle:          var(--dd-slide-height) - var(--dd-titlepage-h-top) - var(--dd-titlepage-h-bottom);
{indent}    --dd-titlepage-h-bottom:          calc(0.2 * var(--dd-slide-height));
{indent}    --dd-titlepage-font-size:         24px;
{indent}    --dd-titlepage-title-font-size:   calc(2.15 * var(--dd-titlepage-font-size));
{indent}    --dd-titlepage-subtitle-font-size:calc(0.6 * var(--dd-titlepage-title-font-size));
{indent}    --dd-titlepage-logo-height:       calc(var(--dd-titlepage-h-top) / 1.3);
{indent}    --dd-titlepage-logo-top:          calc(var(--dd-titlepage-h-top) - var(--dd-titlepage-logo-height) / 2);
{indent}    --dd-titlepage-logo-left:         var(--dd-titlepage-padding-side);
{indent}    --dd-titlepage-color-fg-top:      var(--dd-color-text);
{indent}    --dd-titlepage-color-bg-top:      var(--dd-color-sec);
{indent}    --dd-titlepage-color-fg-mid:      var(--dd-color-text-light);
{indent}    --dd-titlepage-color-bg-mid:      var(--dd-color-prim);
{indent}    --dd-titlepage-color-fg-bot:      var(--dd-color-text);
{indent}    --dd-titlepage-color-bg-bot:      var(--dd-color-sec);
{indent}    --dd-titlepage-color-link:        inherit;
{indent}}}

{indent}/* Footer */
{indent}dd-footer {{
{indent}    --dd-footer-height:               30px;
{indent}    --dd-footer-img-height:           var(--dd-footer-height);
{indent}    --dd-footer-padding-side:         0px;
{indent}    --dd-footer-padding-bottom:       0px;
{indent}    --dd-footer-padding-text:         0 2px 0 2px;
{indent}    --dd-footer-font-size:            14px;
{indent}    --dd-footer-bottom:               var(--progress-height, 0em);
{indent}    --dd-footer-color-bg:             ;
{indent}}}

{indent}/* Grid */
{indent}dd-grid {{
{indent}    --dd-gridspace-row:               10px;
{indent}    --dd-gridspace-col:               10px;
{indent}}}

{indent}/* Code */
{indent}dd-code {{
{indent}    --dd-code-color-hl:               rgba(251, 247, 25, 0.8);
{indent}    --dd-code-line-height:            1.2em;
{indent}    --dd-code-font-size:              0.75em;
{indent}    --dd-code-padding:                1em;
{indent}    --dd-code-margin:                 0.5em 0 0.5em 0;
{indent}    --dd-code-padding-line-nr:        1.5em;
{indent}    --dd-code-color-bg:               #f3f3f3;
{indent}    --dd-code-color-fg:               black;
{indent}    --dd-code-color-lang:             rgba(0,0,0,0.6);
{indent}}}
{indent}}}{suffix}"#,
    prefix=prefix, indent=indent, suffix=suffix)
}
