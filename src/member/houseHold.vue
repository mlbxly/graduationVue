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
        <el-select v-model="memberSearch.userType" placeholder="身份类型" style="width: 100px;">
          <el-option label="业主" value="1"></el-option>
          <el-option label="租户" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model="memberSearch.removed" placeholder="状态" style="width: 110px;">
          <el-option label="正常" value="1"></el-option>
          <el-option label="离开" value="2"></el-option>
          <el-option label="停水" value="3"></el-option>
          <el-option label="停电" value="4"></el-option>
          <el-option label="停水+停电" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入住时间">
        <el-date-picker v-model="memberSearch.startTime" type="datetime" placeholder="选择日期时间"
                        style="width: 175px;"></el-date-picker>
        -
        <el-date-picker v-model="memberSearch.endTime" type="datetime" placeholder="选择日期时间"
                        style="width: 175px;"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
        <el-button type="primary" @click="onAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <div>
       <el-table :data="houseHoldData" stripe style="width: 90%" class="houseHoldTable" height="600">
         <el-table-column prop="username" label="用户名" width="120" align="center">
         </el-table-column>
         <el-table-column prop="phone" label="联系电话" width="120" align="center">
         </el-table-column>
         <el-table-column prop="userType" label="住户类型" width="120" align="center">
         </el-table-column>
         <el-table-column prop="removed" label="状态" width="120" align="center">
         </el-table-column>
         <el-table-column prop="home" label="入住房间" width="180" align="center">
         </el-table-column>
         <el-table-column prop="leaseDuration" label="租赁时长/年" width="100" align="center">
         </el-table-column>
         <el-table-column prop="createTime" label="入住时间" width="180" align="center">
         </el-table-column>
         <el-table-column label="操作" align="center">
           <template slot-scope="scope">
             <el-button size="mini" type="danger" @click="removeMember(scope.$index)">解除合同</el-button>
             <el-button size="mini" type="warning" @click="violationHandling(scope.$index)">违规处理</el-button>
             <el-button size="mini" type="primary" @click="cancelViolation(scope.$index)">撤销处罚</el-button>
           </template>
         </el-table-column>
       </el-table>
    </div>
    <el-dialog title="住户添加" :visible.sync="dialogFormVisible" class="addMemberForm">
      <el-form ref="memberForm" :model="memberForm" label-width="80px">
        <el-form-item label="住户姓名">
          <el-input v-model="memberForm.username" ></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="memberForm.phone" ></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
          <el-select v-model="memberForm.userType" placeholder="请选择用户类型" @change ="addLeaseDuration(memberForm.userType)" >
            <el-option label="业主" value="1"></el-option>
            <el-option label="租户" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入住房间">
          <el-select v-model="memberForm.unit" placeholder="单元号" prop="unit" @change="selectUnit(memberForm.unit)" style="width: 100px;">
            <el-option v-for="item in unitList" :key="item.id" :label="item":value="item"></el-option>
          </el-select>
          <el-select v-model="memberForm.floor" placeholder="楼层号" prop="floor" @change="selectFloor(memberForm.floor)" style="width: 100px;">
            <el-option v-for="item in floorList" :key="item.id" :label="item":value="item"></el-option>
          </el-select>
          <el-select v-model="memberForm.room" placeholder="房间号" prop="room" style="width: 100px;">
            <el-option v-for="item in roomList" :key="item.id" :label="item":value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租赁时长">
          <el-input v-model="memberForm.leaseDuration" v-bind:disabled="lease"></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="onAddMember">添加</el-button>
          <el-button @click="cancelMember">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="违规处理" :visible.sync="violationFormVisible" class="violation">
      <el-form :inline="true" :model="violationForm">
        <el-form-item label="违规用户">
          <el-input v-model="violationForm.username" :placeholder="violationUsername" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="处罚选择">
          <el-select v-model="violationForm.punish" placeholder="处罚选择">
            <el-option label="停水" value="1"></el-option>
            <el-option label="停电" value="2"></el-option>
            <el-option label="停水+停电" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onViolation">确定</el-button>
          <el-button @click="callOffViolation">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
    import ElOption from "../../node_modules/element-ui/packages/select/src/option.vue";
    import ElButton from "../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
      components: {
        ElButton,
        ElOption},
      name: 'HouseHold',
      data() {
        return {
          houseHoldData: [],
          memberSearch:{
            username: '',
            phone: '',
            userType: '',
            removed: '',
            startTime: '',
            endTime: ''
          },
          dialogFormVisible:false,
          violationFormVisible:false,
          memberForm: {
            username: '',
            phone: '',
            unit: '',
            floor:'',
            room:'',
            userType: '',
            leaseDuration:''
          },
          unitList: [],
          floorList:[],
          roomList:[],
          unitFloor:{
            unit:'',
            floor:''
          },
          lease: false,
          violationForm:{
            userId:'',
            username:'',
            punish:''
          },
          propertyName:'',
          violationUsername:''
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
        //显示添加页面
        onAdd() {
            this.dialogFormVisible = true
          },
        //后台获取单元号大全作为单元号下拉框选项
        getUnit: function () {
          this.$axios.post('/member/unitList').then(res => {
            this.unitList = res.data.data
          })
        },
        //后台获取楼层大全作为楼层下拉框选项
        getFloor:function() {
            this.$axios.post('/member/floorList',this.memberForm.unit).then(res => {
              this.floorList = res.data.data
            })
        },
        //后台获取房间号大全作为房间号下拉框选项
        getRoom:function () {
          this.unitFloor.unit = this.memberForm.unit
          this.unitFloor.floor = this.memberForm.floor
          this.$axios.post('/member/roomList',this.unitFloor).then(res => {
            this.roomList = res.data.data
          })
        },
        //重选单元号刷新下拉楼层和房间下拉选项
        selectUnit(val){
            this.memberForm.floor = '';
            this.memberForm.room = '';
            this.getFloor();
            this.getRoom();
        },
        //重选楼层刷新房间下拉框选项
        selectFloor(val){
          this.memberForm.room = '';
          this.getRoom();
        },
        // 添加用户窗口根据用户类型判断租赁时长是否可填
        addLeaseDuration(val){
          if(val == 2) {
            this.lease = false
          }else{
            this.lease = true
            this.memberForm.leaseDuration = ''
          }
        },
        //取消添加用户
        cancelMember() {
          this.dialogFormVisible = false;
          this.memberForm.username = '';
          this.memberForm.phone = '';
          this.memberForm.userType = '';
          this.memberForm.unit = '';
          this.memberForm.floor = '';
          this.memberForm.room = '';
          this.memberForm.leaseDuration = '';
        },
        //确认添加住户
        onAddMember(){
          this.$axios.post('/member/addMember',this.memberForm).then(res => {
            if(res.data.code == 0){
              window.location.reload();
            }else{
              this.$confirm(res.data.msg,'错误提示',{type:'error'})
            }
          })
        },
        //住户解除合同，离去
        removeMember(index){
          this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(()=>{
            console.log(this.houseHoldData[index])
            this.$axios({
              url:'http://localhost:8090/member/delete',
              method:'post',
              data:this.houseHoldData[index]
            }).then(res => {
              if(res.data.code === 0){window.location.reload()}
              else{this.$confirm(res.data.msg,'错误提示',{type:'error'})}
            }).catch(failResponse => {})
            }).catch(()=>{
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        //弹出违规处理窗口
        violationHandling(index){
          this.violationFormVisible= true
          this.violationForm.userId = this.houseHoldData[index].userId
          this.violationForm.uasername = this.houseHoldData[index].username
          this.violationUsername = this.houseHoldData[index].username
        },
        //取消违规处理
        callOffViolation(){
          this.violationFormVisible= false
          this.violationForm.punish = ''
        },
        //确认处理用户
        onViolation(){
          this.$axios.post('/member/violation',this.violationForm).then(res => {
            if(res.data.code == 0){
              window.location.reload();
            }else{
              this.$confirm(res.data.msg,'错误提示',{type:'error'})
            }
          })
        },
        //撤销用户的违规处理处罚
        cancelViolation(index){
          this.$confirm('确定取消对该用户的处罚', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then(()=>{
            this.$axios.post('/member/cancelViolation',this.houseHoldData[index].userId).then(res =>{
              if(res.data.code == 0){window.location.reload()}
              else{this.$confirm(res.data.msg,'错误提示',{type:'error'})}
            })
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        },
        //搜索条件重置
        onReset(){
          this.memberSearch.username = ''
          this.memberSearch.phone = ''
          this.memberSearch.userType = ''
          this.memberSearch.removed = ''
          this.memberSearch.startTime = ''
          this.memberSearch.endTime = ''
        },
        //条件搜索
        onSearch(){
          this.$axios.post('/member/list',this.memberSearch).then(res =>{
            if(res.data.code == 0){
              this.houseHoldData = res.data.data
            }
          })
        }
      }
    }
</script>

<style>
.houseHoldTable {
  position: fixed;
  top:15%;
  left:7%;
}
  .member-search{
    position: fixed;
    top:10%;
    left:7%;
  }
  .addMemberForm{
    width:60%;
    position: fixed;
    left:20%;
  }
</style>
