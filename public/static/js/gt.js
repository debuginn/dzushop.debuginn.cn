$(function(){
	$(window).scroll(function(){
		var t = $(window).scrollTop();
		t > 60 ? $('.z2-sub-nav').addClass('fixed-sub-nav') : $('.z2-sub-nav').removeClass('fixed-sub-nav');
	});
	$(".lazy").lazyload({
	  	threshold : 600,
	  	placeholder:'../../../public/transparent.gif'
	});
	
	var $window = $(window),
		win_height_padded = $window.height() * 1.1;
	$window.on('scroll', revealOnScroll);
    function revealOnScroll() {
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
                $(this).removeClass('animated o-translateUp1')
            }
        });
    }
	//拖动显示蒙版部分
	function dragMod(){
		var move = false;
		var x;
		var btn = $('.imgMod').find('.drag-bar');
		var imgbox = $('.img-bg').find('.img1');
		var maxWidth = $('.img-bg').width();
		btn.mousedown(function(e){
		    	move = true;
		    	x = e.pageX - parseFloat($(this).css('left'));
	    });
	    $(document).mousemove(function(e){
		    	var _x = e.pageX - x;
		    	if(move){
		    		if(_x > 40 && _x <= 1000){
		        		btn.css('left',_x-6);
		        		imgbox.width(_x);
		    		}
		    	}
	    }).mouseup(function(e){
		    	move = false;
	    })
	}
	dragMod();
	$('#bxslider1').bxSlider({
		auto: true,
		infiniteLoop: true,
		controls: false,
		slideWidth:1420,
		minSlides:3,
		maxSlides:3,
		moveSlides:1,
		slideMargin:22,
		startSlide:0
	});
				
	
	
	
})


