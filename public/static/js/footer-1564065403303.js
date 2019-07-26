
$(function(){
    var oChild = document.getElementById('gq_box');
    var oParent = document.getElementById('b_bit');
    var sTime;
    oParent.onmouseover=oChild.onmouseover=function(){
        clearTimeout(sTime);
        sTime = setTimeout(function(){
            oChild.style.display='block';
        },200);
    };
    oParent.onmouseout=oChild.onmouseout=function(){
        clearTimeout(sTime);
        sTime = setTimeout(function(){
            oChild.style.display='none';
        },200);
    };

    $('#bank_btn,#ns_bank').bind('mouseenter',function(){
        $('#ns_bank').show();
    })
    $('#bank_btn,#ns_bank').bind('mouseleave',function(){
        $('#ns_bank').hide();
    })

})