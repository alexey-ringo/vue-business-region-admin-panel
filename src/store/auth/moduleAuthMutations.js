import axios from '@/axios';
import AuthHelper from '@/helpers/AuthHelper';

export default {
    SET_JSON_CONTENT() {
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    },
    SET_FORM_CONTENT() {
        axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
    },
    SET_WITH_CREDENTIALS() {
        axios.defaults.withCredentials = true;
    },
    REMOVE_AUTH() {
        AuthHelper.removeAuth();
    }
}
