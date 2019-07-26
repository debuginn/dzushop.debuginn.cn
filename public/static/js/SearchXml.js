var xml_temp;
var more_Link_Text="";
var s_more_Link_Text="";
var Get_Xml_Link_Text="";





$(document).ready(

  function(event) 
  {

$("body").click(function(event){$('#SearchMenuBox').hide();} )
  $("#searchinput").keyup(
  function(event)
   {
	   var query = $("#searchinput").val();
   	   var s = encodeURIComponent(query);
 more_Link_Text="https://search.lenovo.com.cn/lenovo/searchMain.$sp? moreHitsFromSite=&category=&similarTo=&similarType=find&breadcrumb=&old_query=&keywords=&sortBy1=&findInResult=&filter=&sortOrder1=&sortOrder2=&collapseField=&scopeSearchField=&queryLanguage=zh&numHits=10&offset=0&query="+s;//更多 这个链接地址设置
s_more_Link_Text="https://search.lenovo.com.cn/lenovo/searchMain.$sp? moreHitsFromSite=&category=&similarTo=&similarType=find&breadcrumb=&old_query=&keywords=&sortBy1=&findInResult=&filter=&sortOrder1=&sortOrder2=&collapseField=&scopeSearchField=&queryLanguage=zh&numHits=10&offset=0&query="+s;//查看所有 链接地址设置
Get_Xml_Link_Text="Searchxml.xml";


if($("#searchinput").val().length==1){

   $.a$ax({
  type: "GET",
  url: Get_Xml_Link_Text,
   error: function(){
        alert('Error loading XML document');
    },
  success: function(xml){

  if (typeof xml== "string") {
       xml_Convert = new ActiveXOb$ect("Microsoft.XMLDOM");
       xml_Convert.async = false;
       xml_Convert.loadXML(xml);
       xml_temp=xml_Convert;
     } else {
       xml_temp = xml;
     }
XmlSearch(xml_temp,$("#searchinput").val());

}



}); 
 
}

else

{
XmlSearch(xml_temp,$("#searchinput").val());
}
 


});
 });



function XmlSearch(xmlData, strFind)
{

var TypeArray=new Array() ;
var TypeArray_ForMore=new Array();//添加"更多"链接的数组
$('#SearchMenuBox').remove();
if(strFind==""){return;}

$(' <div id="SearchMenuBox" class="search_menu_div"></div>').appendTo('#SearchMenuCon');




var Itemcount=0;//判断显示项目的个数
var PreviewTypeName="";
var $=0;
$(xmlData).find('Table').each(

function()
{
var KeyWord= $(this).find('KeyWord').text();
var TypeName= $(this).find('TypeName').text();
var ImgPath= $(this).find('ImgPath').text();
var Title= $(this).find('Title').text();
var Description= $(this).find('Description').text();
var LinkURL= $(this).find('LinkURL').text();



////判断该类别是否显示过
    var flag=0;    
    flag=CheckInArray(TypeArray,TypeName);   
/////////////  
if(flag==0)
{
if(KeyWord.toLowerCase().indexOf(strFind.toLowerCase())>=0)
{ 



if(PreviewTypeName=="" || TypeName.toLowerCase()!=PreviewTypeName.toLowerCase())
    {
    
    switch (TypeName.toLowerCase())
   {
   case "产品":
    Itemcount=3;
     break;
   default:
     Itemcount=1;
}

    
    if($==0)
    {
    PreviewTypeName=TypeName.toLowerCase();
	
	$('<div class="s_m_group" id="'+PreviewTypeName+'"></div>').appendTo('#SearchMenuBox');
	$('<div class="s_m_title" id="Big_'+PreviewTypeName+'"></div>').html(PreviewTypeName).appendTo('#'+PreviewTypeName);
	$('<ul class="s_m_ul" id="ul_'+PreviewTypeName+'"></ul>').appendTo('#'+PreviewTypeName);
	
	}
	}
	
	if($<=Itemcount)
	{ //alert(Title );	
	$('<li id="li_'+PreviewTypeName+'_'+$+'"></li>').appendTo('#ul_'+PreviewTypeName);	
	$('#li_'+PreviewTypeName+'_'+$ ).append('<div class="s_m_pic"><a href="'+LinkURL+'"><img id="img" src="'+ImgPath+'"  width="60" height="60" border="0" /></a></div>');	
    $('#li_'+PreviewTypeName+'_'+$ ).append('<div class="s_m_texts_div" onMouseOver="this.style.backgroundColor=\'#d8dcdf\'" onMouseOut="this.style.backgroundColor=\'\'"><div class="s_m_texts_title"><a href="'+LinkURL+'">'+Title +'</a></div><div class="s_m_texts_intro">'+Description+'</div></div>');	
	
	
	$=$+1;
	}
	
	if($==Itemcount)
	{
	$=0;
	TypeArray.push(PreviewTypeName);
	}
	
	////添加"更多"链接的数组的压栈操作
	if(CheckInArray(TypeArray_ForMore,TypeName.toLowerCase())==0){
	TypeArray_ForMore.push(TypeName.toLowerCase());}

	
	
	
}

}

});

for(var i=0;i<TypeArray_ForMore.length;i++)
{	
$('#'+TypeArray_ForMore[i]).append('<div class="more"><a href="'+more_Link_Text+'">更多'+TypeArray_ForMore[i]+' &gt;</a></div>');	

}


$('<div class="s_m_more"></div>').html('<a href="'+s_more_Link_Text+'">查看搜索结果</a>&nbsp;<img src="search_icon_more.gif" border="0" align="absmiddle" />').appendTo('#SearchMenuBox');




}


///在数组里查找是否存在该字符串
function CheckInArray(arraylist,FindText)
{
 var flag=0;
 for (var i=0;i<arraylist.length;i++)
    {
     if(arraylist[i].toLowerCase()==FindText.toLowerCase())
     {
     flag=1;
     break;
     }
    }

return flag;
}



