@extends('template.admin')
@section('title', '添加商品')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/types"><text class="text-primary">商品管理</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <text class="text-info">修改商品</text>
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
                <h4 class="card-title"><strong>修改商品操作</strong></h4>
                <p class="card-description">
                    请认真填写并提交
                </p>
                <form class="forms-sample">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="pid" value="{{ $data->pid }}">
                    <input type="hidden" name="path" value="{{ $data->path }}">
                    <input type="hidden" name="id" value="{{ $data->id }}">
                    <div class="form-group">
                        <label for="InputName">分类名：</label>
                        <input type="text" class="form-control" id="InputName" name="name" value="{{ $data->name }}">
                    </div>
                    <div class="form-group">
                        <label for="InputTitle">标题：</label>
                        <input type="text" class="form-control" id="InputTitle" name="title" value="{{ $data->title }}">
                    </div>
                    <div class="form-group">
                        <label for="InputKeyWords">关键字：</label>
                        <input type="text" class="form-control" id="InputKeyWords" name="keywords" value="{{ $data->keywords }}">
                    </div>
                    <div class="form-group">
                        <label for="InputDescription">描述：</label>
                        <input type="text" class="form-control" id="InputDescription" name="description" value="{{ $data->description }}">
                    </div>
                    <div class="form-group">
                        <label for="InputSort">排序：</label>
                        <input type="text" class="form-control" id="InputSort" name="sort" value="{{ $data->sort }}">
                    </div>
                    <div class="form-group">
                        <label for="RadioIsLou">是否楼层：</label>
                        <br>
                        @if($data->is_lou == 0)
                            <input type="radio" name="is_lou" value="0" id="RadioIsLou" checked>是&nbsp;&nbsp;
                            <input type="radio" name="is_lou" value="1">否
                        @else
                            <input type="radio" name="is_lou" value="0" id="RadioIsLou">是&nbsp;&nbsp;
                            <input type="radio" name="is_lou" value="1" checked>否
                        @endif
                    </div>
                    <hr>
                    <button type="submit" class="btn btn-gradient-primary mr-2" onclick="update();return false;">提交</button>
                    <input type="reset" class="btn btn-gradient-danger" value="重置">
                </form>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        /**
         * 保存修改商品操作
         * @returns {boolean}
         */
        function update() {
            // 接收表单传来的数据
            var name = $('input[name="name"]').val();
            var title  = $('input[name="title"]').val();
            var keywords   = $('input[name="keywords"]').val();
            var description = $('input[name="description"]').val();
            var sort = $('input[name="sort"]').val();

            // 判断数据是否为空
            if(name == ''){
                bootbox.alert('请输入分类名称');
                return false;
            }
            if(title == ''){
                bootbox.alert('请输入分类标题');
                return false;
            }
            if(keywords == ''){
                bootbox.alert('请输入分类关键字');
                return false;
            }
            if(description == ''){
                bootbox.alert('请输入分类描述');
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
            //ajax后台传输数据
            $.post(
                //请求URL地址
                '/admin/types/update',
                $('form').serialize(),
                function(res){
                    if(res.code > 0){
                        bootbox.alert("保存出错，错误信息为:"+res.msg);
                    }else{
                        bootbox.alert("保存成功，即将进入商品列表页面");
                        setTimeout(function(){
                            window.location.href = "/admin/types";
                        }, 2000);
                    }
                },
                'json'
            );
        }
    </script>
@endsection