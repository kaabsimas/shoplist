import Vue from 'vue';
import VueRouter from 'vue-router'
import Storage from 'vue-web-storage';  

Vue.use(Storage, {
  prefix: 'shoplist_',// default `app_`
  drivers: ['local'], // default 'local'
});

Vue.use(VueRouter)

import App from './views/App'
// import Hello from './views/Hello'
import Home from './views/Home'
// import Login from './views/Login'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }
        // {
        //     path: '/hello',
        //     name: 'hello',
        //     component: Hello,
        // },
        // {
        // 	path: '/login',
        // 	name: 'login',
        // 	component: Login,
        // }
    ],
});

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});