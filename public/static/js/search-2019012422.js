/**
 * Created by wupeng5 on 2015/10/21.
 */

String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
};
Array.prototype.unique = function(){
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
        if(!json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}


function getLeid(){
    var res = "";
    var arr = document.cookie.split(';');
    for(var i=0;i<arr.length;i++){
        if(arr[i].split('=')[0].trim() == "leid"){
            res = arr[i].split('=')[1];
            break;
        }
    }
    return res;
}

var searchController = function(){
    var that = this;

    this.plat = "4";
    this.from = "fromhomepage";

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return "";
    }

    this.envirement = location.href.indexOf("uat") > -1 ? "UAT" : "PRODUCTION";

    this.globalKey = "";
    this.index = ""; 
    this._type = "";
    this.paramsConteiner = $("div.tab_body .le_sel.tab_list li.clearfix.le_sel_line1 div.le_sel_con2");
    this.sortNumber =0;

    this.pageSize = 20;
    this.pageIndex = 1;
    this.filtersForInit = "";
    this.filterArr = [];//筛选条件窗口
    this.unfold=false;

    //产品列表容器
    this.container = $("#productList");

    var _compare_pro_cookie=$.cookie("pro_list");
    this.compareProList=_compare_pro_cookie?((_compare_pro_cookie.split("|"))[0])?((_compare_pro_cookie.split("|"))[0]).split(","):[]:[];//对比产品列表
    this.compareGoodsType=_compare_pro_cookie?((_compare_pro_cookie.split("|"))[1])?(_compare_pro_cookie.split("|"))[1]:"":"";//商品类型
    this.compareShowOrHide=_compare_pro_cookie?((_compare_pro_cookie.split("|"))[2])?(_compare_pro_cookie.split("|"))[2]:"0":"0";//商品对比部分显示与隐藏，1显示 0隐藏
    this.pro_type=getQueryString("pro_type") ? $.trim(getQueryString("pro_type")) : ""; //商品类型


    this.couponId=getQueryString("couponId")?getQueryString("couponId"):"";

    //查询出来的数据总条数
    this.allPageCount = 0;
    this.showPageNum = 5; //显示到多少条

    this.busImgContainer=$("#search_buspart .buspart_content");
    this.destination=getQueryString("destination")?getQueryString("destination"):"";//当前页面指向类型
    this.needCorrect=getQueryString("needCorrect")?getQueryString("needCorrect")=="false"?false:true:true;//是否纠错，true是，false否

    //私有方法，获取最上侧的已选条件的key和value
    function getItemsParams(){
        var res = {items:""};
        var params = "";
        //if(!that.paramsConteiner) {
        //    return res;
        //}
        //var _c = $("a.le_clickdel");
        //for(var i=0;i<_c.length;i++){
        //    params += $(_c[i]).attr("data-key")+"@";
        //}

        if (that.filterArr.length > 0) {
            params = that.filterArr.join("@");
        }


        //if(params != ""){
        //    params = params.substring(0,params.length-1);
        //}
        res.items = params.replace(/~/g, "-").replace(/\^/g, ",");
        return res;
    }
    //私有方法，重新设置分页页码样式
    function setPagingClass(){
        if(that.pageIndex == 1){
            $(".search_prev").removeClass("active");
        }
        else{
            $(".search_prev").addClass("active");
        }

        if(that.allPageCount>1) {
            $(".search_next").addClass("active");
            $("span[pageCountTag=pageCount]").text(that.allPageCount);
        }else{
            $(".search_next").removeClass("active");
            $("span[pageCountTag=pageCount]").text(1);
        }

        if(that.pageIndex == that.allPageCount){
            $(".search_next").removeClass("active");
        }
    }

    //私有方法，重新设置销量 时间 价格等样式
    function setSortClass(el){
        if($(el).attr("data-type") && $(el).attr("data-type")=="price"){
            $(el).siblings().removeClass("active");
            $(el).addClass("active");
            if($(el).hasClass("priceup")){
                $(el).removeClass("priceup").addClass("pricedown").attr("val",$(el).attr("data-todown"));
            }else if($(el).hasClass("pricedown")){
                $(el).removeClass("pricedown").addClass("priceup").attr("val",$(el).attr("data-toup"));
            }else {
                $(el).addClass("pricedown").attr("val",$(el).attr("data-todown"));
            }
        }else{
            $(el).siblings().removeClass("active").removeClass("priceup").removeClass("pricedown");
            $(el).addClass("active");
        }
    }

    this.tabChangedEvent = function(){
        $("body").delegate("li.tab_btn","click",function(){
            var index = $(this).attr("tag");
            if (!$(this).hasClass("active")) {
                if (document.URL.indexOf('s.lenovo.com.cn') > -1) {
                    //window.location.href = $GRUNTCONFIG.PRODUCTION.lenovoSearchUrl + "?index=" + index + "&key=" + encodeURIComponent(that.globalKey);
                    window.location.href = $GRUNTCONFIG.PRODUCTION.lenovoSearchUrl + "?index=" + index;
                }
                else {
                    //window.location.href = $GRUNTCONFIG.UAT.lenovoSearchUrl + "?index=" + index + "&key=" + encodeURIComponent(that.globalKey);
                    window.location.href = $GRUNTCONFIG.UAT.lenovoSearchUrl + "?index=" + index;
                }
            }
        })
    }

    this.currentContainer = null;

    this.setNaviAndSearchItemsCss = function(index){
        if(index){
            this._type = index;
        }
    }

    this.moreItemsEvent = function(){
        $("body").delegate("div.le_sel_con3","click",function(){
            $(this).parent().toggleClass("le_sel_active");
        })
    }

    this.cancelItemEvent = function(){
        $("body").delegate("input.le_btn_cancel","click",function(){
            $(this).parent().parent().parent().removeClass("le_sel_active");
        })
    }

    //撤销一个已选条件项
    this.removeSelectedItems = function(){
        $("body").delegate("a.seriesCls", "click", function () {
            //var key = $(this).attr("data-key").split(':')[0];

            //var container = $(this).parent().parent().parent().siblings();

            //container.each(function () {
            //    var _key = $(this).find("div.le_sel_con1").attr("data-type");
            //    if (_key == key) {
            //        $(this).show();
            //        $(this).removeClass("le_sel_active");
            //        $(this).find("a.le_clickone.le_clickmore").removeClass("active");
            //    }
            //})
            //if ($(this).parent().find("a.le_clickdel").length == 1) {
            //    $(this).parent().parent().hide();
            //}

            //$(this).parent().parent().parent().siblings("a.le_sel_down").hide();
            //$(this).parent().parent().parent().siblings("a.le_sel_up").show();
            //$(this).remove();

            ////show all not choose Li list
            //var notChooseLis = getNotChooseLis().notChooseLis;
            //for (var i = 0; i < notChooseLis.length; i++) {
            //    $(notChooseLis[i]).show();
            //}

            that.removeLeaveSeries($(this).attr("data-key"));

            resetPageIndex();
            that.loadDataByParamsForInit();
        });
    }

    this.removeLeaveSeries = function (keyval) {
        for (var i = 0; i < that.filterArr.length; i++) {
            if (that.filterArr[i] == keyval) {
                that.filterArr.splice(i, 1);
                break;
            }
        }
    }


    this.setLeaveSeries = function () {
        if (that.filterArr.length > 0) {
            for (var i = 0; i < that.filterArr.length; i++) {
                var temp = that.filterArr[i].split(":");
                var key = temp[0];
                var val = temp[1].replace(/<script.*?>.*?<\/script>/ig,'');
                that.getDefaultParamsFromUrl(key, val);
            }
        }
    }

    //全部撤销
    this.cancelAllSelected = function(){
        $("body").delegate("a.le_allcancel","click",function(){
            //var li = $(this).parent().parent();
            //li.hide();
            //li.siblings().removeClass("le_sel_active").show();
            //li.siblings().find("a.le_clickone.le_clickmore").removeClass("active");

            //$(this).parent().parent().parent().siblings("a.le_sel_down").hide();
            //$(this).parent().parent().parent().siblings("a.le_sel_up").show();

            //$(this).parent().children("a.le_clickdel").remove();
            that.filterArr = [];
            resetPageIndex();
            that.loadDataByParamsForInit();
        })
    }

    //添加已选项到条件容器里
    this.appendSelectToContainer = function(el){
        var currentDiv = $(el).parent().prev();
        var type = currentDiv.attr("data-type");
        var nameCN = currentDiv.attr("data-name");
        var li = $(el).parent().parent().parent().children().eq("0");
        var val = $(el).attr("data-value");
        var name = $(el).attr("data-name");
        var chooseMoreTag = $(el).parent().parent().hasClass("le_sel_active");

        if(chooseMoreTag){
            if($(el).hasClass("active")){
                $(el).removeClass("active");
            }else{
                $(el).addClass("active");
            }
        }
        else{
            var data_key = type + ":" + val;
            that.filterArr.push(data_key);
            //var html = "<a class='le_clickdel seriesCls' data-key='"+data_key+"'><span>"+nameCN+"：</span><em>"+name+"</em><i tag='delSelected'></i></a>";

            //dealShowMore($(el).parent().parent().parent());

            //$(el).parent().parent().parent().find("li.le_sel_line1 div.le_sel_con2").prepend($(html));
            //$(el).parent().parent().hide();
            //li.show();
        }
    }

    function dealShowMore(ul){
        //处理更多选项
        if($(ul).siblings("a.le_sel_up").css("display") == "none"){
            var cel = getLastShowItems(ul);
            var cid = cel.find("div.le_sel_con1").attr("data-type");
            var notChooseLis = getNotChooseLis().notChooseLis;
            var chooseIndex =getChooseIndex(cid,getNotChooseLis().notChooseIds);
            if(notChooseLis.length == 4 ){
                that.currentDiv.find("a.le_sel_down").hide();
            }
            $(notChooseLis[chooseIndex + 1]).show();
        }
    }

    function getChooseIndex(id,ids){
        var index = -1;
        for(var i=0;i<ids.length;i++){
            if(id == ids[i]){
                index = i;
                break;
            }
        }
        return index;
    }

    function getNotChooseLis(){
        var  ids = getAllChoosedIds();
        that.currentDiv = null;
        $("div.le_sel.tab_list").each(function(){
            if($(this).css("display") != "none") {
                that.currentDiv =$(this);
            }
        })

        var notChooseLis = [];
        var notChooseIds = [];
        that.currentDiv.find("li").not(".le_sel_line1").each(function(){
            if(checkIdInChooseIds($(this).find("div").eq(0).attr("data-type"),ids) == false){
                notChooseLis.push($(this));
                notChooseIds.push($(this).find("div").eq(0).attr("data-type"));
            }
        })
        return {notChooseLis:notChooseLis,notChooseIds:notChooseIds};
    }

    function getLastShowItems(ul){
        var showLis = [];
        $(ul).find("li").not(".le_sel_line1").each(function(){
            if($(this).css("display")!= "none"){
                showLis.push($(this));
            }
        })
        return showLis[showLis.length-1];
    }

    this.getFromPageParm=function () {
        var from_page="",from_parm=getQueryString("frompage");
        if(from_parm && from_parm.length>0){
            from_page="&frompage="+from_parm;
        }
        return from_page;
    }

    this.getUrlParmInfo=function (param) {
        var result="",from_parm=getQueryString(param);
        if(from_parm && from_parm.length>0){
            result="&"+param+"="+from_parm;
        }
        return result;
    }

    //选择单个item
    this.selectedPriceEvent = function(){
        $("body").delegate("a.le_clickone.le_clickmore.le_clickprice", "click", function () {
            if ($(this).parent().prev().attr("data-type") == "-1") {
                var cat = "";
                if ($.trim(that._type) == "") {
                    cat = $(".tab_body .tab_list").attr("tag") + "-" + $(this).attr("data-value");
                } else {
                    cat = that._type + "-" + $(this).attr("data-value");
                }

                if (document.URL.indexOf('s.lenovo.com.cn') > -1) {
                    window.location = "//s.lenovo.com.cn?key=" + that.globalKey + "&destination="+that.destination+"&index=" + cat+that.getFromPageParm()+that.getUrlParmInfo("needCorrect");
                } else {
                    window.location = "//s.lenovouat.com?key=" + that.globalKey + "&destination="+that.destination+"&index=" + cat+that.getFromPageParm()+that.getUrlParmInfo("needCorrect");
                }
            } else if ($(this).parent().prev().attr("data-type") == "-2") {
                var catlist = that._type.split("-");
                catlist[catlist.length - 1] = $(this).attr("data-value");
                var cat = catlist.join("-");
                if (document.URL.indexOf('s.lenovo.com.cn') > -1) {
                    window.location = "//s.lenovo.com.cn?key=" + that.globalKey + "&destination="+that.destination+"&index=" + cat+that.getFromPageParm()+that.getUrlParmInfo("needCorrect");
                } else {
                    window.location = "//s.lenovouat.com?key=" + that.globalKey + "&destination="+that.destination+"&index=" + cat+that.getFromPageParm()+that.getUrlParmInfo("needCorrect");
                }
            } else {
                that.appendSelectToContainer(this);
                if (!$(this).parent().parent().hasClass("le_sel_active")) {
                    that.setType();
                    resetPageIndex();
                    that.loadDataByParamsForInit();
                }
            }
        })
    }

    //自定义价格的按钮事件
    this.selectPriceButton = function(){
        $("body").delegate("input.le_btn_sure.le_input_btn","click",function(){

            var priceLow = $(this).parent().find(".le_low").val().trim();
            var priceHigh = $(this).parent().find(".le_high").val().trim();

            if(parseInt(priceHigh)<=parseInt(priceLow)){
                alert("价格区间输入错误!");
                return;
            }

            if(!/^\d+$/.test(priceLow) || !/^\d+$/.test(priceHigh)){
                alert("请输入合法的价格!");
                return;
            }

            if(priceLow == "" || priceHigh == ""){
                alert("价格不允许为空!");
                return;
            }
            var currentDiv = $(this).parent().parent().prev();
            var type = currentDiv.attr("data-type");
            var nameCN = currentDiv.attr("data-name");
            var li = $(this).parent().parent().parent().parent().children().eq("0");
            var val = priceLow + "~"+ priceHigh;
            //var html = "<a class='le_clickdel seriesCls' data-key="+type+":"+val+"><span>"+nameCN+"：</span><em>"+val+"</em><i tag='delSelected'></i></a>";
            //var appendDivContainer = li.find("div.le_sel_con2");

            that.setType();
            var keyval = type + ":" + val;
            that.filterArr.push(keyval);

            //dealShowMore($(this).parent().parent().parent().parent());

            //appendDivContainer.prepend($(html));

            //$(this).parent().parent().parent().hide();
            //li.show();
            resetPageIndex();
            that.loadDataByParamsForInit();
        })
    }

    //其他选项的确定按钮事件
    this.selectOtherButton = function(){
        $("body").delegate("input.le_btn_sure","click",function(){
            if(!$(this).hasClass("le_input_btn")){
               var aList = $(this).parent().parent().find("a.active");
                if(aList.length == 0) return;
                var currentDiv = $(this).parent().parent().prev();
                var type = currentDiv.attr("data-type");
                var nameCN = currentDiv.attr("data-name");
                var li = $(this).parent().parent().parent().parent().children().eq("0");
                var appendDicContainer = li.find("div.le_sel_con2");
                var val = "";
                var name = "";

                for(var i =0;i<aList.length;i++){
                    val += $(aList[i]).attr("data-value") + "^";
                    name += $(aList[i]).attr("data-name") + ",";
                }
                val = val.substring(0,val.length-1);
                //name = name.substring(0,name.length-1);
                //var oldVal = name;

                //name.length >15 ? name = name.substring(0,12)+"...":name=name;
                //var html = "<a title='" + oldVal + "' class='le_clickdel seriesCls' data-key='" + type + ":" + val + "'><span>" + nameCN + "：</span><em>" + name + "</em><i tag='delSelected'></i></a>";

                that.setType();
                var keyval = type + ":" + val;
                that.filterArr.push(keyval);

                //dealShowMore($(this).parent().parent().parent().parent());

                //if(appendDicContainer.html().indexOf(val) == -1){
                //    appendDicContainer.prepend($(html));
                //}
                //$(this).parent().parent().parent().hide();
                //li.show();
                resetPageIndex();
                that.loadDataByParamsForInit();
            }
        })
    }

    this.delGlobalKey = function(){
        $("body").delegate("span.searchKeyRed","click",function(){
            if(that.index){
                window.location.href = $GRUNTCONFIG.PRODUCTION.lenovoSearchUrl+"?index="+that.index;
            }
            else{
                window.location.href = $GRUNTCONFIG.PRODUCTION.lenovoSearchUrl;
            }
        })
    }

    this.filterCharArray = ["Lenovo笔记本", "Think笔记本", "台式机", "平板电脑", "智能电视",  "智能数码", "打印机","我要服务"];

    function filterGlobalKey(key){
        var res = key;

        for(var i=0;i<that.filterCharArray.length;i++){
            if(res.toLowerCase() == that.filterCharArray[i].toLowerCase()){
                res = "";
                break;
            }
        }
        return res;
    }

    //init
    this.init = function(){
        that.initGoogleAnalytics();
        that.initTabInfo();
        this.globalKey = getQueryString("key").trim().replace(/[~'!<>@#$%^&*()-+=:]/g, "");//获取并过滤关键字
        this.index = getQueryString("index").replace(/[~'!<>@#$%^&*()-+=:]/g, "");

        //that.globalKey = filterGlobalKey(that.globalKey);

        if (this.globalKey) {
            document.title = that.globalKey + "- 联想商城搜索";
            $(".searchKeyRed").show();
        }else{
            $(".searchKeyRed").hide();
        }
        //$(".globalSearchKey").text(this.globalKey);
        that.setDestinationParm();

        this.setNaviAndSearchItemsCss(this.index);
        this.regEvent();

        that.setFiltersForInit();
        that.loadDataByParamsForFistInit();
        that.busImgInit();//初始化直通车部分
        that.initCompareProInfo();//初始化对比部分
    }

    this.initGoogleAnalytics=function () {//初始化google监控
        try{
            var ga_userId="";
            if(window.passport&&window.passport.cookie){
            ga_userId = passport.cookie.lenovoId;}
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
            ga('create', 'UA-110299082-1', 'auto', {'userId': ga_userId});
            ga('require', 'ec');
            ga(function(tracker) {
            var clientId = tracker.get('clientId');
            ga('set', 'dimension1', clientId); });
            ga('set', 'dimension2', ga_userId);
            ga('send', 'pageview');
            }catch(e){
            }
        }

    this.setDestinationParm=function () {
        $.ajax({
             url: "/search/v2/destination?keyword=" + encodeURIComponent(that.globalKey),
             type: "GET",
             async:false,
             success: function (res) {
                 if (res.status == 200 && res.data.destination && res.data.destination==3) {
                     that.destination=res.data.destination;
                 }
             }
         });
        if(that.destination==3){
            that._type=889;
            $("div.tap_list ul li.phone").addClass("active").siblings().removeClass("active");
        }
        if(that.checkIsPhone(that.globalKey)){
            $("div.tap_list ul li.phone").addClass("active").siblings().removeClass("active");
        }
    }

    this.checkIsPhoneKeyWords=function(_val) {//判断是否为双12活动页
        var result=false;
        var keywordOpenNewWindow = ["手机","联想手机", "MOTO", "Moto", "moto", "联想K5", "联想S5", "moto z 2018 鎏金黑", "moto z² play", "摩托青釉"];
        for (var i = 0; i < keywordOpenNewWindow.length; i++) {
            if (_val.toLowerCase() == keywordOpenNewWindow[i].toLowerCase()) {
                result=true;
                break;
            }
        }
        return result;
    }

    this.checkIsPhone=function(_val) {
        var result=false;//-1代表匹配失败，0代表服务器，1代表存储产品，2代表b2b,3网络设备 4移动互联 5打印及耗材 6智能眼镜 7手机 8MTO-Z 9驱动
        if(that.checkIsPhoneKeyWords(_val)){
            result=true;
        }
        return result;
    }


    this.initTabInfo=function () {//初始化tab标签部分
        var param_from=getQueryString("frompage");
        if(param_from && param_from.length>0){
            $(".search_tap .tap_list ul li").not("[class*='"+param_from+"']").hide();
        }
    }

    this.initCompareProInfo=function () {
        if(that.compareProList.length>0){
            var url = $GRUNTCONFIG[that.envirement].compareUrl;
            $.ajax({
                url: url,
                type: "get",
                data: {code:that.compareProList.join(",")},
                jsonp: "jsonpCallback",
                dataType: "jsonp",
                success: function (res) {
                    if (res.status==0) {
                        if (res.result) {//有数据的情况
                            that.renderCompareHtml(res.result);
                        }
                    }
                }
            });
        }else{
            that.renderCompareEmptyHtml();
        }

    }

    this.renderCompareHtml=function (data) {
        var html="";
        for (var i = 0; i < 4; i++) {
            var _code=that.compareProList[i];
            _model = data[_code];
            if(_model && _model.detail){
                html+='<div class="pro_item full" data-id="'+_code+'">';
                html+='<div class="has_pro">';              ;
                if(_model.detail.thumbnail){//主图部分
                    html+='<div class="pro_img"><img src="'+getFileName(_model.detail.thumbnail) + ".w60xh40" + getFileextention(_model.detail.thumbnail)+'" /></div>';
                }else {
                    html+='<div class="pro_img"><img src="//p1.lefile.cn/g1/M00/00/87/CmBZEFZgOc2ATUeIAAAJwF5r7O8764.jpg" /></div>';
                }

                html+='<div class="pro_desc">';
                /*标题部分start*/
                if(_model.detail.name){
                    html+='<p class="pro_title">'+_model.detail.name+'</p>';
                }else{
                    html+='<p class="pro_title">--</p>';
                }
                /*标题部分end*/

                /*价格部分start*/
                if(_model.price && _model.price.P_C &&  _model.price.P_C.C_1 && _model.price.P_C.C_1.P_0 && _model.price.P_C.C_1.P_0.DV && _model.price.P_C.C_1.P_0.DV.V ){
                    html+='<p class="pro_price"><span>￥'+_model.price.P_C.C_1.P_0.DV.V+'</span><a href="javascript://;" class="btn_removecompareitem" data-code="'+_code+'">删除</a></p>';
                }else {
                    html+='<p class="pro_price"><span>暂无价格</span><a href="javascript://;" class="btn_removecompareitem" data-code="'+_code+'">删除</a></p>';
                }
                /*价格部分end*/

                html+='</div>';
                html+='<div class="clear"></div>';
                html+='</div>'
                html+='</div>';
            }else{
                html+='<div class="pro_item">';
                html+='<div class="has_no">';
                html+='<span class="pro_order">'+(i+1)+'</span>';
                html+='<span class="order_desc">您还可以继续添加</span>';
                html+='</div>';
                html+='</div>';
            }
        }
        $("#compare_pro_list .oprate_compare").before(html);
        if(that.compareProList.length>0 &&  !$(".search_comparepart").hasClass("show") && that.compareShowOrHide=="1"){
            $(".search_comparepart").slideDown().addClass("show");
        }
    }

    //排序
    this.sortEvent = function(){
        $("body").delegate("a[tag=proFilterSort]","click",function(){
            setSortClass($(this));
            that.sortNumber = $(this).attr("val");
            resetPageIndex();
            that.loadDataByParams();
        })
    }

    //获取所有已选的项的id集合
    function getAllChoosedIds(){
        var choosedIds = [];
        $("li.le_sel_line1 a.le_clickdel").each(function(){
            choosedIds.push($(this).attr("data-key").split(':')[0]);
        })
        return choosedIds;
    }

    function checkIdInChooseIds(id,ids){
        ids = ids.join(',');
        var bl = false;
        ids.indexOf(id) == -1 ? bl= false:bl= true;
        return bl;
    }

    this.showMoreLi = function(){
        $("body").delegate(".le_sel_down","click",function(){
            that.unfold=true;
            var arrIds = [];
            var ids = getAllChoosedIds();
            $(this).prev().find("li").not(".le_sel_line1").each(function(){
                arrIds.push($(this).children().eq(0).attr("data-type"));
                if(checkIdInChooseIds($(this).children().eq(0).attr("data-type"),ids) == false){
                    $(this).show();
                }
            })
            $(".le_sel_up").show();
            $(this).hide();
        });

        $("body").delegate(".le_sel_up","click",function(){
            that.unfold=false;
            var hideLis = [];
            $(this).prev().prev().find("li").not(".le_sel_line1").each(function(i){
                if($(this).css("display") != "none"){
                    hideLis.push($(this));
                }
            })

            for(var i=0;i<hideLis.length;i++){
                if(i<2){
                    $(hideLis[i]).show();
                }
                else{
                    $(hideLis[i]).hide();
                }
            }

            $(".le_sel_down").show();
            $(this).hide();
        })
    }

    this.pageBind = function () { //初始化分页部分
        var html = "";
        if (that.allPageCount > that.pageSize) {
            //html += '<a href="javascript://" class="firstpage">首页</a>';

            if (that.pageIndex > 1) { //上一页是否可用
                html += '<a href="javascript://" class="prevpage isabled"><</a>';
            } else {
                html += '<a href="javascript://" class="prevpage"><</a>';
            }

            var showpagenum = that.showPageNum;
            var startindex = that.pageIndex % showpagenum == 0 ? (Math.floor(that.pageIndex / showpagenum) - 1) * that.showPageNum + 1 : Math.floor(that.pageIndex / showpagenum) * that.showPageNum + 1;
            var endindex = Math.ceil(that.pageIndex / showpagenum) * showpagenum > Math.ceil(that.allPageCount / that.pageSize) ? Math.ceil(that.allPageCount / that.pageSize) : Math.ceil(that.pageIndex / showpagenum) * showpagenum;
            for (var i = startindex; i <= endindex; i++) {
                if (i == that.pageIndex) {
                    html += '<a href="javascript://" class="despage activity" data-value="' + i + '">' + i + '</a>';
                } else {
                    html += '<a href="javascript://" class="despage" data-value="' + i + '">' + i + '</a>';
                }
            }


            if (that.allPageCount > that.pageIndex * that.pageSize) { //下一页是否可用
                html += '<a href="javascript://" class="nextpage isabled">></a>';
            } else {
                html += '<a href="javascript://" class="nextpage">></a>';
            }


            //html += '当前第<span id="current_page">' + that.pageIndex + '</span>页';
            //html += '共<span id="total_page">' + Math.ceil(that.allPageCount / that.pageSize) + '</span>页';
        }
        $("#pager").html(html).show();
    }

    this.paging = function(){
        $(document).delegate(".firstpage", "click", function () {//首页
            if (that.pageIndex != 1) {
                that.pageIndex = 1;
                that.loadDataByParams();
            }
        });
        $(document).delegate(".prevpage[class*=isabled]", "click", function () {//上一页
            that.pageIndex -= 1;
            that.loadDataByParams();
        });
        $(document).delegate(".nextpage[class*=isabled]", "click", function () {//下一页
            that.pageIndex = parseInt(that.pageIndex) + 1;
            that.loadDataByParams();
        });
        $(document).delegate(".lastpage", "click", function () {//尾页
            that.pageIndex = $(this).attr("data-value");
            that.loadDataByParams();
        });
        $(document).delegate(".despage", "click", function () {//进入指定页
            that.pageIndex = parseInt($(this).attr("data-value"));
            that.loadDataByParams();
        });
    }

    //是否有库存
    this.checkStock = function(){
        $("body").delegate("#checkStock","click",function(){
            resetPageIndex();
            that.loadDataByParamsForInit();
        });
    }

    //是否为内购
    this.checkIsVip = function(){
        $(document).delegate("#checkIsVip","click",function(){
            resetPageIndex();
            that.loadDataByParamsForInit();
        });
    }

    //收藏
    this.storePro = function(){
        var flag = true;
        $("body").delegate("a[tag=storePro]","click",function(){
            if(flag == false) {
                return;
            }
            flag = false;
            var that = this;
            var isLogin = passport.isLogin();

            var isActive = $(this).hasClass("active");
            var gCode = $(this).attr("gcode");

            var plat = $(this).attr("platid");

            var furl = "";
            //if(plat == "8"){
            //    furl = $GRUNTCONFIG.PRODUCTION.favoriteThinkUrl;
            //}
            //if(plat == "4"){
            //    furl = $GRUNTCONFIG.PRODUCTION.favoriteLenovoUrl;
            //}
            furl = $GRUNTCONFIG.PRODUCTION.favoriteLenovoUrl;

            if(!isLogin){
                passport.show();
            }else{
                //取消收藏
                if(isActive){
                    $.ajax({
                        url:furl + "myfavorites/deletefavorites?gcode="+gCode + "&plat="+ plat,
                        type:"GET",
                        jsonp: "callbackparam",
                        dataType:"jsonp",
                        success:function(data) {
                            if(!data) return;
                            if(data.rc == "0"){
                                $(that).removeClass("active");
                            }
                            else{
                                alert("取消失败!");
                            }
                        }
                    });
                }
                //添加收藏
                else{
                    $.ajax({
                        url:furl + "myfavorites/addfavorites?gcode="+gCode + "&plat="+ plat,
                        type:"GET",
                        jsonp: "callbackparam",
                        dataType:"jsonp",
                        success:function(data) {
                            if(!data) return;
                            if(data.rc == "0"){
                                $(that).addClass("active");
                            }
                            else if(data.rc == "1"){
                                alert("赠品不可收藏!");
                            }
                            else{
                                alert("收藏失败!");
                            }
                        }
                    });
                }
            }
            window.setTimeout(function(){
                flag = true;
            },1000);
        });
    }

    //所有的事件注册
    this.regEvent = function(){
        that.regEventChangeSearchTap();
        that.regEventBusHover();
        that.regProTypeCheckBoxChecked();
        that.regEventPriceInputShow();
        that.regEventPriceSearch();
        that.regEventProHover();
        that.regEventLatelyViewHover();
        this.tabChangedEvent();
        this.moreItemsEvent();
        this.cancelItemEvent();
        this.selectedPriceEvent();
        this.selectPriceButton();
        this.selectOtherButton();
        this.removeSelectedItems();
        this.cancelAllSelected();
        this.sortEvent();
        this.paging();
        this.innerKeyEvent();
        this.addCartEvent();
        this.productDetail();
        this.regCheckPriceNumber();
        this.checkStock();
        this.storePro();
        this.selectAll();
        this.delGlobalKey();
        this.showMoreLi();
        that.regEventCompareSelect();
        that.regEventCompareSlideUp();
        that.regEventCompareClear();
        that.regEventCompare();
        that.regEventCompareItemHover();
        that.regEventRemoveCompareItem();
        that.regEventSearchAllBtnClick();
        that.regEventDirectKeyClick();
        that.checkIsVip();
        that.regEventProItemClickForGoogle();
    }

    this.regEventDirectKeyClick=function () {
        $(document).delegate("#wrong_direct_key","click",function () {
            var direct_key=$(this).html();
            if($.trim(direct_key).length>0){
                window.location.href="/?key="+$(this).html()+"&needCorrect=false";
            }
        });
    }

    this.regEventSearchAllBtnClick=function () {
        $(document).delegate("#search_all_btn","click",function () {
           var from_parm=getQueryString("frompage");
           if(from_parm && from_parm.length>0){
               window.location.href="/?frompage="+from_parm;
           }else {
               if(that.destination==3){//当为手机产品的时候
                   window.location.href="/?destination=3";
               }else{
                   window.location.href="/";
               }
           }
        });
    }

    this.addProCodeInCookie=function () {
        var _pro_cookie=that.compareProList.join(",")+"|"+that.compareGoodsType+"|"+that.compareShowOrHide;
        $.cookie("pro_list", _pro_cookie, { path: '/' });
    }

    this.regEventRemoveCompareItem=function () {
        $(document).delegate("a.btn_removecompareitem","click",function () {
            var _code=$(this).attr("data-code");
            that.compareProList.splice(that.compareProList.indexOf(_code),1);
            $("a.btn_compare_select[data-id='"+_code+"']").removeClass("active");
            that.removeCompareGoodType();
            that.addProCodeInCookie();
            that.removeCompareItem(_code);
        });
    }
    this.regEventCompareItemHover=function () {
        $(document).delegate("#compare_pro_list .pro_item","mouseover",function () {
            $(this).find("a.btn_removecompareitem").show();
        });
        $(document).delegate("#compare_pro_list .pro_item","mouseout",function () {
            $(this).find("a.btn_removecompareitem").hide();
        });
    }

    this.regEventCompareSlideUp=function () {
        $(document).delegate("#btn_compare_hide","click",function () {
            that.compareShowOrHide="0";
           $(".search_comparepart").slideUp().removeClass("show");
           that.addProCodeInCookie();
        });
    }
    this.regEventCompareClear=function () {
        $(document).delegate("#btn_compare_clear","click",function () {
            $("a.btn_compare_select").removeClass("active");
            that.compareProList.splice(0,that.compareProList.length);
            that.removeCompareGoodType();
            that.addProCodeInCookie();
            that.renderCompareEmptyHtml();
        });
    }

    this.regEventCompareGoogleAnalytics=function () {//对比部分谷歌监控
        try{
            ga('send', 'event', "SearchResultList_PC", "ProductCompare", that.compareProList.join("_"));
        }catch (e){}
    }

    this.regEventCompare=function () {
        $(document).delegate("#btn_compare","click",function () {
            if(that.compareProList.length<1){
                alert("请选择要对比的商品！");
                return;
            }
            if(that.compareProList.length<2){
                alert("请至少选择两个同类商品进行对比！");
                return;
            }
            var pro_list=that.compareProList.join(",");
            that.regEventCompareGoogleAnalytics()
            window.open("compare.html?pro_list="+pro_list+"&pro_type="+that.compareGoodsType);
        });
    }

    this.regEventCompareSelect=function () {
        $(document).delegate("a.btn_compare_select","click",function () {
            if($(this).hasClass("active")){
                $(this).removeClass("active");
                that.compareProList.splice(jQuery.inArray($(this).attr("data-id"),that.compareProList),1);
                that.removeCompareGoodType();
                that.addProCodeInCookie();
                that.removeCompareItem($(this).attr("data-id"));
            }else {
                if(that.compareProList.length<4){
                    if(that.setCompareGoodType($(this).attr("data-gtype"))){
                        $(this).addClass("active");
                        that.compareProList.push($(this).attr("data-id"));
                        that.AddCompareItem($(this).attr("data-id"));
                        that.addProCodeInCookie();
                    }

                }else {
                    if(!$(".search_comparepart").hasClass("show")){
                        that.compareShowOrHide="1";
                        $(".search_comparepart").slideDown().addClass("show");
                        that.addProCodeInCookie();
                    }
                    alert("对比栏已满，您可以删除不需要的栏内商品再继续添加哦！");
                }
            }
        });
    }

    this.removeCompareGoodType=function () {//删除商品分类
        if(that.compareProList.length<1){
            that.compareGoodsType="";
        }
    }

    this.setCompareGoodType=function (_type) {//记录对比商品分类
        var result=true;
        if(that.compareGoodsType==""){
            that.compareGoodsType=_type;
        }else {
            if(that.compareGoodsType!=_type){
                alert("只能对同类别商品进行对比， 请重新选择");
                result=false;
            }
        }
        return result;
    }

    this.renderCompareEmptyHtml=function () {
        var _html="";
        for(var i=0;i<4;i++){
            _html+='<div class="pro_item">';
            _html+='<div class="has_no">';
            _html+='<span class="pro_order">'+(i+1)+'</span>';
            _html+='<span class="order_desc">您还可以继续添加</span>';
            _html+='</div>';
            _html+='</div>';
        }
        $("#compare_pro_list .pro_item").remove();
        $("#compare_pro_list").prepend(_html);
    }

    this.removeCompareItem=function (_code) {
        var html="",_model;
        $("#compare_pro_list .pro_item[data-id='"+_code+"']").remove();
        for(var i=0;i<4;i++){
            _model=$("#compare_pro_list .pro_item").eq(i);
            if(_model.length>0){
                if(!_model.hasClass("full")){
                    html='<div class="has_no">';
                    html+='<span class="pro_order">'+(i+1)+'</span>';
                    html+='<span class="order_desc">您还可以继续添加</span>';
                    html+='</div>';
                    _model.html(html);
                }
            }else {
                html='<div class="pro_item">';
                html+='<div class="has_no">';
                html+='<span class="pro_order">'+(i+1)+'</span>';
                html+='<span class="order_desc">您还可以继续添加</span>';
                html+='</div>';
                html+='</div>';
                $("#compare_pro_list .oprate_compare").before(html);
            }
        }
    }

    this.AddCompareItem=function (_code) {
        var title="",price="",img_url="",html="",_model,_item;
        _model=$("a[data-id="+_code+"]");
        title=_model.attr("data-title");
        price=_model.attr("data-price");
        img_url=_model.attr("data-imgurl");

        html+='<div class="has_pro">';
        html+='<div class="pro_img"><img src="'+img_url+'" /></div>';
        html+='<div class="pro_desc">';
        html+='<p class="pro_title">'+title+'</p>';
        html+='<p class="pro_price"><span>'+price+'</span><a href="javascript://;" class="btn_removecompareitem" data-code="'+_code+'">删除</a></p>';
        html+='</div>';
        html+='<div class="clear"></div>';
        html+='</div>';

       for(var i=0;i<4;i++){
           _item=$("#compare_pro_list .pro_item").eq(i);
           if(!_item.hasClass("full")){
               _item.html(html).addClass("full").attr("data-id",_code);
               break;
           }
       }

        if(!$(".search_comparepart").hasClass("show")){
           that.compareShowOrHide="1";
            $(".search_comparepart").slideDown().addClass("show");
        }
    }


    this.regEventLatelyViewHover=function () {
        $(document).delegate(".latelypart_content .view_item","mouseover",function () {
            $(this).addClass("hover");
        });
        $(document).delegate(".latelypart_content .view_item","mouseout",function () {
            $(this).removeClass("hover");
        });
    }

    this.regEventProHover=function () {
        $(document).delegate(".search_pro li","mouseover",function () {
            $(this).addClass("hover");
        });
        $(document).delegate(".search_pro li","mouseout",function () {
            $(this).removeClass("hover");
        });
    }

    this.checkPriceInput=function () {
        var priceLow = $("#lowprice_input").val().trim();
        var priceHigh = $("#highprice_input").val().trim();

        if(priceLow!="" && !/^\d+$/.test(priceLow)){
            alert("请输入合法的起始价格!");
            return false;
        }
        if(priceHigh!="" && !/^\d+$/.test(priceHigh)){
            alert("请输入合法的终止价格!");
            return false;
        }

        if(priceLow!=""  && priceHigh!="" &&  parseInt(priceHigh)<=parseInt(priceLow)){
            alert("价格区间输入错误!");
            return false;
        }

       return true;
    }

    this.regEventPriceSearch=function () {
        $(document).delegate("#btn_price_submit","click",function () {
            if(that.checkPriceInput()){
                $("#lowprice_show").val($("#lowprice_input").val());
                $("#highprice_show").val($("#highprice_input").val());
                $("#price_info_part").hide();
                that.pageIndex=1;
                that.loadDataByParamsForInit();
            }
        });
    }

    this.regEventPriceInputShow=function () {
        $(document).delegate(".priceshow_input","click",function () {
            $("#price_info_part").show();
        });
    }

    this.regProTypeCheckBoxChecked=function () {//-急速达，私人定制，分期付款，以旧换新选项部分
        $(document).delegate(".protype_checkbox a","click",function () {
           if($(this).hasClass("active")){
               $(this).removeClass("active");
           } else {
               $(this).addClass("active");
           }
           that.pageIndex=1;
           that.loadDataByParamsForInit();
        });
    }

    this.renderBusImg=function (data) {
        var _model;
        var _html="";
        var classInfo="";
        for(var i=0;i<data.length;i++){
            _model=data[i];
            if(i==2){
                classInfo="active";
            }else {
                classInfo="";
            }
            _html+='<a href="'+_model.detailURL +'" class="'+classInfo+'" target="_blank" class="bus_item">';
            _html+='<img src="'+_model.miniURL +'" class="small_img" data-type="small"/>';
            _html+='<img src="'+_model.picURL +'" class="large_img" data-type="large"/>';
            _html+='</a>';
        }
        _html+='<div class="clear"></div>';
        that.busImgContainer.html(_html);
        $("#search_buspart").show();
    }

    this.busImgInit=function () {
        $.ajax({
            url:"/search/v2/selLocation",
            type:"get",
            dataType:"json",
            data:{keyWord:that.globalKey},
            success:function (res) {
                res=eval("("+res+")");
                if(res.status && res.status=="success"){
                    if(res.data && res.data.length>0){
                        that.renderBusImg(res.data);
                    }
                }
            }
        });
    }

    this.regEventBusHover=function () {
        $(document).delegate(".search_buspart .buspart_content a","mouseover",function () {
            $(this).addClass("active").siblings().removeClass("active");
        });
        $(document).delegate(".search_buspart .buspart_content a","mouseout",function () {
            $(this).removeClass("active");
        });
        $(document).delegate(".search_buspart .buspart_content","mouseout",function () {
            $(".search_buspart .buspart_content a:eq(2)").addClass("active");
        });
    }


    this.regEventChangeSearchTap=function () {
        $(document).delegate(".search_tap ul li a","click",function () {
            if(!$(this).parent().hasClass("active")){
                window.location.href=$(this).attr("data-url")+"?key="+that.globalKey+$(this).attr("data-param");
            }
        });
    }

    this.selectAll = function(){
        $(".search_nav_con h1").css("cursor","pointer");
        $("body").delegate(".search_nav_con h1","click",function(){
            if(that.globalKey){
                window.location.href = $GRUNTCONFIG.PRODUCTION.lenovoSearchUrl+"?key="+encodeURIComponent(that.globalKey);
            }else{
                window.location.href = $GRUNTCONFIG.PRODUCTION.lenovoSearchUrl;
            }
        })
    }

    this.regCheckPriceNumber = function(){
        $("body").delegate(".le_low,.le_high","blur",function(e){
            var _span = $(this).parent().find("span.errorMsg");
            var fp = $(".le_sel.tab_list[tag=" + that.index + "]").find(".le_low").val().trim();
            var lp = $(".le_sel.tab_list[tag=" + that.index + "]").find(".le_high").val().trim();

            if(fp == "" && lp == ""){
                _span.hide().text("");
            }else if(fp != "" && lp == ""){
                if(!/^\d+$/.test(fp)){
                    _span.show().text("请输入合法的价格!");
                    //$(this).val("").focus();
                    return;
                }else{
                    _span.hide().text("");
                    $(this).val(parseInt(v));
                }
            }else if(fp == "" &&lp != ""){
                if(!/^\d+$/.test(lp)){
                    _span.show().text("请输入合法的价格!");
                    //$(this).val("").focus();
                    return;
                }else{
                    _span.hide().text("");
                    $(this).val(parseInt(v));
                }
            }else if(fp != "" &&lp != ""){
                if(!/^\d+$/.test(lp) || !/^\d+$/.test(fp)){
                    _span.show().text("请输入合法的价格!");
                    //$(this).val("").focus();
                    return;
                }else{
                    _span.hide().text("");
                    $(this).val(parseInt(v));
                }
            }
        })
    }

    function convertStar(num){
        num = parseFloat(num);
        return ((num*20)/100).toFixed(2)*100 + "%";
    }

    //获取文件名，无后缀
    function getFileName(o){
        var pos = o.lastIndexOf(".");
        return o.substring(0,pos);
    }

    //获取文件后缀
    function getFileextention(o) {
        var pos = o.lastIndexOf(".");
        return o.substring(pos);
    }

    this.filterHTMLTag = function (msg) {
        var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
        msg = msg.replace(/[|]*\n/, '') //去除行尾空格
        msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
        return msg;
    }

    this.googleAnylicsForProInit=function (_url,id,name,position,eventAction) {//加载产品时触发
        try{
            ga('ec:addImpression',{
                'id': id,
                'name': name,
                'list' : "SearchResultList",
                'position': position
            });
            ga('send', 'event', "SearchResultList_PC", eventAction, _url,{nonInteraction: true});
        }catch (e){}
    }

    //产品列表渲染方法
    this.render = function(data){
        this.container.html("");
        var html = "";
        for(var i =0;i<data.length;i++){

            var _tmp = "",img_url="//p1.lefile.cn/g1/M00/00/87/CmBZEFZgOc2ATUeIAAAJwF5r7O8764.jpg";
            if (document.URL.indexOf('s.lenovo.com.cn') > -1) {
                _tmp = $GRUNTCONFIG.PRODUCTION.lenovoDetail + data[i].code + ".html";
                if (data[i].detailType == "1") {
                    _tmp = $GRUNTCONFIG.PRODUCTION.thinkPadDetail + data[i].code + ".html";
                }
            }
            else {
                _tmp = $GRUNTCONFIG.UAT.lenovoDetail + data[i].code + ".html";
                if (data[i].detailType == "1") {
                    _tmp = $GRUNTCONFIG.UAT.thinkPadDetail + data[i].code + ".html";
                }
            }

            if (data[i].pcDetailUrl && $.trim(data[i].pcDetailUrl).length > 0) {//后端产生的url
                _tmp = data[i].pcDetailUrl;
            }

            that.googleAnylicsForProInit(_tmp,data[i].code,that.filterHTMLTag(data[i].name),(i+1),'SearchResultList_'+(i+1));

           /* if(data[i].mallType=="2"){//moto手机时img_url为后端返回的路径
             img_url=data[i].path?data[i].path:img_url;
             }else{
             img_url=data[i].path?"//p1.lefile.cn" + getFileName(data[i].path) + ".w160xh160" + getFileextention(data[i].path):img_url;
             }*/
            img_url=data[i].path?"//p1.lefile.cn" + getFileName(data[i].path) + ".w160xh160" + getFileextention(data[i].path):img_url;

            html += "<li>";
            html += "<a href='javascript://;' title='' latag='latag_pc_search_result_clickpic_"+data[i].code+"' class='search_pro_img pro_item_href' data-productId='"+data[i].code+"' data-productName='"+data[i].name+"' data-productPosition='"+(i+1)+"' data-eventAction='SearchResultList_"+(i+1)+"' data-eventLabel='"+_tmp+"'>";
            html += "<img style='cursor: pointer;' target='_blank' src='"+img_url+"' platid='"+data[i].goodsPlat+"' gcode='"+data[i].code+"' alt='' /></a>";

            html+="<div class='icons_mark'>";
            if(data[i].salesType=="98"){//极速到家
                html += "<i class='jisuda' title='极速到家'></i>";
            }
            if(data[i].isPersonal=="1"){//私人定制
                html += "<i class='sirendingzhi' title='私人定制'></i>";
            }
            if(data[i].isInstallment=="1"){//分期付款
                html += "<i class='fenqifukuan' title='分期付款'></i>";
            }
            if(data[i].isOldForNew=="1"){//以旧换新
                html += "<i class='yijiuhuanxin' title='以旧换新'></i>";
            }

            if (data[i].saleReduce == "1") {
                html += "<span class='lijian'>立减</span>";
            } else if (data[i].fullReduce == "1") {
                html += "<span class='manjian'>满减</span>";
            } else if (data[i].pcCoupon == "1") {
                html += "<span class='youhuiquan'>优惠券</span>";
            } else if (data[i].isGift == "1") {
                html += "<span class='zengpin'>赠品</span>";
            }else if (data[i].isOption == "1") {
                html += "<span class='xuanjiandashou'>选件搭售</span>";
            }else if (data[i].isPack == "1") {
                html += "<span class='xuanjiandashou'>套餐</span>";
            }
            html+="</div>";

            html+="<div class='search_pro_name'>";
            html += "<a class='pro_item_href' href='javascript://;' latag='latag_pc_search_result_clickname_"+data[i].code+"' style='cursor: pointer;' gcode='"+data[i].code+"' data-productId='"+data[i].code+"' data-productName='"+data[i].name+"' data-productPosition='"+(i+1)+"' data-eventAction='SearchResultList_"+(i+1)+"' data-eventLabel='"+_tmp+"'>"+data[i].name+"</a></div><div class='search_pro_mes'>";
            html += "<a target='_blank'>"+data[i].brief+"</a></div>";

            if (data[i].isShowPrice == "1") {
                html += "<div class='search_pro_price' style='font-size: 14px;'>￥" + (data[i].groupPrice?data[i].groupPrice: data[i].pcPrice) + "</div><div class='search_pro_comment clearfix'>";
            } else if (data[i].isShowPrice == "0") {
                html += "<div class='search_pro_price' style='font-size: 14px;'>暂无报价</div><div class='search_pro_comment clearfix'>";
            }

            html += "</div><div class='search_pro_btn clearfix'>";
           /* html += "<a href='javascript://;'  >时尚</a>";
            html += "<a href='javascript://;'  >超轻薄</a>";
            html += "<a href='javascript://;'  >待机时间长</a>";*/
            html += "</div>";
            /*if(data[i].mallType!="2"){
                if(that.compareProList.indexOf(data[i].code)>-1){
                    html += "<a href='javascript://;' data-gtype='"+data[i].goodsTypeId+"' data-id='"+data[i].code+"' data-title='"+data[i].name+"' data-price='￥" + (data[i].groupPrice?data[i].groupPrice: data[i].pcPrice) + "' class='btn_compare_select active' data-imgurl='"+(data[i].path?("//p1.lefile.cn" + getFileName(data[i].path) + ".w60xh42" + getFileextention(data[i].path)):"//p1.lefile.cn/g1/M00/00/87/CmBZEFZgOc2ATUeIAAAJwF5r7O8764.jpg")+"'><i></i><span>对比</span></a>";
                }else {
                    html += "<a href='javascript://;' data-gtype='"+data[i].goodsTypeId+"' data-id='"+data[i].code+"' data-title='"+data[i].name+"' data-price='￥" + (data[i].groupPrice?data[i].groupPrice: data[i].pcPrice) + "' class='btn_compare_select' data-imgurl='"+(data[i].path?("//p1.lefile.cn" + getFileName(data[i].path) + ".w60xh42" + getFileextention(data[i].path)):"//p1.lefile.cn/g1/M00/00/87/CmBZEFZgOc2ATUeIAAAJwF5r7O8764.jpg")+"'><i></i><span>对比</span></a>";
                }
            }*/
            if(that.compareProList.indexOf(data[i].code)>-1){
                html += "<a href='javascript://;' data-gtype='"+data[i].goodsTypeId+"' data-id='"+data[i].code+"' data-title='"+data[i].name+"' data-price='￥" + (data[i].groupPrice?data[i].groupPrice: data[i].pcPrice) + "' class='btn_compare_select active' data-imgurl='"+(data[i].path?("//p1.lefile.cn" + getFileName(data[i].path) + ".w60xh42" + getFileextention(data[i].path)):"//p1.lefile.cn/g1/M00/00/87/CmBZEFZgOc2ATUeIAAAJwF5r7O8764.jpg")+"'><i></i><span>对比</span></a>";
            }else {
                html += "<a href='javascript://;' data-gtype='"+data[i].goodsTypeId+"' data-id='"+data[i].code+"' data-title='"+data[i].name+"' data-price='￥" + (data[i].groupPrice?data[i].groupPrice: data[i].pcPrice) + "' class='btn_compare_select' data-imgurl='"+(data[i].path?("//p1.lefile.cn" + getFileName(data[i].path) + ".w60xh42" + getFileextention(data[i].path)):"//p1.lefile.cn/g1/M00/00/87/CmBZEFZgOc2ATUeIAAAJwF5r7O8764.jpg")+"'><i></i><span>对比</span></a>";
            }
            html += "</li>";
        }
        $(this.container).append($(html));
    }


    this.regEventProItemClickForGoogle=function () {//点击产品时触发
        $(document).delegate("a.pro_item_href","click",function () {
            var _url=$(this).attr("data-eventLabel");
            try{
                ga('ec:addProduct', {
                    'id': $(this).attr("data-productId"),
                    'name': that.filterHTMLTag($(this).attr("data-productName")),
                    'position': $(this).attr("data-productPosition")
                });
                ga('ec:setAction', 'click', {list: "SearchResultList"});
                ga('send', 'event', "SearchResultList_PC", $(this).attr("data-eventAction"), _url);
            }catch (e){}
            window.open(_url);
        });
    }



    //产品列表渲染方法
    this.renderForEmpty = function (data) {
        var html = "";
        for (var i = 0; i < data.length; i++) {

            var _tmp = "";
            if (document.URL.indexOf('s.lenovo.com.cn') > -1) {
                _tmp = $GRUNTCONFIG.PRODUCTION.lenovoDetail + data[i].code + ".html";
                if (data[i].detailType == "1") {
                    _tmp = $GRUNTCONFIG.PRODUCTION.thinkPadDetail + data[i].code + ".html";
                }
            }
            else {
                _tmp = $GRUNTCONFIG.UAT.lenovoDetail + data[i].code + ".html";
                if (data[i].detailType == "1") {
                    _tmp = $GRUNTCONFIG.UAT.thinkPadDetail + data[i].code + ".html";
                }
            }

            if (data[i].pcDetailUrl && $.trim(data[i].pcDetailUrl).length > 0) {//后端产生的url
                _tmp = data[i].pcDetailUrl;
            }

            html += "<li>";
            html += "<a href='" + _tmp + "' target='_blank' title='' latag='latag_pc_search_result_clickpic_" + data[i].code + "' class='search_pro_img'>";
            if (data[i].path) {
                html += "<img style='cursor: pointer;' target='_blank' src='//p1.lefile.cn" + getFileName(data[i].path) + ".w160xh160" + getFileextention(data[i].path) + "' gcode='" + data[i].code + "' platid='" + data[i].goodsPlat + "' alt='' /></a>";
            } else {
                html += "<img style='cursor: pointer;' target='_blank' src='//p1.lefile.cn/g1/M00/00/87/CmBZEFZgOc2ATUeIAAAJwF5r7O8764.jpg' platid='" + data[i].goodsPlat + "' gcode='" + data[i].code + "' alt='' /></a>";
            }

            html+="<div class='search_pro_name'>";
            html += "<a href='" + _tmp + "' latag='latag_pc_search_result_clickname_" + data[i].code + "' target='_blank' style='cursor: pointer;' gcode='" + data[i].code + "'>" + data[i].name + "</a></div>";
            if (data[i].isShowPrice == "1") {
                html += "<div class='search_pro_price' style='font-size: 14px;'>￥" + (data[i].groupPrice?data[i].groupPrice:data[i].pcPrice) + "</div><div class='search_pro_comment clearfix'></div>";
            } else if (data[i].isShowPrice == "0") {
                html += "<div class='search_pro_price' style='font-size: 14px;'>暂无报价</div><div class='search_pro_comment clearfix'></div>";
            }
            html += "</li>";
        }
        $(".noresult_sugguest ul").html(html);
    }



    this.addCartEvent = function(){
        $("body").delegate("a[tag=addCart]","click",function(){
            var _self = this;
            var mallType = $(this).attr("mallType");
            var detailType = $(this).attr("detailType");
            var activityType = $(this).attr("activityType");
            var isOldForNew = $(this).attr("isOldForNew");

            if ($(this).attr("salestype") == "0" && activityType == "0" && isOldForNew == "0") {
                var addUrl = "";
                //if (mallType == "2") {
                //    if (document.URL.indexOf('s.lenovo.com.cn') > -1) {
                //        addUrl = $GRUNTCONFIG.PRODUCTION.thinkCartUrl;
                //    } else {
                //        addUrl = $GRUNTCONFIG.UAT.thinkCartUrl;
                //    }
                //}
                //else {
                //    if (document.URL.indexOf('s.lenovo.com.cn') > -1) {
                //        addUrl = $GRUNTCONFIG.PRODUCTION.lenovoCartUrl;
                //    } else {
                //        addUrl = $GRUNTCONFIG.UAT.lenovoCartUrl;
                //    }
                //}
                if (document.URL.indexOf('s.lenovo.com.cn') > -1) {
                    addUrl = $GRUNTCONFIG.PRODUCTION.lenovoCartUrl;
                } else {
                    addUrl = $GRUNTCONFIG.UAT.lenovoCartUrl;
                }

                $.ajax({
                    type: "GET",
                    url: addUrl + "additemtocart.jhtml?ran=" + new Date().getMilliseconds(),
                    data: {
                        itemtype: 0,
                        gcodes: $(_self).attr("gcode"),
                        icount: 1
                    },
                    dataType: "jsonp",
                    jsonp: 'callbackparam',
                    success: function (data) {
                        if (data.rc == 0) {
                            if (addUrl == "") {
                                return;
                            }
                            window.location.href = addUrl + "getcart.jhtml?plat=" + that.plat;
                        }
                    }
                })

            }else{
                if (detailType == "1") {
                    if (document.URL.indexOf('s.lenovo.com.cn') > -1) {
                        window.location.href = $GRUNTCONFIG.PRODUCTION.thinkPadDetail + $(this).attr("gcode") + ".html";
                    }
                    else {
                        window.location.href = $GRUNTCONFIG.UAT.thinkPadDetail + $(this).attr("gcode") + ".html";
                    }

                    //window.location.href = $GRUNTCONFIG.PRODUCTION.thinkPadDetail + $(this).attr("gcode") + ".html";
                }
                else {
                    if (document.URL.indexOf('s.lenovo.com.cn') > -1) {
                        window.location.href = $GRUNTCONFIG.PRODUCTION.lenovoDetail + $(this).attr("gcode") + ".html";
                    }
                    else {
                        window.location.href = $GRUNTCONFIG.UAT.lenovoDetail + $(this).attr("gcode") + ".html";
                    }
                }
            }
        })
    }

    this.productDetail = function(){
        $("body").delegate("[tag=detail]","click",function(){
            var plat = $(this).attr("platid");
            var gcode = $(this).attr("gcode");
            if(plat == "8"){
                window.location.href = $GRUNTCONFIG.PRODUCTION.thinkPadDetail + gcode + ".html";
            }else{
                window.location.href = $GRUNTCONFIG.PRODUCTION.lenovoDetail + gcode + ".html";
            }
        });
    }

    this.innerKeyEvent = function(){
        $("body").delegate("#searchproductsButton","click",function(){
            if($(this).val().trim() == ""){
                return;
            }
            else{
                $("span[pageindextag=pageIndex]").text(1);
                that.pageIndex = 1;
                that.loadDataByParams();
            }
        });
    }

    function resetPageIndex(){
        $("span[pageindextag=pageIndex]").text(1);
        $("#keyInResult").val("");
        that.pageIndex = 1;
    }

    this.setType = function () {//设置分类
        if ($.trim(that._type) == "") {
            that._type = $(".le_sel.tab_list").attr("tag");
        }
    }

    this.getPriceInfo=function () {
        var low_price="0",high_price="*";
        if($("#lowprice_show") && $.trim($("#lowprice_show").val())!=""){
            low_price=$.trim($("#lowprice_show").val());
        }
        if($("#highprice_show") && $.trim($("#highprice_show").val())!=""){
            high_price=$.trim($("#highprice_show").val());
        }
        return low_price+"-"+high_price;
    }

    this.getParameters = function () {
        var result = getItemsParams();
        var data = {
            couponId:that.couponId,
            specifiedType: 0,
            shopid: 1,
            key: that.globalKey,
            innerKey: encodeURIComponent( $("#keyInResult").val()),
            filterV2: result.items,
            stort: that.sortNumber,
            cat: that._type,
            page: that.pageIndex,
            pageSize: that.pageSize,
            isStock: $("#checkStock").get(0).checked,
            isOnlyPurchase:$("#checkIsVip").get(0).checked,
            leid: getLeid(),
            plat: 4,
            isO2O:$("#filter_jisuda")?$("#filter_jisuda").hasClass("active"):false,//极速达
            isPersonal:$("#filter_sirendingzhi")?$("#filter_sirendingzhi").hasClass("active"):false,//私人订制
            isInstallment:$("#filter_fenqifukuan")?$("#filter_fenqifukuan").hasClass("active"):false,//分期付款
            isOldForNew:$("#filter_yijiuhuanxin")?$("#filter_yijiuhuanxin").hasClass("active"):false,//以旧换新
            price:that.getPriceInfo(),//价格区间
            unfold:that.unfold,
            typeId:that.pro_type,
            needCorrect:that.needCorrect
        }
        return data;
    }

    this.loadDataByParams = function () {
        var url = "/search/v2";
        var data = that.getParameters();
        data.refresh = false;
        $.ajax({
            url: url,
            type: "get",
            data: data,
            dataType: "json",
            //async: false,
            success: function (d) {
                d = eval("("+d+")");
                if(d.rc != "0"){
                    $("#pager").hide();
                    $("#searchProCount").text(0);
                    $("span[pageCountTag=pageCount]").text(1);
                    $("span[pageindextag=pageIndex]").text(1);
                    that.container.html("<h1 style='margin-left: 10px;text-align: center;color: red;padding-bottom: 30px;'>服务器异常，工程师正在努力排查中....</h1>");
                    return;
                }

                //$("div.tab_body").html(d.filter);//过滤条件

                if(d.items.length == 0){
                    $("#pager").hide();
                    $("#searchProCount").text(0);
                    $("span[pageCountTag=pageCount]").text(1);
                    that.container.html("<h1 style='margin-left: 10px;text-align: center;color: red;padding-bottom: 30px;'>抱歉，没有找到相关的商品！</h1>");
                    return;
                }
                that.render(d.items);

                that.allPageCount = d.totalNum;
                that.pageBind();
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#pager").hide();
                that.container.html("<h1 style='margin-left: 10px;text-align: center;color: red;padding-bottom: 30px;'>出错啦，工程师正在努力解决中....</h1>");
            }
        })
    }


    this.loadDataByParamsForInit = function () {
        var url = "/search/v2";
        var data = that.getParameters();
        //data.filterV2 = that.filtersForInit;
        data.refresh = true;

        $.ajax({
            url: url,
            type: "get",
            data: data,
            dataType: "json",
            async: false,
            success: function (d) {
                d = eval("(" + d + ")");
                if (d.rc != "0") {
                    $("#pager").hide();
                    $("#searchProCount").text(0);
                    $("span[pageCountTag=pageCount]").text(1);
                    $("span[pageindextag=pageIndex]").text(1);
                    that.container.html("<h1 style='margin-left: 10px;text-align: center;color: red;padding-bottom: 30px;'>服务器异常，工程师正在努力排查中....</h1>");
                    $(".search_tab,.hot_container").show();
                    return;
                }

                //$(".search_result_nav").html(that.setSearchResultNav(d.crumb, d.crumbIndex));//搜索条件导航
                $("div.tab_body").html(d.filter);//过滤条件

                if (d.items.length == 0 || d.totalNum == 0) {
                    $("#pager").hide();
                    $("#searchProCount").text(0);
                    $("span[pageCountTag=pageCount]").text(1);
                    that.container.html("<h1 style='margin-left: 10px;text-align: center;color: red;padding-bottom: 30px;'>抱歉，没有找到相关的商品！</h1>");
                    $(".search_tab,.hot_container").show();

                    that.setLeaveSeries();
                    return;
                }
                $(".search_tab,.hot_container").show();
                that.render(d.items);

                that.allPageCount = d.totalNum;
                that.pageBind();

                $(".searchCount").text(d.totalNum);
                that.setLeaveSeries();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#pager").hide();
                that.container.html("<h1 style='margin-left: 10px;text-align: center;color: red;padding-bottom: 30px;'>出错啦，工程师正在努力解决中....</h1>");
                $(".search_tab,.hot_container").show();
            }
        });
    }


    this.loadDataByParamsForFistInit = function () {
        var url = "/search/v2";
        var data = that.getParameters();
        //data.filterV2 = that.filtersForInit;
        data.refresh = true;

        $.ajax({
            url: url,
            type: "get",
            data: data,
            dataType: "json",
            async: false,
            success: function (d) {
                d = eval("(" + d + ")");
                if (d.rc != "0") {
                    $("#searchProCount").text(0);
                    $("span[pageCountTag=pageCount]").text(1);
                    $("span[pageindextag=pageIndex]").text(1);
                    that.container.html("<h1 style='margin-left: 10px;text-align: center;color: red;padding-bottom: 30px;'>服务器异常，工程师正在努力排查中....</h1>");
                    $(".search_tab,.hot_container").show();
                    return;
                }

                $(".search_result_nav").html(that.setSearchResultNav(d.crumb, d.crumbIndex));//搜索条件导航
                $("div.tab_body").html(d.filter);//过滤条件

                if(that.needCorrect && d.redirectKey && d.redirectKey.length>0){//是否纠错
                    $("#wrong_key").html(d.redirectKey);
                    $("#wrong_direct_key").html(that.globalKey);
                    $("div.direct_wordinfo").show();
                }

                if (d.items.length == 0 || d.totalNum == 0) {
                    if (that.index == "") {
                        var resultType = d.resultType;
                        var emptyTitle = "抱歉！没有找到与<span>" + that.globalKey + "</span>相关的商品，您可以看看联想商城正在热卖的商品：";
                        if (resultType == "1") {
                            emptyTitle = that.globalKey + "商品正在赶来的路上... 去 <a href='http://www.zuk.com/store/?hmsr=lenovosearch' target='_blank'>手机商城</a> 查看 或者 看看联想商城正在热卖的商品："
                        } else if (resultType == "0") {
                            if (that.globalKey == "昭阳") {
                                emptyTitle = that.globalKey + "商品正在赶来的路上... 去 <a href='http://appserver.lenovo.com.cn/Lenovo_Brand_List.aspx?CategoryID=14' target='_blank'>联想产品库</a> 查看 或者 看看联想商城正在热卖的商品："
                            } else if (that.globalKey == "扬天") {
                                emptyTitle = that.globalKey + "商品正在赶来的路上... 去 <a href='http://appserver.lenovo.com.cn/Lenovo_Brand_List.aspx?CategoryID=10' target='_blank'>联想产品库</a> 查看 或者 看看联想商城正在热卖的商品："
                            } else if (that.globalKey == "启天") {
                                emptyTitle = that.globalKey + "商品正在赶来的路上... 去 <a href='http://appserver.lenovo.com.cn/Lenovo_Brand_List.aspx?CategoryID=16' target='_blank'>联想产品库</a> 查看 或者 看看联想商城正在热卖的商品："
                            } else if (that.globalKey == "ThinkStation") {
                                emptyTitle = that.globalKey + "商品正在赶来的路上... 去 <a href='http://appserver.lenovo.com.cn/Lenovo_Brand_List.aspx?CategoryID=11' target='_blank'>联想产品库</a> 查看 或者 看看联想商城正在热卖的商品："
                            }
                        }

                        $(".search_nolist .noresut_tipinfo").html(emptyTitle);

                        $.ajax({
                            url: "/search/selHotGoods",
                            type: "get",
                            dataType: "json",
                            data: { plat: 4, resultType: resultType },
                            success: function (res) {
                                res = eval("(" + res + ")");
                                if (res.rc == 0) {
                                    if (res.items.length > 0) {
                                        that.renderForEmpty(res.items);
                                    }
                                }
                            }
                        });

                        $(".search_nolist").show();
                    } else {
                        $("#searchProCount").text(0);
                        $("span[pageCountTag=pageCount]").text(1);
                        that.container.html("<h1 style='margin-left: 10px;text-align: center;color: red;padding-bottom: 30px;'>抱歉，没有找到相关的商品！</h1>");
                        $(".search_tab,.hot_container").show();
                        return;
                    }
                    that.setLeaveSeries();
                    return;
                }
                $(".search_tab,.hot_container").show();
                that.render(d.items);

                if(d.hasOwnPurchase && d.hasOwnPurchase==1){
                    $("label.isvip").show();
                }

                that.allPageCount = d.totalNum;
                that.pageBind();

                $(".searchCount").text(d.totalNum);
                that.setLeaveSeries();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                that.container.html("<h1 style='margin-left: 10px;text-align: center;color: red;padding-bottom: 30px;'>出错啦，工程师正在努力解决中....</h1>");
                $(".search_tab,.hot_container").show();
            }
        });
    }


    this.setSearchResultNav = function (crumbname, crumbIndex) {
        var html = ">";
        var split_str=">";
        if (crumbname && crumbIndex && crumbname!="null" && crumbIndex!="null"  &&  $.trim(crumbname) != "" && $.trim(crumbIndex) != "") {
            var crumbname_list =crumbname.indexOf(";")>-1? crumbname.split(";"): crumbname.split(">");
            split_str=crumbname.indexOf(";")>-1?";":split_str;
            var crumbindex_list = crumbIndex.split(",");
            if (crumbindex_list.length > 0 && crumbname_list.length > 0) {
                for (var i = 0; i < crumbindex_list.length ; i++) {
                    html += "<a href='/?index=" + crumbindex_list[i] + "&destination="+that.destination+"&key=" + that.globalKey + that.getFromPageParm() + that.getUrlParmInfo("needCorrect") +"'>" + crumbname_list[i] + "</a>"+split_str;
                }
                //html += crumbname_list[crumbname_list.length - 1] + ">";
            }
        }
        if (that.globalKey != "") {
            html += '"' + that.globalKey + '"';
        } else {
            if (html != ">") {
                html = html.substring(0, html.length - 1);
            }

        }

        if (html == ">") {
            html = "";
        }

        return html;
    }


    this.checkParamsValid = function(key){
        var bl = false;
        var container = getCurrentSeriesContainer();
        container.find("div.le_sel_con1").each(function(){
            if(key == $(this).attr("data-type")){
                bl = true;
                return false;
            }
        })
        return bl;
    }


    this.setFiltersForInit = function () {
        var url = window.location.href;
        if (url.indexOf('?') == -1) return;
        var params = url.substring(url.indexOf('?') + 1).split('&');
        var parameters = "";
        for (var i = 0; i < params.length; i++) {
            var key = params[i].split('=')[0];
            if (key && key != "index" && key != "key" && key != "from" && key != "fromoldsearch" && key != "fromhomepage" && key != "frompage" && key !="needCorrect" && key !="destination" && key!="pro_type" && key!="couponId") {
                that.filterArr.push(that.getParamsFromUrlForInit(key, decodeURIComponent(params[i].split('=')[1])));
                //this.appendSelectToContainer(el);
            }
        }
    }

    this.getParamsFromUrlForInit = function (key, val) {
        var keyVal = key + ":" + val.replace(/\|/g, ",");
        return keyVal;
    }


    this.fixPosition = function(){
        //var url = window.location.href;
        //if(url.indexOf('?')==-1) return;
        //var params = url.substring(url.indexOf('?')+1).split('&');
        //for(var i=0;i<params.length;i++){
        //    var key = params[i].split('=')[0];
        //    if (key && key != "index" && key != "key" && key != "from" && key != "fromoldsearch" && this.checkParamsValid(key)) {
        //        var el = getDefaultParamsFromUrl(key,decodeURIComponent(params[i].split('=')[1]));
        //        //this.appendSelectToContainer(el);
        //    }
        //}

        var url = window.location.href;
        if(url.indexOf('?')==-1) return;
        var params = url.substring(url.indexOf('?') + 1).split('&');
        for(var i=0;i<params.length;i++){
            var key = params[i].split('=')[0];
            if (key && key != "index" && key != "key" && key != "from" && key != "fromoldsearch" && key != "fromhomepage" && key != "frompage" && key !="needCorrect"  && key !="destination" && key!="pro_type" && key!="couponId") {
                var el = that.getDefaultParamsFromUrl(key, decodeURIComponent(params[i].split('=')[1])) + "@";
                //this.appendSelectToContainer(el);
            }
        }
    }

    this.getDefaultParamsFromUrl=function(key, val) {
        if(key == that.from || val == "undefined"){
            return;
        }
        var vals = [];
        if(val.indexOf('^') == -1){
            vals.push(val);
        }
        else{
            vals = val.split('^');
        }

        var serType = "";
        //根据name获取value
        var _cval = [];
        var container = $(".tab_body").find("div.tab_list");
        $("div.tab_list li.clearfix").each(function () {
            if (key == $(this).find("div.le_sel_con1").attr("data-type")) {
                serType = $(this).find("div.le_sel_con1").attr("data-name")
                $(this).find("div.le_sel_con2 a").each(function () {
                    _cval.push({ key: $(this).attr("data-name"), val: $(this).attr("data-value") });
                })
            }
        });
        var str = [];
        for(var i=0;i<vals.length;i++){
            for (var j = 0; j < _cval.length; j++) {
                if (_cval[j].val == vals[i].replace(/\|/g, "^")) {
                    str.push(_cval[j].key);
                }
            }
        }

        //append to container
        var keyVal = key + ":" + val.replace(/\|/g, "^");
        var html = "";
        if (val.indexOf("~") > -1) {
            html = "<a title='" + str.join(',') + "' class='le_clickdel seriesCls' data-key='" + keyVal + "'>";
            html += "<span>价格：</span><em>" + val + "元</em><i tag='delSelected'></i></a>";
        } else {
            html = "<a title='" + str.join(',') + "' class='le_clickdel seriesCls' data-key='" + keyVal + "'>";
            html += "<span>" + serType + "：</span><em>" + str.unique().join(',') + "</em><i tag='delSelected'></i></a>";
        }
        var el = container;
        el.find("li.le_sel_line1").show();
        el.find("li.le_sel_line1 div.le_sel_con2").prepend($(html));

        //hide this series
        el.find("li.clearfix").each(function(){
            if($(this).find("div.le_sel_con1").attr("data-type") == key){
                $(this).hide();
            }
        })
    }

    function getCurrentSeriesContainer(){
        var el  = null;
        $(".tab_list").each(function(){
            if($(this).css("display") == "block"){
                el = $(this);
                return false;
            }
        })
        return el;
    }

    function resetFavoriteClass(data){
        $("#productList").find("a[favtag=1]").each(function(i){
            if(data[i].rc == "0"){
                $(this).addClass("active");
            }
        })
    }

    function getgCode(data){
        var res = [];
        for(var i=0;i<data.length;i++){
            res.push(data[i].code);
        }
        return res;
    }
}


$(function () {
    var ctl = new searchController();
    ctl.init();
});


