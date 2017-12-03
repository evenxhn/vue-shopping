// 1.0导入vue.js
// var vue=require('vue');
import Vue from 'vue';

// 2,0导入App.vue组件对象
import App from './App.vue';
import VueRouter from "vue-router";

// 必须将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);

import layout from "./components/layout.vue";

import goodslist from "./components/goods/goodslist.vue";

import goodsinfo from "./components/goods/goodsinfo.vue";

import car from "./components/goods/car.vue";
// 按需导入图钉功能
import { Affix } from 'iview';
Vue.component('Affix', Affix);


// 定义路由
var router=new VueRouter({
    routes:[
       
        // 默认跳转的路由规则
        {name:'default',path:'/',redirect:'/site/goodslist'},
            // 布局  
        {name:'layout',path:'/site',component:layout,
          children:[{name:'goodslist',path:'goodslist',component:goodslist},
          {name:'goodsinfo',path:'goodsinfo/:goodsid',component:goodsinfo},
         {name:'car',path:'car',component:car}]
        }
    ]
});

// 6.0 定义一个全局过滤器用来格式化日期
Vue.filter('datafmt',(input,fmtstring)=>{
    var date = new Date(input);
    var y = date.getFullYear();
    var m = date.getMonth() +1 ;
    var d = date.getDate();
    var h = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    if(fmtstring =='YYYY-MM-DD HH:mm:ss'){
        return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':'+ss;
    }else{
         return y + '-' + m + '-' + d;
    }
})



// 4.0 导入vue的一个组件库:element-ui
import elementUI from 'element-ui';
// 导入默认样式(由于咱们自己修改了样式所以要替换默认样式)
import '../statics/elementuiCss/index.css';
// 导入自己编写的全局样式
import '../statics/site/css/style.css';

// 绑定到vue中
Vue.use(elementUI);



import axios from 'axios';

// 5.0.3 配置axios在请求数据服务接口的时候，允许带cookie(凭证)
axios.defaults.withCredentials = true;

axios.defaults.baseURL='http://127.0.0.1:8899';

Vue.prototype.$ajax=axios;



// 7.0 vuex的定义和集成
import vuex from 'vuex';
Vue.use(vuex);


// 7.0.1 定义vuex中的四个核心对象
// 1.0 定义需要全局保存的属性
// 在组件中使用： this.$store.state.buyCount
var state = {
    buyCount: 0
}
import { setItem, getItem } from './kits/localStroagehelper.js';

// 这个对象中定义的方法要通过actions中的方法触发
var mutations = {
    // 定义一个changeCount方法来改变state中的buyCount值
    // 参数state:代表的是上面定义好的state对象
    // 参数parmsbuyCount:就是从程序员在调用的时候传入的（带业务才知道具体的参数有哪些）
    changeCount(state, goodsobj) {
        // 修改state中的buyCount这个属性的值
        // 获取localstroage中的商品的购买总数据量
        var obj = getItem();
        var tcount = 0;
        for (var key in obj) {
            tcount += obj[key];
        }
        // state.buyCount += goodsobj.count;

        state.buyCount = tcount;
        // 将这个值存储在localStroage中
        // setItem(goodsobj);
    }
}

//actions在外部可以通过编写：this.$store.dispatch('actions定义好的方法名称',传入参数) 
var actions = {
    // 定义一个changeCount方法来触发mutations中的某个方法
    // 参数{commit}:可以用它来触发mutations里面的某个方法
    // 参数parmsbuyCount:就是从程序员在调用的时候传入的（带业务才知道具体的参数有哪些）  
    changeCount({ commit }, goodsobj) {
        // commit()的第一个参数就是mutations里面的某个方法名称
        commit('changeCount', goodsobj);
    }
}

// 对state中的某个属性进行封装处理(至于如何封装按照具体的业务来编写)
// 
var getters = {
    // 当state.buyCount的值>0的话，直接返回即可
    // 在任何视图上使用的代码如下： this.$store.getters.getBuyCount
    getBuyCount(state) {
        if (state.buyCount > 0) {
            return state.buyCount;
        } else {
            // 否则从localStorage中统计出总数据返回
            //  obj的格式：{91:2,92:1}
            var obj = getItem();
            var tcount = 0;
            for (var key in obj) {
                tcount += obj[key];
            }
            // 将最终结果赋值回给state.buyCount这个属性
            state.buyCount = tcount;

            return tcount;
        }
    }
}

// 7.0.2 将上述四个对象利用  new vuex.Store()进行实例化
var store = new vuex.Store({
    state, mutations, actions, getters
});

// 3.0实例化vue对象
new Vue({
    el:'#app',
    store, //在vue中注入store
    // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    router,
    // 渲染App这个组件
    // render:function(create){
    //     create(App)
    // }
    // 将app组件编译将这组件中的内容填充到 el:指向的app这个div中
    render:create=>create(App)
});

