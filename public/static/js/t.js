// JavaScript Document

var T = (function(){
	var abc = "abc"
    var t = {};
	return t;
})(jQuery, T)

$.fn.PagerBind = function (conf) {
	conf.pageindex = Number(conf.pageindex) || 1;
	conf.datacount = Number(conf.datacount) || 0;
	conf.pageNum = Number(conf.pageNum) || 0;
	conf.pagesize = Number(conf.pagesize) || 10;
	conf.interval = Number(conf.interval) || 3;
	conf.databind = conf.databind || function (i) { BindComment(i); };
	var _this = this.append("<ul class='clearfix'></ul>");  // html 容器
	_this.html("");
	//上一页
	if (conf.pageindex == 1) {
		_this.append(
			'<li class="page_btn prev disable">'+
				'<a href="javascript:;" title="上一页" class="clearfix"><i></i><span>上一页</span></a>'+
			'</li>'
		);
	}
	else {
		var pre = $(
			'<li class="page_btn prev">'+
				'<a href="javascript:;" title="上一页" class="clearfix"><i></i><span>上一页</span></a>'+
			'</li>'
		).click(function () {
			conf.databind(conf.pageindex - 1);
			return false;
		});
		_this.append(pre);
	}
	//页码
	var pagecount = Math.ceil(conf.datacount / conf.pagesize);   //总页数
	var start = Math.max(1, conf.pageindex - conf.interval);   //设置起始页
	var end = Math.min(conf.pageindex + conf.interval, pagecount);   //设置末页
	if (conf.pageindex < conf.interval + 1) {
		end = (2 * conf.interval + 1) > pagecount ? pagecount : (2 * conf.interval + 1);
	}
	if ((conf.pageindex + conf.interval) > pagecount) {
		start = (pagecount - 2 * conf.interval) < 1 ? 1 : (pagecount - 2 * conf.interval);
	}
	for (var j = start; j < end + 1; j++) {
		if (j == conf.pageindex) {
			_this.append('<li class="page_num active"><a href="javascript:void(0">'+j+'</a></li>');
		} else {
			var pagebtn = $('<li class="page_num"><a href="javascript:void(0">'+j+'</a></li>').click(function () {
				conf.databind($(this).text());
				return false;
			});
			_this.append(pagebtn);
		}
	}
	//末页
	if (conf.pageindex == pagecount || conf.datacount == 0) {
		_this.append(
			'<li class="page_btn next disable">'+
				'<a href="javascript:;" title="下一页" class="clearfix"><i></i><span>下一页</span></a>'+
			'</li>'
		);
	}
	else {
		var next = $(
			'<li class="page_btn next">'+
				'<a href="javascript:;" title="下一页" class="clearfix"><i></i><span>下一页</span></a>'+
			'</li>'
		).click(function () {
			conf.databind(conf.pageindex + 1);
			return false;
		});
		_this.append(next);
	}
	_this.append("<li class=\"page_total\">显示<span>" + ((conf.pageindex - 1) * conf.pagesize + 1) + "</span>-<span>" + (conf.pageindex * conf.pagesize > conf.datacount ? conf.datacount : conf.pageindex * conf.pagesize) + "</span>条，<span>共" + pagecount + "页</span><li>");
	var pageNum = $('<li class="page_goto">到第<input type="text" value="1"/>页</li>');
	var gotoPage = $('<li class="page_sure"><input type="button" value="确定"/></li>').click(function(){
			var p =parseInt(pageNum.find("input").val());
			if(p > pagecount || p <= 0 || isNaN(p)){alert("当前一共"+pagecount+"页，请输入1到"+pagecount+"的整数。");return}
			conf.databind(p);
		});
	_this.append(pageNum).append(gotoPage);
}

T.getQueryString = function(name){//获取地址栏参数
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
