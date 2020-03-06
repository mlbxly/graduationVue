<template>
  <section>
    <el-form :inline="true" :model="formInline" class="member-search">
      <el-form-item label="用户名">
        <el-input v-model="formInline.username" placeholder="用户名称" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="formInline.phone" placeholder="联系电话" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item label="身份类型">
        <el-select v-model="formInline.userType" placeholder="身份类型" style="width: 120px;">
          <el-option label="物业管理员" value="1"></el-option>
          <el-option label="普通员工" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="formInline.gender" placeholder="性别" style="width: 120px;">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker v-model="formInline.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        -
        <el-date-picker v-model="formInline.endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
        <el-button type="primary" @click="onAdd">添加</el-button>
        <el-button type="primary" @click="onImport">导入</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 88%" class="member-table" border @current-change="handleCurrentChange">
      <el-table-column type="index" width="80" align="center"></el-table-column>
      <el-table-column label="用户名" width="180" align="center">
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
      <el-table-column label="联系电话" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户身份" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.userType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" width="150" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 2px">{{ scope.row.gender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入职时间" width="240" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="家庭住址" width="280" align="center">
        <template slot-scope="scope">
          <span style="margin-left: -10px">{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini">详情</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>
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
        }
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
      handleDelete(index, row) {
        console.log(index, row);
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
      }
    }
  }
</script>

<style>
  .member-table {
    position: absolute;
    top: 22%;
    left: 8%;
  }
  .member-search {
    width:1800px;
    height: 100px;
    position: absolute;
    top:15%;
    left:5.3%;
  }
</style>
