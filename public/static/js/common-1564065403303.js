//get cookie val by name
function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }else{
        return null;
    }
}

//公共的弹窗方法
function showMessage(time, text, url) {
    var $newdiv = $("<div class='alert'></div>");
    var div_html = '';
    div_html += '<div class="alert_body">';
    div_html += '<img src="/cn/pc/images/base/information.png" />&nbsp;&nbsp;';
    div_html += '<span>' + text + '</span>';
    div_html += '</div>';
    $newdiv.append(div_html);
    $('body').append($newdiv);
    var alert_w = $newdiv.width();
    $newdiv.fadeIn();
    $newdiv.css({ "margin-left": -alert_w / 2 });
    setTimeout(function () {
        $newdiv.fadeOut(function () { $newdiv.remove(); });
        if (url) {
            window.location.href = url;
        }
    }, time);
}


//定义获取参数方法，输入参数名称，获得参数值
(function ($) {
    $.getUrlParam = function (commonname) {
        var reg = new RegExp("(^|&)" + commonname + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }
})(jQuery);

//验证是否整数
function isInteger(number){
    if(parseInt(number)==number) return true;
    else false;
}


//公共的遮罩方法
function opencover(title, tips, method) {
    var pc_coverhtml = '';
    var imgurl = imgUrl;
    pc_coverhtml += '<div id="divcoverhtml_pcid">';
    pc_coverhtml += '    <div class="grey"></div>';
    pc_coverhtml += '    <div class="selectbox">';
    pc_coverhtml += '        <div class="box-top">';
    pc_coverhtml += '            <span>' + title + '</span>';
    pc_coverhtml += '            <a onclick="closecover()" class="closebtn" id="closebtn" style="cursor:pointer"><img src="'+imgUrl+'/base/close.png"/></a>';
    pc_coverhtml += '        </div>';
    pc_coverhtml += '        <div class="box_btm">';
    pc_coverhtml += '            <img src="'+imgUrl+'/base/warn.png" />';
    pc_coverhtml += '            <div class="cont"><p class="red">'+commonResource.tip+'</p><p>' + tips + '</p></div>';
    pc_coverhtml += '        </div>';
    pc_coverhtml += '        <div class="tijiao">';
    pc_coverhtml += '            <a onclick="' + method + '" class="btn now" style="cursor:pointer;text-decoration:none"> '+commonResource.confirm+' </a>';
    pc_coverhtml += '            <a onclick="closecover()" class="btn" style="cursor:pointer;text-decoration:none"> '+commonResource.cancel+' </a>';
    pc_coverhtml += '        </div>';
    pc_coverhtml += '    </div>';
    pc_coverhtml += '</div>';

    $('body').append(pc_coverhtml);
}

function closecover() {
    $('#divcoverhtml_pcid').remove();
}

/**
 * 判断是否是空
 * @param value
 */
function isEmpty(value){
    if(value == null || value == "" || value == "undefined" || value == undefined || value == "null"){
        return true;
    }
    else{
        value = value.replace(/\s/g,"");
        if(value == ""){
            return true;
        }
        return false;
    }
}

/**
 * 判断是否是数字
 */
function isNumber(value){
    if(isNaN(value)){
        return false;
    }
    else{
        return true;
    }
}

/**
 * 只包含中文和英文
 * @param cs
 * @returns {Boolean}
 */
function isGbOrEn(value){
    var regu = "^[a-zA-Z\u4e00-\u9fa5]+$";
    var re = new RegExp(regu);
    if (value.search(re) != -1){
        return true;
    } else {
        return false;
    }
}

/**
 * 检查邮箱格式
 * @param email
 * @returns {Boolean}
 */
function check_email(email){
    if(email){
        var myReg=/(^\s*)\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*(\s*$)/;
        if(!myReg.test(email)){return false;}
        return true;
    }
    return false;
}

/**
 * 检查邮箱格式
 * @param email
 * @returns {Boolean}
 */
function check_email_new(email){
    if(email){
        var reg=/^[0-9a-zA-Z_\-\.]{1}\**@\w+([-.]\w+)*\.\w+([-.]\w+)*(\s*$)/;
        if(!reg.test(email) && !check_email(email)){
            return false;
        }
        return true;
    }
    return false;
}
/**
 * 检查手机号码
 *
 * @param mobile
 * @returns {Boolean}
 */
function check_mobile(mobile) {
    var regu = /^1[3-9]\d{9}$/;
    var re = new RegExp(regu);
    if (!re.test(mobile)) {
        return false;
    }
    return true;
}

/**
 * 检查手机号码(手机号4-7位为*)
 *
 * @param mobile
 * @returns {Boolean}
 */
function check_mobile_new(mobile) {
    var regu = /^\d{3}\*\*\*\*\d{4}$/;
    var re = new RegExp(regu);
    if (!(re.test(mobile) || check_mobile(mobile))) {
        return false;
    }
    return true;
}
/**
 * 检查身份证号码(中间位为*)
 *
 * @param idCard
 * @returns {Boolean}
 */
function check_idCard_new(idCard) {
    var regu = null;
    var re = null;
    if(idCard.length == 15){
        regu =  /^\d{4}\*\*\*\*\*\*\*\d{4}$/;
    }else if(idCard.length == 18){
        regu =  /^\d{4}\*\*\*\*\*\*\*\*\*\*\d{3}(\d|X|x)$/;
    }else{
        return false;
    }
    re = new RegExp(regu);
    if (!(re.test(idCard) || check_idCard(idCard))) {
        return false;
    }
    return true;
}
/**
 * 检查身份证号码
 * yanwenqi 全球购新增身份证号
 * @param idCard
 * @returns {Boolean}
 */
function check_idCard(idCard) {
    idCard = trim(idCard.replace(/ /g, ""));               //去掉字符串头尾空格
    if (idCard.length == 15) {

        return isValidityBrithBy15IdCard(idCard);       //进行15位身份证的验证
    } else if (idCard.length == 18) {

        var a_idCard = idCard.split(""); 		// 得到身份证数组

        if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){   //进行18位身份证的基本验证和第18位的验证

            return true;
        }else {

            return false;
        }
    } else {

        return false;
    }
}

/**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
 */
function isTrueValidateCodeBy18IdCard(a_idCard) {
    var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
    var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X
    var sum = 0;                             // 声明加权求和变量
    if (a_idCard[17].toLowerCase() == 'x') {
        a_idCard[17] = 10;                    // 将最后位为x的验证码替换为10方便后续操作
    }

    for ( var i = 0; i < 17; i++) {
        sum += Wi[i] * a_idCard[i];            // 加权求和
    }

    valCodePosition = sum % 11;   	// 得到验证码所位置

    if (a_idCard[17] == ValideCode[valCodePosition]) {

        return true;
    } else {

        return false;
    }
}
/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(idCard18){

    var year =  idCard18.substring(6,10);
    var month = idCard18.substring(10,12);
    var day = idCard18.substring(12,14);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 这里用getFullYear()获取年份，避免千年虫问题
    if(temp_date.getFullYear()!=parseFloat(year)
        ||temp_date.getMonth()!=parseFloat(month)-1
        ||temp_date.getDate()!=parseFloat(day)){

        return false;
    }else{

        return true;
    }
}
/**
 * 验证15位数身份证号码中的生日是否是有效生日
 * @param idCard15 15位书身份证字符串
 * @return
 */
function isValidityBrithBy15IdCard(idCard15){
    var year =  idCard15.substring(6,8);
    var month = idCard15.substring(8,10);
    var day = idCard15.substring(10,12);
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
    if(temp_date.getYear()!=parseFloat(year)
        ||temp_date.getMonth()!=parseFloat(month)-1
        ||temp_date.getDate()!=parseFloat(day)){
        return false;
    }else{
        return true;
    }
}
//去掉字符串头尾空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 验证电话号码，带"(,),-"字符和数字其他不通过
 *
 * @param str
 * @returns {Boolean}
 */
function checkPhone(str) {
    if (str.length > 20) {
        return false;
    }
    var patternStr = "(0123456789-)";
    var strlength = str.length;
    for (var i = 0; i < strlength; i++) {
        var tempchar = str.substring(i, i + 1);
        if (patternStr.indexOf(tempchar) < 0) {
            return false;
        }
    }
    return true;
}
/**
 * 验证电话号码，带"(,),-"字符和数字其他不通过
 *
 * @param str
 * @returns {Boolean}
 */
function checkPhoneNew(mobile, str) {
    if (mobile == str) {
        return true;
    }
    if (str.length > 20) {
        return false;
    }
    var strlength = str.length;
    //默认带*，或者自己手动输入带*的固定电话的校验
    if(strlength >=4 && str.indexOf("*") >-1){
        if(!((new RegExp(/.*\*\*\*\*$/).test(str) && (strlength - str.indexOf("*")) < 5) || (new RegExp(/^\d{11}$/).test(str) || new RegExp(/^\d{3}\*\*\*\*\d{4}$/).test(str)))){
            return false;
        }
    }
    if(strlength < 4 && str.indexOf("*") > -1){
        return false;
    }
    //不包含*，自己录入的固定电话格式校验
    if (str.indexOf("*") < 0) {
       /* if (!(new RegExp("^(\\d{1,4}\\-?)?(\\d{5,8})(-\\d{1,4})?$").test(str))) {
            return false;
        }*/
         if (!(new RegExp("^([0\\+]\\d{2,3}-?)?(\\d{7,8})(-?(\\d{1,4}))?$").test(str))) {
         return false;
         }
    }

    return true;
}

/**
 * 验证银行账户，带"(, ),-"字符和数字其他不通过
 * @param str
 * @returns {Boolean}
 */
function checkBankCount(str){
    if(str.length > 50){
        return false;
    }
    var patternStr = "(0123456789- )";
    var  strlength=str.length;
    for(var i=0;i<strlength;i++){
        var tempchar=str.substring(i,i+1);
        if(patternStr.indexOf(tempchar)<0){
            return false;
        }
    }
    return true ;
}

//正则
function trimTxt(txt){
    return txt.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 检查是否含有非法字符
 * @param temp_str
 * @returns {Boolean}
 */
function is_forbid(temp_str){
    temp_str=trimTxt(temp_str);
    temp_str = temp_str.replace('*',"@");
    temp_str = temp_str.replace('--',"@");
    temp_str = temp_str.replace('/',"@");
    temp_str = temp_str.replace('+',"@");
    temp_str = temp_str.replace('\'',"@");
    temp_str = temp_str.replace('\\',"@");
    temp_str = temp_str.replace('$',"@");
    temp_str = temp_str.replace('^',"@");
    temp_str = temp_str.replace('.',"@");
    temp_str = temp_str.replace(';',"@");
    temp_str = temp_str.replace('<',"@");
    temp_str = temp_str.replace('>',"@");
    temp_str = temp_str.replace('"',"@");
    temp_str = temp_str.replace('=',"@");
    temp_str = temp_str.replace('{',"@");
    temp_str = temp_str.replace('}',"@");
    var forbid_str=new String('@,%,~,&');
    var forbid_array=new Array();
    forbid_array=forbid_str.split(',');
    for(i=0;i<forbid_array.length;i++){
        if(temp_str.search(new RegExp(forbid_array[i])) != -1)
            return false;
    }
    return true;
}

function is_forbid4Title(temp_str){
    temp_str=trimTxt(temp_str);
    if (!(new RegExp("^[\\u4e00-\\u9fa5\\da-zA-Z\\(\\)\\（\\）\\.\\-\\<\\>\\《\\》]+$").test(temp_str))) {
             return false;
     }
    return true;
}
/**
 * 检查数量
 * @param txtObj
 * @returns {Number}
 */
function checkLength(txtObj){
    var val=txtObj;
    var valLength=0;
    for(var ii=0;ii<val.length;ii++){
        var word=val.substring(ii,1);
        if(/[^\x00-\xff]/g.test(word)){
            valLength+=2;
        }else{
            valLength++;
        }
    }
    return valLength;
}
/**
 * 固定电话--检查是否含有非法字符
 * @param temp_str
 * @returns {Boolean}
 */
function is_forbid_new(temp_str){
    temp_str=trimTxt(temp_str);
    temp_str = temp_str.replace('*',"@");
    temp_str = temp_str.replace('--',"@");
    temp_str = temp_str.replace('/',"@");
    temp_str = temp_str.replace('+',"@");
    temp_str = temp_str.replace('\'',"@");
    temp_str = temp_str.replace('\\',"@");
    temp_str = temp_str.replace('$',"@");
    temp_str = temp_str.replace('^',"@");
    temp_str = temp_str.replace('.',"@");
    temp_str = temp_str.replace(';',"@");
    temp_str = temp_str.replace('<',"@");
    temp_str = temp_str.replace('>',"@");
    temp_str = temp_str.replace('"',"@");
    temp_str = temp_str.replace('=',"@");
    temp_str = temp_str.replace('{',"@");
    temp_str = temp_str.replace('}',"@");
    var forbid_str=new String('@,%,~,&');
    var forbid_array=new Array();
    forbid_array=forbid_str.split(',');
    for(i=0;i<forbid_array.length;i++){
        if(temp_str.search(new RegExp(forbid_array[i])) != -1)
            return false;
    }
    return true;
}

/*Full-width half-turn*/
function CtoH(str) {
    var result = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) == 12288) {
            result += String.fromCharCode(str.charCodeAt(i) - 12256);
            continue;
        }
        if (str.charCodeAt(i) > 65280 && str.charCodeAt(i) < 65375) result += String.fromCharCode(str.charCodeAt(i) - 65248);
        else result += String.fromCharCode(str.charCodeAt(i));
    }
    return result;
}
/*Hide your phone number in the middle position*/
function hiddenMobile(val) {
    var telNum = val.replace(/[^0-9]/ig, "");
    if (telNum.length > 7) {
        val = telNum.substring(0, 3) + "****" + telNum.substring(telNum.length - 4);
    }else if(telNum.length > 0){
        val = telNum.substring(0, 3) + "****" ;
    }else{
        val="";
    }
    return val;
}