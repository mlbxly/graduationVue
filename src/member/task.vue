<template>
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
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name:'task',
    data() {
      return {
        taskData: []
      }
    },
    created() {
      this.$axios.post('/propertyTask/list').then(res =>{
        this.taskData = res.data.data
      })
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
