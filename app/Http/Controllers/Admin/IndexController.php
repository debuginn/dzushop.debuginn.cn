<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


class IndexController extends Controller
{
    public function index(){
        return view("admin.index");
    }

}