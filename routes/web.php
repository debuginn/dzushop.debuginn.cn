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

/*
 * 路由组 -- 前台
 */


Route::get('/', 'Home\IndexController@index');



/*
 * 路由组 -- 后台
 */
/**
 * 后台登录认证组 ,不能放在中间件下
 */
//完成用户的登录路由
Route::get('admin/login',"Admin\LoginController@index");
//登陆的操作
Route::post('admin/check',"Admin\LoginController@check");
//登录验证码
Route::get('admin/captcha',"Admin\LoginController@captcha");

//通过路由组进行提取 提取公共命名空间 公共的前缀 中间件
Route::group(['namespace'=>'Admin', 'prefix'=>'admin', 'middleware'=>'adminLogin'], function(){

    //后台首页路由设置
    Route::get('/', 'IndexController@index');

    /**
     * 后台管理员管理组
     */
    // 管理员管理首页
    Route::get('admin', 'AdminController@index');
    // 创建管理员校验管理员是否存在
    Route::post('admin/checkadmin', 'AdminController@checkadmin');
    // 创建管理员保存方法
    Route::post('admin/store', 'AdminController@store');
    // 修改管理员方法
    Route::get('admin/edit/{id}', 'AdminController@edit');
    // 修改管理员保存方法
    Route::post('admin/update', 'AdminController@update');
    // 删除管理员方法
    Route::get('admin/destory', 'AdminController@destory');

    /*
     * 用户管理模块路由设置
     */
    // 用户模块首页
    Route::get('user', 'UserController@index');
    // 创建用户方法
    Route::get('user/create', 'UserController@create');
    // 保存创建用户方法
    Route::post('user/store',      'UserController@store');
    // 修改用户信息方法
    Route::get('user/edit/{id}',   'UserController@edit');
    // 用户修改信息保存方法
    Route::post('user/update',     'UserController@update');
    // 用户状态选择方法
    Route::post('user/status',     'UserController@status');
    // 删除用户方法
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

























