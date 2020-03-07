<template>
  <div class="home">
    <nav-menu></nav-menu>
    <side-menu></side-menu>
    <router-view/>
  </div>
</template>

<script>
  import NavMenu from './common/NavMenu.vue'
  import SideMenu from './common/SideMenu'
    export default {
      name: "Home",
      components:{NavMenu,SideMenu}
    }
</script>

<style>
</style>
