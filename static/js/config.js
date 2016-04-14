seajs.config({
  base: "./static",
  // 别名配置
  alias: {
    "jquery": "../plugin/jquery/jquery-1.12.3",
    "CommonOperation": "../js/CommonOperation",
    "less": "../plugin/less/less.min",
    "bootstrap": "../plugin/bootstrap-3.3.5/js/bootstrap.min"
  },
  // 映射配置
  map: [
    ['.css', '.css'],
    ['.js', '.js']
  ]
});






