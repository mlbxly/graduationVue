<template>
  <div class="home">
    <nav-menu></nav-menu>
    <router-view/>
  </div>
</template>

<script>
  import NavMenu from './common/NavMenu.vue'
    export default {
      name: "Home",
      components:{NavMenu}
    }
</script>

<style>
</style>
