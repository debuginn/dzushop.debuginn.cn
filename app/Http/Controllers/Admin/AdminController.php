<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Symfony\Component\Console\Helper\Table;
use Illuminate\Support\Facades\Crypt;

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
        $count = DB::table('dzushop_admin')
            ->where('delstatus', '=', '0')
            ->count();
        $data = DB::table('dzushop_admin')
            ->where('delstatus', '=', '0')
            ->orderBy('id','asc')
            ->paginate(10);
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
        $cryptPass = Crypt::encrypt($pass);
        $time = time();

        $result = DB::table('dzushop_admin')->insert([
            'name' => $name,
            'pass' => $cryptPass,
            'time' => $time,
            'lasttime' => $time,
            'count' => 1,
            'status' => $status,
            'delstatus' => 0,
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

    /**
     * 删除单个管理员操作方法
     * @param Request $request
     */
    public function destroy(Request $request){
        $id = $request->input('id');
        $sql = DB::table('dzushop_admin')
            ->where('id',$id)
            ->update(['delstatus'=>1]);
        if($sql){
            exit(json_encode(array('code'=>0, 'msg'=>'删除成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'删除出现异常')));
        }
    }

    /**
     * 修改模态窗方法
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id){
        // 查询数据库
        $data = DB::table('dzushop_admin')->find($id);

        $data->pass = Crypt::decrypt($data->pass);
        // 将数据封装给前台数据
        return view('admin.admin.edit')->with("data",$data);
    }

    /**
     * 更新修改数据
     * @param Request $request
     */
    public function update(Request $request){

        $upid = $request->input('upid');
        $uppass = $request->input('uppass');
        $upstatus = $request->input('upstatus');

        if($upid == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器没有获取用户id信息')));
        }
        if($uppass == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器没有获取到用户密码')));
        }
        if($upstatus == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器没有获取到用户状态')));
        }

        // 处理pass
        $cryptPass = Crypt::encrypt($uppass);

        $data = DB::table('dzushop_admin')
            ->where('id','=',$upid)
            ->update([
                'pass' => $cryptPass,
                'status' => $upstatus
            ]);
        //判断是否修改成功
        if($data){
            exit(json_encode(array('code'=>0, 'msg'=>'编辑管理员信息成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'编辑管理员信息异常')));
        }
    }
}