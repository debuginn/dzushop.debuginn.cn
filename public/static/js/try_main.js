var mainUrl = "//www.lenovo.com.cn";

$(function(){
    //申请人数
    $.ajax({
        url:mainUrl+"/roamingapi/getapplycount.do",
        type:"get",
        dataType:"json",
        data:{
            plat:4/*global_platid*/,
            gcode:50976
        },
        success:function(data){
            if(data.rc==0){
                $("#applycount").html(data.applycount);
            }
            
        }
    })

    //免费申请
    $("#try_apply").bind("click",function(){
        if(passport.isLogin()==true){
            $.ajax({
                url:mainUrl+"/roamingapi/isapplytry.do",
                type:"get",
                dataType:"json",
                data:{
                    plat:4,
                    //memberid:passport.cookie.memberId,
					// lenovoid:passport.cookie.lenovoId,
                    gcode:50976
                },
                success:function(data){
                    if(data.rc==0){
                        if(data.isapply==0){
                            window.location.href="try_question.html";
                        }else if(data.isapply==1){
                            alert("您已经申请过，请耐心等待审批");
                        }
                    }
                    
                }
            })
        }else{
            passport.show();
        }
    })
})