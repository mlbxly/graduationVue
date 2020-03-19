<template>
  <div class="main">
    <el-form :inline="true" :model="taskSearch" class="task-search" size="mini">
      <el-form-item label="发布时间">
        <el-date-picker v-model="taskSearch.createStartTime" type="datetime" placeholder="选择日期时间" style="width:175px"></el-date-picker>
        -
        <el-date-picker v-model="taskSearch.createEndTime" type="datetime" placeholder="选择日期时间" style="width:175px"></el-date-picker>
      </el-form-item>
      <el-form-item label="接单时间">
        <el-date-picker v-model="taskSearch.acceptStartTime" type="datetime" placeholder="选择日期时间" style="width:175px"></el-date-picker>
        -
        <el-date-picker v-model="taskSearch.acceptEndTime" type="datetime" placeholder="选择日期时间" style="width:175px"></el-date-picker>
      </el-form-item>
      <el-form-item label="区域">
        <el-select v-model="taskSearch.placeType" placeholder="区域位置" style="width:100px">
          <el-option label="公共区域" value="1"></el-option>
          <el-option label="私人房间" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="taskSearch.status" placeholder="状态" style="width:100px">
          <el-option label="处理中" value="2"></el-option>
          <el-option label="待验收" value="3"></el-option>
          <el-option label="已完成" value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="myTaskData" style="width: 93%" class="myTask" height="580">
      <el-table-column prop="acceptTime" label="接单时间" width="180" align="center">
      </el-table-column>
      <el-table-column prop="taskName" label="报修内容" width="130" align="center">
      </el-table-column>
      <el-table-column prop="placeType" label="区域" width="120" align="center">
      </el-table-column>
      <el-table-column prop="place" label="地址" width="150" align="center">
      </el-table-column>
      <el-table-column prop="createTime" label="发布时间" width="180" align="center">
      </el-table-column>
      <el-table-column prop="createName" label="发布人" width="120" align="center">
      </el-table-column>
      <el-table-column prop="status" label="服务状态" width="120" align="center">
      </el-table-column>
      <el-table-column prop="acceptanceName" label="验收人" width="120" align="center">
      </el-table-column>
      <el-table-column prop="completeTime" label="完成时间" width="180" align="center">
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="cancelReceipt(scope.$index)" v-if="scope.row.status === '处理中'?true:false">取消接单</el-button>
          <el-button type="text" size="small" @click="complete(scope.$index)" v-if="scope.row.status === '处理中'?true:false">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
      name: "myTask",
      data() {
        return {
          myTaskData: [],
          taskSearch:{
            placeType:'',
            status:'',
            createStartTime:'',
            createEndTime:'',
            acceptStartTime:'',
            acceptEndTime:''
          },
        }
      },
      created() {
        this.$axios.post('/propertyTask/myTask').then(res => {
          this.myTaskData = res.data.data
        })
      },
      methods: {
        //维修工取消接单
        cancelReceipt(index){
          this.$confirm('确定要取消该维修订单?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'primary'
          }).then(()=> {
            this.$axios.post('/propertyTask/cancelReceipt',this.myTaskData[index].taskId).then(res =>{
              if(res.data.code == 0){
                window.location.reload()
              }else{
                this.$message.error(res.data.msg)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消操作'
            })
          })
        },
        //维修工完成订单
        complete(index){
          this.$axios.post('/propertyTask/complete',this.myTaskData[index].taskId).then(res =>{
            if(res.data.code == 0){
              window.location.reload()
            }else{
              this.$message.error(res.data.msg)
            }
          })
        },
        //清空搜索条件
        onReset(){
          this.taskSearch.placeType ='';
          this.taskSearch.status = '';
          this.taskSearch.createStartTime = '';
          this.taskSearch.createEndTime = '';
          this.taskSearch.acceptStartTime = '';
          this.taskSearch.acceptEndTime = '';
        },
        //确认搜索
        onSearch() {
          this.$axios.post('/propertyTask/myTask',this.taskSearch).then(res => {
            this.myTaskData = res.data.data
          })
        }
      }
    }
</script>

<style scoped>
.myTask {
  position: fixed;
  top:15%;
  left:5.5%;
}
  .task-search{
    position: fixed;
    left:8%;
    top:10%;
  }
</style>
