var _SMALL_ROBOT_PATH = 'http://robotbd.lenovo.com.cn/rjfiles/';
var _SMALL_ROBOT_JS_PATH=_SMALL_ROBOT_PATH+'js/';
var _SMALL_ROBOT_CSS_PATH=_SMALL_ROBOT_PATH+'css/';
var _JS_JQUERY_PATH = _SMALL_ROBOT_JS_PATH+'jquery.js';
var _JS_ROBOT_PATH = _SMALL_ROBOT_JS_PATH+'robot.js';
var _JS_ROBOT_PATH2 = _SMALL_ROBOT_JS_PATH+'jquery-ui-1.10.4.min.js';
var _JS_ROBOT_PATH3 = _SMALL_ROBOT_JS_PATH+'jquery.mousewheel.min.js';
var _JS_ROBOT_PATH4 = _SMALL_ROBOT_JS_PATH+'jquery.mCustomScrollbar.min.js';
var _CSS_ROBOT_PATH = _SMALL_ROBOT_CSS_PATH+'robot.css';
var _CSS_ROBOT_PATH2 = _SMALL_ROBOT_CSS_PATH+'jquery.mCustomScrollbar.css';

var _packages = [_JS_JQUERY_PATH,_JS_ROBOT_PATH,_JS_ROBOT_PATH2,_JS_ROBOT_PATH3,_JS_ROBOT_PATH4];
for (var i = 0; i < _packages.length; i++) {
	document.write('<script type="text/javascript" src="' + _packages[i]
			+ '"></script>');
}
document.write('<link rel="stylesheet" type="text/css" href="' + _CSS_ROBOT_PATH
			+ '"/>');
document.write('<link rel="stylesheet" type="text/css" href="' + _CSS_ROBOT_PATH2
			+ '"/>');

$.ajax({
  async: false, 
  type: 'get',
  url: "http://robotbd.lenovo.com.cn/channelStatistic.page?channel=talk_support",
  contentType: "application/x-www-form-urlencoded; charset=utf-8", 
  dataType: 'jsonp',
  jsonp: 'jsonpCallback',
  jsonpCallback:'jsonpCallback',
  success: function(data){

	  },
	  error:function(){
	   		console.log("error")
	  }
})