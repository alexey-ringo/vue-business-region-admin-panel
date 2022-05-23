<template>
  <div class="fs full-screen">
    <div class="fs-content-wrapp">
      <img class="fs-logo" src="../../assets/images/svg/logo.svg" alt="">
      <div class="fs-content">
        <div class="fs-title">Интерактивная карта REHAU</div>
        <div class="login-form">
          <label
            class="fs-label fs-error"
            v-if="wrongLogin">Неправильное имя пользователя или пароль
          </label>
          <label
            class="fs-label fs-green"
            v-if="recoveryPromise">Если пользователь с таким email существует
            - вы скоро получите письмо
          </label>
          <label class="fs-label">Имя</label>
          <div class="fs-input">
            <input v-model="username"/>
          </div>
          <label class="fs-label">Пароль</label>
          <div class="fs-input fs-input--pass">
            <input type="password" v-model="password"/>
          </div>
          <div class="fs-item">
            <label
              class="fs-pink"
              v-if="inviteRecoveryDialog"
              @click="recoveryDialog">
              Забыли имя пользователя?
            </label>
            <button class="btn btn-login btn-green" type="button" @click="login">
              Войти
              <span class="fs-icon">
                <img src="../../assets/images/svg/arrow-right.svg" alt="">
              </span>
            </button>
          </div>
          <div v-if="showRecoveryDialog">
            <label class="fs-label">Email</label>
            <div class="fs-input">
              <input v-model="email"/>
            </div>
            <label class="fs-label fs-error" v-if="wrongEmail">Неправильный email</label>
            <button
              class="btn btn-email btn-green mt-4" type="button" @click="recovery">
              Выслать письмо для подтверждения
              <span class="fs-icon">
                <img src="../../assets/images/svg/arrow-right.svg" alt="">
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            email: '',
            inviteRecoveryDialog: true,
            showRecoveryDialog: false,
            wrongLogin: false,
            recoveryPromise: false,
            wrongEmail: false
        }
    },
    methods: {
        async login() {
            const payload = {
                username: this.username,
                password: this.password
            };
            try {
                await this.$store.dispatch('auth/login', payload);
                await this.$store.dispatch('user/fetchAuthUser');
                await this.$router.push({ name: 'users-list' });
            } catch (error) {
                if (error.response.status === 422) {
                    this.wrongLogin = true
                    this.wrongEmail = false
                }
            }
        },
        async recovery() {
            const payload = {
                email: this.email
            }
            try {
                await this.$store.dispatch('auth/forgotPassword', payload);
                this.recoveryPromise = true
                this.showRecoveryDialog = false
                this.wrongLogin = false
            } catch (error) {
                if (error.response.status === 422) {
                    this.wrongEmail = true
                    this.wrongLogin = false
                }
            }
        },
        recoveryDialog() {
            this.showRecoveryDialog = true
            this.inviteRecoveryDialog = false
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
