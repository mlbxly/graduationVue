<template>
  <div class="sideNav">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="true" theme="dark" :router=true :unique-opened="true">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">人员管理</span>
        </template>
        <el-menu-item index="/houseHold">住户管理</el-menu-item>
        <el-menu-item-group title="人事管理">
          <el-menu-item index="/member">在职人员管理</el-menu-item>
          <el-menu-item index="/quitList">离职人员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
    export default {
      name: "SideMenu"
    }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .sideNav {
    position: fixed;
    left: 0%;
    top:8.2%;
  }
</style>
