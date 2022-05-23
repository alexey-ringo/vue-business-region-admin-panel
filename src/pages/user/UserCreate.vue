<template>
  <div class="user-page-wrapper">
    <div class="g-container">
      <div class="user-create">
        <h1 class="title">Новый пользователь</h1>
        <div class="btn-wrapper">
          <button class="btn btn-top btn-green" @click="createUser">Сохранить</button>
          <button class="btn btn-top btn-gray" @click="closeUser">Закрыть</button>
        </div>
      </div>
      <div class="create">
        <div class="tabs">
          <div class="tab" :class="{' active': (tab === 0), active: (tab === 0) }"  @click="tab = 0">Общая информация</div>
          <div class="tab" :class="{' active': (tab === 1), active: (tab === 1) }"  @click="tab = 1">Параметры</div>
        </div>
        <template v-if="tab === 0">
          <form class="form">
            <div class="form-item">
              <p class="text">
                Внимание! Поля обозначенные знаком * обязательны к заполнению!
              </p>
            </div>
            <div class="tab-content">
              <div class="content-item">
                <div class="form-item">
                  <label class="form-label">Имя пользователя*</label>
                  <input class="form-input" :class="{'error' : !username}" type="text" v-model="username">
                  <p v-show="!username" class="message-error">Это поле обязательно к заполнению</p>
                </div>
                <div class="form-item">
                  <label class="form-label">Полное имя*</label>
                  <input class="form-input" :class="{'error' : !full_name}" type="text" v-model="full_name">
                  <p v-show="!full_name" class="message-error">Это поле обязательно к заполнению</p>
                </div>
                <div class="form-item-wrapper">
                  <div class="form-item">
                    <label class="form-label">Телефон*</label>
                    <input class="form-input" :class="{'error' : !phone_number}" type="tel" v-model="phone_number">
                    <p v-show="!phone_number" class="message-error">Это поле обязательно к заполнению</p>
                  </div>
                  <div class="form-item">
                    <label class="form-label">E-mail*</label>
                    <input class="form-input" :class="{'error' : !email}" type="email" v-model="email">
                    <p v-show="!email" class="message-error">Это поле обязательно к заполнению</p>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-label">Бизнес-регион*</label>
                  <div class="form-select-wrapper">
                    <template>
                      <el-select
                        :disabled="roleId === adminRoleId"
                        v-model="selectedBusinessRegionIds"
                        multiple
                        :filterable="true"
                        collapse-tags
                        placeholder="Выберите или введите название"
                        class="form-select"
                        :class="{'error' : selectedBusinessRegionIds.length === 0}">
                        <el-option
                          v-for="region in businessRegions"
                          :key="region.id"
                          :label="region.name"
                          :value="region.id">
                          <p>
                            <input class="form-input-check" type="checkbox" :checked="businessRegionIsSelected(region.id)">
                            <label class="form-label form-label-check">{{ region.name }}</label>
                          </p>
                        </el-option>
                      </el-select>
                    </template>
                  </div>
                  <p v-show="selectedBusinessRegionIds.length === 0" class="message-error">Выберите хотя бы один бизнес-регион</p>
                </div>
                <div class="form-item">
                  <div class="region-title">
                    <p class="form-label">Название бизнес-региона</p>
                    <img class="users-table__icon" src="@/assets/images/svg/down.svg" alt="">
                  </div>
                  <ul class="region-list" :class="{'opacity-50' : roleId === adminRoleId}">
                    <li class="region-list__item" v-for="selectedRegion in selectedBusinessRegions" v-bind:key="selectedRegion.id">
                      <span :class="{'opacity-50': !authUserIsAdmin}">{{ selectedRegion.name }}</span>
                      <div v-if="roleId !== adminRoleId" class="cursor-pointer" @click="removeSelectedRegion(selectedRegion.id)">
                        <img class="region-list__icon" src="@/assets/images/svg/close.svg" alt="">
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="content-item">
                <div class="form-item">
                  <p class="form-label">Роль пользователя</p>
                  <template>
                    <el-select
                      v-model="roleId"
                      placeholder="Роль пользователя"
                      class="form-select"
                      :class="{'error' : roleId === null}">
                      <el-option
                        class="form-option"
                        v-for="role in roles"
                        :key="role.id"
                        :label="role.name"
                        :value="role.id">
                      </el-option>
                    </el-select>
                  </template>
                </div>
                <div class="form-item">
                  <input id="active" class="form-input-check"
                         type="checkbox" v-model="is_active">
                  <label for="active" class="form-label form-label-check">Активный</label>
                </div>
                <div class="form-item">
                  <p class="form-label form-label--bold">Изменить пароль</p>
                </div>
                <div class="form-item">
                  <input id="create-pass" class="form-input-radio" name="pass" type="radio" :value="true" v-model="generatePassword">
                  <label for="create-pass" class="form-label form-label-radio">Сгенерировать пароль</label>
                </div>
                <div class="form-item">
                  <input id="my-pass" class="form-input-radio" name="pass" type="radio" :value="false" v-model="generatePassword">
                  <label for="my-pass" class="form-label form-label-radio">Я укажу пароль сам</label>
                </div>
                <div class="form-item" :class="{'opacity-50' : generatePassword === true}">
                  <label class="form-label">Новый пароль</label>
                  <input :disabled="generatePassword === true" class="form-input" :class="{'cursor-default' : generatePassword === true}" type="text" v-model="password">
                </div>
                <div class="form-item" :class="{'opacity-50' : generatePassword === true}">
                  <label class="form-label">Подтвердить пароль</label>
                  <input :disabled="generatePassword === true" class="form-input" :class="{'cursor-default' : generatePassword === true}" type="text" v-model="confirmedPassword">
                </div>
                <div class="form-item">
                  <p class="text-small">Новый пароль будет выслан сотруднику на указаный e-mail.</p>
                </div>
              </div>
            </div>
          </form>
        </template>
        <template v-if="tab === 1">
          <div class="tab-content">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import Constants from '../../constants/Constants';

export default {
  name: 'UserCreate',
  components: {},
  props: {},
  data() {
    return {
      email: '',
      username: '',
      full_name: '',
      phone_number: '',
      roleId: null,
      selectedBusinessRegionIds: [],
      is_active: true,
      is_superuser: false,
      is_verified: false,
      password: '',
      confirmedPassword: '',

      tab: 0,
      steps: {
        step1: {}
      },

      generatePassword: false
    }
  },
  created() {},
  watch: {
    generatePassword() {
      this.password = '';
      this.confirmedPassword = '';
    },
    roleId(id) {
      if (id === this.adminRoleId) {
        const regions = this.$store.getters['business_region/getRegions'];
        this.selectedBusinessRegionIds = regions.map(region => region.id);
      }
    }
  },
  methods: {
    businessRegionIsSelected(id) {
        return this.selectedBusinessRegionIds.includes(id);
    },
    removeSelectedRegion(id) {
      this.selectedBusinessRegionIds = this.selectedBusinessRegionIds.filter(regionId => regionId !== id);
    },
    clearSelectedRegions() {
      this.selectedBusinessRegionIds = [];
    },
    async createUser() {
      if (this.dataIsValid()) {
        const user = {
          email: this.email,
          username: this.username,
          full_name: this.full_name,
          phone_number: this.phone_number,
          role: this.roleId,
          regions: this.selectedBusinessRegionIds,
          is_active: this.is_active,
          is_superuser: this.is_superuser,
          is_verified: this.is_verified,
          password: this.password,
          generatePassword: this.generatePassword
        }
        await this.$services.UserService.addUser(user);
        this.$services.MessageService.success('Пользователь успешно создан');
      }
    },
    dataIsValid() {
      return this.email && this.username && this.full_name
        && this.phone_number && this.roleId && (this.selectedBusinessRegionIds.length > 0 || this.roleId === Constants.USER_ROLE_CODE.ADMIN)
        && (this.generatePassword || (this.password && this.password === this.confirmedPassword));
    },
    closeUser() {
      this.$router.push({ name: 'users-list' });
    }
  },
  computed: {
    roles() {
      return this.$store.getters['user/getRoles'];
    },
    businessRegions() {
      return this.$store.getters['business_region/getRegions'];
    },
    selectedBusinessRegions() {
      const regionsMap = this.$store.getters['business_region/getRegionsMap'];
      return regionsMap instanceof Map && regionsMap.size > 0 ? this.selectedBusinessRegionIds.map(id => regionsMap.get(id)) : [];
    },
    adminRoleId() {
      return this.$store.getters['user/getAdminRoleId'];
    }
  }
}
</script>

<style scoped>
.user-page-wrapper {
  padding-bottom: 100px;
}

.user-create {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
}

.title {
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
}

.btn-wrapper {
  display: flex;
  padding: 15px 7.5px;
  justify-content: space-between;
  align-items: center;
  background: #E5E5E5;
  border: 1px solid #BFBFBF;
}

.btn-top {
  margin: 0 7.5px;
}

.create {
  border: 1px solid #BFBFBF;
}

.form {
  padding: 20px 25px 80px 25px;
  background: #F2F2F2;
}

.tabs {
  display: flex;
}

.tab {
  font-size: 18px;
  line-height: 24px;
  padding: 13px 24px;
  cursor: pointer;
}

.tab.active {
  background: #000000;
  color: #FFFFFF;
}

.tab-content {
  display: flex;
  justify-content: space-between;
}

.content-item {
  width: 50%;
  margin-right: 50px;
}

.text {
  font-size: 16px;
  line-height: 18px;
  color: #4E4E4E;
}

.form-item {
  margin-bottom: 20px;
}

.form-input {
  display: block;
  width: 100%;
  min-height: 32px;
  background: #FFFFFF;
  border: 1px solid #BFBFBF;
  margin-bottom: 5px;
  padding: 0 10px;
}

.form-input.error, .form-select.error {
  border: 1px solid #DD0060;
}

.message-error {
  color: #DD0060;
  font-size: 14px;
  line-height: 17px;
}

.form-label {
  display: block;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 10px;
}

.form-item-wrapper {
  display: flex;
  justify-content: space-between;
}

.form-item-wrapper .form-item {
  margin: 0 15px 20px 0;
  width: 50%;
}

.form-item-wrapper .form-item:nth-child(2n) {
  margin-right: 0;
}

.form-select {
  position: relative;
  display: block;
  width: 100%;
  min-height: 40px;
  background: #FFFFFF;
  border: 1px solid #000000;
  margin-bottom: 5px;
}

.form-label-check {
  position: relative;
  display: inline-block;
  padding-left: 29px;
  font-size: 18px;
  line-height: 20px;
  cursor: pointer;
}

.form-label-check::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 19px;
  height: 19px;
  background: #000000;
  border: 1px solid #000000;
}

.form-label-check::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 4px;
  width: 12px;
  height: 12px;
  background: url("../../assets/images/svg/checked.svg") no-repeat;
  opacity: 0;
  z-index: 2;
}

.form-input-check {
  display: none;
}

.form-input-check[type="checkbox"]:checked + .form-label-check::after {
  opacity: 1;
}

.form-label-radio {
  position: relative;
  display: inline-block;
  padding-left: 29px;
  font-size: 18px;
  line-height: 20px;
  cursor: pointer;
}

.form-label-radio::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid #4E4E4E;
}

.form-label-radio::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: #000000;
  border: 1px solid #4E4E4E;
  z-index: 2;
  opacity: 0;
}

.form-input-radio {
  display: none;
}

.form-input-radio[type="radio"]:checked + .form-label-radio::after {
  opacity: 1;
}

.form-label--bold {
  font-weight: 600;
}

.text-small {
  font-size: 16px;
  line-height: 18px;
  color: #4E4E4E;
}

/*TODO: select*/
.form-select {
  position: relative;
  display: block;
  width: 100%;
  min-height: 40px;
  background: #FFFFFF;
  border: 1px solid #000000;
  margin-bottom: 5px;
}

.el-select .el-input__suffix {
  background: #000000 !important;
}

.el-select .el-input .el-select__caret {
  color: #FFFFFF !important;
  font-size: 20px;
}

.el-select .el-select__caret {
  color: #FFFFFF !important;
  font-size: 20px;
}

.el-select .el-icon-arrow-up:before {
  color: #FFFFFF !important;
  font-size: 20px;
}

.el-select .el-input__prefix, .el-input__suffix {
  color: #FFFFFF !important;
  right: 0;
  width: 40px;
  height: 40px;
}

.el-select .el-input__suffix {
  color: #FFFFFF !important;
  right: 0;
  width: 40px;
  height: 40px;
}

.el-select .el-input__inner {
  padding-left: 10px !important;
  padding-right: 0 !important;
  border-radius: 0 !important;
  font-size: 18px !important;
  color: #000000 !important;
  line-height: 24px !important;
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: #000000 !important;
}

.el-select .el-input__inner:focus {
  border-color: #000000 !important;
}

.el-select-dropdown__list {
  padding: 0 !important;
}

.el-select-dropdown__item {
  padding: 10px !important;
  height: auto !important;
  color: #000000 !important;
}

.el-select-dropdown__item.hover, .el-select-dropdown__item:hover {
  background: #37A58C !important;
  color: #FFFFFF !important;
}

/*TODO: Регионы*/
.users-table__icon {
  width: 9px;
  height: 14px;
  margin-left: 5px;
}

.region-title {
  display: flex;
  align-items: baseline;
}

.region-list {
  border-top: 2px solid #000000;
}

.region-list__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 10px;
  font-size: 18px;
  line-height: 24px;
  transition: all .3s ease-in-out;
  background: #FFFFFF;
}

.region-list__item:hover {
  background: #E5E5E5;
}

.region-list__icon {
  width: 14px;
  height: 14px;
}

</style>
