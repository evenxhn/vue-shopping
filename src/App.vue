<!--组件的模板  需要一个根元素 -->
<template>
         <div class="temp">
           
      <router-view></router-view>    
        </div>
</template>

<!--定义组件中的相关对象 -->
<script>
    //  new Vue({})
    // es6语法
    export default{
        // data:functional(){
       data(){
           return{
                msg:'你好啊'
           }
        },    
      }
    
</script>


<style>
      
</style>
