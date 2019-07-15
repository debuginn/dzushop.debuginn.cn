<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class GoodsController extends Controller
{
    /*
     * 后台商品管理页面方法
     */
    public function index(Request $request){
        // 加载页面
        return view('admin.goods.index');
    }

    /**
     * 创建商品页面方法
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(){
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
        // 创建商品页面 及向前台封装数据
        return view('admin.goods.create')->with('data', $data);
    }
}