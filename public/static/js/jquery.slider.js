function myDebug(test){
    function getQueryString(a) {
        var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)","i")
          , c = window.location.search.substr(1).match(b);
        return null != c ? decodeURIComponent(c[2]) : ""
    } 
    if(getQueryString("myDebug")){
        var index = $(".myDebugHtml").length;
        var myDebugHtml = 
            '<div class="myDebugHtml" style="z-index: 99999;border-top: 1px solid #fff;line-height: 32px;position: fixed;bottom: '+(index*33)+'px;height: 32px;width: 100%;background: #03A9F4;left: 0;text-align: center;color: #fff; font-size: 16px;">' +
                '<p>'+test+'</p>' +
            '</div>';
        $("body").append(myDebugHtml);
    }      
}
(function (t, i, s, e) {
       
    function browserRedirect() {  
        var sUserAgent = navigator.userAgent.toLowerCase();  
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";  
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";  
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";  
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";  
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";  
        var bIsAndroid = sUserAgent.match(/android/i) == "android";  
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";  
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";  
        if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){  
            return "pc"  
        } else {  
            return "wap"  
        }  
    } 
    var hasTouch = browserRedirect(),
    startEvent = hasTouch == "wap" ? 'touchstart' : 'mousedown',
    moveEvent = hasTouch == "wap" ? 'touchmove' : 'mousemove',
    endEvent = hasTouch == "wap" ? 'touchend' : 'mouseup',
    cancelEvent = hasTouch == "wap" ? 'touchcancel' : 'mouseup';
    var l = function (i, s) {
        this.ele = i;
        this.defaults = {
            isSuccess:0,
            width: 300,
            height: 34,
            sliderBg: "#e8e8e8",
            color: "#666",
            fontSize: 12,
            bgColor: "#7ac23c",
            textMsg: "请按住滑块，拖动到指定位置",
            successMsg: "验证成功",
            successColor: "#fff",
            time: 160,
            errorMsg: "哎呀，出错了，再来一次",
            errorFontSize: 12,
            errorColor: "#ff8080",
            errorBgColor: "#e8e8e8",
            callback: function (t,d) {
            },
            success: function (data) {
            },
            error: function (r) {
            }
        };
        this.opts = t.extend({}, this.defaults, s);
        this.init()
    };
    l.prototype = {
        init: function () {
            this.mouseXY = "";
            this.result = false;
            this.sliderBtn_left = 0;
            this.maxLeft = this.opts.width - this.opts.height;
            this.render();
            this.removeEvent();
            this.eventBind();
        },
        render: function () {
            var t = '<div class="ui-slider-wrap">' + '<div class="ui-slider-text ui-slider-no-select add-img">' + this.opts.textMsg + "</div>" + '<div class="ui-slider-btn init ui-slider-no-select"></div>' + '<div class="ui-slider-bg"></div>' + "</div>";
            this.ele.html(t);
            this.initStatus()
            this.X = this.ele.find(".ui-slider-text").offset().left + this.maxLeft;
            this.Y = this.ele.find(".ui-slider-text").offset().top;
            //console.log("X="+this.X+";Y="+this.Y );
        },
        initStatus: function () {
            var t = this;
            var i = this.ele;
            this.mouseXY = "";
            this.sliderwrap = i.find(".ui-slider-wrap");
            this.sliderBtn = i.find(".ui-slider-btn");
            this.bgColor = i.find(".ui-slider-bg");
            this.sliderText = i.find(".ui-slider-text");
            this.sliderwrap.css({
                width: t.opts.width,
                height: t.opts.height,
                backgroundColor: t.opts.sliderBg
            });
            this.sliderBtn.css({
                width: t.opts.height,
                height: t.opts.height,
                lineHeight: t.opts.height + "px"
            });
            this.bgColor.css({
                height: t.opts.height,
                backgroundColor: t.opts.bgColor

            });
            this.sliderText.css({
                lineHeight: t.opts.height + "px",
                fontSize: t.opts.fontSize,
                color: t.opts.color,
            })
        },
        renderSuccess: function renderSuccess() {
            this.ele.find(".ui-slider-text").text(this.opts.successMsg).css({
                color: this.opts.successColor,
            });
            this.ele.find(".ui-slider-bg").css({
                width: "100%"
            });
            this.ele.find(".ui-slider-wrap .ui-slider-btn").css({
                 right: 0
            });
            this.ele.find(".ui-slider-btn").addClass("success");

            this.ele.find(".add-img").removeClass("add-img");
        },
        renderError: function renderError() {
            this.ele.html(this.opts.errorMsg).css({
                "color": this.opts.errorColor,
                "background": this.opts.errorBgColor,
                "width": this.opts.width + "px",
                "height": this.opts.height + "px",
                "line-height": this.opts.height + "px",
                "font-size": this.opts.errorFontSize + "px",
                "text-align": "center",
                "overflow": "hidden"
            });
        },
        restore: function () {
            var t = this;
            var i = t.opts.time;
            this.result = false;
            this.initStatus();
            this.sliderBtn.removeClass("success").animate({
                left: 0
            }, i);
            this.bgColor.animate({
                width: 0
            }, i, function () {
                t.sliderText.text(t.opts.textMsg)
            })
        },
        removeEvent: function () {
            var t = this;
            this.ele.off(startEvent, ".ui-slider-btn");
        },
        eventBind: function () {
            var t = this;
            this.ele.on(startEvent, ".ui-slider-btn", function (i) {
                if (t.result || $(this).hasClass("success")) {
                    return
                }
                t.sliderMousedown(i)
            })
        },
        sliderMousedown: function (t) {
            var i = this;
            var s = hasTouch == "wap" ? t.originalEvent.touches[0].clientX : t.clientX;
            var e = s - this.sliderBtn.offset().left + $(window).scrollLeft();
            var s_ = hasTouch == "wap" ? t.originalEvent.touches[0].clientY : t.clientY;
            var e_ = s_ - this.sliderBtn.offset().top + $(window).scrollTop();
            this.mouseXY = "";

            this.mouse_X = s;
            this.mouse_Y = s_;
            this.mouseTime = new Date().valueOf();
            i.sliderMousemove(s, e , s_ ,e_);
            i.sliderMouseup(s, e , s_ ,e_)
        },
        sliderMousemove: function (i, e ,i_ ,e_) {
            var l = this;
            var _t = t;
            t(s).on(moveEvent+".sliderwrap", function (t) {
                t.preventDefault();
                t.stopPropagation(); 
                l.sliderBtn_left = (hasTouch == "wap" ? t.originalEvent.touches[0].clientX : t.clientX)- i - e;
                l.sliderBtn_top = (hasTouch == "wap" ? t.originalEvent.touches[0].clientY : t.clientY)- i_ - e_;
                if (l.sliderBtn_left < 0) {
                    return
                }
                if (l.sliderBtn_left > l.maxLeft) {
                    l.sliderBtn_left = l.maxLeft

                    /*l.result = true
                    _t(this).off(moveEvent+".slider");
                    _t(this).off(endEvent+".slider");
                    if (l.opts.callback && typeof l.opts.callback === "function") {
                        var data = l.mouseXY += " " + l.X + "," + l.Y;
                        setTimeout(function(){
                            l.opts.callback(l.result,data)
                        },100);                        
                    }*/
                }else{
                    /*l.mouseXY += t.pageX+",";
                    l.mouseXY += t.pageY+",";
                    l.mouseXY += new Date().valueOf()+";";*/
                }
                l.sliderBtn.css("left", l.sliderBtn_left);
                l.bgColor.width(l.sliderBtn_left);
                // l.mouseXY += t.pageX+",";
                // l.mouseXY += t.pageY+",";
                l.mouseXY += l.sliderBtn_left+",";
                l.mouseXY += l.sliderBtn_top+",";
                l.mouseXY += (new Date().valueOf() - l.mouseTime)+";";
            })
        },
        sliderMouseup: function (ss, e , ss_ ,e_) {
            var i = this;
            t(s).on(endEvent+".sliderwrap", function (tt) {
                if (Math.abs(i.sliderBtn_left - i.maxLeft*0.7) >40) {
                    i.sliderBtn_left = 0
                } else {
                    i.result = true
                }
                myDebug("鼠标抬起");
                i.sliderBtn.animate({
                    left: i.sliderBtn_left
                }, i.opts.time);
                i.bgColor.animate({
                    width: i.sliderBtn_left
                }, i.opts.time);
                t(this).off(moveEvent+".sliderwrap");
                t(this).off(endEvent+".sliderwrap");
                if (i.opts.callback && typeof i.opts.callback === "function") {
                    //var data = i.mouseXY += " " + i.X + "," + i.Y;
                    var data = i.mouseXY += " " + i.maxLeft*0.7 + "," + 0;
                    //var sliderBtn_left = (hasTouch == "wap" ? tt.originalEvent.changedTouches[0].clientX : tt.clientX)- ss - e;
                    //var sliderBtn_top = (hasTouch == "wap" ? tt.originalEvent.changedTouches[0].clientY : tt.clientY)- ss_ - e_;
                    //var data = i.mouseXY += " " + sliderBtn_left + "," + sliderBtn_top;
                    i.opts.callback(i.result,data)
                }
            })
        }
    };
    t.fn.myslider = function (i,m) {
        return this.each(function () {
            var s = t(this);
            var e = s.data("slider");
            e = new l(s, i);
            s.data("slider", e);
            if (m) {
                e[m]()
            }
        })
    }
})(jQuery, window, document);