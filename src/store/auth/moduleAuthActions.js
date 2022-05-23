import qs from 'qs';
import axios from '@/axios';

export default {
    login({ commit }, item) {
        return new Promise((resolve, reject) => {
            commit('SET_WITH_CREDENTIALS')
            axios({
                method: 'post',
                url: '/api/v1/auth/login',
                data: qs.stringify({
                    username: item.username,
                    password: item.password
                }),
                headers: {
                    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            })
            .then((response) => {
                resolve(response);
            })
            .catch((error) => { reject(error) });
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            commit('SET_JSON_CONTENT');
            axios.post('/api/v1/auth/logout')
            .then((response) => {
                commit('REMOVE_AUTH')
                resolve(response)
            })
            .catch((error) => { reject(error) });
        })
    },
    forgotPassword({ commit }, item) {
        return new Promise((resolve, reject) => {
            commit('SET_JSON_CONTENT');
            axios.post('/api/v1/auth/forgot-password', item)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => { reject(error) });
        })
    },
    resetPassword({ commit }, item) {
        return new Promise((resolve, reject) => {
            commit('SET_JSON_CONTENT');
            axios.post('/api/v1/auth/reset-password', item)
            .then((response) => {
                resolve(response)
            })
            .catch((error) => { reject(error) })
        })
    }
}
