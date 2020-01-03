<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :visible.sync="dialog" :before-close="handleClose"
             title="学生信息列表" width="80%">
    <div class="app-container">
      <!--工具栏-->
      <!--表格渲染-->
      <el-table
        ref="table"
        v-loading="loading"
        :data="data"
        size="small"
        style="width: 100%;"
        stripe
        empty-text="暂无数据"
        highlight-current-row
        current-row-key="id"
        @select="handleSelectionChange"
      >
        <el-table-column prop="name" label="课程名称"/>
        <el-table-column prop="wname" label="周数"/>
        <el-table-column prop="spname" label="上课时间" show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.sse}} {{scope.row.sw}}
          </template>
        </el-table-column>
        <el-table-column prop="classroom" label="上课教师" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="100px"
                         align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-remove-outline" @click="cancel(scope.row)">退选
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
  import service from '../../../utils/request'

  export default {
    data() {
      return {
        dialog:false,
        loading: true,
        total: 0,
        isAdd: false,
        college: [],
        specialty: [],
        grade: [],
        classesId: null,
        classname: null,
        params: {
          offset: 1,
          limit: 10,
          keyword: null,
          id: ""
        },
        data: null
      }
    },
    methods: {
      load() {
        service.get('/api/score/findSelectCourseByStudentId', { params: this.params }).then(res => {
          this.data = res
          this.loading = false
        }).catch(error => {
          this.loading = false
          this.$notify({
            title: '错误信息',
            message: '登录超时，请重新登录'
          })
          this.$router.push({ path: '/login' })
        })
      },
      sizeChange(val) {
        this.params.limit = val
        this.load()
      },
      pageChange(val) {
        this.params.offset = val
        this.load()
      },
      toQuery() {
        this.load()
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.dialog = false
            done();
          })
          .catch(_ => {});
      },
      handleSelectionChange(val, row) {
        if (val.length == 0) {
          this.classesId = null
          this.classname = null
        } else if (val.length > 1) {
          this.$refs.table.clearSelection()
          this.$refs.table.toggleRowSelection(row)
          val.splice(0, val.length - 1)
          this.classesId = val[0].id
          this.classname = val[0].classname
        } else {
          this.classesId = val[0].id
          this.classname = val[0].classname
        }
      },
      cancel(val){
        this.$confirm('确认退选？')
          .then(_ => {
            service.delete("/api/score/delete",{params: {
              cid: val.id
            }}).then(res=>{
              console.log(res)
              console.log(res.status)
              console.log(res.status == 1)
              console.log(res.status == "1")
              if(res.status == 1){
                this.$message({
                  type:"success",
                  message: "退选成功"
                })
              }else{
                this.$message({
                  type:"error",
                  message: "课程已退选,请勿重复点击"
                })
              }
              this.load()
            })
          })
          .catch(_ => {
            this.$message({
              type:"error",
              message: "课程失败"
            })
          });
      }
    }
  }
</script>

<style scoped>
  .status {
    color: green;
  }
</style>
