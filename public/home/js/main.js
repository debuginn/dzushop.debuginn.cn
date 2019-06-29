(function($) {
	'use strict';

	$(window).on('load', function() {
		var wind = $(window);
		$('.loading').delay(0).fadeOut('slow');
	});
	/* ----------------------------------------------------------------
		Umino's Adding active class to nav menu depending on page
-------------------------------------------------------------------*/
	var pageUrl = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
	$('.main_nav a').each(function() {
		if ($(this).attr('href') === pageUrl || $(this).attr('href') === '') {
			$(this).closest('li').addClass('active');
			$(this).parents('li').addClass('active');
		} else if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
			$('.main_nav a[href="index.html"]').parent('li').addClass('active');
		}
	});
	/*----------------------------------------*/
	/* Umino's Newsletter Popup
/*----------------------------------------*/
	setTimeout(function() {
		$('.popup_wrapper').css({
			opacity: '1',
			visibility: 'visible'
		});
		$('.popup_off').on('click', function() {
			$('.popup_wrapper').fadeOut(500);
		});
	}, 2500);
	/*----------------------------------------*/
	/*  Umino's Sticky Menu Activation
/*----------------------------------------*/
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 300) {
			$('.header-sticky').addClass('sticky');
		} else {
			$('.header-sticky').removeClass('sticky');
		}
	});
	/*----------------------------------------*/
	/*  Umino's Main Slider
/*----------------------------------------*/
	$('.main-slider').slick({
		infinite: true,
		arrows: true,
		autoplay: true,
		fade: true,
		dots: true,
		autoplaySpeed: 7000,
		speed: 1000,
		adaptiveHeight: true,
		easing: 'ease-in-out',
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>'
	});

	/*----------------------------------------*/
	/*  Toolbar Button
/*----------------------------------------*/
	$('.toolbar-btn').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();
		var $this = $(this);
		var target = $this.attr('href');
		var prevTarget = $this.parent().siblings().children('.toolbar-btn').attr('href');
		$(target).toggleClass('open');
		$(prevTarget).removeClass('open');
	});
	/*----------------------------------------*/
	/*  Close Button Actions
/*----------------------------------------*/
	$('.btn-close').on('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		$this.parents('.open').removeClass('open');
		$('.menu-item-has-children').removeClass('menu-open');
	});
	/*----------------------------------------*/
	/*  Umino's Offcanvas
/*----------------------------------------*/
	/*Variables*/
	var $offcanvasNav = $('.offcanvas-search_menu, .mobile-menu'),
		$offcanvasNavWrap = $('.offcanvas-search_wrapper, .mobile-menu_wrapper'),
		$offcanvasNavSubMenu = $offcanvasNav.find('.sub-menu'),
		$menuToggle = $('.menu-btn'),
		$menuClose = $('.btn-close');

	/*Add Toggle Button With Off Canvas Sub Menu*/
	$offcanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="ion-chevron-right"></i></span>');

	/*Close Off Canvas Sub Menu*/
	$offcanvasNavSubMenu.slideUp();

	/*Category Sub Menu Toggle*/
	$offcanvasNav.on('click', 'li a, li .menu-expand', function(e) {
		var $this = $(this);
		if (
			$this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
			($this.attr('href') === '#' || $this.hasClass('menu-expand'))
		) {
			e.preventDefault();
			if ($this.siblings('ul:visible').length) {
				$this.siblings('ul').slideUp('slow');
			} else {
				$this.closest('li').siblings('li').find('ul:visible').slideUp('slow');
				$this.siblings('ul').slideDown('slow');
			}
		}
		if ($this.is('a') || $this.is('span') || $this.attr('class').match(/\b(menu-expand)\b/)) {
			$this.parent().toggleClass('menu-open');
		} else if ($this.is('li') && $this.attr('class').match(/\b('menu-item-has-children')\b/)) {
			$this.toggleClass('menu-open');
		}
	});

	/*----------------------------------------*/
	/*  Category Menu
/*----------------------------------------*/
	$('.rx-parent').on('click', function() {
		$('.rx-child').slideToggle();
		$(this).toggleClass('rx-change');
	});
	//    category heading
	$('.category-heading').on('click', function() {
		$('.category-menu-list').slideToggle(900);
		$('.menu-expand').removeClass('active');
	});
	/*-- Category Menu Toggles --*/
	function categorySubMenuToggle() {
		var screenSize = $(window).width();
		if (screenSize <= 991) {
			$('#cate-toggle .right-menu > a').prepend('<i class="expand menu-expand"></i>');
			$('.category-menu .right-menu ul').slideUp();
		} else {
			$('.category-menu .right-menu > a i').remove();
			$('.category-menu .right-menu ul').slideDown();
		}
	}
	categorySubMenuToggle();
	$(window).resize(categorySubMenuToggle);
	/*-- Category Sub Menu --*/
	function categoryMenuHide() {
		var screenSize = $(window).width();
		if (screenSize <= 991) {
			$('.category-menu-list').hide();
		} else {
			$('.category-menu-list').show();
		}
	}
	categoryMenuHide();
	// $(window).resize(categoryMenuHide);
	$('.category-menu-hidden').find('.category-menu-list').hide();
	$('.category-menu-list').on('click', 'li a, li a .menu-expand', function(e) {
		var $a = $(this).hasClass('menu-expand') ? $(this).parent() : $(this);
		$(this).toggleClass('active');
		if ($a.parent().hasClass('right-menu')) {
			if ($a.attr('href') === '#' || $(this).hasClass('menu-expand')) {
				if ($a.siblings('ul:visible').length > 0) $a.siblings('ul').slideUp();
				else {
					$(this).parents('li').siblings('li').find('ul:visible').slideUp();
					$a.siblings('ul').slideDown();
				}
			}
		}
		if ($(this).hasClass('menu-expand') || $a.attr('href') === '#') {
			e.preventDefault();
			return false;
		}
	});

	/*----------------------------------------*/
	/*  Nice Select
/*----------------------------------------*/
	$(document).ready(function() {
		$('.nice-select').niceSelect();
	});
	/*----------------------------------------*/
	/*  Umino's Product Slider
/*----------------------------------------*/
	$('.umino-product_slider').slick({
		infinite: false,
		arrows: false,
		dots: true,
		speed: 2000,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Product Slider Two
/*----------------------------------------*/
	$('.umino-product_slider-2').slick({
		infinite: true,
		arrows: false,
		dots: false,
		speed: 2000,
		slidesToShow: 5,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Product Slider Three
/*----------------------------------------*/
	$('.umino-product_slider-3').slick({
		infinite: true,
		arrows: false,
		dots: false,
		speed: 2000,
		slidesToShow: 3,
		slidesToScroll: 1,
		rows: 2,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Product Slider Four
/*----------------------------------------*/
	$('.umino-product_slider-4').slick({
		infinite: false,
		arrows: false,
		dots: true,
		speed: 2000,
		slidesToShow: 2,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Product Slider Five
/*----------------------------------------*/
	$('.umino-product_slider-5').slick({
		infinite: true,
		arrows: false,
		dots: false,
		speed: 2000,
		slidesToShow: 9,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 7
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 6
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Latest Tweets Slider
/*----------------------------------------*/
	$('.latest-tweets_slider').slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		draggable: false,
		pauseOnHover: false,
		focusOnSelect: false,
		pauseOnFocus: false,
		dots: false,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		vertical: true,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Blog Slider
/*----------------------------------------*/
	$('.umino-blog_slider').slick({
		infinite: true,
		arrows: false,
		dots: false,
		speed: 2000,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Blog Slider Two
/*----------------------------------------*/
	$('.umino-blog_slider-2').slick({
		infinite: true,
		arrows: true,
		dots: false,
		speed: 2000,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Single Blog Slider
/*----------------------------------------*/
	$('.umino-single-blog_slider').slick({
		infinite: true,
		arrows: true,
		dots: false,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	$('.umino-single-blog_slider').on('wheel', function(e) {
		e.preventDefault();

		if (e.originalEvent.deltaY < 0) {
			$(this).slick('slickNext');
		} else {
			$(this).slick('slickPrev');
		}
	});
	/*----------------------------------------*/
	/*  Umino's Product Tab Slider
/*----------------------------------------*/
	$('.umino-product-tab_slider').slick({
		infinite: true,
		arrows: false,
		dots: false,
		speed: 2000,
		slidesToShow: 5,
		slidesToScroll: 1,
		rows: 2,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Product Tab Slider Two
/*----------------------------------------*/
	$('.umino-product-tab_slider-2').slick({
		infinite: true,
		arrows: false,
		dots: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*----------------------------------------*/
	/*  Umino's Testimonial Slider
/*----------------------------------------*/
	$('.testimonial-slider').slick({
		infinite: true,
		arrows: false,
		dots: true,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*---------------------------------------------*/
	/*  Umino's Brand Slider
/*----------------------------------------------*/
	$('.umino-brand_slider').slick({
		infinite: true,
		arrows: true,
		autoplay: true,
		dots: false,
		speed: 2000,
		slidesToShow: 6,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 6
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's List Product Slider
/*----------------------------------------*/
	$('.list-product_slider').slick({
		infinite: true,
		arrows: false,
		dots: false,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		rows: 3,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's List Product Slider Two
/*----------------------------------------*/
	$('.list-product_slider-2').slick({
		infinite: true,
		arrows: false,
		dots: false,
		speed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		rows: 3,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1501,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/* Umino's Countdown
/*----------------------------------------*/
	$('.umino-countdown').countdown('2020/12/20', function(event) {
		$(this).html(
			event.strftime(
				'<div class="count"><span class="count-amount">%D</span><span class="count-period">Days</span></div><div class="count"><span class="count-amount">%H</span><span class="count-period">Hrs</span></div><div class="count"><span class="count-amount">%M</span><span class="count-period">Mins</span></div><div class="count"><span class="count-amount">%S</span><span class="count-period">Secs</span></div>'
			)
		);
	});

	/*----------------------------------------*/
	/*  Umino's Scroll To Top
/*----------------------------------------*/
	$.scrollUp({
		scrollText: '<i class="fa fa-chevron-up"></i>',
		easingType: 'linear',
		scrollSpeed: 900
	});

	/*----------------------------------------*/
	/*  Cart Plus Minus Button
/*----------------------------------------*/
	$('.cart-plus-minus').append(
		'<div class="dec qtybutton"><i class="fa fa-angle-down"></i></div><div class="inc qtybutton"><i class="fa fa-angle-up"></i></div>'
	);
	$('.qtybutton').on('click', function() {
		var $button = $(this);
		var oldValue = $button.parent().find('input').val();
		if ($button.hasClass('inc')) {
			var newVal = parseFloat(oldValue) + 1;
		} else {
			// Don't allow decrementing below zero
			if (oldValue > 1) {
				var newVal = parseFloat(oldValue) - 1;
			} else {
				newVal = 1;
			}
		}
		$button.parent().find('input').val(newVal);
	});

	/*----------------------------------------*/
	/* Toggle Function Active
/*----------------------------------------*/
	// showlogin toggle
	$('#showlogin').on('click', function() {
		$('#checkout-login').slideToggle(900);
	});
	// showlogin toggle
	$('#showcoupon').on('click', function() {
		$('#checkout_coupon').slideToggle(900);
	});
	// showlogin toggle
	$('#cbox').on('click', function() {
		$('#cbox-info').slideToggle(900);
	});

	// showlogin toggle
	$('#ship-box').on('click', function() {
		$('#ship-box-info').slideToggle(1000);
	});

	/*----------------------------------------*/
	/* FAQ Accordion
/*----------------------------------------*/
	$('.card-header a').on('click', function() {
		$('.card').removeClass('actives');
		$(this).parents('.card').addClass('actives');
	});

	/*----------------------------------------*/
	/*  Sidebar Categories Menu Activation
/*----------------------------------------*/
	$('.sidebar-categories_menu li.has-sub > a').on('click', function() {
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp();
		} else {
			element.addClass('open');
			element.children('ul').slideDown();
			element.siblings('li').children('ul').slideUp();
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp();
		}
	});

	/*---------------------------------------------*/
	/*  Umino's CounterUp
/*----------------------------------------------*/
	$('.count').counterUp({
		delay: 10,
		time: 1000
	});

	/*----------------------------------------*/
	/*  Umino's Product View Mode
/*----------------------------------------*/
	function porductViewMode() {
		$(window).on({
			load: function() {
				var activeChild = $('.product-view-mode a.active');
				var firstChild = $('.product-view-mode').children().first();
				var window_width = $(window).width();

				if (window_width < 576) {
					$('.product-view-mode a').removeClass('active');
					$('.product-view-mode').children().first().addClass('active');
					$('.shop-product-wrap').removeClass('gridview-3 gridview-4 gridview-5').addClass('gridview-2');
				}
			},
			resize: function() {
				var ww = $(window).width();
				var activeChild = $('.product-view-mode a.active');
				var firstChild = $('.product-view-mode').children().first();
				var defaultView = $('.product-view-mode').data('default');

				if (ww < 1200 && ww > 575) {
					if (activeChild.hasClass('grid-5')) {
						$('.product-view-mode a.grid-5').removeClass('active');
						if (defaultView == 4) {
							$('.product-view-mode a.grid-4').addClass('active');
							$('.shop-product-wrap')
								.removeClass('gridview-2 gridview-3 gridview-5')
								.addClass('gridview-4');
						} else if (defaultView == 'list') {
							$('.product-view-mode a.list').addClass('active');
							$('.shop-product-wrap')
								.removeClass('gridview-2 gridview-3 gridview-4 gridview-5')
								.addClass('listview');
						} else {
							$('.product-view-mode a.grid-3').addClass('active');
							$('.shop-product-wrap')
								.removeClass('gridview-2 gridview-4 gridview-5')
								.addClass('gridview-3');
						}
					}
				}

				if (ww < 768 && ww > 575) {
					if (activeChild.hasClass('grid-4')) {
						$('.product-view-mode a.grid-4').removeClass('active');
						if (defaultView == 'list') {
							$('.product-view-mode a.list').addClass('active');
							$('.shop-product-wrap')
								.removeClass('gridview-2 gridview-3 gridview-4 gridview-5')
								.addClass('listview');
						} else {
							$('.product-view-mode a.grid-3').addClass('active');
							$('.shop-product-wrap')
								.removeClass('gridview-2 gridview-4 gridview-5')
								.addClass('gridview-3');
						}
					}
				}
				if (activeChild.hasClass('list')) {
				} else {
					if (ww < 576) {
						$('.product-view-mode a').removeClass('active');
						$('.product-view-mode').children().first().addClass('active');
						$('.shop-product-wrap').removeClass('gridview-3 gridview-4 gridview-5').addClass('gridview-2');
					} else {
						if (activeChild.hasClass('grid-2')) {
							if (ww < 1200) {
								$('.product-view-mode a:not(:first-child)').removeClass('active');
							} else {
								$('.product-view-mode a').removeClass('active');
								$('.product-view-mode a:nth-child(2)').addClass('active');
								$('.shop-product-wrap')
									.removeClass('gridview-2 gridview-4 gridview-5')
									.addClass('gridview-3');
							}
						}
					}
				}
			}
		});
		$('.product-view-mode a').on('click', function(e) {
			e.preventDefault();

			var shopProductWrap = $('.shop-product-wrap');
			var viewMode = $(this).data('target');

			$('.product-view-mode a').removeClass('active');
			$(this).addClass('active');
			if (viewMode == 'listview') {
				shopProductWrap.removeClass('grid');
			} else {
				if (shopProductWrap.not('.grid')) shopProductWrap.addClass('grid');
			}
			shopProductWrap.removeClass('gridview-2 gridview-3 gridview-4 gridview-5 listview').addClass(viewMode);
		});
	}
	porductViewMode();

	/*----------------------------------------*/
	/*  Star Rating Js
/*----------------------------------------*/
	$(function() {
		$('.star-rating').barrating({
			theme: 'fontawesome-stars'
		});
	});

	/*-------------------------------------------------*/
	/* Umino's Sticky Sidebar
/*-------------------------------------------------*/
	$('#sticky-sidebar').theiaStickySidebar({
		// Settings
		additionalMarginTop: 80
	});

	/*-------------------------------------------------*/
	/* Umino's Bootstraps 4 Tooltip
/*-------------------------------------------------*/
	$('[data-toggle="tooltip"]').tooltip({ trigger: 'hover' });
	/*--------------------------------
    Price Slider Active
-------------------------------- */
	var sliderrange = $('#slider-range');
	var amountprice = $('#amount');
	$(function() {
		sliderrange.slider({
			range: true,
			min: 20,
			max: 100,
			values: [ 0, 100 ],
			slide: function(event, ui) {
				amountprice.val('$' + ui.values[0] + ' - $' + ui.values[1]);
			}
		});
		amountprice.val('$' + sliderrange.slider('values', 0) + ' - $' + sliderrange.slider('values', 1));
	});
	/*----------------------------------------*/
	/*  Umino's Slick Carousel
 /*----------------------------------------*/
	var $html = $('html');
	var $body = $('body');
	var $elementCarousel = $('.umino-slick-slider');
	// Check if element exists
	$.fn.elExists = function() {
		return this.length > 0;
	};

	/*For RTL*/
	if ($html.attr('dir') == 'rtl' || $body.attr('dir') == 'rtl') {
		$elementCarousel.attr('dir', 'rtl');
	}

	if ($elementCarousel.elExists()) {
		var slickInstances = [];

		/*For RTL*/
		if ($html.attr('dir') == 'rtl' || $body.attr('dir') == 'rtl') {
			$elementCarousel.attr('dir', 'rtl');
		}

		$elementCarousel.each(function(index, element) {
			var $this = $(this);

			// Carousel Options

			var $options = typeof $this.data('slick-options') !== 'undefined' ? $this.data('slick-options') : '';

			var $spaceBetween = $options.spaceBetween ? parseInt($options.spaceBetween, 10) : 0,
				$spaceBetween_xl = $options.spaceBetween_xl ? parseInt($options.spaceBetween_xl, 10) : 0,
				$rowSpace = $options.rowSpace ? parseInt($options.rowSpace, 10) : 0,
				$vertical = $options.vertical ? $options.vertical : false,
				$focusOnSelect = $options.focusOnSelect ? $options.focusOnSelect : false,
				$asNavFor = $options.asNavFor ? $options.asNavFor : '',
				$fade = $options.fade ? $options.fade : false,
				$autoplay = $options.autoplay ? $options.autoplay : false,
				$autoplaySpeed = $options.autoplaySpeed ? parseInt($options.autoplaySpeed, 10) : 5000,
				$swipe = $options.swipe ? $options.swipe : true,
				$swipeToSlide = $options.swipeToSlide ? $options.swipeToSlide : true,
				$touchMove = $options.touchMove ? $options.touchMove : false,
				$verticalSwiping = $options.verticalSwiping ? $options.verticalSwiping : true,
				$draggable = $options.draggable ? $options.draggable : false,
				$arrows = $options.arrows ? $options.arrows : false,
				$dots = $options.dots ? $options.dots : false,
				$adaptiveHeight = $options.adaptiveHeight ? $options.adaptiveHeight : true,
				$infinite = $options.infinite ? $options.infinite : false,
				$centerMode = $options.centerMode ? $options.centerMode : false,
				$centerPadding = $options.centerPadding ? $options.centerPadding : '',
				$variableWidth = $options.variableWidth ? $options.variableWidth : false,
				$speed = $options.speed ? parseInt($options.speed, 10) : 500,
				$appendArrows = $options.appendArrows ? $options.appendArrows : $this,
				$prevArrow =
					$arrows === true
						? $options.prevArrow
							? '<span class="' +
								$options.prevArrow.buttonClass +
								'"><i class="' +
								$options.prevArrow.iconClass +
								'"></i></span>'
							: '<button class="tty-slick-text-btn tty-slick-text-prev">previous</span>'
						: '',
				$nextArrow =
					$arrows === true
						? $options.nextArrow
							? '<span class="' +
								$options.nextArrow.buttonClass +
								'"><i class="' +
								$options.nextArrow.iconClass +
								'"></i></span>'
							: '<button class="tty-slick-text-btn tty-slick-text-next">next</span>'
						: '',
				$rows = $options.rows ? parseInt($options.rows, 10) : 1,
				$rtl = $options.rtl || $html.attr('dir="rtl"') || $body.attr('dir="rtl"') ? true : false,
				$slidesToShow = $options.slidesToShow ? parseInt($options.slidesToShow, 10) : 1,
				$slidesToScroll = $options.slidesToScroll ? parseInt($options.slidesToScroll, 10) : 1;

			/*Responsive Variable, Array & Loops*/
			var $responsiveSetting =
					typeof $this.data('slick-responsive') !== 'undefined' ? $this.data('slick-responsive') : '',
				$responsiveSettingLength = $responsiveSetting.length,
				$responsiveArray = [];
			for (var i = 0; i < $responsiveSettingLength; i++) {
				$responsiveArray[i] = $responsiveSetting[i];
			}

			// Adding Class to instances
			$this.addClass('slick-carousel-' + index);
			$this.parent().find('.slick-dots').addClass('dots-' + index);
			$this.parent().find('.slick-btn').addClass('btn-' + index);

			if ($spaceBetween != 0) {
				$this.addClass('slick-gutter-' + $spaceBetween);
			}
			if ($spaceBetween_xl != 0) {
				$this.addClass('slick-gutter-xl-' + $spaceBetween_xl);
			}
			var $slideCount = null;
			$this.on('init', function(event, slick) {
				$this.find('.slick-active').first().addClass('first-active');
				$this.find('.slick-active').last().addClass('last-active');
				$slideCount = slick.slideCount;
				if ($slideCount <= $slidesToShow) {
					$this.children('.slick-dots').hide();
				}
				var $firstAnimatingElements = $('.slick-slide').find('[data-animation]');
				doAnimations($firstAnimatingElements);
			});

			$this.slick({
				slidesToShow: $slidesToShow,
				slidesToScroll: $slidesToScroll,
				asNavFor: $asNavFor,
				autoplay: $autoplay,
				autoplaySpeed: $autoplaySpeed,
				speed: $speed,
				infinite: $infinite,
				arrows: $arrows,
				dots: $dots,
				adaptiveHeight: $adaptiveHeight,
				vertical: $vertical,
				focusOnSelect: $focusOnSelect,
				centerMode: $centerMode,
				centerPadding: $centerPadding,
				variableWidth: $variableWidth,
				swipe: $swipe,
				swipeToSlide: $swipeToSlide,
				touchMove: $touchMove,
				draggable: $draggable,
				fade: $fade,
				appendArrows: $appendArrows,
				prevArrow: $prevArrow,
				nextArrow: $nextArrow,
				rtl: $rtl,
				responsive: $responsiveArray
			});

			$this.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
				$this.find('.slick-active').first().removeClass('first-active');
				$this.find('.slick-active').last().removeClass('last-active');
				var $animatingElements = $('.slick-slide[data-slick-index="' + nextSlide + '"]').find(
					'[data-animation]'
				);
				doAnimations($animatingElements);
			});
			function doAnimations(elements) {
				var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
				elements.each(function() {
					var $el = $(this);
					var $animationDelay = $el.data('delay');
					var $animationDuration = $el.data('duration');
					var $animationType = 'animated ' + $el.data('animation');
					$el.css({
						'animation-delay': $animationDelay,
						'animation-duration': $animationDuration
					});
					$el.addClass($animationType).one(animationEndEvents, function() {
						$el.removeClass($animationType);
					});
				});
			}

			$this.on('afterChange', function(e, slick) {
				$this.find('.slick-active').first().addClass('first-active');
				$this.find('.slick-active').last().addClass('last-active');
			});

			// Updating the sliders in tab
			$('body').on('shown.bs.tab', 'a[data-toggle="tab"], a[data-toggle="pill"]', function(e) {
				$this.slick('setPosition');
			});
		});
	}
	/*----------------------------------------*/
	/*  Single Product Image Slider
 /*----------------------------------------*/
	$('.sp-img_slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Color List
 /*----------------------------------------*/

	$('.color-list a').on('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		$this.addClass('active');
		$this.siblings().removeClass('active');
		var $navs = document.querySelectorAll('.slick-slider-nav .single-slide');
		var $details = document.querySelectorAll('.slick-img-slider .single-slide');
		console.log($navs);
		var $btnColor = $this.data('swatch-color');
		for (var i = 0; i < $navs.length; i++) {
			$navs[i].classList.remove('slick-current');
			if ($navs[i].classList.contains($btnColor)) {
				$navs[i].classList.add('slick-current');
			}
		}
		for (var i = 0; i < $details.length; i++) {
			$details[i].classList.remove('slick-current');
			$details[i].style.opacity = 0;
			if ($details[i].classList.contains($btnColor)) {
				$details[i].classList.add('slick-current');
				$details[i].style.opacity = 1;
			}
		}
	});
	/*----------------------------------------*/
	/*  Single Product Image Slider Three
 /*----------------------------------------*/
	$('.sp-img_slider-3').slick({
		infinite: true,
		slidesToShow: 4,
		vertical: true,
		slidesToScroll: 1,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-up"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-down"></i></button>',
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 4
				}
			},
			{
				breakpoint: 321,
				settings: {
					slidesToShow: 3
				}
			}
		]
	});
	/*--------------------------
        Umino's Product Zoom
	---------------------------- */
	$('.zoompro').elevateZoom({
		gallery: 'gallery',
		galleryActiveClass: 'active',
		zoomWindowWidth: 300,
		zoomWindowHeight: 100,
		scrollZoom: false,
		zoomType: 'inner',
		cursor: 'all-scroll'
	});
	/*----------------------------------------*/
	/*  Single Product Slider
 /*----------------------------------------*/
	$('.sp-slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		prevArrow: '<button class="slick-prev"><i class="ion-ios-arrow-back"></i></button>',
		nextArrow: '<button class="slick-next"><i class="ion-ios-arrow-forward"></i></button>',
		responsive: [
			{
				breakpoint: 1199,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}
		]
	});
	/*----------------------------------------*/
	/*  Umino's Isotop
/*----------------------------------------*/
	var isotopFilter = $('.isotop-filter');
	var isotopGrid = $('.isotop-grid');
	var isotopGridMasonry = $('.isotop-grid-masonry');
	var isotopGridItem = '.isotop-item';
	/*-- Images Loaded --*/
	isotopGrid.imagesLoaded(function() {
		/*-- Filter List --*/
		isotopFilter.on('click', 'button', function() {
			isotopFilter.find('button').removeClass('active');
			$(this).addClass('active');
			var filterValue = $(this).attr('data-filter');
			isotopGrid.isotope({ filter: filterValue });
		});
		/*-- Filter Grid Layout FitRows --*/
		isotopGrid.isotope({
			itemSelector: isotopGridItem,
			layoutMode: 'fitRows',
			masonry: {
				columnWidth: 1
			}
		});
		/*-- Filter Grid Layout Masonary --*/
		isotopGridMasonry.isotope({
			itemSelector: isotopGridItem,
			layoutMode: 'masonry',
			masonry: {
				columnWidth: 1
			}
		});
	});
	/*----------------------------------------*/
	/*  Umino's Venobox
/*----------------------------------------*/
	$('.venobox').venobox({
		spinner: 'wave',
		spinColor: '#51c1c6'
	});
})(jQuery);
