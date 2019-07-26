
$(function(){
	$('.index_menu150112_title').hover(function(){
		$(this).children('.index_menu150112_title_submenu').show();	
	},function(){$(this).children('.index_menu150112_title_submenu')
		$(this).children('.index_menu150112_title_submenu').hide();
	});
	
	if ( $(".index_packet_small_wrap").length > 0 ) {
	} 
	else {
		$(".index_menu150112_ad").show();
	}

})
var HomeURL = "https://support.lenovo.com.cn/lenovo/wsi/";
var index_menu150112 = '<div class="index_menu150112">\
  <div class="index_menu150112_title index_menu150112_width1"><a class="index_menu150112_title_a" href="'+HomeURL+'index.html">首页</a></div>\
  <div class="index_menu150112_title index_menu150112_width3">\
    <div class="index_menu150112_title_submenu index_menu150112_width3">\
      <div class="index_menu150112_title_submenu_icon"></div>\
      <a class="index_menu150112_title_submenu_a" href="' + HomeURL + 'Modules/NewDrive.aspx?intcmp=I_F_Fast_Driver_1">驱动下载首页</a><a class="index_menu150112_title_submenu_a" href="' + HomeURL + 'Modules/newbxpz.aspx">联想驱动管理</a><a class="index_menu150112_title_submenu_a" href="' + HomeURL + 'Modules/autocd.aspx?from=disc" >驱动安装光盘</a><a class="index_menu150112_title_submenu_a" href="https://saas.lenovo.com.cn/#/download?_k=8crfgc" >联想应用中心</a></div>\
    <a class="index_menu150112_title_a">驱动程序下载</a></div>\
  <div class="index_menu150112_title index_menu150112_width2">\
    <div class="index_menu150112_title_submenu index_menu150112_width2">\
      <div class="index_menu150112_title_submenu_icon"></div>\
      <a class="index_menu150112_title_submenu_a" href="'+HomeURL+'station/servicestation/default.aspx">服务网点</a><a class="index_menu150112_title_submenu_a" href="'+HomeURL+'Modules/newbxpz.aspx">保修及配置</a><a class="index_menu150112_title_submenu_a" href="'+HomeURL+'htmls/policylist_1349943520435.aspx?ref=OK">服务政策</a><a class="index_menu150112_title_submenu_a" href="'+HomeURL+'htmls/Serving.aspx">耗材防伪</a><a class="index_menu150112_title_submenu_a" href="'+HomeURL+'htmls/Serving.aspx">服务器证书</a></div>\
    <a class="index_menu150112_title_a">服务查询</a></div>\
  <div class="index_menu150112_title index_menu150112_width3">\
    <div class="index_menu150112_title_submenu index_menu150112_width3">\
      <div class="index_menu150112_title_submenu_icon"></div>\
      <a class="index_menu150112_title_submenu_a" href="'+HomeURL+'wsbx/lenovo/ForTechnicalSupport.aspx">预约技术支持</a><a class="index_menu150112_title_submenu_a" href="'+HomeURL+'usercenter/chat/GoChatClient.aspx">在线技术支持</a><a class="index_menu150112_title_submenu_a" href="'+HomeURL+'weixin.html" target="_blank">微信支持</a><a class="index_menu150112_title_submenu_a" href="http://robot.lenovo.com.cn/lenovo/?intcmp=I_F_Robot" target="_blank">智能机器人</a></div>\
    <a class="index_menu150112_title_a">网上支持</a></div>\
  <div class="index_menu150112_title index_menu150112_width2"><a class="index_menu150112_title_a" href="http://dianping.lenovo.com.cn/">点评平台</a></div>\
  <div class="index_menu150112_title index_menu150112_width2">\
    <div class="index_menu150112_title_submenu index_menu150112_width2">\
      <div class="index_menu150112_title_submenu_icon"></div>\
      <a class="index_menu150112_title_submenu_a" href="http://ask.lenovo.com.cn/">联想问吧</a><a class="index_menu150112_title_submenu_a" href="https://club.lenovo.com.cn/?from=support1">官方社区</a></div>\
    <a class="index_menu150112_title_a">社区</a></div>\
  <div class="index_menu150112_title index_menu150112_width4">\
    <div class="index_menu150112_title_submenu index_menu150112_width4">\
      <div class="index_menu150112_title_submenu_icon"></div>\
      <a class="index_menu150112_title_submenu_a" href="https://think.lenovo.com.cn">Think产品支持首页</a><a class="index_menu150112_title_submenu_a" href="https://think.lenovo.com.cn/support/driver/mainpage.aspx">Think产品驱动下载</a><a class="index_menu150112_title_submenu_a" href="https://think.lenovo.com.cn/service/warranty/newSearchWarranty.aspx">保修期查询</a><a class="index_menu150112_title_submenu_a" href="https://think.lenovo.com.cn/stations/TSStation.aspx">服务网点查询</a></div>\
    <a class="index_menu150112_title_a" href="https://think.lenovo.com.cn/">Think产品支持</a></div>\
  <div class="index_menu150112_title index_menu150112_width3">\
    <div class="index_menu150112_title_submenu index_menu150112_width3">\
      <div class="index_menu150112_title_submenu_icon"></div>\
      <a class="index_menu150112_title_submenu_a" target="_blank" href="https://www.lenovo.com.cn/home/serviceindex.html?tag=a111&SourceFlag=Support_Home&CheckCode=Test123">延保服务</a><a class="index_menu150112_title_submenu_a" target="_blank" href="https://www.lenovo.com.cn/product/51640.html?ProductNo=12050300000897&SourceFlag=Support_Home&CheckCode=Test123">驱动安装</a><a class="index_menu150112_title_submenu_a" target="_blank" href="https://www.lenovo.com.cn/activity/ob/index.html">旧机升级（台式机）</a><a class="index_menu150112_title_submenu_a" target="_blank" href="https://www.lenovo.com.cn/activity/ssdupgrade/index.html?lenovoservice&SourceFlag=Support_Home&CheckCode=Test123">硬盘升级</a><a class="index_menu150112_title_submenu_a" target="_blank" href="https://365.lenovo.com.cn/?from=lenser04">远程专家</a><a class="index_menu150112_title_submenu_a" target="_blank" href="https://www.lenovo.com.cn/product/51641.html?ProductNo=12050300000905&SourceFlag=Support_Home&CheckCode=Test123">专家上门</a><a class="index_menu150112_title_submenu_a" target="_blank" href="https://support.lenovo.com.cn/lenovo/wsi/templetes/cardPassword.html">联想新机保障卡</a><a class="index_menu150112_title_submenu_a" target="_blank" href="https://www.lenovo.com.cn/home/serviceindex.html ">更多服务</a></div>\
    <a class="index_menu150112_title_a" href="https://s.lenovo.com.cn/?index=161&329=040102&fromhomepage&bigClassID=&ClassID=37255377-542d-420d-a026-7b83c6120a4f&Year=1&Type=Expend&SourceFlag=Support_Home&CheckCode=Test123&SDIID=">联想增值服务</a></div>\
  <!--<div class="index_menu150112_win"><a href="/lenovo/wsi/Modules/Win10/win10.html" target="_blank" class="index_menu150112_win_a">免费升级到Windows10</a></div>-->\
	<div class="index_menu150112_title index_menu150112_width2"><a href="http://weixin.lenovo.com.cn/weixin/index.php/qcs_web/index/source/lenovoservice" class="index_menu150112_title_a" style="border:0;color:#eb4f38">官方微信</a></div>\
</div>\
<!-- 飘窗2015-07-21  -->\
<!-- <div class="ad150721" style="background: url(/lenovo/wsi/templetes/images/ad20150806.png); margin: 0px 0px 0px 505px; height: 300px; width: 145px; position: fixed; left: 50%; top: 113px; border: 1px solid #ddd;"><i class="ad150721_close" style="color: #ddd; display: block; height: 25px; width: 25px; margin: 0px 0px 0px 120px; font: bold normal 24px/25px \'Microsoft Yahei\', \'simhei\'; text-align: center; cursor: pointer; position:absolute;">×</i><a target="_blank" href="https://videoservice.lenovo.com.cn/PCWeb/videoweb/pages/index.html" style="display: block; height: 300px; width: 145px;"></a></div>-->\
<!--<script type="text/javascript">$(document).ready(function () {$(".ad150721_close").click(function(){$(this).parent(".ad150721").fadeOut(300);});})</script>-->\
<!-- 飘窗2015-07-21结束  -->\
<!-- 服务站预约新入口2015-07-23  -->\
<script type="text/javascript">$(document).ready(function () {$(".ad-yyfw").click(function(){$(".ad-yyfw_pop").fadeIn(300);$(".ad-yyfw_mask").fadeIn(300);_hmt && _hmt.push(["_trackEvent", "飘窗", "点击", "人工帮助"]);});$(".ad-yyfw_pop_close").click(function(){$(".ad-yyfw_pop").fadeOut(300);$(".ad-yyfw_mask").fadeOut(300);});})</script>\
<div class="ad-yyfw" style="background: url(/lenovo/wsi/v/images/yyfw_bg02.png) no-repeat 0px 0px; margin: 0px 0px 0px -630px; height: 157px; width: 111px; position: fixed; left: 50%; top: 250px; cursor: pointer;"></div>\
<div class="ad-yyfw_mask" style="z-index:1000; height: 100%; width: 100%; position: fixed; left: 0px; top: 0px; background: #000; filter: alpha(opacity=50); opacity: .5; display: none;"></div>\
<div class="ad-yyfw_pop" style="z-index:1001; background: url(/lenovo/wsi/v/images/human-help-bg.png); height: 383px; width: 728px; position: fixed; left: 50%; top: 50%; margin: -200px 0px 0px -374px; display: none;"><div class="ad-yyfw_pop_close" style="margin: 26px 0px 0px 678px; height: 44px; width: 44px; position: absolute; cursor: pointer;"></div><a href="/lenovo/wsi/activity/zzyy/stepone.html?intcmp=fwgw_yywx_20150723" style="display: block; margin: 291px 0px 0px 150px; height: 36px; width: 118px; position: absolute; cursor: pointer;"></a></div>\
<!-- 服务站预约新入口2015-07-23结束  -->\
	';
	document.write(index_menu150112);