<template>
  <div class="fs full-screen">
    <div class="fs-content-wrapp">
      <img class="fs-logo" src="../../assets/images/svg/logo.svg" alt="">
      <div class="fs-content">
        <div class="fs-title">
          Восстановление пароля
        </div>
        <div class="login-form">
          <label class="fs-label">Новый пароль</label>
          <div class="fs-input fs-input--pass">
            <input v-model="password"/>
          </div>
          <button class="btn btn-login btn-green" type="submit">
            Войти
            <span class="fs-icon">
              <img src="../../assets/images/svg/arrow-right.svg" alt="">
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import UrlHelper from '@/helpers/UrlHelper'

export default {
    name: 'ResetPassword',
    data() {
        return {
            username: '',
            password: '',
            token: ''
        }
    },
    created() {
        this.token = UrlHelper.getQueryParameter('token')
    },
    methods: {
        async login() {
            const payload = {
                password: this.password,
                token: this.token
            };
            try {
                await this.$store.dispatch('auth/resetPassword', payload);
                await this.$router.push({ name: 'page-login' });
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
.full-screen {
  padding-top: 200px;
  height: auto;
  display: block;
}

.fs-content-wrapp {
  width: 460px;
  margin: auto;
}

.fs-content {
  position: relative;
  padding: 30px;
  background: #FFFFFF;
  border: 1px solid #BFBFBF;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
}

.fs-title {
  font-weight: bold;
  font-size: 24px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 30px;
}
.fs-logo {
  width: 140px;
  margin-bottom: 30px;
}

.fs-error {
  font-size: 14px;
  line-height: 17px;
  color: #CF1322;
}

.fs-green {
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #37A58C;
}

.fs-input {
  background: #FFFFFF;
  border: 1px solid #BFBFBF;
  padding: 10px;
  margin: 10px 0;
}

.fs-input--pass {
  position: relative;
}

.fs-input--pass::after {
  content: "";
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  background: url("../../assets/images/svg/eye.svg") no-repeat;
  background-position: center center;
  width: 20px;
  height: 11px;
}

.fs-label {
  display: block;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  margin: 5px 0;
}

.fs-pink {
  font-size: 16px;
  line-height: 24px;
  color: #DD0060;
  cursor: pointer;
}

.btn-login {
  margin: 20px 0;
}

.btn-email {
  width: 100%;
}

.fs-icon {
  position: absolute;
  right: 13px;
  top: 50%;
  transform: translateY(-50%);
  width: 10px;
  height: 16px;
}

.fs-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
