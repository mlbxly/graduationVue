<template>
  <div class="main">
    <el-form :inline="true" :model="taskSearch" class="task-search" size="mini">
      <el-form-item label="用户名">
        <el-input v-model="taskSearch.username" placeholder="用户名称" style="width: 120px;"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="taskSearch.phone" placeholder="联系电话" style="width: 120px;"></el-input>
      </el-form-item>
      <el-form-item label="身份类型">
        <el-select v-model="taskSearch.userType" placeholder="身份类型" style="width: 110px;">
          <el-option label="物业管理员" value="1"></el-option>
          <el-option label="普通员工" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="taskSearch.gender" placeholder="性别" style="width: 100px;">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker v-model="taskSearch.startTime" type="datetime" placeholder="选择日期时间" style="width: 175px;"></el-date-picker>
        -
        <el-date-picker v-model="taskSearch.endTime" type="datetime" placeholder="选择日期时间" style="width: 175px;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="taskData" style="width: 88%" height="580" class="taskTable">
    <el-table-column fixed prop="createTime" label="发布时间" width="230" align="center">
    </el-table-column>
    <el-table-column prop="taskName" label="报修内容" width="120" align="center">
    </el-table-column>
    <el-table-column prop="placeType" label="区域" width="120" align="center">
    </el-table-column>
    <el-table-column prop="place" label="地址" width="150" align="center">
    </el-table-column>
    <el-table-column prop="createName" label="发布人" width="120" align="center">
    </el-table-column>
    <el-table-column prop="status" label="服务状态" width="120" align="center">
    </el-table-column>
    <el-table-column prop="acceptName" label="维修员" width="120" align="center">
    </el-table-column>
    <el-table-column prop="acceptTime" label="接单时间" width="120" align="center">
    </el-table-column>
    <el-table-column prop="acceptanceName" label="验收人" width="120" align="center">
    </el-table-column>
    <el-table-column prop="completeTime" label="完成时间" width="120" align="center">
  </el-table-column>
    <el-table-column prop="closeTime" label="关闭时间" width="120" align="center">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="closeTask(scope.$index)" type="text" size="small" v-if="scope.row.status === '待处理'?true:false">关闭</el-button>
        <el-button type="text" size="small" v-if="scope.row.status === '待处理'?true:false" @click="receipt(scope.$index)">接单</el-button>
        <el-button type="text" size="small" v-if="scope.row.status === '处理中'?true:false" @click="cancelReceipt(scope.$index)">取消接单</el-button>
        <el-button type="text" size="small" v-if="scope.row.status === '处理中'?true:false" @click="complete(scope.$index)">完成</el-button>
        <el-button type="text" size="small" v-if="scope.row.status === '待验收'?true:false" @click="acceptance(scope.$index)">验收</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-dialog title="维修订单发布" :visible.sync = "releaseTaskVisible" style="width: 850px;position: fixed;left: 360px;">
      <el-form :model="taskForm" status-icon :rules="rules" ref="taskForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="维修内容">
          <el-input v-model="taskForm.taskName"></el-input>
        </el-form-item>
        <el-form-item label="区域位置">
          <el-select v-model="taskForm.placeType" style="width: 282px;">
            <el-option label="公共区域" value="1"></el-option>
            <el-option label="私人房间" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input type="input" v-model="taskForm.place"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addTask">确定</el-button>
          <el-button @click="resetTaskForm">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

  export default {
    components: {ElButton},
    name:'task',
    data() {
      return {
        taskData: [],
        taskSearch:{
          username:'',
          phone:'',
          userType:'',
          gender:'',
          startTime:'',
          endTime:''
        },
        releaseTaskVisible:false,
        taskForm:{
          taskName:'',
          placeType:'',
          place:''
        },
      }
    },
    created() {
      this.$axios.post('/propertyTask/list').then(res =>{
        this.taskData = res.data.data
      })
    },
    methods: {
      //弹出添加窗口
      onAdd() {
        this.releaseTaskVisible = true
      },
      //取消发布维修订单
      resetTaskForm() {
        this.taskForm.taskName = ''
        this.taskForm.place = ''
        this.taskForm.placeType = ''
        this.releaseTaskVisible = false
      },
      //确认发布维修订单
      addTask(){
        this.$axios.post('/propertyTask/release',this.taskForm).then(res =>{
          if(res.data.code == 0){
            window.location.reload();
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      //维修工接单
      receipt(index){
        this.$axios.post('/propertyTask/receipt',this.taskData[index].taskId).then(res=>{
          if(res.data.code == 0){
            window.location.reload();
          }else{
            this.$message.error(res.data.msg)
          }
        })
      },
      //维修工取消接单
      cancelReceipt(index){
        this.$confirm('确定要取消该维修订单?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'primary'
        }).then(()=> {
          this.$axios.post('/propertyTask/cancelReceipt',this.taskData[index].taskId).then(res =>{
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
        this.$axios.post('/propertyTask/complete',this.taskData[index].taskId).then(res =>{
          if(res.data.code == 0){
            window.location.reload()
          }else{
            this.$message.error(res.data.msg)
          }
        })
      },
      //关闭维修订单
      closeTask(index){
        this.$axios.post('/propertyTask/close',this.taskData[index].taskId).then(res =>{
          if(res.data.code == 0){
            window.location.reload()
          }else{
            this.$message.error(res.data.msg)
          }
        })
      },
      //验收订单
      acceptance(index){
        this.$axios.post('/propertyTask/acceptance',this.taskData[index].taskId).then(res =>{
          if(res.data.code == 0){
            window.location.reload()
          }else{
            this.$message.error(res.data.msg)
          }
        })
      }
    }
  }
</script>
<style>
  .taskTable{
    position: fixed;
    top:15%;
    left: 8%;
  }
</style>
