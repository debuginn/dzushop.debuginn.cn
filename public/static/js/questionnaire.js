// 检查该网站节点是否有问卷
$.ajax({
    url: "https://scanadmin.lenovo.com.cn/index.php/Scanadmin/Question/checkNode",
    type: "GET",
    data: {releaseid: webSiteId},
    dataType: "json",
    success: function(result) {
        result = typeof(result) === 'string' ? JSON.parse(result) : result;
        if(result.status == 200 && result.data) {
            switch(result.data.style) {
                case '1':
                    $('#lnv_question_a').html('意见反馈').show().attr('href', 'https://support.lenovo.com.cn/lenovo/wsi/questionnaire/UserQuestionnaire.html?sid='+result.data.sid+'&rid='+webSiteId);
                    break;
                case '2':
                    $('#lnv_question_a').html('满意度调查').show().attr('href', 'https://support.lenovo.com.cn/lenovo/wsi/questionnaire/UserQuestionnaire.html?sid='+result.data.sid+'&rid='+webSiteId);
                    break;
                case '3':
                    $('#lnv_question_img').show();
                    $('#lnv_question_img').click(function() {
                        window.open('https://support.lenovo.com.cn/lenovo/wsi/questionnaire/UserQuestionnaire.html?sid='+result.data.sid+'&rid='+webSiteId, '_blank');
                    });
                    $('#lnv_question_img').find('a').click(function(e) {
                        e.stopPropagation();
                        $(this).parent('div').hide();
                    });
                    break;
                case '4':
                    $('#lnv_question_img').show();
                    $('#lnv_question_img').click(function() {
                        window.open('https://support.lenovo.com.cn/lenovo/wsi/questionnaire/UserQuestionnaire.html?sid='+result.data.sid+'&rid='+webSiteId, '_blank');
                    });
                    $('#lnv_question_img').find('a').click(function(e) {
                        e.stopPropagation();
                        $(this).parent('div').hide();
                    });
                    break;
                default:
                    // console.log('查看问卷失败- -');
            }
        }else{
            // console.log('查看问卷失败- -');
        }
    },
    error: function(error){
        // console.log(error);
    }
});