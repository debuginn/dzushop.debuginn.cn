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
// 后台登录认证组 ,不能放在中间件下
// 完成用户的登录路由
Route::get('admin/login',"Admin\LoginController@index");
// 登陆的操作
Route::post('admin/check',"Admin\LoginController@check");
// 登录验证码
Route::get('admin/captcha',"Admin\LoginController@captcha");
// 用户退出操作
Route::get('admin/logout', "Admin\LoginController@logout");

// 通过路由组进行提取 提取公共命名空间 公共的前缀 中间件
Route::group(['namespace'=>'Admin', 'prefix'=>'admin', 'middleware'=>'adminLogin'], function(){

    // 后台首页路由设置
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
        // 用户状态选择方法
        Route::post('admin/status', 'AdminController@status');
        // 修改管理员获取信息方法
        Route::get('admin/edit/{id}', 'AdminController@edit');
        // 修改管理员保存方法
        Route::post('admin/update', 'AdminController@update');
        // 删除单个管理员方法
        Route::delete('admin/destroy/{id}', 'AdminController@destroy');

    /*
     * 用户管理模块路由设置
     * =====================
     * 1、在实际情况中，用户登录都是靠自己注册信息获得；
     * 2、后台管理只有更改状态或查看的权限
     */
    // 用户模块首页
    Route::get('user', 'UserController@index');
        // 用户状态选择方法
        Route::post('user/status', 'UserController@status');

    /**
     * 分类管理方法设置
     */
    // 分类模块首页
    Route::get('types', 'TypesController@index');
    // 创建分类方法
    Route::get('types/create', 'TypesController@create');
        // 保存创建分类方法
        Route::post('types/store', 'TypesController@store');
        // 修改分类信息方法
        Route::get('types/edit/{id}', 'TypesController@edit');
        // 修改分类保存方法
        Route::post('types/update', 'TypesController@update');
        // 是否为楼层状态选择方法
        Route::post('types/status', 'TypesController@status');
        // 删除分类方法
        Route::delete('types/destroy/{id}', 'TypesController@destroy');
        // 分类排序方法
        Route::post('types/sort',  'TypesController@sort');

    /**
     * 轮播图管理方法
     */
    // 轮播图首页展示方法
    Route::get('slider', 'SliderController@index');
        // 轮播图添加页面方法
        Route::get('slider/create', 'SliderController@create');
        // 轮播图添加保存方法
        Route::post('slider/store', 'SliderController@store');
        // 修改轮播图信息方法
        Route::get('slider/edit/{id}', 'SliderController@edit');
        // 修改轮播图保存信息方法
        Route::post('slider/update', 'SliderController@update');
        // 删除轮播图方法
        Route::delete('slider/destroy/{id}', 'SliderController@destroy');
        // 轮播图排序方法
        Route::post('slider/sort',  'SliderController@sort');

    /**
     *  广告管理方法
     */
    // 主体广告
    Route::get('ads', 'AdsController@index');
        // 创建广告方法
        Route::get('ads/create', 'AdsController@create');
        // 保存创建广告方法
        Route::post('ads/store', 'AdsController@store');
        // 修改广告信息方法
        Route::get('ads/edit/{id}', 'AdsController@edit');
        // 更新广告信息方法
        Route::post('ads/update', 'AdsController@update');
        // 删除广告方法
        Route::delete('ads/destroy/{id}', 'AdsController@destroy');
        // 广告排序方法
        Route::post('ads/sort',  'AdsController@sort');

    // 分类广告
    Route::get('adstype', 'AdsTypeController@index');
        // 创建分类广告方法
        Route::get('adstype/create', 'AdsTypeController@create');
        // 保存创建分类广告方法
        Route::post('adstype/store', 'AdsTypeController@store');
        // 修改分类广告信息方法
        Route::get('adstype/edit/{id}', 'AdsTypeController@edit');
        // 更新分类广告信息方法
        Route::post('adstype/update', 'AdsTypeController@update');
        // 删除分类广告方法
        Route::delete('adstype/destroy/{id}', 'AdsTypeController@destroy');

    /**
     *  系统设置
     */
    Route::get('sys', 'SysController@index');
        Route::post('sys/store', 'SysController@store');

    /*
     * 商品管理模块路由设置
     */
    // 商品管理首页
    Route::get('goods', 'GoodsController@index');
        // 新增商品管理方法
        Route::get('goods/create', 'GoodsController@create');
        // 保存新增商品信息
        Route::post('goods/store', 'GoodsController@store');
        // 修改商品信息方法
        Route::get('goods/edit/{id}', 'GoodsController@edit');
        // 保存修改商品信息方法
        Route::post('goods/update', 'GoodsController@update');

    /**
     * 订单管理模块路由设置
     */
    // 订单管理列表
    Route::get('orders','OrdersController@index');
        // 查看订单详情
        Route::get('orders/lists', 'OrdersController@lists');
        // 查看订单收货地址
        Route::get('orders/addrlist', 'OrdersController@addrlist');
        // 保存当前选中状态
        Route::any('orders/changestatus', 'OrdersController@changestatus');

    /**
     * 评论管理模块
     */
    // 评论管理列表
    Route::get('comment', 'CommentController@index');
        // 修改当前评论
        Route::post('comment/status', 'CommentController@status');

    /**
     * 公共路由设置方法
     */
    //设置文件上传的方法
    Route::any('shangchuan', 'CommonController@upload');

});

























