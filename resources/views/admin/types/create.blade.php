@extends('template.admin')
@section('title', '添加菜单')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/types"><text class="text-primary">菜单管理</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <text class="text-info">添加菜单</text>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-right">
                    <a href="/admin/types">
                        <button class="btn btn-gradient-primary btn-sm admin-head-btn">返回上一页</button>
                    </a>
                </div>
            </div>
        </div>
        <div class="row admin-box">
            <div class="col-md-6 admin-pic-create-box2">
                <h4 class="card-title"><strong>添加菜单操作</strong></h4>
                <p class="card-description">
                    请认真填写并提交
                </p>
                <form class="forms-sample">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="pid" value="0">
                    <input type="hidden" name="path" value="0">
                    <div class="form-group">
                        <label for="exampleInputTypes">分类名：</label>
                        <input type="text" class="form-control" id="exampleInputTypes" name="" placeholder="请输入分类名称">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputTitle">标题：</label>
                        <input type="text" class="form-control" id="exampleInputTitle" name="" placeholder="请输入标题名称">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputKeyWords">关键字：</label>
                        <input type="text" class="form-control" id="exampleInputKeyWords" name="" placeholder="请输入关键字">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputSort">描述：</label>
                        <input type="text" class="form-control" id="exampleInputSort" name="" placeholder="请输入描述">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputSort">排序：</label>
                        <input type="text" class="form-control" id="exampleInputSort" name="" placeholder="请输入排序">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputSort">是否楼层：</label>
                        <br>
                        <input type="radio" name="is_lou" value="0">是&nbsp;&nbsp;
                        <input type="radio" name="is_lou" value="1" checked>否
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
         * 保存菜单操作
         * @returns {boolean}
         */
        function save() {
            // 接收表单传来的数据
            var title = $('input[name="title"]').val();
            var sort  = $('input[name="sort"]').val();
            var img   = $('input[name="img"]').val();

            // 判断数据是否为空
            if(title == ''){
                bootbox.alert('请输入标题名称');
                return false;
            }
            if(sort == ''){
                bootbox.alert('请输入排序数值');
                return false;
            }
            if(isNaN(sort)){
                bootbox.alert('输入数值非法，请输入0-1000之内的整数');
                return false;
            }
            if(img == ''){
                bootbox.alert('请上传菜单之后再进行提交');
                return false;
            }
            //ajax后台传输数据
            $.post(
                //请求URL地址
                '/admin/pic/store',
                $('form').serialize(),
                function(res){
                    if(res.code > 0){
                        bootbox.alert("保存出错，错误信息为:"+res.msg);
                    }else{
                        bootbox.alert("保存成功，即将进入菜单列表页面");
                        setTimeout(function(){
                            window.location.href = "/admin/pic";
                        }, 2000);
                    }
                },
                'json'
            );
        }
    </script>
@endsection