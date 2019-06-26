<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

/**
 * 管理员控制器
 * Class IndexController
 * @package App\Http\Controllers\Admin
 */
class AdminController extends Controller
{
    /**
     * 管理员控制首页
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        return view("admin.admin.index");
    }
}