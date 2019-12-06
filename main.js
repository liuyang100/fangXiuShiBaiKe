import Vue from 'vue'
import App from './App'
// 阻止启动消息
Vue.config.productionTip = false

// 引入全局组件 线
import divider from './components/common/divider.vue';
Vue.component('divider',divider)
// 没有数据显示的页面
import noThing from './components/common/no-thing.vue';
Vue.component('no-thing',noThing)


App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
