<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <!-- 必须的元标记 -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>登录 - 后台管理系统</title>
    <!-- 插件:css -->
    <link rel="stylesheet" href="{{ asset('vendors/iconfonts/mdi/css/materialdesignicons.min.css') }}">
    <link rel="stylesheet" href="{{ asset('vendors/css/vendor.bundle.base.css') }}">
    <!-- 结束插件：css -->
    <!-- 此网页的自定义CSS结束 -->
    <!-- 注入:css -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('css/custom.css') }}">
    <!-- 结束注入 -->
    <link rel="shortcut icon" href="{{ asset('icon/fly.png') }}" />
</head>
<body>
<div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
            <div class="row w-100">
                <div class="col-lg-4 mx-auto">
                    <div class="auth-form-light text-left p-5">
                        <div class="brand-logo">
                            <img src="{{ asset('images/logo.svg') }}" alt="logo">
                        </div>
                        <h4>你好，欢迎登录后台</h4>
                        <h6 class="font-weight-light">登录以继续</h6>
                        <form class="pt-3" action="/admin/check" method="post">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                            <div class="form-group">
                                @if (session('error'))
                                    <div class="alert alert-warning">
                                        {{ session('error') }}
                                    </div>
                                @endif
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="用户名" name="name">
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="密码" name="pass">
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="code" placeholder="验证码">
                                    <div class="input-group-append">
                                        <img src="/admin/captcha" alt="验证码" id="codeimg" onclick="captcha(this);return false;">
                                    </div>
                                </div>
                            </div>
                            <div class="mt-3">
                                <button class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn">登录</button>
                            </div>
                            <div class="my-2 d-flex justify-content-between align-items-center">
                                <div class="form-check">
                                    <label class="form-check-label text-muted">
                                        <input type="checkbox" class="form-check-input">
                                        记住登录状态
                                    </label>
                                </div>
                                <a href="#" class="auth-link text-black">忘记密码?</a>
                            </div>
                            <div class="text-center mt-4 font-weight-light">
                                没有用户名? <a href="#" class="text-primary">创建一个</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- content-wrapper ends -->
    </div>
    <!-- page-body-wrapper ends -->
</div>
<script type="text/javascript">
    /**
     * 点击验证码刷新验证码功能
     * @param obj
     */
    function captcha(obj){
        //更换地址
        obj.src='/admin/captcha?code='+Math.random();
    }
</script>
<!-- container-scroller -->
<!-- plugins:js -->
<script src="{{ asset('vendors/js/vendor.bundle.base.js') }}"></script>
<script src="{{ asset('vendors/js/vendor.bundle.addons.js') }}"></script>
<!-- endinject -->
<!-- inject:js -->
<script src="{{ asset('js/off-canvas.js') }}"></script>
<script src="{{ asset('js/misc.js') }}"></script>
<!-- endinject -->
<!-- bootbox js -->
<script src="{{ asset('js/bootbox.min.js') }}"></script>
<script src="{{ asset('js/bootbox.locales.min.js') }}"></script>
</body>

</html>
