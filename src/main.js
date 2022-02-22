import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

//登録情報初期値出力 register component
Vue.directive("name", {
  bind(el, binding) {
    el.value = binding.value
  }
})
Vue.directive("capacity", {
  bind(el, binding) {
    el.value = binding.value
  }
})
Vue.directive("length", {
  bind(el, binding) {
    el.value = binding.value
  }
})
Vue.directive("width", {
  bind(el, binding) {
    el.value = binding.value
  }
})


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
