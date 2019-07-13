<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class SysController extends Controller
{
    /*
     * 后台用户管理页面方法
     */
    public function index(){
        return view('admin.sys.index');
    }

    public function store(Request $request){
        // 获取数据
        $arr = $request->except("_token");
        // 写入到文件中
        $str1 = var_export($arr, true);

        $str = "
<?php
return ".$str1."
?>";

        // 写入到指定字符串
        file_put_contents('../config/web.php', $str);

        return back();
    }

}