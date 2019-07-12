@extends('template.admin')
@section('title', '管理员管理')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-4 col-sm-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/admin"><text class="text-info">管理员管理</text></a>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="admin-head-search">
                    <div class="input-group input-group-sm">
                        <input type="text" class="form-control" placeholder="请输入要查询的用户名称" name="searchUserName">
                        <div class="input-group-append">
                            <button class="btn btn-gradient-primary" type="button" onclick="searchUserName()">搜索</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-sm-12 admin-head-user-count">
                <span>共有 {{ $count }} 个用户</span>
            </div>
            <div class="col-md-2 col-sm-12">
                <div class="admin-head-right">
                    <a href="javascript:;" data-toggle="modal" data-target="#addAdmin">
                        <button class="btn btn-sm btn-gradient-primary admin-head-btn">添加</button>
                    </a>
                </div>
            </div>
        </div>
        <div class="row admin-box">
            <table class="table table-hover table-bordered" id="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th>创建时间</th>
                    <th>最后登录时间</th>
                    <th>状态</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                @foreach($data as $value)
                    <tr>
                        <td>{{ $value->id }}</td>
                        <td>{{ $value->name }}</td>
                        <td>{{ date("Y-m-d H:i:s", $value->time) }}</td>
                        <td>{{ date("Y-m-d H:i:s", $value->lasttime) }}</td>
                        <td>
                            @if($value->status == 0)
                                <span class="btn btn-sm btn-rounded btn-gradient-success" onclick="changeStatus(this, {{ $value->id }})">开启</span>
                            @elseif($value->status == 1)
                                <span class="btn btn-sm btn-rounded btn-gradient-danger" onclick="changeStatus(this, {{ $value->id }})">禁用</span>
                            @endif
                        </td>
                        <td>
                            <a class="btn btn-sm btn-gradient-success" href="javascript:;" data-toggle="modal" data-target="#editAdmin" onclick="editAdmin(this, {{ $value->id }})">
                                修改
                            </a>
                            <button class="btn btn-sm btn-gradient-danger" onclick="del(this, {{ $value->id }})">
                                删除
                            </button>
                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            <div class="admin-page">
                {{ $data->links() }}
            </div>
        </div>
    </div>
    {{--添加管理员模态框开始--}}
    <div class="modal fade" id="addAdmin">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">添加管理员</h4>
                    <button type="button" class="close" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form onsubmit="return false;" id="formAddAdmin">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <div class="form-group">
                            <label for="">管理员名称</label>
                            <input type="text" name="name" class="form-control" placeholder="请输入管理员名称" onmousedown="adminCheck();" required>
                        </div>
                        <div class="form-group">
                            <label for="">密码</label>
                            <input type="password" name="pass" class="form-control" placeholder="请输入新的密码" required>
                        </div>
                        <div class="form-group">
                            <label for="">重复密码</label>
                            <input type="password" name="repass" class="form-control" placeholder="请再次输入新的密码" onchange="passCheck();" required>
                        </div>
                        <div class="form-group">
                            <label for="">状态</label>
                            <br>
                            <input type="radio" class="" name="status" id="userstatus1" value="0" checked>
                            启用
                            &nbsp;
                            <input type="radio" class="" name="status" id="userstatus2" value="1">
                            禁用
                        </div>
                        <hr>
                        <div class="form-group">
                            <input type="submit" value="提交" class="btn btn-gradient-success" onclick="addAdmin();">
                            <input type="reset" value="重置" class="btn btn-gradient-danger">
                            <button type="button" class="btn btn-gradient-primary"  onclick="reloadPage()" aria-label="Close" data-dismiss="modal">关闭当前窗口</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {{--添加管理员模态框结束--}}
    {{--修改管理员模态框开始--}}
    <div class="modal fade" id="editAdmin">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">修改管理员</h4>
                    <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" id="editbody">
                    {{--ajax动态填充数据--}}
                </div>
            </div>
        </div>
    </div>
    {{--修改管理员模态框结束--}}

    {{--自定义ajax区域--}}
    <script type="text/javascript">
        /**
         * 检查用户输入用户名是否存在
         * 若存在，提示已经存在
         * 若不存在，无提示
         */
        function adminCheck(){
            var name = $.trim($('input[name="name"]').val());
            //此处进行校验，第二个管理员开始校验
            $.post(
                // 请求地址加参数
                '/admin/admin/checkadmin',
                // 请求参数+CSRF认证
                {'name':name, '_token':'{{ csrf_token() }}'},
                // 请求回调函数
                function(res){
                    if(res.code > 0){
                        bootbox.alert(res.msg);
                        $('input[name="name"]').val("");
                        $('input[name="name"]').focus();
                    }
                },
                // 请求格式
                'json'
            );
        }
        /**
         * 两次密码校验
         */
        function passCheck(){
            var pass = $.trim($('input[name="pass"]').val());
            var repass = $.trim($('input[name="repass"]').val());
            if(pass != repass){
                bootbox.alert("两次密码输入不正确，请重新输入");
                // 清空密码及重复密码内容
                $('input[name="pass"]').val("");
                $('input[name="repass"]').val("");
                // 定位到密码输入栏
                $('input[name="pass"]').focus();
            }
        }
        /**
         * 添加管理员操作
         */
        function addAdmin(){
            // 获取用户注册信息
            var name = $.trim($('input[name="name"]').val());
            var pass = $.trim($('input[name="pass"]').val());
            var repass = $.trim($('input[name="repass"]').val());
            var status = $('input[name="status"]').val();
            adminCheck();
            //判断是否接收到值
            if(name == ""){
                bootbox.alert("管理员名称没有获取到");
                $('input[name="name"]').focus();
                return false;
            }
            if(pass == ""){
                bootbox.alert("管理员密码没有获取到");
                $('input[name="pass"]').focus();
                return false;
            }
            if(repass == ""){
                bootbox.alert("管理员重复密码没有获取到");
                $('input[name="repass"]').focus();
                return false;
            }

            $.post(
                // 请求地址
                '/admin/admin/store',
                // 请求参数及csrf认证
                $('#formAddAdmin').serialize(),
                // 请求回调函数
                function(res){
                    if(res.code > 0){
                        bootbox.alert(res.msg);
                    }
                    if(res.code == 0){
                        bootbox.alert(res.msg);
                        // 清空用户名密码及重复密码内容
                        $('input[name="name"]').val("");
                        $('input[name="pass"]').val("");
                        $('input[name="repass"]').val("");
                    }
                },
                // 传输采用json
                'json'
            );
        }
        /**
         * 修改当前状态
         * @param obj
         * @param id
         */
        function changeStatus(obj, id){
            var id = id;
            bootbox.alert("确定要改变当前管理员的状态么？", function(){
                $.post(
                    //请求地址
                    '/admin/admin/status',
                    //请求数据
                    {'id':id, '_token':'{{ csrf_token() }}'},
                    //回调函数
                    function(res){
                        if(res.code > 0){
                            bootbox.alert("好像出错了，错误信息："+res.msg);
                            setTimeout(function(){
                                window.location.reload();
                            },1000);
                        }else{
                            bootbox.alert('修改成功');
                            setTimeout(function(){
                                //当前页面刷新
                                window.location.reload();
                            },1000);
                        }
                    },
                    //请求数据使用的方法
                    'json'
                );
            })
        }
        /**
         * 删除管理员
         * @param obj
         * @param id
         */
        function del(obj, id){
            //获取id
            var id=id;
            bootbox.confirm({
                title: "提示信息",
                message: "你确定要删除么，此操作不能撤回，慎重！",
                buttons: {
                    cancel: {
                        label: '<i class="fa fa-times"></i> 取消'
                    },
                    confirm: {
                        label: '<i class="fa fa-check"></i> 删除'
                    }
                },
                callback: function(){
                    $.post(
                        //请求地址及参数
                        '/admin/admin/destroy/'+id,
                        //数据 & 方式 & CSRF认证
                        {'id':id, '_method':'delete','_token':'{{ csrf_token() }}'},
                        //回调结果处理函数
                        function(res){
                            //若果大于0，则表示失败
                            if(res.code>0){
                                bootbox.alert("删除失败，错误信息："+res.msg);
                            }else{
                                bootbox.alert("删除成功");
                                setTimeout(function () {
                                    window.location.reload();
                                },1000)
                            }
                        },
                        //通过json进行传值
                        'json'
                    );
                }
            });
        }
        /**
         * 添加成功重载页面
         */
        function reloadPage() {
            window.location.reload();
        }

        /**
         * 修改管理员信息
         * @param obj
         * @param id
         */
        function editAdmin(obj, id){
            var id = id;
            // 发送ajax数据
            $.get(
                "/admin/admin/edit/"+id,
                {},
                function(data){
                    if(data){
                        $('#editbody').html(data);
                    }
                }
            )
        }

        /**
         * 更新管理员信息
         * @returns {boolean}
         */
        function updateAdmin(){
            // 获取用户修改信息
            var uppass = $.trim($('input[name="uppass"]').val());
            var uprepass = $.trim($('input[name="uprepass"]').val());
            var upstatus = $('input[name="upstatus"]').val();
            //判断是否接收到值
            if(uppass == ""){
                bootbox.alert("管理员密码没有获取到");
                $('input[name="uppass"]').focus();
                return false;
            }
            if(uprepass == ""){
                bootbox.alert("管理员重复密码没有获取到");
                $('input[name="uprepass"]').focus();
                return false;
            }

            $.post(
                // 请求地址
                '/admin/admin/update',
                // 请求参数及csrf认证
                $('#formEditAdmin').serialize(),
                // 请求回调函数
                function(res){
                    if(res.code > 0){
                        bootbox.alert(res.msg);
                    }
                    if(res.code == 0){
                        bootbox.alert(res.msg);
                        setTimeout(function(){
                            window.location.href = "/admin/admin";
                        }, 2000);
                    }
                },
                // 传输采用json
                'json'
            );
        }

        /**
         * 搜索信息框
         */
        function searchUserName(){
            // //获取搜索信息
            // var searchInfo = $.trim($('input[name="searchUserName"]').val());
            // $.get(
            //     '/admin/admin?searchInfo='+searchInfo,
            //     {},
            //     function(data){
            //         if(data){
            //             window.location.reload();
            //             $('input[name="searchUserName"]').val(searchInfo);
            //         }
            //     }
            // )
        }
    </script>
    {{--自定义ajax区域结束--}}
@endsection