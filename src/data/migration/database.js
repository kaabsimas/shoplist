import Vue from 'vue';
import VueIdb from 'vue-idb';

Vue.use(VueIdb)

export default new VueIdb({
  database: 'grocery_list',
  schemas: [
    { products: '++id, name, created_at, updated_at' },
    { stores: '++id, name, address, coords, created_at, updated_at' },
    { prices: '++id, product_id, store_id, value, created_at, updated_at' },
    { items: '++id, list_id, product_id, price_id, amount, created_at, updated_at' },
    { lists: '++id, title, created_at, updated_at' }
  ]
})