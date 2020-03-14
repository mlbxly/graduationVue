<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" style="height:252px;margin-top: 20px;">
          <div slot="header" class="memberDetail">
            <span>住户详情</span>
          </div>
          业主人数<el-progress :percentage="owners" color="#42b983"></el-progress>
          租户人数<el-progress :percentage="tenants" color="#f1e05a"></el-progress>
          当月离开人数<el-progress :percentage="removes"></el-progress>
          违规处理住户人数<el-progress :percentage="illegals" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'HomePage',
        data() {
          return {
            owners:'',
            tenants:'',
            removes:'',
            illegals:''
          }
      },
      created() {
          this.$axios.post('/member/proportion').then(res=>{
            this.owners = res.data.data.owners
            this.tenants = res.data.data.tenants
            this.removes = res.data.data.removes
            this.Illegals = res.data.data.illegals
          })
      }
    }
</script>

<style>
  .main{
    width:85%;
    margin-left: 100px;
  }
</style>
