/**
 * 
 * @authors 
 * @date    2018-10-29 11:47:33
 * @version 1.0
 */
$(function() {
	var clickNum = 0;
	
	$(".lazy").lazyload({
		threshold: 600,
		placeholder: '../../../public/transparent.gif'
	});

	//关闭视频弹层
	$(".vedio-layer .close").click(function(){
		CKobject.getObjectById('ckplayer_a1').changeVolume(0);
		CKobject.getObjectById('ckplayer_a1').videoPause();
		CKobject.getObjectById('ckplayer_a1').videoSeek(0);
		$(".layer-bg").hide();
		$(".vedio-layer").css({"top":"-292px"});
	});

	if(!isIe){
		$('#vlist li').on({
			'mouseenter': function(){
				$(this).find('.mask').hide();
				$(this).find("video")[0].play();
			},
			'mouseleave' : function(){
				$(this).find('.mask').show();
				$(this).find("video")[0].pause();
			}
		});

		$('.o-bg15 .play-icon1,.o-bg15 .pic1').on('click',function(){
			clickNum++;
			if(clickNum % 2){
				$('#dbvideo')[0].play();
				$('.o-bg15 .play-icon1').hide();
			}else{
				$('#dbvideo')[0].pause();
				$('.o-bg15 .play-icon1').show();
			}
		})
	}else{
		$('#vlist li .mask').hide();
		$('.o-bg15 .play-icon1').hide();
	}

	$(window).scroll(function(){
		var t = $(window).scrollTop();
		t > 60 ? $('.z2-sub-nav').addClass('fixed-sub-nav') : $('.z2-sub-nav').removeClass('fixed-sub-nav');
	});

	var arr = new Array();	
	$(".more-btn:not(.morelink)").on("click", function(){
		var layer = $(this).attr("data-layer");
		$("."+ layer +" .lazy1").lazyload({
			placeholder: '../../../public/transparent.gif'
		});
		$("." + layer).fadeIn().addClass("layer-ani").find(".inner-container").scrollTop(0);
		$("." + layer).find(".close-btn").addClass("golden1");
		$("html").addClass("overhide");

		var sldbar = $("."+layer).find(".linesilder");
		var index = $.inArray(layer,arr);
		if(index < 0){
			if(layer == "z5proScreen"){
				var bxslider7 = $('#bxslider7').bxSlider({
			  		mode: 'fade',
			  		controls: 'false',
			  		pagerCustom:".screen-3 .linesilder li"
				});
				if(!isIe){
					$(".screen-3 video")[0].play();
				}
			}else if(layer == 'z5proCamera'){
				$('#s-bxslider1').bxSlider({
			  		mode: 'fade',
			  		controls: 'false',
			  		pagerCustom:".camera-1 .slider-list"
				});
				$('#s-bxslider2').bxSlider({
			  		mode: 'fade',
			  		controls: 'false',
			  		pagerCustom:".camera-3 .slider-list"
				});

				$('#s-bxslider3').bxSlider({
			  		mode: 'fade',
			  		controls: 'false',
			  		pagerCustom:".camera-4 .slider-list"
				});

				$('#s-bxslider4').bxSlider({
			  		mode: 'fade',
			  		controls: 'false',
			  		pagerCustom:".camera-2 .slider-list"
				});
			}
			arr.push(layer);
		}
	});

	$(".close-btn").on("click", function() {
		$("html").removeClass("overhide");
		$(this).removeClass("golden1").parent().fadeOut().removeClass("layer-ani");
	});

	var $window = $(window),
		win_height_padded = $window.height() * 1.1;

	$window.on('scroll', revealOnScroll);

	function revealOnScroll() {
		var scrolled = $window.scrollTop(),
			win_height_padded = $window.height() * 0.75;

		$(".animate:not(.animated)").each(function() {
			var $this = $(this),
				offsetTop = $this.offset().top;

			if (scrolled + win_height_padded > offsetTop) {
				if ($this.data('timeout')) {
					var time = parseInt($this.data('timeout'), 10) * 1000;
					window.setTimeout(function() {
						$this.addClass('animated ' + $this.data('animation'));
					}, time);
				} else {
					$this.addClass('animated ' + $this.data('animation'));
				}
			}
		});
	}

	//分层scroll
	$(".drawer-mask .inner-container").on('scroll',function(){
		var $layer = $(this),
			scrolled = $layer.scrollTop(),
			win_height_padded = $layer.height() * 0.9;

		$(this).find(".l-animate:not(.l-animated)").each(function() {
			var $this = $(this),
				offsetTop = $this[0].offsetTop;

			if (scrolled + win_height_padded > offsetTop) {
				if ($this.data('timeout')) {
					var time = parseInt($this.data('timeout'), 10) * 1000;
					window.setTimeout(function() {
						$this.addClass('l-animated ' + $this.data('animation'));
					}, time);
				} else {
					$this.addClass('l-animated ' + $this.data('animation'));
				}
			}
		});
		// Hidden...
        $(this).find(".l-animated").each(function(index) {
            var $this = $(this),
                offsetTop = $this[0].offsetTop;
            if (scrolled + win_height_padded < offsetTop) {
                $(this).removeClass('l-animated o-translateUp1');
            }
        });
	})
	
})

//切换
function silderBar(obj){
	var oLineWrap = $(obj).find(".linesilder");
	var aLink = $(oLineWrap).find("a");
	var $silderbar = $(obj).find(".sliderbar");

	aLink.on("click",function(){
		var wof = $(obj).find(".linesilder").offset().top;
		var $this = $(this);

		$(this).parent().addClass("cur").siblings().removeClass("cur");
		var ost = $this.offset().top - wof;
		$silderbar.animate({"top":ost},200);
		if(!isIe){
			if(obj == ".screen-3"){
				$(".screen-3 video").eq($(this).parent().index())[0].play();
			}
		}
	})
}

silderBar('.o-bg7');
silderBar('.o-bg21');
silderBar('.screen-3');

var isIe = getie()=='ie';
function getie(){
    if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") {
        return 'ie'
    }
    else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") {
        return 'ie'
    }
    else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") {
        return 'ie'
    }
    return '';
}