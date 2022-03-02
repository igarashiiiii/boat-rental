import Vue from 'vue';
import VueRouter from 'vue-router';
import MainLayout from '../views/MainLayout.vue';
import Home from '../components/Home.vue';
import Register from '../components/Register.vue';
import Auth from '../components/Auth.vue';
import Detail from '../components/Detail.vue';
import Store from '../store/index';

Vue.use(VueRouter)

const routes = [{
        path: '/auth',
        name: 'auth',
        component: Auth
    },
    {
        path: '/',
        name: 'home',
        component: MainLayout,
        children: [{
            path: '',
            name: 'dashboard',
            component: Home,
        }, ]
    },
    {
        path: '/',
        name: 'home',
        component: MainLayout,
        children: [{
            path: '/register',
            name: 'register',
            component: Register
        }, ]
    }, {
        path: '/',
        name: 'home',
        component: MainLayout,
        children: [{
            path: '/detail/:id',
            name: 'details',
            component: Detail
        }, ]
    },
];

const router = new VueRouter({
    mode: 'hash',
    routes,
});

// 1st: path: /
// 2nd: path: /auth

router.beforeEach((to, from, next) => {
    console.log('Store.getters.userId', Store.getters.userId);
    if (to.name === 'auth') {
        next();
        return;
    }
    if (Store.getters.userId == null) {
        console.log('go auth');
        next({ name: 'auth' });
    } else {
        console.log('go nomal');
        next();
    }
})

export default router;