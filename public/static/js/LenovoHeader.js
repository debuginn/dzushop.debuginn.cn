var oMeta = document.createElement('meta');
oMeta.name = 'baidu-site-verification';
oMeta.content = 'UX7mqtFriU';
document.getElementsByTagName('head')[0].appendChild(oMeta);
var iconLink = document.createElement("link");
var HomeURL = 'https://' + window.location.host;
var TypeName='';
// 兼容forEach
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(callback, thisArg) {
        var T, k;
        if (this == null) {
            throw new TypeError("this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }
        if (arguments.length > 1) {
            T = thisArg;
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}
iconLink.rel="SHORTCUT ICON";
iconLink.href="https://www.lenovo.com.cn/favicon.ico";
document.getElementsByTagName("head")[0].appendChild(iconLink);
var version = window.navigator.appVersion;
var isIE6 = (version.indexOf("MSIE 6.0") != -1 || version.indexOf("MSIE 5.5") != -1)? true:false;
if(isIE6){
    addEvent("scroll", window, function(){

        document.getElementById("ad_weixin").style.top = getScrollTop() + 300 + "px";
    })
}
function addEvent(evt, elem, callback){
    if(elem.addEventListener){
        elem.addEventListener(evt, callback, false)
    } else {
        elem.attachEvent && elem.attachEvent("on"+evt, callback);
    }
}
function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
}
var hrefLink=window.location.href;
var reHref=encodeURI(hrefLink.replace(/&/g,"@"));
var curTitle=encodeURI($(document).attr("title"));
var	currHref=reHref+'$'+curTitle;
document.write("<div class='head'>")
document.write("</div>")
// zhaonan
var newTop ='<a class="logo_lg" href="//www.lenovo.com.cn" title="Lenovo"><img src="https://support.lenovo.com.cn/lenovo/wsi/templetes/images/s_022.jpg" alt="" width="60"></a>' +
    '<a class="logo_sm" href="//www.lenovo.com.cn" title="Lenovo"><img src="https://support.lenovo.com.cn/lenovo/wsi/templetes/images/s_023.jpg" alt="" height="57" width="61"></a><div class="topbar"><div class="mn-width fix"><ul class="fl ful topbar-links"><li><a class="step1" href="https://www.lenovo.com.cn">联想首页</a></li><li><a class="step1" href="https://shop.lenovo.com.cn">商城</a></li>' +
    '<li><a class="step1" href="https://club.lenovo.com.cn/">社区</a></li><li><a class="step1" href="https://support.lenovo.com.cn/lenovo/wsi/index.html">服务</a></li><li><a class="step1" href="https://news.lenovo.com.cn/news/list.html">资讯</a></li><li><a class="step1" href="https://mall.lenovo.com.cn/">门店</a></li><li class="last_ has-topbarchild">' +
    '<a class="step1" href="">手机版</a><div class="topbarchild-w"><div class="topbarchild topbarchild-app"><a href="https://support.lenovo.com.cn/lenovo/wsi/AppPage/home.html"><img src="https://support.lenovo.com.cn/lenovo/wsi/templetes/images/support_topbar2.jpg"></a></div></div></li></ul>' +
    '</div></div><div id="header1"><div class="fix mn-width"><ul class="fl ful header-links"><li><a id="header-links-link" class="header-links-link" href="https://support.lenovo.com.cn/lenovo/wsi/index.html">联想服务</a></li>' +
    '<li><a class="header-links-link" href="https://think.lenovo.com.cn/">Think服务</a></li><li><a class="header-links-link" href="https://asp.lenovo.com.cn/business_website/dev/login.html">大客户服务</a></li> <li ><a class="header-links-link" href="http://www.lenovocare.com.cn/default.aspx">手机服务</a></li><li><a class="header-links-link" href="http://weixin.lenovo.com.cn/valuation/index.php/index/weixin.html">官方微信</a></li><li class="last_"><a class="header-links-link" href="https://shop.lenovo.com.cn/home/serviceindex.html?pmf_group=fw&pmf_medium=fw&pmf_source=Z00001228T000">服务商城</a></li></ul>' +
    '<div class="site new_site fr fix header-login"><span class="login-link user_icon png" id="loginuserinfo">' +
    '<a href="https://passport.lenovo.com/wauthen2/gateway?lenovoid.action=uilogin&lenovoid.realm=support.lenovo.com.cn&lenovoid.source=support.lenovo.com.cn&lenovoid.thirdname=weixin&lenovoid.qrstate=2&lenovoid.ctx='+currHref+'" class="login_and_register glogin"></a>' +
    '</span></div><div class="fr fix header-search"><a latag="support_navigation bar_search_search"  class="fr header-search-sbt" href="javascript:;" id="btnsearch"></a><input class="fr header-search-ctr-txt" value="请输入主机编号、产品型号" type="text" id="header-search-ctr-txt"><ul class="lenovo-ul"><li class="lenovo" style="font-weight: bold;">Lenovo , Think</li></ul><ul class="sousuo"><li class="cx"></li></ul><a href="javascript:;" class="search-clear" id="search-clear"></a>' +
    '</div></div><div class="drop-win hidden"><div class="login-drop"><div class="close-popwin">x</div>登录联想账号</div><div id="new_drop_main"></div></div></div><div class="cover-all"><div class="contant1"><div class="closed">×</div><p style="padding-top: 70px;">您的卡片已过期，无法进行注册</p><a href="javascript:();" class="close closed">关闭</a></div></div>'
$("body").prepend(newTop);
var timerLogo, $header = $('#header1'), headerPos = $header.offset().top/* + $header.outerHeight()*/;
function filterString(s) {
    s = s.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var rs = ''
    for (var i = 0; i < s.length; i++) {
        rs += s.substr(i, 1).replace(pattern, '')
    }
    return rs
}
$(window).on('scroll',function(){
    clearTimeout(timerLogo);
    timerLogo = setTimeout(function(){
        $('body')[$(window).scrollTop()>=headerPos?'addClass':'removeClass']('fixtop');
    },10);
});
$('.closed').on('click', function() {
    $(this).parent().parent().hide();
});
var c;

$('#header-search-ctr-txt').focus(function () {
    if($(this).val()=='请输入主机编号、产品型号') {
        $(this).val('');
        this.style.color='#fff';
    }
});
$('#header-search-ctr-txt').blur(function () {
    if($(this).val()=='') {
        $(this).val('请输入主机编号、产品型号');
        this.style.color='#C7C7CD';
    }
});
$('.header-search-ctr-txt').on('keyup', function (e) {
    clearTimeout(c);
    c = setTimeout(function() {
        var x = e.keyCode;
        TypeName = $('.header-search-ctr-txt').val();
        if (x == 13) {
            if ($('.header-search-ctr-txt').val() != "" && $('.header-search-ctr-txt').val() != "请输入主机编号、产品型号") {
                goToGuaranteeAndConfiguration(TypeName);
            }else{
                $('.cover-all p').html('请输入主机编号或产品型号进行搜索');
                $('.cover-all').show();
            }
        }
        if (TypeName == '') {
            $('.sousuo').removeClass('block');
            $('.lenovo-ul').removeClass('block');
        }
        $.ajax({
            type: "get",
            url: "/lenovo/wsi/handlers/GetProductInfoBySNType.ashx",
            data: { TypeName: filterString(TypeName) },
            success: function (res) {
                var lenovoNum = '';
                var thinkNum = '';
                var othersNum = '';
                $('.cx').empty();
                if (res == 'null') {
                    $('.sousuo').addClass('hidden');
                    $('.lenovo-ul').addClass('hidden');

                } else {
                    $('.sousuo').removeClass('hidden');
                    $('.lenovo-ul').removeClass('hidden');

                    var msg = JSON.parse(res);
                    var msgLen = msg.length;
                    msg.forEach(function (item) {
                        var newStr = item.name.replace(new RegExp(TypeName, "ig"), function (word) {
                            return '<span style="color: red;">' + word + '</span>'
                        });
                        if (item.PName == '笔记本') {
                            item.PName = '0'
                        } else {
                            item.PName = '1'
                        }
                        if (item.product_line == '119') {
                            lenovoNum += '<a href="https://support.lenovo.com.cn/lenovo/wsi/Modules/DriverByType.aspx?OneCome=&SearchType=1&LogicType='+item.PName+'&MachineId='+item.link_id+'&IsSeachOne=true&IsBackPage=false&ptype=2&typename='+encodeURI(item.name)+'&from=select&ptid='+item.ptid+'" latag="latag_support_navigation bar_search_type" onclick="searchOpen(this)" flen=' + msgLen + ' data="https://support.lenovo.com.cn/lenovo/wsi/Modules/DriverByType.aspx?OneCome=&SearchType=1&LogicType=' + item.PName + '&MachineId=' + item.link_id + '&IsSeachOne=true&IsBackPage=false&ptype=2&typename=' + encodeURI(item.name) + '&from=select&ptid=' + item.ptid + '" data-id="' + item.product_line + '" title="' + item.name + '">' + newStr + '</a>';
                        } else if (item.product_line == '120') {
                            thinkNum += '<a href="https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?OneCome=&yt=pt&categoryid='+item.id+'&CODEName=ThinkStation%20C20&SearchType=0&wherePage=2" latag="latag_support_navigation bar_search_type" onclick="searchOpen(this)" flen=' + msgLen + ' data="https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?OneCome=&yt=pt&categoryid=' + item.id + '&CODEName=ThinkStation%20C20&SearchType=0&wherePage=2" data-id="' + item.product_line + '"  title="' + item.name + '">' + newStr + '</a>';
                        }
                    });
                    $('.sousuo').scrollTop(0);
                    $('.cx').append(lenovoNum);
                    $('.cx').append(thinkNum);
                    $('.cx').append(othersNum);
                    if ($('.cx').children().length == 0) {
                        $('.cx').addClass('hidden');
                    } else {
                        $('.cx').removeClass('hidden');
                    }
                    if (thinkNum != '' && lenovoNum != '') {
                        $('.lenovo').removeClass('hidden');
                        $('.lenovo').html('Lenovo , Think');
                    } else if (thinkNum == '' && lenovoNum != '') {
                        $('.lenovo').removeClass('hidden');
                        $('.lenovo').html('Lenovo');
                    } else if (thinkNum != '' && lenovoNum == '') {
                        $('.lenovo').removeClass('hidden');
                        $('.lenovo').html('Think');
                    } else if (thinkNum == '' && lenovoNum == '') {
                        $('.lenovo').addClass('hidden');
                    };
                    $('.sousuo').addClass('block');
                    $('.lenovo-ul').addClass('block');

                }

            }
        });
    }, 600);
})
$("body").delegate(".chat_link","mouseenter", function () {
    $(this).children(".chat_img").stop().slideDown(300);
});
$("body").delegate(".chat_link","mouseleave", function () {
    $(this).children(".chat_img").stop().slideUp(300);
});

function CheckIsJiXing(jxtxt) {
    var retTF = false;
    $.ajax({
        async: false,
        type: "get",
        url: "/lenovo/wsi/handlers/GetProductInfoBySNTypeTwo.ashx",
        data: { TypeName: filterString(jxtxt) },
        error: function () {
            retTF = false;
        },
        success: function (res) {
            if (res != "") {
                retTF = true;
            } else {
                retTF = false;
            }
        }
    });
    return retTF;
}
function CheckProductSn(mNumber, defaultText) {

    var ret;
    ret = true;
    if (mNumber == defaultText || mNumber == "") {
        $('.cover-all p').html('请输入主机编号、产品型号');
        $('.cover-all').show();
        ret = false;
    }
    return ret;
}

function goToGuaranteeAndConfiguration(clickNum) {

    if(clickNum){
        mNumber = clickNum;
    }else{
        var mNumber = $.trim($("#header-search-ctr-txt").val());
    }
    if (CheckIsJiXing(mNumber)) {
        var aData = "";
        $.ajax({
            async: false,
            type: "get",
            url: "/lenovo/wsi/handlers/GetProductInfoBySNTypeTwo.ashx",
            data: { TypeName: filterString(mNumber) },
            error: function () {
            },
            success: function (res) {
                if (res != "") {
                    var msg = JSON.parse(res);
                    var msgLen = msg.length;

                    msg.forEach(function (item) {
                        if (item.product_line == '119') {
                            aData = 'https://support.lenovo.com.cn/lenovo/wsi/Modules/DriverByType.aspx?OneCome=&SearchType=1&LogicType=' + ((item.PName == "笔记本") ? "0" : "1") + '&MachineId=' + item.link_id + '&IsSeachOne=true&IsBackPage=false&ptype=2&typename=' + encodeURI(item.name) + '&from=select&ptid=' + item.ptid;
                        } else if (item.product_line == '120') {
                            aData = 'https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?OneCome=&yt=pt&categoryid=' + item.id + '&CODEName=ThinkStation%20C20&SearchType=0&wherePage=2';
                        }
                    })
                }
            }
        });
        if (aData != "") {
            $.ajax({
                // async: false,
                type: "get",
                url: "/lenovo/Wsi/handlers/SaveSearchKey.ashx",
                data: { searchkey: filterString(mNumber), searchLen: 1, searchSelect: filterString(mNumber), searchType: "点按钮", searchReturnType: "机型查询结果" },
                success: function (res) { },
                error: function (data) {
                },
                complete: function () {
                }
            });
            window.location.href = aData;
        }
        return;
    }
    if (!CheckProductSn(mNumber, "示例:EB10963046")) {
        return;
    }

    $.ajax({
        type: "get",
        url: "/lenovo/wsi/Modules/Manage/getminfobysn.ashx",
        data: { sn: filterString(mNumber) },
        async: true,
        dataType: 'json',
        success: function (info) {
            if (info.success) {
                $.ajax({
                    async: false,
                    type: "get",
                    url: "/lenovo/Wsi/handlers/SaveSearchKey.ashx",
                    data: { searchkey: filterString(mNumber), searchLen: 1, searchSelect: filterString(mNumber), searchType: "点按钮", searchReturnType: "SN查询结果" },
                    success: function (res) { },
                    error: function (data) {
                        //alert("error: " + data.responseText);
                        //$("#header").html(data.responseText);
                    },
                    complete: function () {
                        //window.location.href = $(a).attr("data");
                    }
                });

                if (info.data.BrandTypeId == "120") {
                    window.location.href = "https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=" + info.data.WebTreeId + "&CODEName=" + info.data.MachineCode + "&SearchNodeCC=" + info.data.MachineCode + "&SearchType=1&wherePage=1";
                }
                else if(info.data.BrandTypeId == "119") {
                    location.href = 'https://support.lenovo.com.cn/lenovo/wsi/usercenter/computersearch/machinesearch.aspx?intcmp=index&id=' + jQuery.trim(mNumber.toUpperCase()) + '&showradio=1&showdriver=no';
                }
            } else {
                $.ajax({
                    type: "get",
                    url: "/lenovo/Wsi/handlers/SaveSearchKey.ashx",
                    data: { searchkey: filterString(mNumber), searchLen: 0, searchSelect: filterString(mNumber), searchType: "点按钮", searchReturnType: "SN查询结果" },
                    success: function (res) { },
                    error: function (data) {
                        //alert("error: " + data.responseText);
                        //$("#header").html(data.responseText);
                    },
                    complete: function () {
                        //window.location.href = $(a).attr("data");
                    }
                });
                $('.cover-all p').html('抱歉，未找到相关信息，请核对后重新输入主机编号或产品型号进行搜索')
                $('.cover-all').show();
            }

        }
    });
}
$('#btnsearch').click(function(){
    if ($("#header-search-ctr-txt").val() != "" && $("#header-search-ctr-txt").val() != "请输入主机编号、产品型号") {
        goToGuaranteeAndConfiguration();
    }else{
        $('.cover-all p').html('请输入主机编号或产品型号进行搜索');
        $('.cover-all').show();
    }
});
$('#auto-get-machineno').click(function(event, install){
    checkValue('searchkey','7');
    document.getElementById('searchkey').focus();
});
//获取当前url地址
var url = window.location.href;
$('.header-search-ctr-txt').focus(function () {
    if($('.header-search-ctr-txt').val()){
        $('.sousuo').addClass('block');
        $('.lenovo-ul').addClass('block');
    }
});
$(document).click(function (e) {
    if (e.target.className == 'sousuo') {
        return false;
    }
    if (e.target.className == 'fr header-search-ctr-txt') {
        return false;
    }
    $('.sousuo').removeClass('block');
    $('.lenovo-ul').removeClass('block');
});
function searchOpen(a) {
    $.ajax({
        async: false,
        type: "get",
        url: "/lenovo/Wsi/handlers/SaveSearchKey.ashx",
        data: { searchkey: filterString(mNumber), searchLen: $(a).attr("flen"), searchSelect: $(a).attr("title"), searchType: "下拉选择", searchReturnType: "机型查询结果" },
        success: function (res) { },
        error: function (data) {
        },
        complete: function () {
            window.location.href = $(a).attr("data");
        }
    });
}