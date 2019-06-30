<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Symfony\Component\Console\Helper\Table;

/**
 * 管理员控制器
 * Class IndexController
 * @package App\Http\Controllers\Admin
 */
class AdminController extends Controller
{
    /**
     * 管理员控制首页
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        $data = DB::table('dzushop_admin')->orderBy('id','asc')->paginate(10);
        return view("admin.admin.index")->with('data',$data);
    }

    /**
     * 管理员添加校验管理员是否存在
     * @param Request $request
     */
    public function checkadmin(Request $request){

    }
    /**
     * 管理员添加保存操作方法
     * @param Request $request
     */
    public function store(Request $request){
        // 接收前台传来的数值
        $name = $request->input('name');
        $pass = $request->input('pass');
        $status = $request->input('status');
        //判断传来的值是否合法
        if($name == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'传入name参数异常，请联系管理员')));
        }
        if($pass == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'传入pass参数异常，请联系管理员')));
        }
        if($status == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'传入status参数异常，请联系管理员')));
        }
        //完善数据库字段
        $md5Pass = md5($pass);
        $time = time();

        $result = DB::table('dzushop_admin')->insert([
            'name' => $name,
            'pass' => $md5Pass,
            'time' => $time,
            'lasttime' => $time,
            'count' => 1,
            'status' => $status
        ]);

        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>"新增管理员成功")));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>"新增数据出现异常")));
        }
    }
}