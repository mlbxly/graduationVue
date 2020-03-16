<template>
  <div class="main">
    <el-button type="primary" @click="onAdd">添加账单</el-button>
    <div class="box">
      <ul>
        <li><el-tag type="info" class="all" @click ="payedAll()" id ="all">全部</el-tag></li>
        <li><el-tag type="info" class="Unpaid" @click ="Unpaid()" id ="unpaid">未缴纳</el-tag></li>
      </ul>
    </div>
    <div>
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
            <el-button size="mini" type="primary" @click="handleConfirm(scope.$index)">支付</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="账单添加" :visible.sync="dialogFormVisible" style="width:65%;">
        <el-form ref="billForm" :model="billForm" label-width="120px">
          <el-form-item label="住户">
            <el-select v-model="billForm.userId" placeholder="住户选择" prop="userId">
              <el-option v-for="item in memberList" :key="item.id" :label="item.username":value="item.userId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账单周期">
            <el-date-picker v-model="billForm.billStartTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
            -
            <el-date-picker v-model="billForm.billEndTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="billForm.money"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input v-model="billForm.remark"></el-input>
          </el-form-item>
          <el-form-item label="缴纳截止时间">
            <el-date-picker v-model="billForm.deadline" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onAddBill">添加</el-button>
            <el-button @click="cancelBill">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Bill",
        data() {
          return {
            billData: [],
            payTab:'',
            billQuery:{
              phone:'',
              payStartTime:'',
              payEndTime:'',
              payed: ''
            },
            dialogFormVisible:false,
            billForm:{
              userId: '',
              billStartTime: '',
              billEndTime: '',
              money: '',
              remark: '',
              deadline: ''
            },
            memberList:[]
          }
      },
      created() {
          this.$axios.post('/bill/list',this.billQuery).then(res => {
            if(res.data.code == 0) {
              this.billData = res.data.data
            }
          })
      },
      mounted() {
        /**
         * 获取住户信息
         */
        this.getUserId();
      },
      methods:{
        payedAll() {
          this.billQuery.payed = '';
          document.getElementById('all').style.borderBottom ="none"
          document.getElementById('all').style.borderLeft ="1px solid #909399"
          document.getElementById('all').style.borderTop ="1px solid #909399"
          document.getElementById('unpaid').style.borderBottom ="1px solid #909399"
          document.getElementById('unpaid').style.borderTop ="none"
          document.getElementById('unpaid').style.borderRight ="none"
          this.$axios.post('/bill/list', this.billQuery).then(res => {
            if (res.data.code == 0) {
              this.billData = res.data.data
            }
          })
        },
        Unpaid() {
          this.billQuery.payed = 1;
          document.getElementById('unpaid').style.borderBottom ="none"
          document.getElementById('all').style.borderBottom ="1px solid #909399"
          document.getElementById('all').style.borderLeft ="none"
          document.getElementById('all').style.borderTop ="none"
          document.getElementById('unpaid').style.borderTop ="1px solid #909399"
          document.getElementById('unpaid').style.borderRight ="1px solid #909399"
          this.$axios.post('/bill/list',this.billQuery).then(res => {
            if(res.data.code == 0) {
              this.billData = res.data.data
            }
          })
        },
        onAdd() {
          this.dialogFormVisible = true;
        },
        getUserId:function () {
          this.$axios.post('/bill/inList').then(res => {
            this.memberList = res.data.data
          })
        },
        cancelBill() {
          this.billForm.userId = ''
          this.billForm.money = ''
          this.billForm.remark = ''
          this.billForm.deadline = ''
          this.billForm.billEndTime = ''
          this.billForm.billStartTime = ''
          this.dialogFormVisible = false
        },
        onAddBill(){
          this.$axios.post('/bill/add',this.billForm).then(res =>{
            if(res.data.code == 0){
              window.location.reload();
            }else{
              this.$message.error(res.data.msg);
            }
          })
        },
        handleConfirm(index){
          this.$confirm('确认用户已经支付，账单费用已经到账?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'primary'
          }).then(()=> {
           this.$axios.post('/bill/confirm',this.billData[index].billId).then(res => {
             if(res.data.code == 0){
               window.location.reload()
             }else{
               this.$message(res.data.msg)
             }
           })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '用户支付账单费用尚未到账'
            })
          })
        },
        handleDelete(index){
          this.$confirm('此操作将永久删除该账单，是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=> {
            this.$axios.post('/bill/delete',this.billData[index].billId).then(res => {
              if(res.data.code == 0){
                window.location.reload()
              }else{
                this.$message(res.data.msg)
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        }
      }
    }
</script>

<style scoped>
.billTable {
  position: fixed;
  top: 15.2%;
  left: 10%;
}
.box{
  border-bottom: 1px solid #909399;
  width: 80%;
  height: 5%;
  position: fixed;
  top:10%;
  left: 10%;
}
.box ul {
  list-style: none;
}
.all{
  position: fixed;
  left:12%;
  top:12.1%;
  width: 3%;
  height: 3%;
  border: 1px solid #909399;
  border-bottom: none;
  border-radius:inherit;
  background: #fff;
}
.Unpaid{
  position: fixed;
  left:14.9%;
  top:12.1%;
  width: 4%;
  height: 3%;
  background: #fff;
  border: 1px solid #909399;
  border-right: none;
  border-top: none;
  border-radius:inherit;
  }
</style>
