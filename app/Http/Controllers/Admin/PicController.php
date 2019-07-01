<?php
/**
 * PicController.php
 * 文件描述
 * Created on 2019-4-22 16:57
 * Create by Meng Xianhui from www.debuginn.cn
 */

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class PicController extends Controller
{
    /**
     * 图片加载首页
     * @return view
     */
    public function index(){
        $count = DB::table("pic")->count();
        $data = DB::table("pic")->orderBy("sort","desc")->paginate(10);
        return view("admin.pic.index")->with('data',$data)->with("count",$count);
    }

    /**
     * 添加图片图片
     * @return view
     */
    public function create(){
        return view("admin.pic.create");
    }

    /**
     * 保存添加图片
     * @param Request $request
     */
    public function store(Request $request){
        //接受数据
        $title = $request->input('title');
        $img   = $request->input('img');
        $sort  = $request->input('sort');
        //判断数据参数有无
        if($title == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'标题参数后台没有获取到')));
        }
        if($img == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'图片参数后台没有获取到')));
        }
        //插入数据并获取状态值
        $result = DB::insert("insert into pic values (null, '$title','$img', 0, '$sort')");
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'图片保存操作完成')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'图像插入数据库异常')));
        }
    }

    /**
     * 删除图片操作
     * @param Request $request
     */
    public function destroy(Request $request){
        $id = $request->id;
        $sql = DB::update('update pic set status=1 where id=?',[$id]);
        if($sql){
            exit(json_encode(array('code'=>0, 'msg'=>'删除成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'删除出现异常')));
        }
    }

    /**
     * 批量删除
     * @param Request $request
     */
    public function delALL(Request $request){
        $id = $request->input('str');
        $sql = DB::update("update pic set status=1 where id in($id)");
        if($sql){
            exit(json_encode(array('code'=>0, 'msg'=>'删除成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'删除出现异常')));
        }
    }

    /**
     * 无刷新排序操作
     * @param Request $request
     */
    public function sort(Request $request){
        $id  = $request->input('id');
        $val = $request->input('val');
        $db = DB::update("update pic set sort=$val where id=$id");
        if($db){
            exit(json_encode(array('code'=>0, 'msg'=>'排序修改成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'排序修改异常')));
        }
    }

    /*
     * 图片修改选择方法
     */
    public function edit($id){
        //执行SQL语句
        $data = DB::select("select * from pic where id=$id");
        return view('admin.pic.edit')->with('data',$data[0]);
    }

    /**
     * 图片修改更新方法
     * @param Request $request
     */
    public function update(Request $request){
        //过滤数据
        $id = (int)$request->input("_id");
        $title = $request->input('title');
        $sort = (int)$request->input('sort');
        $img = $request->input('img');
        //判断数据真实性
        if($title == ""){
            exit(json_encode(array("code"=>1, "msg"=>"传递标题出现异常")));
        }
        if($img == ""){
            exit(json_encode(array("code"=>1, "msg"=>"传递图片出现异常")));
        }
        //执行更新操作并返回结果
        $db = DB::update("update pic set title='$title', img='$img', sort='$sort' where id=$id");
        if($db){
            exit(json_encode(array("code"=>0, "msg"=>"更新图片信息成功")));
        }else{
            exit(json_encode(array("code"=>1, "msg"=>"更新图片出现异常")));
        }
    }

}