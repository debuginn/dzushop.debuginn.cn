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
                    <a href="javascript:;" data-toggle="modal" data-target="#addAdmin">
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
    {{--添加管理员模态框开始--}}
    <div class="modal fade" id="addAdmin">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">添加管理员</h4>
                    <button type="button" class="close" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                </div>
                <div class="modal-body">
                    <form onsubmit="return false;" id="formAddAdmin">
                        <div class="form-group">
                            <label for="">管理员名称</label>
                            <input type="text" name="name" class="form-control" placeholder="请输入管理员名称" onchange="adminCheck();">
                        </div>
                        <div class="form-group">
                            <label for="">密码</label>
                            <input type="password" name="pass" class="form-control" placeholder="请输入新的密码">
                        </div>
                        <div class="form-group">
                            <label for="">重复密码</label>
                            <input type="password" name="repass" class="form-control" placeholder="请再次输入新的密码" onchange="passCheck();">
                        </div>
                        <div class="form-group">
                            <label for="">状态</label>
                            <br>
                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="userstatus" id="userstatus1" value="0" checked>
                                    启用
                                </label>
                            </div>

                            <div class="form-check">
                                <label class="form-check-label">
                                    <input type="radio" class="form-check-input" name="userstatus" id="userstatus2" value="1">
                                    禁用
                                </label>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <input type="submit" value="提交" class="btn btn-gradient-success" onclick="addAdmin();">
                            <input type="reset" value="重置" class="btn btn-gradient-danger">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    {{--添加管理员模态框结束--}}
    <script type="text/javascript">
        /**
         * 添加管理员操作
         */
        function addAdmin(){
            str = $("#formAddAdmin").serialize();
            bootbox.alert(str);
        }
    </script>
@endsection