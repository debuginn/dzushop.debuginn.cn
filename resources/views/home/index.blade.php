@extends('template.home')
@section('content')
<h1 style="float:left; margin-left:-10000px">联想官方网上商城</h1>
<div class="back" makeurl="/cms/fk/make?tp=shoppc/home/shoppcindex.ftl&fileName=index.html&hp=shoppc&rjson=1"
     htmlurl="//shop.lenovo.com.cn/index.html"
     prevurl="/cms/fk/view?modelpath=shoppc/home/shoppcindex&pn=/shoppc&isMake=1">
    <div class="shop_banner_c floor_cntr" bid="b_homepc_00121" ptype="3">
        <div class="nav_top piece_cntr back_h300 fixed along noremove" f_h="406"
             fid="04ae3025-466a-40ea-b076-62c4c228742e" ordnum="5">
            {{--banner大图开始--}}
            <div class="banner2017060401 piece shoppc_index_banner_1920_406 btn_cntr_in_piece" datatype="2" sort="0"
                 b_i="1920,406,100">
                <div id="xiaoxin_div">
                    <ul id="ul1">
                        @foreach($data['slider'] as $value1)
                        <li class="nohid"
                            latag="latag_home_MD532_04ae3025-466a-40ea-b076-62c4c228742e_p1_goods_code_no_exists">
                            <a target="_blank" href="{{ $value1->href }}">
                                <div style="background:url({{ $value1->img }}) center no-repeat "
                                     _bg="{{ $value1->img }}"></div>
                            </a>
                        </li>
                        @endforeach
                    </ul>
                    <span class="btnLeft" style="display: none;"></span>
                    <span class="btnRight" style="display: none;"></span>
                    <div class="lubo_dots">
                        <ul id="dot_ul"></ul>
                    </div>
                </div>
                <div></div>
                <div class="shop_banner_n">
                    <div class="fl_rx shop_nav_c floor_cntr">
                        <div class="piece list_nav">
                            <ul>
                                @foreach($data['type'] as $one)
                                <li>
                                    <div class="list_name">
                                        <a href="#" target="_blank" class="list_nm"
                                           style="height:28px;line-height:28px"
                                           >{{ $one->name }}
                                            <span class="list_usepng list_icona"></span></a>
                                        <div class="list_cont">
                                            <div class="list_lt">
                                                @foreach($one->zi as $two)
                                                <div class="list_lta">
                                                    <p>
                                                        <a href="#" target="_blank">{{ $two->name }}</a></p>
                                                    <ul class="clearfix">
                                                        @foreach($two->zi as $three)
                                                        <li>
                                                            <a href="#" target="_blank">
                                                                {{ $three->name }}</a>
                                                        </li>
                                                        @endforeach
                                                    </ul>
                                                </div>
                                                @endforeach
                                            </div>
                                            <div class="list_rt">
                                                @foreach($one->rightAds as $rightads)
                                                <a href="{{ $rightads->href }}">
                                                    <img class="classification_img" src="{{ url($rightads->img) }}" alt="{{ $rightads->title }}">
                                                </a>
                                                @endforeach
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                @endforeach
                            </ul>
                            <div class="jsurl hid_rx">//m1.lefile.cn/comp/js/classification.js?version=1</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wrap1200 relative" style="width:100%;">
                {{--明星单品上方导航栏开始--}}
                <div style="width:1200px;margin:0 auto" class="shop_mainhot_c floor_cntr" bid="b_homepc_00151" ptype="2"
                     floor_max_num="30">
                    <div class="piece_cntr back_h300 fixed along noremove config_btn_show"
                         fid="7775104e-5126-4056-8b2e-1fd727ccfb18" ordnum="2">
                        <div class="ad20170605 piece" sort="0" id="">
                            <div id="quick-link" class="btn_cntr_in_piece" datatype="5" sort="0" b_i="36,36,20">
                                <ul style="font-size: 0;">
                                    <li class="qukuai">
                                        <a href="#" target="_blank">
                                            <img src="static/picture/933dd26e-6c29-4b4a-af31-5564dc35.png" class="cur_img">
                                            <img src="static/picture/bad26f63-5656-46b3-a20d-7f190ce9.png"
                                                 class="hover_img" style="display: none;">
                                            <p>会员福利</p>
                                        </a>
                                    </li>
                                    <li class="qukuai">
                                        <a href="#" target="_blank">
                                            <img src="static/picture/d5b3a1d0-c475-4780-98d8-f2955618.png"
                                                 class="cur_img">
                                            <img src="static/picture/947f8425-65d3-464f-8eee-acd71613.png"
                                                 class="hover_img" style="display: none;">
                                            <p>领券中心</p>
                                        </a>
                                    </li>
                                    <li class="qukuai">
                                        <a                                         href="#" target="_blank">
                                            <img src="static/picture/d0bd2d77-3ec6-430d-bde5-17f76f0d.png"
                                                 class="cur_img">
                                            <img src="static/picture/cc876eb2-87b0-4aaa-bda3-e41cb86c.png"
                                                 class="hover_img" style="display: none;">
                                            <p>驱动下载</p>
                                        </a>
                                    </li>
                                    <li class="qukuai">
                                        <a
                                           href="#" target="_blank">
                                            <img src="static/picture/13cce9d5-93f2-46f9-806f-e8d9d15b.png"
                                                 class="cur_img">
                                            <img src="static/picture/b27b4810-156a-4f7a-bdca-f7871486.png"
                                                 class="hover_img" style="display: none;">
                                            <p>小新铺子</p>
                                        </a>
                                    </li>
                                    <li class="qukuai">
                                        <a
                                           href="#" target="_blank">
                                            <img src="static/picture/a9a066ed-a8e6-45c6-a8d1-49ff43b7.png"
                                                 class="cur_img">
                                            <img src="static/picture/c617f448-8f0d-47bf-abb0-20e9bf57.png"
                                                 class="hover_img" style="display: none;">
                                            <p>拯救者联盟</p>
                                        </a>
                                    </li>
                                    <li class="qukuai">
                                        <a
                                           href="#" target="_blank">
                                            <img src="static/picture/c431d883-f57c-43ad-b3e7-f7535a21.png"
                                                 class="cur_img">
                                            <img src="static/picture/b5e75562-b651-44a7-b15e-24ee3071.png"
                                                 class="hover_img" style="display: none;">
                                            <p>Think家族</p>
                                        </a>
                                    </li>
                                    <li class="qukuai">
                                        <a
                                           href="#" target="_blank">
                                            <img src="static/picture/f090e662-843a-4d06-a195-3ecd10f0.png"
                                                 class="cur_img">
                                            <img src="static/picture/48503e0e-c342-453d-8bf6-7fe8e7e1.png"
                                                 class="hover_img" style="display: none;">
                                            <p>手机馆</p>
                                        </a>
                                    </li>
                                    <li class="qukuai">
                                        <a
                                           href="#" target="_blank">
                                            <img src="static/picture/71b9b032-41c1-4690-a724-94a3db22.png"
                                                 class="cur_img">
                                            <img src="static/picture/3eedc66f-dc6f-4f15-8437-44ed819d.png"
                                                 class="hover_img" style="display: none;">
                                            <p>智能馆</p>
                                        </a>
                                    </li>
                                    <li class="qukuai">
                                        <a
                                           href="#" target="_blank">
                                            <img src="static/picture/c87fd931-39ea-4c03-99ce-2afa3b56.png"
                                                 class="cur_img">
                                            <img src="static/picture/7fb52d2e-21e0-430a-ada1-6878579e.png"
                                                 class="hover_img" style="display: none;">
                                            <p>联想校园</p>
                                        </a>
                                    </li>
                                </ul>
                                <div class="closebtn"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {{--明星单品上方导航栏结束--}}
                {{--明星商品开始--}}
                <div class="shop_mainhot_c floor_cntr nav_floor_item" id="J-star-box" bid="b_homepc_0016" ptype="2"
                     floor_max_num="3">
                    <div class="piece_cntr back_h300 fixed along noremove config_btn_show"
                         fid="16c890fa-6e60-4655-8a4b-175570e5a316" ordnum="6">
                        <div class="piece shop_index_floor_l2_r9">
                            <div class="Calculation_20180704" id="J-flash-box">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide swiper-no-swiping">
                                        <div class="box_left">
                                            <div class="secod">
                                                <div class="secod_radio">
                                                    <span>今日</span>
                                                    <span>秒杀</span></div>
                                            </div>
                                            <div class="timestar">2019-07-25 21:00</div>
                                            <div class="coupontext">本场距离结束还剩</div>
                                            <div class="coupostart">即将开始</div>
                                            <div class="counttime">2019-07-25 18:00</div>
                                        </div>
                                        <div class="box_right btn_cntr_in_piece" datatype="3" sort="1" mulitydata="1"
                                             b_i="208,208,10">
                                            @foreach($data['goods'] as $value_goods)
                                            <div class="box_goods">
                                                <a target="_blank" href="#">
                                                    <img src="{{ url($value_goods->img) }}"
                                                         alt="{{ $value_goods->title }}"></a>
                                                <div class="goods_price">
                                                    <a href="#">
                                                        <h3>{{ $value_goods->title }}</h3>
                                                        <p>
                                                        </p>
                                                    </a>
                                                    <div class="price_box">
                                                        <div class="price_left">
                                                            <p>
                                                                <span class="price" style="color:#df2634 "
                                                                      gcode="1000193">
                                                                    <a target="_blank" href="#"
                                                                       class="red price buy_price" controller="fn1">
                                                                        ￥{{ number_format($value_goods->price) }}元
                                                                    </a>
                                                                </span>
                                                                <span class="old_price" style="color:#767676">
                                                                    <del>￥{{ number_format($value_goods->price + 200) }}元</del>
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <div class="price_right">
                                                            <a href="#" buycode="1000193">立即购买</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-pagination" style="margin:0 auto"></div>
                            </div>
                            <div id="succuss_close">
                                <span class="xianghuasuan"></span>
                                <h2>成功设置提醒!</h2>
                                <p class="sucuss_title">我们将在活动开始前30分钟通过短信提醒您！</p>
                                <p class="guanbi">关闭</p>
                            </div>
                            <div id="fix_mask" style="display: none"></div>
                            <div class="epp_layer_success" id="window_shangouyy" style="display:  none;">
                                <a href="javascript:;" class="close_btn wsgyy_close"></a>
                                <div class="yyphone-icon"></div>
                                <p>请输入手机号，以便我们在开抢前提醒您</p>
                                <div class="epp_layer_input">
                                    <span>手机号 ：</span>
                                    <input type="text" class="wsgyy_tel" value=""></div>
                                <span class="keyup_detection"
                                      style="color:#df2634;position:absolute;left: 205px;top: 144px;"></span>
                                <div class="epp_bottom">
                                    <a href="javascript:;" class="epp_close wsgyy_ok">确定</a>
                                    <a href="javascript:;" class="epp_close wsgyy_close">取消</a></div>
                            </div>
                            <!-- 预约弹窗 end -->
                            <script type="text/javascript" src="static/js/Calculation.js"></script>
                        </div>
                    </div>
                </div>
                {{--明星商品结束--}}
            </div>
            <div style="background:#f5f5f5;padding:30px 0;min-width: 1200px;">
                <div class="wrap1200">
                    @php
                        $i = 0;
                    @endphp
                    @foreach($data['types'] as $lou)
                        @if($lou->is_lou == 0)
                            <div class="floor_cntr nav_floor_item" id="J-computer-box" bid="b_homepc_fl_0001" ptype="2">
                                <div class="piece_cntr back_h200 fixed along noremove config_btn_show"
                                     fid="9f1edcb1-6b77-4863-8a4b-ef1d77bd3087" ordnum="7">
                                    <div class="piece shop_index_floor_l1_r8">

                                        <div class="floor_section floor_l1_r8">
                                            <div class="floor_title clearfix">
                                                @php
                                                    $i++;
                                                @endphp
                                                <h3>{{ $i }}F {{ $lou->name }}</h3>
                                                <div class="floor_links">
                                                    <a target="_blank" href="#" title="YOGA系列">YOGA系列</a>
                                                    <a href="#" target="_blank" title=""
                                                       class="myicon floor_more">更多</a></div>
                                            </div>
                                            <div class="floor_img clearfix">
                                                {{--广告--}}
                                                <div class="floor_left btn_cntr_in_piece" datatype="5" sort="1"
                                                     b_i="240,535,40">
                                                    <a target="_blank" href="{{ $lou->leftAds->href }}"
                                                       title="">
                                                        <img width="240" height="535" src="{{ url($lou->leftAds->img) }}"
                                                             alt="" class="lazy_img"></a>
                                                </div>

                                                <div class="floor_right">
                                                    @foreach($lou->goods as $goods1)
                                                    <div class="floor_item btn_cntr_in_piece" datatype="3" sort="2"
                                                         b_i="164,164,10">
                                                        <a target="_blank" href="#"
                                                           title="{{ $goods1->title }}" class="pro_img">
                                                            <img width="164" height="164" src="{{ url($goods1->img) }}"
                                                                 alt="{{ $goods1->title }}"
                                                                 class="lazy_img"></a>
                                                        <a target="_blank" href="#"
                                                           title="{{ $goods1->title }}"
                                                           class="pro_name">{{ $goods1->title }}</a>
                                                        <a target="_blank" href="#"
                                                           title="{{ $goods1->title }}"
                                                           class="pro_description"></a>
                                                        <p class="prod" gcode="1004456">
                                                            <a target="_blank" href="#"
                                                               title="{{ $goods1->title }}"
                                                               class="pro_price red price">￥{{ number_format($goods1->price) }}元</a>
                                                        </p>
                                                       {{-- <span class="floor_label floor_label1"></span>--}}
                                                    </div>
                                                    @endforeach
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endif
                    @endforeach
                </div>
            </div>
        </div>
        <script type="text/javascript">function fn1() {
                var p_fn1 = '';
                try {
                    if (typeof (this.scope.pc) != "undefined") {
                        p_fn1 = "￥" + this.scope.pc;
                    }
                } catch (e) { }
                this.innerHTML = p_fn1;
            }</script>
        <!-- ----------------------- floorNav --------------------------- -->
        <div class="piece floor_nav">
            <div class="ns_floor-nav-box" id="J-floor-nav-box">
                <ul>
                    <li>
                        <a href="" data-scroll="#J-star-box">
                            <span class="myicon ns_star"></span>
                            <em>明星
                                <br>单品</em></a>
                    </li>
                    <li class="ns_line hunter"></li>
                    <li>
                        <a href="" data-scroll="#J-computer-box">
                            <span>1F</span>
                            <em>lenovo
                                <br>电脑</em></a>
                    </li>
                    <li class="ns_line"></li>
                    <li>
                        <a href="" data-scroll="#J-Mobile-box">
                            <span>2F</span>
                            <em>lenovo
                                <br>台式</em></a>
                    </li>
                    <li class="ns_line"></li>
                    <li>
                        <a href="" data-scroll="#J-Think-box">
                            <span>3F</span>
                            <em>手机
                                <br>产品</em></a>
                    </li>
                    <li class="ns_line"></li>
                    <li class="ns_l2">
                        <a href="" data-scroll="#J-Tablet-box">
                            <span>4F</span>
                            <em>Think
                                <br>电脑</em></a>
                    </li>
                    <li class="ns_line"></li>
                    <li>
                        <a href="" data-scroll="#J-Accessories-box">
                            <span>5F</span>
                            <em>平板
                                <br>电脑</em></a>
                    </li>
                    <li class="ns_line"></li>
                    <li class="ns_l2">
                        <a href="" data-scroll="#J-Services-box" class="">
                            <span>6F</span>
                            <em>服务
                                <br>升级</em></a>
                    </li>
                    <li class="ns_line"></li>
                    <li class="ns_l2">
                        <a href="" data-scroll="#J-Social-box">
                            <span>7F</span>
                            <em>
                                <br>选件</em></a>
                    </li>
                    <li class="ns_line"></li>
                    <li class="ns_l2">
                        <a href="" data-scroll="#J-night-box">
                            <span>8F</span>
                            <em>智能
                                <br>生活</em></a>
                    </li>
                    <li class="ns_line"></li>
                </ul>
            </div>
            <div class="jsurl hid_rx">//m1.lefile.cn/gl/0.1.16/js/components/floorNav.js?v=12</div>
        </div>
    </div>
</div>
@endsection