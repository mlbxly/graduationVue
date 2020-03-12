<template>
  <section>
    <el-form :inline="true" :model="memberSearch" class="member-search" size="mini">
      <el-form-item label="用户名">
        <el-input v-model="memberSearch.username" placeholder="用户名称" style="width: 120px;"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="memberSearch.phone" placeholder="联系电话" style="width: 120px;"></el-input>
      </el-form-item>
      <el-form-item label="身份类型">
        <el-select v-model="memberSearch.userType" placeholder="身份类型" style="width: 110px;">
          <el-option label="物业管理员" value="1"></el-option>
          <el-option label="普通员工" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="memberSearch.gender" placeholder="性别" style="width: 100px;">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker v-model="memberSearch.startTime" type="datetime" placeholder="选择日期时间"
                        style="width: 175px;"></el-date-picker>
        -
        <el-date-picker v-model="memberSearch.endTime" type="datetime" placeholder="选择日期时间"
                        style="width: 175px;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <div>
       <el-table :data="houseHoldData" stripe style="width: 80%" class="houseHoldTable">
         <el-table-column prop="username" label="用户名" width="180" align="center">
         </el-table-column>
         <el-table-column prop="phone" label="联系电话" width="180" align="center">
         </el-table-column>
         <el-table-column prop="userType" label="住户类型" width="180" align="center">
         </el-table-column>
         <el-table-column prop="removed" label="状态" width="180" align="center">
         </el-table-column>
         <el-table-column prop="home" label="入住房间" width="180" align="center">
         </el-table-column>
         <el-table-column prop="leaseDuration" label="租赁时长/年" width="180" align="center">
         </el-table-column>
         <el-table-column prop="createTime" label="入住时间" width="180" align="center">
         </el-table-column>
         <el-table-column label="操作" align="center">
           <template slot-scope="scope">
             <el-button size="mini" @click="handleEdit(scope.$index)">编辑</el-button>
             <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">删除</el-button>
             <el-button size="mini" type="warning" @click="changePassword(scope.$index)">修改密码</el-button>
           </template>
         </el-table-column>
       </el-table>
    </div>
    <el-dialog title="住户添加" :visible.sync="dialogFormVisible">
      <el-form ref="memberForm" :model="memberForm" label-width="80px" size="mini">
        <el-form-item label="住户姓名">
          <el-input v-model="memberForm.username"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="memberForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="memberForm.userType" placeholder="请选择用户类型">
            <el-option label="业主" value="1"></el-option>
            <el-option label="租户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入住房间">
          <el-select v-model="memberForm.unit"  size="mini" placeholder="请选择单元号" prop="unit" @change="selectUnit(memberForm.unit)">
            <el-option v-for="item in unitList" :key="item.id" :label="item":value="item"></el-option>
          </el-select>
          <el-select v-model="memberForm.floor" size="mini" placeholder="请选择楼层号" prop="floor" @change="selectFloor(memberForm.floor)">
            <el-option v-for="item in floorList" :key="item.id" :label="item":value="item"></el-option>
          </el-select>
          <el-select v-model="memberForm.room" size="mini" placeholder="请选择房间号" prop="room">
            <el-option v-for="item in roomList" :key="item.id" :label="item":value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
    import ElOption from "../../node_modules/element-ui/packages/select/src/option.vue";

    export default {
      components: {ElOption},
      name: 'HouseHold',
      data() {
        return {
          houseHoldData: [],
          memberSearch:{
            username: '',
            phone: '',
            userType: '',
            gender: '',
            startTime: '',
            endTime: ''
          },
          dialogFormVisible:false,
          memberForm: {
            username: '',
            phone: '',
            unit: '',
            floor:'',
            room:'',
            userType: '',
            gender: '',
            address: ''
          },
          unitList: [],
          floorList:[],
          roomList:[],
          unitFloor:{
            unit:'',
            floor:''
          }
        }
      },
      created() {
          this.$axios.post('/member/list').then(res => {
            this.houseHoldData = res.data.data
          })
      },
      mounted(){
        /**
         * 展示单元号
         */
        this.getUnit();
        /**
         * 展示楼层
         */
        this.getFloor();
        /**
         * 展示房间号
         */
        this.getRoom();
      },
      methods :{
        /**
         * 显示添加页面
         */
        onAdd() {
            this.dialogFormVisible = true
          },
        getUnit: function () {
          this.$axios.post('/member/unitList').then(res => {
            this.unitList = res.data.data
          })
        },
        getFloor:function() {
            this.$axios.post('/member/floorList',this.memberForm.unit).then(res => {
              this.floorList = res.data.data
            })
        },
        getRoom:function () {
          this.unitFloor.unit = this.memberForm.unit
          this.unitFloor.floor = this.memberForm.floor
          this.$axios.post('/member/roomList',this.unitFloor).then(res => {
            this.roomList = res.data.data
          })
        },
        selectUnit(val){
            this.memberForm.floor = '';
            this.memberForm.room = '';
            this.getFloor();
            this.getRoom();
        },
        selectFloor(val){
          this.memberForm.room = '';
          this.getRoom();
        }
      }
    }
</script>

<style>
.houseHoldTable {
  position: fixed;
  top:11%;
  left:5%;
}
  .member-search{
    position: fixed;
    top:8%;
    left:5%;
  }
</style>
