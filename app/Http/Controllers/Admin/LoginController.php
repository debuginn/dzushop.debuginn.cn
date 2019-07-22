<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Gregwar\Captcha\CaptchaBuilder;
use Illuminate\Support\Facades\Crypt;

class LoginController extends Controller
{
    /**
     * 后台登陆方法
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        return view('admin.login');
    }

    /**
     * 后台登录控制方法
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function check(Request $request){
        //接收数值
        $name = $request->input("name");
        $pass = $request->input("pass");
        $code = $request->input("code");
        //获取验证码的数值
        $yzm = $request->session()->get('captchaSession');
        //判断用户是否输入
        if($name == ''){
            return back()->with("error", "管理员不存在");
        }
        if($pass == ''){
            return back()->with("error", "密码不存在");
        }
        if($code == ''){
            return back()->with("error", "验证码不存在");
        }
        // 验证数据库中是否有数据
        $result = DB::table('dzushop_admin')->where([
            ['name','=',$name]
        ])->first();
        // 获取用户id 及密码 及状态 及登录次数
        $id = $result->id;
        $SQLpass = $result->pass;
        $status  = $result->status;
        $count = $result->count;
        // 获取当前时间
        $lasttime = time();
        // 解密密码
        $dePass = Crypt::decrypt($SQLpass);

        // 判断管理员是否被禁用
        if($status == 1){
            return back()->with("error", "该管理员被禁用，无法正常登录");
        }

        // 验证验证码是否与存在session值一样
        if($code == $yzm){
            // 验证是否有该用户并且有效
            if($result && ($dePass == $pass)){
                // 向数据库中记录数据
                DB::table('dzushop_admin')
                    ->where('id', '=', $id)
                    ->update([
                        'count' => $count+1,
                        'lasttime' => $lasttime
                    ]);
                // 向网站中存储数据
                $request->session()->put('adminUserInfo', ['name'=>$name, 'id'=>$id]);
                return redirect('/admin');
            }else{
                return back()->with("error", "好像登录失败了，重新登陆一下吧");
            }
        }else{
            return back()->with("error", "验证码输入不正确");
        }
    }

    /**
     * 验证码生成操作
     * @return Response
     */
    public function captcha(Request $request){
        $builder = new CaptchaBuilder;
        $builder->build(150,47);
        // 获取验证码内容
        $phrase = $builder->getPhrase();
        // 把内容存入session 存储验证码
        $request->session()->flash('captchaSession', $phrase);
        // 清除缓存
        ob_clean();
        // 把验证码数据以jpeg图片的格式输出
        return response($builder->output())
            ->header('Content-type','image/jpeg');
    }

    /**
     * 用户退出操作
     * @param Request $request
     */
    public function logout(Request $request){
        // 清除session值
        $request->session()->flush();
        // 重定向至登陆界面
        return redirect('admin/login');
    }
}