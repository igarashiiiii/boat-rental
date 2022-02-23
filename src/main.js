import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

//登録情報初期値出力 register component
// Vue.directive("name",{
//   bind(el, binding) {
//     console.log("カスタムbind")
//     el.value = binding.value
//   },
//   update(el, binding) {
//     console.log("カスタムupdate")
//     console.log(el,binding)
//   },
// })
// Vue.directive("capacity", {
//   bind(el, binding) {
//     el.value = binding.value
//     console.log("カスタムcapacity bind")
//   },
    
// })
// Vue.directive("length", {
//   bind(el, binding) {
//     el.value = binding.value
//   }
// })
// Vue.directive("width", {
//   bind(el, binding) {
//     el.value = binding.value
//   }
// })


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
