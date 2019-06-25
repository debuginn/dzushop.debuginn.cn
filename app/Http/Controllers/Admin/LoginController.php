<?php
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Gregwar\Captcha\CaptchaBuilder;

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
            return back()->with("error", "用户名不存在");
        }
        if($pass == ''){
            return back()->with("error", "密码不存在");
        }
        if($code == ''){
            return back()->with("error", "验证码不存在");
        }
        //加密获取的数据
        $md5Pass = md5($pass);
        //验证数据库中是否有数据
        $result = DB::table('user')->where([
            ['name','=',$name],
            ['pass','=',$md5Pass]
        ])->first();
        //获取用户id
        $id = $result->id;
        // 验证验证码是否与存在session值一样
        if($code == $yzm){
            // 验证是否有该用户并且有效
            if($result){
                //向网站中存储数据
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
     * 验证码
     * @return Response
     */
    public function captcha(Request $request){
        $builder = new CaptchaBuilder;
        $builder->build(150,47);
        //获取验证码内容
        $phrase = $builder->getPhrase();
        //把内容存入session 存储验证码
        $request->session()->flash('captchaSession', $phrase);
        //清除缓存
        ob_clean();
        //把验证码数据以jpeg图片的格式输出
        return response($builder->output())->header('Content-type','image/jpeg');
    }
}