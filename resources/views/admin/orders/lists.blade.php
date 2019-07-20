@extends('template.admin')
@section('title', '订单详情')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-6 col-sm-12 col-xs-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/orders"><text class="text-info">订单列表</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/orders/lists">
                        <text class="text-info">订单详情</text>
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
                <thead>
                <tr>
                    <th>序号</th>
                    <th>商品名</th>
                    <th>商品图片</th>
                    <th>购买单价</th>
                    <th>购买数量</th>
                    <th>小记</th>
                </tr>
                </thead>
                <tbody>
                @php
                    $i = 1;
                    $sum_num = 0;
                    $sum_price = 0;
                @endphp
                @foreach($data as $value)
                    <tr>
                        <td>{{ $i++ }}</td>
                        <td>{{ $value->title }}</td>
                        <td><img src="{{ url($value->img) }}" alt=""></td>
                        <td>{{ $value->price }}</td>
                        <td>{{ $value->num }}</td>
                        <td>{{ $value->price*$value->num }}</td>
                        @php
                            $sum_num += $value->num;
                            $sum_price += $value->price*$value->num;
                        @endphp
                    </tr>
                @endforeach
                </tbody>
            </table>
        </div>
        <div class="row admin-head">
            <div class="admin-head-left">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <strong>购买数量：</strong><span>{{ $sum_num }}</span> &nbsp;&nbsp;
                <strong>购买总价：</strong><span>{{ $sum_price }}</span>
            </div>
        </div>
    </div>
    <script type="text/javascript">

    </script>
@endsection