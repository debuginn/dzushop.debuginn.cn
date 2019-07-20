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
                    <a href="/admin/orders/orderslist">
                        <text class="text-info">订单邮寄地址详情</text>
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
            <table class="table table-hover table-bordered" id="table">
                <tr><td>收货人姓名：</td><td>{{ $data->sname }}</td></tr>
                <tr><td>收货人电话：</td><td>{{ $data->stel }}</td></tr>
                <tr><td>收货人地址：</td><td>{{ $data->addr }}</td></tr>
                <tr><td>收货人详细地址：</td><td>{{ $data->addrInfo }}</td></tr>
                <tr><td>收货人邮箱：</td><td>{{ $data->email }}</td></tr>
            </table>
        </div>
    </div>
@endsection