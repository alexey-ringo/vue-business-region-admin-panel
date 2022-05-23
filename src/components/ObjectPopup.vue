<template>
  <ul v-if="showPopup" class="users-popup">
    <li class="users-popup__item">
      <div class="users-popup__link">
        Редакировать в админ. системе
      </div>
    </li>
    <li class="users-popup__item">
      <div class="users-popup__link">
        Редакировать на карте
      </div>
    </li>
    <li class="users-popup__item">
      <div class="users-popup__link">
        Удалить
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ObjectsPopup',
  props: {
    // userId: Number,
    // showPopup: Boolean
  },
  data() {
    return {
    }
  },
  methods: {
    onEdit() {
      // this.$emit('onEdit', this.userId)
    },
    onDelete() {
      // this.$emit('onDelete', this.userId)
    }
  }
}
</script>

<style scoped>

.users-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 280px;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  transition: all .3s ease-in-out;
  z-index: 1;
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
</style>
