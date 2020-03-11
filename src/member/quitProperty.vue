<template>
  <body>
  <div class="main">
     <el-table :data="quitList" border style="width: 59.7%;position: fixed;left:100px;top:100px;" height="230">
    <el-table-column prop="username" label="用户名" width="180">
   </el-table-column>
    <el-table-column prop="phone" label="联系方式" width="180">
    </el-table-column>
    <el-table-column prop="userType" label="用户身份" width="180">
    </el-table-column>
    <el-table-column prop="createTime" label="入职时间" width="180">
    </el-table-column>
    <el-table-column prop="removeTime" label="离职时间" width="180">
    </el-table-column>
  </el-table>
    <div class="hello">
      <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
    </div>
  </div>
  </body>
</template>

<script>
    export default {
      name: "QuitProperty",
      data() {
        return {
          quitList: [],
          orgOptions:{}
        }
      },
      mounted() {
        this.orgOptions = {
          color: ['#3398DB'],
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [1,2,3,4,5,6],
            type: 'bar',
            barWidth : 28,
            smooth: true
          }]
        }
      },
      created() {
          this.$axios.post('/property/quitList').then(res =>{
            this.quitList = res.data.data
          }).catch(function(error) {
            alert(error)
          })
        this.$axios.post('/property/countQuitMonth').then(res => {
          this.orgOptions.xAxis.data = res.data.data
        }).catch(function(error) {
          alert(error)
        })
        this.$axios.post('/property/countQuitNum').then(res => {
          this.orgOptions.series[0].data = res.data.data
        }).catch(function(error) {
          alert(error)
        })
      }
    }
</script>

<style>
  body{
    /*background-image: linear-gradient(right,#8697A7,#A9B1B4);*/
  }
.hello{
  position: fixed;
  bottom: 0%;
  left: 3%;
}
</style>
