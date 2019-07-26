
//通过ocx抓取主机号，调用前请加载ocx控件
function getpsn() {
    var resultSn = null;
    //debugger;
    try {
        var obj = new ActiveXObject("lnsp.NSPInfo");
        var sn = obj.GetNSPID();
        var type = typeof (sn);
        var str_sn = String(sn);
        //var reg = /\w{5,}/;
        //if (reg.exec(sn)){
        //alert(sn);
        //}
        resultSn = str_sn;
    }
    catch (e) {
        //throw e;
    }
    return resultSn;
}

//是否是ocx抓取主机号,保护方法
function isPsn() {
    var resultSn = null;
    try {
        var obj = new ActiveXObject("lnsp.NSPInfo");
        var sn = obj.GetNSPID();
        var type = typeof (sn);
        var str_sn = String(sn);
        //var reg = /\w{5,}/;
        //if (reg.exec(sn)){
        //alert(sn);
        //}
        resultSn = str_sn;
    }
    catch (e) {
        throw e;
    }
    return resultSn;
}

function setpsn() {
    var obj = new ActiveXObject("lnsp.NSPInfo");
    obj.SetNSPID(document.getElementById("sn").value);
}

//获得Cookie的原始值      
function GetCookie(name) {
    /*
    var arg = name + '=';
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0; 
    while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg) 
    return GetCookieVal(j);
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) 
    break;
    }
       
    return null;
    */

    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}

//获取参数
function getParameter(str) {
    var args = new Object();
    var query = str;
    if (str = null || str == "")
        return args;
    // Get query string
    var pairs = query.split("&");                  // Break at ampersand
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');           // Look for "name=value"
        if (pos == -1) continue;                   // If not found, skip
        var argname = pairs[i].substring(0, pos); // Extract the name
        var value = pairs[i].substring(pos + 1);     // Extract the value
        value = decodeURIComponent(value);         // Decode it, if needed
        args[argname] = value;                     // Store as a property
    }
    return args;                                   // Return the object
}
//从cookie中抓取主机号        
function fetchProductSnFromCookie() {
    var resultPSN = "";
    //通过cookie抓取 
    var strUserInfo = GetCookie("UserInfo");

    if (strUserInfo != null) {
        var resultObj = getParameter(strUserInfo);
        //alert("cookie主机信息:" + resultObj["LastProductSn"]); 
        resultPSN = resultObj["LastProductSn"];
    }
    return resultPSN;
}
//抓取主机号
function fetchProductSn(isReadCookie, isReadOCX) {
    var resultPSN = "";
    //通过cookie抓取
    if (isReadCookie) {
        //alert("cookie抓取" + isReadCookie);
        try {
            resultPSN = fetchProductSnFromCookie();
        }
        catch (e) {
            resultPSN = "";
        }
    }
    //通过ocx抓取
    if (isReadOCX != false) {
        //alert("ocx抓取" + isReadOCX);
        var tempStr = getpsn();
        //alert(tempStr);

        if (tempStr != "" && tempStr != null) {
            resultPSN = tempStr;
        }
    }
    if (typeof (resultPSN) == "undefined") {
        resultPSN = "";
    }
    return resultPSN;
}

//设置下拉菜单选中值
function setSelectOption(objId, targetValue) {
    if (targetValue == null || targetValue == "") {
        return;
    }
    //alert(targetValue);
    var obj = document.getElementById(objId);
    if (obj) {
        var options = obj.options;
        if (options) {
            var len = options.length;

            //匹配抓取主机号
            for (var i = 0; i < len; i++) {
                if (options[i].value == targetValue) {
                    options[i].defaultSelected = true;
                    options[i].selected = true;
                    return true;
                }
            }
            //无法匹配抓取主机号则进行cookie主机号匹配
            var cokSn = fetchProductSnFromCookie();
            for (var i = 0; i < len; i++) {
                if (options[i].value == cokSn) {
                    options[i].defaultSelected = true;
                    options[i].selected = true;
                    return true;
                }
            }
        } else {
            //alert('missing element(s)!');
        }
    } else {
        //alert('missing element(s)!');
    }
}

//填写主机号到文本框
function fillProduct2Text(textId, isReadCookie, isReadOCX) {
    if (textId == null || textId == "") {
        return;
    }
    var textObj = document.getElementById(textId);

    if (textObj != null) {
        var fsn = fetchProductSn(isReadCookie, isReadOCX);
        if (fsn != null && typeof (fsn) != "undefined" && fsn != "") {
            textObj.value = fsn;
            textObj.style.color = '#000';
        }
    }
}

//将下拉菜单选中但前主机
function fillProduct2DDL(ddlId, isReadCookie, isReadOCX) {

    //alert("抓取号:" + fetchProductSn());
    setSelectOption(ddlId, fetchProductSn(isReadCookie, isReadOCX));
}
    
    
    
    
    
    
	
	
	
	
	
	
	