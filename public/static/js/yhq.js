var address = "";
var SalesCouponIds = "";
var url = window.location.href;
var loginUrl = "";
var index = url.indexOf("lenovouat");
if(index == -1) {
	address = "//lenovo.com.cn/";
	//SalesCouponIds = "105585,105571,105570,105568,105569,105567,105566,105565,105562,105561,105586,105573,105572,105559,105935,105936,105937,105938,105939,105940,106093,106094,106087,106088";
	loginUrl = "https://reg.lenovo.com.cn";
} else {
	address = "//lenovouat.com/";
	//SalesCouponIds = "2759,2760,2761";
	loginUrl = "https://reg.lenovouat.com";
}

//登录
var lenovoId = null;
var memberCode = null;
var pageSize = 9;
var pageIndex = 1;
var arrs = [];
//passport.init({
//	ticket: 'e40e7004-4c8a-4963-8564-31271a8337d8'
//});

//进入页面的时候判断是否登录
function getUserIds(pageIndex) {
	//获取用户名下有效的优惠券
	if (passport.isLogin()) {
		lenovoId = passport.cookie.lenovoId;
		var shopId = 1; //商城ID
		var terminal = 1; //2表示wap端
		$.ajax({
			type: "get",
			url: "/coupons/getSalescouponsBySalesCouponIds.jhtm?terminal=1&shopId=1" + "&page=" + pageIndex + "&page_size=" + pageSize + "&displayPosition=0&lenovoid=" + lenovoId,
			success: function (d) {
				var obj = $.parseJSON(d);
				var datas = $.parseJSON(obj.data);
				var data = datas.datas;
				if (obj.code == '00') {
					$('#coupon').empty();
					var datacount = datas.totalCount;
					for (var i = 0; i < data.length; i++) {
						SalesCouponIds += data[i].id + ",";
						var terminalNum = data[i].terminal;
						var terminal = '';
						var fwTime;
						if (data[i].timeType == '0') {
							fwTime = (data[i].fromtime).split(' ')[0].split('-').join('.') + ' - ' + (data[i].totime).split(' ')[0].split('-').join('.');
						} else {
							fwTime = data[i].validDays + '天'
						}
						if (terminalNum.indexOf('1') != -1) {
							terminal += 'PC ';
						}
						if (terminalNum.indexOf('2') != -1) {
							terminal += 'WAP ';
						}
						if (terminalNum.indexOf('3') != -1) {
							terminal += 'APP ';
						}
						if (terminalNum.indexOf('4') != -1) {
							terminal += '微信 ';
						}
						if (terminalNum.indexOf('5') != -1) {
							terminal += '微信小程序 ';
						}
						if (terminalNum.indexOf('6') != -1) {
							terminal += '线下门店 ';
						}
						terminal += '端使用';
						if (terminalNum.indexOf('1,2,3,4,5,6') != -1) {
							terminal = '全平台使用';
						}

						var html = '';
						html += '<div class="coupon" data_tag="' + data[i].id + '">';
						html += '	<div class="coupon_left"></div>';
						html += '	<div class="coupon_con">';
						html += '		<div class="coupon_conTop">';
						html += '			<div class="coupon_top">';
						html += '				<span class="coupon_sign">￥</span>';
						html += '				<span class="coupon_money">' + data[i].amount + '</span>';
						html += '			</div>';
						html += '			<div class="coupon_info">';
						html += '				<div class="coupon_title">' + data[i].name + '</div>';
						html += '				<div class="coupon_describe">' + data[i].description + '</div>';
						html += '				<div class="coupon_range">适用平台：' + terminal + '</div>';
						html += '			</div>';
						html += '		</div>';
						html += '		<div class="coupon_time">有效期：' + fwTime + '</div>';
						html += '	</div>';
						html += '	<div class="coupon_center">';
						html += '		<div class="coupon_circle1"></div>';
						html += '		<div class="circle_bg"></div>';
						html += '		<div class="coupon_circle2"></div>';
						html += '	</div>';
						html += '   <span class="shopId">' + data[i].shopid + '</span>';
						html += '   <span class="couponId">' + data[i].id + '</span>';
						html += '	<div class="operate_div yhj_get" latag="latag_wap_coupon_' + data[i].amount + '_' + data[i].description + '_' + terminal + '">';
						html += '		<div>点击</div>';
						html += '		<div>领取</div>';
						html += '	</div>';
						html += '   <span class="userd_bg"></span>';
						html += '	<div class="coupon_right"></div>';
						html += '</div>';
						// if (terminalNum == '5' || terminalNum == '6' || terminalNum == '5,6') {
						// 	html = '';
						// 	datacount--;
						// 	console.log(datacount);
						// }
						$('#coupon').append(html);
					}
					$("#page_number").PagerBind({
						pageindex: pageIndex,
						datacount: datacount,
						pagesize: pageSize,
						databind: function (k) {
							getUserIds(k)
						}
					});
					if (data.length <= 0) {
						$('.showCoupon').show();
						$('.page_number').hide();
					}
					getData(SalesCouponIds, function () {
						for (var i = 0; i < data.length; i++) {
							//判断该优惠券是否已经领取
							if (arrs != "undefied" && arrs.length > 0) {
								for (var j = 0; j < arrs.length; j++) {
									if (arrs[j].id == data[i].id) {
										$('.coupon').each(function () {
											if ($(this).attr('data_tag') == data[i].id) {
												$(this).find('.userd_bg').css('display', 'inline-block');
												$(this).find('.operate_div').hide();
												if (data[i].timeType == '1') {
													$(this).find('.coupon_time').text('有效期：' + arrs[j].fromTime.split(' ')[0].split('-').join('.') + ' - ' + arrs[j].toTime.split(' ')[0].split('-').join('.'));
												}
											}
										})

									}
								}
							}
							//立即领取
							$('.yhj_get').unbind().bind('click', function () {
								//点击领取时判断是否登录
								lenovoId = passport.cookie.lenovoId;
								memberCode = passport.cookie.loginName;
								//获取所需字段
								var shipid = $(this).parent().find('.shopId').html();
								var couponid = $(this).parent().find('.couponId').html();
								var md5Str1 = $.md5(lenovoId + memberCode + couponid + ')(*&^%$#@!MNBVCX76543');

								$.ajax({
									type: "get",
									url: /*address + */"/coupons/bindCouponsForOnce.jhtm?shopId=" + shipid + "&lenovoId=" + lenovoId + "&memberCode=" + memberCode + "&couponId=" + couponid + "&sign=" + md5Str1,
									success: function (res1) {
										if (res1.code == "00") {
											$('.yhj_successDiv').show();
											$('.yhj_successCon').show();
											$('.success_info').html('恭喜您，领取成功');
										} else if (res1.code == '04') {
											$('.yhj_successDiv').show();
											$('.yhj_successCon').show();
											$('.success_info').html('该优惠券已领完');
										} else if (res1.code == '02') {
											$('.yhj_successDiv').show();
											$('.yhj_successCon').show();
											$('.success_info').html('领取失败');
										} else if (res1.code == '05') {
											$('.yhj_successDiv').show();
											$('.yhj_successCon').show();
											$('.success_info').html('该优惠券已领过');
										}
										window.setTimeout(function () {
											$('.yhj_successDiv').hide();
											$('.yhj_successCon').hide();
										}, 2000);
										pageIndex = 1;
										getUserIds(pageIndex);
									}
								});

							});
						}
					});
					pageIndex++;
				}
			}
		});
	}else {
		var ru = encodeURI(window.location.href);
		window.location.href = loginUrl + '/auth/v1/login?ticket=b044d754-bda2-4f56-9fea-dcf3aecfe782&iswap=0&ru=' + ru;
	}
}
getUserIds(pageIndex);

function getData(SalesCouponIds,cb) {
	if(passport.isLogin()){
		lenovoId = passport.cookie.lenovoId;
		//lenovoId = '10056520694';
		memberCode = passport.cookie.loginName;
		//memberCode = 'guanyjm1@lenovo.com'
		var md5Str = $.md5(SalesCouponIds + '1' + lenovoId + memberCode + ')(*&^%$#@!MNBVCX76543');
		$.ajax({
			url: /*address + */"/coupons/getUserIshaveTheCoupon.jhtm?salesCouponIds=" + SalesCouponIds + "&sign=" + md5Str + "&lenovoId=" + lenovoId + "&memberCode=" + memberCode + "&shopId=1",
			type: "get",
			success: function(d) {
				if(d && $.parseJSON(d).success && $.parseJSON(d).data){
					data = $.parseJSON($.parseJSON(d).data);
				}
				if (data != null) {
					for(var i = 0; i < data.length; i++) {
						arrs.push({id:data[i].salescouponid,fromTime:data[i].fromtime,toTime:data[i].totime});
					}
					cb();
				}
			}
		})
	}

}
var mcode= "7a1ea57200dc"; //个人中心高亮菜单