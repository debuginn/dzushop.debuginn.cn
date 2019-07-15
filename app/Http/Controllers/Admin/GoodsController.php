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

    /**
     * 保存商品方法
     * @param Request $request
     */
    public function store(Request $request){
        $cid = $request->input('cid');
        $title = $request->input('title');
        $info = $request->input('info');
        $img = $request->input('img');
        $price = $request->input('price');
        $num = $request->input('num');
        $text = $request->input('text');
        $config = $request->input('config');

        if($cid == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取cid异常')));
        }
        if($title == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取 标题 异常')));
        }
        if($info == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取 描述 异常')));
        }
        if($img == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取 商品图片 异常')));
        }
        if($price == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取 商品价格 异常')));
        }
        if($num == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取 商品库存数量 异常')));
        }
        if($text == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取 商品详情信息 异常')));
        }
        if($config == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取 商品配置信息 异常')));
        }
        // 执行插入操作
        $result = DB::table('dzushop_goods')->insert([
            'cid' => $cid,
            'title'  => $title,
            'info' => $info,
            'img' => $img,
            'price' => $price,
            'num' => $num,
            'text' => $text,
            'config' => $config
        ]);
        // 返回结果值
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'插入商品成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'插入商品异常')));
        }
    }
}