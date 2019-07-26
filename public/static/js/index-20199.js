/**
 * Created by djl4 on 2019/3/25.
 */


!(function ($, BMap, nameSpace) {
    var Position = function () {
        var _this = this;
        this.map = null;
        this.api = {
            product: 'https://papi.lenovo.com.cn/storeenum/dataBase/getProvince',
            //store: '/cmsapi/reseller/list',
            store: 'https://s.lenovo.com.cn/search/reseller',
            autoArea: 'https://s.lenovo.com.cn/search/store',
            querytreenode: "https://papi.lenovo.com.cn/tree/category/querytreenode?type=27&sortParam=Col4_ASC&parentId=",
            storeSummary: 'https://s.lenovo.com.cn/search/store/aggs',
        };
        this.constStr = {
            domIDProvinces: 'domProvince',
            domIDCities: 'domCity',
            domProducts: 'domProduct',
            domStores: 'addresslist',
            domStoreTypes: 'domStoreType',
            defaultCityStr: '北京市',
            mapContainerId: 'allmap',
            pagesContainerId: 'pagination',
        }
        this.cittData = {
            sorter: 0,
            storeCityCode: "",
            keyword: "",
            location: "",
            storeCityName: "",
            storeType: "",
            productTypeCode: "",
        }
        this.markerList = [];
        this.infoWindowList = [];
        // 记录好评的点击次数
        this.praiseCount = 0;
        // 记录距离的点击次数
        this.rangeCount = 0;
        // 用户当前搜索情景下的地区名
        this.conditionAreaName = '北京市', // 应默认为用户ip所在地区

        // 地图搜索左侧浮层中元素
        // 城市门店列表
        this.elCityStore = $('.search_city');
        // 以全国或省份搜索时，门店数量汇总列表
        this.elCityStoreSum = $('.shop-summary');
        // 搜索框
        this.searchInput = $('.search_val');

        // 当前城市元素
        this.currentCity = $('.current-city');
        // 热门城市列表元素
        this.chooseCity = $('.choose-city');

        this.init(true);
    };
    Position.prototype = {
        constructor: Position,
        init: function (ifPageInit) {
            this.getBnner();
            this.getProducts(ifPageInit);
            this.getStro()
            if (BMap) {
                this.initBDMap(this.constStr.mapContainerId, this.constStr.defaultCityStr);
            }
            this.buildDomAreaOptionList();
            this.addHotCitiesClick();
        },
        getProducts: function (ifPageInit) {
            var _this = this;
            $.getJSON(this.api.product, function (data) {
                if (data.status == 200) {
                    var data = JSON.parse(data.data);
                    var prhtml = '<option >请选择</option>';
                    for (var i = 0; i < data.length; i++) {
                        prhtml += '<option value="' + data[i].id + '" + code="' + data[i].code + '" >' + data[i].name + '</option>';
                    }
                    $("#ser_Province").html(prhtml);
                    _this.getCities($("#ser_Province").val());
                    $("#ser_Province").off("change").on("change", function () {
                        _this.getCities($("#ser_Province").val());
                    })
                }
            });

        },

        // 获取列表并渲染   ---- 主体方法
        getProvinces: function (dataCity, location) {
            //获取门店信息
            if (location) dataCity.location = location;
            var _this = this;

            $.ajax({
                url: _this.api.autoArea,
                dataType: 'json',
                type: 'get',
                data: dataCity,
                success: function (d) {

                    if (JSON.parse(d).status == 200) {
                        $(".tips").hide();
                    } else if (JSON.parse(d).status == 201) {
                        $(".tips").show();
                    }

                    /* * * * */
                    _this.showElCityStore();
                    if (dataCity.storeCityName) {
                        _this.setCurrentCityName(dataCity.storeCityName);
                        _this.conditionAreaName = dataCity.storeCityName;
                    }
                    _this.openOrCloseHotCities(false);
                    /* * * * */

                    var serHtml = "";
                    d = JSON.parse(d);
                    //清除地理标示
                    _this.map.clearOverlays();
                    if (d.data.length > 0) {
                        // debugger    
                        var serData = d.data;
                        _this.markerList = [];
                        _this.infoWindowList = [];
                        for (var i = 0; i < serData.length; i++) {
                            _this.showAllMap(serData[i], i);
                            var avg = serData[i].avgScore || 5
                            var starScore = avg / 5 * 100;
                            var index = i + 1;
                            serHtml += '<li latag="latag_pc_门店首页_结果展示_' + i + '" data-pcStaticUrl="' + (serData[i].pcStaticUrl || '') + '" data-address="' + (serData[i].storeAddr || '') + '" data-index="' + i + '" data-mapx="' + serData[i].storeMapx + '" data-mapy="' + serData[i].storeMapy + '" data-productType="' + serData[i].productType + '" data-starScore="' + serData[i].avgScore + '" data-name="' + serData[i].name + '" data-phone="' + serData[i].storeTel + '"><span class="iconKm">' + (serData[i].distance || '') + '</span><img src="https://p1.lefile.cn/product/adminweb/2019/04/01/0c7deff6-e893-464c-a0bb-30fa71bdf192.png"  class="ser_img" alt=""><span class="ser_no">' + index + '</span><h4 style="width: 80%;line-height: 23px;">' + (serData[i].name || '') + '</h4><p style="    width: 80%;height: 42px;overflow: hidden">地址：' + (serData[i].storeAddr || '') + '</p><p>电话：' + (serData[i].storeTel || '') + '</p><p>评分：<span class="start"><i style="width:' + starScore + '%"></i></span></p><p>业务：' + (serData[i].productType || '') + '</p></li>'
                        }
                        // 第一个的center
                        var point = new BMap.Point(parseFloat(serData[0].storeMapx) - 0.5, serData[0].storeMapy);
                        _this.map.centerAndZoom(point, 9);


                        $(".totalNum").html(d.totalNum);
                        $(".ser_content").html(serHtml);
                        $(".ser_content li").on("click", function () {
                            _this.showOnMap($(this))
                        });
                        var st = "";

                        $(".ser_content li").on("mouseout", function () {
                            _this.colorMap($(this));
                            $(this).find(".ser_img").attr("src", "https://p2.lefile.cn/product/adminweb/2019/04/01/c0b3013c-f944-4dd9-9574-5af8b7358921.png");
                        });
                        $(".ser_content li").on("mouseleave", function () {

                            _this.defaultColor($(this));
                            $(this).find(".ser_img").attr("src", "https://p1.lefile.cn/product/adminweb/2019/04/01/0c7deff6-e893-464c-a0bb-30fa71bdf192.png");
                        })

                    } else {
                        $(".totalNum").html(d.totalNum);
                        serHtml = "<div style = 'text-align:center;margin-top:10px;color:#aeaeae;'>查询结果为空</div>"
                        $(".ser_content").html(serHtml);
                    }


                },
                error: function (d) {
                    console.log('------------ 2');

                }
            });


        },
        getCities: function (parentId) {
            //请求县区
            var _this = this;

            $.getJSON(_this.api.querytreenode + parentId, function (data) {
                data = data.data;
                var prhtml = "<option >请选择</option>";
                for (var i = 0; i < data.length; i++) {
                    prhtml += '<option value="' + data[i].id + '" code="' + data[i].code + '">' + data[i].name + '</option>';
                }
                $("#ser_City").html(prhtml);
                _this.getStores($("#ser_City").val());
                $("#ser_City").off("change").on("change", function () {
                    _this.getStores($("#ser_City").val());
                })

            });
        },
        // 获取门店
        getStores: function (parentId) {
            var _this = this;
            $.getJSON(_this.api.querytreenode + parentId, function (data) {
                data = data.data;

                var prhtml = "<option >请选择</option>";

                for (var i = 0; i < data.length; i++) {
                    prhtml += '<option value="' + data[i].id + '"  code="' + data[i].code + '">' + data[i].name + '</option>'
                }
                $("#ser_area").html(prhtml);
            });

        },
        buildDomAreaOptionList: function () {
            var _this = this;
            $(".ser_ok").on("click", function () {
                // debugger;
                //确定地址
                // _this.cittData.keyword = "";
                _this.removeSort();
                // 清空附加搜索条件
                _this.cittData.productTypeCode = "";
                _this.cittData.storeType = "";
                _this.cittData.keyword = '';
                _this.searchInput.val('');
                $(".getStro").val("");
                $(".getmall").val("");

                var city = "";
                var _province = $("#ser_Province").find("option:selected").text();
                if (_province == "请选择") {
                    alert("请选择省份");
                    return
                } else if ($("#ser_area").find("option:selected").text() == "请选择") {
                    // console.log(1);
                    if ($("#ser_City").find("option:selected").text() == "请选择") {
                        // 限制城市
                        // alert("请选择城市")
                        // 当用户未选择城市时 直接调取该省份下各个城市门店数量汇总功能
                        _this.searchStoreSum('', _province);
                        return;
                        // city = $("#ser_Province").find("option:selected").text();
                        // _this.cittData.storeCityCode = $("#ser_Province").find("option:selected").attr("code");
                    } else {
                        city = $("#ser_City").find("option:selected").text();
                        _this.cittData.storeCityCode = $("#ser_City").find("option:selected").attr("code");
                        _this.cittData.storeCityName = city;
                        _this.conditionAreaName = city;
                        _this.setCurrentCityName(city);
                    }
                } else {
                    city = $("#ser_area").find("option:selected").text();
                    _this.cittData.storeCityCode = $("#ser_area").find("option:selected").attr("code");
                    _this.cittData.storeCityName = city;
                    _this.conditionCityName = city;
                    _this.setCurrentCityName($('#ser_City').find("option:selected").text());
                };
                $(".cityName").html(city);

                _this.getProvinces(_this.cittData);
            });
            $(".quxiao").on("click", function () {
                _this.openOrCloseHotCities(false);
            })

            $(".ser_sort li").on("click", function () {

                _this.cittData.sorter = $(this).attr("sort");
                // _this.cittDataBackup.sorter = $(this).attr("sort");
                $(this).addClass("current").siblings().removeClass("current")
                // debugger;
                switch ($(this).attr("sort")) {
                    // 综合
                    case "0":
                        $("#praise").attr("sort", 1);
                        $("#praise").find("i").removeClass("currentSort")
                        $("#range").attr("sort", 2).find(".arrow-bottom");
                        $("#range").find("i").removeClass("currentSort")
                        _this.praiseCount = 0;

                        break;
                    // 好评降序
                    case "1":
                        $("#comprehensive").attr("sort", 0);
                        $("#range").find("i").removeClass("currentSort")
                        $("#range").attr("sort", 2);
                        $(this).attr("sort", 3);
                        $(this).find(".arrow-bottom").addClass("currentSort").siblings().removeClass("currentSort");
                        _this.praiseCount++;
                        _this.rangeCount = 0;
                        break;
                    // 距离升序
                    case "2":
                        $("#comprehensive").attr("sort", 0);
                        console.log($("#praise").find("i"));
                        $("#praise").find("i").removeClass("currentSort")
                        $("#praise").attr("sort", 1);

                        $(this).attr("sort", 4);
                        $(this).find(".arrow-top").addClass("currentSort").siblings().removeClass("currentSort");
                        _this.praiseCount = 0;
                        _this.rangeCount++;
                        break;
                    // 好评升序
                    case "3":
                        $(this).attr("sort", 1);
                        $(this).find(".arrow-top").addClass("currentSort").siblings().removeClass("currentSort");
                        _this.praiseCount++;
                        _this.rangeCount = 0;
                        break;
                    // 距离降序
                    case "4":
                        $(this).attr("sort", 2);
                        $(this).find(".arrow-bottom").addClass("currentSort").siblings().removeClass("currentSort");
                        _this.praiseCount = 0;
                        _this.rangeCount++;
                        break;

                }
                // 第三次点击回掉综合
                if (_this.praiseCount == 3 || _this.rangeCount == 3) {
                    _this.removeSort();
                    _this.praiseCount = 0;
                    _this.rangeCount = 0;
                }
                _this.getProvinces(_this.cittData)
            });


            // 点击更换城市按钮事件
            this.chooseCity.on("click", function () {
                if (_this.currentCity.is(':hidden')) {
                    // if(_this.cittDataBackup)
                    //     _this.cittDataBackup = JSON.parse(JSON.stringify(_this.cittData));
                    _this.openOrCloseHotCities(true);
                } else {
                    _this.openOrCloseHotCities(false);
                }
            });


            var shod = 1;
            $(".search_up").on("click", function () {
                $(".search_result").toggle("fast");
                if (shod == 1) {
                    $(".search_up").addClass("search_down");
                    shod = 2;
                } else {
                    $(".search_up").removeClass("search_down");
                    shod = 1;
                }

            });
            // $(".ser_business").find("li").on("click", function () {
            //     _this.cittData.productType = $(this).text();
            //     _this.getProvinces(_this.cittData);
            // });
            // 根据keyword搜索结果的主体方法
            function searchkeyWords() {
                if ($(".search_val").val() == "") {
                    alert("搜索的内容不能为空！");
                    return
                }
                $(".search_result").show(100);
                _this.cittData.keyword = $(".search_val").val();
                _this.cittData.storeCityCode = null;
                _this.cittData.storeCityName = _this.conditionAreaName;
                _this.cittData.sorter = 0;
                _this.cittData.storeType = '';
                _this.cittData.productTypeCode = '';
                _this.removeSort();
                $(".getStro").val("");
                $(".getmall").val("");

                $.ajax({
                    url: _this.api.autoArea,
                    dataType: 'json',
                    type: 'get',
                    data: _this.cittData,
                    success: function (data) {
                        var data = JSON.parse(data);
                        $(".search_result").show(100);
                        if (data.resultType == 1) _this.searchStoreSum(null, data.locationName);
                        else if(data.resultType == 2) {
                            _this.cittData.keyword = null;
                            _this.cittData.storeCityName = data.locationName;
                            _this.getProvinces(_this.cittData);
                        } else {
                            _this.cittData.storeCityName = _this.conditionAreaName || null;
                            _this.getProvinces(_this.cittData);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log(textStatus);
                    }
                })
            }
            // 搜索按钮点击事件
            $(".search_span").on("click", searchkeyWords);
            // 键盘回车事件
            $(".search_val").on("keyup", function (e) {
                if (e.keyCode == 13) {
                    searchkeyWords();
                }
                //为空的时候调用接口请求列表
                if ($(this).val().length == 0) {
                    $(".search_result").show(100);
                    _this.removeSort();
                    _this.cittData.keyword = $(".search_val").val();
                    _this.cittData.storeType = '';
                    _this.cittData.productTypeCode = '';
                    $(".getStro").val("");
                    $(".getmall").val("");
                    _this.getProvinces(_this.cittData)
                }
                if ($(this).val().length > 0) {
                    $(".close_mall").show();
                } else {
                    $(".close_mall").hide();
                }
            });
            $(".close_mall").show().on("click", function () {
                $(".search_val").val("");
                $(this).hide();
                //为空的时候调用接口请求列表
                $(".search_result").show(100);
                _this.cittData.keyword = $(".search_val").val();
                _this.cittData.storeType = '';
                _this.cittData.productTypeCode = '';
                _this.removeSort();
                $(".getStro").val("");
                $(".getmall").val("");
                _this.getProvinces(_this.cittData);
            });
            $(".close_mall").hide();

        },
        // 打开或关闭热门城市
        openOrCloseHotCities: function (isOpen) {
            if (isOpen) {
                this.currentCity.show();
                this.chooseCity.addClass('open');
            } else {
                this.currentCity.hide();
                this.chooseCity.removeClass('open');
            }
        },
        initBDMap: function (bdMapContainerId, initCityStr) {
            try {
                var _this = this;
                // 新建地图
                this.map = new BMap.Map(bdMapContainerId);
                // 使用默认定位
                this.map.centerAndZoom(initCityStr, 11);
                // 开启滚轮缩放
                this.map.enableScrollWheelZoom();

                // 添加控件
                var top_right_navigation = new BMap.NavigationControl({
                    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
                    type: BMAP_NAVIGATION_CONTROL_SMALL,

                }); //右上角
                this.map.addControl(top_right_navigation);
                // 获取定位
                var myCity = new BMap.LocalCity();
                // 根据定位进行操作
                myCity.get(myFun);
                function myFun(result) {
                    var cityName = result.name;
                    _this.map.centerAndZoom(cityName, result.level - 1);
                    $(".cityName").html(cityName);
                    _this.cittData.storeCityName = cityName;
                    _this.getProvinces(_this.cittData, +result.center.lng + "," + result.center.lat)
                }


            } catch (error) {
                console.log(error, "--------------");
                alert("初始化地图失败，请确保网络连接后刷新重试")
            }

        },
        colorMap: function (clickedEle) {
            if (!this.map) return;
            var _this = this;
            var marker1 = this.markerList[clickedEle.attr("data-index")]
            this.setColorAndTop(marker1);
        },
        setColorAndTop: function (marker1) {
            var pointAIcon2 = new BMap.Icon("https://p2.lefile.cn/product/adminweb/2019/04/01/c0b3013c-f944-4dd9-9574-5af8b7358921.png", new BMap.Size(32, 32));
            marker1.setIcon(pointAIcon2);
            marker1.setTop(true)
        },
        defaultColor: function (clickedEle) {
            if (!this.map) return;
            var marker1 = this.markerList[clickedEle.attr("data-index")];

            this.defaultColorAndTop(marker1);
        },
        defaultColorAndTop: function (marker1) {
            var pointAIcon2 = new BMap.Icon("https://p1.lefile.cn/product/adminweb/2019/04/01/0c7deff6-e893-464c-a0bb-30fa71bdf192.png", new BMap.Size(32, 32));
            marker1.setTop(false);
            marker1.setIcon(pointAIcon2);
        },
        showOnMap: function (clickedEle, addStr) {
            //    debugger;
            if (!this.map) return;


            var _this = this;
            var x, y, address, z;
            if (addStr) {
                this.map.centerAndZoom(addStr, 10);

            } else {
                x = clickedEle.attr('data-mapx');
                y = clickedEle.attr('data-mapy');
                address = clickedEle.attr('data-address');
                x = parseFloat(x) - 0.5;
                if (x && y) {
                    var point = new BMap.Point(x, y);
                    this.map.centerAndZoom(point, 10);
                } else if (address) {
                    var myGeo = new BMap.Geocoder();
                    myGeo.getPoint(address, function (point) {
                        if (point) {
                            _this.map.centerAndZoom(point, 10);
                        }
                    }, z || this.constStr.defaultCityStr);
                }

                _this.map.panBy(100, 0);
                var marker1 = this.markerList[clickedEle.attr("data-index")]
                console.log(this.infoWindowList);
                var infowindow = this.infoWindowList[clickedEle.attr("data-index")];

                marker1.openInfoWindow(infowindow);
            }
        },

        // setMapMarker: function (clickedEle, point) {
        //     debugger
        //     var _this=this;
        //     if (!this.map) return;
        //     var starScore = parseInt(clickedEle.attr("data-starscore")) / 5 * 100;
        //     var marker1 = new BMap.Marker(point);

        //     this.map.addOverlay(marker1);
        //     var infoWindow1 = new BMap.InfoWindow(
        //         '<div style="padding:10px"><h3 style="margin-bottom: 6px;">' + (clickedEle.attr('data-name') || '') + '</h3>地址：' + (clickedEle.attr('data-address') || '') + '<br />电话：' + (clickedEle.attr('data-phone' || '') + '<br>评分：<span class="start"><i style="width:' + starScore + '%"></i></span><br>业务：' + clickedEle.attr('data-productType') || '') + '<br><a href="' + (clickedEle.attr("data-pcstaticurl") || '') + '" style="    text-decoration: none;color: #fff;background: #e12826;display: inline-block;text-align: center;width: 80px; height: 30px;line-height: 30px;border-radius: 5px;margin-top: 5px;position: absolute;left: 10px;bottom: 0px;" target="_blank" >进入门店</a></div>',
        //         {
        //             width: 370,
        //             height: 185,
        //             // title: clickedEle.attr('data-partnersname') || '',
        //             enableMessage: true,
        //             message: ''
        //         }
        //     );

        //     // _this.map.centerAndZoom(point);
        //     _this.map.panBy(100,0);
        //     var index = parseInt(clickedEle.attr('data-index')) + 1;
        //     var label = new BMap.Label(index, { offset: new BMap.Size(0, 0) });
        //     label.setStyle({
        //         color: "#fff",
        //         fontSize: "12px",
        //         width: "18px",
        //         height: "20px",
        //         lineHeight: "20px",
        //         background: "transparent",
        //         border: "none",
        //         "text-align": "center"
        //     });
        //     marker1.setLabel(label);
        //     marker1.addEventListener("click", function () {
        //         this.openInfoWindow(infoWindow1);
        //     });
        //     infoWindow1.addEventListener("close",function(){ 
        //        _this.defaultColorAndTop(marker1);
        //     })
        //     infoWindow1.addEventListener("open",function(){ 
        //         _this.setColorAndTop(marker1);
        //      })
        //     marker1.openInfoWindow(infoWindow1)
        // },
        showAllMap: function (data, i, clickedEle) {
            var _this = this;
            if (!this.map) return;
            var starScore = data.avgScore / 5 * 100;
            var point = new BMap.Point(data.storeMapx, data.storeMapy);
            var marker1 = new BMap.Marker(point);
            this.markerList.push(marker1)
            // this.map.centerAndZoom(point, 9);
            this.map.addOverlay(marker1);
            this.defaultColorAndTop(marker1);
            var infoWindow1 = new BMap.InfoWindow(
                '<div style="padding:5px"><h3 style="margin-bottom: 6px;">' + (data.name || '') + '</h3>地址：' + (data.storeAddr || '') + '<br />电话：' + (data.storeTel || '') + '<br>评分：<span class="start"><i style="width:' + starScore + '%"></i></span><br>业务：' + (data.productType || '') + '<br><a latag="latag_pc_门店首页_结果展示_进入门店_' + data.pcStaticUrl + '" href="' + data.pcStaticUrl + '" style="    text-decoration: none;color: #fff;background: #e12826;display: inline-block;text-align: center;width: 80px; height: 30px;line-height: 30px;border-radius: 5px;margin-top: 5px;position: absolute;left: 10px;bottom: 0px;" target="_blank">进入门店</a></div>', {
                    width: 370,
                    height: 195,
                    // title: data.townName||'',
                    enableMessage: true,
                    message: '',
                }
            );
            this.infoWindowList.push(infoWindow1)
            var label = new BMap.Label(i + 1, {
                offset: new BMap.Size(0, 0)
            });
            label.setStyle({
                color: "#fff",
                fontSize: "12px",
                width: "18px",
                height: "20px",
                lineHeight: "18px",
                background: "transparent",
                border: "none",
                "text-align": "center"
            });
            marker1.setLabel(label);

            marker1.addEventListener("click", function () {
                this.openInfoWindow(infoWindow1);
                _this.map.panBy(115, 0);
                _this.setColorAndTop(marker1);
                // 关闭热门城市层                
                _this.openOrCloseHotCities(false);
            });
            infoWindow1.addEventListener("close", function () {
                _this.defaultColorAndTop(marker1);
            })
        },
        // 向地图上添加门店数量汇总
        addStoreSumForMap: function (data) {
            var decimalImg = {
                c1: { 
                    src: 'https://p4.lefile.cn/product/adminweb/2019/06/26/525edfcd-0d0a-48a8-8893-6ca7abc8e31b.png',
                    width: 23,
                    height: 25
                },
                c2: { 
                    src: 'https://p1.lefile.cn/product/adminweb/2019/06/26/4548e6b7-defa-48aa-982f-1ad708e68008.png',
                    width: 29,
                    height: 25
                },
                c3: { 
                    src: 'https://p1.lefile.cn/product/adminweb/2019/06/26/a406a1a7-c551-4b19-ac9d-d327fb94a79c.png',
                    width: 36,
                    height: 25
                }
            }
            if(typeof data.count !== "number") return;
            var decimal = data.count.toString().length;
            var hitObj = null;
            if(decimal == 1) hitObj = decimalImg.c1; 
            else if(decimal == 2) hitObj = decimalImg.c2;
            else if(decimal == 3) hitObj = decimalImg.c3;

            var iconImg = new BMap.Icon(hitObj.src, new BMap.Size(hitObj.width, hitObj.height), { 
                anchor: new BMap.Size(Math.floor(hitObj.width / 2), hitObj.height) 
            });

// iconImg = new BMap.Icon(decimalImg['c1'], new BMap.Size(23, 25));
// iconImg = new BMap.Icon(decimalImg['c2'], new BMap.Size(29, 25));
// iconImg = new BMap.Icon(decimalImg['c3'], new BMap.Size(36, 25));

            var _this = this;
            if (!(data && data.location && data.count && data.name)) return;
            var point = new BMap.Point(data.location.split(',')[0], data.location.split(',')[1]);
            var marker1 = new BMap.Marker(point, { icon: iconImg });
            this.markerList.push(marker1);
            this.map.addOverlay(marker1);
            // this.defaultColorAndTop(marker1);
            var label = new BMap.Label(data.count, {
                offset: new BMap.Size(0, 0)
            });
            label.setStyle({
                color: "#fff",
                fontSize: "12px",
                width: hitObj.width - 2 + 'px',
                height: hitObj.height + 'px',
                lineHeight: hitObj.height - 2 + 'px',
                background: "transparent",
                border: "none",
                "text-align": "center"
            });
            marker1.setLabel(label);
            marker1.addEventListener('click', function () {
                _this.searchInput.val('');
                _this.cittData.keyword = '';
                _this.cittData.sorter = 0;
                _this.cittData.storeCityCode = undefined;
                _this.cittData.storeCityName = data.name;
                $(".getStro").val("");
                $(".getmall").val("");
                _this.removeSort();
                _this.getProvinces(_this.cittData);
            })
        },
        getBnner: function () {
            //轮播图数据请求
            $.ajax({
                url: "https://papi.lenovo.com.cn/storeapi/banner/listbanner",
                dataType: 'json',
                type: 'get',
                success: function (d) {
                    var data = d.data.dataList
                    var bannerHtml = "";
                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i].pcBanner);
                        if (data[i].pcBanner != undefined && data[i].pcBanner != "") {
                            if (data[i].pcLink != "" && data[i].pcLink != undefined) {
                                bannerHtml += '  <div class="swiper-slide"><a target="_blank" href="' + data[i].pcLink + '" latag="latag_pc_门店首页_banner_' + i + '_' + data[i].pcLink + '"><img src="' + data[i].pcBanner + '"></a></div>'
                            } else {
                                // bannerHtml += '  <div class="swiper-slide"><img src="' + data[i].pcBanner + '"></div>'
                                bannerHtml += '  <div class="swiper-slide" latag="latag_pc_门店首页_banner_' + i + '_' + data[i].pcLink + '"' + '><img src="' + data[i].pcBanner + '"></div>'
                            }
                        }

                    }
                    $(".banner").find(".swiper-wrapper").html(bannerHtml);
                    if (data.length > 1) {
                        var actionSwiper5 = new Swiper('.banner', {
                            autoplay: 5000,
                            autoplayDisableOnInteraction: false,
                            observer: true,
                            observeParents: true,
                            loop: true,
                            pagination: ".swiper-pagination",
                            paginationClickable: true,
                        });
                    } else {
                        var actionSwiper5 = new Swiper('.banner', {
                            // autoplay: 5000,
                            autoplayDisableOnInteraction: false,
                            observer: true,
                            observeParents: true,
                            // loop: true,
                            // pagination: ".swiper-pagination",
                            // paginationClickable:true,
                        });
                    }
                },

                error: function (d) {
                    console.log(d)
                }
            });
        },
        getStro: function () {
            var _this = this;
            _this.cittData.storeType = "";
            $.getJSON("https://papi.lenovo.com.cn/dict?dictKey=StoreType", function (data) {
                data = data.data;

                var html = "<option value=''  storeCityCode = ''>选择门店类型</option>";

                for (var i = 0; i < data.length; i++) {
                    for(var key in data[i])
                        html += '<option storeCityCode="' + key + '"  >' + data[i][key] + '</option>';
                }
                $(".getStro").html(html);
                _this.getmall();
                $(".getStro").on("change", function () {
                    // _this.cittData.productTypeCode = "";
                    _this.cittData.storeType = $(".getStro").find("option:selected").attr("storeCityCode");
                    // _this.removeSort();
                    // _this.searchInput.val('');
                    // _this.cittData.keyword = '';
                    _this.getProvinces(_this.cittData);
                    // _this.getmall($(this).val());
                });
            })
        },

        getmall: function (id) {
            var _this = this;

            $.getJSON("https://papi.lenovo.com.cn/dict?dictKey=StoreProductType", function (data) {
                // 使用固定值
                // var data = [{
                //     id: null,
                //     code: null,
                //     name: '个人&家庭产品'
                // }, {
                //     id: null,
                //     code: null,
                //     name: '商用产品及方案'
                // }, {
                //     id: null,
                //     code: null,
                //     name: 'Think产品'
                // }];
                data = data.data;
                var html = "";
                var html = "<option value='' storeCityCode = '' >选择产品类别</option>";
                // for (var i = 0; i < data.length; i++) {

                //     html += '<option value="' + data[i].id + '" storeCityCode="' + data[i].code + '" >' + data[i].name + '</option>';
                // }
                for (var i = 0; i < data.length; i++) {
                    for(var key in data[i])
                        html += '<option  storeCityCode="' + key + '" >' + data[i][key] + '</option>';
                }

                $(".getmall").html(html);
                $(".getmall").off("change").on("change", function () {

                    _this.cittData.productTypeCode = $(".getmall").find("option:selected").attr("storeCityCode");

                    // _this.removeSort();
                    _this.getProvinces(_this.cittData)
                });
                if (id == "") {
                    $(".getmall").attr("disabled", true);
                } else {
                    $(".getmall").attr("disabled", false);

                }

            })
        },
        removeSort: function () {
            $("#comprehensive").addClass("current").siblings().removeClass("current")
            this.cittData.sorter = 0;
            $("#praise").attr("sort", 1);
            $("#praise").find("i").removeClass("currentSort");
            $("#range").attr("sort", 2).find(".arrow-bottom");
            $("#range").find("i").removeClass("currentSort");
        },

        addHotCitiesClick: function () {
            var _this = this;
            $('.current-city .main-city > span').click(function () {
                _this.cittData.keyword = '';
                _this.searchInput.val('');
                if ($(this).hasClass('whole-country')) {
                    _this.searchStoreSum($.trim(_this.searchInput.val()));
                } else {
                    _this.removeSort();
                    $(".getStro").val("");
                    $(".getmall").val("");
                    _this.cittData.storeType = '';
                    _this.cittData.productTypeCode = '';
                    _this.cittData.storeCityCode = ''; // $(this).attr('city-code');
                    _this.cittData.storeCityName = $(this).text() + '市';
                    _this.cittData.sorter = 0;
                    _this.getProvinces(_this.cittData);
                }
            })
        },

        // 按省份或全国搜索门店统计数量
        searchStoreSum: function (keyword, area) {
            var _this = this;
            $.ajax({
                url: _this.api.storeSummary,
                type: 'GET',
                data: {
                    keyword: keyword,
                    province: area
                },
                success: function (data) {
                    var location = '116.4, 39.9'; // 默认为北京 经纬度
                    if (data[0].city[0] && data[0].city[0].location) {
                        location = data[0].city[0].location;
                    }
                    // if(i == 10) { alert('地图数据有误，请刷新重试'); return; }

                    // 清除地理标示
                    _this.map.clearOverlays();

                    var x = parseFloat(location.split(',')[0]) - 0.5;
                    if (data.length > 1) {
                        _this.map.centerAndZoom(new BMap.Point(116.4 - 25.5, 39.9), 5);
                        _this.renderStoreSumList(data);
                    } else if (data.length == 1) {
                        _this.map.centerAndZoom(new BMap.Point(x, location.split(',')[1]), 7);
                        _this.renderStoreSumList(data);
                    }

                    // 关闭热门城市层
                    _this.openOrCloseHotCities(false);
                }, 
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    console.log(textStatus);
                }
            })
        },
        // 渲染门店数量汇总列表
        renderStoreSumList: function (data) {
            var _this = this;
            this.showElCityStoreSum();
            var ssDiv = this.elCityStoreSum.find('.ss-div').empty();

            for (var i = 0; i < data.length; i++) {
                var provinceDiv = $(
                    '<div class="province-div">' +
                    '<div class="p-div">' +
                    '<span class="p-name">' + data[i].province + '</span>' +
                    '<span class="p-sum">(' + data[i].count + ')</span>' +
                    '<em><i></i></em>' +
                    '</div>' +
                    '</div>'
                );
                provinceDiv.find('.p-name, .p-div em').click(function () {
                    $(this).closest('.province-div').toggleClass('active');
                })
                var pDiv = $('<ul class="p-cities clearfix"></ul>');
                for (var j = 0; j < data[i].city.length; j++) {
                    // 向地图绘制城市中的门店数量
                    this.addStoreSumForMap(data[i].city[j]);

                    // 渲染页面左侧列表
                    var li = $(
                        '<li location="' + data[i].city[j].location + '">' +
                        '<span>' + data[i].city[j].name + '</span>' +
                        '<em>(' + data[i].city[j].count + ')</em>' +
                        '</li>'
                    );
                    (function (i, j) {
                        li.children('span').click(function () {
                            _this.searchInput.val('');
                            _this.storeSumClick(data[i].city[j].name);
                        })
                    })(i, j);
                    pDiv.append(li);
                }
                provinceDiv.append(pDiv);
                ssDiv.append(provinceDiv);

                if (data.length == 1) provinceDiv.addClass('active');
            }
        },
        // 点击汇总城市跳转事件
        storeSumClick: function (city, location) {
            this.removeSort();
            $(".getStro").val("");
            $(".getmall").val("");
            this.cittData.storeType = '';
            this.cittData.productTypeCode = '';
            this.cittData.keyword = '';
            this.cittData.storeCityCode = undefined;
            this.cittData.storeCityName = city;
            this.cittData.sorter = 0;
            this.getProvinces(this.cittData);
        },
        // 展示城市内门店
        showElCityStore: function () {
            this.elCityStoreSum.hide();
            this.elCityStore.show();
        },
        // 展示门店汇总数量
        showElCityStoreSum: function () {
            this.elCityStore.hide();
            this.elCityStoreSum.show();
        },
        // 将页面上显示城市的地方设置为当前城市
        setCurrentCityName: function (cityName) {
            var n = cityName;
            $('.choose-city span').text(n.substr(n.length - 1, 1) == '市' ? n.substr(0, n.length - 1) : n)
            $('.current-city .cur-position span').text(n);
            $('.search_left .cityName').text(n);
        },
    };
    var position = new Position();
    if (nameSpace) {
        window[nameSpace] = position;
    }
})(jQuery, BMap);