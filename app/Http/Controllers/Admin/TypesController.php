<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Symfony\Component\Console\Helper\Table;

/**
 * 菜单管理控制器
 * Class IndexController
 * @package App\Http\Controllers\Admin
 */
class TypesController extends Controller
{
    /**
     * 数据格式化操作
     * @param $data
     * @param int $pid
     * @return array
     */
    public function dataFormat($data, $pid=0){
        // 定义一个新的数组
        $newArr = array();
        // 遍历数组及安排子数组
        foreach ($data as $key => $value){
            if($value->pid == $pid){
                $newArr[$value->id] = $value;
                $newArr[$value->id]->zi = $this->dataFormat($data, $value->id);
            }
        }
        // 返回数组
        return $newArr;
    }

    /**
     * 菜单控制首页
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        // 求取行数
        $count = DB::table('dzushop_types')->count();

        /*$data = DB::table('dzushop_types')->orderBy("sort","desc")->paginate(10);

        $data = dataFormat($data, $pid=0);
        return view("admin.types.index")
            ->with('data', $data)
            ->with('count', $count);*/
        $data = DB::select("select dzushop_types.*, concat(path,id) p from dzushop_types order by p");
        $data = DB::table('dzushop_types')->orderBy("sort","desc")->paginate(10);
        return view("admin.types.index")
            ->with('data', $data)
            ->with('count', $count);
    }

    /**
     * 添加菜单栏目视图方法
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create(){
        return view('admin.types.create');
    }

    public function store(Request $request){
        $pid = $request->input('pid');
        $path = $request->input('path');
        $name = $request->input('name');
        $title = $request->input('title');
        $keywords = $request->input('keywords');
        $description = $request->input('description');
        $sort = $request->input('sort');
        $is_lou = $request->input('is_lou');

        if($pid == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取pid异常')));
        }
        if($path == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取path异常')));
        }
        if($name == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取name异常')));
        }
        if($title == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取title异常')));
        }
        if($keywords == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取keywords异常')));
        }
        if($description == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取description异常')));
        }
        if($sort == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取sort 异常')));
        }
        if($is_lou == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取 is_lou 异常')));
        }

        $result = DB::table('dzushop_types')->insert([
            'name' => $name,
            'pid'  => $pid,
            'path' => $path,
            'sort' => $sort,
            'is_lou' => $is_lou,
            'title' => $title,
            'keywords' => $keywords,
            'description' => $description
        ]);

        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'插入菜单成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'插入菜单异常')));
        }

    }


    public function destroy($id){
        $result = DB::delete("delete from dzushop_types where id=$id or path like '%,$id,%'");
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'删除菜单及递归菜单成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'删除菜单异常')));
        }
    }

}