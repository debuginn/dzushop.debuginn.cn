$("body").prepend("<div id='modelUrl'></div>");
$("body").prepend('<script type="text/javascript" src="/c2c/new/src/js/clipboard.min.js"></script>');

$("#modelUrl").load("/c2c/new/modelUrl.html");
/*
$(".user-a-animate").click(function(){
    $("#urlInfo1").val($(".try_ban_pro p").text());
    $("#urlInfo2").val(window.location.href);
    $(".modelUrlCont_imgList").html(
        '<li class="modelUrlCont_img_active">' +
            '<img src="//p3.lefile.cn/product/adminweb/2017/06/20/45d402bf-3604-40df-9865-cfad72dfead5_1.jpg">' +
            '<span class="gou_active"></span>' +
        '</li>'
    );
    $(".modelUrlModel").addClass("modelShow");
    $(".modelUrlCont").addClass("modelShow");
    return false;
    //
})
*/
$.fn.myShare = function(options){
    var defaults = {
        url : window.location.href,
        title : "联想商城",
        summary : "联想商城",
        pic: "//www.lenovo.com.cn/images/tempimage.gif"
    };  
    var opts = $.extend(defaults, options);
    $(this).click(function(){
        if(passport.isLogin()){
            var lenovoid = passport.cookie.lenovoId;
        }else{
            passport.show();
            return;
        }


        $("#urlInfo1").val(opts.title);
        $("#urlInfo2").val(opts.url + "?sharecode=" + lenovoid);
		$("#urlInfo3").val(opts.summary);
        $(".modelUrlCont_imgList").html(
            '<li class="modelUrlCont_img_active">' +
                '<img src="'+opts.pic+'">' +
                '<span class="gou_active"></span>' +
            '</li>'
        );
        $(".modelUrlModel").addClass("modelShow");
        $(".modelUrlCont").addClass("modelShow");
     //   return false;
        //
    });
}
