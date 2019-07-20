<?php

namespace App\Http\Controllers\Admin;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class OrdersController extends Controller
{
    /*
     * 后台用户管理页面方法
     */
    public function index(Request $request){
        $data = DB::table('dzushop_orders')
            ->select("dzushop_orders.*", 'dzushop_user.name as sname', 'dzushop_ordersStatus.name')
            ->join('dzushop_user','dzushop_user.id','=','dzushop_orders.uid')
            ->join('dzushop_ordersStatus', 'dzushop_orders.sid', '=', 'dzushop_ordersStatus.id')
            ->get();

        // 转换操作，将订单号一致的做了聚合
        $newArr = array();
        foreach ($data as $key => $value){
            $newArr[$value->code] = $value;
        }

        //加载页面
        return view('admin.orders.index')
            ->with('data', $newArr);
    }

    /**
     * 查看订单详情列表
     * @param $code
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function lists(Request $request){
        $code = $request->input('code');
        $data = DB::table('dzushop_orders')
            ->select('dzushop_orders.*','dzushop_goods.title', 'dzushop_goods.img')
            ->join('dzushop_goods', 'dzushop_goods.id', '=', 'dzushop_orders.gid')
            ->where('dzushop_orders.code', '=', $code)
            ->get();
        // 返回视图并加载数据
        return view('admin.orders.lists')
            ->with('data',$data);
    }

    /**
     * 查看当前订单收货地址
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function addrlist(Request $request){
        $aid = $request->input('aid');
        $data = DB::table('dzushop_addr')
            ->where('id','=',$aid)
            ->get();
        // 返回并封装数据
        return view('admin.orders.addrlist')->with('data',$data[0]);
    }

    /**
     * 修改订单状态
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function changestatus(Request $request){
        if($_POST){
            $code = $request->input('code');
            $status = $request->input('status');
            $result = DB::table('dzushop_orders')
                ->where('code', '=', $code)
                ->update(['sid'=>$status]);
            if($result){
                return redirect('/admin/orders');
            }else{
                return back();
            }
        }else{
            $code = $request->input('code');
            $sid = $request->input('sid');

            $data = DB::table('dzushop_ordersStatus')->get();

            return view('admin.orders.edit')
                ->with('data', $data)
                ->with('sid', $sid)
                ->with('code', $code);
        }
    }

}