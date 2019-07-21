<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    /*
     * 后台评论管理页面方法
     */
    public function index(Request $request){
        $data = DB::table('dzushop_comment')
            ->select('dzushop_comment.*','dzushop_user.name', 'dzushop_goods.title')
            ->join('dzushop_user','dzushop_comment.uid','=','dzushop_user.id')
            ->join('dzushop_goods','dzushop_goods.id','=','dzushop_comment.gid')
            ->orderBy('status', 'desc')
            ->paginate(10);

        return view('admin.comment.index')
            ->with('data', $data);
    }
    /**
     * 评论修改状态操作
     * @param Request $request
     */
    public function status(Request $request){
        $id = $request->input('id');
        //获取当前id的状态
        $st = DB::table('dzushop_comment')
            ->where('id',$id)
            ->value('status');
        //接收读取状态值之后进行反转
        if($st == 0){
            $st = 1;
        }else{
            $st = 0;
        }
        //数据库操作
        $result = DB::table('dzushop_comment')
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