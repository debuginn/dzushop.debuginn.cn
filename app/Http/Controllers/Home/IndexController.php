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
     * 前台首页方法
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        // 查询轮播图广告

        // 查询广告并排序
        $slider = DB::table('dzushop_slider')
            ->orderBy('sort', 'desc')
            ->get();

        return view("home.index")->with('slider', $slider);
    }

}