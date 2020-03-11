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
    <div class="circle">
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
          circleOptions:{}
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
            data: ['物业管理员','普通员工']
          },
          series : [
            {
              name: '访问来源',
              type: 'pie',
              radius : '55%',
              center: ['50%', '60%'],
              data:[
                {value:105, name:'物业管理员'},
                {value:310, name:'普通员工'}
              ],
              label : {
                normal : {
                  formatter: '{b}:{c}: ({d}%)',
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
