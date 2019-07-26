
$(function () {
    $('#productlist li').hover(function () {
        $(this).addClass('act');
    }, function () {
        $(this).removeClass('act');
    });
    $('#MachineSearchName').focus(function () {
        if ($(this).val() == '示例:EB10963046')
            $(this).val('');
        $(this).css('color', '#000');
        $(this).css('font-size', '16px');
        return false;
    });
    $('#MachineSearchName').blur(function () {
        if ($(this).val() == '') {
            $(this).val('示例:EB10963046');
            $(this).css('color', '#999');
            $(this).css('font-size', '12px');
        }
    });

    $('.machType').focus(function () {
        if ($(this).val() == '示例:Y450')
            $(this).val('');
        $(this).css('color', '#000');
        return false;
    });
    $('.machType').blur(function () {
        if ($(this).val() == '')
            $(this).val('示例:Y450');
        $(this).css('color', '#999');
    });
    /*驱动下载Tab*/
    $('#tabDriver li').click(function () {
       
        var index = $('#tabDriver li').index($(this));
        $("#tabDriver li").removeClass("wwno");
        $(this).addClass("wwno");
		// alert("111111");
        if (document.getElementById('drivercdtab1').className == "") {
			if (document.getElementById('select2'))
			{
				document.getElementById('select2').style.display = "none";
			}
            
        } else {
			if ( document.getElementById('select2'))
			{
				 document.getElementById('select2').style.display = "inline";
			}
            
        }
        $('#tab_mo').children().hide();
        $('#tab_mo').children().eq(index).show();


        return false
    });
    /*配置保修*/
    $('#peizhi').click(function () {
        $(this).addClass('wwno');
        $("#baoxiu").removeClass('wwno'); 
        //return false;
    });
    $('#baoxiu').click(function () {
        $(this).addClass('wwno');
        $("#peizhi").removeClass('wwno'); 
        //return false;
    });
    if (getCookie('AutoGetProductSn') != null && getCookie('AutoGetProductSn') != undefined && getCookie('AutoGetProductSn') != "") {
        if (document.getElementById('searchText')) {
            document.getElementById('searchText').value = getCookie('AutoGetProductSn');
        }
        if (document.getElementById('txtSearchByMachineNo')) {
            document.getElementById('txtSearchByMachineNo').value = getCookie('AutoGetProductSn');
        }
    }
    function openPage(strkey) {
        mydialog.opendlg('操作提示', 'message.aspx?key=' + strkey, 395, 210, false, true);
    }

    function doSearch() {
        if (document.getElementById('searchText').value == '请输入主机编号,如EB10963042') {
            document.getElementById('searchText').value = '';
            //alert("请输入主机编号,如EB10963042");
            openPage('');
            return;
        }
        if (document.getElementById('searchText').value == '') {
            document.getElementById('searchText').value = '';
            //alert("请输入主机编号,如EB10963042");
            openPage('');
            return;
        }
        var mNumber = document.getElementById('searchText').value.toUpperCase();

        //删除空格/^\S{2}\d{8}$/;
        mNumber = mNumber.replace(/(^\s*)|(\s*$)/g, "");
        var regIdea = /^[0-9a-zA-Z]{10}$/;
        var regThink = /^\d{4}(\w{10}|\w{3})$/;
        if (document.getElementById('peizhi').className == 'selected') {
            jsCheckMachineSn(mNumber, "/support/driver/categpryList.aspx?categoryid=" + mNumber, "/usercenter/computersearch/MyComputerSearch.aspx?showdriver=no&rid=2&id=" + mNumber);
        }
        else if (document.getElementById('baoxiu').className == 'selected') {
            jsCheckMachineSn(mNumber, "/support/driver/categpryList.aspx?categoryid=" + mNumber, "/usercenter/computersearch/MyComputerSearch.aspx?showdriver=no&rid=1&id=" + mNumber);
        }
        else {
            jsCheckMachineSn(mNumber, "/service/warranty/Warranty.aspx?model=" + mNumber, "/usercenter/computersearch/MyComputerSearch.aspx?showdriver=no&rid=3&id=" + mNumber);
        }
    }

    function doSearch2() {
        if (document.getElementById('searchText2').value == '请输入机型、主机编号或关键字进行搜索') {
            document.getElementById('searchText2').value = '';
            alert("请输入机型、主机编号或关键字进行搜索");
            return;
        }
        if (document.getElementById('searchText2').value == '') {
            document.getElementById('searchText2').value = '';
            alert("请输入机型、主机编号或关键字进行搜索");
            return;
        }
        window.open("https://support.lenovo.com.cn/lenovo/fast/SearchMain.aspx?query=" + escape(document.getElementById('searchText2').value), '', '');
    }
})