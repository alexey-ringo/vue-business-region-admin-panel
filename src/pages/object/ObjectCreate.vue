<template>
  <div class="user-page-wrapper">
    <div class="g-container">
      <div class="user-create">
        <h1 class="title">Добавить объект</h1>
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
                      <p>
                        <input class="form-input-check" type="checkbox" checked>
                        <label class="form-label form-label-check">{{ selectedRegion.name }}</label>
                      </p>
                      <div v-if="roleId !== adminRoleId" class="cursor-pointer" @click="removeSelectedRegion(selectedRegion.id)">
                        <img class="region-list__icon" src="@/assets/images/svg/close.svg" alt="">
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="form-item">
                  <label class="form-label">Вид объекта*</label>
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
                        </el-option>
                      </el-select>
                    </template>
                  </div>
                  <p v-show="selectedBusinessRegionIds.length === 0" class="message-error">Выберите хотя бы один бизнес-регион</p>
                </div>
                <div class="form-item">
                  <label class="form-label">Название*</label>
                  <input class="form-input" :class="{'error' : !username}" type="text" v-model="username">
                  <p v-show="!username" class="message-error">Это поле обязательно к заполнению</p>
                </div>
                <div class="form-item-wrapper">
                  <div class="form-item">
                    <label class="form-label">Телефон 1</label>
                    <input class="form-input" type="tel" v-model="phone_number">
                  </div>
                  <div class="form-item">
                    <label class="form-label">Телефон 2</label>
                    <input class="form-input" type="tel" v-model="phone_number">
                  </div>
                </div>
                <div class="form-item-wrapper">
                  <div class="form-item">
                    <label class="form-label">Email 1</label>
                    <input class="form-input" type="email" v-model="email">
                  </div>
                  <div class="form-item">
                    <label class="form-label">Email 2</label>
                    <input class="form-input" type="email" v-model="email">
                  </div>
                </div>
                <div class="form-item-wrapper">
                  <div class="form-item">
                    <label class="form-label">Год сдачи объекта*</label>
                    <input class="form-input" :class="{'error' : !email}" type="email">
                    <p v-show="!username" class="message-error">Это поле обязательно к заполнению</p>
                  </div>
                  <div class="form-item">
                    <label class="form-label">Ссылка URL</label>
                    <input class="form-input" type="text">
                  </div>
                </div>
                <div class="form-item">
                  <p class="form-label"><b>Соц. сети</b></p>
                  <div class="socials-list">
                    <p>Добавьте соц. сети</p>
                  </div>
                  <table class="socials-table">
                    <tr class="socials-table__head">
                      <th>Название соц. сети</th>
                      <th>Ссылка</th>
                      <th>Иконка</th>
                    </tr>
                    <tr>
                      <td>VK</td>
                      <td class="pink">https://vk.com/svetokna</td>
                      <td>Иконка</td>
                    </tr>
                    <tr>
                      <td>Facebook</td>
                      <td class="pink">https://facebook.com/svetokna_group</td>
                      <td>Иконка</td>
                    </tr>
                  </table>
                  <div class="btn-wrapp">
                    <button class="btn btn-gray" @click="AddSocialsdialog = true">Добавить соц. сеть</button>
                    <!-- TODO вынести в отдельный компонент AddSocials-->
                    <el-dialog title="Добавить соц. сеть" :visible.sync="AddSocialsdialog">
                      <!-- TODO-->
                      <template>
                        <AddSocials/>
                      </template>
                      <div class="form-item">
                        <label class="form-label">Название соц. сети</label>
                        <div class="form-select-wrapper">
                          <template>
                            <el-select
                              :disabled="roleId === adminRoleId"
                              v-model="selectedBusinessRegionIds"
                              multiple
                              :filterable="true"
                              collapse-tags
                              placeholder="Название соц. сети"
                              class="form-select">
                              <el-option
                                v-for="region in businessRegions"
                                :key="region.id"
                                :label="region.name"
                                :value="region.id">
                              </el-option>
                            </el-select>
                          </template>
                        </div>
                      </div>
                      <div class="form-item">
                        <label class="form-label">Ссылка</label>
                        <input class="form-input" type="text">
                      </div>
                      <div class="form-item">
                        <p class="form-label">Иконка</p>
                        <div class="social-icon">
                          <img src="../../assets/images/socials/vk.svg" alt="">
                        </div>
                      </div>
                      <div class="add-socials__footer">
                        <button class="btn btn-top btn-green" @click="AddSocialsdialog = false">
                          Сохранить
                        </button>
                        <button class="btn btn-top btn-gray" @click="AddSocialsdialog = false">
                          Закрыть
                        </button>
                      </div>
                    </el-dialog>
                    <button class="btn btn-top btn-gray-border">Удалить соц. сеть</button>
                  </div>
                </div>
                <div class="form-item">
                  <label class="form-label">Девелопер*</label>
                  <input class="form-input" :class="{'error' : !email}" type="text">
                  <p v-show="!username" class="message-error">Это поле обязательно к заполнению</p>
                </div>
                <div class="form-item">
                  <label class="form-label">Проектная организация</label>
                  <input class="form-input" :class="{'error' : !email}" type="text">
                </div>
                <div class="form-item">
                  <label class="form-label">Партнер(ы) REHAU*</label>
                  <input class="form-input" :class="{'error' : !email}" type="text">
                  <p v-show="!username" class="message-error">Это поле обязательно к заполнению</p>
                </div>
                <div class="form-item">
                  <p class="text-small">
                    Если партнеров несколько, то они вводятся через запятую.
                  </p>
                </div>
                <div class="form-item">
                  <label class="form-label">Описание</label>
                  <textarea class="form-input form-textarea"></textarea>
                </div>
                <div class="form-item">
                  <label class="form-label">Фотографии</label>
                  <div class="galery">
                    <div class="galery__item">
                      <img src="../../assets/images/galery-1.jpg" alt="">
                    </div>
                    <div class="galery__item">
                      <img src="../../assets/images/galery-1.jpg" alt="">
                    </div>
                    <div class="galery__item">
                      <img src="../../assets/images/galery-1.jpg" alt="">
                    </div>
                    <div class="galery__item">
                      <img src="../../assets/images/galery-1.jpg" alt="">
                    </div>
                  </div>
                  <div class="btn-wrapp">
                    <button class="btn btn-gray">Загрузить фотографию объекта</button>
                    <button class="btn btn-top btn-gray-border">Удалить фотографию объекта</button>
                  </div>
                </div>
              </div>
              <div class="content-item">
                <div class="form-item">
                  <img src="../../assets/images/map.jpg" alt="">
                </div>
                <div class="form-item">
                  <p class="text-small">
                    Вид иконки зависит от выбора бизнес-региона
                  </p>
                </div>
                <div class="form-item">
                  <label class="form-label">Код КЛАДР</label>
                  <input class="form-input" type="text" v-model="username">
                </div>
                <div class="form-item">
                  <label class="form-label">Код ФИАС</label>
                  <input class="form-input" type="text" v-model="username">
                </div>
                <div class="form-item">
                  <label class="form-label">Адрес</label>
                  <input class="form-input" type="text" v-model="username">
                </div>
                <div class="form-item-wrapper">
                  <div class="form-item">
                    <label class="form-label">Координата 1*</label>
                    <input class="form-input" :class="{'error' : !email}" type="email" v-model="email">
                    <p v-show="!username" class="message-error">Это поле обязательно к заполнению</p>
                  </div>
                  <div class="form-item">
                    <label class="form-label">Координата 2*</label>
                    <input class="form-input" :class="{'error' : !email}" type="email" v-model="email">
                    <p v-show="!username" class="message-error">Это поле обязательно к заполнению</p>
                  </div>
                </div>
                <div class="form-item">
                  <input id="active" class="form-input-check"
                         type="checkbox" v-model="is_active">
                  <label for="active" class="form-label form-label-check">Активный</label>
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

import AddSocials from '@/components/AddSocials.vue';

export default {
  name: 'ObjectCreate',
  components: {
    AddSocials
  },
  props: {

  },
  data() {
    return {
      AddSocialsdialog: true,
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

      generatePassword: false,
      adminRoleId: null
    }
  },
  created() {
    this.$store.dispatch('user/fetchRoles')
      .then(() => {
        this.adminRoleId = this.$store.getters['user/getAdminRoleId']
      })
    this.$store.dispatch('business_region/fetchRegions')
  },
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
    removeSelectedRegion(id) {
      this.selectedBusinessRegionIds = this.selectedBusinessRegionIds.filter(regionId => regionId !== id);
    },
    clearSelectedRegions() {
      this.selectedBusinessRegionIds = [];
    },
    createUser() {
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
        this.$store.dispatch('user/addUser', user);
      }
    },
    dataIsValid() {
      return this.email && this.username && this.full_name
        && this.phone_number && this.roleId && this.selectedBusinessRegionIds.length > 0
        && (this.generatePassword || (this.password && this.password === this.confirmedPassword));
    },
    closeUser() {
      this.$router.push({ name: 'users-list' })
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
      return this.selectedBusinessRegionIds.map(id => regionsMap.get(id));
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

.text-small {
  font-size: 14px;
  line-height: 17px;
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

.form-textarea {
  height: 210px;
  overflow-y: auto;
  padding: 10px;
  outline: none;
  border-radius: 0;
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

.socials-list {
  padding: 15px;
  background: #FFFFFF;
  text-align: center;
  margin-bottom: 15px;

  font-style: italic;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #4E4E4E;
}

.socials-table {
  margin-bottom: 15px;
}

.socials-table th, td {
  text-align: left;
  padding: 15px;
}

.socials-table tr.socials-table__head {
  background: transparent;
}

.socials-table tr {
  background: #FFFFFF;
}

.socials-table tr:hover {
  background: #E5E5E5;
}

.socials-table tr.socials-table__head:hover {
  background: transparent;
}

.socials-table th {
  border-bottom: 1px solid #000000;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
}

.socials-table td {
  font-size: 18px;
  line-height: 24px;
  cursor: pointer;
}

.galery {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px -5px;
}

.galery__item {
  width: 30%;
  overflow: hidden;
  padding: 0 5px;
}

.galery__item img {
  object-fit: cover;
}

</style>
