$(function(){
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
                $(this).removeClass('animated o-translateUp1 o-translateLeft1 o-opacity')
            }
        });
    }
	
    
})
