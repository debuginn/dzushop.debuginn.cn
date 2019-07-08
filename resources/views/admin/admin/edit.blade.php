<form onsubmit="return false;" id="formEditAdmin">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <input type="hidden" name="upid" value="{{ $data->id }}">
    <div class="form-group">
        <label for="">管理员名称</label>
        <input type="text" name="upname" value="{{ $data->name }}" class="form-control" readonly>
    </div>
    <div class="form-group">
        <label for="">密码</label>
        <input type="password" name="uppass" class="form-control" value="{{ $data->pass }}" required>
    </div>
    <div class="form-group">
        <label for="">重复密码</label>
        <input type="password" name="uprepass" class="form-control" value="{{ $data->pass }}" onchange="passCheck();" required>
    </div>
    <div class="form-group">
        <label for="">状态</label>
        <br>
        @if($data->status)
            <input type="radio" class="" name="upstatus" id="userstatus1" value="0">
            启用
            &nbsp;
            <input type="radio" class="" name="upstatus" id="userstatus2" value="1" checked>
            禁用
        @else
            <input type="radio" class="" name="upstatus" id="userstatus1" value="0" checked>
            启用
            &nbsp;
            <input type="radio" class="" name="upstatus" id="userstatus2" value="1">
            禁用
        @endif

    </div>
    <hr>
    <div class="form-group">
        <input type="submit" value="提交" class="btn btn-gradient-success" onclick="updateAdmin();">
        <input type="reset" value="重置" class="btn btn-gradient-danger">
        <button type="button" class="btn btn-gradient-primary"  onclick="reloadPage()" aria-label="Close" data-dismiss="modal">关闭当前窗口</button>
    </div>
</form>
