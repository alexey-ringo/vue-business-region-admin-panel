import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/ru-RU';
import AuthService from './services/AuthService';
import MessageService from './services/MessageService';
import DateTimeService from './services/DateTimeService';
import UserService from './services/UserService';
import ResponseInterceptor from './interceptors/ResponseInterceptor';
import Constants from './constants/Constants';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/scss/main.scss';
import 'tailwindcss/tailwind.css';

// mock
import './fake-db/index';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI, { locale });
Vue.use(VueAxios, axios);
Vue.use(new AuthService('AuthService', '$services'));
Vue.use(new DateTimeService('DateTimeService', '$services'));
Vue.use(new MessageService('MessageService', '$services'));
Vue.use(new UserService('UserService', '$services'));
Vue.use(ResponseInterceptor);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App)
}).$mount('#app');
