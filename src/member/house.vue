<template>
  <div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>
        <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-select v-model="query.unit" placeholder="单元号" class="handle-select mr10">
          <el-option key="1" label="广东省" value="广东省"></el-option>
          <el-option key="2" label="湖南省" value="湖南省"></el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      <div style="display: flex;justify-content: center;margin-top: 575px;" >
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
  </div>
</template>

<script>
  export default {
    name: 'house',
    data() {
      return {
        query: {
          address: '',
          name: '',
          unit:''
        },
        tableData: [],
        multipleSelection: [],
        delList: [],
        editVisible: false,
        pageSize:10,
        currentPage:1,
        total:0,
        homeForm: {
          unit:'',
          floor:'',
          room:''
        },
        idx: -1,
        id: -1
      };
    },
    mounted() {
      this.initHouse();
    },
    methods: {
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
      // 触发搜索按钮
      handleSearch() {
        this.$set(this.query, 'pageIndex', 1);
        this.getData();
      },
      // 删除操作
      handleDelete(index, row) {
        // 二次确认删除
        this.$confirm('确定要删除吗？', '提示', {
          type: 'warning'
        })
          .then(() => {
            this.$message.success('删除成功');
            this.tableData.splice(index, 1);
          })
          .catch(() => {});
      },
      // 多选操作
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      delAllSelection() {
        const length = this.multipleSelection.length;
        let str = '';
        this.delList = this.delList.concat(this.multipleSelection);
        for (let i = 0; i < length; i++) {
          str += this.multipleSelection[i].name + ' ';
        }
        this.$message.error(`删除了${str}`);
        this.multipleSelection = [];
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
      // 分页导航
      handlePageChange(val) {
        this.$set(this.query, 'pageIndex', val);
        this.getData();
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
