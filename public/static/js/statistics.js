try {
    var _head = document.getElementsByTagName('head')[0];
    var _script = document.createElement('script');
    _script.innerHTML = "try{var ga_userId='';" +
        " if(window.passport&&window.passport.cookie){" +
        "  ga_userId = passport.cookie.lenovoId;" +
        " }" +
        "  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){" +
        "    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o)," +
        "    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)" +
        "    })(window,document,'script','https://www.google-analytics.com/analytics.js" +

        "','ga');" +
        "   ga('create', 'UA-110299082-1', 'auto', {'userId': ga_userId,allowLinker: true});" +
        "  ga('require', 'ec'); " +
        "  ga(function(tracker) {   " +
        "    var clientId = tracker.get('clientId');" +
        "    ga('set', 'dimension1', clientId);"+
        "});" +
        "ga('set', 'dimension2', ga_userId); " +
        "ga('set', 'dimension3', ''); " +
        "ga('require', 'linker'); " +
        "ga('linker:autoLink', ['lenovo.com.cn','lenovo.cn','lenovovip.com.cn','lenovo.com']); " +
        "ga('set', 'transport', 'beacon'); " +
        "ga('send', 'pageview');" +
        "}catch(e){" +
        "}";
} catch (error) { }
$(function () {
    var domain = window.location.href;
    try {
         if (domain.indexOf("www.lenovovip") != -1) {
            if (window.ga === undefined) {
                console.log('insert GA code ');
                _head.appendChild(_script);
            }
            $("#header .top_box ul li a").each(function () {
                $(this).on("click", function () {
                    ga('send', 'event', "LenovoVIP_PC", "LenovoVIP_header_" + $(this).html(), $(this).attr("href"));
                });
            });
            $("#header a.home_cart").on("click", function () {
                ga('send', 'event', "LenovoVIP_PC", "LenovoVIP_header_购物车", $(this).attr("href"));
            });
            $("#header div.top_username").on("click", function () {
                ga('send', 'event', "LenovoVIP_PC", "LenovoVIP_header_个人中心", "https://i.lenovovip.com.cn/info/center.jhtml");
            });
            $("#header a.serch_box_img").on("click", function () {
                ga('send', 'event', "LenovoVIP_PC", "LenovoVIP_header_search", "https://s.lenovovip.com.cn/index.html");
            });
            $("#logo a").on("click", function () {
                ga('send', 'event', "LenovoVIP_PC", "LenovoVIP_LogoClick", "LogoClick");
            });
            $("#small_logo").parent().on("click", function () {
                ga('send', 'event', "LenovoVIP_PC", "LenovoVIP_LogoClick", "LogoClick");
            });
            $(".foot_bot a").each(function () {
                $(this).on("click", function () {
                    ga('send', 'event', "LenovoVIP_PC", "LenovoVIP_footernav_" + $(this).html(), $(this).attr("href"));
                });
            });
            $(".sort-list .sort-list-1").on("click", function () {
                ga('send', 'event', "LenovoVIP_PC", "LenovoVIP_contact_热线", "");
            });
            $(".sort-list ul.list2 a").on("click", function () {
                ga('send', 'event', "LenovoVIP_PC", "LenovoVIP_contact_咨询", "https://srv.lenovovip.com.cn/home/index.do?sd=3");
            });
            $(".sort-list .sort-list-6").on("click", function () {
                ga('send', 'event', "LenovoVIP_PC", "LenovoVIP_contact_返回顶部", "https://www.lenovovip.com.cn/");
            });
            var slide_img = setInterval(function () {//轮播图展示
                if ($("#xiaoxin_div ul.ul1 li").length > 0) {
                    clearInterval(slide_img);
                    $("#xiaoxin_div ul.ul1 li a").each(function (i, ele) {
                        var background = $(ele).find("div").get(0).style.background.replace('url(', '').replace(')', '');
                        var promoCreative = background.replace("no-repeat", "").replace(/center/gi, "");
                        // ga('ec:addPromo', {
                        //     'id': $(ele).attr("href"),
                        //     'name': "LenovoVIP_Home_banner",
                        //     'creative': promoCreative,
                        //     'position': "Home_banner_" + (i + 1)
                        // });
                        // ga('send', 'event', "LenovoVIP_PC", "Home_banner_Impression_" + (i + 1), { nonInteraction: true });
                        $(ele).on("click", function () {
                            ga('ec:addPromo', {
                                'id': $(this).attr("href"),
                                'name': "LenovoVIP_Home_banner",
                                'creative': promoCreative,
                                'position': "Home_banner_" + (i + 1)
                            });
                            ga('ec:setAction', 'promo_click');
                            ga('send', 'event', "LenovoVIP_PC", "Home_banner_Click_" + (i + 1), { nonInteraction: true });
                        });
                    });
                    $(".btnLeft").on("click", function () {
                        ga('send', 'event', "LenovoVIP_PC", "Home_banner", "左键头")
                    });
                    $(".btnRight").on("click", function () {
                        ga('send', 'event', "LenovoVIP_PC", "Home_banner", "右键头");
                    });
                    $("#dot_ul li").each(function (i, ele) {
                        $(this).on("click", function () {
                            var href = $("#xiaoxin_div ul.ul1 li a").eq(i).attr("href");
                            ga('send', 'event', "LenovoVIP_PC", "Home_banner", href);
                        });
                    });
                }
            }, 50);
            $("div.list_nav ul li div>a").each(function () {//分类导航
                $(this).on('click', function () {
                    var txt = $(this).text();
                    txt = $.trim(txt);
                    ga('send', 'event', "Lenovo_PC", "Home_banner_left_nav_" + txt, $(this).attr("href"));
                });
            });
            $("#shops-ad ul li>a").each(function (i, ele) {//shops-ad
                // ga('ec:addPromo', {
                //     'id': $(this).attr("href"),
                //     'name': "LenovoVIP_Home_shops_ad",
                //     'position': "Home_shops_ad_"(+i + 1)
                // });
                // ga('send', 'event', "LenovoVIP_PC", "Home_shops_ad_"(+i + 1), { nonInteraction: true });
                $(ele).on("click", function () {
                    ga('ec:addPromo', {
                        'id': $(this).attr("href"),
                        'name': "LenovoVIP_Home_shops_ad",
                        'position': "Home_shops_ad_" + (i + 1)
                    });
                    ga('ec:setAction', 'promo_click');
                    ga('send', 'event', "LenovoVIP_PC", "Home_shops_ad_"(+i + 1), $(this).attr("href"));
                });
            });
            //楼层信息
            $(".ns_floor-nav-box ul li a").each(function () {
                $(this).on("click", function () {
                    ga('send', 'event', "LenovoVIP_PC", "Home_Suspension_Left_" + ($(this).find("em:first").text()), $(this).attr("href"));
                });
            });
            //明星单品
            $("div.lunbo_left_btn").on("click", function () {
                ga('send', 'event', "LenovoVIP_PC", "Home_明星单品_左", "");
            });
            $("div.lunbo_right_btn").on("click", function () {
                ga('send', 'event', "LenovoVIP_PC", "Home_明星单品_右", "");
            });
            $("ul#star_cont li").each(function (i, ele) {
                var href = $(ele).find("a").eq(0).attr("href");
                var name = $(ele).find("p").eq(0).text();
                var gcode = $(ele).find("p").eq(2).attr("gcode");
                // ga('ec:addImpression', {
                //     'id': gcode,
                //     'name': name,
                //     'category': "明星单品",
                //     'list': "LenovoVIP_Home_明星单品",
                //     'position': "Home_明星单品" + (i + 1)
                // });
                // ga('send', 'event', "LenovoVIP_Home_PC", "Home_明星单品" + (i + 1), href, { nonInteraction: true });
                $(ele).on("click", function () {
                    ga('ec:addProduct', {
                        'id': gcode,
                        'name': name,
                        'category': "明星单品",
                        'position': "Home_明星单品" + (i + 1)
                    });
                    ga('ec:setAction', 'click', { list: "Home_明星单品" });
                    ga('send', 'event', "LenovoVIP_Home_PC", "Home_明星单品" + (i + 1), href);
                });
            });
            //站内所有商量展示
            $("div.nav_floor_item").each(function (i, ele) {
                var _t = $(ele);
                var title = _t.find("div.floor_title>h3");
                title = title.replace(/\s/g, "");
                title = title.substring(2);
                _t.find("div.floor_links>a").on("click", function () {
                    ga('send', 'event', "LenovoVIP_PC", "Home_" + title, $(this).attr("href"));
                });
                // ga('ec:addImpression', {
                //     'id': "",
                //     'name': title,
                //     'category': title,
                //     'list': "LenovoVIP_Home_" + title,
                //     'position': title + "_left"
                // });
                // ga('send', 'event', "LenovoVIP_Home_PC", title + "_left", _t.find("floor_left>a").eq(0).attr("href"), { nonInteraction: true });
                _t.find("floor_left>a").eq(0).on("click", function () {
                    ga('ec:addProduct', {
                        'id': "",
                        'name': title,
                        'category': title,
                        'list': "LenovoVIP_Home_" + title,
                        'position': title + "_left"
                    });
                    ga('ec:setAction', 'click', { list: title });
                    ga('send', 'event', "LenovoVIP_Home_PC", title + "_left", $(this).attr("href"), { nonInteraction: true });
                });
                $(_t).find("div.floor_right>div.floor_item").each(function (i, ele) {
                    var item = $(ele);
                    var gcode = item.find("p").eq(0).attr("gcode");
                    var href = item.find("a").eq(0).attr("href");
                    // ga('ec:addImpression', {
                    //     'id': gcode,
                    //     'name': title,
                    //     'category': title,
                    //     'list': "LenovoVIP_Home_" + title,
                    //     'position': title + "_right_" + (i + 1)
                    // });
                    // ga('send', 'event', "LenovoVIP_Home_PC", title + "_right_" + (i + 1), href, { nonInteraction: true });
                    item.find("a").eq(0).on("click", function () {
                        ga('ec:addProduct', {
                            'id': gcode,
                            'name': title,
                            'category': title,
                            'position': title + "_right_" + (i + 1)
                        });
                        ga('ec:setAction', 'click', { list: title });
                        ga('send', 'event', "LenovoVIP_Home_PC", title + "_right_" + (i + 1), href);
                    });
                });
            });
        }
        else if (domain.indexOf('m.lenovo') != -1) {
            if (domain.indexOf('news') != -1 && domain.indexOf('list') != -1) {

                $(document).delegate("div.listBox a", "click", function () {
                    ga('send', 'event', "News_MO", "新闻中心_新闻中心", $(this).attr('href'));
                });
                $(document).delegate("a.scrollToTop", "click", function () {
                    ga('send', 'event', "News_MO", "新闻中心", "显示更多");
                });
                $("div.load_more").on('click', function () {
                    ga('send', 'event', "News_MO", "新闻中心", "查看更多");
                });
                $(document).delegate("div.listBox ul li h3 a", "click", function () {
                    ga('send', 'event', "News_MO", $(this).html(), $(this).attr("href"));
                });
                return;
            }
            if (domain.indexOf('lenovomaker') != -1) {
                return;
            }
            if (domain.indexOf('wapindex.html') != -1&&domain.indexOf('tryhtml') != -1) {//已经在页面中加上，新品试用
                return;
            }

            if (domain.indexOf('lenovo_wap_platform') != -1 && domain.indexOf('category.html') != -1) {//分类页面
                _head.appendChild(_script);
                $("#g-header a").each(function () {
                    $(this).on("click", function () {
                        ga('send', 'event', "Category_MO", "header", $(this).attr("id"));
                    });
                });
                var timer1 = setInterval(function () {
                    if ($("div.leftBox ul li span").length > 0) {
                        clearInterval(timer1);
                        $("div.leftBox ul li span").each(function (i, ele) {
                            $(this).on("click", function () {
                                ga('send', 'event', "Category_MO", "LeftBox_" + (i + 1), $(this).text());
                            });
                        });
                    }
                }, 50);
                var timer2 = setInterval(function () {
                    if ($("div.rightBox ul li>a").length > 0) {
                        clearInterval(timer2);
                        $("div.rightBox ul li>a").each(function (i, ele) {
                            // ga('ec:addPromo', {
                            //     'id': $(ele).attr("href"),
                            //     'name': "LenovoMO_banner",
                            //     'position': "LenovoMO_banner_" + (i + 1)
                            // });
                            // ga('send', 'event', "Lenovo_MO", "LenovoMO_" + (i + 1) + "_Impression", { nonInteraction: true });
                            $(this).on("click", function () {
                                ga('ec:addPromo', {
                                    'id': $(this).attr("href"),
                                    'name': "LenovoMO_banner",
                                    'position': "LenovoMO_banner_" + (i + 1)
                                });
                                ga('send', 'event', "Lenovo_MO", "LenovoMO_" + (i + 1) + "_Click", $(this).attr("href"));
                            });
                        });
                    }
                }, 50);
                var timer3 = setInterval(function () {
                    if ($(".rightBox ul li div.nav2Box").length > 0) {
                        clearInterval(timer3);
                        $(".rightBox ul li div.nav2Box").each(function (i, ele) {
                            var t = $(ele);
                            var id = t.parent().attr("id").split("_")[1];
                            var parent_title = $("#left_" + id).find("span").eq(0).html();
                            var title = t.find("h3").eq(0).html();
                            t.find("h3").on("click", function () {
                                ga('send', 'event', "Category_MO", "RightBox_" + $(this).text(), parent_title + "_" + title);
                            });
                            t.find(".nav3Box div>a").each(function (j, elee) {
                                // ga('ec:addImpression', {
                                //     'id': "",
                                //     'name': $(elee).find("span").eq(0).html(),
                                //     'list': "RightBoxList",
                                //     'position': (j + 1)
                                // });
                                // ga('send', 'event', 'RightBoxList_MO', "RightBoxList_" + (j + 1) + "_Impression", $(elee).attr("href"), { nonInteraction: true });
                                $(this).on("click", function () {
                                    ga('ec:addProduct', {
                                        'id': "",
                                        'name': $(this).find("span").eq(0).html(),
                                        'position': (j + 1)
                                    });
                                    ga('ec:setAction', 'click', { list: "RightBoxList" });
                                    ga('send', 'event', 'RightBoxList_MO', "RightBoxList_" + (j + 1) + "_Click", $(this).attr("href"));
                                });
                            });
                        });
                    }

                }, 50);
                return;
            }
            $("ul.category li a").each(function (i, ele) {//导航
                $(ele).on("click", function () {
                    ga('send', 'event', "Lenovo_MO", "Lenvo_topnav_" + (i + 1), $.trim($(this).html()));
                });
            });
            $("ul.header li a").each(function (index, ele) {
                var type = "";
                if (index == 0)
                    type = "Logo";
                else if (index == 1)
                    type = "Search";
                else
                    type = "Message";
                $(this).on('click', function () {
                    ga('send', 'event', "Lenovo_MO", type + '_' + (index + 1), type);
                });
            });


            var coverflow_timers = setInterval(function () {
                if ($("div.swiper-container-coverflow .swiper-wrapper a").length > 0) {
                    clearInterval(coverflow_timers);
                    $("div.swiper-container-coverflow .swiper-wrapper a").each(function (index, ele) {//轮播图
                        // ga('ec:addPromo', {
                        //     'id': $(this).attr('href'),
                        //     'name': "Home_shops_ad",
                        //     'position': "Home_coverflow_ad_" + (index + 1)
                        // });
                        // ga('send', 'event', "Home_MO", "Home_banner_" + (index + 1) + "_Impression", $(this).attr("href"), { nonInteraction: true });
                        $(this).on('click', function () {
                            ga('ec:addPromo', {
                                'id': $(this).attr('href'),
                                'name': "Home_shops_ad",
                                'position': "Home_coverflow_ad_" + (index + 1)
                            });
                            ga('ec:setAction', 'promo_click');
                            ga('send', 'event', "Home_MO", "Home_banner_" + (index + 1) + "_Click", $(this).attr("href"));
                        });
                    });
                }
            }, 50);
            var timers = setInterval(function () {
                if ($(".back_h200 div.swiper-container .swiper-wrapper a").length > 0) {
                    clearInterval(timers);
                    $(".back_h200 div.swiper-container .swiper-wrapper a").each(function (index, ele) {//轮播图
                        // ga('ec:addPromo', {
                        //     'id': $(this).attr('href'),
                        //     'name': "Home_banner",
                        //     'position': "Home_banner_" + (index + 1)
                        // });
                        // ga('send', 'event', "Home_MO", "Home_banner_" + (index + 1) + "_Impression", $(this).attr('href'), { nonInteraction: true });
                        $(this).on('click', function () {
                            ga('ec:addPromo', {
                                'id': $(this).attr('href'),
                                'name': "Home_banner",
                                'position': "Home_banner_" + (index + 1)
                            });
                            ga('ec:setAction', 'promo_click');
                            ga('send', 'event', "Home_MO", "Home_banner_" + (index + 1) + "_Click", $(this).attr("href"));
                        });
                    });
                }
            }, 50);
            $("div.xdlj ul li a").each(function (index, ele) {//下单立减
                // ga('ec:addImpression', {
                //     'id': $(ele).parent().attr('_code'),
                //     'name': $(ele).find("h6").html(),
                //     'category': "下单立减",
                //     'brand': "联想",
                //     'list': "Home_下单立减",
                //     'position': (index + 1)
                // });
                // ga('send', 'event', "Home_MO", "Home_下单立减" + (index + 1), $(ele).attr("href"), { nonInteraction: true });
                $(ele).on('click', function () {
                    ga('ec:addProduct', {
                        'id': $(this).parent().attr('_code'),
                        'name': $(this).find("h6").html(),
                        'category': "下单立减",
                        'brand': "联想",
                        'position': (index + 1)
                    });
                    ga('ec:setAction', 'click', { list: "下单立减" });
                    ga('send', 'event', "Home_MO", "Home_下单立减" + (index + 1), $(this).attr("href"));
                });
            });
            $("div.index-list ul li a").each(function (index, ele) {//推荐
                var href = $(ele).attr("href"),
                    productId = href.substring(href.lastIndexOf("/") + 1);
                productId = productId.substring(0, productId.indexOf(".html"));
                // ga('ec:addImpression', {
                //     'id': productId,
                //     'name': $(ele).find("h6").html(),
                //     'position': (index + 1),
                //     'list': "Home_推荐"
                // });
                // ga('send', 'event', "Home_MO", "Home_推荐_Impression_" + (index + 1), $(ele).attr("href"), { nonInteraction: true });
                $(ele).on('click', function () {
                    ga('ec:addProduct', {
                        'id': productId,
                        'name': $(this).find("h6").html(),
                        'position': (index + 1)
                    });
                    ga('ec:setAction', 'click', { list: "Home_推荐" });
                    ga('send', 'event', "Home_MO", "Home_推荐_Click_" + (index + 1), $(this).attr("href"));
                });
            });
            $("div.shortcut-channel ul li a").each(function (index, ele) {
                $(this).on('click', function () {
                    ga('send', 'event', "Home_MO", "shortcut_channel_" + (index + 1), $(this).attr("href"));
                });
            });
            $("div.recommend-series ul li a").each(function (index, ele) {
                $(this).on('click', function () {
                    ga('send', 'event', "Home_MO", "Home_recommend_series_" + (index + 1), $(this).attr("href"));
                });
            });
            $("ul li.icon-home a").on('click', function () {
                ga('send', 'event', "Lenovo_MO", " Lenovo_footernav_1", $(this).find('span').html());
            });
            $("ul li.icon-cate a").on('click', function () {
                ga('send', 'event', "Lenovo_MO", " Lenovo_footernav_2", $(this).find('span').html());
            });
            $("ul li.icon-cart a").on('click', function () {
                ga('send', 'event', "Lenovo_MO", " Lenovo_footernav_3", $(this).find('span').html());
            });
            $("ul li.icon-my a").on('click', function () {
                ga('send', 'event', "Lenovo_MO", " Lenovo_footernav_4", $(this).find('span').html());
            });
        } else if (domain.indexOf('shop.lenovo') != -1) {//商城
            if (window.ga === undefined) {
                console.log('insert GA code ');
                _head.appendChild(_script);
            }
            //各频道页
            if (domain.indexOf('lenovoindex') != -1) {//联想电脑分类首页
                $("div.list_section .list_cont>h3>a").each(function () {//分类导航
                    $(this).on('click', function () {
                        ga('send', 'event', "LenovoPC_PC", $(this).text(), $(this).attr("href"));
                    });
                });
                $("div.list_section div.list_links a").each(function () {//分类导航
                    $(this).on('click', function () {
                        ga('send', 'event', "LenovoPC_PC", $(this).text(), $(this).attr("href"));
                    });
                });
                var lunbo_timers = setInterval(function () {
                    if ($("div.lunbo_fade ul li a").length > 0) {
                        clearInterval(lunbo_timers);
                        $("div.lunbo_fade ul li a").each(function (i, ele) {//轮播图
                            // ga('ec:addPromo', {
                            //     'id': $(this).attr("href"),
                            //     'name': "LenovoPC_banner",
                            //     'position': "LenovoPC_banner_" + (i + 1)
                            // });
                            // ga('send', 'event', "LenovoPC_PC", "LenovoPC_banner_" + (i + 1) + "_Impression", $(this).attr("href"), { nonInteraction: true });
                            $(this).on('click', function () {
                                ga('ec:addPromo', {
                                    'id': $(this).attr("href"),
                                    'name': "LenovoPC_banner",
                                    'position': "LenovoPC_banner_" + (i + 1)
                                });
                                ga('ec:setAction', 'promo_click');
                                ga('send', 'event', "LenovoPC_PC", "LenovoPC_banner_" + (i + 1) + "_Click", $(this).attr("href"));
                            });
                        });
                    }
                }, 50);
                $("div.hot_con .hot_top").each(function (i, ele) {//热门
                    var t = $(ele);
                    // ga('ec:addImpression', {
                    //     'id': t.find("div.hot_price").eq(0).attr("gcode"),
                    //     'name': t.find("div.hot_name>a").html(),
                    //     'list': "Lenovo_PC_今日热门",
                    //     'category': "今日热门",
                    //     'brand': "联想",
                    //     'position': t.attr("sort")
                    // });
                    // ga('send', 'event', "LenovoPC_PC", "Lenovo_PC_今日热门_" + (i + 1), t.find("div.hot_name>a").attr("href"), { nonInteraction: true });
                    t.on('click', function () {
                        var _t = $(this);
                        ga('ec:addProduct', {
                            'id': _t.find("div.hot_price").eq(0).attr("gcode"),
                            'name': _t.find("div.hot_name>a").html(),
                            'category': "今日热门",
                            'brand': "联想",
                            'position': _t.attr("sort")
                        });
                        ga('ec:setAction', 'click', { list: "Lenovo_PC_今日热门" });
                        ga('send', 'event', "LenovoPC_PC", "Lenovo_PC_今日热门_" + (i + 1), _t.find("div.hot_name>a").attr("href"));
                    });
                });
                $("div.hot_con .hot_bottom").each(function (i, ele) {//热门
                    var t = $(ele);
                    // ga('ec:addImpression', {
                    //     'id': t.find("div.hot_price").eq(0).attr("gcode"),
                    //     'name': t.find("div.hot_name>a").html(),
                    //     'list': "Lenovo_PC_今日热门",
                    //     'category': "今日热门",
                    //     'brand': "联想",
                    //     'position': t.attr("sort")
                    // });
                    // ga('send', 'event', "LenovoPC_PC", "Lenovo_PC_今日热门_" + (i + 1), t.find("div.hot_name>a").attr("href"), { nonInteraction: true });
                    t.on('click', function () {
                        var _t = $(this);
                        ga('ec:addProduct', {
                            'id': _t.find("div.hot_price").eq(0).attr("gcode"),
                            'name': _t.find("div.hot_name>a").html(),
                            'category': "今日热门",
                            'brand': "联想",
                            'position': _t.attr("sort")
                        });
                        ga('ec:setAction', 'click', { list: "Lenovo_PC_今日热门" });
                        ga('send', 'event', "LenovoPC_PC", "Lenovo_PC_今日热门_" + (i + 1), _t.find("div.hot_name>a").attr("href"));
                    });
                });

                $(".help_zone .help_zone_img a").each(function (index, ele) {
                    $(this).on('click', function () {
                        var type = "";
                        if (index == 0)
                            type = "LenovoPC_帮你选_游戏专区";
                        else if (index == 1)
                            type = "LenovoPC_帮你选_YOGA专区";
                        else
                            type = "LenovoPC_帮你选_小新专区";
                        ga('send', 'event', "LenovoPC_PC", type, $(this).attr('href'));
                    });
                });
                $(".help_new ul li a").each(function (index, ele) {
                    $(this).on('click', function () {
                        var type = "";
                        if (index == 0)
                            type = " LenovoPC_帮你选_新品专区_1";
                        else
                            type = " LenovoPC_帮你选_新品专区_2";
                        ga('send', 'event', "LenovoPC_PC", type, $(this).attr('href'));
                    });
                });
                $(".help_tryout a").on('click', function () {
                    ga('send', 'event', "LenovoPC_PC", "LenovoPC_帮你选_新品试用", $(this).attr('href'));
                });
                $(".help_tab div.tab_body .tab_list_link a").each(function () {
                    $(this).on('click', function () {
                        var title = $(".help_tab .tab_title a.active").html();
                        ga('send', 'event', "LenovoPC_PC", "LenovoPC_帮你选_" + title + "_" + $(this).html(), $(this).attr('href'));
                    });
                });
                $("div.pic_box a").each(function (i, ele) {
                    $(this).on('click', function () {
                        ga('send', 'event', "LenovoPC_PC", "LenovoPC_底部_" + (i + 1), $(this).attr('href'));
                    });
                });
                $("div.belong_con1 a").on('click', function () {
                    ga('send', 'event', "LenovoPC_PC", "LenovoPC_专属_定制", $(this).attr('href'));
                });
                $("div.belong_con2 div.belong_list").each(function (index, ele) {
                    $(ele).find("ul li div.belong_img a").on('click', function (i, el) {
                        var title = $(ele).find("h4").text();
                        title = title.substring(0, 2);
                        ga('send', 'event', "LenovoPC_PC", "LenovoPC_专属_" + title + "_" + (i + 1), $(this).attr('href'));
                    });
                });
                $("div.belong_con3 div.belong_img a").each(function (i, ele) {
                    $(ele).on('click', function () {
                        ga('send', 'event', "LenovoPC_PC", "LenovoPC_合伙人_" + (i + 1), $(this).attr('href'));
                    });
                });
                return;
            }
            if (domain.indexOf('serviceindex.html') != -1) {//联想服务
                $("#menu-nav-container .navaclass>li.classlist").each(function () {
                    $(this).find(".titdesc h3 a").eq(0).on('click', function () {
                        ga('send', 'event', "LenovoService_PC", $(this).html(), $(this).attr("href"));
                    });
                    $(this).find(".titdesc .classitem>a").each(function () {
                        $(this).on('click', function () {
                            ga('send', 'event', "LenovoService_PC", $(this).html(), $(this).attr("href"));
                        });
                    });
                });
                return;
            }
            if (domain.indexOf('pad.html') != -1) {//联想平板电脑
                var pad_timers = setInterval(function () {
                    if ($("div.lunbo_fade ul li a").length > 0) {
                        clearInterval(pad_timers);
                        $("div.lunbo_fade ul li a").each(function (i, ele) {//轮播图
                            // ga('ec:addPromo', {
                            //     'id': $(ele).attr("href"),
                            //     'name': "LenovoPad_banner",
                            //     'position': "LenovoPad_banner_" + (i + 1)
                            // });
                            // ga('send', 'event', "LenovoPad_PC", "LenovoPad_banner_" + (i + 1) + "_Impression", $(this).attr("href"), { nonInteraction: true });
                            $(ele).on('click', function () {
                                ga('ec:addPromo', {
                                    'id': $(this).attr("href"),
                                    'name': "LenovoPad_banner",
                                    'position': "LenovoPad_PC_" + (i + 1)
                                });
                                ga('ec:setAction', 'promo_click');
                                ga('send', 'event', "LenovoPad_PC", "LenovoPad_banner_" + (i + 1) + "_Click", $(this).attr("href"));
                            });
                        });
                    }
                }, 50);
                $(".channel_left_section ul li a").each(function () {//导航
                    $(this).on('click', function () {
                        ga('send', 'event', "LenovoPad_PC", $(this).text(), $(this).attr("href"));
                    });
                });
                $(".channel_main_right ul li a").each(function (i, ele) {
                    var el = $(ele);
                    // ga('ec:addImpression', {
                    //     'id': el.find("em").eq(0).attr("gcode"),
                    //     'name': el.find("p").eq(0).text(),
                    //     'list': "LenovoPad",
                    //     'position': (i + 1)
                    // });
                    // ga('send', 'event', "LenovoPad_PC", "LenovoPad_" + (i + 1), el.attr("href"), { nonInteraction: true });
                    $(el).on('click', function () {
                        var t = $(this);
                        ga('ec:addProduct', {
                            'id': t.find("em").eq(0).attr("gcode"),
                            'name': t.find("p").eq(0).text(),
                            'position': (i + 1)
                        });
                        ga('ec:setAction', 'click', { list: "LenovoPad" });
                        ga('send', 'event', "LenovoPad_PC", "LenovoPad_" + (i + 1), t.attr("href"));
                    });
                });
                $(".channel_main_left a").each(function (i, ele) {
                    $(ele).on('click', function () {
                        ga('send', 'event', "LenovoPad_PC", "LenovoPad_channelPromo_" + (i + 1), $(this).attr("href"));
                    });
                });
                return;
            }
            if (domain.indexOf('lenovo_channel_shuma.html') != -1) {//联想数码
                var shuma_timers = setInterval(function () {
                    if ($("div.lunbo_fade ul li a").length > 0) {
                        clearInterval(shuma_timers);
                        $("div.lunbo_fade ul li a").each(function (i, ele) {//轮播图
                            // ga('ec:addPromo', {
                            //     'id': $(ele).attr("href"),
                            //     'name': "LenovoShuma_banner",
                            //     'position': "LenovoShuma_banner" + (i + 1)
                            // });
                            // ga('send', 'event', "LenovoShuma_PC", "LenovoShuma_banner_" + (i + 1) + "_Impression", $(this).attr("href"), { nonInteraction: true });
                            $(ele).on('click', function () {
                                ga('ec:addPromo', {
                                    'id': $(this).attr("href"),
                                    'name': "LenovoShuma_banner",
                                    'position': "LenovoShuma_banner" + (i + 1)
                                });
                                ga('ec:setAction', 'promo_click');
                                ga('send', 'event', "LenovoShuma_PC", "LenovoShuma_banner_" + (i + 1) + "_Click", $(this).attr("href"));
                            });
                        });
                    }
                }, 50);
                $("#menu-nav-container .navaclass>li.classlist").each(function (i, ele) {
                    $(ele).find(".titdesc h3 a").eq(0).on('click', function () {
                        ga('send', 'event', "LenovoShuma_PC", $(this).html(), $(this).attr("href"));
                    });
                    $(ele).find("div.classitem>a").each(function () {
                        $(this).on('click', function () {
                            ga('send', 'event', "LenovoShuma_PC", $(this).html(), $(this).attr("href"));
                        });
                    });
                });
                $(".shop_intelligentDigital_hotRemmend .recommend a").each(function (i, ele) {//热门推荐
                    var _t = $(ele),
                        href = _t.attr("href"),
                        productId = href.substring(href.lastIndexOf("/") + 1);
                    productId = productId.substring(0, productId.indexOf(".html"));
                    // ga('ec:addImpression', {
                    //     'id': productId,
                    //     'name': "LenovoShuma_热门推荐",
                    //     'list': "LenovoShuma_热门推荐",
                    //     'position': (i + 1)
                    // });
                    // ga('send', 'event', "LenovoShuma_PC", "LenovoShuma_热门推荐_" + (i + 1) + "_Impression", $(this).attr("href"), { nonInteraction: true });
                    _t.on("click", function () {
                        ga('ec:addProduct', {
                            'id': productId,
                            'name': "LenovoShuma_热门推荐",
                            'list': "LenovoShuma_热门推荐",
                            'position': (i + 1)
                        });
                        ga('ec:setAction', 'click', { list: "LenovoShuma_热门推荐" });
                        ga('send', 'event', "LenovoShuma_PC", "LenovoShuma_热门推荐_" + (i + 1) + "_Click", $(this).attr("href"));
                    });
                    _t.find(".titdesc h3 a").eq(0).on('click', function () {
                        ga('ec:addProduct', {
                            'id': $(this).attr("href"),
                            'name': "LenovoShuma_热门推荐",
                            'position': (i + 1)
                        });
                        ga('ec:setAction', 'click', { list: "LenovoShuma_热门推荐" });
                        ga('send', 'event', "LenovoShuma_PC", "LenovoShuma_热门推荐_" + (i + 1) + "_Click", $(this).attr("href"));
                    });
                });
                $(".floor_section").each(function (index, el) {
                    var title = $(el).find(".floor_title h3").eq(0).text();
                    $(el).find(".floor_right .floor_item").each(function (i, ele) {//right
                        var elee = $(ele);
                        // ga('ec:addImpression', {
                        //     'id': elee.find("a.pro_price").eq(0).attr("gcode"),
                        //     'name': elee.find("a.pro_name").eq(0).html(),
                        //     'list': "LenovoShuma_" + elee.find("a.pro_name").eq(0).html(),
                        //     'position': elee.attr("sort")
                        // });
                        // ga('send', 'event', "LenovoShuma_PC", "LenovoShuma_" + title + "_" + elee.attr("sort") + "_Impression", elee.find("a.pro_price").eq(0).attr("href"), { nonInteraction: true });
                        elee.on('click', function () {
                            var t = $(this);
                            ga('ec:addProduct', {
                                'id': t.find("a.pro_price").eq(0).attr("gcode"),
                                'name': t.find("a.pro_name").eq(0).html(),
                                'position': t.attr("sort")
                            });
                            ga('ec:setAction', 'click', { list: "LenovoShuma_" + title });
                            ga('send', 'event', "LenovoShuma_PC", "LenovoShuma_" + title + "_" + t.attr("sort"), t.find("a.pro_price").eq(0).attr("href"));
                        });
                    });
                    $(el).find(".floor_left a").each(function (i, ele) {//left
                        $(ele).on('click', function () {
                            var t = $(this);
                            ga('send', 'event', "LenovoShuma_PC", "LenovoShuma_channelPromo_" + (i + 1), t.attr("href"));
                        });
                    });
                });
                return;
            }
            $("#logo a").on('click', function () {//logo
                ga('send', 'event', "Lenovo_PC", "LogoClick", $(this).attr("href"));
            });
            $(document).delegate("#small_logo", "click", function () {
                ga('send', 'event', "Lenovo_PC", "SmallLogoClick", $(this).parent().attr("href"));
            });
            addGaa($("#header #top-nav li a"), "Lenovo_PC", "Lenovo_topnav_");//头
            addGaa($("div.nav_box ul li a"), "Lenovo_PC", " Lenovo_topnav_");//二级导航
            var slider_list = ["热线", "咨询", "门店", "吐槽", "APP", "注册好礼"];
            $(".sort-list ul li>a").each(function (index, ele) {
                    $(ele).on('click', function () {
                        var href = $.trim($(this).attr("href"));
                        if (/(undefined|#)/gi.test(href)) {
                            href = "https://shop.lenovo.com.cn/";
                        }
                        try {
                            ga('send', 'event', "Lenovo_PC", "Lenovo_contact_" + slider_list[index], href);
                        } catch (e) {
                            console.log('statistics is fail,infomation==' + e.message);
                        }
                    });
            });
            var slider_lists = ["售前咨询", "服务类自助", "企业it咨询顾问"];
            $(".sort-list ul.list2 a").each(function (index, ele) {
                    $(ele).on('click', function () {
                        var href = $.trim($(this).attr("href"));
                        try {
                            ga('send', 'event', "Lenovo_PC", "Lenovo_contact_" + slider_lists[index], href);
                        } catch (e) {
                            console.log('statistics is fail,infomation==' + e.message);
                        }
                    });
            });
            addGaa($(".shop_footer #footer dl dd a"), "Lenovo_PC", "Shop_footernav_");//尾
            addGaa($(".footer ul li a"), "Lenovo_PC", "Lenovo_footernav_");//公共尾
            addGaa($(".nav_box ul li a"), "Lenovo_PC", "Shop_footernav_");//公共尾
            $("div.list_nav ul li a").each(function () {//分类导航
                $(this).on('click', function () {
                    ga('send', 'event', "Lenovo_PC", $(this).text(), $(this).attr("href"));
                });
            });
            $("#ul1 li a").each(function (index, ele) {//轮播图
                var background = $(ele).find("div").get(0).style.background.replace('url(', '').replace(')', '');
                background = background.replace("no-repeat", "").replace(/center/gi, "");
                // ga('ec:addPromo', {
                //     'id': $(this).attr('href'),
                //     'name': "Shop_Home_banner",
                //     'position': "Home_banner_" + (index + 1),
                //     'creative': background
                // });
                // ga('send', 'event', 'ShopHome_PC', "Home_banner_" + (index + 1) + "_Impression", $(this).attr('href'), { nonInteraction: true });
                $(ele).on('click', function () {
                    ga('ec:addPromo', {
                        'id': $(this).attr('href'),
                        'name': "Shop_Home_banner",
                        'position': "Home_banner_" + (index + 1),
                        'creative': background
                    });
                    ga('ec:setAction', 'promo_click');
                    ga('send', 'event', 'ShopHome_PC', "Home_banner_" + (index + 1) + "_Impression", $(this).attr('href'));
                });
            });
            $("#quick-link ul li a").each(function (index, ele) {//banner轮播图下方
                $(ele).on('click', function () {
                    ga('send', 'event', "ShopHome_PC", "Home_quick_link_" + (index + 1), $(this).attr('href'));
                });
            });
            $("#shops-ad ul li a").each(function (index, ele) {
                $(this).on('click', function () {
                    ga('ec:addProduct', {
                        'id': $(this).attr('href'),
                        'name': "Home_shops_ad",
                        'position': "Home_shops_ad_" + (index + 1)
                    });
                    ga('ec:setAction', 'promo_click');
                    ga('send', 'event', "ShopHome_PC", "Home_shops_ad_" + (index + 1), $(this).attr("href"));
                });
            });
            $(".ns_floor-nav-box ul li a").each(function () {
                $(this).on("click", function () {
                    var floor = $(this).find("span").eq(0).text();
                    var text = $(this).find("em").eq(0).text();
                    var info = [floor, text, "floor_nav"];
                    ga('send', 'event', "ShopHome_PC", info.join("_"), $(this).attr("href"));
                });
            });
            $("div.floor_section").each(function (index, ele) {//floor_links
                var _t = $(this);
                var floor_name = _t.find("div.floor_title h3").eq(0).html();
                _t.find("div.floor_links a").each(function () {
                    $(this).on('click', function () {
                        ga('send', 'event', "ShopHome_PC", floor_name + "_" + $(this).html(), $(this).attr("href") || "");
                    });
                });
                _t.find("div.floor_left a").eq(0).on('click', function () {//左
                    ga('send', 'event', "ShopHome_PC", floor_name + "_left", $(this).attr("href"));
                });
                _t.find("div.floor_right div.floor_item").each(function (i, ele) {//右
                    var t = $(this),
                        productId = t.find('p').eq(0).attr("gcode"),
                        productName = t.find("a").eq(1).html();
                    // ga('ec:addImpression', {
                    //     'id': productId,
                    //     'name': productName,
                    //     'category': floor_name,
                    //     'brand': "联想",
                    //     'list': "Home_" + floor_name,
                    //     'position': (i + 1)
                    // });
                    // ga('send', 'event', "ShopHome_PC", floor_name + "_" + (i + 1), t.find("a").eq(0).attr("href"));
                    t.find("a").on('click', function () {
                        ga('ec:addProduct', {
                            'id': productId,
                            'name': productName,
                            'category': floor_name,
                            'brand': "联想",
                            'position': (i + 1)
                        });
                        ga('ec:setAction', 'click', { list: "Home_" + floor_name });
                        ga('send', 'event', "ShopHome_PC", floor_name + "_" + (i + 1), $(this).attr("href"));
                    });
                });
            });

        }
        else if (domain.indexOf('www.lenovo') != -1) {//大官网
            if (window.ga === undefined) {
                console.log('insert GA code ');
                _head.appendChild(_script);
            }
            $("#logo a").on('click', function () {//logo
                ga('send', 'event', "Lenovo_PC", "LogoClick", $(this).attr("href"));
            });
            //首页导航
            addGaa($("#header div.nav_box ul li a"), "Lenovo_PC", "Lenovo_topnav_");
            //个人家庭产品
            $(".per_home_pro a.col_nav_title").on('click', function () {
                ga("send", "event", "Lenovo_PC", "Lenovo_topnav_个人&家庭产品", $(this).attr("href"));
            });
            //点击个人&家用产品分类首页中一级列表
            $(".col_nav_con ul.per_fir_title li a").each(function (index, ele) {
                $(this).on('click', function () {
                    ga('send', 'event', "Lenovo_PC", "个人_" + $(this).parent().attr("tab"), $(this).attr("href"));
                });
            });
            //点击个人&家用产品分类二级菜单
            $("ul.lenovo_pc").each(function () {
                var _t = $(this);
                var title = _t.attr("tabindex");
                _t.find("li").each(function (i, ele) {
                    var a = $(ele).find("p.second_title a").eq(0);
                    var title1 = a.html();
                    $(a).on("click", function () {
                        ga('send', 'event', "Lenovo_PC", "个人_" + title + "_" + $(this).html(), $(this).attr("href"));
                    });
                    //点击个人&家用产品分类三级菜单
                    addGaa($(ele).find("ul.third_title li a"), "Lenovo_PC", "个人_" + title + "_" + title1 + "_");
                });
            });
            //商用&解决方案
            $(".bus_per_home_pro a.bus_col_nav_title").on('click', function () {
                ga("send", "event", "Lenovo_PC", "Lenovo_topnav_商用&解决方案", $(this).attr("href"));
            });
            //点击商用&解决方案一级列表
            $(".bus_col_nav_con ul.bus_per_fir_title li a").each(function () {
                $(this).on('click', function () {
                    ga('send', 'event', "Lenovo_PC", "商用_" + $(this).parent().attr("tab"), $(this).attr("href"));
                });
            });

            $("ul.bus_lenovo_pc").each(function () {
                var _t = $(this);
                var title = _t.attr("tabindex");
                _t.find("li").each(function (i, ele) {
                    var a = $(ele).find("p.bus_second_title a").eq(0);
                    var title1 = a.html();
                    $(a).on("click", function () {
                        ga('send', 'event', "Lenovo_PC", "商用_" + title + "_" + $(this).html(), $(this).attr("href"));
                    });
                    //点击个人&家用产品分类三级菜单
                    addGaa($(ele).find("ul.bus_third_title li a"), "Lenovo_PC", "商用_" + title + "_" + title1 + "_");
                });
            });
            //点击商用&解决方案二级菜单
            addGaa($("ul.bus_lenovo_pc p.second_title a"), "Lenovo_PC", "");
            //点击商用&解决方案三级菜单
            addGaa($("ul.bus_third_title li a"), "Lenovo_PC", "");
            //轮播图
            $(".shoppc_home_banner_201709121703 ul li a").each(function (index, ele) {
                var _t = $(ele);
                var background = _t[0].style.background.replace('url(', '').replace(')', '');
                background = background.replace("no-repeat", "").replace(/center/gi, "");
                // ga('ec:addPromo', {
                //     'id': _t.attr('href'),
                //     'name': "Home_banner",
                //     'position': (index + 1),
                //     "creative": background
                // });
                // ga('send', 'event', "Home_PC", "home_banner_" + (index + 1) + "_impression", _t.attr('href'), { nonInteraction: true });
                _t.on('click', function () {
                    var _t = $(this);
                    ga('ec:addPromo', {
                        'id': _t.attr('href'),
                        'name': "Home_banner",
                        'position': (index + 1),
                        "creative": background
                    });
                    ga('ec:setAction', 'promo_click');
                    ga('send', 'event', "Home_PC", "home_banner_" + (index + 1) + "_click", _t.attr('href'));
                });
            });
            //首页banner轮播图下方
            $(".quickEntryBox ul li a").each(function (index, ele) {
                $(this).on('click', function () {
                    ga('send', 'event', "Home_PC", "home_EntryBox_" + (index + 1), $(this).attr("href"));
                });
            });
            //明星单品左侧产品促销图片
            $(".new_star_pro201711161010 .star_pro_container .star_pro_left a").each(function (index, ele) {
                $(this).on('click', function () {
                    ga('send', 'event', "Home_PC", "Lenovo 明星单品_left_" + (index + 1), $(this).attr('href'));
                });
            });
            //明星单口 右侧产品促销图片
            $(".new_star_pro201711161010 .star_pro_container .right_list a").each(function (index, ele) {
                var _t = $(this);
                var name = $('ul.star_pro_head_hot li.cur').attr('latag');
                name = name.substring(name.lastIndexOf("_") + 1);
                // ga('ec:addImpression', {
                //     'id': _t.find('p').attr('gcode'),
                //     'name': _t.find('img').attr('alt'),
                //     'category': "明星单品",
                //     'list': name,
                //     'brand': "联想",
                //     'position': (index + 1)
                // });
                // ga('send', 'event', "Home_PC", "明星单品_rightlist_" + name + "_" + (index + 1), _t.attr('href'));
                $(_t).on('click', function () {
                    var _t = $(this);
                    ga('ec:addProduct', {
                        'id': _t.find('p').attr('gcode'),
                        'name': _t.find('img').attr('alt'),
                        'category': "明星单品",
                        'brand': "联想",
                        'position': (index + 1)
                    });
                    ga('ec:setAction', 'click', { list: name });
                    ga('send', 'event', "Home_PC", "明星单品_rightlist_" + name + "_" + (index + 1), _t.attr('href'));
                });
            });
            //明星单品  头部链接
            $(".new_star_pro201711161010 .star_pro_head ul li").each(function (index, ele) {
                $(this).on('click', function () {
                    var name = $(this).attr('latag');
                    name = name.substring(name.lastIndexOf("_") + 1);
                    ga('send', 'event', "Home_PC", "明星单品_" + name, $(this).attr('href'));
                });
            });
            //底部轮播图
            $("div.container ul.show_container li a").each(function (index, ele) {
                $(ele).on('click', function () {
                    ga('send', 'event', "Home_PC", "世界因你而联想_banner_" + (index + 1), $(this).attr('href'));
                });
            });
            addGaa($("div.footer ul.foot_top li a"), "Lenovo_PC", "");//公共尾          
            addGaa($("div.foot_bot .foot_bot_con a"), "Lenovo_PC", "");//公共尾          
            $(" ul.foot_top li.social_platform ul li a").each(function (i, ele) {
                $(ele).off("click").on("click", function () {
                    ga('send', 'event', "Lenovo_PC", $(this).attr("class"), $(this).attr("href") || "");
                })
            });
            $(" ul.foot_top li.social_platform div>a").each(function (i, ele) {
                $(ele).off("click").on("click", function () {
                    var classes = $(this).find('p').eq(0).attr("class");
                    classes = classes.split(" ");
                    if (classes.length > 0)
                        classes = classes[0];
                    ga('send', 'event', "Lenovo_PC", classes, $(this).attr("href") || "");
                })
            });
        }
        else if (domain.indexOf('mall.lenovo') != -1) {//pc门店
            if (window.ga === undefined) {
                console.log('insert GA code ');
                _head.appendChild(_script);
            }
        }
        else if (domain.indexOf('news.lenovo') != -1) {//pc资讯
            ;
        }

    } catch (e) {
        console.log('statistics is fail,infomation==' + e.message);
    }
    /**
     * 
     * @param {*} target 目标链接集合
     * @param {*} eventCategory  名称固定
     * @param  string 前缀
     */
    function addGaa(target, eventCategory, pre) {
        target.each(function (index, ele) {
            $(this).on('click', function () {
                try {
                    ga('send', 'event', eventCategory, pre + ($.trim($(this).html())), $(this).attr("href") || "");
                } catch (e) {
                    console.log('statistics is fail,infomation==' + e.message);
                }
            });
        });
    }
});
