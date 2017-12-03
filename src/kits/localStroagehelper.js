//负责 操作localstroage中的数据  ，结合加入购物车这个业务
    // 1.定义一个全局量
const KEY ='buyGoods';
// 2.获取local...中的数据
    export function getItem(){
         var jsongString = localStorage.getItem(KEY);
        //  如果没有值，返回一个空对象
         if(!jsongString){
             return {};
         }
         //如果有值就返回这个对象
         return JSON.parse(jsongString);
    }
// 3设置。。。。

//gobj{gid:91,count:4}
    export function setItem(gobj){
        // 1从local...获取购买商品的对象
        var obj=getItem();
        // console.log(obj);//............----
        // 2判断gobj的值是否存在,如果存在直接叠加，不存在，就动态在gobj添加
        if(obj[gobj.gid]){
            // obj.91=obj.91+1
                obj[gobj.gid]=obj[gobj.gid]+gobj.count;

         //console.log(obj[gobj.gid]);//----------------------2,3
        }else{
            obj[gobj.gid]=gobj.count;//{91:1}
        }
        // 再重新将obj存储回去local..
        localStorage.setItem(KEY,JSON.stringify(obj));
    }

// 覆盖一个值
    export function setItemReplace(gobj){
        // 1从local...获取购买商品的对象
        var obj=getItem();
      
            obj[gobj.gid]=gobj.count;//{91:1}
        
        // 再重新将obj存储回去local..
        localStorage.setItem(KEY,JSON.stringify(obj));
    }
// 4。删除
      export function remoteItem(goodsid){
          var obj=getItem();
        //   删除obj中对应的属性
        delete obj[goodsid];
        // 写回locastriong
        localStorage.setItem(KEY,JSON.stringify(obj));
      }

