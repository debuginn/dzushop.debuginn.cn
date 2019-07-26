
(function($){

	$.fn.countDown = function (options) {

		config = {};

		$.extend(config, options);

		diffSecs = this.setCountDown(config);

		$('#' + $(this).attr('id') + ' .digit').html('<div class="top"></div><div class="bottom"></div>');
		$(this).doCountDown($(this).attr('id'), diffSecs, 500);

		if (config.onComplete)
		{
			$.data($(this)[0], 'callback', config.onComplete);
		}
		// if (config.omitWeeks)
		// {
		// 	$.data($(this)[0], 'omitWeeks', config.omitWeeks);
		// }
		return this;

	};

	$.fn.stopCountDown = function () {
		clearTimeout($.data(this[0], 'timer'));
	};

	$.fn.startCountDown = function () {
		this.doCountDown($(this).attr('id'),$.data(this[0], 'diffSecs'), 500);
	};

	$.fn.setCountDown = function (options) {
		var targetTime = new Date();

		if (options.targetDate)
		{
			targetTime.setDate(options.targetDate.day);
			targetTime.setMonth(options.targetDate.month-1);
			targetTime.setFullYear(options.targetDate.year);
			targetTime.setHours(options.targetDate.hour);
			targetTime.setMinutes(options.targetDate.min);
			targetTime.setSeconds(options.targetDate.sec);
		}
		else if (options.targetOffset)
		{
			targetTime.setDate(options.targetOffset.day + targetTime.getDate());
			targetTime.setMonth(options.targetOffset.month + targetTime.getMonth());
			targetTime.setFullYear(options.targetOffset.year + targetTime.getFullYear());
			targetTime.setHours(options.targetOffset.hour + targetTime.getHours());
			targetTime.setMinutes(options.targetOffset.min + targetTime.getMinutes());
			targetTime.setSeconds(options.targetOffset.sec + targetTime.getSeconds());
		}
		if(options.serverTime){
			var serverTimeTime = new Date();
			serverTimeTime.setDate(options.serverTime.day);
			serverTimeTime.setMonth(options.serverTime.month-1);
			serverTimeTime.setFullYear(options.serverTime.year);
			serverTimeTime.setHours(options.serverTime.hour);
			serverTimeTime.setMinutes(options.serverTime.min);
			serverTimeTime.setSeconds(options.serverTime.sec);
		}

		var nowTime = serverTimeTime || new Date();

		diffSecs = Math.floor((targetTime.valueOf()-nowTime.valueOf())/1000);

		$.data(this[0], 'diffSecs', diffSecs);

		return diffSecs;
	};

	$.fn.doCountDown = function (id, diffSecs, duration) {
		$this = $('#' + id);
		if (diffSecs <= 0)
		{
			diffSecs = 0;
			if ($.data($this[0], 'timer'))
			{
				clearTimeout($.data($this[0], 'timer'));
			}
		}

		secs = diffSecs % 60;
		mins = Math.floor(diffSecs/60)%60;
		hours = Math.floor(diffSecs/60/60)%24;
		days = Math.floor(diffSecs/60/60/24);
		// if ($.data($this[0], 'omitWeeks') == true)
		// {
		// 	days = Math.floor(diffSecs/60/60/24);
		// 	weeks = Math.floor(diffSecs/60/60/24/7);
		// }
		// else 
		// {
		// 	days = Math.floor(diffSecs/60/60/24)%7;
		// 	weeks = Math.floor(diffSecs/60/60/24/7);
		// }

		$this.dashChangeTo(id, 'seconds_dash', secs, duration ? duration : 800);
		$this.dashChangeTo(id, 'minutes_dash', mins, duration ? duration : 1200);
		$this.dashChangeTo(id, 'hours_dash', hours, duration ? duration : 1200);
		$this.dashChangeTo(id, 'days_dash', days, duration ? duration : 1200);
		// $this.dashChangeTo(id, 'weeks_dash', weeks, duration ? duration : 1200);

		$.data($this[0], 'diffSecs', diffSecs);
		if (diffSecs > 0)
		{
			e = $this;
			t = setTimeout(function() { e.doCountDown(id, diffSecs-1) } , 1000);
			$.data(e[0], 'timer', t);
		} 
		else if (cb = $.data($this[0], 'callback')) 
		{
			$.data($this[0], 'callback')(this);
		}

	};

	$.fn.dashChangeTo = function(id, dash, n, duration) {
		$this = $('#' + id);
		d2 = n%10;
		d1 = (n - n%10) / 10

		if ($('#' + $this.attr('id') + ' .' + dash))
		{
			$this.digitChangeTo('#' + $this.attr('id') + ' .' + dash + ' .digit:first', d1, duration);
			$this.digitChangeTo('#' + $this.attr('id') + ' .' + dash + ' .digit:last', d2, duration);
		}
	};

	$.fn.digitChangeTo = function (digit, n, duration) {
		if (!duration)
		{
			duration = 800;
		}
		if ($(digit + ' div.top').html() != n + '')
		{

			$(digit + ' div.top').css({'display': 'none'});
			$(digit + ' div.top').html((n ? n : '0')).slideDown(duration);

			$(digit + ' div.bottom').animate({'height': ''}, duration, function() {
				$(digit + ' div.bottom').html($(digit + ' div.top').html());
				$(digit + ' div.bottom').css({'display': 'block', 'height': ''});
				$(digit + ' div.top').hide().slideUp(10);

			
			});
		}
	};

})(jQuery);


