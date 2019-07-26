// JavaScript Document
var mainUrl = "//"+window.location.host || "//www.lenov.com.cn";
var serverTime = "2015-11-21 12:22:33" || (new Date()).Format("yyyy-M-d h:m:s");

// 对Date的扩展，将 Date 转化为指定格式的String 
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}

var Try = (function(){
    var _try = {};

    // banner
    _try.banner = function(){
        var banner_img = $(".banner_img");
        var banner_li = $(".banner_img").find(".banner_li");
        var banner_bt = $(".banner_bt");
        var banner_length = banner_li.length;
        var timer = 5000; //parseInt($("#TitleLoopTime").html() + '000');//循环播放间隔
        var ban = 0;
        banner_li.eq(ban).show();

        for (var i = 0; i < banner_length; i++) {
            banner_bt.append($("<a></a>"));

        }
        banner_bt.find("a").eq(ban).addClass("now");
        banner_img.hover(function () {
            clearInterval(play)
        }, function () {
            play = setInterval(banner_next, timer);
        })

        function banner_next() {
            ban++;
            banner_li.fadeOut(500);
            if (ban == banner_length) { ban = 0; }
            banner_bt.find("a").removeClass("now");
            banner_bt.find("a").eq(ban).addClass("now");
            banner_li.eq(ban).fadeIn(500);
        }
        $(".banner_bt a").hover(function () {
            var banner_bt_index = $(this).index();
            clearInterval(play)
            banner_bt.find("a").removeClass("now");
            banner_bt.find("a").eq(banner_bt_index).addClass("now");
            banner_li.fadeOut(0);
            banner_li.eq(banner_bt_index).fadeIn(0);
            play = setInterval(banner_next, timer);
        })
        var play = setInterval(banner_next, timer)
    };

    _try.share = function(){
       /* $(".try_ban_share").hover(function(){
            $(this).find(".jiathis_style").show();
        },function(){
            $(this).find(".jiathis_style").hide();
        })*/
		$("body").prepend("<div id='modelUrl'></div>");
		$("body").prepend('<script type="text/javascript" src="/c2c/new/src/js/clipboard.min.js"></script>');
		
		$("#modelUrl").load("/c2c/new/modelUrl.html");
		$(".try_ban_share").click(function(){
			//$("#urlInfo1").val($(".try_ban_pro p").text());
			$("#urlInfo1").val($(this).parents(".try_ban_detail").children(".try_ban_pro").children("h3").text());
			$("#urlInfo2").val(window.location.href + "?");	
			$(".modelUrlCont_imgList").html(
				'<li class="modelUrlCont_img_active">' +
					'<img src="'+$(this).parents(".banner_li").find("img").eq(0).attr("src")+'">' +
					'<span class="gou_active"></span>' +
				'</li>'
			);
			//字数
			var len = $("#urlInfo1").val().length, totalLen = 80;
			$(".fontNum").html(totalLen - len);				
			
			//可编辑字数限制
			$("#urlInfo1").bind("propertychange input",function () {
				var len = $(this).val().length,totalLen=80;
				$(".fontNum").html(totalLen-len);
				if(len>80){
					$(".fontNum").html("0");
					$('.modelUrlCont_way_right').addClass('red_ban');
				}else{
					$('.modelUrlCont_way_right').removeClass('red_ban');
					$(".fontNum").html(totalLen-len);
				}
			})
			$(".modelUrlModel").addClass("modelShow");
			$(".modelUrlCont").addClass("modelShow");
			return false;		
		})
    }

    _try.prohover = function(){
        $('.lst_nm').hover(function(){      
                $(this).find('.lst_names').css('display','block');
                $(this).find('.lst_name').css('display','none');    
        },function(){
                $(this).find('.lst_names').css('display','none');
                $(this).find('.lst_name').css('display','block');
        });
    }

    _try.tab = function(){
        var $li = $('#dts_tab li');
        var $ul = $('#dts_main .dts_neir ');
                    
        $li.click(function(){
            var $this = $(this);
            var $t = $this.index();
            $li.removeClass();
            $this.addClass('current');
            $ul.css('display','none');
            $ul.eq($t).css('display','block');
        })
        $('.dts_hong').click(function(){
            $('.dts_hong').removeClass('dts_red');
            $(this).addClass('dts_red');
		});
		/*var phones=$(".dts_mainb-ad dl dd");
		phones.each(function(i,item){
			var phone=item.innerText;
			phone=phone.substr(0,3)+"****"+phone.substr(7,4);
			item.innerText=phone;
		});*/
    }
	_try.naketimg = function(t){
		
	}
	_try.GetQueryString = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
	}
    return _try;

})(jQuery, Try)

function Mytryout(){}

Mytryout.prototype.makeBanner = function(serverTime){ //banner
	var sTime = serverTime;
	var bannerLi = $(".banner_img").find(".banner_li");
	if(bannerLi.length > 0){
		for( var i = 0 ; i < bannerLi.length ; i++ ){
			var thisList = bannerLi.eq(i);
			var listAtime = {};
			listAtime.listStarttime   = thisList.attr("data-starttime"); //活动开始时间
			listAtime.listApplytime   = thisList.attr("data-apply");     //申请结束时间
			listAtime.listChecktime   = thisList.attr("data-check");     //名单审核结束时间
			listAtime.listReceivetime = thisList.attr("data-receive");   //报告回收结束时间
			listAtime.listEndtime     = thisList.attr("data-endtime"); //活动结束时间
			var listState = this.makeState(sTime,listAtime); //当前活动状态
			this.State = listState;
			switch (listState){
				case 0 :	//活动预告中
					thisList.find(".try_ongoing").text("活动预告");
					thisList.find(".try_ban_btn").find("a")
						.removeAttr("title")
						.text("敬请期待")
						.removeClass()
						.addClass("try_stay");
					//thisList.find(".activity_time").text("活动开始时间：" + listAtime.listStarttime).show();
					thisList.find(".try_countdown").after($("<div class='act_time' style='padding-top:25px;'>活动开始时间："+listAtime.listStarttime+"</div>"))
					thisList.find(".try_num span").eq(1).hide();
					thisList.find(".try_num span").eq(2).hide();
					break;
				case 1 :	//活动进行中
					thisList.find(".try_ongoing").text("火热进行中");
					thisList.find(".try_ban_btn").find("a")
						.removeAttr("title")
						.text("免费申请")
						.removeClass()
						.addClass("try_freeapply")
						.bind("click",function(){
							var myCode = $(this).parents("li").attr("data-code");
							if(passport.isLogin()==true){
								$.ajax({
									url:mainUrl+"/roamingapi/isapplytry.do",
									type:"get",
									dataType:"json",
									data:{
										plat:4,
										//memberid:passport.cookie.memberId,
										lenovoid:passport.cookie.lenovoId,
										gcode:myCode
									},
									success:function(data){
										if(data.rc==0){
											if(data.isapply==0){
												//window.location.href ="try_question.html";
												window.location.href = "/tryout/tryhtml/try_question.html?gcode=" + myCode;
											}else if(data.isapply==1){
												alert("您已经申请过，请耐心等待审批");
											}
										}
										
									}
								})
							}else{
								passport.show();
							}
							
							//alert("申请");
						})
					//thisList.find(".activity_time").hide();
					thisList.find(".try_countdown").after($("<div class='act_time' style='padding-top:25px; display:none;'>申请结束时间："+listAtime.listApplytime+"</div>"))
					thisList.find(".try_countdown").show();
					thisList.find(".try_num span").eq(2).hide();
					this.makeCountdown(listAtime.listApplytime,sTime,thisList);
					break;
				case 2 :	//名单审核中
					thisList.find(".try_ongoing").text("名单审核中");
					thisList.find(".try_ban_btn").find("a")
						.removeAttr("title")
						.text("名单审核中")
						.removeClass()
						.addClass("try_see");
					//thisList.find(".activity_time").text("名单审核结束时间：" + listAtime.listChecktime).show();
					thisList.find(".try_countdown").after($("<div class='act_time' style='padding-top:25px;'>名单审核结束时间："+listAtime.listChecktime+"</div>"))
					thisList.find(".try_countdown").hide();
					thisList.find(".try_num span").eq(2).hide();
					break;
				case 3 :	//报告回收中
					thisList.find(".try_ongoing").text("报告回收中");
					thisList.find(".try_ban_btn").find("a")
						.removeAttr("title")
						.text("查看名单")
						.removeClass()
						.addClass("try_see")						
						.bind("click",function(){
							if($(".lst_content").length > 0){
								window.location.href = $(this).parents(".banner_li").attr("data-code")+".html?tab=1";
							}else if($(".dts_acont").find("li").length > 0){
								$(".dts_acont").find("li").eq(1).click()
								$(".dts_acont").find("li").eq(1).find("a").click();
								var tabH = $("#dts_tab").offset().top;
								$("body").animate({"scrollTop":tabH + "px"},500);	
							}						
						})
					//thisList.find(".activity_time").text("报告回收结束时间：" + listAtime.listReceivetime).show();
					thisList.find(".try_countdown").after($("<div class='act_time' style='padding-top:25px;'>报告回收结束时间："+listAtime.listReceivetime+"</div>"))
					thisList.find(".try_countdown").hide();
					thisList.find(".try_num span").eq(2).show();
					break;
				case 4 :	//活动结束
					thisList.find(".try_ongoing").text("活动结束");
					thisList.find(".try_ban_btn").find("a")
						.removeAttr("title")
						.text("查看报告")
						.removeClass()
						.addClass("try_see")
						.bind("click",function(){
							if($(".lst_content").length > 0){
								window.location.href = $(this).parents(".banner_li").attr("data-code")+".html?tab=2";
							}else if($(".dts_acont").find("li").length > 0){
								$(".dts_acont").find("li").eq(2).click()
								$(".dts_acont").find("li").eq(2).find("a").click();
								var tabH = $("#dts_tab").offset().top;
								$("body").animate({"scrollTop":tabH + "px"},500);	
							}	
						})
					//thisList.find(".activity_time").text("活动结束时间：" + listAtime.listReceivetime).show();
					thisList.find(".try_countdown").after($("<div class='act_time' style='padding-top:25px;'>活动结束时间："+listAtime.listEndtime+"</div>"))
					thisList.find(".try_countdown").hide();
					thisList.find(".try_num span").eq(0).show();
					thisList.find(".try_num span").eq(2).show();
					break;
				default:
					thisList.find(".try_ongoing").text("活动结束");
					thisList.find(".try_ban_btn").find("a")
						.removeAttr("title")
						.text("查看报告")
						.removeClass()
						.addClass("try_see")
						.bind("click",function(){
							if($(".lst_content").length > 0){
								window.location.href = $(this).parents(".banner_li").attr("data-code")+".html?tab=2";
							}else if($(".dts_acont").find("li").length > 0){
								$(".dts_acont").find("li").eq(2).click()
								$(".dts_acont").find("li").eq(2).find("a").click();
								var tabH = $("#dts_tab").offset().top;
								$("body").animate({"scrollTop":tabH + "px"},500);	
							}
						})
					thisList.find(".activity_time").text("活动结束时间：" + listAtime.listReceivetime).show();
					thisList.find(".try_countdown").hide();
					thisList.find(".try_num span").eq(0).show();
					thisList.find(".try_num span").eq(2).show();
					break;					
			}		
		}
		if(bannerLi.length>1){  Try.banner();}
		Try.share();
	}
}
Mytryout.prototype.makeList = function(serverTime){ //banner
	var _this = this;
	var sTime = serverTime;
	var bannerLi = $(".lst_cont>ul>li");
	if(bannerLi.length > 0){
		for( var i = 0 ; i < bannerLi.length ; i++ ){
			var thisList = bannerLi.eq(i);
			var listAtime = {};
			listAtime.listStarttime   = thisList.attr("data-starttime"); //活动开始时间
			listAtime.listApplytime   = thisList.attr("data-apply");     //申请结束时间
			listAtime.listChecktime   = thisList.attr("data-check");     //名单审核结束时间
			listAtime.listReceivetime = thisList.attr("data-receive");   //报告回收结束时间
			listAtime.listEndtime     = thisList.attr("data-starttime"); //活动结束时间
			var listState = this.makeState(sTime,listAtime); //当前活动状态
			
			switch (listState){
				case 0 :	//活动预告中
					thisList.find(".lst_lf_date p").text("活动预告");
					thisList.find(".lst_names").find("a").text("敬请期待")
					thisList.find(".lst_text p").text("活动开始时间：" + listAtime.listStarttime).show();
					thisList.find(".lst_name p span").eq(1).hide();
					thisList.find(".lst_name p span").eq(2).hide();
					break;
				case 1 :	//活动进行中
					thisList.find(".lst_lf_date p").text("火热进行中");
					thisList.find(".lst_names").find("a").text("免费申请")
					thisList.find(".lst_text p").text("申请结束时间：" + listAtime.listApplytime).show();
					thisList.find(".lst_name p span").eq(2).hide();
					break;
				case 2 :	//名单审核中
					thisList.find(".lst_lf_date p").text("名单审核中");
					thisList.find(".lst_names").find("a").text("名单审核中")
					thisList.find(".lst_text p").text("审核结束时间：" + listAtime.listChecktime).show();
					thisList.find(".lst_name p span").eq(1).hide();
					thisList.find(".lst_name p span").eq(2).hide();
					break;
				case 3 :	//报告回收中
					thisList.find(".lst_lf_date p").text("报告回收中");
					thisList.find(".lst_names").find("a").text("查看名单").attr("href",thisList.attr("data-code")+".html?tab=1")
					thisList.find(".lst_text p").text("报告回收结束时间：" + listAtime.listReceivetime).show();
					thisList.find(".lst_name p span").eq(1).show();
					thisList.find(".lst_name p span").eq(2).hide();
					break;
				case 4 :	//活动结束
					thisList.find(".lst_lf_date p").text("活动结束");
					thisList.find(".lst_names").find("a").text("查看报告").attr("href",thisList.attr("data-code")+".html?tab=2")
					thisList.find(".lst_text p").text("活动结束时间：" + listAtime.listReceivetime).show();
					thisList.find(".lst_name p span").eq(1).hide();
					thisList.find(".lst_name p span").eq(2).hide();
					break;
				default:
					thisList.find(".lst_lf_date p").text("活动结束");
					thisList.find(".lst_names").find("a").text("查看报告").attr("href",thisList.attr("data-code")+".html?tab=2")
					thisList.find(".lst_text p").text("活动结束时间：" + listAtime.listEndtime).show();
					thisList.find(".lst_name p span").eq(1).hide();
					thisList.find(".lst_name p span").eq(2).hide();
					break;					
			}		
		}
	}
	Try.prohover();
	$(".lst_btn").find("a").attr("href","javascript:void(0);");
	$(".lst_btn").attr("data-page","2");
	$(".lst_btn").bind("click",function(){
		var p = $(this).attr("data-page");
		var loading = $("<div style='text-align:center;'>加载中...</div>");
		$(this).after(loading)
		$(this).hide(0);
		$.ajax({
			url:mainUrl + "/roamingapi/getTryProductList?pageSize=6&curPage="+p,
			success: function(db){
				var data = $.parseJSON(db);
				if(!data.unRecommendLists){
					$(".lst_btn").find("a").text("没有更多活动了");
					$(".lst_btn").unbind("click");
					$(".lst_btn").show();
					loading.remove();
					return;
				}
				_this.makeMoreList(db);
				p++;
				$(".lst_btn").attr("data-page",p);
				Try.prohover();
				$(".lst_btn").show();
				loading.remove();
			}
		})
	})
}
Mytryout.prototype.makeMoreList = function(myDb){ //首页列表-加载更多
	var db = $.parseJSON(myDb);
	if(db.rc == 0){
		for( var i = 0 ; i < db.unRecommendLists.length ; i++ ){
			var thisList = db.unRecommendLists[i];
			//var liBloack = i == 0 ? "display:block" : "";
			if((i+1)%3 == 0){ var marginRight = "margin-right:0;"}else{marginRight = ""}
			var activityState = {};//活动状态
			switch (thisList.currentstatus){
				case 0 :	//活动预告中
					activityState.btClass = "try_stay";
					activityState.btText = "敬请期待";
					activityState.boxTitle = "活动预告";
					activityState.countdownTime = "display:none";
					activityState.thisTime = "display:block";
					activityState.thisTimeTtest = "活动开始时间："+thisList.activitystarttime;
					activityState.portcountH = "display:none";
					activityState.percountH = "display:none";
					break;
				case 1 :	//活动进行中
					activityState.btClass = "try_freeapply";
					activityState.btText = "免费申请";
					activityState.boxTitle = "火热进行中";
					activityState.countdownTime = "display:block";
					activityState.thisTime = "display:none";
					activityState.thisTimeTtest = "审核截止时间："+thisList.checkendtime;
					activityState.portcountH = "display:none";
					activityState.percountH = "";
					break;
				case 2 :	//名单审核中
					activityState.btClass = "try_see";
					activityState.btText = "名单审核中";
					activityState.boxTitle = "名单审核中";
					activityState.countdownTime = "display:none";
					activityState.thisTime = "display:block";
					activityState.thisTimeTtest = "审核截止时间："+thisList.checkendtime;
					activityState.portcountH = "display:none";
					activityState.percountH = "";
					break;
				case 3 :	//报告回收中
					activityState.btClass = "try_see";
					activityState.btText = "查看名单";
					activityState.boxTitle = "报告回收中";
					activityState.countdownTime = "display:none";
					activityState.thisTime = "display:block";
					activityState.thisTimeTtest = "报告回收截止时间："+thisList.receivereportendtime;
					activityState.portcountH = "display:none";
					activityState.percountH = "";
					break;
				case 4 :	//活动结束
					activityState.btClass = "try_see";
					activityState.btText = "查看报告";
					activityState.boxTitle = "活动结束";
					activityState.countdownTime = "display:none";
					activityState.thisTime = "display:block";
					activityState.thisTimeTtest = "活动结束时间："+thisList.activityendtime;
					activityState.portcountH = "";
					activityState.percountH = "";
					break;
			}
			var elm = $(
				'<li style="'+marginRight+'">'+
					'<div class="lst_pic">'+
						'<a href="detail.html?gcode='+thisList.productid+'"><img src="'+thisList.picpath+'"></a>'+
						'<div class="lst_lf_date">'+
							'<b>第 <span>'+thisList.activityperiods+'</span> 期</b>'+
							'<p>'+activityState.boxTitle+'</p>'+
						'</div>'+
						'<div class="lst_text">'+
							'<p>'+activityState.thisTimeTtest+'</p>'+
						'</div>'+
					'</div>'+
					
					'<div class="lst_nm">'+
						'<div class="lst_name">'+
							'<b>'+thisList.productname+'</b>'+
							'<p><span>产品数量：'+thisList.procount+' </span><span style="'+activityState.percountH+'">申请人数：'+thisList.percount+'</span><span style="'+activityState.portcountH+'">收获报告：'+thisList.portcount+'</span></p>'+
						'</div>'+
						'<div class="lst_names">'+
							'<b><a href="detail.html?gcode='+thisList.productid+'">'+activityState.btText+'</a></b>'+
						'</div>'+
					'</div>'+
				'</li>'
			);
			$(".lst_cont ul").append(elm);					
		}
	}
}


Mytryout.prototype.gotoSubmitReport = function(goods,title){ //
	if(this.State!=3){ return }
	var gotoReport = $(
		'<div style="text-align: center;  margin:30px;">'+
			'<input type="button" value="提交申请报告" style="width: 181px;height: 36px;border-radius: 5px;border: 1px solid #969696;background: #fff;cursor: pointer"/>'+
		'</div>'
	)
	$(".dts_mainc").prepend(gotoReport);
	gotoReport.find("input").bind("click",function(){
		/*$.ajax({
			url:mainUrl + ""
		})*/
		if(!passport.isLogin()){passport.show(); return} 
		window.location.href="/tryout/s_report/index.html?gcode=" + goods + "&title=" + title;
	})
}



Mytryout.prototype.makeCountdown = function(endTime,currentTime,li){ //倒计时
	var $li = $(li);
	var time_end = endTime //"2015-11-18 17:12:00";
	var serverTime = currentTime //"2015-11-18 17:11:40";
	var time_end_dt = new Date(time_end.replace(/-/,"/").replace(/-/,"/"));
	var serverTime_dt = new Date(serverTime.replace(/-/,"/").replace(/-/,"/"));
	//var time_now = new Date();
	var time_server_Date = {
			'day':      (serverTime_dt.getDate()) < 10 ? "0" + serverTime_dt.getDate():serverTime_dt.getDate(),
            'month':    (serverTime_dt.getMonth()+1) < 10 ? "0" +(serverTime_dt.getMonth()+1):(serverTime_dt.getMonth()+1),
            'year':     serverTime_dt.getFullYear(),
            'hour':     (serverTime_dt.getHours()) < 10 ? "0" + serverTime_dt.getHours():serverTime_dt.getHours() ,
            'min':      (serverTime_dt.getMinutes()) < 10 ? "0" + serverTime_dt.getMinutes():serverTime_dt.getMinutes(),
            'sec':      (serverTime_dt.getSeconds()) < 10 ? "0" + serverTime_dt.getSeconds():serverTime_dt.getSeconds()  
		}
	//var time_now_Int = parseInt(""+time_now_Date.year+time_now_Date.month+time_now_Date.day+time_now_Date.hour+time_now_Date.min+time_now_Date.sec)
	var target_Date = {
			'day':      (time_end_dt.getDate()) < 10 ? "0" + time_end_dt.getDate():time_end_dt.getDate(),
            'month':    (time_end_dt.getMonth()+1) < 10 ? "0" +(time_end_dt.getMonth()+1):(time_end_dt.getMonth()+1),
            'year':     time_end_dt.getFullYear(),
            'hour':     (time_end_dt.getHours()) < 10 ? "0" + time_end_dt.getHours():time_end_dt.getHours() ,
            'min':      (time_end_dt.getMinutes()) < 10 ? "0" + time_end_dt.getMinutes():time_end_dt.getMinutes(),
            'sec':      (time_end_dt.getSeconds()) < 10 ? "0" + time_end_dt.getSeconds():time_end_dt.getSeconds()   
		}
	//var time_end_Int = parseInt(""+target_Date.year+target_Date.month+target_Date.day+target_Date.hour+target_Date.min+target_Date.sec)
	
	var timgContrast = Math.floor((serverTime_dt.valueOf()-time_end_dt.valueOf())/1000);
	if(timgContrast>0){
		$li.find('.try_countdown').hide();
		$li.find(".try_ban_btn").find("a")
				.removeClass()
				.addClass("try_see")
				.text("名单审核中")
				.unbind("click");
		//console.log($(_this).attr("id"));
	}else{
		$li.find('.try_countdown').show();
		$li.find('.countdown_dashboard').countDown({
			targetDate: target_Date,
			serverTime: time_server_Date,
			onComplete:function(_this){
				$(_this).parents(".try_ban_detail").find(".try_countdown").hide();
				$(_this).parents(".try_ban_detail").find(".act_time").show();
				$(_this).parents(".try_ban_detail").find(".try_ban_btn").find("a")
					.removeClass()
					.addClass("try_see")
					.text("名单审核中")
					.unbind("click");
				//console.log($(_this).attr("id"));
			}
		});
	}
   
}
Mytryout.prototype.makeState = function(sT,aT){ //倒计时
	var listState = 0;
	var sTime = sT;
	var aTime = aT;
	if((new Date(sTime.replace(/-/,"/").replace(/-/,"/"))) - (new Date(aTime.listStarttime.replace(/-/,"/").replace(/-/,"/"))) < 0){
		listState = 0; //预告中
	}else if((new Date(sTime.replace(/-/,"/").replace(/-/,"/"))) - (new Date(aTime.listStarttime.replace(/-/,"/").replace(/-/,"/"))) > 0 && (new Date(sTime.replace(/-/,"/").replace(/-/,"/"))) - (new Date(aTime.listApplytime.replace(/-/,"/").replace(/-/,"/"))) < 0){
		listState = 1; //进行中
	}else if((new Date(sTime.replace(/-/,"/").replace(/-/,"/"))) - (new Date(aTime.listApplytime.replace(/-/,"/").replace(/-/,"/"))) > 0 && (new Date(sTime.replace(/-/,"/").replace(/-/,"/"))) - (new Date(aTime.listChecktime.replace(/-/,"/").replace(/-/,"/"))) < 0){
		listState = 2; //审核中
	}else if((new Date(sTime.replace(/-/,"/").replace(/-/,"/"))) - (new Date(aTime.listChecktime.replace(/-/,"/").replace(/-/,"/"))) > 0 && (new Date(sTime.replace(/-/,"/").replace(/-/,"/"))) - (new Date(aTime.listReceivetime.replace(/-/,"/").replace(/-/,"/"))) < 0){
		listState = 3; //报告回收中
	}	else if((new Date(sTime.replace(/-/,"/").replace(/-/,"/"))) - (new Date(aTime.listReceivetime.replace(/-/,"/").replace(/-/,"/"))) > 0){
		listState = 4; //报告已回收（结束）
	}else if((new Date(sTime.replace(/-/,"/").replace(/-/,"/"))) - (new Date(aTime.listEndtime.replace(/-/,"/").replace(/-/,"/"))) > 0 ){
		listState = 5;
	}
	return listState
}