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
    public function index(Request $request){
        $search = $request->input('search');

        if($search){
            //计算数据库中的用户条数
            $count = DB::table("dzushop_user")
                ->where('tel', '=', $search)
                ->count();
            //正序读取数据并执行分页
            $data = DB::table("dzushop_user")
                ->orderBy("id","asc")
                ->where('tel', '=', $search)
                ->paginate(10);
        }else{
            //计算数据库中的用户条数
            $count = DB::table("dzushop_user")
                ->count();
            //正序读取数据并执行分页
            $data = DB::table("dzushop_user")
                ->orderBy("id","asc")
                ->paginate(10);
        }
        //加载页面
        return view('admin.user.index')
            ->with('data',$data)
            ->with('count',$count);
    }
    /**
     * 用户修改状态操作
     * @param Request $request
     */
    public function status(Request $request){
        $id = $request->input('id');
        //获取当前id的状态
        $st = DB::table('dzushop_user')
            ->where('id',$id)
            ->value('status');
        //接收读取状态值之后进行反转
        if($st == 0){
            $st = 1;
        }else{
            $st = 0;
        }
        //数据库操作
        $result = DB::table('dzushop_user')
            ->where('id',$id)
            ->update(['status'=>$st]);
        //操作数据库返回值判断
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'成功更新状态')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'更新状态异常')));
        }
    }

}