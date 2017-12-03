<template>
    <div class="temp">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->
                                <li v-for="item in topobj.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>

                                            <span v-for="item1 in item.subcates" :key="item1.id">{{item1.title}}&nbsp;</span>

                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>

                                                <a v-for="item2 in item.subcates" :key="item2.id" href="/goods/43.html">{{item2.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <!-- 使用elementUI的轮播组件实现 -->
                                <el-carousel :interval="5000" arrow="always">
                                    <!-- 轮播的每一项，那么我们只需要将服务器的数据中的图片放进去即可 -->
                                    <el-carousel-item v-for="item4 in topobj.sliderlist" :key="item4.id">
                                        <router-link v-bind="{to:'/site/goodsinfo/'+item4.id}">
                                            <img height="368" width="368" :src="item4.img_url" alt="">
                                        </router-link>
                                        <h3>{{item4.title}}</h3>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!--推荐商品-->
                    <div class="left-220">
                        <ul class="side-img-list">

                            <li v-for="(item,index) in topobj.toplist">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">{{item.title}}</router-link>
                                    <span>{{item.add_time|datafmt}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--/推荐商品-->
                </div>
            </div>
        </div>
        <!-- 分类 -->
        <div class="section" v-for="items in listarr" :key="items.id">

            <!--子类-->
            <div class="main-tit">
                <h2>{{items.catetitle}}</h2>
                <p>

                    <a v-for="itemss in items.level2catelist"  href="/goods/43.html">{{itemss.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="itemsss in items.datas" :key="itemsss.artID">
                             
                            <a href="/goods/show-91.html">
                                <router-link v-bind="{to:'/site/goodsinfo/'+itemsss.artID}">
                                <div class="img-box">
                                      
                                    <img :src="itemsss.img_url">
                              
                                </div>
                            </router-link>
                               
                                <div class="info">
                                    <h3>{{itemsss.artTitle}}</h3>
                                    <p class="price">
                                        <b>¥{{itemsss.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存{{itemsss.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemsss.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>


                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                topobj: {},
                listarr: []
            }
        },
        methods: {
            gettoplist() {
                var url = '/site/goods/gettopdata/goods';
                this.$ajax.get(url).then(res => {
                    this.topobj = res.data.message;
                });
            },
            getarrlist() {
                var url = '/site/goods/getgoodsgroup';
                this.$ajax.get(url).then(res => {
                    this.listarr = res.data.message;
                });
            }
        },
        mounted() {
            this.gettoplist();
            this.getarrlist();
        }
    }


</script>

<style>
    .el-carousel__container {
        height: 343px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        /* 只需要将line-height修改成50px，文字就自动定位到下面了 */
        line-height: 50px;
        margin: 0;
    }
</style>