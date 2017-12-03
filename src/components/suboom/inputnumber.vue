<template>
    <div class="subtemp">
            <ul>
                <li @click="substract">-</li>
                <li>{{count}}</li>
                <li @click="add">+</li>
            </ul>
    </div>

</template>

<script>
    export default{
        data(){
            return{
                count:1   
            }
        },
        props:['obj'],  //父组件传给子组件的值
        mounted(){
            // 将传入的购买商品的数量赋值给this.count
            // console.log(this.obj,1);
            this.count=this.obj.count;
            
           
        },
        methods:{
            // 加1的方法
            add(){
                this.count++;
                
                // 将最新的数量传递回父组件
                this.notice();
                
            },
            // 减1的方法
            substract(){
                this.count--;
                if(this.count<=1){
                    this.count=1;
                }
                // 将最新的数量传递回父组件
                this.notice();
            },
            notice(){
                // 调用$emit触发事件
                this.$emit('msg',{gid:this.obj.gid,count:this.count})  //子传父
                
            }
        }
    }


</script>

<style scoped>
    .subtemp ul{
        width: 120px;
    }
    .subtemp li{
        list-style:none;
        display: inline-block;
        width: 35px;
        border: 1px solid rgba(0,0,0,0.3);
       text-align: center;
    }

</style>