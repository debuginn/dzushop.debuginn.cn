var User = (function(){
    var _user = {};

    // leftbar
    _user.leftbar = function(){
        $('.user_list h3').click(function(){
            var userIcon=$(this).find('i');
            var userUl=$(this).siblings('ul');
            if(userIcon.hasClass('user_up')){
                userIcon.removeClass('user_up').addClass('user_down');
                userUl.slideUp();
            }else{
                userIcon.removeClass('user_down').addClass('user_up');
                userUl.slideDown();
            }
        })
    };

    //物流弹出层
    _user.logisDetail = function(){
        $('.see_logis').click(function(){
            $(this).siblings('.logis_detail').fadeIn();
        })
        $('.logis_close').click(function(){
            $(this).parent('.logis_detail').fadeOut();
        })
    }

    return _user;

})(jQuery, User)

// tab
function myTab(tabclass){
    var tab_title = $(tabclass).find(".tab_title");
    var tab_body = $(tabclass).find(".tab_body");
    var tab_listIndex = 0;
    var _this = this;
    _this.tabclass = tabclass;
    tab_title.find(".tab_btn").click(function(){
        tab_listIndex =$(this).index();
        $(this).addClass("active").siblings().removeClass("active")
        tab_body.find(".tab_list").eq(tab_listIndex).show().siblings().hide();
    });
}

// 显示弹窗方法
function showLayer(layerclass){
    $('.zhezhao').fadeIn();
    $(layerclass).fadeIn();
}
//隐藏弹窗方法
function hideLayer(layerclass){
    $('.zhezhao').fadeOut();
    $(layerclass).fadeOut();
}

//select
jQuery.fn.select = function(options){  
    return this.each(function(){  
        var $this = $(this);  
        var $shows = $this.find(".shows");  
        var $selectOption = $this.find(".selectOption");  
        var $el = $this.find("ul > li");  
                                  
        $this.click(function(e){  
            $(this).toggleClass("zIndex");  
            $(this).children("ul").toggleClass("dis");  
            e.stopPropagation();  
        });  
          
        $el.bind("click",function(){  
            var $this_ = $(this);                 
            $this_.parent().parent().find(".selectOption").text($this_.text()); 
        });  
          
        $("body").bind("click",function(){  
            $this.removeClass("zIndex");  
            $this.find("ul").removeClass("dis");  
        })  
          
    //eahc End    
    });      
} 

$(function(){

    // leftbar
    //User.leftbar();

    // select
    //$(".selectContainer").select();

    // tab
    //var userTab = new myTab(".user_tab");
    
})