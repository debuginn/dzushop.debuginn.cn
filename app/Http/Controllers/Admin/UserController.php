<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /*
     * 后台用户管理页面方法
     */
    public function index(){
        //计算数据库中的用户条数
        $count = DB::table("user")->count();
        //正序读取数据并执行分页
        $data = DB::table("user")->orderBy("id","asc")->paginate(10);
        //加载页面
        return view('admin.user.index')->with('data',$data)->with('count',$count);
    }
    /*
     * 后台用户管理添加页面
     */
    public function create(){
        //显示后台用户添加界面
        return view('admin.user.create');
    }
    /**
     * 保存用户数据
     * @param Request $request
     */
    public function store(Request $request){
        //接受从前台发回来的数据
        $username = $request->input('username');
        $password = $request->input('password');
        $userstatus = $request->input('userstatus');
        //判断前台是否传值
        if($username==''){
            exit(json_encode(array('code'=>1, 'msg'=>'获得Username值异常')));
        }
        if($password==''){
            exit(json_encode(array('code'=>1, 'msg'=>'获得Password值异常')));
        }
        if($userstatus==''){
            exit(json_encode(array('code'=>1, 'msg'=>'获得userstatus值异常')));
        }
        //获取当前时间
        $time = date("Y-m-d H:i:s");
        //对密码进行MD5加密
        $passwordMD5 = md5($password);
        //插入数据库数据
        $db = "insert into user values (null, '$username', '$passwordMD5', '$userstatus', '$time', '$time')";
        $result = DB::insert($db);
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'保存成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'数据保存失败')));
        }
    }

    /*
     * 后台用户管理编辑界面
     */
    public function edit(Request $request){
        $id = $request->id;
        $data = DB::table('user')->where('id', $id)->get();
        return view('admin.user.edit')->with('data',$data[0]);
    }

    /*
     * 修改操作
     */
    public function update(Request $request){
        //接受前台传来的数据
        $id   = $request->input('id');
        $username = $request->input('username');
        $password = $request->input('password');
        $userStatus=$request->input('userstatus');
        //判断前台是否传值
        if($id == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'好像没有获取到用户ID')));
        }
        if($username==''){
            exit(json_encode(array('code'=>1, 'msg'=>'获得Username值异常')));
        }
        if($password==''){
            exit(json_encode(array('code'=>1, 'msg'=>'获得Password值异常')));
        }
        if($userStatus==''){
            exit(json_encode(array('code'=>1, 'msg'=>'获得userstatus值异常')));
        }
        //获取当前时间
        $time = date("Y-m-d H:i:s");
        //对密码进行MD5加密
        $passwordMD5 = md5($password);
        //更新用户数据构造器
        $result = DB::table('user')
            ->where('id', $id)
            ->update(
                [
                    'name'=>$username,
                    'pass'=>$passwordMD5,
                    'status'=>$userStatus,
                    'settime'=>$time
                ]
            );
        //判断结果
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'更新用户数据成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'更新用户数据异常')));
        }

    }

    /**
     * 用户修改状态操作
     * @param Request $request
     */
    public function status(Request $request){
        $id = $request->input('id');
        //获取当前id的状态
        $st = DB::table('user')->where('id',$id)->value('status');
        //接收读取状态值之后进行反转
        if($st == 0){
            $st = 1;
        }else{
            $st = 0;
        }
        //数据库操作
        $result = DB::table('user')->where('id',$id)->update(['status'=>$st]);
        //操作数据库返回值判断
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'成功更新状态')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'更新状态异常')));
        }
    }
    /*
     * 删除操作
     */
    public function destory(){

    }

}