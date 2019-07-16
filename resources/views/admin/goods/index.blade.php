@extends('template.admin')
@section('title', '商品管理')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-4 col-sm-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/goods"><text class="text-info">商品列表</text></a>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
            </div>
            <div class="col-md-2 col-sm-12 admin-head-user-count">
                <span>共有{{ $count }}个商品</span>
            </div>
            <div class="col-md-2 col-sm-12">
                <div class="admin-head-right">
                    <a href="/admin/goods/create">
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
                    <th>分类</th>
                    <th>标题</th>
                    <th>图片</th>
                    <th>价格</th>
                    <th>库存</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                    @foreach($data as $value)
                        <tr>
                            <td>{{ $value->id }}</td>
                            <td>{{ $value->name }}</td>
                            <td>{{ $value->title }}</td>
                            <td>
                                <img src="{{ url($value->img) }}" alt="$value->title">
                            </td>
                            <td>{{ $value->price }}</td>
                            <td>{{ $value->num }}</td>
                            <td>
                                <a class="btn btn-sm btn-gradient-success" href="/admin/goods/edit/{{ $value->id }}">
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
            <div class="admin-page">
                {{ $data->links() }}
            </div>
        </div>
    </div>
    <script type="text/javascript">
        /**
         *  无刷新删除商品
         */
        function del(obj, id){
            //获取id
            var id=id;
            bootbox.confirm({
                size: "small",
                title: "确定要删除该商品么",
                message: "你确定要删除该商品么，此操作不能撤回，慎重！",
                callback: function(result){
                    $.post(
                        //请求地址及参数
                        '/admin/goods/destroy/'+id,
                        //数据 & 方式 & CSRF认证
                        {'id':id, '_method':'delete', '_token':'{{ csrf_token() }}'},
                        //回调结果处理函数
                        function(res){
                            //若果大于0，则表示失败
                            if(res.code>0){
                                bootbox.alert("删除商品失败，错误信息："+res.msg);
                            }else{
                                bootbox.alert("删除商品成功");
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

    </script>
@endsection