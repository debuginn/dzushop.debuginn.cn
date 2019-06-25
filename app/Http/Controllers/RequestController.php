<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class RequestController extends Controller
{
    public function Index(Request $request){
        echo '<h3>当前地址获取</h3>';
        //输出当前url地址
        echo $request->fullUrl();
        //http://188.131.245.202:8080/request

        //获取url的路径部分
        echo '<hr>';
        echo $request->path();
        //request

        //获取所有参数
        echo '<hr>';
        echo $request->url();
        //http://188.131.245.202:8080/request

        //判断路由是否为request
        echo '<hr>';
        var_dump($request->is('Request'));


        echo '<hr color="red">';
        echo '<h3>当前请求类型</h3>';
        //判断但当前请求类型
        echo $request->method();

        //判断当前的请求是不是get请求
        echo '<hr>';
        var_dump($request->isMethod('POST'));
    }


}