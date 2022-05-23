<template>
  <div class="pagination">
    <span>Страница</span>
    <ol class="pagination-list">
      <li class="pagination-list__item active">
        <a class="pagination-list__link" href="">{{ currentPage }}</a>
      </li>
      <li class="pagination-list__item" @click="onPrevious">
        <div class="pagination-arrow pagination-arrow-left pagination-arrow--disabled"></div>
      </li>
      <li class="pagination-list__item" @click="onNext">
        <div class="pagination-arrow pagination-arrow-right"></div>
      </li>
    </ol>
    <p class="pagination-count">из <span>{{ totalPages }}</span></p>
  </div>
</template>

<script>
export default {
    name: 'MultipleSelect',
    props: {
        currentPage: Number,
        totalPages: Number,
        isNextUsersPage: Boolean,
        isPreviousUsersPage: Boolean
    },
    data() {
        return {}
    },
    methods: {
        onNext() {
            this.$emit('onNext', this.currentPage + 1)
        },
        onPrevious() {
            this.$emit('onPrevious', this.currentPage - 1)
        }
    }
}
</script>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
}
.pagination-list {
  display: flex;
  align-items: center;
  margin: 0 15px;
}

.pagination-list__item {
  padding: 7px;
  text-align: center;
  margin: 0 5px;
}

.pagination-list__item.active {
  background: #E5E5E5;
}

.pagination-list__link {
  font-size: 18px;
  line-height: 24px;
}

.pagination-arrow {
  width: 10px;
  height: 10px;
  border-top: 2px solid #DD0060;
  border-right: 2px solid #DD0060;
  /*margin-right: 60px;*/
}

.pagination-arrow--disabled {
  border-color: #BFBFBF;
}

.pagination-arrow-left {
  transform: rotate(-135deg);
}

.pagination-arrow-right {
  transform: rotate(45deg);
}

.pagination-count {
  font-size: 18px;
  line-height: 24px;
}
</style>
