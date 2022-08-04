pub const HTML_MINIMAL_RAW:&str = r#"
<!doctype html>
<html lang="en-GB">
  <head>
    <meta charset="utf-8">
    <style>
      @media print { @page { margin: 0; size: 1024px 576px; } }
    </style>
  </head>
  <body>
    <dd-slide-collection main-title=""
                         sub-title=""
                         author=""
                         organisation=""
                         organisation-url=""
                         date=""
                         url=""
                         url-logo=""
                         img-src="">

      <dd-footer></dd-footer>
      <dd-titlepage></dd-titlepage>
      <dd-slide> <h2>My first slide</h2></dd-slide>
    </dd-slide-collection>
  </body>
  <script src="./libcompono.min.js"></script>
</html>"#;
