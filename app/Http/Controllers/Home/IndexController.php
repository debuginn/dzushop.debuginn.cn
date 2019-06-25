<?php

namespace App\Http\Controllers\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


class IndexController extends Controller
{
    public function index(){
        echo "我是前台主页面111";
    }

}