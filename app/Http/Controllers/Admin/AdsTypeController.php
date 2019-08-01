<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;

/**
 * 分类广告控制器
 * Class IndexController
 * @package App\Http\Controllers\Admin
 */
class AdsTypeController extends Controller
{
    /**
     * 分类广告控制首页
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(Request $request){
        // 计算分类广告个数并分页
        $count = DB::table('dzushop_typesAds')->count();

        // 获取后台数据并分页
        $data = DB::table('dzushop_typesAds')
            ->paginate(10);

        // 返回视图并封装数据
        return view("admin.adstype.index")
            ->with('data',$data)
            ->with('count',$count);
    }


    /**
     * 创建分类广告页面方法
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(){
        // 读取数据
        $data = DB::table('dzushop_types')
            ->select(DB::raw('dzushop_types.*, concat(path,id) p'))
            ->orderBy("p","asc")
            ->get();
        foreach ($data as $key => $value){
            // 将分类进行判断处理，判断该分类为几级分类
            $arr = explode(',', $value->path);
            // 计算分类为几级
            $size = count($arr);
            // 计算分类的级数   按阿拉伯数字输出
            $value -> size = $size-1;
            // 根据所在几级分类进行封装数据
            $value->html = str_repeat('|----', $size-2).$value->name;
        }
        // 返回创建分类广告页面
        return view("admin.adstype.create")
            ->with('data', $data);
    }


    /**
     * 分类广告添加保存操作方法
     * @param Request $request
     */
    public function store(Request $request){
        //接受数据
        $tid   = $request->input('tid');
        $title = $request->input('title');
        $img   = $request->input('img');
        $href  = $request->input('href');
        $type  = $request->input('type');
        //判断数据参数有无
        if($tid == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'tid参数后台没有获取到')));
        }
        if($title == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'标题参数后台没有获取到')));
        }
        if($img == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'图片参数后台没有获取到')));
        }
        if($href == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'链接参数后台没有获取到')));
        }
        if($type == ""){
            exit(json_encode(array('code'=>1, 'msg'=>'广告类型参数后台没有获取到')));
        }
        //插入数据并获取状态值
        $result = DB::table('dzushop_typesAds')
            ->insert([
                'tid' => $tid,
                'img' => $img,
                'type' => $type,
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
     * 删除单个分类广告操作方法
     * @param Request $request
     */
    public function destroy(Request $request){
        $id = $request->input('id');
        $sql = DB::table('dzushop_typesAds')
            ->where('id', '=', $id)
            ->delete();
        if($sql){
            exit(json_encode(array('code'=>0, 'msg'=>'删除成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'删除出现异常')));
        }
    }

    /**
     * 修改分类广告信息
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id){
        // 获取菜单列表数据
        $data1 = DB::table('dzushop_types')
            ->select(DB::raw('dzushop_types.*, concat(path,id) p'))
            ->orderBy("p","asc")
            ->get();
        // 处理获取菜单数据进行格式化输出
        foreach ($data1 as $key => $value){
            // 将分类进行判断处理，判断该分类为几级分类
            $arr = explode(',', $value->path);
            // 计算分类为几级
            $size = count($arr);
            // 计算分类的级数   按阿拉伯数字输出
            $value -> size = $size-1;
            // 根据所在几级分类进行封装数据
            $value->html = str_repeat('|----', $size-2).$value->name;
        }
        // 根据前台数据进行查询对应数据
        $data = DB::table('dzushop_typesAds')
            ->where('id','=',$id)
            ->get();
        return view('admin.adstype.edit')
            ->with('data',$data[0])
            ->with('data1', $data1);
    }

    /**
     * 更新修改数据
     * @param Request $request
     */
    public function update(Request $request)
    {
        //接受数据
        $id = $request->input('id');
        $tid = $request->input('tid');
        $title = $request->input('title');
        $img   = $request->input('img');
        $href  = $request->input('href');
        $type  = $request->input('type');
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
        if ($type == "") {
            exit(json_encode(array('code' => 1, 'msg' => '广告大小参数参数后台没有获取到')));
        }
        // 执行更新操作
        $result = DB::table('dzushop_typesAds')
            ->where('id', '=', $id)
            ->update([
                'tid' => $tid,
                'title' => $title,
                'img' => $img,
                'href' => $href,
                'type' => $type
            ]);
        if ($result) {
            exit(json_encode(array('code' => 0, 'msg' => '分类广告更新操作完成')));
        } else {
            exit(json_encode(array('code' => 1, 'msg' => '分类广告更新数据库异常')));
        }
    }
}