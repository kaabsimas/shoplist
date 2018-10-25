import Buefy from 'buefy';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Storage from 'vue-web-storage'; 
import './data/migration/database';
import Seeder from './data/seed/seeder';

import 'buefy/dist/buefy.css'

Vue.use(Storage, {
  prefix: 'shoplist_',// default `app_`
  drivers: ['local'], // default 'local'
});

Vue.use(VueRouter);
Vue.use(Buefy);

import App from './views/App'
import Home from './views/Home'
import List from './views/List'
// import products from './data/products.json'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/list/:id',
            name: 'list',
            component: List
        }
    ],
});

// if( ! Vue.$localStorage.hasKey('products') )
//     Vue.$localStorage.set('products', products);

const app = new Vue({
    el: '#app',
    components: { App },
    router
});

new Seeder( app );