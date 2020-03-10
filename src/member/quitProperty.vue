<template>
  <div>
     <el-table :data="quitList" border style="width: 48%;position: fixed;left:100px;top:100px;" height="480">
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
            data: [],
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
        this.$axios.post('/property/test').then(res => {
          this.orgOptions.xAxis.data = res.data.data
        }).catch(function(error) {
          alert(error)
        })
      }
    }
</script>

<style>
.hello{
  position: fixed;
  bottom: 0%;
  left: 2%;
}
</style>
