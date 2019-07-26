/**
 * 
 * @authors pengmeili (pengml1@lenovo.com)
 * @date    2018-05-29 11:47:33
 * @version 1.0
 */
$(function() {
	$(".lazy").lazyload({
		threshold: 600,
		placeholder: '../../../public/transparent.gif'
	});

	$(window).scroll(function(){
		var t = $(window).scrollTop();
		t > 60 ? $('.z2-sub-nav').addClass('fixed-sub-nav') : $('.z2-sub-nav').removeClass('fixed-sub-nav');
	});

	var arr = new Array();	
	$(".more-btn").on("click", function(){
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
			if(!isIe){
				if(layer == "z5Ai"){
					$("#v1")[0].play();
				}
			}
			sldbar.each(function(index) {
				$(this).find(".sliderbar").css("width",$(this).find(".first a").width());
			});
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
			win_height_padded = $window.height() * 0.9;

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
	
})

//切换
function silderBar(obj){
	var oLineWrap = $(obj).find(".linesilder");
	var aLink = $(oLineWrap).find("a");
	var $silderbar = $(obj).find(".sliderbar");

	aLink.on("click",function(){
		var wof = $(obj).find(".linesilder").offset().left;
		var $this = $(this);

		$(this).parent().addClass("cur").siblings().removeClass("cur");
		var ost = $this.offset().left - wof;
		var width = $this.width();
		$silderbar.animate({"left":ost,"width":width},200);
		if(!isIe){
			if(obj == ".screen-6"){
				$(".screen-5 video").eq($(this).parent().index())[0].play();
			}
		}
	})
}

silderBar('.safe-5');
silderBar('.screen-6');
silderBar('.ai-3');
silderBar('.ai-5');
silderBar('.chain-2');

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