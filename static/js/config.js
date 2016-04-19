seajs.config({
  base: "./static",
  // 别名配置
  /*paths: {
    'gallery': 'https://a.alipayobjects.com/gallery'
  },*/
  alias: {
    "jquery": "../plugin/jquery/jquery-1.12.3",
    "common": "../js/common",
    "less": "../plugin/less/less.min",
    "bootstrap": "../plugin/bootstrap-3.3.5/js/bootstrap",
    "messenger":"../plugin/messenger/js/messenger.js",
    "camera":"../plugin/camera/camera.min.js"
  },
  // 映射配置
  map: [
    ['.css', '.css'],
    ['.js', '.js']
  ]
});






