/**
 * 购物车页面 商品推荐信息轮播
 */
(function ($) {
    $.fn.extend({
        _dsp_num : 0,
        _cur : 0,
        _cur_max : 0,
        carousel: function (opt) {
            if(!opt || opt == null){
                opt = {
                    "_dsp_num"      : 4,                // 自定义每次轮播切换的商品数量(最好是偶数)
                    "_dps_row"      : 1,                // 自定义轮播商品展示行数
                    "_interval_time": 3000,             // 自动轮播间隔时间，单位ms
                    "_prev_btn"     : "#_rcmd_prev_btn", // 轮播上翻页按钮
                    "_next_btn"     : "#_rcmd_next_btn"  // 轮播下翻页按钮
                }
            }

            this.__proto__._dsp_num = opt._dsp_num;
            var _li_width;
            switch(opt._dps_row){
                case 1:
                    _li_width = (1/opt._dsp_num).toFixed(4)*100 + "%";
                    break;
                case 2:
                    _li_width = (1/(opt._dsp_num/2)).toFixed(4)*100 +"%";
                    break;
                case 3:
                    _li_width = (1/(opt._dsp_num/3)).toFixed(4)*100 +"%";
                    break;
            }

            var _invisibles = $(this).children("li._dsp_off");
            var _visibles = $(this).children("li._dsp_no");
            if (_invisibles.length != null && _invisibles.length !== 0 && _visibles.length != null && _visibles.length === 0) {

                // 根据配置重新调整宽度百分比
                if(_li_width !== "25%"){
                    var _cover;
                    $.each(_invisibles, function(i, li){
                        _cover += '<li class="_rcmd_good _dsp_off" style="width:' + _li_width + ';">' + li.innerHTML + '</li>';
                    });
                    $("#_rcmd_good_ul").html(_cover);
                }
                // 接口返回推荐商品数量小于 _dsp_num, 将按钮置灰,并直接显示
                if (_invisibles.length <= opt._dsp_num) {
                    $("#_rcmd_good_ul").children("li").removeClass("_dsp_off");
                    $("div._rcmd_btn_container").addClass("_dsp_off");
                    return;
                }
                // 先将推荐商品li node 补全为 _dsp_num的整数倍
                var _mod = _invisibles.length % opt._dsp_num;
                if (_mod !== 0) {
                    var _make_up = _invisibles.slice(0, opt._dsp_num - _mod);
                    $.each(_make_up, function (i, n) {
                        $("#_rcmd_good_ul").append('<li class="_rcmd_good _dsp_off" style="width:'+ _li_width +';">' + n.innerHTML + '</li>');
                    });
                    this.__proto__._cur_max = Math.floor(_invisibles.length / opt._dsp_num);
                }else{
                    this.__proto__._cur_max = Math.floor(_invisibles.length / opt._dsp_num - 1);
                }
                flush('next');
                var _refer = setInterval("flush('next')", opt._interval_time);

                // 为左右按钮添加点击事件
                $(opt._prev_btn).click(function() {
                    setTimeout('clearInterval(' +_refer + ')()',0);
                    flush('prev');
                    _refer = setInterval("flush('next')", opt._interval_time);
                });
                $(opt._next_btn).click(function() {
                    setTimeout('clearInterval(' + _refer + ')()',0);
                    flush('next');
                    _refer = setInterval("flush('next')", opt._interval_time);
                });

                /**
                 * 鼠标移到商品轮播区域轮播停止
                 */
                $(this).parent("div#_rcmd_hot").mouseover(function(){
                    setTimeout('clearInterval(' +_refer + ')()',0);
                });
                $(this).parent("div#_rcmd_hot").mouseout(function(){
                    _refer = setInterval("flush('next')", opt._interval_time);
                });

            }
        }

    })
})(jQuery);


/**
 * 轮播刷新
 */
var flush = function(_direction){
    var _ele = $("#_rcmd_good_ul");
    if(_ele._cur_max === 0){
        return;
    }
    // console.log("_cur_max:" + _ele._cur_max + "_cur:" + _ele._cur)
    _ele.children("li").addClass("_dsp_off");

    if(_direction === 'next') {
        if (++_ele.__proto__._cur > _ele._cur_max) {
            _ele.__proto__._cur = 0;
        }
        for (var i = _ele._cur * _ele._dsp_num; i < (_ele._cur + 1) * _ele._dsp_num; i++) {
            _ele.children("li").eq(i).removeClass("_dsp_off");
        }
    }else{
        _ele.__proto__._cur === 0 ? _ele.__proto__._cur = _ele._cur_max : --_ele.__proto__._cur;

        for (var i = _ele._cur * _ele._dsp_num; i < (_ele._cur + 1) * _ele._dsp_num; i++) {
            _ele.children("li").eq(i).removeClass("_dsp_off");
        }
    }
};
