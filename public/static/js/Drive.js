
function openFeedBack() {
    mydialog.opendlg('如果没有您需要的驱动程序下载，请将您的需求反馈给我们', 'forms/feedbackform.aspx', 730, 400, false, true);

}
function killErrors() {
    return true;
}
window.onerror = killErrors;
var isNoneDiver = false;
//不使用缓存
$.ajaxSetup({
    cache: false //关闭AJAX相应的缓存
});
//获得跟级节点数据
function setMainnode() {
    $.ajax({
        type: "get", //使用get方法访问后台
        dataType: "json", //返回json格式的数据
        url: "Manage/GetDriveProductInfo.aspx", //要访问的后台地址
        data: "parentid=" + 0, //要发送的数据
        complete: function () { $("#mainload").hide(); }, //AJAX请求完成时隐藏loading提示
        success: function (msg) {//msg为返回的数据，在这里做数据绑定
            var message = msg.message;
            if (message) {
                var data = msg.result;
                var row = $("#mainnodeTr").clone();
                //var imgrow = $("#mainnodeImg").clone();
                //给跟级节点行赋值
                $.each(data, function (i, n) {

                    if (i >= 5) {

                        return;
                    }
                    var nodeDiv = "";
                    switch (i) {
                        case 0: nodeDiv = "divone"; break;
                        case 1: nodeDiv = "divtwo"; break;
                        case 2: nodeDiv = "divthree"; break;
                        case 3: nodeDiv = "divfour"; break;
                        case 4: nodeDiv = "divfive"; break;
                        default: alert('获取数据错误空'); return;
                    }
                    //调用获得其子节点部分信息
                    setOthernode(n.nodeid, i);
                    //调用获得其子节点全部信息<a href=# >
                    setOtherAllnode(n.nodeid, i);
                    //imgrow.find("#mainnodeImg"+i).html("<a href='#' onclick=clickXiLie('"+n.nodeid+"','" + n.name+"','0')><img src='../Images/driver/"+(i+1)+".jpg'  /></a>");
                    if (i == 3) {
                        row.find("#mainnode" + i).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong><img src='../Images/driver/arrow_more_2.gif'  border='0'  />&nbsp;<a href='DriverDownLoadServer.aspx' target='_blank'>" + n.name + "</a></strong>");
                    } else {
                        row.find("#mainnode" + i).html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong><img src='../Images/driver/arrow_more_2.gif'  border='0'  />&nbsp;<a href='#' onclick=clickXiLie('" + n.nodeid + "','" + n.name + "','0')>" + n.name + "</a></strong>");
                    }

                });
                row.attr("id", "ready"); //改变绑定好数据的行的id
                row.appendTo("#mainnode"); //添加到模板的容器中
                //imgrow.attr("id","ready");//改变绑定好数据的行的id
                //imgrow.appendTo("#mainnode");//添加到模板的容器中
                $("#mainnodeTr").hide();
                //$("#mainnodeImg").hide();

            } else {
                //alert("获取数据错误main1");
                $("#MachineMain").hide();
                $("#NoMachineMain").show();
            }
        }
    });
}

//获得其他节点 部分 数据
function setOthernode(parentid, count) {

    var node = "";
    switch (count) {
        case 0: node = "nodeone"; break;
        case 1: node = "nodetwo"; break;
        case 2: node = "nodethree"; break;
        case 3: node = "nodefour"; break;
        case 4: node = "nodefive"; break;
        default: alert('获取数据错误空'); return;
    }
    var nodeDiv = "";
    switch (count) {
        case 0: nodeDiv = "divone"; break;
        case 1: nodeDiv = "divtwo"; break;
        case 2: nodeDiv = "divthree"; break;
        case 3: nodeDiv = "divfour"; break;
        case 4: nodeDiv = "divfive"; break;
        default: alert('获取数据错误空'); return;
    }
    if (jQuery.trim(node) == '') {
        //alert('获取数据错误空2');
        $("#MachineMain").hide();
        $("#NoMachineMain").show();
    }

    $.ajax({
        type: "get", //使用get方法访问后台
        dataType: "json", //返回json格式的数据
        url: "Manage/GetDriveProductInfo.aspx", //要访问的后台地址
        data: "parentid=" + parentid, //要发送的数据
        complete: function () { $("#" + node + "load").hide(); }, //AJAX请求完成时隐藏loading提示
        success: function (msg) {//msg为返回的数据，在这里做数据绑定
            var message = msg.message;
            if (message) {
                var data = msg.result;
                //给跟级节点行赋值
                $.each(data, function (i, n) {
                    if (i >= 7) {
                        if (i == 7) {
                            if (count == 3) {
                                var row = $("#" + node + "tr").clone();
                                row.find("#" + node + "td").html("<a href='DriverDownLoadServer.aspx' target='_blank' style='color:#f76a00'><img src='../Images/driver/arrow_more_2.gif'  border='0'  />&nbsp;更多</a>");
                                row.attr("id", "ready"); //改变绑定好数据的行的id
                                row.appendTo("#" + node + ""); //添加到模板的容器中
                            } else {
                                var row = $("#" + node + "tr").clone();
                                row.find("#" + node + "td").html("<a href='#'onclick=\"clickXiLie('" + n.nodeid + "','" + n.name + "','" + n.parent_id + "')\" style='color:#f76a00'><img src='../Images/driver/arrow_more_2.gif'  border='0'  />&nbsp;更多</a>"); //onclick=\"clickmore('"+nodeDiv+"','')\" 
                                row.attr("id", "ready"); //改变绑定好数据的行的id
                                row.appendTo("#" + node + ""); //添加到模板的容器中

                            }

                        }
                        return;
                    }
                    if (count == 3) {
                        var row = $("#" + node + "tr").clone();
                        row.find("#" + node + "td").html("<a href='DriverDownLoadServer.aspx' target='_blank'><img src='../Images/driver/arrow_5.gif'  border='0'  />&nbsp;" + n.name + "</a>");
                        row.attr("id", "ready"); //改变绑定好数据的行的id
                        row.appendTo("#" + node + ""); //添加到模板的容器中
                    } else {
                        var row = $("#" + node + "tr").clone();
                        row.find("#" + node + "td").html("<a href='#'  onclick=\"clickXiLie('" + n.nodeid + "','" + n.name + "','" + n.parent_id + "')\"><img src='../Images/driver/arrow_5.gif'  border='0'  />&nbsp;" + n.name + "</a>");
                        row.attr("id", "ready"); //改变绑定好数据的行的id
                        row.appendTo("#" + node + ""); //添加到模板的容器中
                    }

                });
                //alert(node);
                //$("#" + node + "tr").hide();
            } else {
                //alert(msg.result);
                $("#MachineMain").hide();
                $("#NoMachineMain").show();
            }
        }
    });
}

//获得子级全部节点
function setOtherAllnode(parentid, count) {

    var node = "";
    switch (count) {
        case 0: node = "divnodeone"; break;
        case 1: node = "divnodetwo"; break;
        case 2: node = "divnodethree"; break;
        case 3: node = "divnodefour"; break;
        case 4: node = "divnodefive"; break;
        default: alert('获取数据错误空'); return;
    }

    if (jQuery.trim(node) == '') {
        //alert('获取数据错误空3');
        $("#MachineMain").hide();
        $("#NoMachineMain").show();
    }
    $.ajax({
        type: "get", //使用get方法访问后台
        dataType: "json", //返回json格式的数据
        url: "Manage/GetDriveProductInfo.aspx", //要访问的后台地址
        data: "parentid=" + parentid, //要发送的数据
        complete: function () { $("#" + node + "Trload").hide(); }, //AJAX请求完成时隐藏loading提示
        success: function (msg) {//msg为返回的数据，在这里做数据绑定
            var message = msg.message;
            if (message) {
                var data = msg.result;
                //给跟级节点行赋值
                var len = msg.result.length;
                var row = "";
                $.each(data, function (i, n) {
                    if (i % 2 == 0) {
                        row = $("#" + node + "Tr").clone();
                        row.find("#" + node + "Td1").html("<img src='../Images/driver/arrow_5.gif'  border='0'  />&nbsp;<a href='#' onclick=\"clickXiLie('" + n.nodeid + "','" + n.name + "','" + n.parent_id + "')\">" + n.name + "</a>");
                        if (i == (len - 1)) {
                            row.attr("id", "ready"); //改变绑定好数据的行的id
                            row.appendTo("#" + node + ""); //添加到模板的容器中
                        }
                    }
                    else {
                        row.find("#" + node + "Td2").html("<img src='../Images/driver/arrow_5.gif'  border='0'  />&nbsp;<a href='#' onclick=\"clickXiLie('" + n.nodeid + "','" + n.name + "','" + n.parent_id + "')\">" + n.name + "</a>");
                        row.attr("id", "ready"); //改变绑定好数据的行的id
                        row.appendTo("#" + node + ""); //添加到模板的容器中
                    }
                });
                if (isopenwinok == 4) {
                    setTimeout("AutoClickProduct()", 500);
                } else {
                    isopenwinok = isopenwinok + 1;
                }


            } else {
                //alert(msg.result);
                $("#MachineMain").hide();
                $("#NoMachineMain").show();
            }
        }
    });
}
function AutoClickProduct() {
    //全部加载以后

    if (_linkFrom == "7234") {
        //clickXiLie('7234','台式','0');
    } else if (_linkFrom == "6215") {
        //clickXiLie('6215','笔记本','0'); 
    } else if (_linkFrom == "7235") {
        //clickXiLie('7235','一体机','0'); 
    } else if (_linkFrom == "643") {
        //clickXiLie('643','服务器','0'); 
    } else if (_linkFrom == "7281") {
        //clickXiLie('7281','外设数码及网路','0'); 
    }
}

//<a href="WebProductTreeSearch.aspx?id=10&keepThis=true&TB_iframe=true&height=250&width=400" title="机型选择" class="thickbox">Example 1</a> 
//点击更多弹出层
function clickmore(node, name) {
    //alert(node);
    setmore(node, name);
}
//给更多的弹出层赋值
function setmore(nodediv, name) {
    /*
    顺序 参数 功能 备注 
    1 title 弹出层的标题 必填，纯文本 
    2 content 弹出层的内容 :url get或post某一页面里的html，该页面要求只包含body的子标签 
    :text 直接写入内容 
    :id 显示页面里某id的子标签 
    :iframe 层内内容以框架显示 
    3 width 弹出层的宽 必填，css值，比如“200px” 
    4 height 弹出层的高 如上，但是可用“auto” 
    5 cssName 弹出层的css 给id floatBox加入的样式名，层内样式可以通过这个样式名来定制 
    onclick="Javascript:window.parent.window.scrollTo(0,0)"   IE6滚屏解决
    */
    dialog("机型选择", "id:" + nodediv, "570px", "auto", "id");

    //dialog(name+"产品线下系列选择","url:WebProductTreeSearch.aspx?id=10","650px","auto","url");

}
//点击系列弹出层
function clickXiLie(id, name, parentid) {

    //dialog("机型选择","url:WebProductTreeSearch.aspx?id=10","650px","auto","url"); 
    //dialog("机型选择","iframe:WebProductTreeSearch.aspx?id='"+id+"'&parentid='"+parentid+"'","570px","310px","iframe"); 
    if (isopenwin == 0) {
        mytreedialog.opendlg_tree('请按照选择 产品大类 > 产品系列 > 产品型号 的方式分层查找', '../WebProductTreeSearch.aspx?id=' + id + '&parentid=' + parentid, 570, 350, false, true);
        isopenwin = 1;
    }


}
//按编号搜索
function clickSearch(id, name) {
    //https://10.99.35.112/lenovo/wsi/Modules/DriverDownLoad.aspx?SearchType=1&LogicType=1&OSTypeId=3&MachineId=-6032&SN=&IsBackPage=false&IsSeachOne=true&partId=
}
function openPage(strkey) {
    mydialog.opendlg('操作提示', 'message.aspx?key=' + strkey, 395, 210, false, true);
}
function goToDriverByIdFrom(type) {
    if (type == "baoxiu") {

        if ($('#txtSearchByMachineNo')) {
            var r = /^[0-9]*[1-9][0-9]*$///正整数
            var mNumber = $("#txtSearchByMachineNo").val();
            if (mNumber == "示例:EB10963046" || mNumber == "") {
                alert('请输入主机编号');
                $('#txtSearchByMachineNo').focus();
                return;
            }

            mNumber = mNumber.replace(/[- －　]/g, '');
            var regErr = /^[0-9a-zA-Z]{10}$/; //
            var regErr3 = /^[0-9a-zA-Z]{15}$/; //
            var regErr2 = /^[0-9a-zA-Z]{14}$/; //
            var regIdea = /^\D{2}\d{8}/;
            var regThink = /^\d{4}(\w{10}|\w{3})/;
            if (mNumber.length == 15) {
                //服务器驱动
                //location.href = 'https://support1.lenovo.com.cn/lenovo/wsi/usercenter/computersearch/StandardMyComputerSearch.aspx?id='+sn+'&showradio=1&showdriver=no';

                //4M0237375131973
                if (/^\d(\M|\m)/.test(mNumber)) {
                    location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?fromtype=' + type + '&id=' + jQuery.trim($("#txtSearchByMachineNo").val().toUpperCase()) + '&showradio=1&showdriver=no';
                }
                else {
                    window.open("https://think.lenovo.com.cn/service/warranty/Warranty.aspx?model=" + mNumber);
                }
                return;
            }

            if (mNumber.length == 18) {
                window.open("https://think.lenovo.com.cn/service/warranty/Warranty.aspx?model=" + mNumber);
            }

            if (regThink.test(mNumber)) {
                var subString = mNumber.substring(0, 7);
                //alert("https://think.lenovo.com.cn/service/warranty/SearchWarranty.aspx?sn=" + mNumber);
                window.open("https://think.lenovo.com.cn/service/warranty/Warranty.aspx?model=" + mNumber);
                return;
            }
            else if (regIdea.test(mNumber)) {
                location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?fromtype=' + type + '&id=' + jQuery.trim(mNumber.toUpperCase()) + '&showradio=1&showdriver=no';
                return;
            }
            else {
                // alert("我们无法验证您所输入的主机编号。\n请重新输入或查看下方的如何查找主机编号教程。");
                if (/.*[\u4e00-\u9fa5]+.*$/.test(mNumber)) {
                    document.getElementById("drvtips").innerHTML = "您输入的主机编号格式不正确。请输入有效的主机编号。";
                    return;
                } else {
                    document.getElementById("drvtips").innerHTML = "我们无法验证您所输入的主机编号。请重新输入或查看下方的如何查找主机编号教程。";
                    return;
                }

            }

            //r.test(str); //str为你要判断的字符 执行返回结果 true 或 false
            mNumber = mNumber.length > 10 ? mNumber.substring(0, 10) : mNumber;
            var sn = jQuery.trim(mNumber.toUpperCase());
            if (sn != null && sn.length >= 1 && sn.length < 10 && r.test(sn)) {
                //驱动编号
                window.open('DriverDetail.aspx?ID=' + sn, '', '', '');
                return;
            }
            if (sn != null && sn.length >= 1 && sn.length < 10 && r.test(sn.substr(1))) {
                //服务器驱动
                window.open('DriverDetail.aspx?ID=' + sn, '', '', '');
                return;
            }


            if (sn != null && sn.length >= 14) {
                //如果是S9e与s10e型数据，进行跳转标准驱动处理页面，进行处理
                window.location.href = "../usercenter/computersearch/MyComputerSearch.aspx?id=" + sn;
            } else {
                if (mNumber.length > 0 && mNumber != '示例:EB10963046') {
                    if (!isNaN(mNumber) && mNumber.length <= 5) {
                        //location.href = 'Driverdownload.aspx?SearchType=2&LogicType=1&MachineId=&SN=' + jQuery.trim(mNumber.toUpperCase()) + '&IsBackPage=false&IsSeachOne=true&type=3&driverfrom=2&machineseq=' + jQuery.trim(mNumber.toUpperCase());
                        location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?fromtype=' + type + '&id=' + jQuery.trim(mNumber.toUpperCase()) + '&showradio=1&showdriver=no';
                    } else {
                        //location.href = 'Driverdownload.aspx?SearchType=2&LogicType=1&MachineId=&SN=' + jQuery.trim(mNumber.toUpperCase()) + '&IsBackPage=false&IsSeachOne=true&type=3&driverfrom=2&machineseq=' + jQuery.trim(mNumber.toUpperCase());
                        location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?fromtype=' + type + '&id=' + jQuery.trim(mNumber.toUpperCase()) + '&showradio=1&showdriver=no';
                    }


                } else {
                    alert('请输入主机编号');
                    $('#txtSearchByMachineNo').focus();
                }
            }

        } else {
            alert('请输入主机编号');
            $('#txtSearchByMachineNo').focus();
        }


    } else {
        if ($('#txtSearchByMachineNo')) {
            var r = /^[0-9]*[1-9][0-9]*$///正整数
            var mNumber = $("#txtSearchByMachineNo").val();
            if (mNumber == "示例:EB10963046" || mNumber == "") {
                alert('请输入主机编号或驱动编号');
                $('#txtSearchByMachineNo').focus();
                return;
            }

            mNumber = mNumber.replace(/[- －　]/g, '');
            var regIdea = /^\D{2}\d{8}/;
            var regThink = /^\d{4}(\w{10}|\w{3})/;
            if (regThink.test(mNumber)) {
                var subString = mNumber.substring(0, 7);
                window.open("https://think.lenovo.com.cn/support/driver/categpryList.aspx?categoryid=" + subString);
                return;
            }

            //r.test(str); //str为你要判断的字符 执行返回结果 true 或 false
            mNumber = mNumber.length > 10 ? mNumber.substring(0, 10) : mNumber;
            var sn = jQuery.trim(mNumber.toUpperCase());

            if ($("#txtSearchByMachineNo").val() != null && $("#txtSearchByMachineNo").val().length == 15) {
                //服务器驱动
                //location.href = 'https://support1.lenovo.com.cn/lenovo/wsi/usercenter/computersearch/StandardMyComputerSearch.aspx?id='+sn+'&showradio=1&showdriver=no';
                location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?fromtype=' + type + '&id=' + jQuery.trim($("#txtSearchByMachineNo").val().toUpperCase()) + '&showradio=1&showdriver=no';

                return;
            }

            if (sn != null && sn.length >= 1 && sn.length < 10 && r.test(sn)) {
                //驱动编号
                window.open('DriverDetail.aspx?ID=' + sn, '', '', '');
                return;
            }
            if (sn != null && sn.length >= 1 && sn.length < 10 && r.test(sn.substr(1))) {
                //服务器驱动
                window.open('DriverDetail.aspx?ID=' + sn, '', '', '');
                return;
            }


            if (sn != null && sn.length >= 14) {
                //如果是S9e与s10e型数据，进行跳转标准驱动处理页面，进行处理
                window.location.href = "../usercenter/computersearch/MyComputerSearch.aspx?id=" + sn;
            } else {
                if (mNumber.length > 0 && mNumber != '示例:EB10963046') {
                    if (!isNaN(mNumber) && mNumber.length <= 5) {
                        //location.href = 'Driverdownload.aspx?SearchType=2&LogicType=1&MachineId=&SN=' + jQuery.trim(mNumber.toUpperCase()) + '&IsBackPage=false&IsSeachOne=true&type=3&driverfrom=2&machineseq=' + jQuery.trim(mNumber.toUpperCase());
                        location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?fromtype=' + type + '&id=' + jQuery.trim(mNumber.toUpperCase()) + '&showradio=1&showdriver=no';
                    } else {
                        //location.href = 'Driverdownload.aspx?SearchType=2&LogicType=1&MachineId=&SN=' + jQuery.trim(mNumber.toUpperCase()) + '&IsBackPage=false&IsSeachOne=true&type=3&driverfrom=2&machineseq=' + jQuery.trim(mNumber.toUpperCase());
                        location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?fromtype=' + type + '&id=' + jQuery.trim(mNumber.toUpperCase()) + '&showradio=1&showdriver=no';
                    }


                } else {
                    alert('请输入主机编号或驱动编号');
                    $('#txtSearchByMachineNo').focus();
                }
            }

        } else {
            alert('请输入主机编号或驱动编号');
            $('#txtSearchByMachineNo').focus();
        }

    }

}
function goToDriverById() {
    if ($('#txtSearchByMachineNo')) {
        var r = /^[0-9]*[1-9][0-9]*$///正整数
        var mNumber = $("#txtSearchByMachineNo").val();
        if (mNumber == "示例:NC00401609" || mNumber == "") {
            alert('请输入主机编号或驱动编号');
            $('#txtSearchByMachineNo').focus();
            return;
        }

        mNumber = mNumber.replace(/[- －　]/g, '');
        var regIdea = /^\D{2}\d{8}/;
        var regThink = /^\d{4}(\w{10}|\w{3})/;
        if (regThink.test(mNumber)) {
            var subString = mNumber.substring(0, 7);
            window.open("https://think.lenovo.com.cn/support/driver/categpryList.aspx?categoryid=" + subString);
            return;
        }

        //r.test(str); //str为你要判断的字符 执行返回结果 true 或 false
        mNumber = mNumber.length > 10 ? mNumber.substring(0, 10) : mNumber;
        var sn = jQuery.trim(mNumber.toUpperCase());
        if (sn != null && sn.length >= 1 && sn.length < 10 && r.test(sn)) {
            //驱动编号
            window.open('DriverDetail.aspx?ID=' + sn, '', '', '');
            return;
        }
        if (sn != null && sn.length >= 1 && sn.length < 10 && r.test(sn.substr(1))) {
            //服务器驱动
            window.open('DriverDetail.aspx?ID=' + sn, '', '', '');
            return;
        }


        if (sn != null && sn.length >= 14) {
            //如果是S9e与s10e型数据，进行跳转标准驱动处理页面，进行处理
            window.location.href = "../usercenter/computersearch/MyComputerSearch.aspx?id=" + sn;
        } else {
            if (mNumber.length > 0 && mNumber != '示例:NC00401609') {
                if (!isNaN(mNumber) && mNumber.length <= 5) {
                    //location.href = 'Driverdownload.aspx?SearchType=2&LogicType=1&MachineId=&SN=' + jQuery.trim(mNumber.toUpperCase()) + '&IsBackPage=false&IsSeachOne=true&type=3&driverfrom=2&machineseq=' + jQuery.trim(mNumber.toUpperCase());
                    location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?id=' + jQuery.trim(mNumber.toUpperCase()) + '&showradio=1&showdriver=no';
                } else {
                    //location.href = 'Driverdownload.aspx?SearchType=2&LogicType=1&MachineId=&SN=' + jQuery.trim(mNumber.toUpperCase()) + '&IsBackPage=false&IsSeachOne=true&type=3&driverfrom=2&machineseq=' + jQuery.trim(mNumber.toUpperCase());
                    location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?id=' + jQuery.trim(mNumber.toUpperCase()) + '&showradio=1&showdriver=no';
                }


            } else {
                alert('请输入主机编号或驱动编号');
                $('#txtSearchByMachineNo').focus();
            }
        }

    } else {
        alert('请输入主机编号或驱动编号');
        $('#txtSearchByMachineNo').focus();
    }

}
/* 
中文判断函数，允许生僻字用英文“*”代替 
返回true表示是符合条件，返回false表示不符合 
*/
function isChinese(str) {

    return false;
}
/* 
数字判断函数，返回true表示是全部数字，返回false表示不全部是数字 
*/
function isNumber(str) {
    if ("" == str) {
        return false;
    }
    var reg = /\D/;
    return str.match(reg) == null;
}
function DoSearch_SN(sn) {


    //谷歌浏览器的
    //  if (navigator.userAgent.indexOf("chrome") > 0 || navigator.userAgent.indexOf("Safari") > 0) {
    //alert("xixixi");
    // DoSearchMMSS();
    // state_ChangeBN
    //  return;
    //  } else { window.location = "#"; }
    var r = /^[0-9]*[1-9][0-9]*$///正整数

    var mNumber = sn;
    //test

    var OKSn = ""; //
    //去空格
    mNumber = mNumber.replace(/[- －　]/g, '');
    //47位验证

    var regIdea = /^[0-9a-zA-Z]{10}$/; //IDEA 产品
    var regThink = /^\d{4}(\w{10}|\w{3})/; //think 产品的
    if (mNumber.length == 4 || mNumber.length == 7 || mNumber.length == 14 || mNumber.length == 10) {

        if (mNumber.length == 4) {
            //四位号
            // NumType = 4;
            AjaxResultSN(mNumber);
        }
        else if (regIdea.test(mNumber) && mNumber.length == 10) {
            //这个是idea
            AjaxResultSN(mNumber);
        }
        else {//7,14
            var subStringTSN = mNumber.substring(0, 7);

            if (regThink.test(subStringTSN)) {

                //7位号 14位截取
                // NumType = 7;
                AjaxResultSN(mNumber);
            } else {

                //SearchSave(mNumber); //保存到数据
                // JqueryDialog.OpenShow('错误', '<div style="margin-top: 15px;  text-align :center ;font-size:20px">请输入正确的4位或7位或14位主机编号</div>', 420, 100);
                //massgeDiv("提示", "请输入正确的主机编号");
                // alert(""); return false;
                document.getElementById("loading").style.dispaly = "none";
                //alert('您当前的主机');
                alert('我们无法验证您所输入的主机编号。请重新输入或查看下方的如何查找主机编号教程。');
            }

        }

    }
    else {
        //SearchSave(mNumber); ////保存到数据
        //massgeDiv("提示", "请输入正确的主机编号");

        // JqueryDialog.OpenShow('错误', '<div style="margin-top: 15px;  text-align :center;font-size:20px ">请输入主机编号</div>', 360, 100);

        //alert(""); return false;
        document.getElementById("loading").style.dispaly = "none";
        //alert('您当前的主机');
        //var myurl = "https://support1.lenovo.com.cn/lenovo/fast/SearchMain.aspx?query=" + sn + "&offset=0";
       // location.href = myurl;
        alert('我们无法验证您所输入的主机编号。请重新输入或查看下方的如何查找主机编号教程。');
    }
}


//对主机编号进行验证，并做出重复机型的提示和判断
function AjaxResultSN(ThinkSN) {

    //    
    //    $.ajax({
    //        type: "get", //使用get方法访问后台
    //        dataType: "json", //返回json格式的数据
    //        url: "https://think.lenovo.com.cn/support/driver/categoryList.aspx", //要访问的后台地址
    //        data: "categoryid=" + ThinkSN, //要发送的数据
    //        complete: function() {  }, //AJAX请求完成时隐藏loading提示
    //        success: function(msg) {//msg为返回的数据，在这里做数据绑定
    //            var message = msg.message;
    //            if (message) {
    //                var data = msg.result;
    //                //给跟级节点行赋值
    //                var len = msg.result.length;
    //                var row = "";
    //                $.each(data, function(i, n) {
    //                    
    //                });
    //                alert(ThinkSN);
    //
    //            } else {
    //                //alert(msg.result);
    //
    //            }
    //        }
    //    });


    $.ajax({
        type: "get",
        url: "getThinkSN.aspx?sn=" + ThinkSN,
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();

        },
        success: function (data, textStatus) {
            //谷歌浏览器的

            if (navigator.userAgent.indexOf("chrome") > 0 || navigator.userAgent.indexOf("Safari") > 0) {
                //alert("xixixi");
                // DoSearchMMSS();
                //state_ChangeBN(data);
                //return;
            }
            //  alert(data);
            //这个是验证成功
            var tempdate = eval('(' + data + ')');

            //alert(tempdate.isok);
            if (tempdate.isok == 2) {
                alert('您的主机编号同时存在多个型号\n请从下拉列表选择您机型的驱动列表');
                document.getElementById('loading').style.display = "none";
                document.getElementById('MachineSearchName').focus();
                return;

                //   alert(tempdate.isok);
                //  alert(tempdate.msg);
                setCookie("sn7", ThinkSN, 60);
                //document.getElementById("drivertips").innerHTML='<table  width="45 0" height="55px" style="margin-top:1px;_margin-left:10px;*margin-left:10px;" cellpadding=0 cellspacing=0 >' + tempdate.msg + '</table>';
                //openPage('<table  width="300" height="55px" style="margin-top:10px;_margin-left:10px;*margin-left:10px;" cellpadding=0 cellspacing=0 >' + tempdate.msg + '</table>');
                //ShowListModels("请选择", tempdate.msg);
                //   JqueryDialog.OpenShow('请选择', '<table  width="300" height="55px" style="margin-top:10px;_margin-left:10px;*margin-left:10px;" cellpadding=0 cellspacing=0 >' + tempdate.msg + '</table>', 360, 120);
            }

            if (tempdate.isok == 0) {
                //alert(tempdate.isok);
                //massgeDiv("提示", tempdate.msg);
                // JqueryDialog.OpenShow('提示', '<div style="margin-top:15px;  text-align :center; font-size:20px ">' + tempdate.msg + '</div>', 360, 100);
                document.getElementById('loading').style.display = "none";
                //document.getElementById("loading").style.dispaly="none";
                //alert('您当前的主机');
                /*
                var myurl = "https://support1.lenovo.com.cn/lenovo/fast/SearchMain.aspx?query=" + sn + "&offset=0";
                isNoneDiver = myurl;
                window.open(myurl);
                openLocation(myurl);
                */
                 alert('我们无法验证您所输入的主机编号。请重新输入或查看下方的如何查找主机编号教程。');
                //return;
            }
            if (tempdate.isok == 1) {
                setCookie("sn7", ThinkSN, 60);
                //https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=3043900&CODEName=4319A17&SearchNodeCC=4319A17&SearchType=1&wherePage=1&Rcode=4319A17
                var myurl = "https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=" + tempdate.msg + "&CODEName=" + ThinkSN + "&SearchNodeCC=" + ThinkSN + "&SearchType=1&wherePage=2&Rcode=" + tempdate.codeName;
                //alert(myurl);
                document.getElementById('loading').style.display = "none";
                isNoneDiver = myurl;
                location.href = myurl;
                openLocation(myurl);

            }
            if (tempdate.isok == 3) {
                setCookie("sn7", ThinkSN, 60);
                document.getElementById('loading').style.display = "none";

                window.location.href = tempdate.msg;
                openLocation(tempdate.msg);
                //return;
            }
            if (tempdate.isok == 4) {
                document.getElementById('loading').style.display = "none";
                setCookie("sn7", ThinkSN, 60);
                //                        "https://support1.lenovo.com.cn/lenovo/wsi/Modules/Driverdownload.aspx?"
                //                                        + "SearchType=2&LogicType=1&MachineId=&SN=" + this.categoryid + "&IsBackPage=false&IsSeachOne=true&type=3&driverfrom=2&machineseq=" + this.categoryid;
                //idea 驱动的
                location.href = "https://support1.lenovo.com.cn/lenovo/wsi/Modules/Driverdownload.aspx?SearchType=2&LogicType=1&MachineId=&SN=" + tempdate.msg + "&IsBackPage=false&IsSeachOne=true&type=3&driverfrom=2&machineseq=" + tempdate.msg + "";
                //return;
            }


        },
        complete: function (XMLHttpRequest, textStatus) {
            //HideLoading();
            //alert("33");

        },
        error: function () {
            //请求出错处理
            //alert("3ww3");
        }
    });

    function openLocation(site) {
        window.location.href = site;
    }


}

function IsThinkSN(ThinkSN) {
    ThinkSN = ThinkSN.replace(/[- －　]/g, '');

    var isThinkFourSN = false;
    $.ajax({
        type: "get",
        url: "getThinkSN.aspx?sn=" + ThinkSN,
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();

        },
        success: function (data, textStatus) {
            //谷歌浏览器的
            var tempdate = eval('(' + data + ')');
            //alert(tempdate.isok);
            if (tempdate.isok == 1) {
                isThinkFourSN = true;
                var myurl = "https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=" + tempdate.msg + "&CODEName=" + ThinkSN + "&SearchNodeCC=" + ThinkSN + "&SearchType=1&wherePage=2&Rcode=" + tempdate.codeName;
                //alert(myurl);


                //https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=3096500&CODEName=4282A78&SearchNodeCC=4282A78&SearchType=1&wherePage=1&Rcode=4282A78

                window.open(myurl);
                return true;

            } else {
                isThinkFourSN = false;
                window.location.href = "DriverDetail.aspx?ID=" + ThinkSN;
                return;
            }

        },
        complete: function (XMLHttpRequest, textStatus) {
            //HideLoading();
            //alert("33");
            return isThinkFourSN;
        },
        error: function () {
            //请求出错处理
            //alert("3ww3");
            return isThinkFourSN;
        }
    });



}

function IsIdeaSN(IdeaSN) {

    var isIdeaSN = false;
    $.ajax({
        type: "get",
        url: "getIdeaSN.aspx?sn=" + IdeaSN,
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();

        },
        success: function (data, textStatus) {
            //谷歌浏览器的
            var tempdate = eval('(' + data + ')');
            //alert(tempdate.isok);
            if (tempdate.isok == 1) {
                isIdeaSN = true;
                document.getElementById("loading").style.dispaly = "none";
                location.href = "../usercenter/computersearch/StandardMyComputerSearch.aspx?id=" + IdeaSN + "&showradio=1&showdriver=no";
                return true;

            } else {
                document.getElementById("loading").style.dispaly = "none";
                //alert('您当前的主机');
               // var myurl = "https://support1.lenovo.com.cn/lenovo/fast/SearchMain.aspx?query=" + IdeaSN + "&offset=0";
               // location.href = myurl;
                alert('我们无法验证您所输入的主机编号。请重新输入或查看下方的如何查找主机编号教程。');
                return false;

            }

        },
        complete: function (XMLHttpRequest, textStatus) {
            //HideLoading();
            //alert("33");
            return isIdeaSN;
        },
        error: function () {
            //请求出错处理
            //alert("3ww3");
            return isIdeaSN;
        }
    });



}




function IsThinkIdeaSN(IdeaSN) {
    var isIdeaSN = false;
    //alert("00000");
    $.ajax({
        type: "get",
        url: "getThinkSN.aspx?sn=" + IdeaSN,
        beforeSend: function (XMLHttpRequest) {
            //ShowLoading();

        },
        success: function (data, textStatus) {
            //谷歌浏览器的
            //alert(data);
            var tempdate = eval('(' + data + ')');
            //alert(tempdate.isok);
            if (tempdate.isok == 1) {
                //Think
                document.getElementById("loading").style.dispaly = "none";
                IsThinkSN(IdeaSN);

            } else {
                //Idea
                document.getElementById("loading").style.dispaly = "none";
                IsIdeaSN(IdeaSN);

            }

        },
        complete: function (XMLHttpRequest, textStatus) {
            //HideLoading();
            //alert("33");
            //return isIdeaSN;
        },
        error: function () {
            //请求出错处理
            //alert("3ww3");
            //return isIdeaSN;
        }
    });



}
function goToDriverBySN(sn) {
    var myurl = "../usercenter/computersearch/StandardMyComputerSearch.aspx?id=" + sn + "&showradio=1&showdriver=no";
    location.href = myurl;
}



function goToDriverByIdFromName() {
    var machineSearchName = document.getElementById('MachineSearchName').value;
    var MachineSearchId = document.getElementById('MachineSearchId').value;
    var MachineSearchLinkId = document.getElementById('MachineSearchLinkId').value;
    var MachineRealName = document.getElementById('MachineRealName').value;
    var DataType = document.getElementById('DataType').value.replace("</strong>", "");

    //记录查询日志
    $.ajax({
        type: "post",
        url: "../handlers/SaveQueryMessage.ashx",
        data: { querycontect: machineSearchName, queryposition: '驱动首页搜索-' + DataType },
        async: true,
        success: function () {

        },
        Error: function () {

        }
    });


    //DataType="100000";
    //去空格
    machineSearchName = machineSearchName.replace(/[- －　]/g, '');
    if (DataType == "1000") {
        alert('请从下拉列表中选择,更精确查找驱动');
        document.getElementById('MachineSearchName').focus();
        return;
    }
    /*
    依据用户选择的方式，采取不同的跳转
    2012/3/4
    DataType 1 机型名称
    DataType 3 驱动编号
    */
    if (machineSearchName == "" || machineSearchName == "示例:EB10963046") {
        alert('请输入您的主机编号或机型');
        document.getElementById('MachineSearchName').focus();
        return;
    }
    document.getElementById('loading').style.display = "block";
    //alert(DataType);


    if (DataType == "1") {
        //开始========================
        if (jQuery.trim($("#Product_line_type").val()) == "3") {
            //服务器
            location.href = 'DriverDownLoadServer.aspx';
        }
        else if ($("#MachineSearchLogic").val() == "0") {
            //不走57
            location.href = 'Driverdownload.aspx?SearchType=1&from=select&LogicType=0&MachineId=' + $("#MachineSearchId").val() + '&SN=&IsBackPage=false&IsSeachOne=true&typename=' + $("#MachineSearchNameEncode").val();
        } else {

            if ($("#MachineSearchId").val() == 6492) { //这个是s9e update by yangxucai 20110706 上线时候记得改路径

                location.href = 'https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=29744&CODEName=IdeaPadS9e&SearchType=0&wherePage=4';
            } else if ($("#MachineSearchId").val() == 6493) {
                //这个是s10e
                location.href = 'https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=29745&CODEName=IdeaPadS10e&SearchType=0&wherePage=4';

            } else {
                location.href = 'Driverdownload.aspx?SearchType=1&ptype=' + jQuery.trim($("#Product_line_type").val()) + '&from=select&LogicType=1&MachineId=' + $("#MachineSearchLinkId").val() + '&SN=&IsBackPage=false&IsSeachOne=true&typename=' + $("#MachineSearchNameEncode").val();
            }

            //  location.href='Driverdownload.aspx?SearchType=1&LogicType=1&MachineId=' + $("#MachineSearchLinkId").val()+'&SN=&IsBackPage=false&IsSeachOne=true&typename='+$("#MachineSearchNameEncode").val();
        }
        //结束========================
    } else if (DataType == "2") {
        //IsThinkSN
        var myurl = "https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=" + MachineSearchId + "&CODEName=" + machineSearchName + "&SearchNodeCC=" + machineSearchName + "&SearchType=1&wherePage=2&Rcode=" + MachineSearchLinkId;

        location.href = myurl;
    } else if (DataType == "4") {
        var myurl = "../usercenter/computersearch/StandardMyComputerSearch.aspx?id=" + MachineSearchId + "&showradio=1&showdriver=no";
        location.href = myurl;
    }
    //else if (DataType == "5") {
    //var myurl = "https://support1.lenovo.com.cn/lenovo/fast/SearchMain.aspx?query=" + machineSearchName + "&offset=0";
    //location.href = myurl;
    //}
    else if (DataType == "6") {
        var myurl = "https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?yt=pt&categoryid=" + MachineSearchId + "&CODEName=" + machineSearchName + "&SearchType=0&wherePage=2";
        location.href = myurl;
    }
    else if (DataType == "7") {
        var myurl = "https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=" + MachineSearchId + "&CODEName=" + MachineRealName + "&SearchType=0&wherePage=4&SearchNodeCC=" + machineSearchName + "";
        location.href = myurl;
    }
    else if (DataType == "8") {

    }
    else if (DataType == "3") {
        location.href = "DriverDetail.aspx?ID=" + MachineSearchId;
    } else {

        //开始========================
        var r = /^[0-9]*[1-9][0-9]*$///正整数

        var regIdea = /^\D{2}\d{8}/; //IDEA 产品
        var regIdeaWSSM = /^[0-9a-zA-Z]{15}$/; //IDEA 产品
        var regThink = /^\d{4}(\w{10}|\w{3})/; //think 产品的
        var DataType = document.getElementById('DataType').value;
        // alert($("#MachineSearchNameEncode").val());

        if (machineSearchName.length == 18) {
            location.href = "https://think.lenovo.com.cn/service/warranty/Warranty.aspx?model=" + machineSearchName;
            return;
        }

        if (r.test(machineSearchName) && machineSearchName.length < 4) {
            location.href = "DriverDetail.aspx?ID=" + machineSearchName;
        }
        else if (r.test(machineSearchName) && machineSearchName.length == 4) {
            IsThinkSN(machineSearchName);
            //
        }
        else if (machineSearchName.length == 15) {
            if (/^\d(\M|\m)/.test(machineSearchName)) {
                //alert(machineSearchName);
                location.href = 'https://support1.lenovo.com.cn/lenovo/wsi/usercenter/computersearch/StandardMyComputerSearch.aspx?id=' + machineSearchName + '&showradio=1&showdriver=no';
            }
            else {
                location.href = "https://think.lenovo.com.cn/service/warranty/Warranty.aspx?model=" + machineSearchName;
            }
            //IsIdeaSN
            //location.href= "../usercenter/computersearch/StandardMyComputerSearch.aspx?id="+machineSearchName+"&showradio=1&showdriver=no";
        }
        //https://support1.lenovo.com.cn/lenovo/wsi/usercenter/computersearch/StandardMyComputerSearch.aspx?id=4M0237375131973&showradio=1&showdriver=no
        //else if (regIdea.test(machineSearchName) && (machineSearchName.length == 10 || machineSearchName.length == 15)) {
        else if ((machineSearchName.length == 10 || machineSearchName.length == 15) && GetBranchType(machineSearchName) == "119") {
            //alert(machineSearchName);
            IsThinkIdeaSN(machineSearchName);
            document.getElementById("loading").style.dispaly = "none";
            //IsIdeaSN
            location.href= "../usercenter/computersearch/StandardMyComputerSearch.aspx?id="+machineSearchName+"&showradio=1&showdriver=no";
        } else if (regThink.test(machineSearchName) && (machineSearchName.length == 4 || machineSearchName.length == 7 || machineSearchName.length == 14) && (DataType != "")) {


            DoSearch_SN(machineSearchName);
            //alert(isNoneDiver);

            //location.href= "https://think.lenovo.com.cn/support/driver/categoryList.aspx?categoryid="+machineSearchName+"&type=Index&GuidS=e7d22796-6dc6-4df4-843d-16bbd6bc1e1e%0D%0A";
        }
        else {
            var checkvalue = document.getElementById('MachineSearchId').value;
            if (emptys(checkvalue)) {
                //alert('请根据下拉值进行查询');
                //return;
            }
            //alert($("#MachineSearchName").val());
            //alert($("#MachineSearchId").val());
            //alert($("#MachineSearchLinkId").val());
            //alert($("#MachineSearchLogic").val());
            if ($("#MachineSearchName").val() == "" || $("#MachineSearchName").val() == "机型快速查询") {
                alert('请输入您的主机编号或机型');
                document.getElementById('MachineSearchName').focus();
                document.getElementById('loading').style.display = "none";
                return;
            }
            if (regThink.test(machineSearchName) && (machineSearchName.length == 14)) {


                DoSearch_SN(machineSearchName);
                //alert(isNoneDiver);

                //location.href= "https://think.lenovo.com.cn/support/driver/categoryList.aspx?categoryid="+machineSearchName+"&type=Index&GuidS=e7d22796-6dc6-4df4-843d-16bbd6bc1e1e%0D%0A";
            } else {
                if (jQuery.trim($("#Product_line_type").val()) == "3") {
                    //服务器
                    location.href = 'DriverDownLoadServer.aspx';
                }
                else if ($("#MachineSearchLogic").val() == "0") {
                    //不走57
                    location.href = 'Driverdownload.aspx?SearchType=1&ptype=' + jQuery.trim($("#Product_line_type").val()) + '&from=select&LogicType=0&MachineId=' + $("#MachineSearchId").val() + '&SN=&IsBackPage=false&IsSeachOne=true&typename=' + $("#MachineSearchNameEncode").val();
                } else {

                    if ($("#MachineSearchId").val() == 6492) { //这个是s9e update by yangxucai 20110706 上线时候记得改路径

                        location.href = 'https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=29744&CODEName=IdeaPadS9e&SearchType=0&wherePage=4';
                    } else if ($("#MachineSearchId").val() == 6493) {
                        //这个是s10e
                        location.href = 'https://think.lenovo.com.cn/support/driver/newdriversdownlist.aspx?categoryid=29745&CODEName=IdeaPadS10e&SearchType=0&wherePage=4';

                    } else if ($("#MachineSearchId").val() != "") {
                        location.href = 'Driverdownload.aspx?SearchType=1&ptype=' + jQuery.trim($("#Product_line_type").val()) + '&from=select&LogicType=1&MachineId=' + $("#MachineSearchLinkId").val() + '&SN=&IsBackPage=false&IsSeachOne=true&typename=' + $("#MachineSearchNameEncode").val();
                    } else {
                       // var myurl = "https://support1.lenovo.com.cn/lenovo/fast/SearchMain.aspx?query=" + machineSearchName + "&offset=0";
                        document.getElementById('loading').style.display = "none";
                         alert('我们无法验证您所输入的主机编号。请重新输入或查看下方的如何查找主机编号教程。');
                       // window.open(myurl);
                    }

                    //  location.href='Driverdownload.aspx?SearchType=1&LogicType=1&MachineId=' + $("#MachineSearchLinkId").val()+'&SN=&IsBackPage=false&IsSeachOne=true&typename='+$("#MachineSearchNameEncode").val();
                }

            }
        }

        //结束========================
    }
}

function GetBranchType(mNumber) {
    var retBranchID = "";
    $.ajax({
        type: "post",
        url: "../handlers/GetBrandIDByProductSn.ashx",
        data: { ProductSn: mNumber },
        async: false,
        success: function (brandID) {
            if (brandID != null && brandID.length > 0 && (brandID == "119" || brandID == "120")) {
                retBranchID = brandID
            }
        }
    });
    return retBranchID;
}



function goToGuaranteeAndConfiguration(type) {
    if ($('#txtSearchByMachineNo')) {
        var mNumber = $.trim($("#txtSearchByMachineNo").val()); 

        if (!CheckProductSn(mNumber, "示例:EB10963046")) {
            return;
        }

        $.ajax({
            type: "post",
            url: "../handlers/GetBrandIDByProductSn.ashx",
            data: { ProductSn: mNumber },
            async: true,
            success: function (brandID) {
                if (brandID != null && brandID.length > 0 && (brandID == "119" || brandID == "120")) {
                    if (type == "peizhi") {
                        if (brandID == "120") {
                            window.open("https://think.lenovo.com.cn/service/warranty/Warranty.aspx?model=" + mNumber);
                        }
                        else {
                            location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?intcmp=bxpz&fromtype=' + type + '&id=' + jQuery.trim(mNumber.toUpperCase()) + '&showradio=1&showdriver=no';
                        }
                    }
                    else if (type == "baoxiu") {
                        if (brandID == "120") {
                            window.open("https://think.lenovo.com.cn/service/warranty/Warranty.aspx?model=" + mNumber);
                        }
                        else {
                            location.href = '../usercenter/computersearch/StandardMyComputerSearch.aspx?intcmp=bxpz&fromtype=' + type + '&id=' + jQuery.trim(mNumber.toUpperCase()) + '&showradio=1&showdriver=no';
                        }
                    }
                    else {
                        alert("我们无法验证您所输入的主机编号。请重新输入或查看下方的如何查找主机编号教程。");
                    }
                }
                else {
                    alert("我们无法验证您所输入的主机编号。请重新输入或查看下方的如何查找主机编号教程。");
                }
            }
        });
    }
}
