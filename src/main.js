import Vue from 'vue'
import App from './App.vue'
import VS2 from 'vue-script2'

Vue.config.productionTip = false

Vue.use(VS2)

new Vue({
  render: h => h(App),
}).$mount('#app')
