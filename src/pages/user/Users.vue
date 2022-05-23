<template>
  <div class="g-container">
    <div ref="active_popup">
      <Popup v-if="isAuthUserAsAdmin"
         v-click-outside="closePopup"
         :rightPosition="popup.rightPosition"
         :user-id="popup.userId"
         :show-popup="popup.show"
         @onEdit="editUser"
         @onDelete="deleteUser"
      ></Popup>
    </div>
    <div class="users-page">
      <h2 class="users-page__title">Пользователи</h2>
      <button v-if="isAuthUserAsAdmin" class="btn btn-green" @click="createUser">Новый пользователь</button>
      <Search :is-not-found="isNotFound" @onQueryStringInput="changeQueryString"></Search>
      <div class="table-wrapper">
        <table class="users-table">
          <thead class="users-table__head">
          <tr>
            <th @click="orders.id = changedOrderState('id', '-id', orders.id)">
              <div class="users-table__box">
                <span class="users-table__title">ID</span>
                <img :class="{'users-table-rotate__icon': orders.id === '-id', 'opacity-0': !['id', '-id'].includes(orders.id)}"
                     class="users-table__icon" src="@/assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th @click="orders.username = changedOrderState('username', '-username', orders.username)">
              <div class="users-table__box">
                <span class="users-table__title">Имя</span>
                <img :class="{'users-table-rotate__icon': orders.username === '-username', 'opacity-0': !['username', '-username'].includes(orders.username)}"
                     class="users-table__icon" src="@/assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th @click="orders.fullName = changedOrderState('full_name', '-full_name', orders.fullName)">
              <div class="users-table__box">
                <span class="users-table__title">Полное имя</span>
                <img :class="{'users-table-rotate__icon': orders.fullName === '-full_name', 'opacity-0': !['full_name', '-full_name'].includes(orders.fullName)}"
                     class="users-table__icon" src="@/assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th @click="orders.role = changedOrderState('role', '-role', orders.role)">
              <div class="users-table__box">
                <span class="users-table__title">Роль пользователя</span>
                <img :class="{'users-table-rotate__icon': orders.role === '-role', 'opacity-0': !['role', '-role'].includes(orders.role)}"
                     class="users-table__icon" src="@/assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th @click="orders.email = changedOrderState('email', '-email', orders.email)">
              <div class="users-table__box">
                <span class="users-table__title">Электронная почта</span>
                <img :class="{'users-table-rotate__icon': orders.email === '-email', 'opacity-0': !['email', '-email'].includes(orders.email)}"
                     class="users-table__icon" src="../../assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th @click="orders.direction = changedOrderState('direction', '-direction', orders.direction)">
              <div class="users-table__box">
                <span class="users-table__title">Направление</span>
                <img :class="{'users-table-rotate__icon': orders.direction === '-direction', 'opacity-0': !['direction', '-direction'].includes(orders.direction)}"
                     class="users-table__icon" src="@/assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th @click="orders.businessRegion = changedOrderState('business_region', '-business_region', orders.businessRegion)">
              <div class="users-table__box">
                <span class="users-table__title">Бизнес регион</span>
                <img :class="{'users-table-rotate__icon': orders.businessRegion === '-business_region', 'opacity-0': !['business_region', '-business_region'].includes(orders.businessRegion)}"
                     class="users-table__icon" src="@/assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th @click="orders.active = changedOrderState('is_active', '-is_active', orders.active)">
              <div class="users-table__box">
                <span class="users-table__title">Активный</span>
                <img :class="{'users-table-rotate__icon': orders.active === '-is_active', 'opacity-0': !['is_active', '-is_active'].includes(orders.active)}"
                     class="users-table__icon" src="@/assets/images/svg/down.svg" alt="">
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td @contextmenu.prevent="showPopup(user.id, `id${user.id}`)">
              <div class="users-box" :ref="`id${user.id}`">
                <span class="users-table__desc">{{ user.id }}</span>
              </div>
            </td>
            <td @contextmenu.prevent="showPopup(user.id, `username${user.id}`)">
              <div class="users-box" :ref="`username${user.id}`">
                <span class="users-table__desc">{{ user.username }}</span>
              </div>
            </td>
            <td @contextmenu.prevent="showPopup(user.id, `fullName${user.id}`)">
              <div class="users-box" :ref="`fullName${user.id}`">
                <span class="users-table__desc">{{ user.full_name }}</span>
              </div>
            </td>
            <td @contextmenu.prevent="showPopup(user.id, `role${user.id}`)">
              <div class="users-box" :ref="`role${user.id}`">
                <span class="users-table__desc">{{ getRole(user.role) }}</span>
              </div>
            </td>
            <td @contextmenu.prevent="showPopup(user.id, `email${user.id}`)">
              <div class="users-box" :ref="`email${user.id}`">
                <span class="users-table__desc">{{ user.email }}</span>
              </div>
            </td>
            <td @contextmenu.prevent="showPopup(user.id, `direction${user.id}`)">
              <div class="users-box" :ref="`direction${user.id}`">
                <span class="users-table__desc"></span>
              </div>
            </td>
            <td @contextmenu.prevent="showPopup(user.id, `regions${user.id}`)">
              <div class="users-box" :ref="`regions${user.id}`">
                <span class="users-table__desc truncate">{{ isUserAdmin(user) ? 'Все регионы' : businessRegionsString(user.regions) }}</span>
              </div>
            </td>
            <td @contextmenu.prevent="showPopup(user.id, `active${user.id}`, true)">
              <div class="users-box" :ref="`active${user.id}`">
                <span v-if="user.is_active" class="users-table__desc users-table__desc--green">Да</span>
                <span v-else class="users-table__desc users-table__desc--green">Нет</span>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <Pagination
        :current-page="page + 1"
        :total-pages="countPages"
        :is-next-users-page="isNextPage"
        :is-previous-users-page="isPreviousPage"
        @onNext="changeCurrentPage"
        @onPrevious="changeCurrentPage"
      ></Pagination>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue';
import Search from '@/components/Search.vue';
import Popup from '@/components/UsersPopup.vue';
import ClickOutside from 'vue-click-outside';

export default {
    name: 'Users',
    directives: {
        ClickOutside
    },
    components: {
        Search,
        Pagination,
        Popup
    },
    data() {
        return {
            queryString: '',
            isNotFound: false,
            popup: {
              show: false,
              userId: null,
              rightPosition: false
            },
            isNextPage: false,
            isPreviousPage: false,
            countPages: 0,
            users: [],
            orders: null
        }
    },
    async created() {
        this.orders = { ...this.sorting };
        await this.fetchUsers();
    },
    watch: {
        orders: {
            deep: true,
            async handler(newVal) {
                this.$store.commit('user/SET_SORTING', { ...newVal });
                await this.fetchUsers();
            }
        },
        async queryString(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.fetchUsers();
            }
        }
    },
    methods: {
        closePopup() {
            this.popup.show = false;
        },
        changedOrderState(ascName, descName, currentState) {
            if (currentState === null) {
                return ascName;
            }
            if (currentState === ascName) {
                return descName;
            }
            if (currentState === descName) {
                return null;
            }
        },
        isUserAdmin(user) {
            const adminRoleId = this.$store.getters['user/getAdminRoleId'];
            return user.role === adminRoleId;
        },
        businessRegionsString(ids) {
            const regionsMap = this.$store.getters['business_region/getRegionsMap'];
            return regionsMap instanceof Map && regionsMap.size > 0 ? ids.map(id => regionsMap.get(id).name).join() : '';
        },
        async fetchUsers() {
            let params = {
                page: this.page,
                page_size: this.perPage
            };
            const ordering = this.serializeOrdering();
            if (this.queryString.length === 0 && ordering.length === 0) {
                params = {
                    ...params
                };
            } else if (this.queryString.length === 0 && ordering.length > 0) {
                params = {
                    ...params,
                    ordering
                };
            } else if (this.queryString.length > 0 && ordering.length === 0) {
                params = {
                    ...params,
                    search_query: this.queryString
                };
            } else if (this.queryString.length > 0 && ordering.length > 0) {
                params = {
                    ...params,
                    search_query: this.queryString,
                    ordering
                };
            }
            const usersData = await this.$services.UserService.getUsers(params);
            this.isNextPage = usersData.next;
            this.isPreviousPage = usersData.previous;
            this.countPages = usersData.count;
            this.users = usersData.results;
        },
        serializeOrdering() {
            return Object.entries(this.orders).map(item => item[1]).filter(item => item !== null).join().trim();
        },
        async changeCurrentPage(page) {
            this.$store.commit('user/SET_PAGE', page);
            await this.fetchUsers();
        },
        changeQueryString(string) {
            this.queryString = string
        },
        getRole(roleId) {
            const role = this.$store.getters['user/getRole'](roleId)
            if (role && role.name) {
                return role.name
            }
            return '';
        },
        createUser() {
            this.$router.push({ name: 'user-create' });
        },
        editUser(userId) {
            this.$router.push({
                name: 'user-edit',
                params: { userId }
            });
        },
        async deleteUser(id) {
            this.popup.show = false;
            await this.$services.UserService.deleteUser(id);
            await this.fetchUsers();
        },
        showPopup(userId, ref, rightPosition = false) {
            const element = this.$refs[ref][0];
            if (element) {
                element.appendChild(this.$refs['active_popup']);
                this.popup.userId = userId;
                this.popup.show = true;
                this.popup.rightPosition = rightPosition;
            }
        }
    },
    computed: {
        roles() {
            return this.$store.getters['user/getRoles'];
        },
        perPage() {
            return this.$store.getters['user/getPerPage'];
        },
        page() {
            return this.$store.getters['user/getPage'];
        },
        sorting() {
            return this.$store.getters['user/getSorting'];
        },
        isAuthUserAsAdmin() {
            const adminRoleId = this.$store.getters['user/getAdminRoleId'];
            const authUser = this.$store.getters['user/getAuthUser'];
            return authUser.role === adminRoleId;
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
  max-width: 300px;
  display: block;
}

.users-table__desc--green {
  color: #37A58C;
}

.users-table tr {
  cursor: pointer;
  transition: all .3s ease-in-out;
}

.users-table tr:nth-child(even) {
  background-color: #E5E5E5;
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
