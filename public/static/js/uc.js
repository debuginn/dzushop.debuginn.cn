// var url = "http://team5-risk-http.dockerdev.lefile.cn/slidecaptcha/analyze.jsonp";
function worker() {
    var that=this;
    this.triggerDivId="";
    this.error_respcode=501;
    this.initObj = {};
    this.btnCancel="";
    this.init = function (obj) {
        //this.opt = $.extend(this.defaults, obj);
        that.btnCancel=obj.btnCancel?obj.btnCancel:"";
        this.initObj = obj;
        this.initObj.callback = this.slideCallback;
        this.debug = obj.debug;
        this.renderTo = obj.renderTo;
        $(obj.renderTo).myslider(this.initObj);
        that.triggerDivId=this.renderTo;
        that.regEvent();
    };
    this.defaults = {
        success: function () {
        },
        error: function () {
        }
    };
    this.regEvent=function () {
        that.regEventCancel();
    }
    this.regEventCancel=function () {
        if(that.btnCancel!=""){
            $(document).delegate(that.btnCancel,"click",function () {
                $(that.triggerDivId).myslider(that.initObj);
            });
        }
    }
    this.slideCallback = function slideCallback(result,data) {
        if (result) {
            var _this = this;
            if(this.debug != undefined){
                if(this.debug == "success"){
                    $(that.triggerDivId).myslider(that.initObj,"renderSuccess");
                    _this.success({"value": "333", "codeid": "111"});
                }else{
                    $(that.triggerDivId).myslider(that.initObj,"renderError");
                    _this.error({"value": "11", "respcode": "333"})
                }
            }else{
                //采集数据验证
               
                if(document.domain.indexOf('lenovouat') == -1){
                     var url = "https://captcha.lenovo.com.cn/htif/slidecaptcha/analyze.jsonp";
                }else{
                     var url = "https://captcha.lenovouat.com/htif/slidecaptcha/analyze.jsonp";                    
                }
                if(this.url){
                    var url = this.url;
                }
                myDebug("数据采集请求");
                setTimeout(function(){
                    if(typeof _this.isSuccess == "undefined" || _this.isSuccess !=1){
                        _this.error({"respcode": "接口挂了"});
                    }
                },(_this.errorTime || 5000));
                $.ajax({
                    type: "GET",
                    url: url,
                    data: {data:encodeURIComponent(encrypt(data))},
                    dataType: "jsonp",
                    success: function (data) {
                        _this.isSuccess = 1;
                        myDebug("返回信息="+data.result.respcode);
                        if (data.success && data.result.respcode == "0") {
                            $(that.triggerDivId).myslider(that.initObj,"renderSuccess");
                            _this.success({"value": data.result.value, "codeid": data.result.codeid});
                        } else {
                            $(that.triggerDivId).myslider(that.initObj,"renderError");
                            _this.error({"respcode": data.result.respcode});
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        myDebug("ajax挂了");
                        _this.error({"value": "", "respcode": that.error_respcode})
                    }
                });
            }

        }
    };
    this.css = function (obj) {
        Object.assign(that.initObj, obj);
        this.opt = $.extend(this.defaults, that.initObj);
    };

    this.reset = function () {
        $(that.triggerDivId).myslider(that.initObj);
    };

};

//base64 utils
function Base64_2() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };

    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
};


function encrypt(word){
    var key = CryptoJS.enc.Utf8.parse("kfv8eur73jf93nf8");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
}


function decrypt(word){
    var key = CryptoJS.enc.Utf8.parse("kfv8eur73jf93nf8");
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}