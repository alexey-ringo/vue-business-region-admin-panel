import Service from './Service';
import AuthHelper from '../helpers/AuthHelper';

export default class AuthService extends Service {
    constructor(name = 'AuthService', namespace = null, ...args) {
        super(name, namespace);
    }

    checkAuth() {
        return AuthHelper.checkAuth();
    }

    removeAuth() {
        AuthHelper.removeAuth();
    }
}
