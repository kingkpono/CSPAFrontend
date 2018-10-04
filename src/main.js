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
import firebase from 'firebase'

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
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCesNCiMQh8aCb48p7QYcLTrlrusIwGDtg",
    authDomain: "cspa-95c03.firebaseapp.com",
    databaseURL: "https://cspa-95c03.firebaseio.com",
    projectId: "cspa-95c03",
    storageBucket: "cspa-95c03.appspot.com",
    messagingSenderId: "1029401930435"
  };
  firebase.initializeApp(config);
  firebase.auth();

const http = axios.create({
  baseURL: 'http://209.97.136.174:8001/api',
  timeout: 30000,
  headers: { 'Authorization':'Basic a3Bvbm8uYWtwYWJpb0BzYnRlbGVjb21zLmNvbTphbG1vbmQuMg==','Content-Type': 'application/json'},
 });


Vue.use(Vuex, store)
const store = new Vuex.Store({
  state: {
    count: 2,
    staffEditScope:[],
    sectorEditScope:[],
    prospectsEditScope: [],
    deviceEditScope: [],
    serviceTypeEditScope:[],
    salesTicketEditScope:[],
    supportTicketEditScope:[],
    cassEditScope:[],
    clientEditScope:[],
    companyEditScope:[],
    flexcomLineEditScope:[],
    user:localStorage.get()
  },
  mutations: {
    increment (state) {
      state.count++
    },
    editSalesTicketScope(state,scope){
      state.salesTicketEditScope = scope
    },
    editSupportTicketScope(state,scope){
      state.supportTicketEditScope = scope
    },
    editStaffScope(state, scope){
      state.staffEditScope = scope
    },
    editSectorScope(state, scope){
      state.sectorEditScope = scope
    },
    editClientScope(state, scope){
      state.clientEditScope = scope
    },
    editCompanyScope(state, scope){
      state.companyEditScope = scope
    },
    editProspectsScope(state, scope){
      state.prospectsEditScope = scope
    },
    editDeviceScope(state, scope){
      state.deviceEditScope = scope
    },
    editServiceTypeScope(state, scope){
      state.serviceTypeEditScope = scope
    },
    editCassScope(state,scope){
      state.cassEditScope = scope
    },
    editFlexcomLineScope(state,scope){
      state.flexcomLineEditScope = scope
    },
    userRole(state,scope){
      state.user = scope
    },


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




router.beforeEach( (to, from, next) => {
  if(to.path !== '/auth/login'){
    const assignedRole = localStorage.get().role;
    console.log(to)
    const meta = to.meta.role;
    const haveRole = meta.indexOf(assignedRole)!=-1;
    haveRole ? next(): next({ path:'/auth/login'})
  }else{
    next();
  }
})

/* eslint-disable no-new */
Vue.prototype.$localStorage = localStorage;
Vue.prototype.$firebase = firebase;


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

