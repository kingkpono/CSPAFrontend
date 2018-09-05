// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'es6-promise/auto'
import Vuex from 'vuex'
import VueAlertify from "vue-alertify"
import qs from 'qs'
import localStorage from "./localStorage"

Vue.use(VueAlertify, {
  transition: 'zoom',
  notifier: {
    // auto-dismiss wait time (in seconds)
    delay: 1,
    // default position
    position: 'top-right',
    // adds a close button to notifier messages
    closeButton: false
  },
})


const http = axios.create({
  baseURL: 'http://162.144.33.194:8000/api/',
  timeout: 30000,
  headers: { 'Authorization':'Basic a3Bvbm8uYWtwYWJpb0BzYnRlbGVjb21zLmNvbTphbG1vbmQuMg==','Content-Type': 'application/json'},
 });


Vue.use(Vuex, store)
const store = new Vuex.Store({
  state: {
    count: 2,
    staffEditScope:[],
    sectorEditScope:[],
    clientEditScope: []
  },
  mutations: {
    increment (state) {
      state.count++
    },
    editStaffScope(state, scope){
      state.staffEditScope = scope
    },
    editSectorScope(state, scope){
      state.sectorEditScope = scope
    },
    editClientScope(state, scope){
      state.clientEditScope = scope
    }
  }
})

//axios.interceptors.request.use(function (config) {
  //console.log(localStorage.get())
  //return config;
//}, function (error) {
  // Do something with request error
  //return Promise.reject(error);
//});

Vue.use(VueAxios, http)
Vue.use(ElementUI, { locale })
Vue.use(qs);
Vue.use(BootstrapVue)

router.beforeEach((to, from, next) => {
  if(to.path !== '/auth/login'){
    localStorage.get() ?  next() :  next({ path:'/auth/login'})
  }else{
    next();
  }
})
/* eslint-disable no-new */
Vue.prototype.$localStorage = localStorage;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

