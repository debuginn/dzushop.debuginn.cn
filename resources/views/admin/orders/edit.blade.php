@extends('template.admin')
@section('title', '订单邮寄地址详情')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/orders"><text class="text-info">订单列表</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="#">
                        <text class="text-info">修改订单状态</text>
                    </a>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-right">
                    <a href="/admin/orders">
                        <button class="btn btn-gradient-primary btn-sm admin-head-btn">返回上一页</button>
                    </a>
                </div>
            </div>
        </div>
        <div class="row admin-box">
            <div class="admin-pic-create-box2">
                <h4>修改当前订单状态</h4>
                <hr>
                <form action="" method="post" class="forms-sample">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <div class="form-group">
                        <label for="InputCode">订单编号：</label>
                        <input type="text" class="form-control" id="InputCode" name="name" value="{{ $code }}" disabled>
                    </div>
                    <div class="form-group">
                        <label for="OptionStatus">订单状态</label>
                        <select name="status" id="status" class="form-control">
                            @foreach($data as $value)
                                @if($value->id == $sid)
                                    <option value="{{ $value->id }}" selected>{{ $value->name }}</option>
                                @else
                                    <option value="{{ $value->id }}">{{ $value->name }}</option>
                                @endif
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group">
                        <input type="submit" value="提交" class="btn btn-gradient-success">
                    </div>
                </form>
            </div>
        </div>
    </div>
@endsection