<template>
  <div>
    <Header></Header>
    <Menu></Menu>
    <main>
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Menu from './components/Menu.vue'

export default {
    name: 'Main',
    components: {
        Header,
        Footer,
        Menu
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>

</style>
