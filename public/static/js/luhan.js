// JavaScript Document
function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg);  //匹配目标参数
		if (r!=null) return unescape(r[2]); return null; //返回参数值
	}
function showGift(){
	//$("body").append("<p>进入showGift</p>");
		var giftUrl = window.location.href.indexOf("lenovouat") >= 0 ?
			"//buy1.lenovouat.com/bindCouponsForOneKeyPeople.jhtm":
			"//buy.lenovo.com.cn/bindCouponsForOneKeyPeople.jhtm" ;
		$.ajax({
			url : giftUrl + "?activityType=1", //activityType=1 每次管后台要一个
			dataType:"jsonp",
			jsonp:"callbackparam",
			type:"GET",
			success: function(data){
				//$("body").append("<p>success="+data.rc+"</p>");
				if(data.rc == 0){
					data.msg = "恭喜您获得优惠券大礼包"
				}
				$("#giftBox .msg").text(data.msg);
				$("#giftBox").show();
				setTimeout(function(){
					$("#giftBox .msg").text("");
					$("#giftBox").hide();
				},5000)
			},	
			error:function(){
				alert("获取奖品失败，请重试");
			}
		});
	}
function appClick(o){
	//$("body").append("<p>"+o+"</p>")
	if(o == 1 || o == "1"){
		//$("body").append("<p>调用showGift</p>");
		showGift();
	}
}

(function(){	
	if(getUrlParam("fromHome") != 1 || !passport.isLogin()){
		return;
	}
	if(window.location.href.indexOf("m.lenovo") > 0){
		$("#giftBox").addClass("wap");
	}
	$("#giftBox button").click(function(){
		$("#giftBox").hide();
	});
	var ua = navigator.userAgent;
	var isweixin = navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger" ? 1 : 0;
	var isapp =  ua.match("lenovomallapp") == null ? 0 : 1;
	
	if(!isapp){
		if($.cookie("fromClick") != "1"){
			return;
		}else if( $.cookie("fromClick") == "1"){
			var _domain = window.location.href.indexOf("lenovouat") > 0 ? "lenovouat.com" : "lenovo.com.cn";
			$.cookie("fromClick",null,{path:"/",domain:_domain});
			showGift();
		}
	}else{
		try {
			window.HomeIntent.isFromFirstPop();
		} catch (err) {
			setTimeout(function(){
				document.location = "test:isFromFirstPop";
			},500);			
		}
		//return;
	}
	var fromHome = getUrlParam("fromHome") == 1 ? "来自首页" : "来自非首页";
	var fromClick = $.cookie("fromClick") == "1" ? "来自点击" : "来自非点击";
	var fromApp = isapp ? "来自app" : "来自wap";
})();