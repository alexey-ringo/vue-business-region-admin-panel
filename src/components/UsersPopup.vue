<template>
  <ul v-if="showPopup" class="users-popup" :class="{ 'right': rightPosition }">
    <li class="users-popup__item" @click="onEdit">
      <div class="users-popup__link">
        Редактировать
      </div>
    </li>
    <li class="users-popup__item" @click="onDelete">
      <div class="users-popup__link">
        Удалить
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UsersPopup',
  props: {
    userId: Number,
    showPopup: Boolean,
    rightPosition: Boolean
  },
  data() {
    return {
    }
  },
  methods: {
    onEdit() {
      this.$emit('onEdit', this.userId)
    },
    onDelete() {
      this.$emit('onDelete', this.userId)
    }
  }
}
</script>

<style scoped>

.users-popup {
  position: absolute;
  top: 0;
  width: 280px;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  transition: all .3s ease-in-out;
  z-index: 10000;
}

.right {
  right: 0;
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
