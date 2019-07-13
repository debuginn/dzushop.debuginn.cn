@extends('template.admin')
@section('title', '系统设置')
@section('main')
<div class="admin-content">
    <div class="row admin-head">
        <div class="col-md-12 col-sm-12">
            <div class="admin-head-left">
                <a href="/admin"><text class="text-primary">首页</text></a>
                <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                <a href="/admin/sys"><text class="text-info">系统管理</text></a>
            </div>
        </div>
    </div>
    <div class="row admin-box">
        <div class="col-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">系统基本设置</h4>
                    <form class="forms-sample" action="/admin/sys/store" method="post">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                        <div class="form-group">
                            <label for="InputTitle">标题：</label>
                            <input type="text" class="form-control" id="InputTitle" name="title" value="{{ config('web.title') }}">
                        </div>
                        <div class="form-group">
                            <label for="InputKeyWords">关键字：</label>
                            <input type="text" class="form-control" id="InputKeyWords" name="keyword" value="{{ config('web.keywords') }}">
                        </div>
                        <div class="form-group">
                            <label for="InputDes">描述：</label>
                            <input type="text" class="form-control" id="InputDes" name="description" value="{{ config('web.description') }}">
                        </div>
                        <div class="form-group">
                            <label>上传Logo图：</label>
                            <input type="file" name="img[]" id="InputFile" class="file-upload-default">
                            <div class="input-group col-xs-12">
                                <input type="text" class="form-control file-upload-info" disabled placeholder="上传Logo图">
                                <span class="input-group-append">
                                <button class="file-upload-browse btn btn-primary" type="button" >选择Logo图</button>
                                <button class="btn btn-info" type="button" onclick="uploadImg(this)">上传Logo图</button>
                            </span>
                                {{-- 设置上传回调图像URL地址--}}
                                <input type="hidden" name="img" value="">
                            </div>
                            <img id="pre_img" src="{{ url(config('web.logo')) }}" class="admin-pic-create-img"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleTextarea1">百度统计：</label>
                            <textarea class="form-control" id="exampleTextarea1" rows="4" name="baidu">{{ config('web.baidu') }}</textarea>
                        </div>
                        <button type="submit" class="btn btn-gradient-primary mr-2">提交</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    /**
     * 上传轮播图操作
     * @param file
     */
    function uploadImg(){
        if($('#InputFile').val() == ''){
            bootbox.alert('请先<strong>选择轮播图</strong>在点击上传按钮');
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
                        bootbox.alert('轮播图上传失败，错误信息为：'+res.msg);
                    }else{
                        //获取当前域名及其链接方式
                        var domian = 'http://' + window.location.host;
                        //显示轮播图
                        $('#pre_img').attr('src', domian + res.msg);
                        //给img隐藏域赋值，用于提交保存
                        $('input[name="img"]').val(res.msg);
                    }
                },
            });
        }
    }
</script>
@endsection