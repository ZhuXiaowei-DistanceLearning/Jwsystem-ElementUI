<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :visible.sync="dialog" :before-close="handleClose"
             title="学生信息列表" width="80%">
    <div class="app-container">
      <!--工具栏-->
      <e-form :is-add="true" ref="form" @close="load()"></e-form>
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
        <el-table-column
          type="selection"
          width="55"/>
        <el-table-column prop="sid" label="学号"/>
        <el-table-column prop="sname" label="学生姓名"/>
        <el-table-column prop="cname" label="所在班级" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="spname" label="所属专业" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="tcname" label="所属学院" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gname" label="年级" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="absent" label="缺勤" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="attendance" label="考勤分" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="usually" label="平时分" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="exam" label="期末成绩" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="score" label="总成绩" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="100px"
                         align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" icon="el-icon-edit" @click="addScore(scope.row)">添加成绩
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-row>
        <el-col :offset="10">
          <el-pagination
            :total="total"
            :current-page="params.offset"
            style="margin-top: 8px;"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, prev, pager, next, sizes"
            @size-change="sizeChange"
            @current-change="pageChange"/>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
  import service from '../../../utils/request'
  import eForm from './form'

  export default {
    components: {
      eForm
    },
    data() {
      return {
        dialog: false,
        loading: true,
        total: 0,
        isAdd: false,
        college: [],
        specialty: [],
        grade: [],
        sid: null,
        params: {
          offset: 1,
          limit: 10,
          keyword: null,
          id: "",
          sid: ""
        },
        data: null
      }
    },
    methods: {
      load() {
        service.get('/api/course/findStudentByCourseId', {params: this.params}).then(res => {
          this.data = res.records
          this.loading = false
          this.currentPage = res.current
          this.total = res.realTotal
        }).catch(error => {
          this.loading = false
          this.$notify({
            title: '错误信息',
            message: '登录超时，请重新登录'
          })
          this.$router.push({path: '/login'})
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
          .catch(_ => {
          });
      },
      handleSelectionChange(val, row) {
        if (val.length == 0) {
          this.param.sid = null
        } else if (val.length > 1) {
          this.$refs.table.clearSelection()
          this.$refs.table.toggleRowSelection(row)
          val.splice(0, val.length - 1)
          this.param.sid = val[0].id
        } else {
          this.param.sid = val[0].id
        }
      },
      addScore(val) {
        this.$refs.form.dialog = true
        this.$refs.form.form["cid"] = this.params.id
        this.$refs.form.form["sid"] = val.sid
      }
    }
  }
</script>

<style scoped>
  .status {
    color: green;
  }
</style>
