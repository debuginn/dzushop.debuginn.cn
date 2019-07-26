     
	 
// $(function(){
// 	//$(".kv-main .bd li").first().before( jQuery(".kv-main .bd li").last() );
// 	$(".kv-main").hover(function(){ jQuery(this).find(".arrow").stop(true,true).fadeIn(300) },function(){ jQuery(this).find(".arrow").fadeOut(300) });
// 	/*$(".kv-main").slide({ titCell:".hd ul", mainCell:".bd ul", effect:"leftLoop",autoPlay:true, vis:3,autoPage:true, trigger:"click"});*/
// });


$(function(){
	$(".main01 .tab a").mouseover(function(){
		$(this).addClass('on').siblings().removeClass('on');
		var index = $(this).index();
		number = index;
		$('.main01 .content .cont').hide();
		$('.main01 .content .cont:eq('+index+')').show();
	});
});

/*jQuery(".main02").slide({
	titCell:"h3", 
	targetCell:".wrapper", 
	effect:"slideDown", 
	delayTime:300 ,
	trigger:"click",
	triggerTime:150,
	defaultPlay:false,
	returnDefault:true
	});
*/
var $main = $(".main02");
$main.find("h3").click(function(){
	$(this).toggleClass("on");
    $(this).next(".wrapper").slideToggle("500");
	
})