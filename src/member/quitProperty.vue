<template>
  <body>
  <div class="main">
    <el-input v-model="selectPhone" placeholder="请输入手机号码" size="mini"class="selectPhone"></el-input>
    <el-button type="primary" icon="el-icon-search" size="mini" class="selectButton" @click="findByPhone">搜索</el-button>
     <el-table :data="quitList" style="width: 53.2%;position: fixed;left:100px;top:100px;" height="560">
    <el-table-column prop="username" label="用户名" width="130" align="center">
   </el-table-column>
    <el-table-column prop="phone" label="联系方式" width="180" align="center">
    </el-table-column>
    <el-table-column prop="userType" label="用户身份" width="130" align="center">
    </el-table-column>
    <el-table-column prop="createTime" label="入职时间" width="180" align="center">
    </el-table-column>
    <el-table-column prop="removeTime" label="离职时间" width="180" align="center">
    </el-table-column>
  </el-table>
    <div class="hello">
      <h3 class="helloH3">近半年员工离职情况</h3>
      <chart ref="chart1" :options="orgOptions" :auto-resize="true"></chart>
    </div>
    <div class="circle">
      <h3 class="circleH3">上月物业管理员和普通员工离职比例</h3>
      <chart ref="chart2" :options="circleOptions" :auto-resize="true"></chart>
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
          orgOptions:{},
          circleOptions:{},
          selectPhone:''
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
            smooth: true,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: 'top', //在上方显示
                  textStyle: { //数值样式
                    color: 'black',
                    fontSize: 16
                  }
                }
              }
            }
          }]
        }
        this.circleOptions = {
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            bottom: 'bottom',
            data: ['物业管理员','普通工人']
          },
          series : [
            {
              name: '离职人员',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[],
              label : {
                normal : {
                  formatter: '{b}:{c}({d}%)',
                  textStyle : {
                    fontWeight : 'normal',
                    fontSize : 15
                  }
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
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
        this.$axios.post('/property/countQuitCircle').then(res =>{
          this.circleOptions.series[0].data = res.data.data
        })
      },
      methods: {
        findByPhone() {
          this.$axios.post('/property/quitList',this.selectPhone).then(res =>{
            this.quitList = res.data.data
          }).catch(function(error) {
            alert(error)
          })
        }
      }
    }
</script>

<style>
.hello{
  position: fixed;
  bottom: 0%;
  right: 1%;
}
  .circle {
    position: fixed;
    top:0%;
    right: 1%;
  }
  .helloH3{
    position: fixed;
    top:46%;
    right: 6%;
  }
  .selectPhone {
    position: absolute;
    top: 9.5%;
    left: 6.5%;
    width: 10%;
  }
  .selectButton{
    position: absolute;
    top:9.5%;
    left:17%;
  }
</style>
