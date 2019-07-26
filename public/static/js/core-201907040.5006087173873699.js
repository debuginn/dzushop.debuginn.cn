function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

function setCurOptclass(){
    var curType = getUrlParam("type");
    var curYears = getUrlParam("years");
    var oprationListDom = $(".oprationList li[tag="+curType+"]");
    var yearsListDom = $(".years li[tag="+curYears+"] a");
    $(oprationListDom).addClass("active");
    $(yearsListDom).addClass("selectYears");
}

$(function(){
    var entranceSelect = $(".oprationList li.active").attr("tag");
    $(".stackSearch").on("click",".oprationList li",function(){
        $(".active").removeClass("active");
        $(this).addClass("active");
    });

    $(".stackSearch .oprationList li").mouseover(function(){
        $(".active").removeClass("active");
        $(".oprationList li[tag="+entranceSelect+"]").addClass("active");
        setCurOptclass();
        $(this).addClass("active");
    });

    $(".stackSearch .oprationList li").mouseleave(function(){
        $(".active").removeClass("active");
        $(".oprationList li[tag="+entranceSelect+"]").addClass("active");
        setCurOptclass();
    });
    setCurOptclass();
   
})