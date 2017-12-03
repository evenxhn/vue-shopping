<template>
    <div class="temp">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section" v-if="list.imglist">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix a  nimation03">
                                                <li v-for="item1 in list.imglist" :key="item1.id">
                                                    <div class="small-img">
                                                        <img :src="item1.thumb_path">
                                                    </div>
                                                </li>

                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{list.goodsinfo.title}}</h1>
                                <p class="subtitle">{{list.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{list.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{list.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{list.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <el-input-number v-model="num1" @change="buyCount" :min="1" :max="list.goodsinfo.stock_quantity"></el-input-number>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{list.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                                                <button class="add" ref="btnaddcar" @click="addCar">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li @click="istabShow=true">
                                        <a v-bind="{class:(istabShow?'selected':'')}" href="javascript:;">商品介绍</a>
                                    </li>
                                    <li @click="istabShow=false">
                                        <a href="javascript:;" v-bind="{class:(!istabShow?'selected':'')}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                        </Affix>
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class="tab-content entry" style="display:block;" v-show="istabShow">
                                <div style="padding:5px" v-html="list.goodsinfo.content"></div>
                            </div>

                            <div class="tab-content" style="display: block;" v-show="!istabShow">
                                <!--网友评论-->
                                <div class="comment-box">
                                    <!--取得评论总数-->
                                    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" v-model="commentTxt" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="button" value="提交评论" class="submit" @click="submitText">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <ul id="commentList" class="list-box">
                                        <p v-show="listtest.length<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in listtest" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>匿名用户</span>
                                                    <span>{{item.add_time}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <!--放置页码-->
                                    <div class="page-box" style="margin:5px 0 0 62px">
                                        <!-- 使用elementUI的分页组件替代 -->
                                        <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="pageIndex" :page-sizes="[2,5,10,20,30]"
                                            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                                        </el-pagination>
                                    </div>
                                    <!--/放置页码-->
                                </div>

                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">

                                    <li v-for="item in list.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time|datafmt}}</span>
                                        </div>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
        <!-- 这个Div是来做动画的 -->
        <transition @before-enter="benter" @enter="enter" @after-enter="aenter">
            <div v-if="list.imglist" class="img" ref="img" v-show="isshow">
                <img width="50" height="50" :src="list.imglist[0].thumb_path" alt="">
            </div>
        </transition>
        </transition>

    </div>
</template>

<script>
    // 步骤二
    import "../../../statics/jqplugins/jqimgzoom/js/magnifier.js";

    // 导入事件总线的相关数据
    import { vm, KEY } from '../../kits/bus.js';

    // 导入
    import { setItem } from '../../kits/localStroagehelper.js'

    export default {
        data() {
            return {
                list: {},
                listtest: {},
                isshow: true,
                istabShow: true,
                pageIndex: 1,//当前第几页
                pageSize: 10,//每页显示的条数
                totalcount: 0,
                num1: 1,
                commentTxt: '',
                currentBuyCount: 1,//初识要添加的数量
                isshow: false,
                offsetObj: {},//动画的图片位置
                lbcOffSet:{},//layout购物车数量的位置
            }
        },
        watch: {
            '$route': function () {
                this.getlist();
            }
        },
        methods: {
            // 定义动画进入的三个钩子函数benter enter aenter
            benter(el){
               // 设置动画开始的位置
                el.style.left= this.offsetObj.left +'px';
                el.style.top= this.offsetObj.top+'px';
            },
            enter(el,done){
                  // 设定动画的结束位置，同时要调用 el.offsetWidth 来刷新 调用done来触发aenter的执行
                  el.offsetTop;
                  el.style.left= this.lbcOffSet.left +'px';
                  el.style.top= this.lbcOffSet.top+'px';
                 
                  done();
            },
            aenter(el){
                    this.isshow=!this.isshow;
            },

            // 分页组件的事件
            sizeChange(size) {
                this.pageSize = size;
                this.gettext();
            },
            pageChange(Index) {
                this.pageIndex = Index;
                this.gettext();
            },
            // 购物车
            addCar() {
                // 利用vm.$emit()触发事件 将购买数量传过去
                vm.$emit(KEY, this.currentBuyCount);
                // 获取当前商品id和购买的数量 调用local....js这个文件中的setItem方法来存储
                var goodsobj = { gid: this.$route.params.goodsid, count: this.currentBuyCount };
                // 将当前购买的上品数量存储到local..
                setItem(goodsobj);
                this.$store.dispatch('changeCount',goodsobj);
                this.isshow=!this.isshow;

            },
            // elemen组件中的事件   val代表最新的加减框里面的数字
            buyCount(val) {
                
                this.currentBuyCount = val;
            },
            // 提交评论
            submitText() {
                var url = 'site/validate/comment/post/goods/' + this.$route.params.goodsid;
                this.$ajax.post(url, { "commenttxt": this.commentTxt }).then(res => {
                    this.gettext();
                    this.commentTxt='';
                })
            },

            // 获取评论
            gettext() {
                var url = '/site/comment/getbypage/goods/' + this.$route.params.goodsid + '?pageIndex=' + this.pageIndex + '&pageSize=' + this.pageSize;

                // console.log(123)
                this.$ajax.get(url).then(res => {


                    this.listtest = res.data.message;
                    this.totalcount = res.data.totalcount;
                })
            },
            getlist() {
                this.$ajax.get('/site/goods/getgoodsinfo/' + this.$route.params.goodsid).then(res => {

                    this.list = res.data.message;

                    this.gettext();
                    if (!this.list.goodsinfo) {
                        this.$message.error('传入的商品id有问题');
                    }
                    // 初始化插件

                    //应该是等待整个数据回来以后，才进行相册图片的渲染 延迟200毫秒初始化 
                    setTimeout(function () {
                        $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
                    }, 200);
                })
            }
        },
        mounted() {
            this.getlist();
            this.gettext();
            // 获得当前“加入购物车的位置”
            setTimeout(()=> {
                var offsetObj = $(this.$refs.btnaddcar).offset();
                //因为这个出来太快，页面渲染的慢，所有要延迟，否则没东西
                
                this.offsetObj = offsetObj;
                // 将购物车的位置复制给要动画的图片$(this.$refs.img).css("left", offsetObj.left).css("top", offsetObj.top);
                  $(this.$refs.img).css('left',offsetObj.left).css('top',offsetObj.top);  
                //   购物车数量的位置
                  var lbcOffSet= $('#layoutbuycar').offset()
                  this.lbcOffSet=lbcOffSet;
            },200)





        }
    }

</script>

<style scoped>
    /* 实现放大镜步骤一 */

    @import url('../../../statics/jqplugins/jqimgzoom/css/magnifier.css');
    .img {   
        width: 50px;
        height: 50px;
        position: absolute;
        transition: all 1s;
    }
</style>