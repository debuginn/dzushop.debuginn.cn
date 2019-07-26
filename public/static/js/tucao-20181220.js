// JavaScript Documen

passport.loginRedirect = document.URL;


function checkPhoneN(val) {
    if (val == "") {
        return false;
    }
    var regMobel0 = /^1[345789]\d{9}$/;
    var regMobel1 = /^0\d{2,3}-?\d{7,8}$/;
    if (regMobel0.test(val) || regMobel1.test(val)) {
        return true;
    } else {
        return false;
    }
}


function checkInput(o) {
    var content = $.trim($('#tucao_content').val());
    var phone = $.trim($('#myphone').val());

    if ($(".pro_type_items a[class*=active]").length < 1) {
        alert("请您选您遇到问题的产品");
        return false;
    }
    if ($(".type_items a[class*=active]").length < 1) {
        alert("请您选择问题类型");
        return false;
    }
    if (!content) {
        if (o) { alert("请您说明遇到的问题"); }
        $('#tucao_content').select();
        return false;
    }

    if (content != undefined) {
        if (content.length < 5) {
            alert('您输入问题内容过短');
            return false;
        }
        if (content.length > 500) {
            $('#tucao_content').val(content.substring(0, 500));
            alert('您输入问题内容字数超过限制');
            return false;
        }
    }

    if (phone != "" && !checkPhoneN(phone)) {
        alert("您的联系方式格式不正确");
        return false;
    }
    return true;
}

//弹出调用的方法
function showDivFun() {
    $("#popDiv").show();
}


var Tucao = (function(){
    var tucao = {};
    tucao.setType = function () {
        $(".pro_type_items a").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
        });

        $(".type_items a").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
    }
    tucao.closeZhezhao = function () {
        $("#closebtn").click(function () {
            $("#popDiv").hide();
            window.location.reload();
        });
    }


    tucao.init = function () {
        this.setType();
        this.addTucao();
        this.closeZhezhao();
    }

    tucao.addTucao = function () {//添加吐槽方法
        $("#btn_submit").click(function () {
            if (checkInput(1))
            {
                var content = $('#tucao_content').val();
                var phone = $('#myphone').val();
                var lenovoid = passport.isLogin() ? passport.cookie.lenovoId : "";
                var cuser = passport.isLogin() ? passport.cookie.loginName : "";
                var mytype = $(".type_items a[class*=active]").attr("data-type");
                var productQuesType=$(".pro_type_items a[class*=active]").attr("data-type");
                var orderId =$('#myorder').val();
                var shop_yijian=$("input[name='shop_yijian']:checked").length>0?$("input[name='shop_yijian']:checked").val():"";
                var shop_sousuo=$("input[name='shop_sousuo']:checked").length>0?$("input[name='shop_sousuo']:checked").val():"";
                var shop_product=$("input[name='shop_product']:checked").length>0?$("input[name='shop_product']:checked").val():"";
                var shop_sale=$("input[name='shop_sale']:checked").length>0?$("input[name='shop_sale']:checked").val():"";
                if (!phone) {
                    phone = '';
                }
                tucao.setEmpty();
                var postTucao = passport.isLogin() ? "/comment/complainfront/add.do" : "/comment/complainfront/addNoUser.do";
                $.ajax({
                    type: 'GET',
                    dataType: "json",
                    //jsonp:"jsonpcallback",
                    url: postTucao,
                    data: { plat: myplat,productQuesType:productQuesType,orderId:orderId, atype: mytype, acontent: content, ContactInformation: phone, lenovoId: lenovoid, cuser: cuser,lenovoScore:shop_yijian,searchScore: shop_sousuo,productScore:shop_product,buyScore:shop_sale},
                    success: function (data) {
                        if (data.code == "000000") {
                            showDivFun();
                        } else {
                            alert(data.msg);
                        }
                    }
                });
            }
        });
    }

    tucao.setEmpty = function () {//将内容设置为空
        $('#tucao_content').val("");
        $('#myphone').val("");
        $(".type_items a").removeClass("active");
        $(".pro_type_items a").removeClass("active");
    }

    return tucao;
})(jQuery, Tucao)


$(function () {
    if(document.URL.indexOf("itplace")>-1){
        passport.load(function(){
            Tucao.init();
            if (passport.isLogin() == false) {
                $('#mytu').remove();
                $('.zf_btn').css('float', 'none');
            }
        });
    }else{
        Tucao.init();
        if (passport.isLogin() == false) {
            $('#mytu').remove();
            $('.zf_btn').css('float', 'none');
        }
    }


    //退出登录刷新页面
/*    $(".logout").on('click', function () {
        window.location.reload();
    });*/




});

