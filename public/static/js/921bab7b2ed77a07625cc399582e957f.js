jQuery(function(){var m="e40e7004-4c8a-4963-8564-31271a8337d8";function n(){var q=passport.cookie.lenovoId;for(var r=passport.cookie.lenovoId.length;r<20;r++){q="0"+q}var s=(window.location.href.indexOf("lenovouat")>-1?"//i.lenovouat.com":"//i.lenovo.com.cn");var p="https://i.app.lefile.cn/uc_server/data/avatar/"+q.substring(0,5)+"/"+q.substring(5,10)+"/"+q.substring(10,15)+"/"+q.substring(15,q.length)+"_profilehead.w50.jpg";jQuery.ajax({url:"https:"+s+"/mcenter/getUserNameAndUserLevel.jhtml?lenovoId="+passport.cookie.lenovoId+"&sts=e40e7004-4c8a-4963-8564-31271a8337d8",type:"get",dataType:"jsonp",async:false,jsonp:"callback",success:function(v){if(v.ret){jQuery(".uer_img").attr("src",v.data.image);jQuery(".user").find(".userName").html(v.data.username);jQuery(".user_id").find(".noName").html(v.data.username);var t="https://p3.lefile.cn/product/adminweb/2019/01/22/f1d4b5d5-b229-4bb5-93f4-7f0e64b274fe.png";var u="普卡会员";if(v.data.userLeve=="1017"){t="https://p3.lefile.cn/product/adminweb/2019/01/22/f1d4b5d5-b229-4bb5-93f4-7f0e64b274fe.png";u="普卡会员"}else{if(v.data.userLeve=="1018"){t="https://p2.lefile.cn/product/adminweb/2019/01/22/d077d2c7-9d51-4225-9735-8cc3a93db2d3.png";u="银卡会员"}else{if(v.data.userLeve=="1019"){t="https://p3.lefile.cn/product/adminweb/2019/01/22/c9e5ac8e-727d-4f63-b6b7-5fec2e9bb4f3.png";u="金卡会员"}else{if(v.data.userLeve=="1020"){t="https://p2.lefile.cn/product/adminweb/2019/01/22/c50adf05-b792-4fbd-b847-7fc5464cb861.png";u="白金卡会员"}}}}jQuery(".user").find(".userLeve").attr("src",t);jQuery(".myCenter").find(".img_vp").attr("src",t);jQuery(".myCenter").find(".user_vp").html(u)}},error:function(t){console.log(t)}});jQuery(".user").hover(function(){if(i){d()}});function o(){var t=(window.location.href.indexOf("lenovouat")>-1?"//i.lenovouat.com":"//i.lenovo.com.cn");if(window.passport&&window.passport.isLogin()&&window.passport.cookie){jQuery.ajax({url:t+"/internal/msg/getUnReadMsg.jhtml?sts=e40e7004-4c8a-4963-8564-31271a8337d8",dataType:"jsonp",type:"get",jsonpCallback:"defaultcallback",success:function(u){if(u.ret){if(u.count&&u.count>0){jQuery(".msg_heaer").find("img").attr("src","https://p1.lefile.cn/product/adminweb/2018/12/29/bc5a12fe-f9fc-40ca-b92f-08bf3d8e9ae5.png")}}},error:function(v,u,w){}})}else{return}}o()}var h=false;if(window.location.href.indexOf("club.lenovo.com.cn")!=-1||window.location.href.indexOf("bbs.thinkpad.com")!=-1){h=true}passport.init({ticket:m,drawUserInfo:function(){jQuery(".hd-login-regist").hide();jQuery(".hd-login-show").show();n()},login:function(){window.location.replace(document.URL);if(h){loginsucess_club()}},logout:function(){window.location.replace(document.URL);if(h){logoutsucess_club()}}});jQuery("body").delegate(".login","click",function(){passport.show()}).delegate(".logout","click",function(){passport.doLogout()});function b(o){a.showlogin(function(){window.location.href=o})}var a={showlogin:function(o){passport.show();if(typeof o=="function"){console.log("您在不恰当的位置设置了登陆后的跳转,为了保证安全，页面将会对您的设置进行延迟跳转(2s)");passport.login=function(){setTimeout(o,2000)}}}};var i=true;function d(){var o=(window.location.href.indexOf("lenovouat")>-1?"//i.lenovouat.com":"//i.lenovo.com.cn");jQuery.ajax({url:"https:"+o+"/mcenter/getUserAssetsInfo.jhtml?lenovoId="+passport.cookie.lenovoId+"&sts=e40e7004-4c8a-4963-8564-31271a8337d8",type:"get",dataType:"jsonp",async:false,jsonp:"callback",success:function(p){if(p.res){var p=p.data;jQuery(".userledou").html(p.ledou);jQuery(".usercoupon").html(p.coupon);jQuery(".userScore").html(p.userScore);jQuery(".userGrowth").html(p.userGrowth);i=false}},error:function(p){console.log(p)}})}function g(){var o=jQuery(".ul_r_2018");jQuery(window).scroll(function(){var p=jQuery(window).scrollTop();if(p>50){jQuery(".header_nav").hide();jQuery(".ul_r_box").html(o);jQuery(".header_box").addClass("header_min");jQuery(".header_2018").css("position","fixed");jQuery("hold_header").css("height","50px");jQuery(".search").hide();jQuery(".search_btn").show();jQuery(".hold_header").show();if(passport.isLogin()){jQuery(".user").hover(function(){if(i){d()}})}}else{jQuery(".ur_r_html").html(o);jQuery(".header_nav").show();jQuery(".ul_r_box").html("");jQuery(".header_box").removeClass("header_min");jQuery(".header_2018").css("position","static");jQuery("hold_header").css("height",50-p+"px");jQuery(".search").show();jQuery(".search_btn").hide();jQuery(".hold_header").hide();if(passport.isLogin()){jQuery(".user").hover(function(){if(i){d()}})}}if(p>100){jQuery(".sort").show()}else{jQuery(".sort").hide()}})}g();var c=jQuery(".header_box .lis");var k=jQuery(".ul_r_box");var l=true;var f=0;jQuery(".search_btn").click(function(){jQuery(".search").addClass("search_center");jQuery("body").css("overflow-y","hidden");if(!l){return false}l=false;c.animate({opacity:0},300);jQuery(".serch_box_img").css({marginRight:-500});k.fadeOut(400,function(){jQuery(".search").show();c.addClass("close").removeClass("open");l=true;jQuery(".search_btn").hide();jQuery(".serch_box_img").animate({marginRight:225},400,function(){jQuery(".search_colse").show()});jQuery(".search_box").find("input").val("");setTimeout(function(){jQuery(".search_box").find("input")[0].focus();jQuery(".header_min").find(".ul").hide()},500)})});jQuery(".search_colse").click(function(){jQuery(".header_min").find(".ul").show();jQuery(".search").hide();jQuery(".serch_box_img").animate({marginRight:0});jQuery(".search").removeClass("search_center");jQuery("body").css("overflow-y","auto");e()});function e(){jQuery(".search_colse").fadeOut(200,function(){siv=setInterval(function(){c.eq(f).animate({opacity:1},64,"linear",function(){jQuery(this).addClass("open").removeClass("close")});k.fadeIn(200);if(++f==c.length){clearInterval(siv);l=true;f=0}},32)});jQuery(".search_btn").show()}jQuery(".header_box .lis").hover(function(){jQuery(this).find(".pull").show();jQuery(this).find(".pull_title").each(function(p){var o=jQuery(this).parents(".pull_box").height();jQuery(this).height(o)})},function(){jQuery(this).find(".pull").hide()});function j(){if(jQuery(window).width()<1540){jQuery("#lenovo_logo").addClass("logo_min");jQuery("#lenovo_logo").find("img").attr("src","https://p3.lefile.cn/product/adminweb/2019/01/14/4879b596-0b39-4534-bcc8-a50693fe825e.jpg")}jQuery(window).resize(function(){if(jQuery(window).width()<1540){jQuery("#lenovo_logo").addClass("logo_min");jQuery("#lenovo_logo").find("img").attr("src","https://p3.lefile.cn/product/adminweb/2019/01/14/4879b596-0b39-4534-bcc8-a50693fe825e.jpg")}else{jQuery("#lenovo_logo").removeClass("logo_min");jQuery("#lenovo_logo").find("img").attr("src","https://p1.lefile.cn/product/adminweb/2018/12/13/2d4534f6-29f3-4a05-8e68-97d9904c7bd2.png")}})}j()});jQuery(function(){function a(){jQuery(".sort-list>ul>li").mouseenter(function(){var b=jQuery(this);b.addClass("hover");if(b.find("ul").hasClass("webh")){b.find("ul").css({display:"block"}).stop().animate({left:"-232px",opacity:1,filter:"alpha(opacity=100)"})}else{if(b.find("ul").hasClass("list1")){b.find("ul").css({display:"block"}).stop().animate({left:"-197px",opacity:1,filter:"alpha(opacity=100)"})}else{if(b.find("div").hasClass("list_regist")){b.removeClass("firstenter");clearTimeout(registimg_timer);b.find("div").css({display:"block"}).stop().animate({left:"-217px",opacity:1,filter:"alpha(opacity=100)"})}else{b.find("ul").css({display:"block"}).stop().animate({left:"-218px",opacity:1,filter:"alpha(opacity=100)"})}}}});jQuery(".sort-list>ul>li").mouseleave(function(){var b=jQuery(this);if(b.find("ul").length>0){if(b.find("ul").hasClass("webh")){b.find("ul").stop().animate({left:"-250px",opacity:0,filter:"alpha(opacity=0)"},function(){b.removeClass("hover");b.find("ul").hide()})}else{if(b.find("ul").hasClass("list1")){b.find("ul").stop().animate({left:"-230px",opacity:0,filter:"alpha(opacity=0)"},function(){b.removeClass("hover");b.find("ul").hide()})}else{b.find("ul").stop().animate({left:"-240px",opacity:0,filter:"alpha(opacity=0)"},function(){b.removeClass("hover");b.find("ul").hide()})}}}else{console.log(b);b.removeClass("hover")}});jQuery(".sort-list-6").on("click",function(){window.scrollTo(0,0)})}a()});jQuery(function(){var a=jQuery("#head_bubble").find("a").attr("href");jQuery(".regist_btn_plat").attr("href",a+"?ru="+window.location+"&ticket=e40e7004-4c8a-4963-8564-31271a8337d8");jQuery("#head_bubble").find("a").attr("href",a+"?ru="+window.location+"&ticket=e40e7004-4c8a-4963-8564-31271a8337d8");if(typeof passport=="object"){if(passport.isLogin()){jQuery("#head_bubble").fadeOut()}else{jQuery("#head_bubble").fadeIn()}}});jQuery(function(){var b=[];var d=function(){var l={shop:"",buy:"",mbuy:"",i:""};if(location.host.indexOf("lenovouat")>=0){l.i="https://i.lenovouat.com";l.shop="https://shop.lenovouat.com";l.buy="https://buy.lenovouat.com";l.mbuy="https://mbuy.lenovouat.com"}if(location.host.indexOf("cn")>=0){l.i="https://i.lenovo.com.cn";l.shop="https://shop.lenovo.com.cn";l.buy="https://buy.lenovo.com.cn";l.mbuy="https://mbuy.lenovo.com.cn"}return l};var k=function(){f();jQuery(".goToMemberCent").attr("href",d().i+"/memberInfo/center.jhtml?sts=e40e7004-4c8a-4963-8564-31271a8337d8");h()};var f=function(){jQuery(".popup_cross").on("click",g)};var g=function(){jQuery(".popup_newguy_gift").hide();jQuery(".popup_cover").hide()};var h=function(){jQuery.ajax({type:"GET",data:{id:"39",lenovoId:passport.cookie.lenovoId,sts:"e40e7004-4c8a-4963-8564-31271a8337d8"},url:d().i+"/growth/getGiftPackageDetails.jhtml",dataType:"jsonp",jsonp:"callback",timeout:5000,error:function(m,l){},success:function(l){if(l.data!==null){c(l.data)}}})};var c=function(n){var l="";var m=0;if(n.scoreValue!==null){b.push('<div class="popup_cart"><p class="cartNumText">&#43;'+n.scoreValue+'</p><div class="txt_wp"><div><p class="cartInfoText">消费积分</p></div></div><a class="cartInfoBtn" href="'+d().shop+'/consumptionPoint/list.html">查看</a></div>')}if(n.growthValue!=null){b.push('<div class="popup_cart"><p class="cartNumText">&#43;'+n.growthValue+'</p><div class="txt_wp"><div><p class="cartInfoText">成长值</p></div></div><a class="cartInfoBtn" href="'+d().i+'/growth/growthDetail.jhtml?sts=e40e7004-4c8a-4963-8564-31271a8337d8">查看</a></div>')}if(n.ledouValue!=null){b.push('<div class="popup_cart"><p class="cartNumText">&#43;'+n.ledouValue+'</p><div class="txt_wp"><div><p class="cartInfoText">乐豆</p></div></div><a class="cartInfoBtn" href="'+d().i+'/ledou/list.jhtml?sts=e40e7004-4c8a-4963-8564-31271a8337d8">查看</a></div>')}jQuery.each(n.couponList,function(p,o){l=o.name;m=i(l);if(m>30){l=e(l,20,"...")}b.push('<div class="popup_cart"><p class="cartNumText">'+o.money+'元</p><div class="txt_wp"><div><p class="cartInfoText" title="'+o.name+'">'+l+'</p></div></div><a class="cartInfoBtn" href="'+d().buy+'/lenovo/saleCoupons.jhtm">查看</a></div>')});jQuery("#popup_cart_content").append(b.join(""));jQuery(".popup_newguy_gift").show();jQuery(".popup_cover").show();a("popup_cart_scrollBar","popup_cart_scrollbar_line","popup_cart_scrollbtn",3);setTimeout(function(){jQuery(".popup_newguy_gift").hide();jQuery(".popup_cover").hide()},10000)};var a=function(G,u,o,r){var t=document.getElementById(G);var s=document.getElementById(u);var A=document.getElementById(o);var y=0,l=0,w=0,z=false,p=0,B=0;var D=t.scrollHeight-t.offsetHeight,v=t.offsetHeight,E=v/D;var q=0;var C=null;var n=window,F=document;if((t.getBoundingClientRect().height/t.scrollHeight)>=1){s.style.display="none"}else{s.style.height=t.offsetHeight+"px";A.style.display="block"}var x=function(){var H=t.getBoundingClientRect().height/t.scrollHeight;if(H>=1){A.style.display="none"}else{A.style.display="block";A.style.height=(H*100)+"%";A.style.top=(t.scrollTop/t.scrollHeight*100)+"%";w=t.scrollTop}};t.onscroll=function(){x()};var m=function(H){z=true;if(y>0){w=l=t.scrollTop=(H.pageY-s.getBoundingClientRect().top-y)/t.getBoundingClientRect().height*t.scrollHeight}n.getSelection?n.getSelection().removeAllRanges():F.selection.empty()};F.onmouseup=function(){y=0;F.onmousemove=null};A.onmousedown=function(H){y=H.pageY-A.getBoundingClientRect().top;F.onmousemove=m;p=0};s.onmousedown=function(H){if(H.pageY<A.getBoundingClientRect().top||H.pageY>A.getBoundingClientRect().bottom){y=1;p=0;w=l=t.scrollTop=(H.pageY-s.getBoundingClientRect().top)/t.getBoundingClientRect().height*t.scrollHeight}};x()};var i=function(o){var p=0,l=o.length,m=-1;for(var n=0;n<l;n++){m=o.charCodeAt(n);if(m>=0&&m<=128){p+=1}else{p+=2}}return p};var e=function(p,l,o){if(!p){return""}if(l<=0){return""}if(!o){o=""}var n=0;for(var m=0;m<p.length;m++){if(p.charCodeAt(m)>255){n+=2}else{n++}if(n==l){return p.substring(0,m+1)+o}else{if(n>l){return p.substring(0,m)+o}}}return p};if(typeof passport=="object"){if(passport.isLogin()){if(typeof isNew!=="undefined"&&isNew){k()}if(typeof isNew==="undefined"){k()}}}function j(){var l=(window.location.href.indexOf("lenovouat")>-1?"//buy.lenovouat.com/":"//buy.lenovo.com.cn/");jQuery.ajax({url:l+"/getshoppingcartcount.jhtml",dataType:"jsonp",async:false,type:"get",jsonp:"callbackparam",success:function(m){if(m.rc==0){jQuery(".top_cart_count").text(m.count)}},error:function(n,m,o){}})}if(jQuery(".hd-login-show").find(".car").length>0){j()}if(window.location.href.indexOf("shop.lenovo")!=-1){$.getScript("//m1.lefile.cn/ga_monitor/statistics.js")}});