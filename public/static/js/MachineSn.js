

//特别提醒，网站使用js框架不同。验证主机号的，写了两个方法，分别是Jquery，prototype

//Jquery进行ajax验证主机号
function checkMachineSnByJquery(MachineSn) {//参数说明 MachineSn：文本框输入中主机号。
    if (MachineSn.length == 4) {
        var regIdea = /^[0-9a-zA-Z]{4}$/;
        if (regIdea.test(MachineSn)) {
            setCookie("AutoGetProductSn", MachineSn, 1);
        }
    } else if (MachineSn.length == 7) {
        var regIdea = /^[0-9a-zA-Z]{7}$/;
        if (regIdea.test(MachineSn)) {
            setCookie("AutoGetProductSn", MachineSn, 1);
        }
    } else {
        setCookie("AutoGetProductSn", MachineSn, 1); //把值存入cookie.
        //        $.ajax({
        //		    type: "post",
        //		    url: "/lenovo/wsi/CheckMachineSn.aspx",     //ajax回传到CheckMachineSn.aspx，进行验证。如果验证正确，则把值存入cookie
        //		    data: "MachineSn="+MachineSn,
        //		    dataType:"json",
        //		    success: function(AjaxBreak,textStatus){
        //				    if(AjaxBreak.msg)
        //				    {
        //				        //alert(AjaxBreak.message);
        //					    setCookie("AutoGetProductSn",MachineSn,1); //如果验证正确，则把值存入cookie.如果验证错误则不存入cookie
        //				    }
        //    				
        //			    }
        //	    });
    }
}

//用prototype ajax进行主机号验证。
function checkMachineSnByPrototype(MachineSn) {//参数说明 MachineSn：文本框中主机号。
    if (MachineSn.length == 4) {
        var regIdea = /^[0-9a-zA-Z]{4}$/;
        if (regIdea.test(MachineSn)) {
            setCookie("AutoGetProductSn", MachineSn, 1);
        }
    } else if (MachineSn.length == 7) {
        var regIdea = /^[0-9a-zA-Z]{7}$/;
        if (regIdea.test(MachineSn)) {
            setCookie("AutoGetProductSn", MachineSn, 1);
        }
    } else {
        setCookie("AutoGetProductSn", MachineSn, 1);         //把值存入cookie.
        //         new Ajax.Request('/lenovo/wsi/CheckMachineSn.aspx?MachineSn='+MachineSn,{  //ajax回传到CheckMachineSn.aspx，进行验证。如果验证正确，则把值存入cookie
        //                    method:"post",  
        //			        onComplete: function (xmlhttp){
        //			             var strObj = xmlhttp.responseText;
        //			            var str=strObj.indexOf("ok");
        //			            if(str!=-1){
        //                            setCookie("AutoGetProductSn",MachineSn,1);         //如果验证正确，则把值存入cookie.如果验证错误则不存入cookie
        //                        }
        //			        }
        //		});
    }
}


//检测控件是否安装
var snReader = null;
function checkOcxInstall() {  //判断控件是否安装
    try {
        return new ActiveXObject("sn.SNReader");
    } catch (ex) {
        return false;
    }
}

//针对是否安装完控件，进行判断，并显示不同的按钮
//snReader = checkOcxInstall();
//checkValue();

function checkValue(txtId, n) {    //参数txtId为输入主机编号的文本框的ID值,和n为截取几位长度
    snReader = checkOcxInstall();
    if (snReader) {
        setTimeout(function() {
            var sn = snReader.SerialNum;
            if ((sn == null || sn == "" || sn.length == 0) && (getCookie("notfirst") != "yes")) {
                //如果没有安装控件，则跳转到Idea控件安装页面
                //检查浏览器，如果是火狐则提示：推荐使用IE
                if (navigator.userAgent.toLowerCase().indexOf("firefox/3") != -1) {
                    alert('自动获取主机编号软件不支持火狐浏览器，建议使用IE浏览器安装此软件');
                    return;
                }

                //获取当前页面链接地址
                var strurl = parent.document.URL;
                setCookie("strurl", strurl, 1);
                //将连接地址写入cookie
                //setCookie("strurl",strurl,1); 
                //-----其他网站调用此js，则异步调用写页面链接到cookie保存到wsi站----------
                //控件安装完成后，则跳转回原页面
                //---跳转到idea控件安装页面
                window.open("https://support.lenovo.com.cn/lenovo/wsi/support/driver/IdeaSnReader.aspx?strurl=" + strurl, "_top");
                return;
            }
            if (typeof sn != "undefined" && sn.length > 7) {
                try {
                    //如果控件已经安装了，则获取主机编号的值,并截取前七位。
                    //if(sn.length==14)
                    //{
                    //    sn = sn.substring(0,n);
                    //    document.getElementById(txtId).value=sn;
                    //}else if(sn.length==10)
                    //{
                    //    document.getElementById(txtId).value=sn;
                    //}
                    document.getElementById(txtId).value = sn;
                    document.getElementById(txtId).style.color = "#000000";
                    setCookie("AutoGetProductSn", sn, 1);
                } catch (e) {
                    if (confirm("主机编号未能正确识别，推荐您查阅“如何查询主机编号”")) {
                        window.open("https://support.lenovo.com.cn/lenovo/wsi/htmls/Machine_No.html", "new");
                    }
                }
            }
            else {
                //alert('主机编号未能正确识别，请核实您的电脑是否为联想产品');
                if (confirm("主机编号未能正确识别，推荐您查阅“如何查询主机编号”")) {
                    window.open("https://support.lenovo.com.cn/lenovo/wsi/htmls/Machine_No.html", "new");
                }
            }
        }, 1000);
    } else {
        //如果没有安装控件，则跳转到Idea控件安装页面
        //检查浏览器，如果是火狐则提示：推荐使用IE
        if (navigator.userAgent.toLowerCase().indexOf("firefox/3") != -1) {
            alert('自动获取主机编号软件不支持火狐浏览器，建议使用IE浏览器安装此软件');
            return;
        }

        //获取当前页面链接地址
        var strurl = parent.document.URL;
        setCookie("strurl", strurl, 1);
        //将连接地址写入cookie
        //setCookie("strurl",strurl,1); 
        //-----其他网站调用此js，则异步调用写页面链接到cookie保存到wsi站----------
        //控件安装完成后，则跳转回原页面
        //---跳转到idea控件安装页面
        window.open("https://support.lenovo.com.cn/lenovo/wsi/support/driver/IdeaSnReader.aspx?strurl=" + strurl, "_top");
    }
}

//js对cookie的操作。
//存cookie。   
function setCookie(name, value) {
    var argv = setCookie.arguments;
    var argc = setCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if (expires != null) {
        var LargeExpDate = new Date();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires * 1000 * 3600 * 24));
    }
    //document.cookie = name + "=" + escape (value)+((expires == null) ? "" : ("; expires=" +LargeExpDate.toGMTString())); 
    document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + LargeExpDate.toGMTString())) + ("; path=/");
}
//取cookie.
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
    