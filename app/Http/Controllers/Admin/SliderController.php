<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Symfony\Component\Console\Helper\Table;

/**
 * 轮播图管理控制器
 * Class IndexController
 * @package App\Http\Controllers\Admin
 */
class SliderController extends Controller
{
    /**
     * 轮播图控制首页
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        // 获取次数
        $count = DB::table('dzushop_slider')->count();
        // 获取数据
        $data = DB::table('dzushop_slider')
            ->orderBy('sort', 'desc')
            ->get();
        // 返回试图并返回数据
        return view("admin.slider.index")
            ->with('count', $count)
            ->with('data', $data);
    }

    /**
     * 添加轮播图栏目视图方法
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(){
        return view('admin.slider.create');
    }

    /**
     * 保存新建轮播图操作
     * @param Request $request
     */
    public function store(Request $request){
        //接受数据
        $title = $request->input('title');
        $img   = $request->input('img');
        $href  = $request->input('href');
        $sort  = $request->input('sort');
        //判断数据参数有无
        if($title == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'标题参数后台没有获取到')));
        }
        if($img == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'图片参数后台没有获取到')));
        }
        if($href == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'链接参数后台没有获取到')));
        }
        if($sort == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'排序参数后台没有获取到')));
        }
        //插入数据并获取状态值
        $result = DB::insert("insert into dzushop_slider values (null, '$img', '$sort', '$title', '$href')");
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'轮播图保存操作完成')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'轮播图插入数据库异常')));
        }
    }

    /**
     * 删除轮播图
     * @param Request $request
     */
    public function destroy(Request $request){
        $id = $request->id;
        $result = DB::table('dzushop_slider')
            ->where('id', '=', $id)
            ->delete();
        if($result){
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
        $db = DB::table('dzushop_slider')
            ->where('id', '=', $id)
            ->update([
                'sort'=>$val
            ]);
        if($db){
            exit(json_encode(array('code'=>0, 'msg'=>'排序修改成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'排序修改异常')));
        }
    }

    /**
     * 修改轮播图内容操作
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id){
        //执行SQL语句
        $data = DB::select("select * from dzushop_slider where id=$id");
        return view('admin.slider.edit')->with('data',$data[0]);
    }

    /**
     * 更新轮播图操作
     * @param Request $request
     */
    public function update(Request $request){
        //接受数据
        $id = $request->input('id');
        $title = $request->input('title');
        $img   = $request->input('img');
        $href  = $request->input('href');
        $sort  = $request->input('sort');
        //判断数据参数有无
        if($title == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'标题参数后台没有获取到')));
        }
        if($img == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'图片参数后台没有获取到')));
        }
        if($href == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'链接参数后台没有获取到')));
        }
        if($sort == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'排序参数后台没有获取到')));
        }
        // 执行更新操作
        $result = DB::table('dzushop_slider')
            ->where('id', '=', $id)
            ->update([
                'title' => $title,
                'img' => $img,
                'href' => $href,
                'sort' => $sort
            ]);
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'轮播图更新操作完成')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'轮播图更新数据库异常')));
        }
    }

}