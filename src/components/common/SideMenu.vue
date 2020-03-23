<template>
  <div class="sideNav">
    <div class="topTitle">{{username}},欢迎您使用系统</div>
    <div class="iconTitle">
      <el-button type="info" icon="el-icon-switch-button" circle style="font-size: 16px;background: #8697A7" @click="loginOut"></el-button>
      退出
      <el-button type="info" icon="el-icon-menu" circle style="font-size: 16px;background: #8697A7"></el-button>
      <a href="http://localhost:8091/xxl-job-admin">定时器管理</a>
    </div>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="true" theme="dark" :router=true :unique-opened="true">
      <el-menu-item index="homePage">
        <i class="el-icon-s-platform"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="1" v-bind:disabled="memberDisabled">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span slot="title">人员管理</span>
        </template>
        <el-menu-item index="/houseHold" v-bind:disabled="houseMemberDisabled">住户管理</el-menu-item>
        <el-menu-item-group title="人事管理">
          <el-menu-item index="/member" v-bind:disabled="staffDisabled">在职人员管理</el-menu-item>
          <el-menu-item index="/quitList" v-bind:disabled="quitDisabled">离职人员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="house" v-bind:disabled="houseDisabled">
        <i class="el-icon-office-building"></i>
        <span slot="title">房屋资源管理</span>
      </el-menu-item>
      <el-menu-item index="bill" v-bind:disabled="billDisabled">
        <i class="el-icon-document"></i>
        <span slot="title">住户缴费账单信息管理</span>
      </el-menu-item>
      <el-menu-item index="task" v-bind:disabled="taskListDisabled">
        <i class="el-icon-s-grid"></i>
        <span slot="title">报修管理</span>
      </el-menu-item>
      <el-menu-item index="myTask" v-bind:disabled="taskDisabled">
        <i class="el-icon-s-order"></i>
        <span slot="title">我的订单</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
    export default {
      name: "SideMenu",
      data(){
        return {
          memberDisabled:false,
          houseDisabled:false,
          billDisabled:false,
          houseMemberDisabled:false,
          staffDisabled:false,
          quitDisabled:false,
          taskListDisabled:false,
          username:''
        }
      },
      created() {
       this.$axios.post('/property/decrypt').then(res => {
         if(res.data.code == 0){
           this.username = res.data.data.username
           if(res.data.data.userType == 1){
             this.memberDisabled = false
             this.houseMemberDisabled = false
             this.staffDisabled = true
             this.quitDisabled = false
             this.houseDisabled = false
             this.billDisabled = false
             this.taskDisabled = true
             this.taskListDisabled = false
           }else if(res.data.data.userType == 2){
             this.memberDisabled = true
             this.houseMemberDisabled = true
             this.staffDisabled = true
             this.quitDisabled = true
             this.houseDisabled = true
             this.billDisabled = true
             this.taskDisabled = false
             this.taskListDisabled = false
           }else if(res.data.data.userType == 3){
             this.memberDisabled = false
             this.houseMemberDisabled = true
             this.staffDisabled = false
             this.quitDisabled = false
             this.houseDisabled = true
             this.billDisabled = true
             this.taskDisabled = true
             this.taskListDisabled = true
           }
         }else{
           this.$router.replace({path: '/login'})
           this.$message.error(res.data.msg);
         }
       })
      },
      methods :{
        loginOut() {
          this.$confirm('确定要退出登录吗？', '提示', {
            type: 'warning'
          }).then(()=>{
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("token");
            this.$axios.post('/property/loginOut').then(res => {
              this.$router.replace({path: '/login'})
              this.$message.error("已退出登录");
            })
          }).catch(() => {})

        }
      }
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
    top:8.5%;
  }
  .topTitle {
    position: fixed;
    top:3.3%;
    right:20%;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
  }
  .iconTitle {
    position: fixed;
    top:1.5%;
    right:5%;
    font-size: 16px;
    color: #fff;
  }
</style>
