<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


//上传图片控制器
Route::get('photo', 'UserController@photo');
//处理上传图片控制器
Route::post('upload', 'UserController@upload');


/**
 * 2019-04-14学习
 */
//请求
Route::get('request', "RequestController@index");

Route::match(['post', 'get'], '/admin/user/add', 'UserController@add');


/**
 * 2019-04-13学习
 */
/*
 * 路由组 -- 后台
 */

//完成用户的登录路由
Route::get('admin/login', "Admin\LoginController@index");
//登陆的操作
Route::post('admin/check', "Admin\LoginController@check");
//登录验证码
Route::get('admin/captcha', "Admin\LoginController@captcha");

//通过路由组进行提取 提取公共命名空间 公共的前缀 中间件
Route::group(['namespace'=>'Admin', 'prefix'=>'admin', 'middleware'=>'adminLogin'], function(){
    //首页路由设置
    Route::get('/', 'IndexController@index');

    /*
     * 用户管理模块路由设置
     */
    Route::get('user',             'UserController@index');       //用户模块首页
    Route::get('user/indexTable',  'UserController@indexTable');  //首页封装json数据方法
    Route::get('user/create',      'UserController@create');      //创建用户方法
    Route::post('user/store',      'UserController@store');       //保存用户方法
    Route::get('user/edit/{id}',   'UserController@edit');        //修改用户信息方法
    Route::post('user/status',     'UserController@status');      //用户状态选择方法
    Route::post('user/update',     'UserController@update');      //用户修改信息方法
    Route::get('user/destory',     'UserController@destory');

    /**
     * 用户图片管理设置
     */
    Route::get('pic',             'PicController@index');          //图片管理方法
    Route::get('pic/create',      'PicController@create');         //图片添加方法
    Route::post('pic/store',      'PicController@store');          //保存添加图片方法
    Route::post('pic/delAll',     'PicController@delAll');         //图片批量删除方法
    Route::post('pic/sort',       'PicController@sort');           //图片无刷新排序方法
    Route::delete('pic/destroy/{id}', 'PicController@destroy');    //图片单个删除方法
    Route::get('pic/edit/{id}',   'PicController@edit');           //图片修改方法
    Route::post('pic/update',     'PicController@update');         //修改图片更新方法



    /*
     * 商品管理模块路由设置
     */
    Route::get('goods', 'GoodsController@index');

    /**
     * 公共路由设置方法
     */
    //设置文件上传的方法
    Route::any('shangchuan', 'CommonController@upload');


    // Data数据库连贯操作
    Route::get('data', 'DataController@index');
    Route::get('pass', 'DataController@pass');
});

/*
 * 路由组 -- 前台
 */

Route::group(['namespace'=>'Home'], function(){
    Route::get('/', 'IndexController@index');
});
























