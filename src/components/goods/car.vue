<template>
    <div class="tepmm">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <el-button type="success" size="small" @click="selectAll">{{selectTxt}}</el-button>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-show="carlist.length<=0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                {{values}}
                                <!-- 遍历goodslist数组生成数据 -->
                                <tr v-for="(item,index) in carlist" :key="item.id">
                                    <td width="48" align="center">
                                        <!-- 全选 el-switch -->
                                        <el-switch v-model="values[index]" on-text="已选" on-color="#13ce66" off-color="#ff4949" off-text="未选"></el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <img height="50" width="50" :src="item.img_url" :alt="item.title"> {{item.title}}
                                    </td>
                                    <td width="84" align="left">
                                        {{item.sell_price}}

                                    </td>
                                    <td width="150" align="center">
                                        <!-- 使用自己定义的子组件  -->
                                        <!-- 这个item.buycount会传给子组件从而渲染到页面 -->
                                        <inputnumber v-bind:obj="{gid:item.id,count:item.buycount}" @msg="getinputnumber"></inputnumber>
                                    </td>
                                    <td width="104" align="left">
                                        {{ item.buycount * item.sell_price}}

                                    </td>
                                    <td width="54" align="center">
                                        <a href="javascript:void(0)" @click="delData(item.id)">删除</a>{{item.id}}
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selecteCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getAmount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>   
    import { getItem, setItemReplace, remoteItem } from '../../kits/localStroagehelper.js';
    import inputnumber from '../suboom/inputnumber.vue';
    export default {
        // 注册子组件
        components: {
            inputnumber
        },
        data() {
            return {

                selecteCount: 0,// 选择的商品件数
                selectTxt: "全选",
                carlist: [],
                values: [],//控制每行数据选择状态
                isselected: false,
            }
        },
        // 计算属性
        computed: {
            // 商品总件数
            getAmount() {
                // 1计算出当前选中的商品总件数 计算属性所依濑的this.values数组中的值发生改变就会自动新执行
                // this.values.filter(item=>{
                //       return item==ture;  
                // })
                var trueArr = this.values.filter(item => item);
                this.selecteCount = trueArr.length;
                // 2统计众商品的总金额；
                var totalcount = 0;
                //   所有选中的商品总价格=this.values中所有的ture的索引位置在this.carlist这个数组中的对象
                this.values.forEach((item, index) => {
                    // 判断item==true才是想要的
                    if (item) {
                        totalcount += (this.carlist[index].buycount * this.carlist[index].sell_price);
                    }
                })
                
                // console.log(totalcount)
                return totalcount;

            }
        },
      
        methods: {
            // 删除商品
            delData(goodsid) {
                // 1.0根据传入的商品id从this.carlist查找出索引
                var index = this.carlist.findIndex(item => item.id == goodsid);
                // 2.0删除carlist中当前索引的数据
                // delete this.carlist[index];
                this.carlist.splice(index, 1);
                // 3.0删除this.values中当前索引的数据
                delete this.values[index];
                // 4.0删除locastrer中的数据
                remoteItem(goodsid);
                // 5.0 触发vuex的changeCount重新重置layout.vue上面购物车数量的更新
                this.$store.dispatch('changeCount', {});
                getlistcar();
            },
            // 接收子组件中传回来的值objq:(gid:商品id，count:修改以后的值)
            getinputnumber(objq) {
                // 修改当前商品购买数量在localstio..
                setItemReplace(objq);
                // 只需要将carlist中对应的buycount值更新即可
                var index = this.carlist.findIndex(function (item) { return item.id == objq.gid })
                //    根据索引改buycount
                this.carlist[index].buycount = objq.count;

                // console.log(objq);
                
            },
            // 全选按钮事件
            selectAll() {
                this.isselected = !this.isselected;
                if (this.isselected) {
                    this.selectTxt = "不选";
                } else {
                    this.selectTxt = "全选";
                }
                for (var i = 0; i < this.values.length; i++) {
                    this.values[i] = this.isselected;


                }
                // 这两段代码就是用来触发vue中的视图刷新的
                this.values.push(false);
                this.values.pop();
            },
            // 获取购物车商品数据
            //1.从localstroage中拿到ID
            getlistcar() {
                var goodObj = getItem();
                var idArr = [];
                for (var key in goodObj) {
                    idArr.push(key)
                }
                var ids = idArr.join(',');
                var url = '/site/comment/getshopcargoods/' + ids;
                this.$ajax.get(url).then(res => {
                    // console.log(res.data.message);
                    res.data.message.forEach((item, index) => {
                        //手动的将goodsObj中的对应的商品购买数量赋值过去
                        item.buycount = goodObj[item.id]
                        // 将values中所有的值初始化为false
                        this.values[index] = false;

                    })
                    this.carlist = res.data.message;

                })
            }

        },
        mounted() {
            this.getlistcar();

        }
    }

</script>

<style>
</style>