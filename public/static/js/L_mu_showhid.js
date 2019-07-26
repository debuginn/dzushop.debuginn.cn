var HomeURL = 'https://' + window.location.host;
var passportJS = '<script src="https://m2.lefile.cn/??global/js/jquery-1.8.3.min.js,lenovo_passport/1.4.15/js/pp.rr.min.js"></script>';
document.write(passportJS);
var exeJS = '<script type="text/javascript">AjaxIsLogin();</script>'
document.write(exeJS);
function srcW() {
    srcW = document.body.clientWidth;
    if (srcW > 1100) {
        $("#nav_left").css({ "display": "block" });
        $("#nav_right").css({ "display": "block" });
    }
}
$(function ($) {
    passport.init({
        ticket: "e40e7004-4c8a-4963-8564-31271a8337d8",
        drawUserInfo: function() {
            $(".login-link").show();
        },
        logout: function() {
            $(".unlogin").hide();

        }
    });
    //srcW();
    /*serverMenu*/
    $('#serverMenu li').hover(function () {
        $(this).children('.innerMenu').show();
    }, function () {
        $(this).children('.innerMenu')
        $(this).children('.innerMenu').hide();

    });
    /*	$('#weixin').mouseover(function(){
     $("#weixincode").fadeIn(1000);
     });
     $('#weixin').mouseout(function(){
     $("#weixincode").fadeOut(1000);
     }); */

})

/*20110923*/
function hidAll() {
    $("#L_mu_navDiv > div").hide();
    $(".L_mu_cur").removeClass("L_mu_cur");
}
$(document).ready(function () {
    $('.L_mu_nav>ul>li[use=menu]').hover(function () {
        if ($(this).attr('id') != 'L_mu_ser') {
            $('#L_mu_ser a').css('background', 'none');
        }

    }, function () {
        $('#L_mu_ser a').css('background', '#fff');
    });
    $("#L_mu_person").click(function (e) {
        $("#L_mu_person").addClass("L_mu_cur").siblings().removeClass("L_mu_cur");
        $("#L_mu_m1").show().siblings().hide();
        pshow_hid();
        search_hid();
        $(".sel_t").hide();// $n_716
        $('#L_mu_ser a').css('background', 'none');

    });
    $("#L_mu_grow").click(function (e) {
        $("#L_mu_grow").addClass("L_mu_cur").siblings().removeClass("L_mu_cur");
        $("#L_mu_m2").show().siblings().hide();
        pshow_hid();
        search_hid();
        $(".sel_t").hide();// $n_716
    });
    $("#L_mu_great").click(function (e) {
        $("#L_mu_great").addClass("L_mu_cur").siblings().removeClass("L_mu_cur");
        $("#L_mu_m3").show().siblings().hide();

        pshow_hid();
        search_hid();
        $(".sel_t").hide();// $n_716
    });

    $("#L_mu_ser").click(function (e) {
        $("#L_mu_ser").addClass("L_mu_cur").siblings().removeClass("L_mu_cur");
        $("#L_mu_m4").show().siblings().hide();
        pshow_hid();
        search_hid();
        $(".sel_t").hide();// $n_716
    });

    $("#L_mu_shop").click(function (e) {
        $("#L_mu_shop").addClass("L_mu_cur").siblings().removeClass("L_mu_cur");
        $("#L_mu_m5").show().siblings().hide();
        pshow_hid();
        search_hid();
        $(".sel_t").hide();// $n_716
    });

    $("#L_mu_m4").mouseleave(function () {
        $(this).hide();
        $("#L_mu_ser").removeClass("L_mu_cur");
    });
    $("#L_mu_m5").mouseleave(function () {
        $(this).hide();
        $("#L_mu_shop").removeClass("L_mu_cur");
    });

    //le phone le pad
    var _l = $(".pop_phone > .l > li");
    var _r = $(".pop_phone > .r > li");
    _l.click(function () {
        var _ii = _l.index(this);
        _l.find("ul").hide();
        $(this).find("ul").show();
        _r.eq(_ii).show().siblings().hide();
    });

    $(".head,.news,.ad_area,#nav_left,#nav_right,.L_mu_mb_1,.L_mu_nav_top,#L_mu_mem").mouseover(function (e) {
        hidAll();
        pshow_hid();
        search_hid();
        $(".sel_t").show();// $n_716
    });
    $(".box_b").click(function (e) {
        hidAll();
        pshow_hid();
        search_hid();
    });
});

var userLoginFlag = false;
var url = window.location.href;
var curUrl =encodeURI(url.replace("&","@"));
var curTitle=encodeURI($(document).attr("title"));
var tempdate;
function AjaxIsLogin() {
    if (passport.isLogin()){
        insertFL();
        // console.log('插入了fl这段代码')
    }
    $.ajax({
        type: "get",
        url:"/lenovo/wsi/usercenter/login/IsLogin.aspx",
        beforeSend: function (XMLHttpRequest) {
        },
        success: function (data, textStatus) {
            // console.log(passport.isLogin());
            if (!passport.isLogin()){
                return false;
            }else{


            //这个是验证成功
            tempdate = eval('(' + data + ')');
            if(tempdate.StateSign == 'UnLogin') return false;

            $('.drop-win').addClass('hidden');
            $('.site .headtongxin').css('margin-right', '0px');
            document.getElementById("loginuserinfo").innerHTML = "<span class='my_center'><span class='v_center_arrow'></span><div class='v_center_con'><div class='center_con_icon'></div><ul class='center_ul'><li><a href='javascript:void(0);'>" + tempdate.UserAccount + "</a></li><li><a href=\"" + HomeURL + "usercenternew/userproduct/default.aspx\">我的联想服务</a></li><li><a href='https://think.lenovo.com.cn/LenovoIDUserIndex.aspx'>我的Think服务</a></li><li><a href='http://iknow.lenovo.com/personalCenter.html'>我的知识库</a></li><li><a href='https://videoservice.lenovo.com.cn/PCWeb/videoweb/pages/userInfo.html'>我的微视频</a></li><li><a href='javascript:void(0);' onclick='userlogout()'>退出</a></li></ul></div></span>";
            var userNameCon=$("#loginuserinfo").text();
            if (userNameCon!="") {
                userLoginFlag = true;
            }
            document.getElementById("serviceurl1").innerHTML = "<a target='_blank' href='https://www.lenovo.com.cn/home/serviceindex.html?tag=a111&bigClassID=&ClassID=37255377-542d-420d-a026-7b83c6120a4f&Year=1&Type=Expend&SDIID=" + tempdate.SdiId + "&SourceFlag=Support_Home&CheckCode=Test123'>延保服务</a>";
            document.getElementById("serviceurl2").innerHTML = "<a target='_blank' href='https://www.lenovo.com.cn/product/51640.html?SDIID=" + tempdate.SdiId + "&SourceFlag=Support_Home&CheckCode=Test123'>驱动安装</a>";
            if (document.getElementById("serviceurl3") != null) {
                document.getElementById("serviceurl3").innerHTML = "<a target='_blank' href='https://www.lenovo.com.cn/product/51643.html?SDIID=" + tempdate.SdiId + "&SourceFlag=Support_Home&CheckCode=Test123'>应用指导</a>";
            }
            if (document.getElementById("serviceurl4") != null) {
                document.getElementById("serviceurl4").innerHTML = "<a target='_blank' href='https://www.lenovo.com.cn/product/51639.html?SDIID=" + tempdate.SdiId + "&SourceFlag=Support_Home&CheckCode=Test123'>电脑加速</a>";
            }
            if (document.getElementById("serviceurl5") != null) {
                document.getElementById("serviceurl5").innerHTML = "<a target='_blank' href='https://www.lenovo.com.cn/product/51642.html?SDIID=" + tempdate.SdiId + "&SourceFlag=Support_Home&CheckCode=Test123'>游戏加速</a>";
            }
            if (document.getElementById("serviceurl6") != null) {
                document.getElementById("serviceurl6").innerHTML = "<a target='_blank' href='https://www.lenovo.com.cn/activity/drservice/index.html?source=homepage&position=2_top?SDIID=" + tempdate.SdiId + "&SourceFlag=Support_Home&CheckCode=Test123'>数据恢复</a>";
            }
            if (document.getElementById("serviceurl7") != null) {
                document.getElementById("serviceurl7").innerHTML = "<a target='_blank' href='https://www.lenovo.com.cn/product/51641.html?SDIID=" + tempdate.SdiId + "&SourceFlag=Support_Home&CheckCode=Test123'>专家上门</a>";
            }
            }
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function () {
        }
    });

}
function insertFL(){
    var lenovoid = getCookie('lenovoid_SupportForClick');
    //add谷歌的FL代码
    var fl = '<!-- DoubleClick Floodlight 代码开头：请勿移除 此代码的活动名称：CRM数据打通_Lenovo_ID 将嵌入此代码的目标网页所对应的网址：https://www.lenovo.com 此代码必须置于 <body> 和 </body> 标记之间，且尽可能靠近起始标记。创建日期：01/04/2018-->'+
        '<script type="text/javascript">'+
        'var axel = Math.random() + "";'+
        'var a = axel * 10000000000000;'+
        'document.write(\'<iframe src="https://6895322.fls.doubleclick.net/activityi;src=6895322;type=lenov0;cat=crm_l0;u1='+lenovoid+';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1;num=\' + a + \'?" width="1" height="1" frameborder="0" style="display:none"></iframe>\');'+
        '<\/script>'+
        '<noscript>'+
        '<iframe src="https://6895322.fls.doubleclick.net/activityi;src=6895322;type=lenov0;cat=crm_l0;u1='+lenovoid+';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1;num=1?" width="1" height="1" frameborder="0" style="display:none"></iframe>'+
        '<\/noscript>'+
        '<!-- DoubleClick Floodlight 代码结尾：请勿删除 -->'
    $('body').prepend(fl)
}
function userlogout() {
    passport.doLogout();
    window.location.reload();
}
function AjaxIsMobile() {

}
function pshow_hid() {
    $("#pthink_area").hide();
    $("#pidea_area").hide();
    $(".pop_phone").hide();
    $("#pthink").removeClass("a1");
    $("#pidea").removeClass("a2");
    $("#pphone").removeClass("a2");
}

function search_hid() {
    $("#search_result").hide();
}
function MouseUp() {
    if (event.srcElement.tagName == "A" || (event.srcElement.parentElement.tagName == "A" && event.srcElement.tagName == "B") || event.srcElement.tagName == "IMG") {
        var ToUrl = "";
        var Target = "";
        if (event.srcElement.tagName == "B" || event.srcElement.tagName == "IMG") {
            if (event.srcElement.parentElement.href != "undefined" && event.srcElement.parentElement.href != null) {
                Target = event.srcElement.parentElement.target;
                ToUrl = event.srcElement.parentElement.href;
            }
        } else {
            if (event.srcElement.href != "undefined" && event.srcElement.href != null) {
                Target = event.srcElement.target;
                ToUrl = event.srcElement.href;
            }
        }

        if (ToUrl != "") {
            var nav = navigator.userAgent;
            if (nav.indexOf("Tencent") >= 0) {
                if (Target == "") {
                    location.href = ToUrl;
                } else {
                    window.open(ToUrl);
                }
            }
        }
    }
}
document.onmouseup = MouseUp;


function bluring() {
    if (event.srcElement.tagName == "A" || event.srcElement.tagName == "IMG") {
        document.body.focus();

    }
    return true;
}
document.onfocusin = bluring;



function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e) {

            alert("您的浏览器不支持此操作，请使用Ctrl+D进行添加");
        }
    }
}
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = "url(#default#homepage)"; obj.setHomePage(vrl);
    }
    catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }
            catch (e) {
                alert('此操作被浏览器拒绝！\n请在浏览器地址栏输入about:config并回车\n然后将[signed.applets.codebase_principal_support]设置为true');
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
    }
}

function clickomniture(obj, key_name) {
    var s = s_gi(s_account);
    s.linkTrackVars = 'eVar3,events';
    s.linkTrackEvents = 'event4';
    s.events = 'event4';
    s.eVar3 = key_name;
    s.tl(obj, 'd', key_name);
}

// 解决跨域问题
var myRegexp = /[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/g;
//document.domain = myRegexp.exec(location.host);
document.domain = 'lenovo.com.cn';

var LID = {};
LID.Module = {
    iTitle: function (sTitle) {
        //更新 popup 标题
        $('.jsPopupTitle').text(sTitle);
    },
    iHeight: function (sHeight) {
        //更新 iframe 高度
        $('.jsIframe').css('height', sHeight + 'px');
    },
    iLoginQQ: function (sQuery) {
        //QQ 三方登入
        //测试环境
        window.location.href = 'https://uss.test.lenovomm.cn/wauthen2/gateway?lenovoid.thirdname=qqsns&' + sQuery;
        //产线环境
        //window.location.href= 'https://passport.lenovo.com/wauthen2/gateway?lenovoid.thirdname=qqsns&'+sQuery;
    },
    iLoginSina: function (sQuery) {
        //Sina 三方登入
        //测试环境
        window.location.href = 'https://uss.test.lenovomm.cn/wauthen2/gateway?lenovoid.thirdname=sina&' + sQuery;
        //产线环境
        //window.location.href= 'https://passport.lenovo.com/wauthen2/gateway?lenovoid.thirdname=sina&'+sQuery;
    },
    iLpsust: function (sLpsust) {
        //登入成功取得 token
        //alert(sLpsust);
        //alert("若长时间无法登录，请尝试刷新页面！");
        var backUrl = 'https://' + window.location.host;
        var checkWustUrl = backUrl + '/lenovoid/lenovoidnew.aspx?lenovoid.wust=' + sLpsust + '&lenovoid.action=uilogin&lenovoid.realm='+ backUrl +'&lenovoid.ctx=&lenovoid.lang=null';
        $('<iframe>').appendTo('body').attr('src', checkWustUrl).hide().load(function () {
            AjaxIsLogin();
            window.location.reload();
            setCookie("CloseState", 0, 1);
        });
    },
    iRedirect: function (sUrl) {
        //iframe 调用跳转
        window.location.href = sUrl;
    },
    iLpsustSSO: function (sLpsust) {
        //登入成功取得 token
        $('body').append(sLpsust);
        alert(sLpsust);
    }
}

//写Cookie
function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString())) + ("; path=/");
}
//读Cookie
function getCookie(Name) {
    var search = Name + "="
    if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search)
        if (offset != -1) {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if (end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
        }
        else return ""
    }
    return "";
}

//删cookie，2016-02-23添加
function deleteCookie(name) {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() - (86400 * 1000 * 1));
    setCookie(name, "", expdate);
}


var popWin = {
    showWin: function (width, height, title, src) {
        var inntHtml = '';
        inntHtml += '<iframe class="testiframe jsIframe" frameBorder="0" scrolling = "No" src="' + src + '"></iframe>';
        $("#new_drop_main").empty().append(inntHtml);
    }
};

//登录、注册状态添加判定,2016-02-23
$(function () {
    //setCookie
    function setCookie(name, value) {
        var argv = setCookie.arguments;
        var argc = setCookie.arguments.length;
        var expires = (argc > 2) ? argv[2] : null;
        if (expires != null) {
            var LargeExpDate = new Date();
            LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
        }
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString())) + ("; path=/");
    }
//读Cookie
    function getCookie(Name) {
        var search = Name + "="
        if (document.cookie.length > 0) {
            offset = document.cookie.indexOf(search)
            if (offset != -1) {
                offset += search.length
                end = document.cookie.indexOf(";", offset)
                if (end == -1) end = document.cookie.length
                return unescape(document.cookie.substring(offset, end))
            }
            else return ""
        }
        return "";
    }

    $(".close-popwin").click(function () {
        $('.drop-win').addClass('hidden');
        setCookie("CloseState", 0, 1);
        var setdate = "00:00:00";
        if (getNowFormatDateTime() == setdate) {
            deleteCookie(CloseState);
        }
    });

    //登录弹窗
    function registerAjax() {
        $("#new_drop").show(0);
        $("#new_drop_main").empty(0);
        popWin.showWin("800", "600", "01", "//passport.lenovo.com.cn/wauthen2/wauth/jsp/ilogin.jsp?lenovoid.action=uilogin&lenovoid.realm=support.lenovo.com.cn&lenovoid.iframestate=wechat&lenovoid.cb=https://support.lenovo.com.cn/lenovoid/lenovoid.aspx");
    }
    //用户状态判定
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/lenovo/wsi/usercenter/login/IsLogin.aspx",
        success: function (data, textStatus) {
            //未登录
            if(data.StateSign =='UnLogin'){
                //setCookie
                if (getCookie("CloseState") == "") {
                    function registerAjax() {
                        $(".drop-win").removeClass('hidden');
                        $("#new_drop_main").empty(0);
                        popWin.showWin("800", "600", "01", "//passport.lenovo.com.cn/wauthen2/wauth/jsp/ilogin.jsp?lenovoid.action=uilogin&lenovoid.realm=support.lenovo.com.cn&lenovoid.iframestate=wechat&lenovoid.cb=https://support.lenovo.com.cn/lenovoid/lenovoid.aspx");
                    }

                    registerAjax();
                }
            }else{
                $(".drop-win").addClass('hidden');
            }
            //未登录
            if (data.status == -1) {
                //如果24小时内点过关闭登录框，则显示
                if (getCookie("CloseState") == 1) {
                    registerAjax();
                }
            } else {
                userFlag = true;
            }
        }
    });
});

$(function () {
    $("body").delegate(".my_center","mouseenter", function () {
        if (passport.isLogin()) {
            $(this).children(".v_center_con").stop().slideDown(300);
        }
    });
    $("body").delegate(".my_center","mouseleave", function () {
        $(this).children(".v_center_con").stop().slideUp(300);
    });
    $("body").delegate(".close-popwin","click", function () {
        $('.drop-win').addClass('hidden');
        setCookie("CloseState", 0, 1);
        var setdate = "00:00:00";
        if (getNowFormatDateTime() == setdate) {
            deleteCookie(CloseState);
        }
    });
    // 关闭登录层
});