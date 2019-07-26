$(function(){
	var $window = $(window),
		win_height_padded = $window.height() * 1.1;

	$window.on('scroll', revealOnScroll);
	
   
    function revealOnScroll() {
    		
        var scrolled = $window.scrollTop(),
            win_height_padded = $window.height() * 0.5;

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
        $(".animate1:not(.animated)").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + 70 > offsetTop) {

                if ($this.data('timeout')) {
                    var time = parseInt($this.data('timeout'), 10) * 1000;
                    window.setTimeout(function() {
                        $this.addClass('animated ' + $this.data('animations'));
                    }, time);
                } else {
                    $this.addClass('animated ' + $this.data('animations'));
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
        if(isIe){
			$(".o-bg23 .o-hide .pic1").each(function(){
				$(this).hide();
			})
		}
    }
    var timeId = null;
	var oul = $('#imgList1');
	var oulHtml = oul.html();
	oul.html(oulHtml+oulHtml)
	var ali = $('#imgList1 li');
	var aliWidth = ali.eq(0).width();
	var aliSize = ali.size();
	var ulWidth = aliWidth*aliSize;
	oul.width(ulWidth);	
	var speed = 2;

	function slider(){
		if(speed<0){
			if(oul.css('left')==-ulWidth/2+'px'){
	 		oul.css('left',0);
		 	}
		 	oul.css('left','+=-2px');
		}

	 	
		if(speed>0){
			if(oul.css('left')=='0px'){
	 		oul.css('left',-ulWidth/2+'px');
		 	}
		 	oul.css('left','+='+speed+'px');
		}
	}
	
	$('.o-bg16').mouseover(function(){
		timeId = setInterval(slider,30);
		
	});

	$('.o-bg16').mouseout(function(){
		clearInterval(timeId);
	});
	
	var timeId2 = null;
	var oul2 = $('#imgList2');
	var oulHtml2 = oul2.html();
	oul2.html(oulHtml2+oulHtml2)
	var ali2 = $('#imgList2 li');
	var aliWidth2 = ali2.eq(0).width();
	var aliSize2 = ali2.size();
	var ulWidth2 = aliWidth2*aliSize2;
	oul2.width(ulWidth2);	
	var speed = 2;

	function slider2(){
		if(speed<0){
			if(oul2.css('right')==-ulWidth2/2+'px'){
	 		oul2.css('right',0);
		 	}
		 	oul2.css('right','+=-2px');
		}

	 	
		if(speed>0){
			if(oul2.css('right')=='0px'){
	 		oul2.css('right',-ulWidth2/2+'px');
		 	}
		 	oul2.css('right','+='+speed+'px');
		}
	}
	$('.o-bg17').mouseover(function(){
		timeId2 = setInterval(slider2,30);
		
	});

	$('.o-bg17').mouseout(function(){
		clearInterval(timeId2);
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
    else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0"){
    		return 'ie'
    }
    return '';
}