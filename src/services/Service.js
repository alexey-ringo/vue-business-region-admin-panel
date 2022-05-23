export default class Service {
    constructor(name, namespace) {
        const lettersRegx = /^[_$A-Za-z]+$/;
        if (namespace) {
            if (typeof namespace === 'string' && namespace.match(lettersRegx)) {
                this._$namespace = namespace;
            } else {
                throw new Error('Service instantiation: Invalid namespace.');
            }
        }
        if (typeof name === 'string' && name.match(lettersRegx)) {
            this._$name = name;
        } else {
            throw new Error('Service instantiation: Invalid service name.');
        }
    }

    install(Vue) {
        if (this._$namespace) {
            if (!Vue.prototype[this._$namespace]) {
                Vue.prototype[this._$namespace] = {};
            }
            Vue.prototype[this._$namespace][this._$name] = this;
        } else {
            Vue.prototype[this._$name] = this;
        }
        this._vm = Vue.prototype;
    }
}
