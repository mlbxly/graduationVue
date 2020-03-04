<template>
  <body id="paper">
  <el-form :model="loginForm" :rules="rules" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username"
                auto-complete="off" placeholder="用户名/手机号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="identity">
      <el-radio-group v-model="loginForm.identity">
        <el-radio label="1">物业管理员</el-radio>
        <el-radio label="2">普通员工</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click="login">登录</el-button>
      <el-button type="primary" style="width: 40%;background: #505458;border: none" @click = "resetForm">重置</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>

  export default{
    data () {
      return {
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
          identity:[{required: true,message:'用户类型不能为空',trigger: 'blur'}]
        },
        loginForm: {
          username: '',
          password: '',
          identity: ''
        }
      }
    },
    methods: {
      login () {
       this.$axios.post('/property/login',{
         username: this.loginForm.username,
         password: this.loginForm.password,
         identity: this.loginForm.identity
       }).then(successResponse => {
         if(successResponse.data.code == 0){
           this.$store.commit('GET_USER',this.loginForm)
           this.$store.commit('USER_TOKEN',JSON.stringify(successResponse.data.data))
           this.$router.replace({path: '/home'})
         }else{
           confirm("登陆失败，用户名或密码错误")
         }
       }).catch(failResponse => {
       })
      },
      resetForm() {
        this.loginForm.username = ''
        this.loginForm.password = ''
        this.loginForm.identity = ''
      }
    }
  }
</script>

<style>
  #paper {
    background:url("../assets/login.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 210px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
