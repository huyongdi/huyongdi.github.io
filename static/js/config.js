seajs.config({
  // 别名配置
  alias: {
    // 通用框架模块
    "jquery": "../plugin/jquery/1.7.2/jquery",

    // 当前项目自定义模块
    "CommonOperation": "../js/CommonOperation",

  },
  // 映射配置
  map: [
    ['.css', '.css'],
    ['.js', '.js']
  ]
});






