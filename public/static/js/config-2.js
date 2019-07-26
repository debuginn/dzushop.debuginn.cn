// JavaScript Document..

var myHost = window.location.host;
var myUrl = {}
var myplat = 4; //平台号 （当前为默认值）
var merchantId = 1; //订单平台区分 商城=1 ， think=5， （当前为默认值）
var mcode= "b7d8746a5d6f"; //个人中心高亮菜单

switch (myHost){
	
	 //商城-PC-生产
	case "shop.lenovo.com.cn" :
		myUrl.reg = "//reg.lenovo.com.cn/auth/v1/login?ticket=e40e7004-4c8a-4963-8564-31271a8337d8&ru=" + window.location.href; //未登录跳转
		myUrl.orderlist = "//buy.lenovo.com.cn"; //订单-待评价页面跳转
		myplat = 4;
		merchantId = 1;
		break;
		
	//Think-PC-生产
	case "www.thinkworldshop.com.cn" :
		myUrl.reg = "https://reg.lenovo.com.cn/auth/v1/login?ticket=e40e7004-4c8a-4963-8564-31271a8337d8&ru=" + window.location.href; //未登录跳转
		myUrl.orderlist = "//order.thinkworldshop.com.cn"; //订单-待评价页面跳转
		myplat = 8;
		merchantId = 5
		break;
		
	/*   ↑↑↑↑↑ 生产 ↑↑↑↑↑  */
	/*   ↓↓↓↓↓ 测试 ↓↓↓↓↓  */
	
	//商城-PC-UAT
	case "shop.lenovouat.com" :
		myUrl.reg = "//reg.lenovouat.com/auth/v1/login?ticket=e40e7004-4c8a-4963-8564-31271a8337d8&ru=" + window.location.href; //未登录跳转
		myUrl.orderlist = "http://buy1.lenovouat.com"; //订单-待评价页面跳转
		myplat = 4;
		merchantId = 1;
		break;
	//Think-PC-UAT
	case "www.tks.lenovouat.com" :
		myUrl.reg = "//reg.lenovouat.com/auth/v1/login?ticket=e40e7004-4c8a-4963-8564-31271a8337d8&ru=" + window.location.href; //未登录跳转
		myUrl.orderlist = "//order.tks.lenovouat.com"; //订单-待评价页面跳转
		myplat = 8;
		merchantId = 5;
		break;
}

if(passport.isLogin() == false){ window.location.href = myUrl.reg;}

function gotoOrderlist(s){
	if(s == undefined){
		window.location.href=myUrl.orderlist+"/center/orderlist.jhtm?merchantId=" + merchantId;
	}else{		
		window.location.href=myUrl.orderlist+"/center/orderlist.jhtm?merchantId="+merchantId+"&sd="+s;
	}
}