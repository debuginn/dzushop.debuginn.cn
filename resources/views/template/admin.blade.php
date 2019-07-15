<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 必备标签 -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>后台管理系统 - @yield('title')</title>
    <!--CSRF认证-->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- 插件:css -->
    <link rel="stylesheet" href="{{ asset('vendors/iconfonts/mdi/css/materialdesignicons.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/css/vendor.bundle.base.css') }}">
    <!-- 结束插件 -->
    <!-- 注入:css -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/custom.css') }}">
    <!-- 结束注入 -->
    <link rel="shortcut icon" href="{{ asset('icon/fly.png') }}" />
</head>
<body>
<div class="container-scroller">
    <!-- 头部区域设计 -->
    <nav class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a class="navbar-brand brand-logo" href="#"><img src="{{ asset('images/logo.svg') }}" alt="logo"/></a>
            <a class="navbar-brand brand-logo-mini" href="index.html"><img src="{{ asset('images/logo-mini.svg') }}" alt="logo"/></a>
        </div>
        <div class="navbar-menu-wrapper d-flex align-items-stretch">
            <ul class="navbar-nav navbar-nav-right">
                <li class="nav-item nav-profile dropdown">
                    <a class="nav-link dropdown-toggle" id="profileDropdown" href="#" data-toggle="dropdown" aria-expanded="false">
                        <div class="nav-profile-img">
                            <img src="{{ asset('images/faces/face1.jpg')}}" alt="image">
                        </div>
                        <div class="nav-profile-text">
                            <p class="mb-1 text-black">张三</p>
                        </div>
                    </a>
                    <div class="dropdown-menu navbar-dropdown" aria-labelledby="profileDropdown">
                        <a class="dropdown-item" href="javascript:;" data-toggle="modal" data-target="#changePassword">
                            <i class="mdi mdi-cached mr-2 text-success"></i>
                            修改密码
                        </a>
                        <a class="dropdown-item" href="#">
                            <i class="mdi mdi-home mr-2 text-success"></i>
                            前台首页
                        </a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">
                            <i class="mdi mdi-logout mr-2 text-primary"></i>
                            退出
                        </a>
                    </div>
                </li>
                <!-- 清除缓存 -->
                <li class="nav-item dropdown">
                    <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" >
                        <i class="mdi mdi-filter-variant"></i> 清除缓存
                    </a>
                </li>
                <!-- 返回顶部 -->
                <li class="nav-item nav-settings d-none d-lg-block">
                    <a class="nav-link" href="#">
                        <i class="mdi mdi-format-line-spacing"></i>顶部
                    </a>
                </li>
            </ul>
            <!-- 首页页面响应式布局按钮 -->
            <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
                <span class="mdi mdi-menu"></span>
            </button>
        </div>
    </nav>
    <!-- 左侧区域设置 -->
    <div class="container-fluid page-body-wrapper">
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
            <ul class="nav">
                <li class="nav-item">
                    <a class="nav-link" href="/admin">
                        <span class="menu-title">首页</span>
                        <i class="mdi mdi-home menu-icon"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                        <span class="menu-title">管理员管理</span>
                        <i class="menu-arrow"></i>
                        <i class="mdi mdi-settings menu-icon"></i>
                    </a>
                    <div class="collapse" id="ui-basic">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="/admin/admin">管理员列表</a></li>
                            <li class="nav-item"> <a class="nav-link" href="javascript:;" data-toggle="modal" data-target="#addAdmin">管理员添加</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#ui-types" aria-expanded="false" aria-controls="ui-basic">
                        <span class="menu-title">菜单管理</span>
                        <i class="menu-arrow"></i>
                        <i class="mdi mdi-settings menu-icon"></i>
                    </a>
                    <div class="collapse" id="ui-types">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="/admin/types">菜单列表</a></li>
                            <li class="nav-item"> <a class="nav-link" href="/admin/types/create">菜单添加</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#ui-slider" aria-expanded="false" aria-controls="ui-basic">
                        <span class="menu-title">轮播图管理</span>
                        <i class="menu-arrow"></i>
                        <i class="mdi mdi-file-image menu-icon"></i>
                    </a>
                    <div class="collapse" id="ui-slider">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="/admin/slider">轮播图管理</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#ui-goods" aria-expanded="false" aria-controls="ui-basic">
                        <span class="menu-title">商品管理</span>
                        <i class="menu-arrow"></i>
                        <i class="mdi mdi-file-image menu-icon"></i>
                    </a>
                    <div class="collapse" id="ui-goods">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="/admin/goods">商品管理</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#ui-user" aria-expanded="false" aria-controls="ui-basic">
                        <span class="menu-title">用户管理</span>
                        <i class="menu-arrow"></i>
                        <i class="mdi mdi-account menu-icon"></i>
                    </a>
                    <div class="collapse" id="ui-user">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="/admin/user">用户管理</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#ui-ads" aria-expanded="false" aria-controls="ui-basic">
                        <span class="menu-title">广告管理</span>
                        <i class="menu-arrow"></i>
                        <i class="mdi mdi-file-image menu-icon"></i>
                    </a>
                    <div class="collapse" id="ui-ads">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="/admin/ads">广告管理</a></li>
                            <li class="nav-item"> <a class="nav-link" href="/admin/typesads">分类广告管理</a></li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" data-toggle="collapse" href="#ui-sys" aria-expanded="false" aria-controls="ui-basic">
                        <span class="menu-title">系统管理</span>
                        <i class="menu-arrow"></i>
                        <i class="mdi mdi-file-image menu-icon"></i>
                    </a>
                    <div class="collapse" id="ui-sys">
                        <ul class="nav flex-column sub-menu">
                            <li class="nav-item"> <a class="nav-link" href="/admin/sys">系统管理</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </nav>
        <!-- 页面布局 -->
        <div class="main-panel">
            <!-- 页面内容-->

            {{--页面内容封装--}}
            @yield('main')

            <!-- 页面内容结束 -->

            <!-- 页脚布局设计 -->
            <footer class="footer">
                <div class="d-sm-flex justify-content-center justify-content-sm-between">
                    <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2019 </span>
                    <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Debug客栈</span>
                </div>
            </footer>
            <!-- 页脚布局设计结束 -->
        </div>
        <!-- 页面布局结束 -->
    </div>
    <!-- 页面内容结束 -->
</div>
<!-- 容器滚动条 -->
{{--头部header修改密码模态框--}}
<div class="modal fade" id="changePassword">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">修改密码</h4>
                <button type="button" class="close" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <form onsubmit="return false;">
                    <div class="form-group">
                        <label for="">原始密码</label>
                        <input type="password" name="ordpassword" class="form-control" placeholder="请输入原始密码" onchange="passCheck();">
                    </div>
                    <hr>
                    <div class="form-group">
                        <label for="">新的密码</label>
                        <input type="password" name="ordpassword" class="form-control" placeholder="请输入新的密码" onchange="passCheck();">
                    </div>
                    <div class="form-group">
                        <label for="">重复密码</label>
                        <input type="password" name="ordpassword" class="form-control" placeholder="请再次输入新的密码" onchange="passCheck();">
                    </div>
                    <hr>
                    <div class="form-group">
                        <input type="submit" value="提交" class="btn btn-gradient-success">
                        <input type="reset" value="重置" class="btn btn-gradient-danger">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
{{--头部header修改密码模态框结束--}}
<!-- 插件:js -->
<script src="{{ asset('vendors/js/vendor.bundle.base.js') }}"></script>
<script src="{{ asset('vendors/js/vendor.bundle.addons.js') }}"></script>
<!-- 插件结束 -->

<!-- 注入:js -->
<script src="{{ asset('js/off-canvas.js') }}"></script>
<script src="{{ asset('js/misc.js') }}"></script>
<!-- 注入结束 -->
<!-- 此页面自定义JS -->
<script src="{{ asset('js/file-upload.js') }}"></script>
<script src="{{ asset('js/dashboard.js') }}"></script>
<!-- bootbox js -->
<script src="{{ asset('js/bootbox.min.js') }}"></script>
<script src="{{ asset('js/bootbox.locales.min.js') }}"></script>
<!-- 此页面自定义JS结束-->
<script type="text/javascript">
    /**
     * 修改密码
     */
    function changePassword(){

    }
</script>
</body>

</html>
