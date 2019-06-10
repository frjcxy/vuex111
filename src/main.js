import Vue from 'vue'
import App from './App.vue'

// 饿了吗UI的导入 注册 已经使用CDN抽取
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 导入路由
import router from './lib/router'

Vue.config.productionTip = false

// 导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 仓库的逻辑
const store = new Vuex.Store({
  // 仓库数据
  state: {
    // 购物车数据
    cartData: {}
  },
  // 方法
  mutations: {
    // 加入购物车的方法
    add2Cart(state, good) {
      // 判断对象中是否存在这个key
      if (state.cartData[good.title]) {
        // 存在
        state.cartData[good.title].buycount++
      } else {
        // 不存在
        state.cartData[good.title] = good
        // 额外的增加一个购买个数
        state.cartData[good.title].buycount = 1
      }
    }
  }
})

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上 把仓库
  router,
  // 挂载到顶级Vue实例上
  store
}).$mount('#app')
