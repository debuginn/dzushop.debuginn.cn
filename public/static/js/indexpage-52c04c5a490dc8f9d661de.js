$(".tc-icon").click(function(){window.location.href="./questionnaire.html"});var indexpage=function(){var t,e,o,n=0,i=JSON.parse(localStorage.getItem("deviceinfos")),a=JSON.parse(localStorage.getItem("loginInfo")),s=util.isMobile();$(function(){var s=function(t,e){$.ajax({url:apihref+"/ad/recommend_list",type:"get",data:{scenario:t,lenovoid:e}}).done(function(t){var e={web_url:"https://activity.lenovo.com.cn/sales/sc.index.html?pmf_group=in-push&pmf_medium=fuwupindao&pmf_source=Z00008767T000",pc_img:"img/indexpage/gameban.jpg",good_number:"gameban"},o={web_url:"https://browser.lenovo.com.cn/activity/sevenoneone?from=fuwu",pc_img:"img/indexpage/zhlx.png",good_number:"zhlx"},n={web_url:"http://x.lenovo.com.cn/",pc_img:"img/indexpage/robotbanner.jpg",good_number:"robotbanner"},i={web_url:"https://activity.lenovo.com.cn/xiaofei/xpsf/index.html?&pmf_group=qan&pmf_medium=qan&pmf_source=Z00009033T000",pc_img:"img/indexpage/renimg.jpg",good_number:"renimg"};t.data.ad_list.unshift(n),t.data.ad_list.unshift(i),t.data.ad_list.unshift(e),t.data.ad_list.unshift(o);for(var a=t.data.flag,s=[],r=0;r<t.data.ad_list.length;r++)t.data.ad_list[r].flag=a,s.push(t.data.ad_list[r]);var l=Handlebars.compile($("#showBannerList").html());$(".swiper-wrapper").html(l(s)),$(".myloading").hide();new Swiper(".swiper-container",{pagination:".pagination",paginationClickable:!0,autoplay:5e3,loop:!0,autoplayDisableOnInteraction:!1})})};null!==a&&""!=a.lenovoid?s("homepage",a.lenovoid):s("homepage","");var l=util.isMobile();delaytime=6e4,$(".satisfaction-content h5").text("诚邀您参加新版服务网站满意度调查，您的意见对我们很重要"),$(".button-content a").attr("href","http://servicesurvey.lenovo.com.cn/s/YpglDLp/0"),m(),l&&null!=sessionStorage.getItem("indexlat")&&""!=sessionStorage.getItem("indexlat")?(t=sessionStorage.getItem("indexlat"),e=sessionStorage.getItem("indexlng"),o=sessionStorage.getItem("indexcity"),null!=i&&""!=i.categoryid?c(i.categoryid):p("笔记本")):r(),null!==a&&""!=a.lenovoid?(g(a.lenovoid),$(".haslogin-showproductline").show(),$(" .nologinselprofduct").hide()):($(".nologinselprofduct").show(),$(".gobind-machine").show(),$(".haslogin-showproductline").hide()),$(".hasloginlook-more").click(function(){n++,n%2==0?($(this).hasClass("look-more")?(l&&($(".other-lines").css("margin-top","0.4rem"),$(".look-more").css({"border-bottom":"1px solid #ddd","padding-bottom":"0.46rem"})),$(".other-lines").slideUp(),$(this).find(".tips-text").html("展开联想其他产品")):(l&&($(".hasloginother-lines").css("margin-top","0.4rem"),$(".hasloginlook-more").css({"border-bottom":"1px solid #ddd","padding-bottom":"0.46rem"})),$(".hasloginother-lines").slideUp(),$(this).find(".tips-text").html("展开我的联想其他产品")),$(this).find(".tips-add").css({transform:"rotate(0deg)",transition:".1s"})):($(this).hasClass("look-more")?(l?($(".look-more").css({"border-bottom":"none","padding-bottom":"0"}),$(".other-lines").css("margin-top",0)):$(".look-more").css("border-bottom","none"),$(this).find(".tips-text").html("收起联想其他产品"),$(".other-lines").slideDown(1e3)):(l?$(".hasloginlook-more").css({"border-bottom":"none","padding-bottom":"0"}):$(".hasloginlook-more").css("border-bottom","none"),$(this).find(".tips-text").html("收起我的联想其他产品"),$(".hasloginother-lines").slideDown("slow")),$(this).find(".tips-add").css({transform:"rotate(45deg)",transition:".1s"}))}),l&&$(".footer-box .top-text").click(function(){var t=$(this).siblings(".nav-list");t.slideToggle("normal",function(){"block"==t.css("display")?($(".top-text").find("span").css({transform:"rotate(45deg)",transition:".1s"}),$(this).parents("li").siblings("li").find(".nav-list").slideUp(),$(this).parents("li").siblings("li").find(".top-text span").css({transform:"rotate(0deg)",transition:".1s"})):$(".top-text").find("span").css({transform:"rotate(0deg)",transition:".1s"})})}),Handlebars.registerHelper("resolvephone",function(t){var e;return e=t.indexOf("/")>-1?t.split("/")[0]:t.split("-").length-1==0&&11!=t.length?t.substr(0,3)+"-"+t.substr(3,3)+"-"+t.substr(6,4):11==t.length?t.substr(0,3)+"-"+t.substr(3,4)+"-"+t.substr(7,4):t}),Handlebars.registerHelper("resolveimghttp",function(t){var e=t.replace("http://","https://");return e})});var r=function(){map=new AMap.Map("container",{resizeEnable:!0}),map.plugin("AMap.Geolocation",function(){geolocation=new AMap.Geolocation({enableHighAccuracy:!0,timeout:1e4,buttonOffset:new AMap.Pixel(10,20),zoomToAccuracy:!0,buttonPosition:"RB"}),map.addControl(geolocation),geolocation.getCurrentPosition(),AMap.event.addListener(geolocation,"complete",l),AMap.event.addListener(geolocation,"error",d)})},l=function(n){t=n.position.lat,e=n.position.lng,sessionStorage.setItem("indexlat",t),sessionStorage.setItem("indexlng",e),""==n.addressComponent.city?(o=n.addressComponent.province,sessionStorage.setItem("indexcity",o)):(o=n.addressComponent.city,sessionStorage.setItem("indexcity",o)),null!=i&&""!=i.categoryid?c(i.categoryid):p("笔记本")},d=function(n){t=39.90923,e=116.397428,o="北京市",null!=i&&""!=i.categoryid?c(i.categoryid):p("笔记本")},c=function(t){$.ajax({url:apihref+"/node/getmachineinfo",data:{categoryid:t}}).done(function(t){p(200==t.statusCode&&""!=t.data.typename?t.data.typename:"笔记本")})},p=function(n){$.ajax({url:apihref+"/station/list",data:{lat:t,lng:e,city:o,order_by:"Distance",type:n}}).done(function(t){var e=Handlebars.compile($("#nearServernet").html());$(".servernet-box .detail-box").html(e(t.data[0])),lnv.destroyloading()})},g=function(t){$(".myloading").show(),$.ajax({url:apihref+"/user/"+t+"/machine/all",data:{lenovoID:t,limit:4}}).done(function(t){if($(".myloading").hide(),t.data.data&&t.data.data.length>0){$(".gobind-machine").hide(),$(".userbinproduct .usermachine-box").show();var e=Handlebars.compile($("#showUserbindmachine").html());$(".userbinproduct .usermachine-box").html(e(t.data.data)),s?$(".userbinproduct ul li").css("width","50%"):1==t.data.data.length?$(".userbinproduct ul li").css("width","100%"):2==t.data.data.length?$(".userbinproduct ul li").css("width","50%"):$(".userbinproduct ul li").css("width","25%")}else $(".nologinselprofduct").show(),$(".haslogin-showproductline").hide(),$(".gobind-machine").show()})},m=function(){$.ajax({url:apihref+"/node/getnewarticles"}).done(function(t){for(var e=0,o=t.data.length;e<o;e++)t.data[e].tjIndex=e+1;var n=Handlebars.compile($("#gethotproblems").html());$(".problems-list").html(n(t.data))})}}();