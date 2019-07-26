var prodUrl = 'https://activity.lenovo.com.cn/activity/moto/introduce/lenovoz6pro';
$(function(){
	$(window).scroll(function(){
		var t = $(window).scrollTop();
		t > 60 ? $('.z2-sub-nav').addClass('fixed-sub-nav') : $('.z2-sub-nav').removeClass('fixed-sub-nav');
	});
	$(".lazy").lazyload({
	  	threshold : 600,
	  	placeholder:'../../../public/transparent.gif'
	});

	var arr = new Array();
	$(".more-btn:not(.morelink)").on("click", function(){
		var layer = $(this).attr("data-layer");
		$("."+ layer +" .lazy1").lazyload({
			threshold : 200,
			placeholder: '../../../public/transparent.gif'
		});
		$("." + layer).fadeIn().addClass("layer-ani").find(".inner-container").scrollTop(0);
		$("." + layer).find(".close-btn").addClass("golden1");
		$("html").addClass("overhide");

		var index = $.inArray(layer,arr);
		if(index < 0){
			if(layer == "cameraMore"){
				var bx2 = $('#bxslider2').bxSlider({
			  		mode: 'fade',
			  		controls: 'false',
			  		pagerCustom:".camera-3 .circle-bar",
			  		onSlideAfter: function(){
			  			var cur = bx2.getCurrentSlide()
						if(!isIe){
							for(var i = 0; i < $("#bxslider2 li").length; i++){
								$("#bxslider2 li").eq(i).find("video")[0].pause();
							}
							$("#bxslider2 li").eq(cur).find("video")[0].play();
						}
			  		}
				});
				setTimeout(function(){
					bx2.redrawSlider();
				},500)
				var bx3 = $('#bxslider3').bxSlider({
			  		mode: 'fade',
			  		controls: 'false',
			  		auto: true,
			  		pagerCustom:".camera-6 .circle-bar"
				});
				setTimeout(function(){
					bx3.redrawSlider();
				},500)
				var bx4 = $('#bxslider4').bxSlider({
			  		mode: 'fade',
			  		controls: 'false',
			  		auto: true,
			  		pagerCustom:".camera-7 .circle-bar"
				});
				setTimeout(function(){
					bx4.redrawSlider();
				},500);
				
				$('.zoom-thumb li').Zoomer({
					speedView:200,
					speedRemove:400,
					altAnim:true,
					speedTitle:400,
					debug:false
				});

				var flashvars={
			        f: prodUrl + "/images/overview/c-v1.mp4",
			        c:0
			    };
				var video=[prodUrl+'/images/overview/c-v1.mp4->video/mp4'];
			    var params={bgcolor:'#FFF',allowFullScreen:false,allowScriptAccess:'always',wmode:'#ff0000'};
			    CKobject.embed('../../../public/ckplayer6.8/ckplayer/ckplayer.swf','a1','ckplayer_a1','960','650',true,flashvars,video,params);

			    var flashvars2={
			        f:prodUrl + "/images/overview/c-v2.mp4",
			        c:0
			    };
			    var video2=[prodUrl + '/images/overview/c-v2.mp4->video/mp4'];
			    var params2={bgcolor:'#FFF',allowFullScreen:false,allowScriptAccess:'always',wmode:'#ff0000'};
			    CKobject.embed('../../../public/ckplayer6.8/ckplayer/ckplayer.swf','a2','ckplayer_a2','960','650',true,flashvars2,video2,params2);

			    var flashvars3={
			        f:prodUrl + "/images/overview/c-v3.mp4",
			        c:0
			    };
			    var video3=[prodUrl + '/images/overview/c-v3.mp4->video/mp4'];
			    var params3={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'#ff0000'};
			    CKobject.embed('../../../public/ckplayer6.8/ckplayer/ckplayer.swf','a3','ckplayer_a3','960','650',true,flashvars3,video3,params3);

			}else if(layer == 'idMore'){
				var bx5 = $('#bxslider5').bxSlider({
					auto: true,
					infiniteLoop: true,
					controls: false,
					slideWidth:1200,
					minSlides:3,
					maxSlides:3,
					moveSlides:1,
					slideMargin:18,
					startSlide:0
				});
				setTimeout(function(){
					bx5.redrawSlider();
				},1000)
			}
			arr.push(layer);
		}
	});

	$(".close-btn").on("click", function() {
		$("html").removeClass("overhide");
		$(this).removeClass("golden1").parent().fadeOut().removeClass("layer-ani");
	});

	var $window = $(window),
		win_height_padded = $window.height() * 1.1,
		wtp = 0;

	$window.on('scroll', revealOnScroll);

	function revealOnScroll() {
		var scrolled = $window.scrollTop(),
			win_height_padded = $window.height() * 0.5;

		if(wtp <= scrolled){
			$('.ani-banner').each(function(){
				var $this = $(this),
					offsetTop1 = $this.offset().top;

				if (scrolled  > offsetTop1) {
					$this.addClass('animated1 ' + $this.data('animation'));
				}

			})
		}	
		setTimeout(function(){wtp = scrolled;},0); 

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

		$(".section .animated1,.section.animated1").each(function (index) {
	      var $this     = $(this),
	          offsetTop = $this.offset().top;
	      if (scrolled > offsetTop + $(this).height() || scrolled < offsetTop - $window.height()) {
	        $(this).removeClass('animated1 animate-banner')
	      }
	    });
	}

});

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