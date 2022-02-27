import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import Register from '../components/Register.vue';
import Detail from '../components/Detail.vue';
import Auth from '../components/Auth.vue';

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/register', component: Register },
    { path: '/auth', component: Auth },
    { path: '/detail/:id', component: Detail },
    
  ]
})