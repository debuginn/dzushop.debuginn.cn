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

        // 赋值数据
        $data = array(
            'type' => $type,
            'slider' => $slider,
        );
        // 返回试图并赋值
        return view("home.index")
            ->with('data', $data);
    }

}