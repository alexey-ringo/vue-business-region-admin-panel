import axios from '@/axios';
import Service from './Service';

export default class UserService extends Service {
    constructor(name = 'AuthService', namespace = null, ...args) {
        super(name, namespace);
    }

    async addUser(user) {
        await axios.post('/api/v1/users', user);
    }

    async getUsers(params) {
      const response = await axios.get('/api/v1/users', { params });
      return response.data.data;
    }

    async updateUser(user) {
        return axios.patch(`/api/v1/users/${user.id}`, user);
    }

    async deleteUser(id) {
        await axios.delete(`/api/v1/users/${id}`)
    }

    async getUser(id) {
      const response = await axios.get(`/api/v1/users/${id}`);
      return response.data.data;
    }
}
