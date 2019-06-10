<template>
  <div class="cart-container">
    <el-table :data="cartList" style="width: 100%">
      <el-table-column prop="name" label="名字" width="180"></el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="prop">
          <img class="icon"  alt>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="180">
        <template slot-scope="prop">
          <el-input-number v-model="prop.row.num" :min="1" label="描述文字"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="单价" width="180"></el-table-column>
      <el-table-column label="总价" width="180">
        <template slot-scope="prop"></template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="prop">
          <el-button type="danger" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 总价 -->
    <p>总价:{{totalPrice}}</p>
    <!-- 结算 -->
    <el-button  type='success'>结算</el-button>
  </div>
</template>
<script>
// 进入购物车页面 获取Vuex的数据 渲染到页面上
export default {
  data() {
    return {
      cartList: []
    };
  },
  // 计算属性 计算总价
  computed: {
    totalPrice(){
      let sum = 0;
      this.cartList.forEach(v=>{
        sum+=v.num*v.price
      })
      return parseInt(sum);
    }
  },
  methods: {
    delOne(data) {
      this.$confirm("此操作将从购物车删除该水果, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 真删
          // 移除 购物车 cartList中的这个值
          // console.log(this.cartList.indexOf(data));
          let index = this.cartList.indexOf(data);
          this.cartList.splice(index, 1);
          // 删除 Vuex中的数据
          this.$store.commit("removeFruit", data);
        })
        .catch(() => {
          // 后悔了
        });
    },
    // 清空购物车
    payMoney(){
      // 删除cartList的所有数据
      // 从前往后删除 数组的索引会变 所以需要全部删除 要从后往前
      for (let index = this.cartList.length-1; index >=0; index--) {
        // Vuex中的数据也要全部删除
        this.$store.commit("removeFruit", this.cartList[index]);
        // 再删除 本地数组的
        this.cartList.splice(index,1);
      }
    }
  },
  // 组件打开时 用对象生成数组
  created() {
    // 简化代码
    let cartData = this.$store.state.cartData;
    for (const key in cartData) {
      // 添加到数组中
      this.cartList.push(cartData[key]);
    }
  }
};
</script>
<style >
.icon {
  width: 150px;
  height: 150px;
}
</style>