$(function() {
    var timedel = "",
        resObj = null,
        $pro1 = $("#pro1"),
        $pro2 = $("#pro2");
    var rule = {
        pro1:{
            startTime:"11:00:00",
            endTime:"11:05:00",
            miaoStartTime:undefined,
            miaoEndTime:undefined
        },
        pro2:{
            startTime:"15:00:00",
            endTime:"15:05:00",
            miaoStartTime:undefined,
            miaoEndTime:undefined
        },
       
    }
    var page = {
        miao: {
            url: "https://papi.lenovo.com.cn/cache/time",
            callBack: function(response) {
                var res = JSON.parse(response);
                resObj = res;
                if (res.status == 200) {
                    timedel = (new Date()).getTime() - new Date(res.curDate).getTime();
                    $(".couponMod .pro").each(function(i, e) {
                        page.seckill($(e)[0].id);
                    })
                    page.setTime();
                }
            }
        },
        ajax: function(option) {
            $.ajax({
                type: option.type || "GET",
                url: option.url,
                data: option.data || null,
                async: "false",
                jsonp: "callback",
                success: function(response) {
                    option.callBack(response);
                },
                error: function(xhr) {
                    option.errorBack(xhr);
                }
            })
        },
        seckill: function(product) {            
            if (product == "pro1") {
                page.updateQuan(product,$pro1);
            }
            if (product == "pro2") {
                page.updateQuan(product,$pro2);
            }
            
        },
        setQuan: function(el, state) {
            el.find(".couponBtn").removeClass("coupswill coupsin coupsed");
            switch (state) {
                case 1:
                    el.find(".couponBtn").toggleClass("coupswill");
                    break;
                case 2:
                    el.find(".couponBtn").toggleClass("coupsin");
                    break;
                case 3:
                    el.find(".couponBtn").toggleClass("coupsed");
                    break;
            }
        },
        updateQuan: function(product,$pro){
            var curTime = (new Date()).getTime() + timedel;
                if (curTime < rule[product].miaoStartTime) {
                    if ($pro.data("status") != 1) {
                        page.setQuan($pro, 1);
                        $pro.data("status",1);
                        $pro.find(".couponBtn").text("未开始");
                    }
                } else if ((curTime >= rule[product].miaoStartTime) && (curTime <= rule[product].miaoEndTime)) {
                    if ($pro.data("status") != 2) {
                        page.setQuan($pro, 2);
                        $pro.data("status",2);
                        $pro.find(".couponBtn").text("限时抢");
                    }
                } else {
                    if ($pro.data("status") != 3) {
                        page.setQuan($pro, 3);
                        $pro.data("status",3);
                        $pro.find(".couponBtn").text("已结束");
                    }
                }
        },
        setTime: function() {
            setInterval(function() {
                $(".couponMod .pro").each(function(i, e) {
                    page.seckill($(e)[0].id);
                })
            }, 1000);
        },
        setMiaoTime: function(obj){
            var times1 = (/(\d+):(\d+):(\d+)/gi).exec(rule[obj].startTime),
                times2 = (/(\d+):(\d+):(\d+)/gi).exec(rule[obj].endTime);
            rule[obj].miaoStartTime = new Date(new Date(new Date().setHours(times1[1])).setMinutes(times1[2])).setSeconds(times1[3]);
            rule[obj].miaoEndTime = new Date(new Date(new Date().setHours(times2[1])).setMinutes(times2[2])).setSeconds(times2[3]);
        }
    }
    page.ajax(page.miao);
    page.setMiaoTime("pro1");
    page.setMiaoTime("pro2");
    
   
})

