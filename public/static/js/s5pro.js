$(function(){
	var $window = $(window),
		win_height_padded = $window.height() * 1.1;

	$window.on('scroll', revealOnScroll);
	
    var flag = true;
    var flag1 = true;
    var flag2 = true;

    function revealOnScroll() {
    		var h = $(window).scrollTop()-$('.o-bg8').offset().top;
    		if(h>0&&h<1600){
    			$('.rt-mod').css("top",h+"px");
    			if(flag && h >= 0 && h <= 600){
    				$('.rt-mod').find('.placeholder-pic').attr('src','../../images/overview/add-camera1.jpg');
    				flag =false;
					flag1 =true;
					flag2 =true;
    			}else if(flag1 && h > 600 && h <= 1400){
    				$('.rt-mod').find('.placeholder-pic').attr('src','../../images/overview/add-camera2.jpg');
    				flag1 =false;
    				flag =true;
					flag2 =true;
    			}else if(flag2 && h > 1400 && h <= 1600){
    				$('.rt-mod').find('.placeholder-pic').attr('src','../../images/overview/add-camera3.jpg');
    				flag2 = false;
    				flag1 =true;
					flag =true;
    			}
    		}
    		
    		
        var scrolled = $window.scrollTop(),
            win_height_padded = $window.height() * 0.6;

        // Showed...
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
        // Hidden...
        $(".section .animated,.section.animated").each(function(index) {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (scrolled + win_height_padded < offsetTop) {
                $(this).removeClass('animated o-translateUp1 o-translateLeft1 o-opacity')
            }
        });
    }
	
	
	
	
	//拖动显示蒙版部分
	function dragMod(){
		var move = false;
		var x;
		var btn = $('.img-bg').find('.drag-bar');
		var imgbox = $('.img-bg').find('.img1');
		var maxWidth = $('.img-bg').width();
		btn.mousedown(function(e){
		    	move = true;
		    	x = e.pageX - parseFloat($(this).css('left'));
	    });
	    $(document).mousemove(function(e){
		    	var _x = e.pageX - x;
		    	if(move){
		    		if(_x > 128 && _x <= 870){
		        		btn.css('left',_x-15);
		        		imgbox.width(_x);
		    		}
		    	}
	    }).mouseup(function(e){
		    	move = false;
	    })
	}
	dragMod();
	
	
	$("#small-btn li").on("click",function(){
	    var index=$(this).index();
	    $('#big-img img').eq(index).addClass("active").siblings().removeClass("active");
	    $(this).addClass("active").siblings().removeClass("active");
	})  
	
	
	$(window).scroll(function(){
		var t = $(window).scrollTop();
		t > 60 ? $('.z2-sub-nav').addClass('fixed-sub-nav') : $('.z2-sub-nav').removeClass('fixed-sub-nav');
	});
	
	$(".lazy").lazyload({
	  	threshold : 600,
	  	placeholder:'../../../public/transparent.gif'
	});
	$('#bxslider1').bxSlider({
		auto: true,
		infiniteLoop: true,
		controls: false,
		slideWidth:1050,
		minSlides:3,
		maxSlides:3,
		moveSlides:1,
		slideMargin:54,
		startSlide:0
	});
	$('#bxslider2').bxSlider({
		auto: true,
		infiniteLoop: true,
		controls: false,
		slideWidth:1050,
		minSlides:3,
		maxSlides:3,
		moveSlides:1,
		slideMargin:54,
		startSlide:0
	});
	var bx3 = $('#bxslider3').bxSlider({
        loop: false,
        auto: false,
        infiniteLoop: true,
        pager: false,
 		onSlideNext: function() {
            var count = bx3.getCurrentSlide();
            $('#bxslider3 li').eq(count+1).addClass("cur").siblings().removeClass("cur");
            if(count==3){
           		$('.bx-world .lf li').eq(0).addClass('active').siblings().removeClass("active")
            }
			$.each($('.bx-world li'),function(i,j){ 
				if($(j).attr('data-id') == count){ 
					$(j).addClass('active').siblings().removeClass("active")
				}
			});
        },
        onSlidePrev: function() {
        		var count = bx3.getCurrentSlide();
        		$('#bxslider3 li').eq(count+1).addClass("cur").siblings().removeClass("cur");
           	$.each($('.bx-world li'),function(i,j){ 
				if($(j).attr('data-id') == count){ 
					$(j).addClass('active').siblings().removeClass("active")
				}
			});
        }
    });
    
    var bx4 = $('#bxslider4').bxSlider({
        loop: false,
        auto: false,
        infiniteLoop: false,
        pager: false,
        startSlide:1,
        onSlideNext: function() {
            var count = bx4.getCurrentSlide();
            $('#bxslider4 li').eq(count).addClass("cur").siblings().removeClass("cur")
        },
        onSlidePrev: function() {
            var count = bx4.getCurrentSlide();
            $('#bxslider4 li').eq(count).addClass("cur").siblings().removeClass("cur")
        }
    });
    
    var bx5 = $('#bxslider5').bxSlider({
		slideWidth:1050,
		minSlides:3,
		maxSlides:3,
		moveSlides:1,
		slideMargin: 64,
		startSlide:0,
		onSlideNext:function(){
			bxWorld.goToNextSlide();
		},
		onSlidePrev:function(){
			bxWorld.goToPrevSlide();
		}
	});
	
	var bxWorld = $('#bxsliderWorld').bxSlider({
		auto: false,
		controls: false,
		slideWidth:1050,
		pager:false,
		minSlides:1,
		maxSlides:1,
		moveSlides:1,
		startSlide:1
	});
    
    var dragBox = $('#bxslider3 .big-pic');
	dragBox.each(function(index,obj){
		var move = false;
		var x;
		//var box = $('.big-pic');
		var btn = $('.phone-bg').find('.drag-bar');
		var imgbox = $(obj).find('.img1');
		var maxWidth = $(obj).width();
		
		//鼠标按下时候的x轴的位置
	    btn.mousedown(function(e){
		    	move = true;
		    	x = e.pageX - parseFloat($(this).css('left'));
	    });
	    
	    $(document).mousemove(function(e){
		    	var _x = e.pageX - x;
		    	if(move){
		    		if(_x > 70 && _x <= maxWidth-44){
		        		btn.css('left',_x-7);
		        		imgbox.width(_x);
		    		}
		    	}
	    }).mouseup(function(e){
		    	move = false;
	    })
	});
    
})


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
