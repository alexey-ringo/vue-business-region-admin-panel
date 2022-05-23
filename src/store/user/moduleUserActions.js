import axios from '@/axios';

export default {
    async fetchRoles({ commit }) {
        const response = await axios.get('/api/v1/roles');
        commit('SET_ROLES', response.data.data);
    },
    async fetchAuthUser({ commit }) {
        const response = await axios.get('/api/v1/users/me');
        commit('SET_AUTH_USER', response.data.data);
    }
}
