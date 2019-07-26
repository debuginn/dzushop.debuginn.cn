
function Calcularion(time,dom,startime,startend){
    var arr=[time];
     arr=Date.parse(new Date(Date.parse(arr[0].replace(/-/g, "/"))))
     var endtime=Date.parse(new Date(Date.parse(startend.replace(/-/g, "/"))))
function countdown(){
    this._index = 0;
    this.init();
}

countdown.prototype.init = function(){
    var _that = this;
    _that.getcachetime();
}
countdown.prototype.getcachetime = function(){
    var _that = this;
    if(location.href.indexOf('lenovouat')!=-1){
        var cachetimeurl = "//papi.lenovouat.com" 
    }else{
        var cachetimeurl = "https://papi.lenovo.com.cn"
    }
    $.ajax({
        url: cachetimeurl+'/cache/time',
        dataType: 'jsonp',
        async:"false",
        jsonp:"callback",
        success: function (data) {
            if (data.curTime) {
                window.curTime = data.curTime * 1000;
                _that.countFun(curTime);
            }
        },
        error: function () { }
    });
}
countdown.prototype.countimer = function(nowtime,arrtime){
    var _this = this;
    var finishedTimer = arrtime;
    var leftTime = finishedTimer - nowtime;
    var d, h, m, s,hh,mm,ss;
    if (leftTime > 0) {
        if(arr<nowtime){
            $(dom).parent().remove("box_left_new")
            $(dom).parent().find(".coupontext").html("距离秒杀结束还剩");
             $(dom).parent().find(".counttime").show();
             $(dom).parent().find(".coupontext").show();
             $(dom).parent().find(".timestar").html(startime+' 场')
        }else{
        // $(dom).parent().find(".coupontext").html("距离秒杀开始还有");
        $(dom).parent().addClass("box_left_new")
        $(dom).parent().find(".coupostart").show();
        $(dom).parent().find(".counttime").hide();
        $(dom).parent().find(".coupontext").hide();
        $(dom).parent().find(".timestar").html(startime+' 场')
        
        }
    
        nowtime += 1000;
        d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
        hh = regtest(h);
        mm = regtest(m);
        ss = regtest(s);
        function regtest(t){
            var reg = /^.{2}$/;
            if(!reg.test(t.toString())){
                t = '0'+t;
            }else{
                t = t;
            }
            return t;
        }
        $(dom).empty();
        var html='<span>'+hh+'</span><span>'+mm+'</span><span>'+ss+'</span>'
        $(dom).append(html);
        setTimeout(function(){
            _this.countimer(nowtime,arrtime)
        },1000)   
    }else if(leftTime==0){
        location.reload()
    } else{
        //活动开始中的显示
        if(endtime<nowtime && location.href.indexOf('admin')==-1){
            //活动结束移除结束场次
         $(dom).parent().parent().remove()
         if( $(".Calculation_20180704").find(".box_left").length==0){
            $(".Calculation_20180704").hide();
        }       
        }else if(location.href.indexOf('admin')!=-1){
            return
        }
        else{
            _this.countimer(nowtime,endtime)
        }
    }
}
countdown.prototype.countFun = function(nowtime){
    var _this = this;
        _this.countimer(nowtime,arr);
}
new countdown();

}
//预约闪购商品
function setFlash(){
    var buycode=[];
    var dataSales=[];
    $(".price_right>a").each(function(){
        buycode.push($(this).attr("buycode"))
    })
    var isProduction= window.location.hostname.indexOf("lenovouat") > 0;
    var isLecoo= window.location.hostname.indexOf("lecoo") > 0;
    var shopid=(isLecoo ? "18" : "1")
    //获取价格接口
    function goods(){
        var host = window.location.host, url;   
            if (host.indexOf('lenovouat') != -1) {
                url = "//open.lenovouat.com/goods/detail/mget";
          
            } else {
                url = "//open.lenovo.com.cn/goods/detail/mget";  
            }
        $.ajax({
            type: "get",
            async: false,
            url: url,
            data: {
                code: JSON.stringify(buycode).replace(/["""]/g, "").replace(/[\[\]]/g,'')
            },
            dataType: "jsonp",
            jsonp: "jsonpCallback",
            success: function (json) {
                if (json.status == 0) {//成功
                    var data = json.result;
                    for (var i = 0; i < buycode.length; i++) {
                        for (var gcode in data) {
                            if (buycode[i] == gcode) {
                                var buynow= $(".price_right").find("[buycode="+buycode[i]+"]");
                                var bunow_parent=buynow.parent().parent().find(".buy_price");
                                var bunow_older=buynow.parent().parent().find(".old_price");
                                 //获取现在价格计算原来的价格
                                 var discount=data[gcode].price.Activity?data[gcode].price.Activity.discount:0;
                                var priceNew=parseFloat(data[gcode].price.P_C.C_1.P_0.DV.V)+discount;
                                try {
                                    bunow_parent.html('<span style="font-size:13px">￥</span>'+data[gcode].price.P_C.C_1.P_0.DV.V);
                                    bunow_older.html('<i style="color:#767676" ><span style="font-size:12px">￥</i>'+priceNew+'')
                                } catch (e) {
                                }
                                break;
                            }
                        }
                    }
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
    function flash(){
        $.ajax({
            type: "get",
            async: false,
            url:  "https://"+(isProduction ? "promotion.lenovouat.com":"promotion.lenovo.com.cn")+"/api/activity/getActivityBatch.jhtm",
             data: {"gcodes":JSON.stringify(buycode).replace(/["""]/g, "").replace(/[\[\]]/g,''),
                    "shopid":shopid,
                    "terminal":"1"},
            dataType: "jsonp",
            jsonp: "callbackparam",
            jsonpCallback: "searchJSONP",
            success: function (json) {
             if(json.success){
                var timestamp =Date.parse(new Date())    
                for (var i = 0; i < buycode.length; i++) {
                    var buynow=  $(".price_right").find("[buycode="+buycode[i]+"]");
                    var bunow_parent=buynow.parent().parent();
                    buynow.html("活动结束");
                    bunow_parent.addClass("price_box_sellout")
                    buynow.addClass("sellout")}
                for(i=0;i<json.t.length;i++){         
                    try {
                        var buynow= $(".price_right").find("[buycode="+json.t[i].gcode+"]");
                        var bunow_parent=buynow.parent().parent();
                       
                        if(Date.parse(new Date(Date.parse(json.t[i].buyStartTime.replace(/-/g, "/"))))<timestamp&&Date.parse(new Date(Date.parse(json.t[i].buyEndTime.replace(/-/g, "/"))))>timestamp){
                            bunow_parent.removeClass("price_box_sellout")
                            bunow_parent.removeClass("flash_clascu")
                            buynow.removeClass();
                            buynow.html("立即抢购");
                            dataSales.push(json.t[i].gcode)
                        }else if(Date.parse(new Date(Date.parse(json.t[i].buyStartTime.replace(/-/g, "/"))))>timestamp){
                            bunow_parent.removeClass("price_box_sellout")
                            bunow_parent.addClass("flash_clascu")
                            buynow.removeClass();
                            buynow.parent().html('<a href="javascript: makeAppointment('+json.t[i].gcode+')" style="text-align:center;" buycode="'+json.t[i].gcode+'">提醒我</a>');
                        }
                        }
                        catch (error) {
                            console.log(1);
                            console.error(error);
                        }
                  }
                        //调用库存接口
                        if(json.t.length>0){
                            sellout(json.t);
                        } 
                
             }   
                           
            },
            error: function (error) {
                console.log(2);
                console.error(error);
            }
        });
    }
    goods()
   setTimeout(function(){
   //最后加载活动状态    
    flash()
   })
   
   //库存查询
    function sellout (json){
        var url =(isProduction ? "papi.lenovouat.com":"papi.lenovo.com.cn");
        if(isLecoo){
            url= ($(".Calculation_20180704").find(".lis>a").eq(0).attr("href").indexOf("lecoo.lenovouat") > 0?"papilecoo.lenovouat.com":"papi.lecoo.com")
        }
        var stockCode = [];
        for (var i = 0; i < dataSales.length; i++) {
            var code =dataSales[i];
            stockCode.push({ activityType:json[i].activityType, productCode: code });
        }
        $.ajax({//调用库存接口
            type: "POST",
             url: "https://"+url+"/stock/getStockInfo.jhtm",
            data: { "proInfos": JSON.stringify(stockCode).replace(/["""]/g, "") },
            dataType: "jsonp",
            jsonp: 'callback',
            timeout: 5000,
            success: function (data) {
                for (var j = 0; j < data.length; j++) {
                    if ((parseInt(data[j].salesNumber)) < 1) {
                        $(".price_right").find("[buycode="+parseInt(data[j].productCode)+"]").html("已经售罄")
                        $(".price_right").find("[buycode="+parseInt(data[j].productCode)+"]").parent().parent().addClass("price_box_sellout")
                        $(".price_right").find("[buycode="+parseInt(data[j].productCode)+"]").addClass("sellout")        
                     }                   
            }  
            },
            error: function (error) {
                console.log(error);
            }
        });
      
    }

}

    setTimeout(function(){
        setFlash()
    },100)

 //预约
 function makeAppointment(code){
    if(!code){
        alert("系统繁忙，请稍后再试！");
        return;
    }
    var $pd ={'curCode':0};
     $pd['curCode']= code;
    var cartDoman,pDoman,shopId;
    shopId=1;
    if(document.domain.indexOf('lenovouat') == -1){
        loginUrl = "https://reg.lenovo.com.cn/auth/v1/login?ticket=b044d754-bda2-4f56-9fea-dcf3aecfe782&iswap=0&ru=";
        cartDoman = "//promotion.lenovo.com.cn";
        pDoman = "//promotion.lenovo.com.cn/api/getSeckillActivityReservationUserNum.jhtm";
    }else{
        loginUrl = "//reg.lenovouat.com/auth/v1/login?ticket=b044d754-bda2-4f56-9fea-dcf3aecfe782&iswap=0&ru=";
        cartDoman = "//promotion.lenovouat.com";
        pDoman = "//promotion.lenovouat.com/api/getSeckillActivityReservationUserNum.jhtm";
    }   
    if(!$pd[code]){
        $pd[code] = {'isyybtnClick':false};
    }
    if (window.passport && window.passport.isLogin()) {
        if($pd[code] && $pd[code].isyybtnClick){
            return;
        }
        var reg = /^1(3|4|5|7|8|9)[0-9]{9}$/g;
        $('#fix_mask, #window_shangouyy').fadeIn(500)
        var phoneNum = $("div.epp_layer_success");
        phoneNum.each(function(i,ele){
            if(!$(this).is(":hidden")){
                loginname  = passport.cookie.loginName;
                $(this).find('p').eq(0).empty();
                if (reg.test(loginname)){
                    $(this).find('input').eq(0).val(loginname);
                    $(this).find('p').eq(0).text('请确认您的手机号，以便我们在开抢前提醒您。')
                }else{
                    $(this).find('p').eq(0).text('请输入手机号，以便我们在开抢前提醒您。')
                }
            }   
    })
    $(".wsgyy_tel").keyup(function() {    
        if(!reg.test($(".wsgyy_tel").val())){
           $(".keyup_detection").text("请输入正确手机号")
        }else{
            $(".keyup_detection").text("")
        }
     });
        $(".wsgyy_ok").unbind();
        $('.wsgyy_ok').on('click', function () {//预约弹窗按钮确定
            var code = $pd['curCode']|| 0;
            var reg = /^1(3|4|5|7|8|9)[0-9]{9}$/g;
            if(!code){
                alert('保存手机号失败！');
                return;
            }if(!reg.test($(".wsgyy_tel").val())){
                alert("手机号码格式不正确");
                return;
            }
            jsonpShangouYuyue2()
            $('#fix_mask, #window_shangouyy').fadeOut(500);

        });
        $(".wsgyy_close").click(function(){//关闭预约弹窗
            $('#fix_mask, #window_shangouyy').fadeOut(500);
        });

    } else {
            if(document.domain.indexOf('m.lenovo')==-1){
                window.passport.show();
                passport.loginRedirect = window.location.href;
            }else{
                if(confirm("需要登录才能预约，您是否需要登录？")){
                    window.location.href = loginUrl + window.location.href;
                }
            }
    }
    var index=0; 
    function jsonpShangouYuyue2(success){//进行预约
        var code = $pd.curCode || 0;
        $pd[code].isyybtnClick = !($pd[code].isyybtnClick);
       
        $.ajax({
            type: "GET",
            url: cartDoman+"/api/activity/addReservation.jhtm?gcode="+code+"&shopId=1&terminal=1&phone="+$(".wsgyy_tel").val(),
            dataType: "jsonp",
            jsonp: "callbackparam",
            success: function (data) {
                        $pd[code].isyybtnClick = !($pd[code].isyybtnClick);
                        if (data.success) {

                            $('#fix_mask, #window_shangouyy').hide();
                            $("#succuss_close").show(); 
                            $("#succuss_close").find("h2").html("成功设置提醒!")
                            $("#succuss_close").find(".sucuss_title").html("我们将在活动开始前30分钟通过短信提醒您！")
                            //  $("#succuss_close").html('<img src="https://p4.lefile.cn/product/adminweb/2018/08/22/76d05cd7-34db-43b4-a70f-462b7a6a9909.png" alt="">')
                            $(".guanbi,.xianghuasuan").unbind();
                             $(".guanbi,.xianghuasuan").click(function(){
                            $("#succuss_close").fadeOut(500);
                             })
                        }else{
                            if(index==0){
                                index=2;
                                $('#fix_mask, #window_shangouyy').hide();
                                $("#succuss_close").show(); 
                                $("#succuss_close").find("h2").html(data.resultMsg|| '系统正忙, 请稍后再试!')
                                $("#succuss_close").find(".sucuss_title").html("")
                                //  $("#succuss_close").html('<img src="https://p4.lefile.cn/product/adminweb/2018/08/22/76d05cd7-34db-43b4-a70f-462b7a6a9909.png" alt="">')
                                $(".guanbi,.xianghuasuan").unbind();
                                 $(".guanbi,.xianghuasuan").click(function(){
                                $("#succuss_close").fadeOut(500); })
                            }else{
                                 
                            }
                                
                          
                        }
                    }
        });
    };  
}

function tinme(){
    if(location.href.indexOf('lenovouat')!=-1){
     var cachetimeurl = "//papi.lenovouat.com" 
    }else{
     var cachetimeurl = "https://papi.lenovo.com.cn"
    }
$.ajax({
    url: cachetimeurl+'/cache/time',
    dataType: 'jsonp',
    async:"false",
    jsonp:"callback",
    success: function (data) {
       
       function forif(){
        for (var i =0;i<$(".counttime").length;i++){
            if($($(".counttime")[i]).text().slice(0,10)!=data.curDateTime.slice(0,10) && location.href.indexOf('admin')==-1){
                $( $(".counttime")[i]).parent().parent().remove();
                //判断今天是否有活动没有活动就不显示
              if( $(".Calculation_20180704").find(".box_left").length==0){
                  $(".Calculation_20180704").hide();
              }
              forif()
              break;
             }
            }
       }
       forif()
        if($(".counttime").length==0 && location.href.indexOf('admin')==-1){
            //判断今天还有没有活动，没有活动就不显示楼层。
            $(".Calculation_20180704").hide();
        }

        //清除明星单品组件
function remove_box(){
    // $(".wrap1200").find("#J-star-box").remove();
    var box_war=$(".wrap1200").find(".ad20170605").parent().nextAll();
    box_war.each(function(){
    $(this).remove()
  });
setTimeout(function(){
    var nav_maodian= $("#J-floor-nav-box").find("li")[0]
    $(nav_maodian).html('<a href="#J-flash-box" data-scroll="#J-flash-box" class=""><span class="myicon ns_star"></span><em>闪购</em></a>')
},500)
}remove_box()    
        //当天活动排序
    function sortFlash(){
        if(location.href.indexOf('admin')==-1){//在admin不进行排序
        var comhtml=[]
        var arr=[];
        var newcomhtml=[];
        var paixu=[]
        for(var i=0;i<$(".counttime").length;i++){
            arr[i]= Date.parse(new Date(Date.parse($($(".counttime")[i]).text().replace(/-/g, "/"))));
            comhtml[i]= $( $(".counttime")[i]).parent().parent().html();
            paixu[i]= Date.parse(new Date(Date.parse($($(".counttime")[i]).text().replace(/-/g, "/"))));
           
        }
        paixu=paixu.sort()
        for(var i=0;i<paixu.length;i++){
           for(var k=0;k<arr.length;k++){
            if(paixu[i]==arr[k]){ 
                $($(".counttime")[i]).parent().parent().html(comhtml[k])
            }
           }
        }
        }
    }
    sortFlash();
    for (var j =0;j<$(".counttime").length;j++){
        new Calcularion($($(".counttime")[j]).text(),$(".counttime")[j],$($(".counttime")[j]).text().slice(11,16),$($(".timestar")[j]).text());
         }
    var mySwiper = new Swiper(".Calculation_20180704",{ 
        direction:"horizontal",/*横向滑动*/ 
        pagination:".swiper-pagination",/*分页器*/ 
        prevButton:".swiper-button-prev",/*前进按钮*/ 
        nextButton:".swiper-button-next",/*后退按钮*/ 
        autoplay:false,/*每隔3秒自动播放*/ 
        paginationClickable: true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true
    }) 
    //给小圆点添加鼠标移入事件
$(".swiper-pagination").on("mouseover",".swiper-pagination-bullet", function() {
    $(this).click(); //鼠标划上去之后，自动触发点击事件来模仿鼠标划上去的事件
 }); 
  
},
error: function () { }
});
}
tinme()






