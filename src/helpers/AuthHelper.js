export default {
    checkAuth() {
        const name = 'userauth'
        const matches = document.cookie.match(new RegExp(
            `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
        ));
        return !!matches;
    },
    removeAuth() {
        document.cookie = 'userauth=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
}
