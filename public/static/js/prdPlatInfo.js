!(function (name, factory) {
    if (typeof define === 'function' && define.amd) define(factory);//AMD
    else if (typeof module === 'object' && module.exports) module.exports = factory();//CommonJS
    else this[name] = factory();//Global
})('prdPlatInfo', function () {
    var cacheData = {};
    return {
        init: function (opts) {
            var className = opts.elm, gcode = opts.gcode, controller = opts.controller, elms = $(className), arr = [],
                url = opts.url,
                isEpp = false,
                self = this;
            elms.each(function () {
                var code = $(this).attr(gcode);
                arr.push(code);
            });
            if (!arr.length) return;
            try {
                var domain = document.URL;
                if (domain.indexOf('lenovovip') != -1 || domain.indexOf('vip') != -1 || domain.indexOf('motob2r') != -1) {
                    isEpp = true;
                    if (domain.indexOf('uat.') != -1) {
                        url = '//papi.vip.lenovouat.com/cache/query?m=hmget&k=product_price&f='
                    } else {
                        url = '//papi.lenovovip.com.cn/cache/query?m=hmget&k=product_price&f='
                    }
                } else {
                    if (domain.indexOf('uat.') != -1) {
                        url = '//papi.lenovouat.com/cache/query?m=hmget&k=product_price&f='
                    }
                }
            } catch (e) { }
            $.ajax({ // 获取价格
                type: "GET",
                url: url + arr.join(','),
                dataType: "jsonp",
                jsonp: 'callback',
                jsonpCallback: 'jQueryJSONP_promotions',
                timeout: 5000,
                error: function (err, status) {

                },
                success: function (result) {
                    var data = result.data || [];
                    $.each(data, function () {
                        var gcode = this['code'];
                        cacheData[gcode] = this;
                    });
                    elms.each(function () {
                        $(this).find('[' + controller + ']').each(function () {
                            var fn = $(this).attr(controller), code = $(this).attr(gcode) || $(this).parents(className).attr(gcode);
                            var goodsInfo ={};
                            try {
                                if('function'== (typeof Object.create)){
                                    goodsInfo = Object.create(cacheData[code]);
                            }else if(window.JSON&&JSON.stringify){
                                goodsInfo = JSON.parse(JSON.stringify(cacheData[code]));
                            }else{
                                for (var key in cacheData[code]) 
                                        goodsInfo[key] = cacheData[code][key];
                            }
                            } catch (error) {  }
                            //var goodsInfo = cacheData[code];
                            if (isEpp) {
                                var originalPrice, discountPrice;
                                if (domain.indexOf("m.lenovo") != -1) {
                                    originalPrice = goodsInfo.wap,
                                        discountPrice = goodsInfo.upline;
                                    if ((typeof originalPrice !== 'undefined') && (typeof discountPrice !== 'undefined'))
                                        goodsInfo.wap = originalPrice - discountPrice;
                                } else {
                                    originalPrice = goodsInfo.pc,
                                        discountPrice = goodsInfo.upline;
                                    if ((typeof originalPrice !== 'undefined') && (typeof discountPrice !== 'undefined'))
                                        goodsInfo.pc = originalPrice - discountPrice;
                                }
                            }
                            this.scope = goodsInfo;
                            (new Function(fn + '.call(this)')).call(this);
                        });
                    });
                }
            });
        }
    }
});
//初始化调用逻辑
prdPlatInfo.init({
    elm: '.prod',
    gcode: 'gcode',
    controller: 'controller',
    url: '//papi.lenovo.com.cn/cache/query?m=hmget&k=product_price&f='
});
