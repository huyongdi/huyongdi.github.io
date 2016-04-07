seajs.config({
  base: "./static",
  // 别名配置
  alias: {
    "jquery": "../plugin/jquery/jquery-1.12.3",
    "CommonOperation": "../js/CommonOperation",
    "less": "../plugin/less/less.min",
  },
  // 映射配置
  map: [
    ['.css', '.css'],
    ['.js', '.js']
  ]
});






