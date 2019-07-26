;
var terminal = 1;

// TODO _j passport
if(!passport.isLogin()){
	$('.think_user .think_login a').eq(1).attr('href','javascript:;');
	$('.think_user .think_login a').eq(1).click(function(){
	        logobj.showlogin(function(){window.location.reload()});
	});
};

var Buy = (function(){
    var _buy = {};
    _buy.limit = cartSingleRowLimit;
    // 联想服务显示隐藏
    _buy.service = function(){
    	$('.buycart').on('click', '.choose_service', function(){
    		//查询已选择的服务
    		$tr = $(this).closest('tr')
    		$next = $tr.next('tr:first');
    		/**已选服务列表**/
    		var selectedlist = [];
    		if($next.hasClass('bc_gift')){
    			$next.find('ul.bc_gift_top').each(function(){
    				var one = {};
    				var gcode = $(this).attr('gcode');
    				var ccode = $(this).attr('ccode');
    				one.gcode = gcode;
    				one.ccode = ccode;
    				selectedlist.push(one);
    			});
    		}
    		/*选中已选择的服务列表*/
    		$tr.find('select').each(function(){
    			//重置
    			$(this).find('option:first').attr("selected",true);
//    			var gcode = $(this).attr('gcode');
    			for(var i=0; i < selectedlist.length; i++){
    				var tmp = selectedlist[i];
    				var $option = $(this).find('option[gcode=' + tmp.gcode+']');
    				if($option.length){
    					$option.attr("selected",true);
    				}
    			}
    		});

    		$(this).siblings('.service_box').show();
    	});

    	$('.buycart').on('click', '.service_cancel', function(){
    		 $(this).parents('.service_box').hide();
    	});
    	//选择服务
    	$('.buycart').on('change', 'select', function(){
    		var selectlist = [];
    		var self = $(this);
    		self.closest('ul').find('select').each(function(){
    			var option = $(this).find('option:selected');
    			if(!option.attr('gcode')){
    				return;
    			}
    			var data = {};
    			var ccode = $(this).attr('ccode');
    			data.ccode = ccode;
    			data.gcode = option.val();
    			data.gname = option.text();
    			selectlist.push(data);
    		});
    	});


    	//选择服务确定11
    	$('.buycart').on('click', '.service_ok', function(){
    		var scodes = [];
    		var $tr = $(this).closest('tr');
    		var list = [];
    		$tr.find('select').each(function(){
    			var option = $(this).find('option:selected');
    			var ccode = $(this).attr('ccode');
    			if(option.attr('value')){
    				var serv = {};
    				serv.ccode = ccode;
    				serv.gcode = option.attr('gcode');
    				serv.gname = option.attr('gname');
    				serv.gprice = option.attr('gprice');
    				serv.num = $tr.find('input.pro_num').val();
    				serv.xiaoji = parseFloat(serv.gprice) * parseFloat(serv.num).toFixed(2);
    				list.push(serv);
    				scodes.push(serv.gcode);
    			}
    		});

    		$sibling = $tr.next('tr:first');

    		//请求修改服务
    		var gcode = $tr.attr('gcode');

    		//调用接口增加
            var urlmodifyitem = 'updateitemservice.jhtm';
            var data = {
            		terminal: terminal,
            		itemId: gcode,
            		services: scodes.join(','),
            		ss: new Date().getTime()
        			};
            $.post(urlmodifyitem,
            		data,
            		function (data) {
                    if(typeof (data) == "string"){
                        data = JSON.parse(data);
                    }
                	if (data.rc == "0") {
                		refreshCart(data.html);
                	}
                	else{
                		showMessage(3000, data.msg);
                	}
            });
    	});

    };


    //form值加减
    _buy.num = function(){

    	$('.buycart').on('click', '.i_box .J_add', function(){
    		var $tr=$(this).closest('tr');
        	if($tr.hasClass('disable')){
        		return;
        	}
			var limit = $(this).attr("maxNum");
			if(limit){
				_buy.limit = limit;
			}
            var oldValue = parseInt($(this).siblings(".J_input").val());
            var newValue = oldValue + 1;
            var stock = parseInt($tr.attr('stock'));
            if(newValue > stock){
            	 showMessage(3000, cartResource.insufficient_store);
            	return ;
            }

            try{
                if(newValue > _buy.limit) {
                	 showMessage(3000, cartResource.max_num_can_buy.format(_buy.limit));
                	return;
                }
            }catch(e){
            }
            $(this).siblings(".J_input").val(newValue);

            updaterownum($tr, oldValue, newValue);
            return false;
    	});

    	$('.buycart').on('click', '.i_box .J_minus', function(){
    		var $tr=$(this).closest('tr');
         	if($tr.hasClass('disable')){
         		return;
         	}

            var oldValue=parseInt($(this).siblings(".J_input").val());
            var newValue = oldValue - 1;
            if(newValue < 1){
                 $(this).siblings(".J_input").val(1);
                 return;
            }else{
                 $(this).siblings(".J_input").val(newValue);
            }
            updaterownum($tr, oldValue, newValue);
            return false;
    	});

    	$('.buycart').on('blur', '.i_box .J_input', function(){
    		  var $tr=$(this).closest('tr');
              if($tr.hasClass('disable')){
                  return;
              }
			  var limit = $(this).attr("maxNum");
              if(limit){
                 _buy.limit = limit;
              }
              var oldValue = parseInt($(this).attr('val'));
              var newValue = parseInt($(this).val());
              if(!newValue || newValue < 1){
                //不符合数字
                $(this).val(oldValue);
                return;
              }

              var stock = parseInt($tr.attr('stock'));
              if(newValue > stock){
              	 showMessage(3000, cartResource.insufficient_store);
              	$(this).val(oldValue);
              	return ;
              }


              try{
                  if(newValue > _buy.limit) {
                      newValue = _buy.limit;
                      showMessage(3000, cartResource.max_num_can_buy.format(_buy.limit));
                  }
                  if(newValue <= 0){
                      newValue = 1;
                  }
              }catch(e){
              }

              $(this).val(newValue);

              updaterownum($tr, oldValue, newValue);
              return false;
    	});

        $(document).delegate('.J_input', 'keypress', function (event) {
			var $tr=$(this).closest('tr');
			if($tr.hasClass('disable')){
        		return false;
        	}

			var keyCode = event.which;
			if (keyCode == 46 || (keyCode >= 48 && keyCode <= 57))
				return true;
			else
				return false;
		});
		//$(document).delegate('.J_input', 'focus', function () {
		//	this.style.imeMode = 'disabled';
		//});


    };

    _buy.bindChooseAll = function(){
    	$('.buycart').on('click', '.bc_all', function(){
			var itemid = [];
			$('#main_table tr').each(function(){
                var rowid = $(this).attr('gcode');
                if(rowid){
                    itemid.push(rowid);
                }
			});
			if(itemid.length == 0){
				return;
			}
    		var div = $(this).closest('div');
    		if(div.hasClass('active')){
    			$(".bc_all").closest('div').removeClass('active');
				$('#main_table tr').removeClass('active');
				activeItem(itemid.join('@'), false);
    		}else{
    			$(".bc_all").closest('div').addClass('active');
    			$('#main_table tr').addClass('active');
				activeItem(itemid.join('@'), true);
    		}
    	});
    }


    _buy.getServices = function(){
        // .disable -> 无库存
        var _refreshServiceParam = {};
        _refreshServiceParam.terminal = terminal;
        // 购物车当前所有主商品code集合
        var _gcodes = [];
        // 购物车当前所有  主商品code + 类型(套餐->套餐id|选件->2)  集合
        var _gcodes_with_type = [];
        var _gcoodIdx = 0;
        $("#main_table tr").not('.disable').not('.bc_gift').not(".pink_table").each(function(index) {
            if (index === 0) {
                return;
            }
            var self = $(this);
            var type = self.attr('type');
            var mainGcode = self.attr('gcode');
            if (type == 2 || type == 3) {
                mainGcode = mainGcode.split(',')[0];
            }
            if(_gcodes.indexOf(mainGcode) === -1) _gcodes.push(mainGcode);
            _gcodes_with_type[_gcoodIdx++] = self.attr("id").substring("cart_row_item_".length, self.attr("id").length); //cart_row_item_1000087-2
        });
        // 购物车为空 不发请求
        if( _gcodes.length === 0 ) return;
        _refreshServiceParam.gcodes = _gcodes.join(",");
        var urlservicebatch = 'getservicelistbatch.jhtm';
        $.ajax({
            type: "post",
            url: urlservicebatch,
            data: _refreshServiceParam,
            async: true,
            success: function (data) {
                if(data && data != ""){
                    data = JSON.parse(data);
                    if (data.rc == "0") {
                        var map = data.gcoodServiceListMapping;
                        // map  key -> gcode
                        //      value -> serviceCategoryItemList[
                        //                  {
                        //                      ..,
                        //                      serviceProductItemList:[],
                        //                      ..
                        //                  },
                        //                  {},
                        //                  {}...
                        //              ]
                        $.each(_gcodes_with_type, function(i, _gcode_with_type){
                            var _gcode = _gcode_with_type;
                            if(_gcode_with_type.indexOf("-") !== -1){
                                _gcode=_gcode_with_type.substring(0, _gcode_with_type.lastIndexOf("-"));
                            }
                            if(map[_gcode] && map[_gcode].length > 0){
                                var text = template('serviceSelect', {list:map[_gcode]});
                                $("#cart_row_item_"+_gcode_with_type + " div.bc_service").eq(0).html(text);
                            }
                        })
                    }else{
                        console.log("getServicesBatch failed stateCode:" + data.rc + "\terrorMg:" + data.msg);
                    }
                }
            },
            error:function(e){
                console.log("getServicesBatch occur error" + e);
            }
        });
    };


    _buy.bindChoose = function(){
    	$('.buycart').on('click', '.bc_table_sel a', function(){
    		var tr = $(this).closest('tr');
			var gcode = tr.attr('gcode');

    		if(tr.hasClass('active')){
    			tr.removeClass('active');
				activeItem(gcode, false);
    		}else{
    			tr.addClass('active');
				activeItem(gcode, true);
    		}
    		updateSelectAll();
    	});
    }


    _buy.bindRowDel = function(){
    	$('.buycart').on('click', '.bc_num_del', function(){
    		var tr = $(this).closest('tr');
			var gcodes = [];
			$('tr.active').each(function(){
				var gcode = $(this).attr('gcode');
				gcodes.push(gcode);
			});
			if(gcodes.length == 0){
				 showMessage(3000, cartResource.none_selected_goods);
				return false;
			}
			opencover(cartResource.delete_operate, cartResource.confirmed_to_delete, "deletegode('" + gcodes.join('@') + "')");
    	});
    }

    	var updateSelectAll = function(){
    		//判断如果全选可勾选全选，否则去掉全选
    		//去掉全选勾
    		var ischooseall = true;
    		$('#main_table tr:gt(0)').not('.pink_table').not('.bc_gift').each(function(){
    			if(!$(this).hasClass('active')){
    				ischooseall = false;
    				return false;
    			}
    		});
    		if(ischooseall){
    			$(".bc_all").addClass('active');
    		}else{
    			$(".bc_all").removeClass('active');
    		}

		}

    _buy.updateSelectAll = updateSelectAll;

    // TODO _j passport
    _buy.bindSubmitOrder = function(){
    	$('.buycart').on('click', '#submit', function(){
    		if(!passport.isLogin()){
    			passport.login = submitcallback;
    			passport.show();
    			return;
    		}

			submitGoods_track();//易分析数据采集--提交选中商品
            //google 监控
            google_monitor();
    		submitcallback();
    	});

    }

	<!-- Google Analytics -->
    _buy.common_google_monitor = function () {
		try {
			var lenovo_id = getUserId();
			(function (i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r;
				i[r] = i[r] || function () {
					(i[r].q = i[r].q || []).push(arguments)
				}, i[r].l = 1 * new Date();
				a = s.createElement(o),
					m = s.getElementsByTagName(o)[0];
				a.async = 1;
				a.src = g;
				m.parentNode.insertBefore(a, m)
			})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

			ga('create', 'UA-110299082-1', 'auto', {userId: lenovo_id, allowLinker: true});
			ga('require', 'ec');
			ga(function (tracker) {
				var clientId = tracker.get('clientId');
				ga('set', 'dimension1', clientId);
			});
			ga('set', 'dimension2', lenovo_id);
			ga('set', 'dimension3', getCookie("LenovoCookieID"));
			ga('require', 'linker');
			ga('linker:autoLink', ['lenovo.com.cn', 'lenovo.cn', 'lenovovip.com.cn', 'lenovo.com']);
			ga('set', 'transport', 'beacon');
			ga('send', 'pageview');
		} catch (e) {
		}
	};
	<!-- End Google Analytics -->


    //*提交选中商品-易分析*//
	window._trackData = window._trackData || [];//必须为全局变量，假如之前并没有声明，请加此行代码；
	function submitGoods_track(){
		var gcodes_in_cart = [];
		$("#main_table tr.active").each(function(){
			var code = $(this).attr('gcode');
			if(code){
				gcodes_in_cart.push(code);
			}
		});
		var maingcodes = gcodes_in_cart.join('|');
		_trackData.push(['show','goodsincart', 'latag_pc_shopcart_pay_' + maingcodes])
	}

    //get cookie val by name
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg)){
            return unescape(arr[2]);
        }else{
            return null;
        }
    }

    // TODO _j passport
    //get user id
    function getUserId(){
        if(!passport.cookie || !passport.cookie.lenovoId){
            return getCookie("leid");
        }else{
            return passport.cookie.lenovoId;
        }
    }

	function submitcallback(){
		try{
			var Timeout;
			var onloadyes=false;
			var timeyes=false;
			var startime = + new Date;
			var a =(+ new Date) + Math.random()*100;
			var iframe = document.createElement("iframe");
			iframe.style.display = 'none';
			iframe.onload =iframe.onreadystatechange = function(){
				onloadyes=true;
				iframe.onload =iframe.onreadystatechange = null;
				$(iframe).remove();
				if(timeyes) return;
				console.log(new Date().toDateString()+'Total time-consuming = '+((+new Date)-startime));
				submitcallback_detail();//◊‘º∫µƒ¬ﬂº≠
			};
			iframe.src = "https://6895322.fls.doubleclick.net/activityi;src=6895322;type=lenov0;cat=___uv001;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1;num=" + a + "?";
			document.body.appendChild(iframe);
			/**
			 * time  ∂‡…Ÿ√Î∫Û÷¥––
			 * count  ∂‡…Ÿ√Î÷¥––“ª¥Œ
			 */
			(function (time, count) {
				var start = 0;
				function create(Callback) {
					return setTimeout(function () {
						if (start >= time) {
							Callback();
						} else {
							create(Callback);
						}
						start += count;
						console.log("start", start);
					}, count);
				}
				Timeout = create(function () {
					if(onloadyes) return;
					timeyes=true;
					console.log(new Date().toLocaleDateString()+'timeout Total time-consuming = '+((+new Date)-startime));
					submitcallback_detail();////◊‘º∫µƒ¬ﬂº≠
				});
			})(300, 60)
		}
		catch (e){}
	}



	function submitcallback_detail(){
		var ids = [];
		var existNoStock = false;
		$('#main_table tr.active').each(function(){
			if($(this).hasClass('disable')){
				existNoStock = true;
				return false;
			}
			if($(this).attr('gcode')){
				ids.push($(this).attr('gcode'));
			}
		});
		if(existNoStock){
			showMessage(3000, cartResource.part_of_goods_lack);
			return false;
		}
		if(ids.length == 0){
			showMessage(3000, cartResource.none_selected_goods);
			return false;
		}
		window.location.href = 'checkout.jhtm?terminal=' + terminal;
    }

    //虚拟表单，post提交
    function post(URL, PARAMS) {
        var temp = document.createElement("form");
        temp.action = URL;
        temp.method = "post";
        temp.style.display = "none";
        for (var x in PARAMS) {
            var opt = document.createElement("textarea");
            opt.name = x;
            opt.value = PARAMS[x];
//             showMessage(3000,opt.name);
//             showMessage(3000,opt.value)
            temp.appendChild(opt);
        }
        document.body.appendChild(temp);
        // showMessage(3000,temp);
        temp.submit();
        return temp;
    }



    //清空购物车
    _buy.bindEmptyCart = function () {
		$("#clearmycart").click(function(){
			opencover(cartResource.empty_operate, cartResource.confirmed_to_empty_cart, "emptycart()");
		});
    }

//    _buy.updateXiaoji = function(){
//    	$("#main_table tr").not('.bc_gift').each(function(){
//    		var num    =   $(this).find('input.pro_num').val();
//    		updateXiaoJi2($(this), num);
//    	});
//    }


    var updaterownum = function($tr, num, newVal){
    	var gcode = $tr.attr('gcode');
    	var url = 'modifycaritemcount.jhtm';
    	$.post(url, {terminal:terminal, icount: newVal, itemId: gcode }, function (data) {
            if(typeof (data) == "string"){
                data = JSON.parse(data);
            }
    		if (data.rc == 0) {
    			refreshCart(data.html);
    		}else if(data.rc == 2){
    			$tr.find('.J_input').val(num);
                 showMessage(3000, cartResource.store_insufficient_and_not_added);
            } else {
            	$tr.find('.J_input').val(num);
    			 showMessage(3000, cartResource.update_cart_failure);
    		}
    	});
    }

	var activeItem = function(itemid, active){
		var url = 'activeItem.jhtm';
		$.post(url, {terminal:terminal, itemId: itemid, active: active }, function (data) {
            if(typeof(data) == "string"){
                data = JSON.parse(data);
            }
    		if (data.rc == 0) {
    			$('#cart_main').html(data.html);
    			refreshCart(data.html);
    		} else {
				//showMessage(1000, "同步购物车失败!");
				 showMessage(3000, cartResource.update_cart_failure);
			}
    	});
	}


    _buy.bindShowFullReduction = function(){
    	$('.buycart').on('click', '.table_cx',function(){
    		$(this).next('.table_cx_main').show();
    	});

    	$('.buycart').on('click', '.table_cx_mainqr',function(){
    		var gcode = $(this).closest('tr').attr('gcode');
            var promotionid = "-1";
            $(this).closest('.table_cx_main').find('input:radio').each(function(){
            	if($(this).attr('checked') == 'checked'){
            		promotionid = $(this).attr('promotionid');
            	}
            });

            var data = {terminal:terminal,
            		gcode: gcode,
            		promotionid: promotionid};

            $.ajax({
	            url: "usepromotion.jhtm",
	            data: data,
	            success:function(data) {
                    if(typeof (data) == "string"){
                        data = JSON.parse(data);
                    }
	            	if (data.rc == 0) {
	            		refreshCart(data.html);
	            	}else{
	            		 showMessage(3000, cartResource.update_cart_failure);
	            	}
	            }
            });
        });

    	$('.buycart').on('click', '.table_cx_mainqx', function(){
    		$(this).closest('.table_cx_main').hide();
    	});

    }



    return _buy;

})(jQuery, Buy)


$(function(){

    Buy.getServices();
    
//    Buy.updateXiaoji();
    // 联想服务显示隐藏
    Buy.service();

    //form值加减
    Buy.num();
    //全部选择
    Buy.bindChooseAll();
    //删除绑定
    Buy.bindRowDel();
    // TODO _j passport
    Buy.bindSubmitOrder();
    
    Buy.bindChoose();
    
    Buy.bindEmptyCart();
    
    Buy.updateSelectAll();

    Buy.bindShowFullReduction();

    //PC商品推荐信息获取 与轮播
	function goodsRecommend(){
        var laccid = getCookie("LA_C_C_Id");
	    var goods = [];
        $.ajax({
            url: "https:" + cnCartRecommendModule + "&terminal=1",
            dataType:'jsonp',
            data:{"laccid":laccid},
            async:false,
            jsonp:'jsonpCallback',
            success:function(_api_resp) {

                if(_api_resp.status !== 0 ){
                    $("#cart_recommend_segment").addClass("_dsp_off");
                    console.log(_api_resp.massage);
                    return;
                }

                var _content = _api_resp.result.goodsDetails;
                var _rcmd_origin_order = _api_resp.result.recommedResult.position;
                var _idx = 0;
                $.each(_rcmd_origin_order, function(i, posit){
                    var gcode = posit.codes;
                    if(!_content[gcode]){
                        return true;
                    }else{
                        var _recommend_info = {};
                        _recommend_info.idx = i;
                        _recommend_info.gcode = gcode;
                        _recommend_info.pcUrl = _content[gcode].detail.url.pc;
                        _recommend_info.thumbnailsURL = _content[gcode].detail.thumbnail;
                        _recommend_info.name = _content[gcode].detail.name;
                        _recommend_info.price = _content[gcode].price.P_C.C_1.P_0.DV.V;
                        _recommend_info.flag = posit.flag;
                        _recommend_info.strategy = posit.strategy;
                        goods[_idx++] = _recommend_info;
                    }
                });

                if( goods != null && goods.length != 0){
                    var recommend_html =
                        '<li class="_rcmd_good _dsp_off" latag="latag_pc_shoppingcart_recommendedItem_${idx}_${flag}_${gcode}_${strategy}">'+
                        '    <div class="_rcmd_good_tumb_c">'+
                        '        <a href="${pcUrl}" target="_blank">'+
                        '            <img src="${thumbnailsURL}" class="_rcmd_good_tumb">'+
                        '        </a>'+
                        '    </div>'+
                        '    <span class="_rcmd_good_name"> ${name} </span>'+
                        '    <span  class="_rcmd_good_price"> ￥${price}</span>'+
                        '</li>';
                    $.template("_rcmd_tmpl",recommend_html);
                    $.tmpl("_rcmd_tmpl", goods).appendTo("#_rcmd_good_ul");

                    $("#_rcmd_good_ul").carousel({
                        "_dsp_num"      : 4,                 // 自定义每次轮播切换的商品数量(最好是偶数)
                        "_dps_row"      : 1,                 // 自定义轮播商品展示行数
                        "_interval_time": 3000,              // 自动轮播间隔时间，单位ms
                        "_prev_btn"     : "#_rcmd_prev_btn", // 轮播上翻页按钮
                        "_next_btn"     : "#_rcmd_next_btn"  // 轮播下翻页按钮
                    });
                }else{
                    $("#cart_recommend_segment").addClass("_dsp_off")
                }
            }
        });
    }


	if(shopId != 3 && shopId != 18){
        try{
	        goodsRecommend();
        }catch(e){
            console.log("fetch or render recommended goods info error... check...");
        }
	}

    $('img').error(function(){
        $(this).attr('src', pcImgHomeModule+'/base/pic_lost.jpg');
    });


    try {
        Buy.common_google_monitor();
    } catch (e) {
    }
    
})


//删除一行
function deleline(_this) {
	opencover(cartResource.delete_operate, cartResource.confirmed_to_delete, "deletegode('" + _this + "')");
}
function deletegode(str) {
	var totalmoneyf = $("#totalmoneyf").text();
/*	if ( totalmoneyf == '0' ||  totalmoneyf == '0.0' || totalmoneyf == '0.00') {
		$("#submit").css("background", "#e00000");
	}
*/	var url = 'deleteitemfromcart.jhtm';
	gcode= [];
	gcode.push(str);
	$.post(url, { terminal: terminal, itemIds: gcode.join('@') }, function (data) {
		if(typeof(data)=='string'){
			data = JSON.parse(data);
		}
		if (data.rc == 0) {
			closecover();
			refreshCart(data.html);
		} else {
			showMessage(3000, cartResource.sync_cart_failure);
			updatebtnsubmitbtn();
		}
	});

	//google_PRemoveFromCart
    google_monitor_del(str);
}




function refreshCart(html){
	$('#cart_main').html(html);
	//刷新服务
	Buy.getServices();
	Buy.updateSelectAll();
}


function deleservice(_this) {
	var totalmoneyf = $("#totalmoneyf").text();
	if ( totalmoneyf == '0' ||  totalmoneyf == '0.0' || totalmoneyf == '0.00') {
		$("#submit").css("background", "#e00000");
	}
	var url = 'deleteservice.jhtm';
	//获取要删除的服务code
	var servicecode = $(_this).closest('ul').attr('gcode');
	var gcode = $(_this).closest('tr').prev().attr('gcode');
	$.post(url, { terminal:terminal, itemId: gcode, service:servicecode }, function (data) {
		if(typeof(data)=='string'){
			data = JSON.parse(data);
		}
		if (data.rc == 0) {
			closecover();
			refreshCart(data.html);
		} else {
			showMessage(3000, cartResource.sync_cart_failure);
			updatebtnsubmitbtn();
		}
	});
}

//*删除选中商品-易分析*//
	window._trackData = window._trackData || [];//必须为全局变量，假如之前并没有声明，请加此行代码；
function delGoods_track(){
	var gcodes_in_cart = [];
	$("#main_table tr.active").each(function(){
		var code = $(this).attr('gcode');
		if(code){
			gcodes_in_cart.push(code);
		}
	});
	var maingcodes = gcodes_in_cart.join('|');
	_trackData.push(['show','goodsincart', 'latag_pc_shopcart_delcar_' + maingcodes])
}

//删除购物车选中商品
function deletegodeall (){
	var itemids = [];
	$('#main_table tr.active').each(function(){
		itemids.push($(this).attr('rowid'));
	});
	if(itemids.length == 0){
		 showMessage(3000, cartResource.none_selected_goods);
		return false;
	}
	delGoods_track();//易分析删除数据采集
	var url = 'deleteitemfromcart.jhtm';
	$.post(url, {terminal:terminal, itemid: itemids.join(',') }, function (data) {
		data = JSON.parse(data);
		if (data.rc == 0) {
			window.location.reload();
		} else {
			 showMessage(3000,data.msg);
		}
	});
}

var emptycart = function(){
    var url = 'deleteallitemfromcart.jhtm';
    $.post(url, { }, function (data) {
        data = JSON.parse(data);
        if (data.rc = "0") {
            ///重新获取购物车rejosn
            window.location.reload();
        }
        else {
            showMessage(3000, data.msg);
        }
    });
}


//推荐商品加入购物车
$('#bc_prolist').on('click', '.bc_btn', function(){

	var gcodes =($(this).attr('gcode'));
	var url = 'additemtocart.jhtm';
	var itemtype = 0;
	var icounts = 1;

	var timestamp = Date.parse(new Date());  //时间戳，用来加入车后刷新页面

	$.post(url, {itemtype:itemtype, icount:icounts, gcodes:gcodes}, function (data) {
		if (data.rc == 0) {
			   window.location.href =  '/getcart.jhtm?_=' + timestamp;

		} else {
			 showMessage(3000,data.msg);
		}
	});

});

//更新按钮状态
function updatebtnsubmitbtn(){
    if ($("#totalmoneyf").text() != 0.00) {
        $("#btn_submit").attr("disabled", false).css("background", "#e00000");
    } else {
        $("#btn_submit").attr("disabled", true).css("background", "#c0c0c0");
    }
}
function test(){
	$.ajax({
		url: "https://buy1.lenovouat.cn/api/score/exchangeCoupon.jhtm",
		dataType:'jsonp',
		data:{
			shopId:14,
			couponId:"2877",
			memberId:"10001",
			lenovoId:"10001"
		},
		jsonp:'callbackparam',
		success:function(data) {
			alert(data);
			console.info(data);
		}
	});
}
$(function () {

	//test();  //测试惠商 测试docker 啦啦啦啦啦

	/*无库存不选中*/
	$('#plistsf .sprow').each(function(){
		var self = $(this);
		var stock = self.find('.stores').attr('value');
		if(stock == 0 || stock == "0"){
			self.find('input:checkbox').removeAttr("checked");
		}
	});
	
	$('.product-check').click(function(){
		var self = $(this);
		var stock = self.closest('.sprow').find('.stores').attr('value');
		if(stock == 0 || stock == "0"){
			self.removeAttr("checked");
			 showMessage(3000, cartResource.lack_of_stock);
			return false;
		}
		setTotal();
	});
});

// TODO _j passport
//收藏
function conllectionFun(gcode){
    if(!passport.isLogin()){
        passport.show();
        return;
    }
    var queryGcode = gcode.split(",", 1)[0];
    $.ajax({ //查询是否收藏
        url:queryCollectionUrl,
        type: "GET",
        dataType: "jsonp",
        async:false,
        data: {"gcode":queryGcode},
        jsonp:'callbackparam',
        success: function (data) { // rc:0:已收藏 1:未收藏
            if(data.rc==0){
                showMessage(3000,data.msg);
            }else if(data.rc==1){
                addCollectionFun(gcode);
            }else{
                showMessage(3000, cartResource.relogin);
            }
        },
        error:function(e){
            console.log("error")
            console.log(e);
        }
    })
}

//添加收藏
function addCollectionFun(gcode) {
    var addGcode = queryGcode = gcode.split(",", 1)[0];
    $.ajax({
        url:addCollectionUrl,
        type: "GET",
        dataType: "jsonp",
        async:false,
        data: {"gcode":addGcode},
        jsonp:'callbackparam',
        success: function (data) { // rc:0:添加收藏成功 1:非独立销售商品不可收藏 -1：收藏失败
            if(data.rc==0){
               showMessage(3000, cartResource.collection_success);
                deletegode(gcode);
            }else if(data.rc==1){
                showMessage(3000, cartResource.unallowed_collection);
            }else if(data.rc==-1){
                showMessage(3000, cartResource.collection_failure);
            }else{
                showMessage(3000, cartResource.network_exception);
            }
        },
        error:function(e){
            showMessage(3000, cartResource.collection_exception);
            console.log("error")
            console.log(e);
        }
    });
}


//google 监控

function google_monitor_del(str) {
    try {
    	if(str != null){
            var garr = str.split("@");
            var cartData = [];
            $("#main_table tr").each(function(){
                if($(this).attr("gcode") && garr.indexOf($(this).attr("gcode")) != -1){
                    getMonitorDate(cartData, $(this));
                }
            });
            var ids = checkout_monitor(cartData);
            ga('ec:setAction','remove');
            ga('send', 'event', "Cart_PC", "PRemoveFromCart", ids.join("_"));
		}
    }catch (e) {
        console.error(e);
    }
}


function google_monitor() {
    try {
        var cartData = [];
        $("#main_table tr.active").each(function(){
            getMonitorDate(cartData, $(this));
        });
        var ids = checkout_monitor(cartData);
        ga('ec:setAction','checkout', {
            'step': 2
        });
        ga('send', 'event', "Cart_PC", "ProductCheckoutStep_2", ids.join("_"));
    }catch (e) {
        console.error(e);
    }
}

function getMonitorDate(cartData, ele) {
    //main
    var id = ele.attr("gcode").split(",")[0];
    var name = ele.find(".bc_proname").find("a").html();
    var price = ele.find(".current_price").html();
    var quantity = ele.find('.J_input').val();
    cartData.push({
        id: id,
        name: name,
        price: price,
        qty: quantity
    });

    var $next_tr = ele.next(".bc_gift");

    //service
    $next_tr.find(".bc_gift_top").each(function(){
        var id = $(this).attr("gcode");
        var name = $(this).find(".bc_top_title").html();
        var price = $(this).find(".bc_top_price").html();
        var quantity = $(this).find(".bc_top_num").html();

        cartData.push({
            id: id,
            name: name,
            price: price,
            qty: quantity
        });

    });


    //gift option
    $next_tr.find(".bc_gift_bot").each(function () {
        $(this).find(".clearfix").each(function(){

            var ele1 = $(this).children().first();
            var id = ele1.attr("gcode");
            var name = ele1.next().html();
            var price = ele1.next().next().html();
            price = price == "" ? 0 : price;
            var quantity = ele1.next().next().next().html();

            cartData.push({
                id: id,
                name: name,
                price: price,
                qty: quantity
            });

        });
    });

}

function checkout_monitor(cart) {
    var ids = [];
    for(var i = 0; i < cart.length; i++) {
        var product = cart[i];
        ids.push(product.id);
        ga('ec:addProduct', {
            'id': product.id,
            'name': product.name,
            'price': product.price,
            'quantity': product.qty
        });
    }
    return ids;
}

