<template>
  <div class="search-wrapper">
    <div class="search">
      <div class="search-box">
        <img class="search-icon" src="@/assets/images/svg/search.svg" alt="">
        <input type="search" v-model="queryString"
               class="search-input" placeholder="Поиск пользователя">
      </div>
    </div>
    <div v-if="isNotFound" class="search-result">
      <p class="search-result__text search-result__text--bold">
        К сожалению, по запросу «admin123» ничего не найдено.
      </p>
      <p class="search-result__text">
        Проверьте правильность запроса и повторите поиск.
      </p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Search',
    props: {
        isNotFound: Boolean
    },
    data() {
        return {
            queryString: ''
        }
    },
    watch: {
        queryString(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.$emit('onQueryStringInput', this.queryString)
            }
        }
    },
    methods: {}
}
</script>

<style scoped>
.search {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 25px;
}
.search-box {
  position: relative;
  width: 340px;
  padding: 12px 45px 12px 25px;
  border-bottom: 1px solid #BFBFBF;
}

.search-input {
  width: 100%;
  background: transparent;
  border: none;
}

.search-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
}

.search-result__text {
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 10px;
}

.search-result__text--bold {
  font-size: 20px;
  line-height: 24px;
}
</style>
