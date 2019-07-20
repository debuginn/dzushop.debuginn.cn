@extends('template.admin')
@section('title', '订单管理')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-4 col-sm-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/orders"><text class="text-info">订单列表</text></a>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
            </div>
            <div class="col-md-2 col-sm-12 admin-head-user-count">
                <span>共有{{ 111 }}个订单</span>
            </div>
            <div class="col-md-2 col-sm-12">
            </div>
        </div>
        <div class="row admin-box">
            <table class="table table-hover table-bordered" id="table">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>订单号</th>
                    <th>用户</th>
                    <th>收货人信息</th>
                    <th>下单时间</th>
                    <th>状态</th>
                    <th>修改状态</th>
                </tr>
                </thead>
                <tbody>
                <input type="hidden" value="{{ $i=1 }}">
                    @foreach($data as $value)
                        <tr>
                            <td>{{ $i++ }}</td>
                            <td>
                                {{ $value->code }}&nbsp;
                                【<a href="/admin/orders/lists?code={{ $value->code }}">查看详情</a>】
                            </td>
                            <td>{{ $value->sname }}</td>
                            <td>收货人
                                <a href="/admin/orders/addrlist?aid={{ $value->aid }}">详情信息</a>
                            </td>
                            <td>
                                {{ date("Y-m-d H:i:s", $value->time) }}
                            </td>
                            <td>
                                @if( $value->money == 0)
                                    <span class="text-success">已支付</span>
                                @else
                                    <span class="text-warning">未支付</span>
                                @endif
                            </td>
                            <td>
                                @if($value->sid > 5)
                                    <a href="javascript:;" class="btn btn-sm btn-gradient-light">更改状态</a>
                                @else
                                    <a href="/admin/orders/changestatus?code={{ $value->code }}&sid={{ $value->sid }}" class="btn btn-sm btn-gradient-primary">更改状态</a>
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
@endsection