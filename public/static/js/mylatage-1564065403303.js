/*
$(function(){
    var url;
    if(document.domain.indexOf('lenovouat') == -1){
        url = "//anls.lenovo.com.cn/hu"
    }else{
        url = "//anls.lenovouat.com/hu"
    }
    $.ajax({
        "data":{
            "host":window.location.host,
            "referrer":document.referrer,
            "title":$.trim($("title").text()),
            "lenovoid":passport.isLogin() ? passport.cookie.lenovoId : "",
        },
        "url":url,
        "dataType": "jsonp",
        "crossDomain": true,
        "timeout":3000,
        "xhrFields": {
            "withCredentials": true
        },
        "success": function (data) {
           //console.log(data)
        },
        "error": function (XMLHttpRequest, textStatus, errorThrown) {
            //console.log(errorThrown)
        }
    })
})
*/