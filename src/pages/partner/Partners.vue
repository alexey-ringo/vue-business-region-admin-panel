<template>
  <div class="g-container">
    <div class="users-page">
      <h2 class="users-page__title">Список партнеров</h2>
      <button class="btn btn-green">Новый офис продаж</button>
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
                <span class="users-table__title">Тип партнера</span>
                <img class="users-table__icon" src="../../assets/images/svg/down.svg" alt="">
              </div>
            </th>
            <th>
              <div class="users-table__box">
                <span class="users-table__title">Видим на карте</span>
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
            </td>
            <td>
              <span class="users-table__desc">ООО “Компания Светлые Окна”</span>
            </td>
            <td>
              <span class="users-table__desc">Производитель окон</span>
            </td>
            <td>
              <span class="users-table__desc users-table__desc--pink">Да</span>
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
          <tr>
            <td>
              <span class="users-table__desc">9</span>
            </td>
            <td>
              <span class="users-table__desc">ООО “Компания Светлые Окна”</span>
            </td>
            <td>
              <span class="users-table__desc">Производитель окон</span>
            </td>
            <td>
              <span class="users-table__desc users-table__desc--pink">Да</span>
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
      <ul class="users-popup">
        <li class="users-popup__item">
          <a class="users-popup__link" href="">
            Редакировать в админ. системе
          </a>
        </li>
        <li class="users-popup__item">
          <a class="users-popup__link" href="">
            Редактировать на карте
          </a>
        </li>
        <li class="users-popup__item">
          <a class="users-popup__link" href="">
            Удалить
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
    name: 'Partners'
}

</script>

<style scoped>
.users-page {
  position: relative;
}

.users-table__box {
  display: flex;
  align-items: center;
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
}

.users-popup {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 280px;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  opacity: 0;
  transition: all .3s ease-in-out;
  z-index: 1;
}

.users-box:hover .users-popup {
  opacity: 1;
}

.users-popup__link {
  display: block;
  font-size: 16px;
  line-height: 19px;
  padding: 12px 10px;
  transition: all .3s ease-in-out;
}

.users-popup__link:hover {
  background: #E5E5E5;
}

.table-wrapper {
  overflow-x: auto;
  max-width: 100%;
}
</style>
