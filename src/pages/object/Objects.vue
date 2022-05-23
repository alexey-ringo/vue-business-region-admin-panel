<template>
  <div class="g-container" @click="setDefaultPopup">
    <div class="users-page">
      <h2 class="users-page__title">Список объектов</h2>
      <button class="btn btn-green" @click="createObject">Новый объект</button>
      <Search :is-not-found="isNotFound" @onQueryStringInput="changeQueryString"></Search>
      <div class="table-wrapper">
        <table class="users-table">
          <thead class="users-table__head">
          <tr>
            <th>
              <div class="users-table__box">
                <span class="users-table__title">ID</span>
                <img class="users-table__icon" src="../../assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th>
              <div class="users-table__box">
                <span class="users-table__title">Название</span>
                <img class="users-table__icon" src="../../assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th>
              <div class="users-table__box">
                <span class="users-table__title">Вид объекта</span>
                <img class="users-table__icon" src="../../assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th>
              <div class="users-table__box">
                <span class="users-table__title">Виден на карте</span>
                <img class="users-table__icon" src="../../assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th>
              <div class="users-table__box">
                <span class="users-table__title">Год сдачи объекта</span>
                <img class="users-table__icon" src="../../assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th>
              <div class="users-table__box">
                <span class="users-table__title">Бизнес регион</span>
                <img class="users-table__icon" src="../../assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th>
              <div class="users-table__box">
                <span class="users-table__title">Куратор</span>
                <img class="users-table__icon" src="../../assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th>
              <div class="users-table__box">
                <span class="users-table__title">Доп. куратор</span>
                <img class="users-table__icon" src="../../assets/images/svg/down.svg" alt="">
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              <span class="users-table__desc">9</span>
              <div ref="idPopup">
                <Popup
                       :show-popup="idPopup"
                ></Popup>
              </div>
            </td>
            <td>
              <span class="users-table__desc">ЖК «Жемчужина моря»</span>
            </td>
            <td>
              <span class="users-table__desc">Жилой комплекс</span>
            </td>
            <td>
              <span class="users-table__desc users-table__desc--pink">Да</span>
            </td>
            <td>
              <span class="users-table__desc">2018</span>
            </td>
            <td>
              <span class="users-table__desc">WS_Mosk</span>
            </td>
            <td>
              <span class="users-table__desc">Виктория Ковальчук</span>
            </td>
            <td>
              <span class="users-table__desc">Александра Панкратова</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="users-table__desc">10</span>
            </td>
            <td>
              <span class="users-table__desc">ЖК «Посейдон»</span>
            </td>
            <td>
              <span class="users-table__desc">Жилой комплекс</span>
            </td>
            <td>
              <span class="users-table__desc users-table__desc--pink">Да</span>
            </td>
            <td>
              <span class="users-table__desc users-table__desc--pink">2019</span>
            </td>
            <td>
              <span class="users-table__desc">WS_Mosk</span>
              <span class="users-table__desc">BS_Mosk</span>
            </td>
            <td>
              <span class="users-table__desc">Виктория Ковальчук</span>
            </td>
            <td>
              <span class="users-table__desc">Александра Панкратова</span>
              <span class="users-table__desc">Владислав Ярушин</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :is-next-users-page="isNextUsersPage"
        :is-previous-users-page="isPreviousUsersPage"
        @onNext="changeCurrentPage"
        @onPrevious="changeCurrentPage"
      ></Pagination>
    </div>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination.vue'
import Search from '@/components/Search.vue'
import ObjectPopup from '@/components/ObjectPopup.vue'

export default {
  name: 'Objects',
  components: {
    Search,
    Pagination,
    // eslint-disable-next-line vue/no-unused-components
    ObjectPopup
  },
  data() {
    return {
      currentPageModel: 1,
      queryString: '',
      isNotFound: false,
      idPopup: false,
      usernamePopup: false,
      fullnamePopup: false,
      rolePopup: false,
      emailPopup: false,
      directionPopup: false,
      groupPopup: false,
      activePopup: false,
      ordering: [],
      ascIdOrdering: false,
      ascUsernameOrdering: false,
      ascFullNameOrdering: false,
      ascRoleOrdering: false,
      ascEmailOrdering: false,
      ascDirectionOrdering: false,
      ascBusinessRegionOrdering: false,
      ascActiveOrdering: false,
      descIdOrdering: false,
      descUsernameOrdering: false,
      descFullNameOrdering: false,
      descRoleOrdering: false,
      descEmailOrdering: false,
      descDirectionOrdering: false,
      descBusinessRegionOrdering: false,
      descActiveOrdering: false
    }
  },
  created() {
    this.$store.dispatch('user/fetchRoles')
      .then(() => {
        const params = {
          page: 0,
          page_size: 10
        }
        this.$store.dispatch('user/fetchUsers', params)
          .then(() => {
            this.setDefaultPopup()
          })
      })
    this.$store.dispatch('user/fetchAuthUser')
  },
  methods: {
    createObject() {
      this.$router.push({ name: 'object-create' });
    }
  }
}
</script>

<style scoped>
.users-page {
  position: relative;
}

.users-box {
  position: relative;
}

.users-page__title {
  margin: 30px 0;
  font-size: 24px;
  line-height: 29px;
}

.users-table {
  width: 100%;
  margin: 30px 0;
  border-collapse: collapse;
}

.users-table__head {
  border-bottom: 1px solid #000000;
}

.users-table__head th {
  text-align: left;
}

.users-table__title {
  font-weight: bold;
  font-size: 18px;
}

.users-table__icon {
  width: 9px;
  height: 14px;
  margin-left: 5px;
}

.users-table__desc {
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  display: block;
}

.users-table__desc--pink {
  color: #DD0060;
}

.users-table tr {
  cursor: pointer;
  transition: all .3s ease-in-out;
}

.users-table tr:hover {
  background: #E5E5E5;
}

.users-table th, .users-table td {
  padding: 8px;
  cursor: pointer;
}

.table-wrapper {
  overflow-x: auto;
  max-width: 100%;
}

.users-table__box {
  display: flex;
  align-items: center;
}

.users-table-rotate__icon {
  transform: rotate(180deg);
}
</style>
