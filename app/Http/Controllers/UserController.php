<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    /*
     * 添加用户
     */
    public function add(Request $request){


        if($request->isMethod('GET')){
            //加载添加页面
            return view('add');
        }else{
            //数据库的入库操作
            echo "插入数据库";

            //获取所有的数据
            dd($request->all());

            //获取特定的字段
            echo $request->input('name');

            //设置默认值
            echo $request->input('nihao', '不错哦');

            //判断是否存在
            vardump($request->has('name'));

            //打印指定的值
            dd($request->only('username', 'password'));

            //打印除了之外的值
            dd($request->except('username'));
        }

    }

    //文件上传方法
    public function photo(){
        return view("photo");
    }

    //处理文件上传方法
    public function upload(Request $request){

        //获取上传文件
        //var_dump($request->hasFile('img'));
        if($request->hasFile('img')){
            //获取后缀名
            $ext = $request->file('img')->getClientOriginalExtension();
            //根据时间戳创建一个新的文件名
            $newFile = time().rand().".".$ext;

            //上传文件移动至指定目录
            $request->file('img')->move('./Uploads',$newFile);
        }else{
            back();
        }
    }

}