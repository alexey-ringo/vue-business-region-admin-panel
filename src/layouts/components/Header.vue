<template>
  <div>
    <header class="header">
      <div class="container">
        <div class="header-wrapp">
          <a class="logo">
            <img class="logo-img" src="../../assets/images/svg/logo.svg" alt="">
          </a>
          <nav class="header-wrapp__nav">
            <ul class="nav-list">
              <li class="nav-list__item" :class="{'active': ['partners-list'].includes($route.name)}">
                <router-link :to="{ name: 'partners-list' }" class="nav-list__link">Партнеры</router-link>
              </li>
              <li class="nav-list__item" :class="{'active': ['objects'].includes($route.name)}">
                <router-link :to="{ name: 'objects-list' }" class="nav-list__link">Объекты</router-link>
              </li>
              <li class="nav-list__item">
                <router-link :to="{ name: '' }" class="nav-list__link">Бизнес-регионы</router-link>
              </li>
              <li class="nav-list__item" :class="{'active': ['users-list'].includes($route.name)}">
                <router-link :to="{ name: 'users-list' }" class="nav-list__link">Пользователи</router-link>
              </li>
              <li class="nav-list__item">
                <router-link :to="{ name: '' }" class="nav-list__link">Импорт данных</router-link>
              </li>
              <li class="nav-list__item">
                <router-link :to="{ name: '' }" class="nav-list__link">Перейти к карте</router-link>
              </li>
            </ul>
          </nav>
          <div class="header-wrapp__right">
            <div @click="showProfileMenu" class="profile">
              <div class="profile__box">
                <div class="profile__avatar">
                  <!-- <img class="profile__img" src="../../assets/images/svg/auth-avatar.svg" alt="">-->
                  <img class="profile__img" src="../../assets/images/svg/user.svg" alt="">
                </div>
                <div class="profile__title">{{ authUser.username }}</div>
              </div>
              <ul v-if="showProfile" class="profile-popup">
                <li class="profile-popup__item">
                  <router-link :to="{ name: 'user-edit', params: { userId: authUser.id } }" class="profile-popup__link">
                    <p class="profile-popup__title">Профиль</p>
                    <p class="profile-popup__edit">Изменить данные профиля</p>
                  </router-link>
                </li>
                <li class="profile-popup__item">
                  <div @click="logout" class="profile-popup__link">
                    <p class="profile-popup__title">Выйти</p>
                    <p class="profile-popup__edit">Выйти из панели управления</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="settings">
              <div class="settings__box">
                <img class="settings__img" src="../../assets/images/svg/setting.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            showProfile: false
        }
    },
    created() {},
    methods: {
        showProfileMenu() {
            if (this.showProfile) {
                this.showProfile = false
            } else {
                this.showProfile = true
            }
        },
        hideProfileMenu() {
            if (this.showProfile) {
                this.showProfile = false
            }
        },
        logout() {
            this.$store.dispatch('auth/logout')
                .then(() => {
                    this.$router.push({ name: 'page-login' })
                })
        }
    },
    computed: {
        authUser() {
            return this.$store.getters['user/getAuthUser']
        }
    }
}
</script>

<style scoped>
.header {
  padding: 10px 0;
  border-bottom: 1px solid #BFBFBF;
  margin-bottom: 30px;
}

.header-wrapp {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 82px;
}

.header-wrapp__right {
  display: flex;
  align-items: center;
}

.logo {
  min-width: 140px;
  min-height: 45px;
}

.logo-img {
  width: 140px;
  height: 45px;
}
</style>
