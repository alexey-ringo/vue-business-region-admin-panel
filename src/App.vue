<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
      data() {
          return {}
      },
      async created() {
          await this.$store.dispatch('business_region/fetchRegions');
      }
  }
</script>

<style lang="scss"></style>
