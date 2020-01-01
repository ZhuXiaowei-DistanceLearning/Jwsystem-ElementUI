<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-row>
        <el-col :span="6">
          选择时间:
          <el-select v-model="params.sectionId" placeholder="请选择" @change="selectCollege">
            <el-option
              v-for="item in section"
              :key="item.id"
              :label="item.section"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          选择周数:
          <el-select v-model="params.weekId" placeholder="请选择">
            <el-option
              v-for="item in week"
              :key="item.id"
              :label="item.time"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          选择学期:
          <el-select v-model="params.teamId" placeholder="请选择">
            <el-option
              v-for="item in team"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索
          </el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 10px">
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-zoom-in" @click="addScore">成绩录入
        </el-button>
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-zoom-in" @click="StudentInfo">成绩分析
        </el-button>
      </div>
    </div>
    <!--表单组件-->
    <e-from ref="form" :is-add="isAdd" @close="load()"/>
    <!--学生信息组件-->
    <student-info ref="studentForm"/>
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
      <el-table-column prop="name" label="课程名称"/>
      <el-table-column prop="nname" label="课程性质" show-overflow-tooltip/>
      <el-table-column prop="ename" label="考核方式" show-overflow-tooltip/>
      <el-table-column prop="tname" label="开课学期" show-overflow-tooltip/>
      <el-table-column label="操作" width="100px"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">申请结课
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
</template>

<script>
  import service from '../../../utils/request'
  import eFrom from './form'
  import { del,listajaxSection,listajaxTeam,listajaxWeek } from '@/api/teacher/course/course'
  import studentInfo from './studentInfo'

  export default {
    components: {
      eFrom,
      studentInfo
    },
    data() {
      return {
        exportUrl: 'http://localhost:8080/api/export',
        fileList: [],
        loading: true,
        total: 0,
        show: false,
        isAdd: false,
        team: [],
        week: [],
        section: [],
        courseId: null,
        params: {
          offset: 1,
          limit: 10,
          keyword: null,
          teamId: null,
          weekId: null,
          sectionId: null,
          status: null
        },
        data: null
      }
    },
    created() {
      listajaxSection().then(res => {
        this.section = res.records
      })
      listajaxTeam().then(res => {
        this.team = res.records
      })
      listajaxWeek().then(res => {
        this.week = res.records
      })
      this.load()
    },
    methods: {
      load() {
        service.get('/api/course/findCourseByteacherId', { params: this.params }).then(res => {
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
      },
      StudentInfo() {
        this.$refs.studentForm.dialog = true
      },
      handleSelectionChange(val, row) {
        if (val.length == 0) {
          this.courseId = null
        } else if (val.length > 1) {
          this.$refs.table.clearSelection()
          this.$refs.table.toggleRowSelection(row)
          val.splice(0, val.length - 1)
          this.courseId = val[0].id
        } else {
          this.courseId = val[0].id
        }
      },
      addScore(val){
        if(this.courseId == null){
          this.$message({
            type:"error",
            message: "请先选择一门课程"
          })
        }else{
          this.$refs.studentForm.dialog = true
          this.$refs.studentForm.params.id = this.courseId
          this.$refs.studentForm.load()
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
