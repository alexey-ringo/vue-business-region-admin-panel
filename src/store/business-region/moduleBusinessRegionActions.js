import axios from '@/axios';

export default {
    async fetchRegions({ commit, state }) {
      if (state.regions.length === 0) {
        const response = await axios.get('/api/v1/business-regions');
        commit('SET_REGIONS', response.data.data);
      }
    }
}
