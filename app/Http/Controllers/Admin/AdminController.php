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
        $count = DB::table('dzushop_admin')->count();
        $data = DB::table('dzushop_admin')->orderBy('id','asc')->paginate(10);
        return view("admin.admin.index")->with('data',$data)->with('count',$count);
    }

    /**
     * 管理员添加校验管理员是否存在
     * @param Request $request
     */
    public function checkadmin(Request $request){
        // 接收来自前台的数据
        $name = $request->input('name');
        // 进行处理
        $id = DB::table('dzushop_admin')->where('name', $name)->value('id');
        if($id){
            exit(json_encode(array('code'=>1, 'msg'=>'已经有该用户了')));
        }else{
            exit(json_encode(array('code'=>0, 'msg'=>'没有问题，数据库中没有该用户')));
        }
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

    /**
     * 用户修改状态操作
     * @param Request $request
     */
    public function status(Request $request){
        $id = $request->input('id');
        //获取当前id的状态
        $st = DB::table('dzushop_admin')->where('id',$id)->value('status');
        //接收读取状态值之后进行反转
        if($st == 0){
            $st = 1;
        }else{
            $st = 0;
        }
        //数据库操作
        $result = DB::table('dzushop_admin')->where('id',$id)->update(['status'=>$st]);
        //操作数据库返回值判断
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'成功更新状态')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'更新状态异常')));
        }
    }
}