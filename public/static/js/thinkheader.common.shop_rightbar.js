function navborder(a){a="number"==typeof a?a:400;var b=$(".think_navul>li"),c=$(".think_nav_border");b.hover(function(){c.stop().animate({left:$(this).offsetParent().context.offsetLeft,width:$(this).find("a").width()},a)},function(){c.stop().animate({left:0,width:0},a)})}function getQueryString(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)","i"),c=window.location.search.substr(1).match(b);return null!=c?decodeURIComponent(c[2]):""}function loadScript(a,b){var c=document.createElement("script");c.type="text/javascript",c.readyState?c.onreadystatechange=function(){"loaded"!=c.readyState&&"complete"!=c.readyState||(c.onreadystatechange=null,b())}:c.onload=function(){b()},c.src=a,document.body.appendChild(c)}function addCookie(a,b,c){var d=a+"="+escape(b)+";path=/";if(0!=c&&""!=c&&null!=c){var e=new Date;e.setTime(e.getTime+24*c*3600*1e3),d=d+"; expires="+e.toGMTString()}document.cookie=d}function getCookie(a){for(var b=document.cookie,c=b.split("; "),d=0;d<c.length;d++){var e=c[d].split("=");if(e[0]==a)return unescape(e[1])}return null}function isLogin(){if(window.passport&&passport.isLogin()){var a="http://www.thinkworldshop.com.cn";window.location.href=a+"/user/index.html"}else logobj.showlogin()}function tocenterisLogin(){if(window.passport&&passport.isLogin()){var a="//i.lenovo.com.cn/info/center.jhtml?sts=e40e7004-4c8a-4963-8564-31271a8337d8";window.location.href=a}else logobj.showlogin()}function LoginLenovo(a){var b=logobj._logurl+"?ticket="+logobj.config.ticket+"&ru="+a;window.top.location.href=b}function showLoading(){0==jQuery("#loading_box").length&&jQuery("body").append("<div class='pop loading' id='loading_box'><img src='/images/loading1.gif'></div>"),jQuery("#loading_box").show()}function hideLoading(){0!=jQuery("#loading_box").length&&jQuery("#loading_box").hide()}function alertBox(a,b){if(0==jQuery("#mask0").length&&jQuery("body").append("<div id='mask0'/>"),jQuery("#mask0").show(),0==jQuery(".alert_tip").length){jQuery("body").append('<div class="alert_tip"><i class="alert_close"></i><div class="clear"></div><div class="alert_cont"><div class="txt"></div></div></div>')}var c=jQuery(".alert_tip"),d=jQuery(".alert_cont");1==b?d.removeClass("e1"):d.addClass("e1"),d.children(".txt").html(a),c.show(),d.children(".txt").css("marginTop",(60-d.children(".txt").height())/2+"px"),alertPosition();var e=arguments[2];jQuery(".alert_close").click(function(){jQuery("#mask0,.alert_tip").hide(),e&&window.location.reload()})}function alertPosition(){jQuery(".alert_tip").is(":visible")&&jQuery(".alert_tip").css({top:($(window).height()-jQuery(".alert_tip").height())/2+"px",left:(jQuery(window).width()-jQuery(".alert_tip").width())/2+"px"})}function messageBox(a,b){if(0==jQuery("#mask").length&&jQuery("body").append("<div id='mask'/>"),jQuery("#mask").show(),0==jQuery("#messageBox").length){jQuery("body").append('<div class="u_box order_1" id="messageBox"><div class="u_box_title"><i id="close_btn"></i><div id="box_title"></div></div><div id="box_info"></div></div>')}var c=jQuery("#messageBox");$("#box_title").html(a),$("#box_info").html(b),c.show(),boxPosition(),jQuery("#close_btn").click(function(){jQuery("#mask,#messageBox").hide()})}function boxPosition(){jQuery("#messageBox").is(":visible")&&jQuery("#messageBox").css({"margin-top":-jQuery("#messageBox").height()/2+"px","margin-left":-jQuery("#messageBox").width()/2+"px"})}function iframeBox(a,b,c,d){if(0==jQuery("#mask").length&&jQuery("body").append("<div id='mask'/>"),jQuery("#mask").show(),0==jQuery("#iframeBox").length){var e='<div class="u_box order_1" id="iframeBox"><div class="u_box_title"><i id="close_btn"></i><div id="box_title"></div></div><iframe id="box_info" src="'+d+'" scrolling="no" style="display:block;margin:0px auto;" frameborder="0" height='+c+" width="+b+"></iframe></div>";jQuery("body").append(e)}var f=jQuery("#iframeBox");$("#box_title").html(a),$("#box_info").attr("src",d),$("#box_info").attr("width",b),$("#box_info").attr("height",c),f.show(),iframeboxPosition(),jQuery("#close_btn").click(function(){jQuery("#mask,#iframeBox").hide(),window.location.reload()})}function iframeClose(a){""!=a&&alert(a),$("#mask").hide(),$("#iframeBox").remove()}function iframeboxPosition(){jQuery("#iframeBox").is(":visible")&&jQuery("#iframeBox").css({"margin-top":-jQuery("#iframeBox").height()/2+"px","margin-left":-jQuery("#iframeBox").width()/2+"px"})}function scroll(){var a=$(window).scrollTop(),b=$(window).height();a<74?$("#shop_rightbar").css({height:b-(74-a)+"px",top:74-a+"px"}):$("#shop_rightbar").css({height:b+"px",top:"0px"})}var navpadding={logined:function(){var a=($(".think_user").width(),$(".think_nav .navpad")),b=$(".think_search input"),c=0;a.css("padding-right","70px"),b.unbind("focus").focus(function(b){0==c?(a.css("padding-right","55px"),$(this).stop(!0,!0).animate({width:"220px"}).parent(".think_search").stop(!0,!0).animate({width:"260px"}),c=1):($(this).blur(),b.stopPropagation())}),b.unbind("blur").blur(function(b){1==c?($(this).stop(!0,!0).animate({width:"160px"}).parent(".think_search").stop(!0,!0).animate({width:"200px"},function(){a.css("padding-right","70px"),c=0}),b.stopPropagation()):$(this).focus()})},unlogin:function(){var a=($(".think_user").width(),$(".think_nav .navpad")),b=$(".think_search input"),c=0;b.focus(function(b){0==c?(a.css("padding-right","85px"),$(this).animate({width:"220px"}).parent(".think_search").animate({width:"260px"}),c=1):($(this).blur(),b.stopPropagation())}),b.blur(function(b){if(1==c){var d=$(this),e=$(this).parent();window.setTimeout(function(){$(d).animate({width:"200px"},function(){a.css("padding-right","100px"),c=0}),$(e).animate({width:"200px"})},500),b.stopPropagation()}else $(this).focus()})}};String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"")},$(function(){window.passport&&passport.isLogin()?($(".ellipsis").html(passport.cookie.loginName),$(".think_login").hide(),$(".think_register").show()):navborder(300);var a="//buy.lenovo.com.cn/getshoppingcartcount.jhtml";$.ajax({url:a,dataType:"jsonp",async:!1,type:"get",jsonp:"callbackparam",success:function(a){0==a.count?$(".think_car i").removeClass("usepng"):$(".think_car i").addClass("usepng")},error:function(a,b,c){console.error(a.status),console.error(a.readyState),console.error(b)}})});var globalconfig={platid:8};$(function(){jQuery(window).resize(function(){alertPosition()}).scroll(function(){}),window.setTimeout(function(){"products.thinkworld.com.cn"==document.domain?$("#shop_contact img").attr("src","http://m1.lefile.cn/tp/c/images"+"/footer_number_old.png"):$("#shop_contact img").attr("src","http://m1.lefile.cn/tp/c/images"+"/footer_number.png")},0)}),$(function(){var a="ad68e8e1-b719-443e-aa0f-d5fcbcdd83ae";passport.init({ticket:a,drawUserInfo:function(){$(".ellipsis").html(passport.cookie.loginName),$(".think_login").hide(),$(".think_register").show()},logout:function(){$(".think_login").show(),$(".think_register").hide()}}),$("body").delegate(".login","click",function(){passport.show()}).delegate(".logout","click",function(){passport.doLogout()}).delegate(".regist","click",function(){passport.hide(),-1!=location.href.indexOf("lenovouat")?window.location.href="https://reg.lenovouat.com/auth/v1/regist?ru="+location.href+"&ticket="+a:window.location.href="https://reg.lenovo.com.cn/auth/v1/regist?ru="+location.href+"&ticket="+a}).delegate(".forgetPwd","click",function(){passport.hide(),recover.init(a)})});var logobj={showlogin:function(a){passport.show(),"function"==typeof a&&(console.log("您在不恰当的位置设置了登陆后的跳转,为了保证安全，页面将会对您的设置进行延迟跳转(2s)"),passport.login=function(){setTimeout(a,2e3)})}};$(function(){scroll(),$(".shop_pointer").hover(function(){$(this).addClass("active").find(".V_jt,.V_icon_cont").show()},function(){$(this).removeClass("active").find(".V_jt,.V_icon_cont").hide()}),$("#shop_totop").click(function(){$("html,body").animate({scrollTop:0},500)});var a="//srv.lenovo.com.cn/chat/index.do?gd=12&sd=1&pt=16";window.code&&(a+="&gc="+window.code+"&bu="+window.buOwner),$("#shop_online_talk").attr("href",a),$(window).scroll(function(){scroll()})});