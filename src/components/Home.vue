<template>
  <div>
    <nav-menu></nav-menu>
    <side-nav></side-nav>
    <router-view/>
  </div>
</template>

<script>
  import NavMenu from './common/NavMenu.vue'
  import SideNav from './common/SideNav.vue'
    export default {
      name: "Home",
      components:{NavMenu,SideNav}
    }
</script>

<style>

</style>
