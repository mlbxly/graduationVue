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
    <div>
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
          <el-button size="mini" @click="handleEdit(scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
          <el-button size="mini" type="warning" @click="changePassword(scope.$index)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>
      <div style="display: flex;justify-content: center;margin-top: 689px">
        <el-pagination
          background
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next, jumper, ->, total, slot"
          :total="total">
        </el-pagination>
      </div>
    </div>

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
    <el-dialog title="人事管理修改" :visible.sync="updateFormVisible" style="width: 800px;position:fixed;left: 340px;top: 20px;">
      <el-form :label-position="labelPosition" label-width="80px" :model="updatePropertyForm">
        <el-form-item label="用户名">
          <el-input v-model="updatePropertyForm.username"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="updatePropertyForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
          <el-input v-model="updatePropertyForm.address"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="confirmUpdateProperty">立即修改</el-button>
          <el-button @click="cancelUpdate">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync = "changePasswordVisible" style="width: 850px;position: fixed;left: 360px;">
      <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input v-model="passwordForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input type="password" v-model="passwordForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="passwordForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmChangePassword">提交</el-button>
          <el-button @click="resetPasswordForm">取消</el-button>
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
        propertyForm: {
          username: '',
          phone: '',
          password: '',
          userType: '',
          gender: '',
          address: ''
        },
        dialogFormVisible: false,
        updateFormVisible: false,
        labelPosition: 'right',
        updatePropertyForm: {
          username: '',
          phone: '',
          address:'',
          userId:''
        },
        changePasswordVisible: false,
        passwordForm:{
          userId:'',
          username:'',
          password:'',
          checkPassword:''
        },
        pageSize:10,
        currentPage:1,
        total:0
      }
    },
    name: 'Member',
    // created() {
    //   this.$axios.post('/property/propertyList').then(res => {
    //     this.tableData = res.data.data,
    //       console.log(res.data.data)
    //   }).catch(function (error) {
    //     console.log(error)
    //   })
    // },
    mounted() {
      this.initUser()
    },
    methods: {
      //弹出修改窗口
      handleEdit(index) {
        this.updateFormVisible = true,
          this.updatePropertyForm.username = this.tableData[index].username,
          this.updatePropertyForm.phone = this.tableData[index].phone,
          this.updatePropertyForm.address = this.tableData[index].address,
          this.updatePropertyForm.userId = this.tableData[index].userId,
          console.log(this.tableData[index])
      },
      //删除
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
      //条件查询
      onSubmit() {
        console.log(this.formInline);
        this.currentPage = 1
        this.$axios.post("/property/propertyList/?page="+this.currentPage+"&size="+this.pageSize,this.formInline).then(res => {
            if(res.data.code === 0) {
              this.tableData = res.data.data.data
              this.total = res.data.data.total
            }
            else{
              alert(res.data.msg)
            }
          }).catch(function (error) {
          console.log(error)
        })
      },
      //搜索条件清空
      onReset() {
        this.formInline.username = ''
        this.formInline.phone = ''
        this.formInline.userType = ''
        this.formInline.gender = ''
        this.formInline.startTime = ''
        this.formInline.endTime = ''
      },
      //第一列序号初始化
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      //弹出添加窗口
      onAdd() {
        console.log("add")
        this.dialogFormVisible = true
      },
      //取消添加
      cancelAddProperty() {
        this.propertyForm.username = '',
          this.propertyForm.phone = '',
          this.propertyForm.password = '',
          this.propertyForm.userType = '',
          this.propertyForm.gender = '',
          this.propertyForm.address = ''
      },
      //确认添加用户
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
            this.$confirm(res.data.msg,'错误提示',{type:'error'})
          }
        }).catch(failResponse => {
        })
      },
      //确认修改用户
      confirmUpdateProperty() {
        this.$axios.post('/property/updateProperty',this.updatePropertyForm).then(res =>{
            if(res.data.code === 0){
              window.location.reload()
            }else {
              this.$confirm(res.data.msg,'错误提示',{type:'error'})
            }
          }).catch(failResponse => {
        })
      },
      //退出修改窗口
      cancelUpdate() {
        this.updateFormVisible = false;
      },
      //弹出修改密码窗口
      changePassword(index){
        console.log(this.tableData[index].data)
        this.changePasswordVisible = true
        this.passwordForm.username = this.tableData[index].username
        this.passwordForm.userId = this.tableData[index].userId
      },
      //取消修改密码，退出窗口
      resetPasswordForm(){
        this.changePasswordVisible = false
        this.passwordForm.password = ''
        this.passwordForm.checkPassword = ''
      },
      //确认修改密码，提交数据
      confirmChangePassword() {
        this.$axios.post('/property/changePassword',this.passwordForm).then(res => {
          if(res.data.code === 0){
            window.location.reload()
          }else {
            this.$confirm(res.data.msg,'错误提示',{type:'error'})
          }
        }).catch(failResponse => {
        })
      },
      sizeChange(size) {
        this.pageSize=size;
        this.initUser();
      },
      currentChange(page) {
        this.currentPage=page;
        this.initUser();
      },
      initUser() {
        this.$axios.post("/property/propertyList/?page="+this.currentPage+"&size="+this.pageSize,this.formInline).then(resp=>{
            console.log(resp.data.data)
          this.tableData = resp.data.data.data
          this.total = resp.data.data.total
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
