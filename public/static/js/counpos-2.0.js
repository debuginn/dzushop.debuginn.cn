var shopId = 1;
var Key  = ")(*&^%$#@!MNBVCX76543";

$(function(){
	$('.couponMod').on('click','.couponBtn',function(e){
		
		var $that = $(this);
		if(!$that.hasClass("coupsin")) return;
		
		if(!passport.isLogin()){
			passport.show();
			return;
		}else{
			var couponId = $(this).attr('data-coupons');  
			var couponText = $(this).attr('data-text');
			var lenovoId = passport.cookie.lenovoId;
			var memberCode = passport.cookie.loginName;
			var signText = lenovoId + memberCode + couponId + Key;
			var sign = $.md5(signText);
			if ($that.data("state") == 4) {
               $that.addClass("coupOk").text("抢成功");
            } else if ($that.data("state") == 5) {
                $that.addClass("coupsed").text("抢光了")
            } else {
               getCoupous($that,lenovoId,couponId,memberCode,shopId,sign,couponText);
            }
			
		}
	});
	$('.prize-mod').on('click','.cj-btn',function(e){
		if(!passport.isLogin()){
			passport.show();
			return;
		}else{
			window.open("https://activity.lenovo.com.cn/activity/zhuanpan_190129/index.html","_blank");
		}
	})
})

function getCoupous(obj,lenovoId,couponId,memberCode,shopId,sign,couponText){
	$.ajax({
		type:"GET",
		url:"https://buy.lenovo.com.cn/coupons/bindCouponsForOnce.jhtm",
		dataType: "jsonp",
        jsonp: "callbackparam",
		data:{
			"couponId":couponId,
			"lenovoId":lenovoId,
			"memberCode":memberCode,
			"shopId":shopId,
			"sign":sign
		},
		success:function(data){
			if(data){
				if(data.success == true){
					//obj.removeClass("coupswill coupsin coupsed").addClass("coupOk").text("领取成功").data('state',4);
					obj.addClass("coupOk").text("领成功").data('status',4);
				}else{
					switch (data.code) {
						case "10009":
							//obj.removeClass("coupswill coupsin coupOk").addClass("coupsed").text("已拥有").data('state',5);
							obj.removeClass('coupOk').addClass("coupsed").text("已领取").data('status',5);
							break;
						case "10008":
							obj.removeClass('coupOk').addClass("coupsed").text("领完了").data('status',5);
							//obj.removeClass("coupswill coupsin coupOk").addClass("coupsed").text("领完了").data('status',5);
							break;
						case "02":
							obj.removeClass('coupOk').addClass("coupsed").text("领完了").data('status',5);
							//obj.removeClass("coupswill coupsin coupOk").addClass("coupsed").text("领完了").data('status',5);
							break;
						case "10053":
							obj.removeClass('coupOk').addClass("coupsed").text("领完了").data('status',5);
							//obj.removeClass("coupswill coupsin coupOk").addClass("coupsed").text("领完了").data('status',5);
							break;
					}
				}
			}
		},
		error:function(data){
			console.log(data);
		}
	})
}