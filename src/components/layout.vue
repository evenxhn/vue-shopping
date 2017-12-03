<template>
    <div class="temp">
        <!-- 顶部导航 -->
        <div id="header" class="header">
            <div class="head-top">
                <div class="section">
                    <div class="left-box">
                        <span>vue2.0单页应用</span>
                        <a target="_blank" href="#"></a>
                        <a target="_blank" href="#"></a>
                    </div>
                    <div id="menu" class="right-box">
                        <a href="/login.html">登录</a>
                        <a href="/register.html">注册</a>
                        <strong>|</strong>
                        <!--<a href="/content/contact.html"><i class="iconfont icon-phone"></i>联系我们</a>
                                               <a href="/cart.html"><i class="iconfont icon-cart"></i>购物车(<span id="shoppingCartCount"><script type="text/javascript" src="/tools/submit_ajax.ashx?action=view_cart_count"></script></span>)</a>-->
                        <router-link to="/site/car" id="layoutbuycar">
                            <i class="iconfont icon-cart"></i>
                            购物车(
                            <span id="shoppingCartCount">{{this.$store.getters.getBuyCount}}</span>)
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="head-nav">
                <div class="section">
                    <!-- <div class="logo">
                                               <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                                           </div>-->
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index">
                                <a href="/index.html">
                                    首页
                                </a>
                            </li>
                            <li class="news">
                                <a href="/news.html">
                                    学员问题汇总
                                </a>
                            </li>
                            <li class="photo">
                                <a href="/photo.html">
                                    重难点专区
                                </a>
                            </li>
                            <!--<li class="goods"><a href="">就业阶段</a></li>-->
                            <li class="video">
                                <a href="/video.html">
                                    前端常用功能
                                </a>
                            </li>
                            <li class="down">
                                <a href="/down.html">
                                    资源下载
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="/admin/index.aspx">
                                    问题提交
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
                                placeholder="输入关健字" x-webkit-speech="">
                        </div>
                        <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
                            <i class="iconfont icon-search"></i>
                        </a>
                    </div>
                </div>
            </div>
            <router-view></router-view>
        </div>


    </div>

</template>

<script>
    // 导入bus.js文件中的vm对象
    import { vm, KEY } from '../kits/bus.js';


    export default {
        data() {
            return {
                buyTotalCount: 0
            }
        },


        methods: {

        },


        mounted() {
            // jquery的实现应该要能够找到dom对象     

            $("#menu2 li a").wrapInner('<span class="out"></span>');
            $("#menu2 li a").each(function () {
                $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
            });

            $("#menu2 li a").hover(function () {
                $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
                $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

            }, function () {
                $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
                $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
            });
            //2.将曾经购买的总数加载回来
            var countStr = localStorage.getItem('buyTotalCount');
            if (countStr != null) {
                this.buyTotalCount = parseInt(countStr);
            }
            


            // 3利用vm中的$on方法完成事件的监听
            vm.$on(KEY, (buycount) => {
                // 改变的是内存中的值
                this.buyTotalCount += buycount;
                // 2将总数存贮起来（localstorage:只能存字符串）
                localStorage.setItem('buyTotalCount', this.buyTotalCount);
                
            });
        },
    }

</script>

<style>
    @import url('../../statics/jqplugins/jqhovernav/jqhoverNav.css')
</style>