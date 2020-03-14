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
    <div class="gird-cont">
      <el-col :span="8">
        <el-card shadow="hover" class="member">
          <i class="el-icon-user"></i>
          <div class="member-cont">住户总人数</div>
          <div class="member-num">{{memberNum}}</div>
        </el-card>
        <el-card shadow="hover" class="house">
          <i class="el-icon-school"></i>
          <div class="house-cont">房屋数量</div>
          <div class="house-num">{{houseNum}}</div>
        </el-card>
        <el-card shadow="hover" class="work">
          <i class="el-icon-pie-chart"></i>
          <div class="work-cont">累计维修完成订单数</div>
          <div class="work-num">{{workNum}}</div>
        </el-card>
      </el-col>
    </div>
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
            illegals:'',
            memberNum:'',
            houseNum:'',
            workNum:''
          }
      },
      created() {
          this.$axios.post('/member/proportion').then(res=>{
            this.owners = res.data.data.owners
            this.tenants = res.data.data.tenants
            this.removes = res.data.data.removes
            this.Illegals = res.data.data.illegals
            this.memberNum = 1234
            this.houseNum = 256
            this.workNum = 2187;
          })
      }
    }
</script>

<style>
  .main{
    width:85%;
    margin-left: 100px;
  }
.gird-cont{
  width:63%;
  height: 100px;
  position: absolute;
  top:10%;
  left:35%;
}
  .member{
    height: 100px;
    width: 260px;
  }
  .member i{
    width:100px;
    height: 100px;
    font-size: 50px;
    background: rgb(45,140,240);
    color: #fff;
    position: absolute;
    top:0%;
    left: 0%;
    text-align: center;
    line-height: 100px;
  }
  .member .member-cont {
    width:160px;
    height: 20px;
    font-size: 14px;
    color:#999;
    text-align: center;
    position: absolute;
    bottom:25%;
    left:10.5%;
  }
  .member-num{
    width:160px;
    height: 35px;
    font-size: 30px;
    font-weight: bold;
    color:rgb(45,140,240) ;
    text-align: center;
    position: absolute;
    left: 10.5%;
  }
  .house{
    height: 100px;
    width: 260px;
    position: absolute;
    left: 33%;
    top:0%;
  }
  .house i{
    width:100px;
    height: 100px;
    font-size: 50px;
    background: rgb(100,213,114);
    color: #fff;
    position: absolute;
    top:0%;
    left: 0%;
    text-align: center;
    line-height: 100px;
  }
  .house-cont {
    width:160px;
    height: 20px;
    font-size: 14px;
    color:#999;
    text-align: center;
    position: absolute;
    bottom:25%;
    left:40.5%;
  }
  .house-num{
    width:160px;
    height: 35px;
    font-size: 30px;
    font-weight: bold;
    color:rgb(45,140,240) ;
    text-align: center;
    position: absolute;
    left: 40.5%;
  }
  .work{
    height: 100px;
    width: 260px;
    position: absolute;
    left: 67%;
    top:0%;
  }
  .work i{
    width:100px;
    height: 100px;
    font-size: 50px;
    background: rgb(242,94,67);
    color: #fff;
    position: absolute;
    top:0%;
    left: 0%;
    text-align: center;
    line-height: 100px;
  }
  .work-cont {
    width:160px;
    height: 20px;
    font-size: 14px;
    color:#999;
    text-align: center;
    position: absolute;
    bottom:25%;
    left:40.5%;
  }
  .work-num{
    width:160px;
    height: 35px;
    font-size: 30px;
    font-weight: bold;
    color:rgb(242,94,67);
    text-align: center;
    position: absolute;
    left: 40.5%;
  }
</style>
