
/**
 * @author ligq4
 * @description latag monitor by lenovo and shop.lenovo
 */
$(function(){
    var domain = window.location.href,
    terminal ="pc",
   latag = "latag",
   splitFlag ="_",
   firstLevel=["顶部导航","banner","分类","个人和家庭用户","企业用户",
   "推荐热门版块","底部通栏","快捷通道","楼层","闪购","今日秒杀"],
   secondLevel=[];
   if(window.allLatag===undefined)
    var allLatag = window.allLatag = [];
   try {
       if(domain.indexOf("shop.lenovo.com.cn")!=-1){
           //顶部导航
           $("#top-nav ul li a").each(function(i,ele){
             ele = $(ele);
             var temp = [latag,terminal,firstLevel[0],ele.text(),i,ele.text(),ele.attr("href")].join(splitFlag);
             allLatag.push(temp);
             ele.attr(latag,temp);
             });
     $("div.nav_box ul li a").each(function(i,ele){
             ele = $(ele);
             var temp = [latag,terminal,firstLevel[0],ele.text(),i,ele.text(),ele.attr("href")].join(splitFlag);
             allLatag.push(temp);
             ele.attr(latag,temp);
     });
         //轮播图
         $("#ul1 li a").each(function(i,el){
        el = $(el);
        var temp = [latag,terminal,"轮播图","",i,"",el.attr("href")].join(splitFlag);
        allLatag.push(temp);
        el.attr(latag,temp);
         });
       
     //分类
      $(".list_nav ul li").each(function(i,ele){
          var ele = $(ele);
          var a = ele.find("div.list_name a").eq(0);
          var temp = [latag,terminal,"",firstLevel[2],i,a.text(),a.attr("href")].join(splitFlag);
          allLatag.push(temp);
          a.attr(latag,temp);
          ele.find("div.list_cont list_lta").each(function(j,el){
             $(el).find("ul li a").each(function(ii,ell){
                 // 分类中的a标签
                 var temp = [latag,terminal,firstLevel[2],a.text(),i,$(ell).text(),$(ell).attr("href")].join(splitFlag);
                 allLatag.push(temp);
                 $(ell).attr(latag,temp);
             });
          });
         }
      );
      //快捷通道
      $("#quick-link ul li").each(function(i,el){
        el = $(el);
        var text  = el.find("p").eq(0).html();
       var temp = [latag,terminal,firstLevel[7],text,i,text,el.attr("href")].join(splitFlag);
        allLatag.push(temp);
        el.attr(latag,temp);
      });
      //楼层
      $("div.nav_floor_item").each(function (n, ele) {
          if(n==0){//今日秒杀
            var ele = $(ele);
            ele.find("div.swiper-wrapper>div.swiper-slide").each(function(s,elee){
                var el = $(elee);
                    var cangci = el.find("div.box_left>div.timestar").html();
                    el.find("div.box_goods").each(function(j,ell){
                        var temp = [latag,terminal,firstLevel[9],firstLevel[10],j,cangci,$(ell).find("a").eq(0).attr("href")].join(splitFlag);
                        $(ell).attr(latag,temp);
                    });
            });
                return true;
          }
         var _t = $(ele);
         var title = _t.find("div.floor_title>h3").html();
         title = title.replace(/\s/g, "");
         title = title.substring(2);
         //楼层右边导航
         _t.find("div.floor_links>a").each( function (i,ele) {
             var t = $(ele);
             var temp = [latag,terminal,firstLevel[8]+(n+1),title,i,t.text(),t.attr("href")].join(splitFlag);
             allLatag.push(temp);
             t.attr(latag,temp);
         });
         //楼层左边图片
         var t = _t.find(".floor_left>a");
         var temp = [latag,terminal,firstLevel[8]+(n+1),title,0,"",t.attr("href")].join(splitFlag);
         allLatag.push(temp);
          t.attr(latag,temp);
        //楼层右边八个商品
          _t.find("div.floor_right>div.floor_item").each(function (j, ele) {
             var item = $(ele);
             var gcode = item.find("p").eq(0).attr("gcode");
             var gname = item.find("a.pro_name").eq(0).html();
             item.find("a").each(function () {
                 var t = $(this);
                 var temp = [latag,terminal,firstLevel[8]+(n+1),title,(j+1),gcode,gname].join(splitFlag);
                 allLatag.push(temp);
                 t.attr(latag,temp);
             });
         });
     });
     }else if(domain.indexOf("www.lenovo.com.cn")!=-1){
     //顶部导航
      $("ul.hd-config-container li.hd-cc-li").each(function(n,el){
         var _t = $(el);
         var a = _t.find("span.hd-cc-li-title>a").eq(0);
         var name = a.find("em").eq(0).text();
         var temp = [latag,terminal,firstLevel[0],name,n,a.attr("href"),""].join(splitFlag);
         allLatag.push(temp);
          a.attr(latag,temp);
          $("div.content-area ul li.hd-cn-li").each(function(i,ele){
             var ele = $(ele);
             var aa = ele.find(">a").eq(0);
             var secondname = aa.find("span").text();
             var details = ele.find("div.details-area ul>li.cd-item ul>li>a");
             var temp = [latag,terminal,firstLevel[0],name,i,secondname,aa.attr("href")].join(splitFlag);
             allLatag.push(temp);
             aa.attr(latag,temp);
             details.each(function(i,ele){
                 var a = $(ele);
                 var temp = [latag,terminal,firstLevel[0]+name,secondname,i,a.text(),a.attr("href")].join(splitFlag);
                 allLatag.push(temp);
                 a.attr(latag,temp);
             });
         });
      });
      //轮播图
      $(".focus-img-div .fi-item a").each(function(i,el){
         el = $(el);
         var temp = [latag,terminal,"轮播图","",i,"",el.attr("href")].join(splitFlag);
         allLatag.push(temp);
         el.attr(latag,temp);
          });
      //个人&家庭用户
      var person = $(".tabswitch-customer");
      var title = person.find(".tabswitch-title-info>p").eq(0).html();
      title = title.replace("&amp;","&");
      person.find("ul.tabswitch-list li.tl-li").each(function(i,ele){
         var a = $(ele).find("a.tl-title-anchor").eq(0);
         var  name = a.find("span").text();
         var count = 0;
         var temp = [latag,terminal,title,name,i,a.attr("href")].join(splitFlag);
         allLatag.push(temp);
         a.attr(latag,temp);
     $(ele).find("div.tl-content ul li a").each(function(i,ele){
         var a = $(ele);
         var temp = [latag,terminal,title,name,i,a.attr("href")].join(splitFlag);
         allLatag.push(temp);
         a.attr(latag,temp);
     count++;
     });
     $(ele).find("div.left>a,div.right>a").each(function(i,ele){
         var a = $(ele);
         var temp = [latag,terminal,title,name,count,"",a.attr("href")].join(splitFlag);
         allLatag.push(temp);
         a.attr(latag,temp);
         count++;
       });
     });
      //企业用户 company
      var company = $(".tabswitch-business");
      var title = company.find(".tabswitch-title-info>p").eq(0).html();
      company.find("ul.tabswitch-list li.tl-li").each(function(i,ele){
         var a = $(ele).find("a.tl-title-anchor").eq(0);
          var name = a.find("span").text();
          var temp = [latag,terminal,title,name,i,"",$(ele).attr("href")].join(splitFlag);
          allLatag.push(temp);
         a.attr(latag,temp);
         $(ele).find("div.tl-content ul li a").each(function(i,ele){
         var a = $(ele);
         var temp = [latag,terminal,title,name,i,"",a.attr("href")].join(splitFlag);
         allLatag.push(temp);
         a.attr(latag,temp);
     });
     });
      //推荐热门版块
      var hot = $(".scrollimg");
      var title = hot.find(".tabswitch-title-info>p").eq(0).html();
      $("ul.show_container li.fl a").each(function(i,ele){
     var a = $(ele);
     var temp = [latag,terminal,firstLevel[6],title,i,"",a.attr("href")].join(splitFlag);
     allLatag.push(temp);
     a.attr(latag,temp);
      });
     }
     var div = document.createElement('div');
     div.style.display = 'none';
     div.id = 'alllatag';
     div.innerHTML = allLatag.join("</br>");
   } catch (error) {
       console.log('info == latag is fail'+error.message);
   }
   
});
