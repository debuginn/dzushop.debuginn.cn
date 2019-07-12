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
     * 菜单控制首页
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(){
        // 求取行数
        $count = DB::table('dzushop_types')->count();

        // 查询树形结构并且运用concat函数生成新字段进行排序
        $data = DB::table('dzushop_types')
            ->select(DB::raw('dzushop_types.*, concat(path,id) p'))
            ->orderBy("p","asc")
            ->get();
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

    /**
     * 保存新建菜单操作
     * @param Request $request
     */
    public function store(Request $request){
        // 接收前台数据并进行处理
        $pid = $request->input('pid');
        $path = $request->input('path');
        $name = $request->input('name');
        $title = $request->input('title');
        $keywords = $request->input('keywords');
        $description = $request->input('description');
        $sort = $request->input('sort');
        $is_lou = $request->input('is_lou');
        // 处理数字是否合法
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
        // 执行插入操作
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
        // 返回结果值
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'插入菜单成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'插入菜单异常')));
        }
    }

    /**
     * 删除菜单及删除子菜单
     * @param $id
     */
    public function destroy($id){
        $result = DB::delete("delete from dzushop_types where id=$id or path like '%,$id,%'");
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'删除菜单及递归菜单成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'删除菜单异常')));
        }
    }

    /**
     * 更改是否为楼层操作
     * @param Request $request
     */
    public function status(Request $request){
        $id = $request->input('id');
        //获取当前id的状态
        $st = DB::table('dzushop_types')
            ->where('id',$id)
            ->value('is_lou');
        //接收读取状态值之后进行反转
        if($st == 0){
            $st = 1;
        }else{
            $st = 0;
        }
        //数据库操作
        $result = DB::table('dzushop_types')
            ->where('id',$id)
            ->update(['is_lou'=>$st]);
        //操作数据库返回值判断
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'成功更新状态')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'更新状态异常')));
        }
    }

    /**
     * 无刷新排序操作
     * @param Request $request
     */
    public function sort(Request $request){
        $id  = $request->input('id');
        $val = $request->input('val');
        $db = DB::update("update dzushop_types set sort=$val where id=$id");
        if($db){
            exit(json_encode(array('code'=>0, 'msg'=>'排序修改成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'排序修改异常')));
        }
    }

    /**
     * 修改菜单内容操作
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id){
        $data = DB::select("select * from dzushop_types where id=$id");
        return view('admin.types.edit')->with('data',$data[0]);
    }

    public function update(Request $request){
        // 接收前台数据
        $id = $request->input('id');
        $name = $request->input('name');
        $title = $request->input('title');
        $keywords = $request->input('keywords');
        $description = $request->input('description');
        $sort = $request->input('sort');
        $is_lou = $request->input('is_lou');
        // 判断数值是否合法
        if($id == ''){
            exit(json_encode(array('code'=>1, 'msg'=>'服务器获取pid异常')));
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
        // 执行更新数据库查询构造器
        $result = DB::table('dzushop_types')
            ->where('id',$id)
            ->update([
                'name' => $name,
                'title' => $title,
                'keywords' => $keywords,
                'description' => $description,
                'sort' => $sort,
                'is_lou' => $is_lou
            ]);
        // 结果是否有效并反馈
        if($result){
            exit(json_encode(array('code'=>0, 'msg'=>'更新菜单成功')));
        }else{
            exit(json_encode(array('code'=>1, 'msg'=>'更新菜单异常')));
        }

    }

}