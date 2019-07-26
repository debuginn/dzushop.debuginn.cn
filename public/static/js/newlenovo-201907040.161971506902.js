
var cookieTool = {
    unCkProList:[],
    cookieKey:"pro_list_1",
    arrUnique:function(arr){
        var hash=[];
        for (var i = 0; i < arr.length; i++) {
            if(hash.indexOf(arr[i])==-1){
                hash.push(arr[i]);
            }
        }
        return hash;
    },
    removeCookie:function(name){
        this.setCookie(name,"",new Date(0));
    },
    getCookie:function(name){
        var cookie = document.cookie;
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = cookie.indexOf(cookieName),
            cookieValue = null;
        if(cookieStart > -1){
            var cookieEnd = cookie.indexOf(';',cookieStart);
            if(cookieEnd == -1){
                cookieEnd = cookie.length;
            }
            cookieValue = decodeURIComponent(cookie.substring(cookieStart + cookieName.length,cookieEnd));
        }
        return cookieValue;
    },
    setCookie:function(name,value,expires){
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if(expires instanceof Date){
            cookieText += "; expires=" + expires.toGMTString();
        }
        document.cookie = cookieText+";path=/;domain="+document.domain;
    },
    setGoodsSelect:function(code,title,imgurl,price,type,detailUrl){
        var goods = this.getCookie(this.cookieKey);
        var str = code+"|"+title+"|"+price+"|"+imgurl+"|"+type+"|"+detailUrl;
        if(goods){
            goods = goods + "," + str;
        }else{
            goods = str;
        }
        this.setCookie(this.cookieKey,goods);
        this.renderCompareList();
    },
    removeGoodsSelect:function(code){
        var goods = this.getCookie(this.cookieKey);
        if(goods){
            var res = [];
            var tmp = goods.split(',');
            for(var i =0;i< tmp.length;i++){
                if(code != tmp[i].split('|')[0]){
                    res.push(tmp[i]);
                }
            }
            if(res.length == 0){
                this.removeCookie(this.cookieKey);
            }else{
                this.setCookie(this.cookieKey,res.join(','));
            }
        }
        this.renderCompareList();
    },
    removeProListChecked:function(code){
        if(code){
            $("#searchContentContainer ul.productDetailUl li a.btn_compare_select").each(function(){
                var _code = $(this).attr("data-id");
                if(code == _code){
                    $(this).removeClass("active");
                }
            })
        }else{
            $("#searchContentContainer ul.productDetailUl li a.btn_compare_select").each(function(){
                $(this).removeClass("active");
            })
        }
    },
    getCompareFilter:function(){
        var res = {flag:false,goodsIds:[],gType:""};
        var selectedCount = 0;
        $("#compare_pro_list .full span.isCommont").each(function(){
            if($(this).hasClass("selectSame")){
                selectedCount++;
            }
        });

        if(selectedCount <=1){
            return res;
        }
        //获取选中商品的gtypes进行去重
        var gTypes = [];
        $("#compare_pro_list .full").each(function(){
            if($(this).find("span.isCommont").hasClass("selectSame")){
                gTypes.push($(this).attr("data-gtype"));
            }
        })
        var types = this.arrUnique(gTypes);
        //如果选中商品的类型一样
        if(types.length == 1){
            $("#compare_pro_list .full").each(function(){
                if($(this).find("span.isCommont").hasClass("selectSame")){
                    res.goodsIds.push($(this).attr("data-id"));
                }
            })
            res.gType = types[0];
            res.flag = true;
        }else{
            res = {flag:false,goodsIds:[],gType:""};
        }
        return res;
    },
    renderSpace:function(len){
        var noProHtml = "";
        if(len == 4){
            for(var i = 0;i< len;i++){
                noProHtml += "<div class='pro_item'>";
                noProHtml += "<div class='has_no'>";
                noProHtml += "<span class='pro_order'>"+( i+1 )+"</span>";//2,
                noProHtml += "<span class='order_desc'>您还可以继续添加</span></div></div>";
            }
        }else{
            var goods = this.getCookie(this.cookieKey);
            var tmp = goods.split(',');
            for(var i = len;i>0;i--){
                noProHtml += "<div class='pro_item'>";
                noProHtml += "<div class='has_no'>";
                noProHtml += "<span class='pro_order'>"+(len - i + tmp.length + 1)+"</span>";//2,
                noProHtml += "<span class='order_desc'>您还可以继续添加</span></div></div>";
            }
        }
        
        $("#compare_pro_list").append($(noProHtml));
        
    },
    renderCompareList:function(){
        var goods = this.getCookie(this.cookieKey);
        $("#compare_pro_list").html("");
        if(goods){
            var prohtml = "";
            var tmp = goods.split(',');
            for(var i =0;i< tmp.length;i++){
                var sTmp = tmp[i].split('|');
                prohtml += "<div class='pro_item full' data-gtype='"+sTmp[4]+"' data-id='"+sTmp[0]+"'>";
                prohtml += "<div class='has_pro'>";
                //如果在未选中商品列表里面
                if(this.unCkProList.indexOf(sTmp[0]) != -1){
                    prohtml += "<span class='isCommont'></span>";
                }else{
                    prohtml += "<span class='isCommont selectSame'></span>";
                }
                prohtml += "<div class='pro_img'>";
                prohtml += "<img src='"+sTmp[3]+"'></div>";
                prohtml += "<div class='pro_desc'>";
                var detailUrl = sTmp[5]?sTmp[5]:"#";
                prohtml += "<p class='pro_title'><a latag='latag_pc_search_对比_对比栏_"+i+"_"+sTmp[1]+"' target='_blank' href='"+detailUrl+"'>"+sTmp[1]+"</a></p>";
                prohtml += "<p class='pro_price'><span>"+sTmp[2]+"</span>";
                prohtml += "<a class='btn_removecompareitem' latag='latag_pc_search_对比_对比栏_删除' data-code='"+sTmp[0]+"' style='display: none;'>删除</a>";
                prohtml += "</p></div><div class='clear'></div></div></div>";
            }
            $("#compare_pro_list").append($(prohtml));

            if(tmp.length<4){
                var len = 4 - tmp.length;
                this.renderSpace(len);
            }
        }else{
            this.renderSpace(4);
        }
    },
    //记录对比列表里面未选中的商品, 数据改变的时候控制渲染的选中状态
    getUnCkProList:function(isClear){
        //清空
        cookieTool.unCkProList = [];
        if(isClear){
            this.unCkProList = [];
            return;
        }
        $("#compare_pro_list div.full").each(function(){
            if($(this).find("span.isCommont").hasClass('selectSame') == false){
                cookieTool.unCkProList.push($(this).attr("data-id"));
            }
        })
        console.log(cookieTool.unCkProList);
    },
    setCurOptclass:function(){
        var curType = lenovo_search_tool.getUrlParam("type");
        var curYears = lenovo_search_tool.getUrlParam("years");
        var oprationListDom = $(".oprationList li[tag="+curType+"]");
        var yearsListDom = $(".years li[tag="+curYears+"] a");
        $(oprationListDom).addClass("active");
        $(yearsListDom).addClass("selectYears");
    }
}

var lenovo_search_tool = {
    getUrlParam:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r!=null) return unescape(r[2]); return null; //返回参数值
    },
    getUrlParams: function (val) {
        var res = {domain: "", params: []};
        var result = val.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));

        res.domain = val.substring(0, val.indexOf('?'));
        if (result == null) {
            res.params = [];
        }
        if (result) {
            for (var i = 0; i < result.length; i++) {
                result[i] = result[i].substring(1);
            }
            res.params = result;
        }
        return res;
    },
    setNewParamsByName: function (url, name, value) {
        var info = this.getUrlParams(url);
        var params = info.params;
        if (params.length == 0) {
            params = [name + "=" + value];
        } else {
            var exist = false;
            for (var index = 0; index < params.length; index++) {
                var key = params[index].split('=')[0];
                if (name == key) {
                    params[index] = key + "=" + value;
                    exist = true;
                    break;
                }
            }
            if (exist == false) {
                params.push(name + "=" + value);
            }
        }

        var res = "?" + params.join('&');
        return res;
    },
    pushHistory: function (newParamsStr) {
        window.history.pushState(null, null, newParamsStr);
    },
    sendAjax: function () {
        var params = lenovo_search_tool.getUrlParams(window.location.href).params;
        $.ajax({
            url: "/search/?productOnly=true&" + params.join('&'),
            success: function (d) {
                if (d) {
                    $("#searchContentContainer").html(d);
                } else {
                    $("#searchContentContainer").html("亲~没有找到相关商品，请重新输入搜索条件");
                }
            },
            error: function (error) {
                $("#searchContentContainer").html("<div style='text-align: center;padding: 40px 0px 40px 25px;background-color: #f2f2f2;color: #333333;font-size: 16px;line-height: normal;'>服务器异常，程序员小哥哥正在紧急处理，请稍后再试！</div>");
            }
        })
    },
    view: {
        clearActiveCls: function () {
            $("div.headNav li").each(function (index, item) {
                if (index < 4) {
                    $(this).removeClass("active");
                }
            })
        },
        checkFilterExist: function () {
            var params = lenovo_search_tool.getUrlParams(window.location.href).params;
            var res = {exist: false, val: ""};
            for (let index = 0; index < params.length; index++) {
                if (params[index].split('=')[0] == "filter") {
                    res.exist = true;
                    res.val = params[index].split('=')[1];
                    break;
                }
            }
            return res;
        },
        bindEvent: function () {

            //查看得分计算详情
            $("body").on("click",".scoreDetailBtn",function(){
                $(this).parent().siblings("div.scoreDetail").show();
            });
            $("body").on("click",".scoreDetail",function(){
                $(this).hide();
            })


            //推荐，新品，评论数 key = sorter
            $("body").on("click", "div.headNav li[tag=sorter]", function () {
                if ($(this).hasClass("active")) {
                    return;
                }
                lenovo_search_tool.view.clearActiveCls();
                $(this).addClass("active");

                var newParams = lenovo_search_tool.setNewParamsByName(window.location.href, "sorter", $(this).attr("value"));
                lenovo_search_tool.pushHistory(newParams);

                lenovo_search_tool.sendAjax();
            })

            //价格   key = sorter  3：降序(default)，4：升序
            $("body").on("click","div.headNav li[tag=sorter1]",function(){
                lenovo_search_tool.view.clearActiveCls();
                var newParams = lenovo_search_tool.setNewParamsByName(window.location.href,"sorter",$(this).attr("value"));
                lenovo_search_tool.pushHistory(newParams);
                lenovo_search_tool.sendAjax();

            })

            //过滤用户输入非法字符
            $("body").on("blur", "#startPrice", function () {                
                var bp = $("#startPrice").val();   
                bp=bp.replace(/[^\d.]/g,'');
                $("#startPrice").val(bp);          
            })

            $("body").on("blur", "#endPrice", function () {                
                var bp = $("#endPrice").val();   
                bp=bp.replace(/[^\d.]/g,'');
                $("#endPrice").val(bp);          
            })

            //条件输入
            $("body").on("click", "#enterButton", function () {
                var price = "";
                var bp = $("#startPrice").val();
                var ep = $("#endPrice").val();
                if (bp == "" && ep == "") {
                    price = "";
                } else {
                    price = bp + "-" + ep;
                }
                var newParams = lenovo_search_tool.setNewParamsByName(window.location.href, "price", price);
                lenovo_search_tool.pushHistory(newParams);

                newParams = lenovo_search_tool.setNewParamsByName(window.location.href, "innerKey", encodeURIComponent($("#innerKey").val()));
                lenovo_search_tool.pushHistory(newParams);

                lenovo_search_tool.sendAjax();
            })

            //急速到家，私人订制，分期付款，以旧换新
            $("body").on("click", "div.headNav span[tag=sorter2]", function () {
                var key = $(this).attr("value");
                var value = false;
                if ($(this).hasClass("checked")) {
                    $(this).removeClass("checked");
                    value = "";
                } else {
                    $(this).addClass("checked");
                    value = "true";
                }

                var newParams = lenovo_search_tool.setNewParamsByName(window.location.href, key, value);
                lenovo_search_tool.pushHistory(newParams);

                lenovo_search_tool.sendAjax();
            })

            //库存，内购
            $("body").on("click", "div.headNav input[type=checkbox][tag=sorter3]", function () {
                var key = $(this).attr("value");

                var newParams = lenovo_search_tool.setNewParamsByName(window.location.href, key, $(this).get(0).checked ? "true" : "");
                lenovo_search_tool.pushHistory(newParams);

                lenovo_search_tool.sendAjax();
            })

            //filter save button
            $("ul[tag=danxuanUl]").on("click", "input[type=button][tag=filterButton]", function () {
                var nextul = $(this).parents("ul.duoxuanBox");
                var ulParent = $(this).parents("ul.duoxuanUl");
                if(nextul.length != 0){
                    ulParent = nextul;
                }

                // var ulParent = $(this).parents("ul.duoxuanUl");
                var key = ulParent.attr("value");
                var res = [];
                ulParent.find("li.multipleSelected").each(function () {
                    res.push($(this).attr("value"));
                })
                var value = key + ":" + res.join(',');

                var resFilter = lenovo_search_tool.view.checkFilterExist();
                if (resFilter.exist) {
                    value = resFilter.val + "@" + value;
                }

                var newParams = lenovo_search_tool.setNewParamsByName(window.location.href, "filter", value);
                lenovo_search_tool.pushHistory(newParams);

                lenovo_search_tool.pushHistory(lenovo_search_tool.setNewParamsByName(window.location.href, "page", ""));
                window.location.href = window.location.href;
            })

            //filter cancel button
            $("ul[tag=danxuanUl]").on("click", "input[type=button][tag=filterCancel]", function () {
                $(this).parents("ul.duoxuanUl").hide();
                $(this).parents("li").find("span.selectInput").removeClass("open");
                $(this).parents("div.footUl").find("ul.duoxuanBox").hide();
                $(this).parents("div.footUl").find("ul.danxuanUl").show();
            })

            //多选按钮，控制ul隐藏，显示
            $("div.searchpage-wrapper").on("click", "div.duoxuan", function (e) {
                // var next_1 = $(this).nextAll("ul.duoxuanUl");
                var nextUL = $(this).parent("div.footUl").find("ul.duoxuanBox");

                $(this).parent("div.footUl").find("ul.danxuanUl").hide();

                if (nextUL.css("display") == "none") {
                    // $("ul.duoxuanUl").each(function () {
                    //     $(this).hide();
                    // })
                    nextUL.show();
                } else {
                    $(this).parent().find("ul.danxuanUl").show();
                    nextUL.hide();
                }
                e.stopPropagation();
            })

            //多选ul里面的li
            $("div.searchpage-wrapper").on("click", "li[tag=filterli]", function (e) {
                if ($(this).hasClass("multipleSelected")) {
                    $(this).attr("class", "multipleSelect");
                } else {
                    $(this).attr("class", "multipleSelected");
                }
                e.stopPropagation();
            })

            //crumbs 的隐藏显示
            $("div.searchpage-wrapper").on("click", "span[tag=crumbs]", function (e) {
                var nextUL = $(this).nextAll("ul.selectUl");
                if ($(nextUL)[0].children.length != 0) {
                    if (nextUL.css("display") == "block") {
                        nextUL.hide();
                        $(this).removeClass('open');
                    } else {
                        $("span[tag=crumbs]").each(function () {
                            $(this).nextAll("ul.selectUl").hide();
                        })
                        nextUL.show();
                        $(this).addClass('open');
                    }
                }else{
                    // $(this).toggleClass('open');
                    nextUL.hide();
                    $(this).removeClass('open');
                }
                e.stopPropagation();
            })

            //高级选项
            $("div.searchpage-wrapper").on("click","ul.gaoji li span.selectInput",function(e){
                var ul = $(this).nextAll("ul.danxuanUl");
                if(ul.css("display")=="none"){
                    $("ul.gaoji ul").each(function(){
                        $(this).hide();
                        $(this).removeClass('open');
                    })
                    ul.show();
                    $(this).addClass('open');
                }else{
                    ul.hide();
                    $(this).removeClass('open');
                }
                e.stopPropagation();

            })

            //高级选项的多选
            $("div.searchpage-wrapper").on("click","ul.gaoji li.gjduoxuan",function(e){
                $(this).parent().hide().next("ul.duoxuanUl").show();
                e.stopPropagation();
            })

            $("div.searchpage-wrapper").on("click","ul.duoxuanUl",function(e){
                e.stopPropagation();
            })

            $("div.searchpage-wrapper").on("mouseover","ul.productUl li.product",function(){
                $(this).addClass("newProduct").siblings("li.product").removeClass("newProduct");
            })

            document.body.addEventListener("click",function(){
                $("div.searchpage-wrapper ul.selectUl").each(function(){
                    $(this).hide();
                })
                $("div.searchpage-wrapper span[tag=crumbs]").each(function(){
                    $(this).removeClass("open");
                })
                $("div.searchpage-wrapper span.selectInput").each(function(){
                    $(this).removeClass("open");
                })
            },false);

            //对比
            $("#searchContentContainer").on("click","a.btn_compare_select",function(e){
                var code = $(this).attr("data-id");
                var title = $(this).attr("data-title");
                var price = $(this).attr("data-price");
                var imgurl = $(this).attr("data-imgurl");
                var gtype = $(this).attr("data-gtype");
                var detailUrl = $(this).attr("data-detailurl");
                if($(this).hasClass("active")){
                    $(this).removeClass("active");
                    cookieTool.removeGoodsSelect(code);
                }else{
                    var goods = cookieTool.getCookie(cookieTool.cookieKey);
                    if(goods && goods.split(',').length >= 4){
                        $(".cantCompare").show().text("对比栏已满，您可以删除不需要的栏内商品再继续添加哦!");
                        return;
                    }
                    $(this).addClass("active");
                    $(".search_comparepart").show();
                    $(".cantCompare").hide().text("");
                    cookieTool.setGoodsSelect(code,title,imgurl,price,gtype,detailUrl);
                }
                e.stopPropagation();
            })

            //单个删除按钮
            $(".search_comparepart").on("click","a.btn_removecompareitem",function(e){
                var code = $(this).attr("data-code");
                cookieTool.removeGoodsSelect(code);
                cookieTool.removeProListChecked(code);
                $(".cantCompare").hide().text("");
                cookieTool.getUnCkProList();
                e.stopPropagation();
            })

            //清空对比栏
            $(".search_comparepart").on("click","#btn_compare_clear",function(e){
                cookieTool.removeCookie(cookieTool.cookieKey);
                cookieTool.renderCompareList();
                cookieTool.removeProListChecked();
                $(".cantCompare").hide().text("");
                cookieTool.getUnCkProList(true);
                e.stopPropagation();
            })

            //鼠标事件，显示删除按钮
            $(".search_comparepart").on("mouseover","div.pro_item",function(e){
                $(this).find("a.btn_removecompareitem").show();
                e.stopPropagation();
            })

            //鼠标事件，隐藏删除按钮
            $(".search_comparepart").on("mouseout","div.pro_item",function(e){
                $(this).find("a.btn_removecompareitem").hide();
                e.stopPropagation();
            })

            //选中对比商品的checkbox
            $("#compare_pro_list").on("click","span.isCommont",function(){
                if($(this).hasClass("selectSame")){
                    $(this).removeClass("selectSame");
                }else{
                    $(this).addClass("selectSame");
                }
                //获取未选中的商品
                cookieTool.getUnCkProList();
                $(".cantCompare").hide().text("");
            })

            //对比按钮
            $(".search_comparepart").on("click","#btn_compare",function(e){
                // debugger
                var count = 0;
                $("#compare_pro_list div.full span.isCommont").each(function(){
                    if($(this).hasClass("selectSame")){
                        count++;
                    }
                })
                if(count == 0 || count == 1){
                    $(".cantCompare").show().text("至少添加2个同类型的商品进行对比!");
                    return;
                }
                //获取所有对比栏的类别，检测是否相同
                var res = cookieTool.getCompareFilter();
                if(res.flag == false){
                    $(".cantCompare").show().text("只能对同类别商品进行对比,请重新选择!");
                }else{
                    window.open("//"+ document.domain +"/compare.html?pro_list="+res.goodsIds.join(',')+"&pro_type="+res.gType);
                }
                e.stopPropagation();
            })
            //隐藏按钮
            $("div.comparepart_content").on("click","#btn_compare_hide",function(){
                $(".search_comparepart").hide();
            })   

            //点击商品事件
            $(".productDetailUl").on("click","li",function(){
                var code = $(this).attr("data");
                $.ajax({
                    url:"/searchCVR/log.gif?code="+code,
                    type:"get"
                })
            })
        }
    }
}


$(function () {
    // debugger
    lenovo_search_tool.view.bindEvent();

    var goods = cookieTool.getCookie(cookieTool.cookieKey);
    if(goods && goods.split(',').length >= 1){
        $(".search_comparepart").show();
    }
    cookieTool.renderCompareList();
    

    var entranceSelect = $(".oprationList li.active").attr("tag");
    $(".stackSearch").on("click",".oprationList li",function(){
        $(".active").removeClass("active");
        $(this).addClass("active");
    });

    $(".stackSearch .oprationList li").mouseover(function(){
        $(".active").removeClass("active");
        $(".oprationList li[tag="+entranceSelect+"]").addClass("active");
        cookieTool.setCurOptclass();
        $(this).addClass("active");
    });

    $(".stackSearch .oprationList li").mouseleave(function(){
        $(".active").removeClass("active");
        $(".oprationList li[tag="+entranceSelect+"]").addClass("active");
        cookieTool.setCurOptclass();
    });
    cookieTool.setCurOptclass();
})

