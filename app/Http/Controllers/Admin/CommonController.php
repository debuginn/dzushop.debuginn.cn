<?php
/**
 * CommonController.php
 * 文件描述
 * Created on 2019-4-22 19:34
 * Create by Meng Xianhui from www.debuginn.cn
 */
namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

//公共控制器
class CommonController extends Controller
{
    /**
     * 文件上传方法
     * @param Request $request
     */
    public function upload(Request $request){
        $file = $request->file('img');

        if($file == null){
            exit(json_encode(array('code'=>1, 'msg'=>'没有上传任何图片文件')));
        }
        //图片存储根目录
        $path = "./uploads";
        //获取文件后缀
        $ext = $file->getClientOriginalExtension();
        //获取文件创建当前日期
        $date = date('Ymd');
        //新创建文件名及其后缀
        $newFile = time().'.'.$ext;
        //构造目录
        $tree = $path.'/'.$date;
        if(file_exists($date)){
            mkdir($tree,0777);
        }
        //将新文件移动至对应文件夹下
        $file->move($tree, $newFile);
        $imgPath = $tree.'/'.$newFile;

        $url = $imgPath;
        if($imgPath != null){
            exit(json_encode(array('code'=>0, 'msg'=>$url)));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'上传失败')));
        }
    }
}