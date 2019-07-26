$(function(){
	//各路浏览器兼容startwith
	if (typeof String.prototype.startsWith != 'function') {
		String.prototype.startsWith = function (prefix){
			return this.slice(0, prefix.length) === prefix;
		};
	}


	//个人信息
	var time = null;
	$('.head_personInfo').hover(function() {
		clearTimeout(time);
		$('.top_info').show();
		$('.cz_head .top_down').css('background-position', '-4px -153px)');
	}, function() {
		time = setTimeout(function() {
			$('.top_info').hide();
			$('.cz_head .top_down').css('background-position', '-4px -159px');
		}, 200)
	});
	$('.top_info').hover(function() {
		clearTimeout(time);
	}, function() {
		time = setTimeout(function() {
			$('.top_info').hide();
		}, 200)
	});
	//tab标签
	$('.cz_conTitle button').on('click', function() {
		var _this = $(this);
		_this.addClass('hover').siblings().removeClass('hover');
		var index = _this.index();
		$('.cz_div').hide();
		$('.cz_div').eq(index).show();

	});
	//选择充值项目
	$('.tab_div').on('click', '.cz_type',function() {
		if($(this).hasClass('gray')){
			return false;
		}
		$(this).addClass('cz_typeHover').siblings().removeClass('cz_typeHover');
	});
	
	//初始化焦点
	$('.cz_phoneInput').get(0).focus();
	
	bindAction();
    if(""==phoneNumber || null ==phoneNumber){
        //查询历史充值手机号
        loadHistoryChargeNumber();
    }else{
        $('.phone_div .cz_phoneInput').val(formatPhone(phoneNumber));
        queryPhoneNumber(phoneNumber);
    }

});


function loadHistoryChargeNumber(){
    if(!passport.isLogin()){
        return false;
    }
	$.get(global_ajaxdomain + '/charge/queryHistoryNumer.jhtm',
        function(res){
            if(res.success){
                var list = res.t;
                if(list.length > 0){
                    var info = list[0];
                    var carrier = info.carrierType;
                    var phone = info.phone;
                    var belong = info.belong;
                    $('.phone_div .cz_phoneInput').val(formatPhone(phone));
                    $('.phone_div .phone_type').html(belong);
                    if(carrier != 0){
                        queryGoodsList(carrier, 0);
                        queryGoodsList(carrier, 1);
                    }else{
                        $('.cz_type.left').removeClass('gray');
                    }
                }
            }else{
                alert(res.resultMsg);
            }
        }
	);
}

/**
 * 绑定事件
 */
function bindAction(){
	$('.cz_phoneInput').on('keyup', function(){
		var self = $(this);
		var phone = self.val();
		phone = phone.replace(/\D/g,'');
		if(phone.length > 11){
			phone = phone.substr(0,11);
		}

		if(phone.length < 11){
			$('.cz_phoneInput').val(phone);
			$(".phone_type").html('');
			$('.cz_type.left').addClass('gray');
			$('.phone_div .tip').html('');
			return ;
		}
		
		if(phone.length == 11){
			$('.cz_phoneInput').val(formatPhone(phone));
		}
		var regExp  = /(^1(3[0-9]|4[57]|5[0-35-9]|7[6-8]|8[0-9])\d{8}$)|(^170\d{8}$)|((^171\d{8}$))/;
		if(!regExp.test(phone)){
			$('.phone_div .tip').html(chargeResource.input_legal_mobile_phone_number);
			return false;
		}
		if(phone.startsWith("170") || phone.startsWith("170")){
		    $('.phone_div .tip').html(chargeResource.not_support_some_number);
		    return  false;
		}

        queryPhoneNumber(phone);
//		$.get(global_ajaxdomain + '/charge/queryPhoneNumber/' + phone + '.jhtm',
//	    		function (data) {
//	        	if (data.success) {
//	        		var info = data.t;
//	        		/**获取商品列表**/
//	        		var carrier = info.showType;
//	        		var belong = info.showInfo;
//	        		$(".phone_type").html(belong);
//	        		queryGoodsList(carrier, 0);
//	        		queryGoodsList(carrier, 1);
//	        	}
//	     });
	});

	/*$('.cz_phoneInput').on('input propertychange', function(){
		var self = $(this);
		var phone = self.val();
//		if(phone == ''){
//			$('.cz_phoneInput').val('');
//			$(".phone_type").html('');
//			return ;
//		}
		
		phone = phone.replace(/\s/g, '');
		if(phone.length < 11){
			$(".phone_type").html('');
			$('.cz_type.left').addClass('gray');
			return ;
		}
		
		var regExp  = /(^1(3[0-9]|4[57]|5[0-35-9]|7[6-8]|8[0-9])\d{8}$)|(^170\d{8}$)/;
		if(!regExp.test(phone)){
			alert('请输入合法手机号');
			return false;
		}
		self.val(formatPhone(phone));
		
		$.get(global_ajaxdomain + '/charge/queryPhoneNumber/' + phone + '.jhtm',
    		function (data) {
        	if (data.success) {
        		var info = data.t;
        		//**获取商品列表
        		var carrier = info.showType;
        		var belong = info.showInfo;
        		$(".phone_type").html(belong);
        		queryGoodsList(carrier, 0);
        		queryGoodsList(carrier, 1);
        	}
        });
	});*/

	var fun1 = function(){
		if(!passport.isLogin()){
			passport.show();
			return false;
		}
		var czdiv=$(this).closest('.cz_div');
		var phone = czdiv.find('.cz_phoneInput').val();
		phone = phone.replace(/\s/g,'');
		var gcode = czdiv.find('.cz_type.left.cz_typeHover').attr('gcode');
		if(phone == ''){
			alert(chargeResource.mobile_phone_number_is_required);
			return;
		}
		var type = czdiv.attr('type');
		if(gcode == '' || gcode == undefined){
			var msg = chargeResource.select_charge_amount;
			if(type == 1){
				msg = chargeResource.select_charge_network_flow;
			}
			alert(msg);
			return ;
		}
		$('.cz_btn').unbind();

		var directbuy_url = car_url + '/api/cart/directbuy.jhtm?itemtype=6&gcodes=' + gcode + '&phoneServiceNumber=' + phone + '&icount=1';
		$.ajax({
			type: "get",
			url: directbuy_url,
			cache: false,
			async: false,
			dataType: "Json",
			success: function (data) {
				if(data) {
					if(data.success) {
						var easybuy_url = car_url + '/api/checkout/easybuy.jhtm?buytype=2';
						$.ajax({
							type: "get",
							url: easybuy_url,
							cache: false,
							async: false,
							dataType: "Json",
							success: function (data1) {
								if(data1) {
									if(data1.success) {
										// jump
										if(data1.t.jumpOther) {
											window.location.href = data1.t.jumpUrl;
										}

									}else {
										alert(data1.resultMsg);
										$('.cz_btn').on('click', fun1);
									}
								}
							}
						});

					}else {
						alert(data.resultMsg);
						$('.cz_btn').on('click', fun1);
					}
				}
			}
		});
		// window.location.href= global_ajaxdomain + '/directbuy.jhtm?itemtype=6&gcodes=' + gcode + '&phoneServiceNumber=' + phone + '&icount=1';
	};
	
	
	$('.cz_btn').on('click', fun1);

}

function queryPhoneNumber(phone){
    $.get(global_ajaxdomain + '/charge/queryPhoneNumber/' + phone + '.jhtm',
        function (data) {
            if (data.success) {
                var info = data.t;
                /**获取商品列表**/
                var carrier = info.showType;
                var belong = info.showInfo;
                $(".phone_type").html(belong);
                queryGoodsList(carrier, 0);
                queryGoodsList(carrier, 1);
            }
        });
}


function formatPhone(phone){
    var p  = String(phone);
    return  p.substr(0,3) + " " + p.substr(3, 4) + " " + p.substr(7,4);
}

function queryGoodsList(carrier, type){
	var getgoodsreq = {};
	getgoodsreq.telecarrier = carrier;
	getgoodsreq.type = type;
	
	$.get(global_ajaxdomain + '/charge/queryGoodsList.jhtm', 
		getgoodsreq, 
		function(res){
			if(res.success){
				var text = template('goodlist', {list:res.t});
				$('.cz_typeDiv').eq(type).empty();
				$('.cz_typeDiv').eq(type).html(text);
			}else{
				alert(res.resultMsg);
			}
		}
	);
}

function isIE() { //ie?  
    if (!!window.ActiveXObject || "ActiveXObject" in window)  
        return true;  
    else  
        return false;  
}

if(isIE()){
	String.prototype.startsWith=function(str){var reg=new RegExp("^"+str);return reg.test(this);}	
	String.prototype.endWith=function(str){var reg=new RegExp(str+"$");return reg.test(this);}
}


