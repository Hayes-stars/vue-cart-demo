<template>
    <div id="shopcart-container">
        <p>{{name}}</p> 
        <!-- 购物车列表 -->
        <div class="shopcart-header">            
            <div class="item-td">####</div>
            <div class="item-td">商品名称</div>
            <div class="item-td">单价</div>
            <div class="item-td">数量</div>
            <div class="item-td">总价</div>
        </div>        
        <div class="shopcart-list">            
            <!-- :class="{active:item.active}"  -->
            <div class="item" v-for="(item,i) in cartList" :key="item.id">
                <div class="item-td">
                    <input type="checkbox" v-model="item.active"/>
                </div>
                <div class="item-td">{{item.text}}</div>
                <div class="item-td">￥{{item.price}}</div>
                <div class="item-td">
                    <button @click="minus(i)">-</button>
                    {{item.count}}
                    <button @click="add(i)">+</button>
                </div>
                <div class="item-td">￥{{item.price*item.count}}</div>
            </div>
        </div>
        <div class="shopcart-count">
            <div class="item-td"></div>
            <div class="item-td"></div>
            <div class="item-td">结算:</div>
            <div class="item-td">{{activeCount}}/{{count}}</div>
            <div class="item-td">￥{{total}}</div>
        
            
        </div>
    </div>
</template>

<script>
    export default {
        name: 'shopCart',
        // props: ['name','cart'],
        props: ['name'],
        data() {
            return {
                cartList: []
            }
        },
        created(){
            // 监听父组件添加商品事件
            this.$bus.$on('addCart', good => {
                const result = this.cartList.find(v=>v.id===good.id)
                if (result) { // 已存在数量加一
                  result.count += 1;
                } else {
                  this.cartList.push({
                    ...good, // 属性展开
                    count:1,
                    active: true
                  })
                }                
            })
        },
        methods:{
            minus(i){
                const count = this.cartList[i].count;
                if(count>1){
                    this.cartList[i].count -= 1;
                } else {
                    this.remove(i);
                }
            },
            add(i){
                this.cartList[i].count += 1;
            },
            remove(i){
                if (window.confirm('确定删除该商品？')) {
                    this.cartList.splice(i,1);
                }
            }
        },
        computed: {
            // 计算属性 需要额外加工data中数据的时候使用
            activeCount() { // 过滤选中的数量
                return this.cartList.filter(v=>v.active).length; 
            },
            count() { // 购物车总项
                return this.cartList.length;
            },
            total() { // 计算选中的商品总价
                let totalPrice = 0;
                this.cartList.forEach(item => {
                    if(item.active){
                        totalPrice += item.price * item.count;
                    }
                });
                return totalPrice;
            }
        },
    }
</script>

<style scoped>
    #shopcart-container{

    }
    .shopcart-header, .shopcart-list{
        width: 720px;
        margin: 0 auto;
        overflow: hidden;
    }
    .shopcart-list .item{
        overflow: hidden;
        padding: 10px 0;
        width: 100%;
    }
    .shopcart-header .item-td{
        float: left;
        padding: 5px 25px;
        background: #FFE400;
        color: #222;
        font-size: 16px;
    }
    .shopcart-list .item .item-td{
        float: left;
        padding: 10px 20px;
        font-size: 14px;
        color: #222;
    }
    .active{
      color:  #FF4A4A; 
    }
    .shopcart-count{
        
        width: 720px;
        margin: 60px auto;
        overflow: hidden;
    }
    .shopcart-count .item-td{
        float: left;  
        padding: 10px 35px;      
        text-align: center;
    }
</style>