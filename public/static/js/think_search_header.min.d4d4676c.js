function getQueryString(a) {
    var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i"), c = window.location.search.substr(1).match(b);
    return null != c ? decodeURIComponent(c[2]) : ""
}
function getLeid() {
    for (var a = "", b = document.cookie.split(";"), c = 0; c < b.length; c++)if ("leid" == b[c].split("=")[0].trim()) {
        a = b[c].split("=")[1];
        break
    }
    return a
}
function autoAjax(a, b) {
    var channelType = $("#searchkey") ? $.trim($("#searchkey").val()).length > 0 ? $("#searchkey").val() : "" : "";
    $.ajax({
        url:tmp_search_url+"/search/suggest?kw="+encodeURIComponent($(".think_search_header input[type=text]").val())+"&plat=4&leid="+getLeid()+"&terminal=1&channel=" + channelType+"&url="+encodeURIComponent(document.URL),
        type: "GET",
        jsonp: "cb",
        dataType: "jsonp",
        success: function (a) {
            if ("1" != a.rc) {
                var c = ["<ul>"];
                if (0 == a.normal.length)return void b.suggest.html("").hide();
                b.suggest.html("");
                for (var d = a.normal, e = 0; e < d.length; e++)"cate" == d[e].type ? c.push("<li title='" + d[e].word + "'><a href='" + tmp_search_url + "?index=" + d[e].code + "&key=" + d[e].word + "'>" + d[e].word + "</a></li>") : "goods" == d[e].type ? c.push("<li title='" + d[e].word + "'><a href='" + tmp_search_detail + d[e].code + ".html'>" + d[e].word + "</a></li>") : "1" == d[e].his ? getQueryString("index") ? c.push("<li title='" + d[e].word + "'><a style='float: left;' href='" + tmp_search_url + "?index=" + getQueryString("index") + "&key=" + d[e].word + "'>" + d[e].word + "</a><a style='float:right;margin-right: 13px;' word='" + d[e].word + "' tag='del'>删除历史</a></li>") : c.push("<li title='" + d[e].word + "'><a style='float: left;' href='" + tmp_search_url + "?key=" + d[e].word + "'>" + d[e].word + "</a><a style='float:right;margin-right: 13px;' word='" + d[e].word + "' tag='del'>删除历史</a></li>") : getQueryString("index") ? c.push("<li title='" + d[e].word + "'><a href='" + tmp_search_url + "?index=" + getQueryString("index") + "&key=" + d[e].word + "'>" + d[e].word + "</a></li>") : c.push("<li title='" + d[e].word + "'><a href='" + tmp_search_url + "?key=" + d[e].word + "'>" + d[e].word + "</a></li>");
                c.push("</ul>"), b.suggest.html(c.join("")).show()
            }
        }
    })
}
function getItemsInAutoCompletedList(a) {
    var b = null;
    return $("#suggestContainer a").each(function () {
        if ($(this).text().trim().toLowerCase() == a.trim().toLowerCase())return b = $(this), !1
    }), b
}
var tmp_new_search_url = "//s.lenovo.com.cn", tmp_search_url = "//s.lenovo.com.cn", tmp_search_detail = "//www.lenovo.com.cn/product/";
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "")
}, AutoComplete.constructor = function (a) {
    var b, c = "oninput" in window ? "input" : "keyup";
    if (this.tip = a.tip || getQueryString("key") ? getQueryString("key") : "", this.input = a.input, this.input) {
        if (this.input.val(this.tip), this.form = a.form, !this.form && (b = this.input.parents("form")) && b.length && (this.form = b, b = null), this.submit = a.submit || this.submit, this.getDatas = a.getDatas || this.getDatas, this.suggest = a.suggest, !this.suggest) {
            var d = document.createElement("div"), e = getPosition(this.input[0], "offsetLeft"), f = getPosition(this.input[0], "offsetTop") + this.input.height();
            d.style.cssText = "position:absolute;top:" + f + "px;left:" + e + "px", document.body.appendChild(d), this.suggest = jQuery(d)
        }
        this.suggest.hide(), this.list = (a.list || "li").toLowerCase(), this.hover = a.hover || "hover", this.input.focus(jQuery.proxy(this.focus, this)), this.input.blur(jQuery.proxy(this.blur, this)), this.input.keydown(jQuery.proxy(this.keydown, this)), this.input.bind(c, jQuery.proxy(this.textInput, this)), this.form && this.form.bind("submit", jQuery.proxy(this.submit, this)), this.suggest.delegate(this.list, "mouseover", jQuery.proxy(this.mouseover, this)), this.suggest.delegate(this.list, "click", jQuery.proxy(this.click, this))
    }
};
var ITO, commonSearch = function () {
    var that = this;
    this.channelType = $("#searchkey") && $.trim($("#searchkey").val()).length > 0 ? $("#searchkey").val() : "default", this.init = function () {
        that.setSearchTextPlaceHolder(), that.regEvent()
    }, this.regEvent = function () {
    }, this.setSearchTextPlaceHolder = function () {
        var ajax_url = tmp_new_search_url + "/search/getDefaultHotwordV2?shopId=1&terminal=1&channel=" + that.channelType + "&url=" + encodeURIComponent(document.URL);
        $.ajax({
            url: ajax_url, jsonp: "cb", async: !1, dataType: "jsonp", success: function (res) {
                "0" == res.rc && res.data && (res.data = eval("(" + res.data + ")"), $(".think_search_header input[type=text]").attr("placeholder", res.data.showWord ? res.data.showWord : ""), $(".think_search_header input[type=text]").attr("placeholder-key", res.data.word ? res.data.word : ""), $(".think_search_header input[type=text]").attr("placeholder-url", res.data.toUrlPc ? res.data.toUrlPc : ""))
            }, error: function () {
            }
        })
    }
};
$(function () {
    (new commonSearch).init(), $("body").delegate(".think_search_header .usepng", "click", function () {
        var a = $.trim($(this).prev().val()), b = getItemsInAutoCompletedList(a), c = $(".think_search_header input[type=text]").attr("placeholder-key") ? $(".think_search_header input[type=text]").attr("placeholder-key") : "", d = $(".think_search_header input[type=text]").attr("placeholder-url") ? $(".think_search_header input[type=text]").attr("placeholder-url") : "";
        getQueryString("index"), window.location.href = b ? b.attr("href") : "" == a ? "" != d ? d : tmp_new_search_url + "?key=" + encodeURIComponent(c) : tmp_new_search_url + "?key=" + encodeURIComponent($(this).prev().val())
    });
    var a = Class.create({
        setInputValue: function () {
            var a;
            this.current && (a = this.current.attr("title") || this.current.text(), this.input.val(a))
        }, focus: function (a) {
            var b = this, c = $(".think_search_header input[type=text]").val();
            "ThinkPad X1" == c || "" == c ? ($(".think_search_header input[type=text]").val(""), autoAjax("", b)) : autoAjax(c, b)
        }, blur: function () {
        }, click: function (a) {
            var b = a.target;
            if ("del" != $(b).attr("tag"))return this.input.val($(b).parent().attr("title")), !0;
            a.stopPropagation();
            var c = $(b).attr("word");
            $.ajax({
                url: tmp_search_url + "/search/suggestDelete?kw=" + encodeURIComponent(c) + "&plat=4&leid=" + getLeid(),
                type: "GET",
                jsonp: "cb",
                dataType: "jsonp",
                success: function (a) {
                    "0" == a.rc && $(b).parent().remove()
                }
            })
        }
    }, AutoComplete);
    $("body").click(function (a) {
        var b = $(a.target);
        "latag_pc_search_keyword" == b.attr("latag") || "del" == b.attr("tag") ? $("#suggestContainer").show() : $("#suggestContainer").hide()
    }), new a({
        input: $(".think_search_header input[type=text]"),
        suggest: $("#suggestContainer"),
        tip: getQueryString("key") ? " " : "",
        getDatas: function () {
            var a = this;
            autoAjax($(".think_search_header input[type=text]").val(), a)
        },
        submit: function () {
            this.suggest.hide();
            var a = $(".think_search_header input[type=text]").val(), b = getItemsInAutoCompletedList(a), c = $(".think_search_header input[type=text]").attr("placeholder-key") ? $(".think_search_header input[type=text]").attr("placeholder-key") : "", d = $(".think_search_header input[type=text]").attr("placeholder-url") ? $(".think_search_header input[type=text]").attr("placeholder-url") : "";
            getQueryString("index");
            this.current ? window.location.href = this.current.find("a").attr("href") : window.location.href = b ? b.attr("href") : "" == a ? "" != d ? d : tmp_new_search_url + "?key=" + encodeURIComponent(c) : tmp_new_search_url + "?key=" + encodeURIComponent(a)
        }
    })
});