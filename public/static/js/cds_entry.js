var page_reg=/\/([\w | \._]+)(\?.*)?$/i;
var matchs=window.location.href.match(page_reg);
var pname;
if(matchs==null)
{
   pname='index.html';
}
else if(matchs.length>=2)
{
   pname= matchs[1];
}
pname=pname.toLowerCase();
var pkeywords={'index.html':'Ishouyecds','default.aspx':'Iwxwdcds','driverdownload.aspx':'IQDLBCDS','standardmycomputersearch.aspx':'IBHCDS'};
var entry_html='<a id="float_wss" href="'+HomeURL+'/activity/CDSSurvey/webservicesurvey.html?stype=1&intcmp='+pkeywords[pname]+'" style="display:none;height:103px;width:29px;position:fixed;_position:absolute;right:-30px;top:178px;" target="_blank">\
                <img src="'+HomeURL+'/v/images/wsssurvey.png"/>\
            </a>';
 function loadJs(url,callback)
 {
        var fileObj=document.createElement('script');
        fileObj.src = url;
        fileObj.onload = fileObj.onreadystatechange = function() {
                        if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                            callback();
                        }
                    }
        document.getElementsByTagName('head')[0].appendChild(fileObj);
 }  
if(typeof $ == 'undefined')
{
   loadJs(HomeURL+'v/js/jquery-1.6.2.min.js',init_cds_entry);
}
init_cds_entry();
function init_cds_entry()
{
     $(function(){
             $(entry_html).appendTo('body');
             var right=($(window).width()-1003)/2-29+'px';
             $('#float_wss').css({top:187,right:right});
             $('#float_wss').show();
             
                $('#float_wss').click(function(){
                    $('#float_wss').hide();
                });
               $('#float_wss').hover(function(){
                    $(this).find('img').attr('src',HomeURL+'/v/images/wsssurvey_over.png');
                },function(){
                    $(this).find('img').attr('src',HomeURL+'/v/images/wsssurvey.png');
               });
            $(window).resize(function(){
                    var right=($(window).width()-1003)/2-29+'px';
             $('#float_wss').css({top:187,right:right});
            });
         });
}