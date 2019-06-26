@extends('template.admin')
@section('title', '管理员管理')
@section('main')
    <div class="admin-content">
        <div class="row admin-head">
            <div class="col-md-4 col-sm-12">
                <div class="admin-head-left">
                    <a href="/admin"><text class="text-primary">首页</text></a>
                    <text class="text-muted">&nbsp;&nbsp;/&nbsp;&nbsp;</text>
                    <a href="/admin/admin"><text class="text-info">管理员管理</text></a>
                </div>
            </div>
            <div class="col-md-4 col-sm-12">
                <div class="admin-head-search">
                    <div class="input-group input-group-sm">
                        <input type="text" class="form-control" placeholder="请输入要查询的ID">
                        <div class="input-group-append">
                            <button class="btn btn-gradient-primary" type="button">搜索</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-sm-12 admin-head-user-count">
                <span>共有{{ 111 }}个用户</span>
            </div>
            <div class="col-md-2 col-sm-12">
                <div class="admin-head-right">
                    <a href="/admin/admin/create">
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
                    <th>姓名</th>
                    <th>状态</th>
                    <th>创建时间</th>
                    <th>更改时间</th>
                </tr>
                </thead>
                <tbody>
{{--                @foreach($data as $value)--}}
{{--                    <tr>--}}
{{--                        --}}{{--按序号输出数值--}}
{{--                        <td>{{ $value->id }}</td>--}}
{{--                        <td>{{ $value->name }}</td>--}}
{{--                        <td>--}}
{{--                            @if($value->status == 0)--}}
{{--                                <span class="btn btn-sm btn-rounded btn-gradient-success" onclick="status(this, {{ $value->id }})">开启</span>--}}
{{--                            @elseif($value->status == 1)--}}
{{--                                <span class="btn btn-sm btn-rounded btn-gradient-danger" onclick="status(this, {{ $value->id }})">禁用</span>--}}
{{--                            @endif--}}
{{--                        </td>--}}
{{--                        <td>{{ $value->time }}</td>--}}
{{--                        <td>{{ $value->settime }}</td>--}}
{{--                        <td>--}}
{{--                            <a class="btn btn-sm btn-gradient-success" href="/admin/user/edit/{{ $value->id }}">--}}
{{--                                修改--}}
{{--                            </a>--}}
{{--                            <button class="btn btn-sm btn-gradient-danger" onclick="del(this, {{ $value->id }})">--}}
{{--                                删除--}}
{{--                            </button>--}}
{{--                        </td>--}}
{{--                    </tr>--}}
{{--                @endforeach--}}
                </tbody>
            </table>
            <div class="admin-page">
{{--                {{ $data->links() }}--}}
            </div>
        </div>
    </div>
@endsection