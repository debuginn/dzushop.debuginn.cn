@extends('template.admin')
@section('title', '轮播图管理')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-4 col-sm-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/slider"><text class="text-info">轮播图列表</text></a>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
            </div>
            <div class="col-md-2 col-sm-12 admin-head-user-count">
                <span>共有{{ $count }}个轮播图</span>
            </div>
            <div class="col-md-2 col-sm-12">
                <div class="admin-head-right">
                    <a href="/admin/slider/create">
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
                        <th>标题</th>
                        <th>链接</th>
                        <th>图片</th>
                        <th>排序</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($data as $value)
                        <tr>
                            <td>{{ $value->id }}</td>
                            <td>{{ $value->title }}</td>
                            <td><a href="{{ $value->href }}">{{ $value->href }}</a></td>
                            <td><img src="{{ url($value->img) }}" alt="{{ $value->title }}"></td>
                            <td>
                                <input type="number" name="sort" class="form-control form-control-sm" value="{{ $value->sort }}" onchange="change(this, {{ $value->id }})">
                            </td>
                            <td>
                                <a class="btn btn-sm btn-gradient-success" href="/admin/slider/edit/{{ $value->id }}">
                                    修改
                                </a>
                                <button class="btn btn-sm btn-gradient-danger" href="javascript:;" onclick="del(this, {{ $value->id }})">
                                    删除
                                </button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <script type="text/javascript">
        /**
         *  无刷新删除轮播图
         */
        function del(obj, id){
            //获取id
            var id=id;
            bootbox.confirm({
                size: "small",
                title: "确定要删除么",
                message: "你确定要删除么，此操作不能撤回，慎重！",
                callback: function(result){
                    $.post(
                        //请求地址及参数
                        '/admin/slider/destroy/'+id,
                        //数据 & 方式 & CSRF认证
                        {'id':id, '_method':'delete', '_token':'{{ csrf_token() }}'},
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
            })
        }
        /**
         * 无刷新修改排序值
         */
        function change(obj, id){
            //获取id
            var id = id;
            //获取用户改变的值
            var val = $(obj).val();
            //判断获取值是否为证书并且获取值是否操作
            if(!isNaN(val)){
                $.post(
                    /*请求地址*/
                    '/admin/slider/sort',
                    /*请求数值 方式  及 CSRF认证*/
                    {'id':id, 'val':val, '_method':'post', '_token':'{{ csrf_token() }}'},
                    /*请求回调方法*/
                    function(res){
                        if(res.code > 0 ){
                            bootbox.alert("排序失败，错误信息："+res.msg);
                        }else{
                            bootbox.alert("排序成功");
                            //页面自动刷新
                            setTimeout(function () {
                                window.location.reload();
                            },1000);
                        }
                    },
                    'json'
                );
            }else{
                bootbox.alert("格式有误，请重新输入数值");
                setTimeout(function () {
                    window.location.reload();
                },1000);
            }
        }

    </script>
@endsection