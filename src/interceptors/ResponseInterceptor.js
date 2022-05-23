import axios from '@/axios';

const ResponseInterceptor = {
  install(Vue) {
    const vm = Vue.prototype;
    axios.interceptors.response.use((response) => response, (error) => {
      const { response } = error;
      const msg = (response && response.detail && response.detail.msg) ? response.detail.msg : 'Произошла ошибка запроса к серверу';
      if (response && response.status === 401) {
          vm.$services.AuthService.removeAuth();
          window.location.reload();
      } else {
        vm.$services.MessageService.error(msg);
      }
      return Promise.reject(error);
    })
  }
};

export default ResponseInterceptor;
