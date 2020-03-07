<template>
  <section>
    <el-form :inline="true" :model="formInline" class="member-search" size="mini">
      <el-form-item label="用户名">
        <el-input v-model="formInline.username" placeholder="用户名称" style="width: 120px;"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="formInline.phone" placeholder="联系电话" style="width: 120px;"></el-input>
      </el-form-item>
      <el-form-item label="身份类型">
        <el-select v-model="formInline.userType" placeholder="身份类型" style="width: 110px;">
          <el-option label="物业管理员" value="1"></el-option>
          <el-option label="普通员工" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formInline.gender" placeholder="性别" style="width: 100px;">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker v-model="formInline.startTime" type="datetime" placeholder="选择日期时间" style="width: 175px;"></el-date-picker>
        -
        <el-date-picker v-model="formInline.endTime" type="datetime" placeholder="选择日期时间" style="width: 175px;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 1358px;" class="member-table" border @current-change="handleCurrentChange">
      <el-table-column type="index" width="80px" align="center"></el-table-column>
      <el-table-column label="用户名" width="130px" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="130px" align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户身份" width="130px" align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.userType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="120px" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 2px">{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入职时间" width="220px" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="家庭住址" width="270px" align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="人事管理添加" :visible.sync="dialogFormVisible">
      <el-form ref="propertyForm" :model="propertyForm" size="mini" :inline="true">
        <el-form-item label="用户名">
          <el-input v-model="propertyForm.username" style="width: 120px;"></el-input>
        </el-form-item>
        <el-form-item label="设置登录密码">
          <el-input v-model="propertyForm.password" type="password" style="width: 120px;"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="propertyForm.userType" placeholder="请选择用户类型" style="width: 150px;">
            <el-option label="物业管理员" value="1"></el-option>
            <el-option label="普通员工" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话">
        <el-input v-model="propertyForm.phone" style="width: 120px;"></el-input>
      </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="propertyForm.gender" placeholder="性别" style="width: 80px;">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input v-model="propertyForm.address" style="width: 270px;"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="confirmAddProperty">立即添加</el-button>
          <el-button @click = "cancelAddProperty">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        formInline: {
          username: '',
          phone: '',
          userType: '',
          gender: '',
          startTime: '',
          endTime: ''
        },
        propertyForm:{
          username:'',
          phone:'',
          password:'',
          userType:'',
          gender:'',
          address:''
        },
        dialogFormVisible:false
      }
    },
    name: 'Member',
    created() {
      this.$axios.post('/property/propertyList').then(res => {
        this.tableData = res.data.data,
          console.log(res.data.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index) {
        console.log(this.tableData[index].userId);
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url:'http://localhost:8090/property/deleteProperty',
            method:'post',
            data:this.tableData[index].userId
          }).then(res => {
            if(res.data.code === 0){window.location.reload()}
            else{confirm(res.data.msg)}
          }).catch(failResponse => {})
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onSubmit() {
        console.log(this.formInline);
        this.$axios.post('/property/propertyList',this.formInline).then(res => {
            if(res.data.code === 0){this.tableData = res.data.data}
            else{alert(res.data.msg)}
          }).catch(function (error) {
          console.log(error)
        })
      },
      onReset() {
        this.formInline.username = ''
        this.formInline.phone = ''
        this.formInline.userType = ''
        this.formInline.gender = ''
        this.formInline.startTime = ''
        this.formInline.endTime = ''
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      onAdd() {
        console.log("add")
        this.dialogFormVisible = true
      },
      cancelAddProperty() {
        this.propertyForm.username = '',
          this.propertyForm.phone = '',
          this.propertyForm.password = '',
          this.propertyForm.userType = '',
          this.propertyForm.gender = '',
          this.propertyForm.address = ''
      },
      confirmAddProperty() {
        this.$axios.post('/property/saveProperty',{
          username:this.propertyForm.username,
          phone:this.propertyForm.phone,
          password:this.propertyForm.password,
          userType:this.propertyForm.userType,
          gender:this.propertyForm.gender,
          address:this.propertyForm.address
        }).then(res => {
          if(res.data.code === 0){
            window.location.reload()
          }else {
            confirm(res.data.msg)
          }
        }).catch(failResponse => {
        })
      }
    }
  }
</script>

<style>
  .member-table {
    position: fixed;
    top: 15%;
    left: 8%;
  }
  .member-search {
    height: 100px;
    position: fixed;
    top:10%;
    left:7.3%;
  }
</style>
