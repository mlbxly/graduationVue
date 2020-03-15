<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button type="warning" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
        <el-select v-model="query.unit" placeholder="单元号" prop="unit" @change="selectUnit(query.unit)" class="handle-select mr10">
          <el-option v-for="item in unitList" :key="item.id" :label="item":value="item"></el-option>
        </el-select>
        <el-select v-model="query.floor" placeholder="楼层号" prop="floor" @change="selectFloor(query.floor)" class="handle-select mr10">
          <el-option v-for="item in floorList" :key="item.id" :label="item":value="item"></el-option>
        </el-select>
        <el-select v-model="query.room" placeholder="房间号" prop="room" class="handle-select mr10">
          <el-option v-for="item in roomList" :key="item.id" :label="item":value="item"></el-option>
        </el-select>
          <el-date-picker v-model="query.startTime" type="datetime" placeholder="登记时间" style="width: 195px;"></el-date-picker>
          -
          <el-date-picker v-model="query.endTime" type="datetime" placeholder="登记时间" style="width: 195px;margin-right: 15px;"></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary"icon="el-icon-refresh-right" @click="cancelSearch">重置</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">添加</el-button>
      </div>
        <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="houseId" label="房产编号" align="center"></el-table-column>
          <el-table-column prop="houseName" label="产权地址" align="center"></el-table-column>
          <el-table-column prop="createTime" label="登记时间" align="center"></el-table-column>
          <el-table-column label="状态" align="center" width="120">
            <template slot-scope="scope">
              <el-tag :type="scope.row.state==='登记入住'?'success':(scope.row.state==='无人入住'?'danger':'')">
                {{scope.row.state}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-view" @click="seeMember(scope.$index)">查看住户</el-button>
              <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="display: flex;justify-content: center;margin-top: 642px;" >
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

    <!-- 弹出添加框 -->
    <el-dialog title="添加" :visible.sync="editVisible" width="30%">
      <el-form ref="homeForm" :model="homeForm" label-width="70px">
        <el-form-item label="单元号">
          <el-input v-model="homeForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="楼层">
          <el-input v-model="homeForm.floor"></el-input>
        </el-form-item>
        <el-form-item label="房间号">
          <el-input v-model="homeForm.room"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="cancelAdd">取 消</el-button>
                <el-button type="primary" @click="saveHome">确 定</el-button>
            </span>
    </el-dialog>
    <el-dialog title="住户信息" :visible.sync="memberVisible" width="30%">
      <el-form ref="memberVo" :model="memberVo" label-width="70px">
        <el-form-item label="住户姓名">
          <el-input v-model="memberVo.username" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="memberVo.phone" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="memberVo.removed" disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="入住时间">
          <el-input v-model="memberVo.createTime" disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'house',
    data() {
      return {
        query: {
          unit:'',
          floor:'',
          room:'',
          startTime:'',
          endTime:''
        },
        tableData: [],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        memberVisible:false,
        pageSize:7,
        currentPage:1,
        total:0,
        unitList:[],
        floorList:[],
        roomList:[],
        unitFloor:{
          unit:'',
          floor:''
        },
        homeForm: {
          unit:'',
          floor:'',
          room:''
        },
        memberVo:{
          username: '',
          phone:'',
          removed:'',
          createTime:''
        },
        idx: -1,
        id: -1,
        houseIds:''
      };
    },
    mounted() {
      this.initHouse();
      //展示单元号
      this.getUnit();
      //展示楼层
      this.getFloor();
      //展示房间号
      this.getRoom();
    },
    methods: {
      //后台获取单元号大全作为单元号下拉框选项
      getUnit: function () {
        this.$axios.post('/member/unitList').then(res => {
          this.unitList = res.data.data
        })
      },
      //后台获取楼层大全作为楼层下拉框选项
      getFloor:function() {
        this.$axios.post('/member/floorList',this.query.unit).then(res => {
          this.floorList = res.data.data
        })
      },
      //后台获取房间号大全作为房间号下拉框选项
      getRoom:function () {
        this.unitFloor.unit = this.query.unit
        this.unitFloor.floor = this.query.floor
        this.$axios.post('/member/roomList',this.unitFloor).then(res => {
          this.roomList = res.data.data
        })
      },
      //重选单元号刷新下拉楼层和房间下拉选项
      selectUnit(val){
        this.query.floor = '';
        this.query.room = '';
        this.getFloor();
        this.getRoom();
      },
      //重选楼层刷新房间下拉框选项
      selectFloor(val){
        this.query.room = '';
        this.getRoom();
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      // 获取 home数据
      initHouse() {
        this.$axios.post("/home/list/?page="+this.currentPage+"&size="+this.pageSize).then(res => {
          this.tableData = res.data.data.data
          this.total = res.data.data.total
        })
      },
      currentChange(page) {
        this.currentPage=page;
        this.initHouse();
      },
      // 触发搜索按钮
      handleSearch() {
        this.currentPage = 1;
        this.$axios.post("/home/list/?page="+this.currentPage+"&size="+this.pageSize,this.query).then(res => {
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        })
      },
      // 删除操作
      handleDelete(index) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$axios.post('/home/remove',this.tableData[index].houseId).then(res => {
              if(res.data.code == 0){
                window.location.reload();
              }else{
                this.$message.error(res.data.msg);
              }
            })
          }).catch(() => {});
      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      delAllSelection() {
        const length = this.multipleSelection.length;
        for(let i =0 ;i<length;i++){
          this.houseIds += this.multipleSelection[i].houseId+"/"
        }
        this.$confirm('此操作将批量删除房屋, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=> {
          this.$axios.post('/home/removeIds', this.houseIds).then(res => {
            if (res.data.code == 0) {
              window.location.reload();
            }else{
              this.$message.error(res.data.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      //弹出添加窗口
      handleAdd(){
        this.editVisible = true;
      },
      //取消添加，关闭添加窗口
      cancelAdd() {
        this.homeForm.unit = '';
        this.homeForm.floor = '';
        this.homeForm.room = '';
        this.editVisible =false;
      },
      // 确认添加
      saveHome() {
        this.$axios.post('/home/saveHome',this.homeForm).then(res =>{
          if(res.data.code == 0){
            this.$message.success(`添加成功`).then(window.location.reload());
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      seeMember(index){
        this.$axios.post('/home/see',this.tableData[index].houseId).then(res =>{
          if(res.data.code == 0){
            this.memberVisible = true;
            this.memberVo = res.data.data
          }else{
            this.$message.error(res.data.msg);
          }
        })
      },
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
      },
      cancelSearch(){
        this.query.unit = '';
        this.query.floor = '';
        this.query.room = '';
        this.query.startTime = '';
        this.query.endTime = '';
        this.getUnit();
        this.getFloor();
        this.getRoom();
      }
    }
  };
</script>

<style scoped>
  .handle-box {
    position: fixed;
    top:10%;
    left:10%;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    width: 92%;
    font-size: 14px;
    position: fixed;
    left:5%;
    top:17%;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
