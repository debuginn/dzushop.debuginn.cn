<?php

namespace App\Http\Middleware;

use Closure;

class adminLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //判断session中是否存在用户数据
        //如果存在访问后台  不存在请用户登录
        if($request->session()->has('adminUserInfo')){
            return $next($request);
        }else{
            //用户进入登陆界面
            return redirect('/admin/login');
        }
    }
}
