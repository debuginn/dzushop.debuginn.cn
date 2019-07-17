<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;

/**
 * 广告控制器
 * Class IndexController
 * @package App\Http\Controllers\Admin
 */
class AdsController extends Controller
{
    /**
     * 广告控制首页
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request){
        // 计算广告个数并分页
        $count = DB::table('dzushop_ADS')->count();

        // 获取后台数据并分页
        $data = DB::table('dzushop_ADS')
            ->orderBy('sort', 'desc')
            ->paginate(10);

        // 返回视图并封装数据
        return view("admin.ads.index")
            ->with('data',$data)
            ->with('count',$count);
    }

    /**
     * 创建广告页面方法
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(){
        // 返回创建广告页面
        return view("admin.ads.create");
    }


    /**
     * 广告添加保存操作方法
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
        $result = DB::table('dzushop_ADS')
            ->insert([
                'img' => $img,
                'sort' => $sort,
                'title' => $title,
                'href' => $href
            ]);
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'轮播图保存操作完成')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'轮播图插入数据库异常')));
        }
    }


    /**
     * 删除单个广告操作方法
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
     * 修改广告信息
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id){
        $data = DB::table('dzushop_ADS')
            ->where('id','=',$id)
            ->get();
        return view('admin.ads.edit')
            ->with('data',$data[0]);
    }

    /**
     * 更新修改数据
     * @param Request $request
     */
    public function update(Request $request)
    {
        //接受数据
        $id = $request->input('id');
        $title = $request->input('title');
        $img = $request->input('img');
        $href = $request->input('href');
        $sort = $request->input('sort');
        //判断数据参数有无
        if ($title == "") {
            exit(json_encode(array('code' => 1, 'msg' => '标题参数后台没有获取到')));
        }
        if ($img == "") {
            exit(json_encode(array('code' => 1, 'msg' => '图片参数后台没有获取到')));
        }
        if ($href == "") {
            exit(json_encode(array('code' => 1, 'msg' => '链接参数后台没有获取到')));
        }
        if ($sort == "") {
            exit(json_encode(array('code' => 1, 'msg' => '排序参数后台没有获取到')));
        }
        // 执行更新操作
        $result = DB::table('dzushop_ADS')
            ->where('id', '=', $id)
            ->update([
                'title' => $title,
                'img' => $img,
                'href' => $href,
                'sort' => $sort
            ]);
        if ($result) {
            exit(json_encode(array('code' => 0, 'msg' => '广告更新操作完成')));
        } else {
            exit(json_encode(array('code' => 1, 'msg' => '广告更新数据库异常')));
        }
    }
}