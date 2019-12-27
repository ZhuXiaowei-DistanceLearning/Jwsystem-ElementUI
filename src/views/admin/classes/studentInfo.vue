<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :visible.sync="dialog" :before-close="handleClose"
             title="学生信息列表" width="80%">
    <div class="app-container">
      <!--工具栏-->
      <div class="head-container">
        <!-- 搜索 -->
        <div style="margin-top: 10px">
          <el-button class="filter-item" size="mini" type="success" icon="el-icon-circle-plus-outline" @click="add">新增
          </el-button>
        </div>
      </div>
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
        <el-table-column prop="classname" label="学号"/>
        <el-table-column prop="cname" label="姓名"/>
        <el-table-column prop="sname" label="性别" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gname" label="籍贯" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gname" label="班级" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gname" label="年级" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gname" label="入学时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gname" label="手机" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gname" label="身份证号" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gname" label="家庭住址" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="gname" label="政治面貌" show-overflow-tooltip>
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
  import eFrom from './form'
  import { download } from '@/api/data'
  import { parseTime, downloadFile } from '@/utils/index'
  import { del, listajaxCollege, listajaxSpecialty, listajaxGrade } from '@/api/admin/classes/classes'

  export default {
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    components: {
      eFrom
    },
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
          collegeId: null,
          specialtyId: null,
          gradeId: null,
          status: null
        },
        data: null
      }
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        service.get('/api/student/pageQuery', { params: this.params }).then(res => {
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
      add() {
        this.isAdd = true
        this.$refs.form.dialog = true
      },
      edit(data) {
        this.isAdd = false
        const _this = this.$refs.form
        _this.form = {
          id: data.id,
          classname: data.classname,
          collegeId: data.collegeId,
          specialtyId: data.specialtyId,
          gradeId: data.gradeId
        }
        _this.dialog = true
      },
      toQuery() {
        this.load()
      },
      selectCollege(val) {
        listajaxSpecialty(val).then(res => {
          this.specialty = res
        })
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
      }
    }
  }
</script>

<style scoped>
  .status {
    color: green;
  }
</style>
