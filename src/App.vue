<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- 条件语句 -->
    <!-- <p v-if="showName">{{name}}</p> -->
    <!-- <p>
      <input type="text" v-model="text"/>
    </p>
    <p>
      <button @click="addGood">加入购物车</button>
    </p> -->
    <!-- 循环语句 -->
    <ul class="goodslist">
      <li v-for="(phone,index) in goodsList" :key="phone.id">
        <span>{{phone.text}}</span>
        <span>￥{{phone.price}}</span>
        <button @click="addGood(index)">加入购物车</button>
      </li>
    </ul>
    <!-- 购物车 -->
    <!--  :cart="cartList" -->
    <shopCart :name="name" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import shopCart from './components/shopcart.vue'
import axios from 'axios'

export default {
  name: 'app',
  components: {
    HelloWorld,
    shopCart
  },
  data () {
    return {
      name: '购物车Demo',
      showName: false,
      goodsList:[
        // {
        //   id:1,text:'华为p9',price:'3988'
        // },
        // {
        //   id:2,text:'iphoneX',price:'7888'
        // }
      ],
      // text:'',
      // cartList: [],
    }
  },
  async created(){
    // setTimeout(()=>{
    //   this.showName = true
    // },1000)
    // 查询商品列表
    try {      
      const response = await axios.get('/api/goods');
      // console.log(response);
      this.goodsList = response.data.list;
    } catch (error) {
      // 错误处理      
    }

    // 不用await 
    // axios.get('/api/goods').then(response =>{
    //   this.goodsList = response.data.list
    // }).catch(err=>{
    //   // 错误处理
    // });

  },
  methods: {
    addGood(i){
      // this.goodsList.push({
      //   text: '小米MIX2s',
      //   price: '2888'
      // })
      
      // this.goodsList.push({
      //   text: this.text,
      //   price: '2888'
      // })      

      const good = this.goodsList[i]
      this.$bus.$emit('addCart', good);

      // const result = this.cartList.find(v=>v.id===good.id)
      // if (result) { // 已存在数量加一
      //   result.count += 1;
      // } else {
      //   this.cartList.push({
      //     ...good, // 属性展开
      //     count:1,
      //     active: true
      //   })
      // }
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}
ul.goodslist{
  list-style: none;
}
ul.goodslist>li{
  padding:10px 0;
  text-align: center;    
}
ul.goodslist>li span{
  padding: 15px;
}
</style>
