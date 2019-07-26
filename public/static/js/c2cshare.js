/**
 * Created by shily2 on 2016/11/30.
 */
var c2cshare ={
    s_code:'',
    env:document.domain.indexOf('uat')>-1?'test':'pro',
    setCookie:function(key, value, options) {
        options = $.extend({ path: '/' }, options || {});
        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
        }
        return (document.cookie = [
            encodeURIComponent(key), '=', this.stringifyCookieValue(value, options),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    },
    stringifyCookieValue: function (value, options) {
        return encodeURIComponent(options.json ? JSON.stringify(value) : String(value));
    },
    getRequest: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        }
        return null;
    },
    share:function () {
        var f = false,u = window.location.href;  // lenovo c2c
        if (u.indexOf('sharecode=') != -1) {
            var splits = u.split('&');
            for (var i = 0; i < splits.length; i++) {
                if (splits[i].indexOf('sharecode=') != -1) {
                    this.s_code = splits[i].substr(splits[i].indexOf('sharecode=') + 10);
                    if (this.s_code) {
                        f = true;
                        //获取其他参数
                        var promotionChannels = this.getRequest('promotionChannels') || '';
                        var memberId = this.s_code;
                        var domain = this.env == 'test'? '.lenovouat.cn':'.lenovo.com.cn';
                        this.setCookie(
                            'c2clenovo',
                            '{"promotionName":"优惠券","promotionType":"2","promotionChannels":"'+promotionChannels+'","memberId":"'+memberId+'", "type": "1"}',
                            {"domain": domain, "expires":15}
                        );
                        this.setCookie('wi', '', {"domain": domain, "expires":-1});
                        this.setCookie('cid', '', {"domain": domain, "expires":-1});
                        this.setCookie('target', '', {"domain": domain, "expires":-1});
                        this.setCookie('channel', '', {"domain": domain, "expires":-1});
                        this.setCookie('source', '', {"domain": domain, "expires":-1});
                        try{
                            $.get('/api/c2c/sharedby.do',
                                {
                                    "sharecode": this.s_code,
                                    "sourceurl": u,
                                    "promotionChannels": promotionChannels,
                                    "promotionName": "优惠券",
                                    "promotionType": "2"
                                },
                                function (data) {});
                        }catch(e){
                            pd.log((pd.fail_msg.replace("_me", "share").replace("_sv", "sharedby.do")) + e.message, "warn");
                        }
                    }
                    break;
                }
            }
        }
    }
}

$(function () {
    $("#modelUrl").load("/c2c/new/modelUrl.html");
    c2cshare.share();
})

$(".c2c_share").bind("click", function () {
    if(!passport.isLogin()){
        passport.show();
    }else{
        //弹框显示
        $(".modelUrlModel").addClass("modelShow");
        $(".modelUrlCont").addClass("modelShow");
        modelPretreat();
        //数据展示
        $("#urlInfo1").val('联想官网商城优惠券大放送，购机的朋友看过来！');
        var protocols = document.location.protocol;
        var _shareUrl = c2cshare.env == 'test'? protocols+'//shop.lenovouat.com/mycenter/coupon.html':protocols+'//shop.lenovo.com.cn/mycenter/coupon.html';
        $("#urlInfo2").val(_shareUrl+'?promotiontype=2&sharecode='+passport.cookie.lenovoId);
        //字数
        var len = $("#urlInfo1").val().length,totalLen=80;
        $(".fontNum").html(totalLen-len);
        //图片
        $(".modelUrlCont_imgList").html($("#modelPic").tmpl("http://p3.lefile.cn/product/adminweb/2016/12/05/5aMjgzWBthA0B7SE2y0ZlXFL2-8154.png"));
        //可编辑字数限制
        $("#urlInfo1").bind("propertychange input",function () {
            len = $("#urlInfo1").val().length;
            if(len>totalLen){
                $(".fontNum").html("0");
                $('.modelUrlCont_way_right').addClass('red_ban');
            }else{
                $('.modelUrlCont_way_right').removeClass('red_ban');
                $(".fontNum").html(totalLen-len);
            }
        })
    }
});