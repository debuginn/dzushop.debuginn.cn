/**
 * jQuery MD5 hash algorithm function
 */
(function ($) {

    var rotateLeft = function (lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    var addUnsigned = function (lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    var F = function (x, y, z) {
        return (x & y) | ((~x) & z);
    }

    var G = function (x, y, z) {
        return (x & z) | (y & (~z));
    }

    var H = function (x, y, z) {
        return (x ^ y ^ z);
    }

    var I = function (x, y, z) {
        return (y ^ (x | (~z)));
    }

    var FF = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var GG = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var HH = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var II = function (a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    };

    var convertToWordArray = function (string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWordsTempOne = lMessageLength + 8;
        var lNumberOfWordsTempTwo = (lNumberOfWordsTempOne - (lNumberOfWordsTempOne % 64)) / 64;
        var lNumberOfWords = (lNumberOfWordsTempTwo + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    var wordToHex = function (lValue) {
        var WordToHexValue = "", WordToHexValueTemp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValueTemp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValueTemp.substr(WordToHexValueTemp.length - 2, 2);
        }
        return WordToHexValue;
    };

    var uTF8Encode = function (string) {
        string = string.replace(/\x0d\x0a/g, "\x0a");
        var output = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                output += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192);
                output += String.fromCharCode((c & 63) | 128);
            } else {
                output += String.fromCharCode((c >> 12) | 224);
                output += String.fromCharCode(((c >> 6) & 63) | 128);
                output += String.fromCharCode((c & 63) | 128);
            }
        }
        return output;
    };

    $.extend({
        md5: function (string) {
            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
            var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
            var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
            var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
            string = uTF8Encode(string);
            x = convertToWordArray(string);
            a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
            for (k = 0; k < x.length; k += 16) {
                AA = a; BB = b; CC = c; DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = addUnsigned(a, AA);
                b = addUnsigned(b, BB);
                c = addUnsigned(c, CC);
                d = addUnsigned(d, DD);
            }
            var tempValue = wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d);
            return tempValue.toLowerCase();
        }
    });
})(jQuery);
var cms_common = {
    /**
     * 初始化登录窗口
     * @param type 头类型  lenovo  think
     */
    poplogin: function (type) {
        function navTopDown() {
            $('.top_title').bind('mouseenter', function () {
                $(this).siblings('ul').stop(true, true).slideDown(300);
                $(this).find('a').removeClass('.top_down').addClass('top_up');
            });
            $('.top_link').bind('mouseleave', function () {
                $(this).find('ul').stop(true, true).slideUp(300);
                $(this).find('.top_title').find('a').removeClass('top_up').addClass('top_down');
            });
            $('.top_phone_title').bind('mouseenter', function () {
                $(this).siblings('ul').stop(true, true).slideDown(300);
                $(this).find('a').removeClass('.top_downs').addClass('top_ups');
            });
            $('.top_phone').bind('mouseleave', function () {
                $(this).find('ul').stop(true, true).slideUp(300);
                $(this).find('.top_phone_title').find('a').removeClass('top_ups').addClass('top_downs');
            });
        };
        function getcartcount() {
            $.ajax({
                url: "https://buy.lenovo.com.cn/getshoppingcartcount.jhtml",
                dataType: "jsonp",
                async: false,
                type: "get",
                jsonp: "callbackparam",
                success: function (data) {
                    if (data.rc == 0) {
                        $("#top_cart_count").text(data.count);
                    }
                },
                error: function (a, b, c) {  }
            });
        }
        try {
            var ticket = "";
            //初始化登录
            switch (type) {
                case "lenovo":
                   if($("body").find(".add_nav").length==0){
                    ticket = "e40e7004-4c8a-4963-8564-31271a8337d8";
                    var drawUserInfo = function () {
                        $(".top_loginbtn").hide();
                        $(".top_regist").hide();
                        $(".top_usercenter").show();
                        $(".top_phone_title").html(passport.cookie.loginName + '<a href="#" class=" top_usepng top_downs"></a>').parent().show();
                    };
                    if (window.passport && passport.isLogin()) {
                        drawUserInfo();
                    }
                    passport.init({
                        ticket: ticket,
                        drawUserInfo: drawUserInfo,
                        logout: function () {
                            $(".top_loginbtn").show();
                            $(".top_regist").show();
                            $(".top_usercenter").hide();
                            $(".top_username").hide();
                            $(".top_phone").hide();
                        }
                    });
                    navTopDown();
                    getcartcount();
                    $('body').delegate('.login', 'click', function () {
                        passport.show();
                    }).delegate('.logout', 'click', function () {
                        passport.doLogout();
                    })
                    var reg = $('.regist');
                    reg.attr('href', reg.attr('href') + window.location.href);
                  
                   }else{
                    function getuserimg(){
                        if(passport.isLogin()){
                            var lenovoid = passport.cookie.lenovoId;
                            for(var i = passport.cookie.lenovoId.length;i<20;i++){
                                lenovoid= '0'+lenovoid;
                            }
                            var  url ="https://i.app.lefile.cn/uc_server/data/avatar" + "/"+lenovoid.substring(0, 5)+"/"+lenovoid.substring(5, 10)+"/"+lenovoid.substring(10, 15)+"/"+lenovoid.substring(15, lenovoid.length)+"_profilehead.w50"+".jpg";
                            $('.top_login_ing').css({
                                background:'url('+url+') no-repeat',
                                backgroundSize:'35px'
                            })
                        }
                    }
                    ticket = "e40e7004-4c8a-4963-8564-31271a8337d8";
                    passport.init({
                        ticket: ticket,
                        drawUserInfo: function() {
                            $(".top_loginbtn").hide();
                            $('.top_phone').show();
                            $('.top_phone ul').hide();
                            $(".top_phone_title").html('<span>' + passport.cookie.loginName + '</span>');
                            getuserimg();
                        },
                        login:function(){
                            window.location.replace(document.URL);
                        },
                        logout: function() {
                            $(".top_loginbtn").show();
                            $(".top_phone").hide();
                            window.location.replace(document.URL);
                        }
                    })
                    $('body').delegate('.login', 'click', function() {
                        passport.show();
                    }).delegate('.logout', 'click', function() {
                        passport.doLogout();
                    }).delegate('.regist', 'click', function() {
                        passport.hide();
                        regist.init(ticket);
                    }).delegate('.forgetPwd', 'click', function() {
                        passport.hide();
                        recover.init(ticket);
                    }).delegate('.gotomycenter','click',function(){
                        location.href = "//i.lenovo.com.cn/info/center.jhtml?sts=e40e7004-4c8a-4963-8564-31271a8337d8";
                    })
                   }
                   break;  
                case "think":
                    ticket = "bd123acd-42c5-4747-a6d6-09874ecaae6a";
                    var drawUserInfo = function () {
                        $(".ellipsis").html(passport.cookie.loginName);
                        $(".think_login").hide();
                        $(".think_register").show();
                    };
                    if (window.passport && passport.isLogin()) {
                        drawUserInfo();
                    }
                    passport.init({
                        ticket: ticket,
                        drawUserInfo: drawUserInfo,
                        logout: function () {
                            $(".think_login").show(),
                                $(".think_register").hide()
                        }
                    });
                    $('body').delegate('.login', 'click', function () {
                        passport.show();
                    }).delegate('.logout', 'click', function () {
                        passport.doLogout();
                    })
                    var reg = $('.regist');
                    reg.attr('href', reg.attr('href') + window.location.href);
                    break;
                    case "lecoo":
                    ticket="e87576d9-9040-4849-ba1d-290415ce599b";
                    var drawUserInfo=function(){
                        $('.login_btn').hide();
                        $('.loginout_btn').show();
                    };
                    if (window.passport && passport.isLogin()) {
                        drawUserInfo();
                    };
                    passport.init({
                        ticket: ticket,
                        drawUserInfo: drawUserInfo,
                        logout: function () {
                            $('.loginout_btn').hide();
                            $('.login_btn').show();
                        }
                    });
                    $('body').delegate('.login', 'click', function () {
                        passport.show();
                    }).delegate('.regist', 'click', function () {
                        passport.show();
                    }).delegate('.logout', 'click', function () {
                        passport.doLogout();
                    })
                    break;     
            }
         
        } catch (e) {
            console && console.log('login is fail' + e.message);
        }
    },
    hasheader: function () {
        var type = $('div[header]');
        if (type.length > 0)
            this.poplogin(type.attr('header'));
    },
    /**
     * 页面中是否有gcode查商品价格
     */
    hasgcode: function () {
        var arr = [], codeObject = {};
        var _index =0;
        $('[gcode]').each(function (index, ele) {
            var _t = $(ele);
            var index = index.toString();
            var gcode = _t.attr('gcode').toString();
            if(!/^(undefined|\s*|null)$/gi.test(gcode) && gcode!="")
            {
                arr.push(gcode);
                codeObject[gcode + (_index.toString())] = _t;
                _index++;
            }
        });
        if (arr.length > 0) {
            this.getprice(arr, codeObject);
        }
        //门店带参数
        if (window.location.href.indexOf("?")>-1) {
            $("a").each(function () {
                if ($(this).attr("href")) {
                    if ($(this).attr("href").indexOf("nav.gotoMiniPro") > 0) {
                        var str = $(this).attr("href").substring($(this).attr("href").indexOf("https"), $(this).attr("href").indexOf("')"));
                        $(this).attr("href", "javascript:nav.gotoMiniPro('" + str + "?" + window.location.href.split('?')[1] + "')")
                    } else if ($(this).attr("href").indexOf(".html") > 0 && $(this).attr("href").indexOf("?") == -1) {
                        var str = window.location.href.substring(window.location.href.indexOf("?"),window.location.href.length);
                        $(this).attr("href", $(this).attr("href")+str)
                    }
                }

            })
        }
       
        
    },
    /**
     * 是否有倒记时
     */
    hasfinishedtime: function () {
        var href =location.href,cachetimeurl=""; 
        if (window.finishedTime) {
                 cachetimeurl = href.indexOf('lenovouat')!=-1?
                 "//papi.lenovouat.com":"//papi.lenovo.com.cn"; 
            var _that = this;
            $.ajax({
                url: cachetimeurl+'/cache/time',
                dataType: 'jsonp',
                async:"false",
                jsonp:"callback",
                success: function (data) {
                    if (data.curTime) {
                        window.curTime = data.curTime * 1000;
                        finishedTime = new Date(finishedTime).getTime();
                        _that.countTimer(curTime, finishedTime);
                    }
                },
                error: function () { }
            });
        }
    },
    /**
     * 获取价格
     * arr page contain gcode
     * codeObject 
     */
    getprice: function (arr, codeObject) {
        var host = window.location.host, url, stockurl;
        var plat = window.location.search.substr(1);
        if ((plat.indexOf('terminal') != -1) && (host.indexOf('admin') != -1)) {
           //cms platform invoke 
            if (plat !== undefined) {
                var index = plat.indexOf('terminal=');
                plat = plat.substring(index + 9);
            }
            if (host.indexOf('lenovouat') != -1) {
                url = (host.indexOf("activity.lenovovip")!= -1)?
                "//papi.vip.lenovouat.com/open/goods/detail/mget"
                : "//open.lenovouat.com/goods/detail/mget";      
                stockurl = (plat == 1)?"//shop.lenovouat.com/stock/getStockInfo.jhtm"
                 : (plat == 2)?"//m.lenovouat.com/stock/getStockInfo.jhtm":"";
            } else {
                url = (host.indexOf("activity.lenovovip")!= -1)?
                "//papi.lenovovip.com.cn/open/goods/detail/mget?isDetail=false"
                : "//open.lenovo.com.cn/goods/detail/mget?isDetail=false";      
                stockurl = (plat == 1)?"//www.lenovo.com.cn/stock/getStockInfo.jhtm"
                 : (plat == 2)?"//m.lenovo.com.cn/stock/getStockInfo.jhtm":"";
            }
        } else {//prd env invoke
            if (host.indexOf('lenovouat') != -1) {
                url = (host.indexOf("activity.vip.lenovouat")!= -1)?
                "//papi.vip.lenovouat.com/open/goods/detail/mget"
                : "//open.lenovouat.com/goods/detail/mget"; 
                stockurl  = (host.indexOf('m.lenovouat') != -1)?    
                     "//m.lenovouat.com/stock/getStockInfo.jhtm"
                    :"//shop.lenovouat.com/stock/getStockInfo.jhtm";
            } else {
                url = (host.indexOf("activity.lenovovip")!= -1)? 
                    "//papi.lenovovip.com.cn/open/goods/detail/mget?isDetail=false"
                    :"//open.lenovo.com.cn/goods/detail/mget?isDetail=false";
                stockurl = ((host.indexOf('mactivity.lenovo') != -1) ||(host.indexOf('m.lenovo.com.cn')!=-1))
                    ? "//m.lenovo.com.cn/stock/getStockInfo.jhtm"
                    : "//www.lenovo.com.cn/stock/getStockInfo.jhtm";
            }
        }
        try {
            $.ajax({
                type: "get",
                async: false,
                url: url,
                data: {
                    code: arr.join(',')
                },
                dataType: "jsonp",
                jsonp: "jsonpCallback",
                success: function (json) {
                    if (json.status == 0) {//成功
                        var data = json.result;
                        for (var i = 0; i < arr.length; i++) {
                            for (var gcode in data) {
                                if (arr[i] == gcode) {
                                    var target = codeObject[gcode + i];
                                    try {
                                        if ((host.indexOf('mactivity') != -1) || plat == 2 || (host.indexOf('wap.lecoo') != -1))
                                            if(data[gcode].price.Purchase && host.indexOf("vip")!= -1){
                                                if( (data[gcode].price.P_C.C_2.P_0.DV.V-data[gcode].price.Purchase)<0 ||(data[gcode].price.P_C.C_2.P_0.DV.V-data[gcode].price.Purchase)==0){
                                                    target.html("暂无报价");
                                                }else{
                                                    target.html(data[gcode].price.P_C.C_2.P_0.DV.V-data[gcode].price.Purchase);
                                                }
                                           
                                         }else{
                                            if(data[gcode].price.P_C.C_2.P_0.DV.V<0 ||data[gcode].price.P_C.C_2.P_0.DV.V==0){
                                                target.html("暂无报价");   
                                            }else{
                                                target.html(data[gcode].price.P_C.C_2.P_0.DV.V);
                                            }   
                                           
                                            }
                                        else if ((host.indexOf('lenovo') != -1) || plat == 1 || (host.indexOf('activity.lecoo') != -1))
                                            if(data[gcode].price.Purchase && host.indexOf("vip")!= -1){
                                                if( (data[gcode].price.P_C.C_1.P_0.DV.V-data[gcode].price.Purchase)<0 ||(data[gcode].price.P_C.C_1.P_0.DV.V-data[gcode].price.Purchase)==0){
                                                    target.html("暂无报价");
                                                }else{
                                                    target.html(data[gcode].price.P_C.C_1.P_0.DV.V-data[gcode].price.Purchase);
                                                }
                                            }else{
                                                if(data[gcode].price.P_C.C_1.P_0.DV.V<0 ||data[gcode].price.P_C.C_1.P_0.DV.V==0){
                                                    target.html("暂无报价");   
                                                }else{
                                                    target.html(data[gcode].price.P_C.C_1.P_0.DV.V);
                                                }   
                                            }
                                           
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
            var stockCode = [];
            for (var i = 0; i < arr.length; i++) {
                var code = arr[i];
                stockCode.push({ activityType: 0, productCode: code });
            }
            $.ajax({//调用库存接口
                type: "POST",
                url: stockurl,
                data: { "proInfos": JSON.stringify(stockCode).replace(/["""]/g, "") },
                success: function (data) {
                    if ($.isArray(data) && data.length > 0) {//成功
                        for (var i = 0; i < arr.length; i++) {
                            for (var j = 0; j < data.length; j++) {
                                if (arr[i] == data[j].productCode) {
                                    if ((parseInt(data[j].salesNumber)) < 0) {
                                        var target = codeObject[arr[i]];
                                        var storeempty = $('[storeempty="' + arr[i] + '"]');
                                        storeempty.show();//售罄图标
                                        break;
                                    }
                                }
                            }
                        }
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        } catch (e) { }
    },
    /**
     * 倒记时
     * immediatelyAppointment  组件中立即预约按钮class
     * immediatelyBuy  组件中立即购买按钮class
     */
    countTimer: function () {
        try {
            var finishedTimer = finishedTime;
            var leftTime = finishedTimer - curTime;
            var d, h, m, s;
            if (leftTime >= 0) {
                curTime += 1000;
                d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                m = Math.floor(leftTime / 1000 / 60 % 60);
                s = Math.floor(leftTime / 1000 % 60);
                // console.log(d + "天" + h + "时" + m + "分" + s + "秒");
                setTimeout(lenovo_cms_common.countTimer, 1000);
            } else {
                $(".immediatelyAppointment").hide();
                $(".immediatelyBuy").show();
            }
        } catch (e) {
            console.log('method countTime is fail => ' + e.message);
        }
    },
    /**
     * 获取优惠券
     * couponId  优惠券id  business support lenovo_cms_common.getCoupon('asdfsdf1232');
     */
    getCoupon: function (couponId) {
        function getMd5Code() {
            var str = ')(*&^%$#@!MNBVCX76543';
            var salesCouponId = couponId;
            var shopId = '1';
            var lenovoId = passport.cookie.lenovoId;
            var memberCode = passport.cookie.loginName;
            var _str = lenovoId + memberCode + salesCouponId + str;
            return $.md5(_str);
        }
        var damoURl=""
        if(window.location.href.indexOf('lenovouat')!=-1){
            damoURl='https://buy.lenovouat.com'
        }
        else{
            damoURl='https://buy.lenovo.com.cn'
        }
        if (!passport.isLogin()) {
            if(window.location.href.indexOf('admin.lenovo')!=-1){
                if(window.location.search.split('&')[1].indexOf('terminal')!=-1&&window.location.search.split('&')[1].split('=')[1]==2){
                    var loginUrl = "https://reg.lenovo.com.cn/auth/v1/login?ticket=b044d754-bda2-4f56-9fea-dcf3aecfe782&iswap=0&ru=";
                    window.location.href = loginUrl + window.location.href;    
                }else if(window.location.search.split('&')[1].indexOf('terminal')!=-1&&window.location.search.split('&')[1].split('=')[1]==1){
                    passport.show();   
                }
            }else if(window.location.href.indexOf('mactivity.lenovo')!=-1){
                var loginUrl = "https://reg.lenovo.com.cn/auth/v1/login?ticket=b044d754-bda2-4f56-9fea-dcf3aecfe782&iswap=0&ru=";
                 window.location.href = loginUrl + window.location.href;
             }else{
                 passport.show();
             }
        }  else {
            try {
                var lenovoid = passport.cookie.lenovoId;
                if (couponId) {
                    $.ajax({
                        dataType: "jsonp",
                        jsonp:"callbackparam",
                        url: ""+damoURl+"/coupons/bindCouponsForOnce.jhtm?shopId=1&lenovoId=" + lenovoid + "&memberCode=" + passport.cookie.loginName + "&couponId=" + couponId + "&sign=" + getMd5Code(),
                        success: function (db) {
                            if (db.success||db.code=="00") {
                                alert("领取成功");
                            } else {
                                if(db.msg!==undefined)
                                    alert(db.msg||"领取失败");
                            }
                        },
                        error: function (db) {
                            if(db.msg!==undefined)
                                alert(db.msg||"系统繁忙请重试");
                        }
                    });
                }
            } catch (e) { }
        }
    },
    $pd:{'curCode':0},
    /**
     * 立即预约函数 按钮上 lenovo_cms_common.makeAppointment('1000243')
     * @param {*} code 商品code 
     */
    makeAppointment:function (code){
        if(!code){
            alert("系统繁忙，请稍后再试！");
            return;
        }
        var $pd =lenovo_cms_common.$pd;
         $pd['curCode']= code;
        var cartDoman,pDoman,plat;
        var isLenovoAPP = /lenovomallapp/i.test(navigator.userAgent);
        var isLenovoOfficialApp = /lenovoofficialapp/i.test(navigator.userAgent);
        var isApp = isLenovoAPP || isLenovoOfficialApp;
        if(document.domain.indexOf('mactivity')==-1){
            plat= 2
        }else {
            plat = 1;
        }
        if(isApp){
            plat = 3;
        }
        if(document.domain.indexOf('lenovouat') == -1){
            loginUrl = "https://reg.lenovo.com.cn/auth/v1/login?ticket=b044d754-bda2-4f56-9fea-dcf3aecfe782&iswap=0&ru=";
            cartDoman = "//buy.lenovo.com.cn/";
            pDoman = "//promotion.lenovo.com.cn/api/getSeckillActivityReservationUserNum.jhtm";
        }else{
            loginUrl = "//reg.lenovouat.com/auth/v1/login?ticket=b044d754-bda2-4f56-9fea-dcf3aecfe782&iswap=0&ru=";
            cartDoman = "//buy1.lenovouat.com/";
            pDoman = "//promotion.lenovouat.com/api/getSeckillActivityReservationUserNum.jhtm";
        }   
        if(!$pd[code]){
            $pd[code] = {'isyybtnClick':false};
        }
        if (window.passport && window.passport.isLogin()) {
            if($pd[code] && $pd[code].isyybtnClick){
                return;
            }
            jsonpShangouYuyue2(//进行预约
                function (data) {
                    $pd[code].isyybtnClick = !($pd[code].isyybtnClick);
                    if (data.rc == "0" ) {
                        $pd[code].reservationId = data.reservationId;// 获取预约id
                        $('#fix_mask, #window_shangouyy').fadeIn(500);
                        try {
                            var phoneNum = $("div.epp_layer_success");
                            phoneNum.each(function(i,ele){
                                if(!$(this).is(":hidden")){
                                    loginname  = passport.cookie.loginName;
                                    var reg = /^1(3|4|5|7|8|9)[0-9]{9}$/g;
                                    $(this).find('p').eq(0).empty();
                                    if (reg.test(loginname)){
                                        $(this).find('input').eq(0).val(loginname);
                                        $(this).find('p').eq(0).text('请确认/校正此手机号，用于接收活动开始提醒')
                                    }else{
                                        $(this).find('p').eq(0).text('请输入手机号，用于接收活动开始提醒')
                                    }
                                }   
                        }); 
                        } catch (error) {
                            
                        }
                    }else{
                        alert(data.msg || '系统正忙, 请稍后再试!');
                    }
                },function(){
                    $pd[code].isyybtnClick = !($pd[code].isyybtnClick);
                    alert('系统正忙, 请稍后再试!');
                });

        } else {
                if(document.domain.indexOf('m.lenovo')==-1 || window.location.href.indexOf('mactivity.lenovo')!=-1){
                    window.passport.show();
                    passport.loginRedirect = window.location.href;
                }else{
                    if(confirm("需要登录才能预约，您是否需要登录？")){
                        window.location.href = loginUrl + window.location.href;
                    }
                }
        }
        function jsonpShangouYuyue2(success,error){//进行预约
            var code = $pd.curCode || 0;
            $pd[code].isyybtnClick = !($pd[code].isyybtnClick);
            $.ajax({
                type: "GET",
                url: cartDoman + "addReservation.jhtml",
                data: {
                    plat: plat,
                    gcode: code
                },
                dataType: "jsonp",
                jsonp: "callbackparam",
                success: success,
                error: function () {
                    if(error && typeof error == 'function'){
                        error();
                    }
                },
                timeout:5000
            });
        };
    },
    /**
     * 预约保存手机号
     */
    saveBookTel2:function (code){
        var cartDoman,pDoman,plat;
        if(document.domain.indexOf('lenovouat') == -1){
            loginUrl = "https://reg.lenovo.com.cn/auth/v1/login?ticket=b044d754-bda2-4f56-9fea-dcf3aecfe782&iswap=0&ru=";
            cartDoman = "//buy.lenovo.com.cn/";
            pDoman = "//promotion.lenovo.com.cn/api/getSeckillActivityReservationUserNum.jhtm";
        }else{
            loginUrl = "//reg.lenovouat.com/auth/v1/login?ticket=b044d754-bda2-4f56-9fea-dcf3aecfe782&iswap=0&ru=";
            cartDoman = "//buy1.lenovouat.com/";
            pDoman = "//promotion.lenovouat.com/api/getSeckillActivityReservationUserNum.jhtm";
        } 
        function jsonpSaveBookShangouTel2(data,success,error){//保存预约手机号
            $.ajax({
                type: "GET",
                url: cartDoman + "updateBookPhone.jhtml?ss=" + new Date().getMilliseconds() + "&plat="+plat,
                data: data,
                dataType: "jsonp",
                jsonp: "callbackparam",
                success: success,
                error: function () {
                    if(error && typeof error == 'function'){
                        error();
                    }
                }
            });
        }
        //var phoneNum = $("#wsgyy_tel").val();
        var phoneNum = $("div.epp_layer_success");//.val();
        phoneNum.each(function(i,ele){
                if(!$(this).is(":hidden"))
                    phoneNum = $(this).find('input').eq(0).val();
        });
        var reg = /^1(3|4|5|7|8|9)[0-9]{9}$/g;
        var reservId = lenovo_cms_common.$pd[code].reservationId || '';
        if(!reservId){
            alert('保存失败，请稍后再试!');
            $("#wsgyy_close").trigger('click');
            return;
        }
        if (reg.test(phoneNum)) {
            jsonpSaveBookShangouTel2({
                reservationId: reservId,
                phone: phoneNum
            }, function (data) {
                if (data.rc == 0) {
                    alert('恭喜您预约成功');
                    $('#fix_mask, #window_shangouyy').fadeOut(500);
                    $("#wsgyy_close").trigger('click');
                }else{
                    alert('保存失败，请稍后再试!');
                    $("#wsgyy_close").trigger('click');
                }
            });
        }
        else{
            alert('请输入正确的手机号');
        }
    },
    //修饰埋点信息
    latagFix:function(){
        $("a").each(function(){
            if($(this).attr('latag')){
              var str= $(this).attr("latag");
              str=str.replace(/\__/g,'_');
             if(str.indexOf("javascript:")!=-1){
                 str=str.replace(/\javascript:/g,'');
             }
              $(this).attr("latag",str);
            }
          })
    },
    la_google:function(){
        //谷歌监控
   
            try{
                var ga_ismo="Lenovo_activity_PC";
                if(window.location.href.indexOf('mactivity') != -1){
                    ga_ismo="Lenovo_activity_MO"
                }
                if (window.ga === undefined) {
                    lenovo_cms_common.cms_head.appendChild(lenovo_cms_common.cms_script);
                }
                if(window.location.href.indexOf('activity.lenovo') != -1 ){  
                $(document).delegate("a","click",function(){
                    var productName="";
                    var productId="";
                    var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                    var productPosition="";
                    var product="";
                    var a= $(this).attr('latag').split("_")
                    for(var i =0;i<a.length;i++){
                        if(/[\u4e00-\u9fa5]/g.test(a[i])){
                          productName=a[i];
                        }
                        if( /^[0-9&-]{4,6}$/g.test(a[i])){
                          productId=a[i]
                        }
                        if( /^[0-9&-]{1}$/g.test(a[i])){
                           
                          productPosition=a[i]
                        }
                        if(!reg.test(a[i])){
                            product=a[i];
                        }
                    }
                    if( product==""){
                        ga('ec:addProduct',{
                            'id': productId,
                            'name': productName,
                            'category': ga_ismo,
                            'brand': "",
                            'list' :"Lenovo_activity"+$(document).attr("title"),
                            'variant': "",
                            'position': $(this).attr("productPosition"),
                        });
                        ga('ec:setAction','click', {"list": ga_ismo+$(document).attr("title")});
                    }
                    try{
                        ga('send', 'event',ga_ismo,"Lenovo_activity_"+$(document).attr("title")+"_"+  $(this).attr("productPosition"), $(this).attr("href"));
                    }catch(e){}
                    try{
                        var ua = window.navigator.userAgent;
                        var reg1=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                        var reg2=/(www)\.[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                        var reg3=/\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
                       var TencentMini = "miniProgram";//小程序
                        if(ua.indexOf(TencentMini)!=-1){//小程序嵌入活动中的地址中转到小程序的相关页面
                                var tag = $(this),href = tag.attr("href");
                                if(reg1.test(href)||reg1.test(href)||reg1.test(href)){
                                    if(/(item\.lenovo|mitem\.lenovo|tk\.lenovo)/gi.test(href)&&href.indexOf("product")!=-1){
                                        //详情页
                                        var gcode = href.split('.html');
                                        if(gcode&&gcode.length>0){
                                            var id = gcode[0].substr(gcode[0].indexOf("/product/")+9);
                                            if(/^[0-9]+$/.test(id)){
                                               if(!wx){
                                                    $.getScript("https://res.wx.qq.com/open/js/jweixin-1.3.2.js",function(){
                                                        wx.miniProgram.navigateTo({url:'/pages/detail/detail?id='+id});
                                                    });
                                               }else{
                                                wx.miniProgram.navigateTo({url:'/pages/detail/detail?id='+id});
                                               }
                                                event.preventDefault();
                                                return false;
                                            }
                                        }
                                    }else if(/(item\.lecoo|mitem\.lecoo)/gi.test(href)&&href.indexOf("pd")!=-1){
                                            //详情页
                                            var gcode = href.split('.html');
                                            if(gcode&&gcode.length>0){
                                                var id = gcode[0].substr(gcode[0].indexOf("/pd/")+4);
                                                if(/^[0-9]+$/.test(id)){
                                                    if(!wx){
                                                        $.getScript("https://res.wx.qq.com/open/js/jweixin-1.3.2.js",function(){
                                                            wx.miniProgram.navigateTo({url:'/pages/detail/detail?id='+id});
                                                        });
                                                    }else{
                                                        wx.miniProgram.navigateTo({url:'/pages/detail/detail?id='+id});
                                                    }
                                                    event.preventDefault();
                                                    return false;
                                                }
                                    }
                                }else if(/(mactivity\.lenovo|activity\.lenovo)/gi.test(href)){//活动页地址
                                        ;
                                    }else if(href.indexOf("")!=-1){//usercenter
                                            ;
                                    }else if(href.indexOf("")!=-1){//shoppingcart
                                        ;
                                    }else{
                                        ;
                                    }
                                }
                        }
                    }catch(e){

                    }
                });
                } else if (window.location.href.indexOf("thinkpad.lenovo") != -1) {//think活动页监控
                    var indexp = 0;
                    if($(".hot_pro").length>0){
                        $(".hot_pro").each(function(index,e){
                            $(e).find("a").each(function(index2,e2){
                                if($(e2).find(".price").attr("gcode")){
                                    // ga('ec:addImpression', {
                                    //     'id': $(e2).find(".price").attr("gcode"),
                                    //     'name': $(e2).find(".pd_name_big").text(),
                                    //     'category': "thinkpad",
                                    //     'brand': $(e2).parents(".hot_pro").find(".pro_title").text(),
                                    //     'list': $(e2).find(".pd-text").text(),
                                    //     'variant': indexp++,
                                    //     'position': $(e2).attr("productposition")
                                    // });
                                    // ga('send', 'event', "ThinkPad_PC", $(e2).parents(".hot_pro").find(".pro_title").text(), $(e2).attr("href"), { nonInteraction: true });
                                    $(e2).on("click", function () {
                                        ga('ec:addProduct', {
                                            'id': $(e2).find(".price").attr("gcode"),
                                            'name': $(e2).find(".pd_name_big").text(),
                                            'category': "thinkpad",
                                            'brand': $(e2).parents(".hot_pro").find(".pro_title").text(),
                                            'list': $(e2).find(".pd-text").text(),
                                            'variant': indexp++,
                                            'position': $(e2).attr("productposition")
                                        });
                                        ga('ec:setAction', 'click', { list: $(e2).parents(".hot_pro").find(".pro_title").text() });
                                        ga('send', 'event', "ThinkPad_PC", $(e2).parents(".hot_pro").find(".pro_title").text(), $(e2).attr("href"), { nonInteraction: true });
        
                                    })
                                }else{
                                    $(e2).on("click", function () {
                                    ga('send', 'event', "ThinkPad_PC", $(e2).parents(".hot_pro").find(".pro_title").text(), $(e2).attr("href"), { nonInteraction: true });
                                })
                                }
                            })
                        })
                    }
                    if ($("#think_header").length > 0) {
                        $(".btnLeft").on("click", function () {
                            ga('send', 'event', "ThinkPad_PC", "ThinkPad_banner", "btnLeft");
                        })
                        $(".btnRight").on("click", function () {
                            ga('send', 'event', "ThinkPad_PC", "ThinkPad_banner", "btnRight");
                        })
                        $("#think_header").find("a").each(function (i, ele) {
                            $(ele).on("click", function () {
                                ga('send', 'event', "ThinkPad_PC", "ThinkPad_think_nav_" + $(this).text(), $(this).attr("href"))
                            });
                        });
                    }
                    if ($(".top-nav-container-ul").length > 0) {
                        $(".top-nav-container-ul").find("a").each(function (i, ele) {
                            $(ele).on("click", function () {
                                ga('send', 'event', "ThinkPad_PC", "ThinkPad_top_nav_" + $(this).find("p").text(), $(this).attr("href"));
                            });
                        });
                    }
                    if ($("#T_service").length > 0) {
                        $("#T_service").find("a").each(function (i, ele) {
                            $(ele).on("click", function () {
                                ga('send', 'event', "ThinkPad_PC", "ThinkPad_footernav_" + $(this).text(), $(this).attr("href"));
                            });
                        });
                    }
                    if ($(".thikpadcontainer").length > 0) {
                        $(".thikpadcontainer").find("a").on("click", function () {
                            ga('send', 'event', "Think_PC", "Think_index_menu_" + $(this).find("p").text(), $(this).attr("href"));
                        })

                    }
                    if ($(".cms_think_channel_banner_component").length > 0) {
                        $("#T_service").find("a").each(function (i, ele) {
                            $(ele).on("click", function () {
                                ga('ec:addPromo', {
                                    'id': $(this).attr('href'),
                                    'name': "ThinkPad_banner",
                                    'creative': $(this).find("div").attr("background"),
                                    'position': "ThinkPad_banner_" + index + 1
                                });
                                ga('ec:setAction', 'promo_click');
                                ga('send', 'event', "ThinkPad_PC", "ThinkPad_banner_" + index + 1, { nonInteraction: true });
                            });
                        });
                        $("#dot_ul").find("li").each(function (i, ele) {
                            $(ele).on("click", function () {
                                ga('send', 'event', "ThinkPad_banner_" + $("this").attr("num") + 1, $("this").attr("num"));
                            });
                        });
                       
                        if ($("#xiaoxin_div")) {
                            var bannerp = 0;
                            $("#xiaoxin_div").find("a").each(function () {
                                $(this).attr("bannerp", bannerp++)
                                ga('ec:addPromo', {
                                    'id': $(this).attr("href"),
                                    'name': "ThinkPad_banner",
                                    'creative': $(this).attr("href"),
                                    'position': "ThinkPad_banner_" + $(this).attr("bannerp")
                                });
                                ga('send', 'event', "ThinkPad_banner", "ThinkPad_banner_Impression", { nonInteraction: true });
                                $(this).on("click", function () {
                                    ga('ec:addPromo', {
                                        'id': $(this).attr("href"),
                                        'name': "ThinkPad_banner",
                                        'creative': $(this).attr("href"),
                                        'position': "ThinkPad_banner_" + $(this).attr("bannerp")
                                    });
                                    ga('ec:setAction', 'promo_click');
                                    ga('send', 'event', "ThinkPad_PC", "ThinkPad_banner_" + $(this).attr("bannerp"));
                    
                                })
                            })
                    
                        }
                      
                    }
                    $(".think_car").on("click",function(){
                        ga('send', 'event', "ThinkPad_PC"," ThinkPad_think_nav_购物车", "https://buy.lenovo.com.cn/");
                    })
                    $(".think_logo").on("click",function(){
                        ga('send', 'event', "ThinkPad_PC"," ThinkPad_think_nav_logo", "http://thinkpad.lenovo.com.cn/");
                    });
                    $(".think_navul").find("a").each(function(){
                        ga('send', 'event', "ThinkPad_PC"," ThinkPad_think_nav_"+$(this).text(),$(this).attr("href"));
                    })
                    $(".usepng").on("click",function(){
                        ga('send', 'event', "ThinkPad_PC"," ThinkPad_think_nav_search", "https://item.lenovo.com.cn/product/1002671.html");
                    });
                    $(".think_register").find("a").eq(0).on("click",function(){
                        ga('send', 'event', "ThinkPad_PC"," ThinkPad_think_nav_个人中心", "http://i.lenovo.com.cn/info/center.jhtml?sts=e40e7004-4c8a-4963-8564-31271a8337d8");
                    });
                    $(".think_register").find("a").eq(1).on("click",function(){
                        ga('send', 'event', "ThinkPad_PC"," ThinkPad_think_nav_退出登陆", "");
                    });
                    

                } else if (window.location.href.indexOf('www.lenovo') != -1 ||window.location.href.indexOf('m.lenovo.com.cn') ){
                  $.getScript("https://m1.lefile.cn/lenovo_cms/js/ga/lenovo_ga.js");
                }
                if(window.location.href.indexOf('nzdc') != -1){
                    $.getScript("https://m1.lefile.cn/lenovo_cms/js/ga/latag_nzdc.js");
                }
              }catch(e){
                        }
      
        
    }
    
};
function getAllCoupon(activityType) {
    if(window.location.href.indexOf('uat')!=-1){
        $.getScript("https://m1.lenovouat.com/lenovo_cms/js/gift/getAllCoupon.js?t="+(new Date()).getTime(),function(){
            getAllCouponSrc(activityType);
        });
    }else{
        $.getScript("https://m1.lefile.cn/lenovo_cms/js/gift/getAllCoupon.js?t="+(new Date()).getTime(),function(){
            getAllCouponSrc(activityType);
        });
    }
   
}
//一件领取优惠券大礼包
function getDoubling(activityType) {
    if(window.location.href.indexOf('uat')!=-1){
        $.getScript("https://m1.lenovouat.com/lenovo_cms/js/gift/getDoubling.js?t="+(new Date()).getTime(),function(){
            getDoublingSrc(activityType);
        });
    }else{
        $.getScript("https://m1.lefile.cn/lenovo_cms/js/gift/getDoubling.js?t="+(new Date()).getTime(),function(){
            getDoublingSrc (activityType);
        });
    }
}
//优惠券大转盘
function setGift(getCode) {
    if(window.location.href.indexOf('uat')!=-1){
        $.getScript("https://m1.lenovouat.com/lenovo_cms/js/gift/setGift.js?t="+(new Date()).getTime(),function(){
            setGiftSrc(getCode)
        });
    }else{
        $.getScript("https://m1.lefile.cn/lenovo_cms/js/gift/setGift.js?t="+(new Date()).getTime(),function(){
            setGiftSrc(getCode)
        });
    }
}
//领取优惠码 2018双十二有效
function getCouponMsg(getCode){
    if(window.location.href.indexOf('uat')!=-1){
        $.getScript("https://m1.lenovouat.com/lenovo_cms/js/gift/getcoupon.js?t="+(new Date()).getTime(),function(){
            getCouponCode(getCode)
        });
    }else{
        $.getScript("https://m1.lefile.cn/lenovo_cms/js/gift/getcoupon.js?t="+(new Date()).getTime(),function(){
            getCouponCode(getCode)
        });
    }
  
}

if (!window.lenovo_cms_common) {
    window.lenovo_cms_common = cms_common;
}
else {
    for (var k in cms_common)
        window.lenovo_cms_common[k] = cms_common[k];
}
var didiurl="";
try{
    didiurl = window.location.href;
    didiurl = didiurl.substr(didiurl.lastIndexOf('/')+1);   
}catch(e){ }
$(function () {
    try {
        if(didiurl==='didi.html'){
            $("body").css("cssText","padding-top:0px !important;");
            $('#g-header').hide();
            $('#main-nav').hide();
            $('#download-pop').hide();
        }
        lenovo_cms_common.cms_head = document.getElementsByTagName('head')[0];
        lenovo_cms_common.cms_script = document.createElement('script');
        lenovo_cms_common.cms_script.innerHTML = "try{var ga_userId='';" +
            " if(window.passport&&window.passport.cookie){" +
            "  ga_userId = passport.cookie.lenovoId;" +
            " }" +
            "  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
            "    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
            "    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
            "    })(window,document,'script','https://www.google-analytics.com/analytics.js" +
    
            "','ga');" +
            "   ga('create', 'UA-110299082-1', 'auto', {'userId': ga_userId});" +
            "  ga('require', 'ec'); " +
            "  ga(function(tracker) {   " +
            "    var clientId = tracker.get('clientId');" +
            "    ga('set', 'dimension1', clientId); "+
        "});" +
        "ga('set', 'dimension2', ga_userId); " +
        "ga('set', 'dimension3', ''); " +
        "ga('require', 'linker'); " +
        "ga('linker:autoLink', ['lenovo.com.cn','lenovo.cn','lenovovip.com.cn','lenovo.com']); " +
        "ga('set', 'transport', 'beacon'); " +
        "ga('send', 'pageview');" +
        "}catch(e){" +
        "}";
    } catch (error) { }
    lenovo_cms_common.hasheader();
    lenovo_cms_common.hasgcode();
    lenovo_cms_common.hasfinishedtime();
    lenovo_cms_common.latagFix();
    lenovo_cms_common.la_google();
    $('.wsgyy_ok').on('click', function () {//预约弹窗按钮确定
        var code = lenovo_cms_common.$pd['curCode']|| 0;
        if(!code){
            alert('保存手机号失败！');
            return;
        }
        lenovo_cms_common.saveBookTel2(code);
    });
    $(".wsgyy_close").click(function(){//关闭预约弹窗
        $('#fix_mask, #window_shangouyy').fadeOut(500);
    });
});



