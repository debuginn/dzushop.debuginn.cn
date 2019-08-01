<?php

namespace App\Http\Controllers\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

/**
 * 前台首页控制页面
 * Class IndexController
 * @package App\Http\Controllers\Home
 */
class IndexController extends Controller
{
    /**
     * 处理数组数据（递归）
     * @param $data
     * @param int $pid
     * @return array
     */
    public function checkTypeData($data, $pid=0){
        $newArr = array();

        foreach($data as $key => $value){
            if($value->pid == $pid){
                $newArr[$value->id] = $value;
                $newArr[$value->id]->zi = $this->checkTypeData($data, $value->id);
            }
        }

        return $newArr;
    }
    /**
     * 前台首页方法
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        // 查询导航栏导航
        $types = DB::table('dzushop_types')->get();
        // 处理导航栏
        $type = $this->checkTypeData($types);
        // 查询广告并排序
        $slider = DB::table('dzushop_slider')
            ->orderBy('sort', 'desc')
            ->get();
        // 处理右侧广告
        foreach($type as $key => $value){
            $value->rightAds = DB::table('dzushop_typesAds')
                ->where([
                    [ "type", '=', 1],
                    [ "tid", '=', $value->id]
                ])
                ->limit(2)
                ->get();
            $value->leftAds = DB::table('dzushop_typesAds')
                ->where([
                    [ "type", '=', 0],
                    [ "tid", '=', $value->id]
                ])
                ->first();
        }
        // 查询明星单品
        $goods = DB::table('dzushop_goods')
            ->orderBy('id', 'desc')
            ->limit(6)->get();
        // 处理楼层的商品
        foreach($type as $key => $value){
            // 创建新的数组
            $newArr = [];
            // 遍历二级分类
            foreach ($value->zi as $two){
                // 遍历三级分类
                foreach ($two->zi as $three){
                    $newArr[] = $three->id;
                }
            }

            $value->goods = DB::table('dzushop_goods')->whereIn("cid", $newArr)->limit(8)->get();
        }
        // 赋值数据
        $data = array(
            'types' => $types,
            'type' => $type,
            'slider' => $slider,
            'goods' => $goods,
        );


        // 返回试图并赋值
        return view("home.index")
            ->with('data', $data);
    }

}