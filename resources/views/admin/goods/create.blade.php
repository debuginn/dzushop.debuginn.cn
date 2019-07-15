@extends('template.admin')
@section('title', '添加商品')
@section('main')
    <script type="text/javascript" charset="utf-8" src="{{ asset('neditor/neditor.config.js') }}"></script>
    <script type="text/javascript" charset="utf-8" src="{{ asset('neditor/neditor.all.min.js') }}"> </script>
    <script type="text/javascript" charset="utf-8" src="{{ asset('neditor/neditor.service.js') }}"></script>
    <script type="text/javascript" charset="utf-8" src="{{ asset('neditor/i18n/zh-cn/zh-cn.js') }}"></script>
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/goods"><text class="text-primary">商品管理</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <text class="text-info">添加商品</text>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-right">
                    <a href="/admin/goods">
                        <button class="btn btn-gradient-primary btn-sm admin-head-btn">返回上一页</button>
                    </a>
                </div>
            </div>
        </div>
        <div class="row admin-box">
            <div class="col-md-12 admin-pic-create-box2">
                <h4 class="card-title"><strong>添加商品操作</strong></h4>
                <p class="card-description">
                    请认真填写并提交
                </p>
                <form class="forms-sample">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label for="InputTitle">商品名：</label>
                        <input type="text" class="form-control" id="InputTitle" name="title" placeholder="请输入商品名">
                    </div>
                    <div class="form-group">
                        <label for="InputInfo">商品描述：</label>
                        <textarea name="info" id="InputInfo" class="form-control" placeholder="请输入商品描述"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="InputDescription">商品所属分类：</label>
                        <select name="cid" id="" class="form-control">
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
                        <label for="InputPrice">商品价格：</label>
                        <input type="text" class="form-control" id="InputPrice" name="price" placeholder="请输入商品价格">
                    </div>
                    <div class="form-group">
                        <label for="InputNum">商品库存：</label>
                        <input type="number" class="form-control" id="InputNum" name="num" placeholder="请输入商品库存数量">
                    </div>
                    <div class="form-group">
                        <label>上传商品图：</label>
                        <input type="file" name="img[]" id="InputFile" class="file-upload-default">
                        <div class="input-group col-xs-12">
                            <input type="text" class="form-control file-upload-info" disabled placeholder="请上传商品图">
                            <span class="input-group-append">
                                <button class="file-upload-browse btn btn-primary" type="button" >选择商品图</button>
                                <button class="btn btn-info" type="button" onclick="uploadImg(this)">上传商品图</button>
                            </span>
                            {{-- 设置上传回调图像URL地址--}}
                            <input type="hidden" name="img" value="">
                        </div>
                        <br>
                        <img id="pre_img" src="" class="admin-pic-create-img"/>
                    </div>
                    <div class="form-group">
                        <label>商品详细信息：</label>
                        <script id="editor1" type="text/plain" name="text" style="width:100%; height:200px;"></script>
                    </div>
                    <div class="form-group">
                        <label>商品配置信息：</label>
                        <script id="editor2" type="text/plain" name="config" style="width:100%; height:200px;"></script>
                    </div>

                    <hr>
                    <button type="submit" class="btn btn-gradient-primary mr-2" onclick="save();return false;">提交</button>
                    <input type="reset" class="btn btn-gradient-danger" value="重置">
                </form>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        // 实例化编辑器
        var ue1 = UE.getEditor('editor1');
        UE.getEditor('editor1');
        var ue2 = UE.getEditor('editor2');
        UE.getEditor('editor2');

        /**
         * 上传商品图操作
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
        /**
         * 保存商品操作
         * @returns {boolean}
         */
        function save() {
            // 接收表单传来的数据
            var title  = $('input[name="title"]').val();
            var info   = $('input[name="info"]').val();
            var num = $('input[name="num"]').val();
            var price = $('input[name="price"]').val();
            var img = $('input[name="img"]').val();

            // 判断数据是否为空
            if(title == ''){
                bootbox.alert('请输入商品名称');
                return false;
            }
            if(info == ''){
                bootbox.alert('请输入商品简介');
                return false;
            }
            if(isNaN(num)){
                bootbox.alert('输入数值非法，请输入0-10000之内的整数');
                return false;
            }
            if(price == ''){
                bootbox.alert('请输入商品价格');
                return false;
            }
            if(img == ''){
                bootbox.alert('请上传商品图片');
                return false;
            }


            //ajax后台传输数据
            $.post(
                //请求URL地址
                '/admin/goods/store',
                $('form').serialize(),
                function(res){
                    if(res.code > 0){
                        bootbox.alert("保存出错，错误信息为:"+res.msg);
                    }else{
                        bootbox.alert("保存成功，即将进入商品列表页面");
                        setTimeout(function(){
                            window.location.href = "/admin/goods";
                        }, 2000);
                    }
                },
                'json'
            );
        }
    </script>
@endsection