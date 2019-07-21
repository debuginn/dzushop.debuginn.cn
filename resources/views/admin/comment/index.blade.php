@extends('template.admin')
@section('title', '评论管理')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-4 col-sm-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/user"><text class="text-info">评论列表</text></a>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <form action="/admin/user">
                    <div class="admin-head-search">
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control" placeholder="请输入要查询的手机号码" name="search" />
                            <div class="input-group-append">
                                <button class="btn btn-gradient-primary" type="submit">搜索</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-2 col-sm-12 admin-head-user-count">
                <span>共有{{ 111 }}个评论</span>
            </div>
            <div class="col-md-2 col-sm-12">
            </div>
        </div>
        <div class="row admin-box">
            <table class="table table-hover table-bordered" id="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>用户</th>
                    <th>商品名</th>
                    <th>评论</th>
                    <th>星级</th>
                    <th>评论图片</th>
                    <th>评论时间</th>
                    <th>评论状态</th>
                </tr>
                </thead>
                <tbody>
                    @foreach($data as $value)
                        <tr>
                            <td>{{ $value->id }}</td>
                            <td>{{ $value->name }}</td>
                            <td>{{ $value->title }}</td>
                            <td>{{ $value->text }}</td>
                            <td>
                                {{ str_repeat('★', $value->star) }}{{ str_repeat('☆', 5-$value->star) }}
                            </td>
                            <td><img src="{{ url($value->img) }}" alt=""></td>
                            <td>
                                {{ date('Y-m-d H:i:s', $value->time) }}
                            </td>
                            <td>
                                @if($value->status == 0)
                                    <span class="btn btn-sm btn-rounded btn-gradient-success" onclick="changeStatus(this, {{ $value->id }})">已通过</span>
                                @else
                                    <span class="btn btn-sm btn-rounded btn-gradient-danger" onclick="changeStatus(this, {{ $value->id }})">不通过</span>
                                @endif
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            <div class="admin-page">

            </div>
        </div>
    </div>
    <script type="text/javascript">
        /**
         * 修改当前状态值
         * @param obj
         * @param id
         */
        function changeStatus(obj, id){
            var id = id;
            bootbox.alert("确定要改变当前评论的状态么？", function(){
                $.post(
                    //请求地址
                    '/admin/comment/status',
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
    </script>
@endsection