import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from "vue-axios";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import axios from "axios";

import App from './App.vue';
import Home from "@/components/Home";
import ShowResult from "@/components/ShowResult";
import Login from "@/components/Login";
import History from "@/components/History";
import Register from "@/components/Register";

Vue.use(Antd);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

axios.defaults.baseURL = '/api';
Vue.prototype.$axios = axios;
Vue.prototype.$token = {str:''};

Vue.config.productionTip = false;

let routes = [
    {
        path: '/',
        redirect: {name:'home'},
        name: 'root'
    },
    {
        path: '/home',
        component: Home,
        name: 'home'
    },
    {
        path: '/result',
        component: ShowResult,
        name: 'result',
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
    },
    {
        path: '/register',
        component: Register,
        name: 'register',
    },
    {
        path: '/history',
        component: History,
        name: 'history',
    }
];

const router = new VueRouter({routes})

new Vue({
    render: h=>h(App),
    router
}).$mount('#app');
