<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Symfony\Component\Console\Helper\Table;
use Illuminate\Support\Facades\Crypt;

/**
 * 菜单管理控制器
 * Class IndexController
 * @package App\Http\Controllers\Admin
 */
class TypesController extends Controller
{
    /**
     * 菜单控制首页
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        return view("admin.types.index");
    }


    public function create(){
        return view('admin.types.create');
    }

}