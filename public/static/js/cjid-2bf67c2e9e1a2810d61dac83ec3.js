$(function(){setTimeout(function(){if($(".swiper1").find(".selected").length=="0"){$($(".swiper1 .swiper-slide")[0]).addClass("selected")}$(".swiper1 .swiper-slide").mouseover(function(){$(this).addClass("selected").siblings().removeClass("selected");var a=$(this).index();$(".swiper2 .swiper-slide").eq(a).show("fast").siblings().hide("fast")})})});
(function(d,a,e,c){c.add("thinkChannelBanner",b);function b(o){console.log("组件-----DOM",o);var p=o.find("#ul1 li");for(var k=0;k<p.length;k++){var f=e("<li num="+k+"></li>");if(k==0){f.addClass("active")}o.find("#dot_ul").append(f)}var m=0;var j=h();function h(){return d.setInterval(function(){n()},3000)}function n(){if(m<p.length){var i=p.eq(m);i.show();i.siblings().hide();g(m);m++}else{m==p.length?g(0):g(m);p.eq(p.length-1).hide();p.eq(0).show();m=0}}o.find("#xiaoxin_div").hover(function(){o.find(".btnLeft").fadeIn(100);o.find(".btnRight").fadeIn(100)},function(){o.find(".btnLeft").fadeOut(100);o.find(".btnRight").fadeOut(100)});o.find("#ul1").hover(function(){d.clearInterval(j)},function(){j=h()});o.find(".btnLeft").on("click",function(){d.clearInterval(j);for(var r=0;r<p.length;r++){var s=p.eq(r).css("display");if(s=="list-item"){m=r;continue}}m--;if(m>=0){var t=p.eq(m);t.show();t.siblings().hide();g(m)}else{m==p.length?g(0):g(m);p.eq(p.length-1).show();p.eq(0).hide();m=p.length}});o.find(".btnRight").on("click",function(){d.clearInterval(j);for(var r=0;r<p.length;r++){var s=p.eq(r).css("display");if(s=="list-item"){m=r;continue}}m++;if(m<p.length){var t=p.eq(m);t.show();t.siblings().hide();g(m)}else{m==p.length?g(0):g(m);p.eq(p.length-1).hide();p.eq(0).show();m=0}});var g=function(r){o.find("#dot_ul li").removeClass("active");o.find("#dot_ul li").eq(r).addClass("active")};var l=o.find("#dot_ul li");e(a).on("click","#dot_ul li",function(){d.clearInterval(j);var r=e(this);var i=r.attr("num");m=i;g(m);p.eq(m).show().siblings().hide()});function q(){for(var s=0;s<p.length;s++){if(s!=0){var u=p.eq(s).find("div");var t=u.attr("_bg");var r="url("+t+") center no-repeat";u.css("background",r)}}}}})(window,document,jQuery,window.$componentObject||{});
(function(d,a,e,c){c.add("tabslide",b);function b(f){f.find(".hot_pro_container").each(function(g){if(g==0){f.find(".hot_pro_container").eq(g).show();f.find(".hot_pro_head_hot li").eq(g).addClass("cur")}else{f.find(".hot_pro_container").eq(g).hide()}});f.find(".hot_pro_head_hot").on("mouseenter","li",function(){var i=e(this);var g=i.attr("tag");var h=e(this).index();f.find(".hot_pro_head_hot li").eq(h).addClass("cur");f.find(".hot_pro_head_hot li").eq(h).siblings().removeClass("cur");f.find(".hot_pro_container").each(function(){var j=e(this);if(j.attr("tag")==g){setTimeout(function(){j.show()},400)}else{setTimeout(function(){j.hide()},400)}})});e(".new_star_hot201803232020 .pd-item").on("mouseenter",function(){e(this).find(".float_layer").fadeIn(270)});e(".new_star_hot201803232020 .pd-item").on("mouseleave",function(){f.find(".float_layer").stop(true).fadeOut(200)})}})(window,document,jQuery,window.$componentObject||{});

