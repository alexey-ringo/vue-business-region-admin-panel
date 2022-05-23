import Vue from 'vue';
import Vuex from 'vuex';
import moduleAuth from './auth/moduleAuth';
import moduleUser from './user/moduleUser';
import moduleBusinessRegion from './business-region/moduleBusinessRegion';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth: moduleAuth,
        user: moduleUser,
        business_region: moduleBusinessRegion
    }
})
