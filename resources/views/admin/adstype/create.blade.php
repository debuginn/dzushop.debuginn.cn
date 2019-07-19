@extends('template.admin')
@section('title', '添加分类广告')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/adstype"><text class="text-primary">分类广告管理</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <text class="text-info">添加分类广告</text>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-right">
                    <a href="/admin/adstype">
                        <button class="btn btn-gradient-primary btn-sm admin-head-btn">返回上一页</button>
                    </a>
                </div>
            </div>
        </div>
        <div class="row admin-box">
            <div class="col-md-6 admin-pic-create-box1">
                <h4 class="card-title"><strong>添加分类广告操作</strong></h4>
                <p class="card-description">
                    请认真填写并提交
                </p>
                <form class="forms-sample">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label for="InputDescription">商品所属分类：</label>
                        <select name="tid" id="tid" class="form-control">
                            <option value="">请选择所属分类</option>
                            @foreach($data as $value)
                                @if($value->size == 3)
                                    <option value="{{ $value->id }}">{{ $value->html }}</option>
                                @else
                                    <option disabled value="{{ $value->id }}">{{ $value->html }}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputTitle">标题：</label>
                        <input type="text" class="form-control" id="exampleInputTitle" name="title" placeholder="请输入分类广告标题名称">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputSort">链接：</label>
                        <input type="text" class="form-control" id="exampleInputSort" name="href" placeholder="请输入链接">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputSort">广告图展示尺寸：</label>
                        <select name="type" id="type" class="form-control">
                            <option value="0" selected>大图片区域</option>
                            <option value="1">小图片区域</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>上传分类广告图片：</label>
                        <input type="file" name="img[]" id="InputFile" class="file-upload-default">
                        <div class="input-group col-xs-12">
                            <input type="text" class="form-control file-upload-info" disabled placeholder="请上传分类广告图片">
                            <span class="input-group-append">
                                <button class="file-upload-browse btn btn-primary" type="button" >选择分类广告</button>
                                <button class="btn btn-info" type="button" onclick="uploadImg(this)">上传分类广告</button>
                            </span>
                            {{-- 设置上传回调图像URL地址--}}
                            <input type="hidden" name="img" value="">
                        </div>
                    </div>
                    <hr>
                    <button type="submit" class="btn btn-gradient-primary mr-2" onclick="save();return false;">提交</button>
                    <input type="reset" class="btn btn-gradient-danger" value="重置">
                </form>
            </div>
            <div class="col-md-6 admin-pic-create-box2">
                <h3 class="text-primary">上传分类广告展示</h3>
                <hr>
                <img id="pre_img" src="" class="admin-pic-create-img"/>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        /**
         * 上传分类广告操作
         * @param file
         */
        function uploadImg(){
            if($('#InputFile').val() == ''){
                bootbox.alert('请先<strong>选择分类广告图片</strong>在点击上传按钮');
            }else{
                var formData = new FormData();
                formData.append("img", $("#InputFile")[0].files[0]);
                $.ajax({
                    //头部添加CSRF认证
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    //请求地址
                    url: '/admin/shangchuan',
                    //请求方式
                    type: 'post',
                    //封装数据
                    data: formData,
                    //但会数据方式为json
                    dataType: "json",
                    //必须false才会避开jQuery对 formdata 的默认处理
                    processData: false,
                    //必须false才会自动加上正确的Content-Type
                    contentType: false,
                    //回调 成功后
                    success: function (res) {
                        if(res.code > 0){
                            bootbox.alert('分类广告上传失败，错误信息为：'+res.msg);
                        }else{
                            //获取当前域名及其链接方式
                            var domian = 'http://' + window.location.host;
                            //显示分类广告
                            $('#pre_img').attr('src', domian + res.msg);
                            //给img隐藏域赋值，用于提交保存
                            $('input[name="img"]').val(res.msg);
                        }
                    },
                });
            }
        }

        /**
         * 保存分类广告操作
         * @returns {boolean}
         */
        function save() {
            // 接收表单传来的数据
            var tid  = $("#tid option:selected").val();
            var title = $('input[name="title"]').val();
            var href  = $('input[name="href"]').val();
            var type  = $("#type option:selected").val();
            var img   = $('input[name="img"]').val();

            // 判断数据是否为空
            if(tid == ''){
                bootbox.alert('请输入分类广告标题');
                return false;
            }
            if(title == ''){
                bootbox.alert('请输入标题名称');
                return false;
            }
            if(href == ''){
                bootbox.alert('请输入链接地址');
                return false;
            }
            if(type == ''){
                bootbox.alert('请选择广告图片大小状态');
                return false;
            }
            if(img == ''){
                bootbox.alert('请上传分类广告之后再进行提交');
                return false;
            }
            //ajax后台传输数据
            $.post(
                //请求URL地址
                '/admin/adstype/store',
                $('form').serialize(),
                function(res){
                    if(res.code > 0){
                        bootbox.alert("保存出错，错误信息为:"+res.msg);
                    }else{
                        bootbox.alert("保存成功，即将进入分类广告列表页面");
                        setTimeout(function(){
                            window.location.href = "/admin/adstype";
                        }, 2000);
                    }
                },
                'json'
            );
        }
    </script>
@endsection