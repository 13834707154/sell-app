import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/reset.css'
import router from '@/router/router.js'
import '@/common/index.scss'
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
