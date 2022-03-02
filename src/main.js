import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'


Vue.config.productionTip = false

// router.beforeEach((next) => {
//   if (store.getters.userId == null) {
//     next({ path: "/"});
//   } else {
//     next();
//   }
// })

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
