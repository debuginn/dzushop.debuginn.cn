function emptys(v){ 
        switch (typeof v){ 
        case 'undefined' : return true; 
        case 'string' : if(v.trim().length == 0) return true; break; 
        case 'boolean' : if(!v) return true; break; 
        case 'number' : if(0 === v) return true; break; 
        case 'object' : 
        if(null === v) return true; 
        if(undefined !== v.length && v.length==0) return true; 
        for(var k in v){return false;} return true; 
            break; 
        } 
        return false; 
    }
function findValue(li)   
{    
    if( li == null ) return alert("No match!");    
	////节点名称|节点编号|基础数据平台编号|节点逻辑
    if( !!li.extra )
	{
	   var sValue = li.extra[0]; 
		if (li.selectValue!="")
		{
		   document.getElementById('MachineSearchId').value = li.extra[0];
		   document.getElementById('MachineSearchLinkId').value = li.extra[1];
		   document.getElementById('MachineSearchLogic').value = li.extra[2];
		   document.getElementById('MachineSearchNameEncode').value = li.extra[3];
		   document.getElementById('Product_line_type').value = li.extra[4];
		   document.getElementById('MachineRealName').value = li.extra[5];
		   document.getElementById('DataType').value = li.extra[6];


		}
	} 
	flushCache();
	//alert(sValue);

}
function selectItem(li) 
{    
    findValue(li);
	document.getElementById('MachineSearchName').focus();
}
function lookupLocal()
{    
    var oSuggest = $(".ajaxinput")[0].autocompleter;    
    oSuggest.findValue();    
    return false;
}
$(document).ready(function() 
{    
        $("#MachineSearchName").autocomplete("Manage/GetMachineList.aspx",{               
              delay:10,               
              minChars:2,
//              mustMatch: false,                
//              matchSubset:true,
//              matchContains:true, 
              //resultsClass:'ac_results', 
              scroll:true,
              width:460,               
              cacheLength:10, 
              scrollHeight: 120,
              highlight:true, 
              onItemSelect:selectItem,                
              onFindValue:findValue,                
              //autoFill:true,                
              maxItemsToShow:500   
           }    
        );    
 });
 
  function initPage()
 {
   try
   {
       isPsn();
       //document.getElementById("isShowOcxMes").style.display = "none";
       //alert("您已经安装该插件");
   }
   catch(e) 
   {
       //document.getElementById("isShowOcxMes").style.display = "block";
       //alert("还未安装该插件");
   }
    fillProduct2Text("txtSearchByMachineNo",true); 
 }
 
 initPage(); 
 //AutoClickProduct();
