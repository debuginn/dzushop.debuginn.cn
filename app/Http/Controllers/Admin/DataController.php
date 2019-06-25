<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

//Laravel5.8数据库连贯操作
class DataController extends Controller
{
    public function index(){
        /**
         * table  切换表
         */
        //get  查询所有数据
        $data = DB::table('user')->get();
        //first 读取第一条数据
        $data = DB::table('user')->first();
        //find 读取指定id的数据
        $data = DB::table('user')->find(2);
        /**
         * select  各种查询
         */
        // select  选择打印字段
        $data = DB::table('user')->select("name",'pass')->get();
        /**
         * 使用where条件
         */
        $data = DB::table('user')->where('name','=','admin')->get();
        // >=10
        $data = DB::table('user')->where('id','>',5)->get();
        $data = DB::table('user')->where([['id','>',5],['name','=','admin']])->get();
        /**
         * 排序
         */
        $data = DB::table('user')->orderBy('id','desc')->get();
        /**
         * 截取
         *  offset 截取开始位置
         *  limit  截取几个数
         */
        $data = DB::table('user')->limit(3)->get();
        $data = DB::table('user')->offset(3)->limit(3)->get();
        //统计条数
        $data = DB::table('user')->count();
        //统计最大值及最小值
        $data = DB::table('user')->max('id');
        $data = DB::table('user')->min('id');
        $data = DB::table('user')->avg('id');
        $data = DB::table('user')->sum('id');
        //分组
        $data = DB::table('user')->select(DB::raw("pass,count(*) tot"))->groupBy("pass")->get();

        /**
         * //多表查询
         */

        dd($data);
    }

    /**
     * Laravel密码加密方法
     */
    public function pass(){
        echo md5('123');
        echo "<hr />";

        echo $pass = Crypt::encrypt('123');
        echo "<hr />";

        echo Crypt::decrypt($pass);
    }
}