@extends('template.admin')
@section('title', '用户修改信息')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/user"><text class="text-primary">用户管理</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <text class="text-info">信息修改</text>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-right">
                    <a href="/admin/user">
                        <button class="btn btn-gradient-primary btn-sm admin-head-btn">返回上一页</button>
                    </a>
                </div>
            </div>
        </div>
        <div class="row admin-box">
            <div class="col-md-6 admin-pic-create-box1">
                <h4 class="card-title"><strong>修改用户信息操作</strong></h4>
                <p class="card-description">
                    请认真填写并提交
                </p>
                <form class="forms-sample">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="id" value="{{ $data->id }}">
                    <div class="form-group">
                        <label for="exampleInputUserName">用户名：</label>
                        <input type="text" class="form-control" id="exampleInputUserName" name="username" placeholder="请输入用户名称" value="{{ $data->name }}">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassWord">密码：</label>
                        <input type="password" class="form-control" id="exampleInputPassWord" name="password" placeholder="请输入密码"">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputRePassWord">确认密码：</label>
                        <input type="password" class="form-control" id="exampleInputRePassWord" name="repassword" placeholder="请输入密码" onchange="change()" >
                    </div>
                    <div class="form-group">
                        <div class="form-group row">
                            <label class="col-sm-3 col-form-label">用户状态：</label>
                            <div class="col-sm-4">
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="userstatus" id="userstatus1" value="0" @if( $data->status == 0)checked @endif>
                                        启用
                                    </label>
                                </div>
                            </div>
                            <div class="col-sm-5">
                                <div class="form-check">
                                    <label class="form-check-label">
                                        <input type="radio" class="form-check-input" name="userstatus" id="userstatus2" value="1" @if( $data->status == 1)checked @endif>
                                        禁用
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <button type="submit" class="btn btn-gradient-primary mr-2" onclick="save();return false;">提交</button>
                    <input type="reset" class="btn btn-gradient-danger" value="重置">
                </form>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        /**
         * 验证是否没有确认密码
         * @returns {boolean}
         */
        function change(){
            var password = $.trim($('input[name="password"]').val());
            var repassword = $.trim($('input[name="repassword"]').val());
            if(password != repassword){
                bootbox.alert('两次密码输入不一致，请重新输入');
                return false;
            }
        }

        /**
         * 保存数据操作方法
         * @returns {boolean}
         */
        function save(){
            //接受表单数据
            var id = $('input[name="id"]').val();
            var username   = $.trim($('input[name="username"]').val());
            var password   = $.trim($('input[name="password"]').val());
            var repassword = $.trim($('input[name="repassword"]').val());
            var userstatus = $("input[name='userstatus']:checked").val();
            //判断接受值的有无
            if(username == ''){
                bootbox.alert('用户名不能为空,请输入');
                return false;
            }
            if(password == ''){
                bootbox.alert('用户密码不能为空,请输入');
                return false;
            }
            if(repassword == ''){
                bootbox.alert('重复密码不能为空,请输入');
                return false;
            }
            if(password != repassword){
                bootbox.alert('两次密码输入不一致，请重新输入');
                return false;
            }
            if(userstatus == ''){
                bootbox.alert('用户状态异常，请检查网络');
                return false;
            }
            //POST传值
            $.post(
                //请求地址及参数
                '/admin/user/update',
                //请求方法及CSRF认证
                $('form').serialize(),
                //请求回调函数
                function(res){
                    if(res.code > 0){
                        bootbox.alert(res.msg);
                    }else{
                        bootbox.alert(res.msg);
                        setTimeout(function(){
                            window.location.href= "/admin/user";
                        }, 2000);
                    }
                },
                //JSON对接
                'json'
            );
        }
    </script>
@endsection