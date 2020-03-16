<template>
  <div class="main">
    <el-table :data="billData" stripe style="width: 80%" class="billTable">
      <el-table-column prop="username" label="用户姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="remark" label="名称" width="180" align="center"></el-table-column>
      <el-table-column prop="money" label="金额" width="180" align="center"></el-table-column>
      <el-table-column prop="cycle" label="账单周期" width="180" align="center"></el-table-column>
      <el-table-column prop="deadline" label="应缴日期" width="180" align="center"></el-table-column>
      <el-table-column prop="payed" label="状态" width="180" align="center"></el-table-column>
      <el-table-column prop="payTime" label="缴纳时间" width="180" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index)">支付</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "Bill",
        data() {
          return {
            billData: []
          }
      },
      created() {
          this.$axios.post('/bill/list').then(res => {
            if(res.data.code == 0) {
              this.billData = res.data.data
            }
          })
      }
    }
</script>

<style scoped>
.billTable {
  position: fixed;
  top:10%;
  left:10%;
}
</style>
