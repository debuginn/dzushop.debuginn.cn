<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class IndexController extends Controller
{
    public function Index(){

        if(empty($_POST['search'])){
            $data = DB::table('user')->get();
        }else{
            $data = DB::table('user')->get();
            echo "刚刚执行了查询操作哦";
        }

        //dd($data);
        return view('user')->with("data",$data);
    }

    //带参数访问控制器Demo
    public function UserInfo($a, $b){
        var_dump($a);
        var_dump($b);
    }
}