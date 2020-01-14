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
      <el-table-column prop="tname" label="开课学期" min-width="70"/>
      <el-table-column prop="id" label="课程编号" show-overflow-tooltip width="70" align="center"/>
      <el-table-column prop="name" label="课程名称" show-overflow-tooltip min-width="150"/>
      <el-table-column prop="score" label="成绩" show-overflow-tooltip/>
      <el-table-column prop="credit" label="学分" show-overflow-tooltip/>
      <el-table-column prop="totalTime" label="总学时" show-overflow-tooltip/>
      <el-table-column prop="point" label="绩点" show-overflow-tooltip/>
      <el-table-column prop="isExam" label="考核方式" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.isExam == 1 ?'考试':'测试'}}
        </template>
      </el-table-column>
      <el-table-column prop="nname" label="课程属性" show-overflow-tooltip/>
      <el-table-column prop="csname" label="课程性质" show-overflow-tooltip/>
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
  import score from '@/api/student/score/score'
  import eFrom from './form'
  import studentInfo from './studentInfo'

  export default {
    components: {
      eFrom,
      studentInfo
    },
    data() {
      return {
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
      this.load()
    },
    methods: {
      load() {
        score.findStudentScore({ params: this.params }).then(res => {
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
      }
    }
  }
</script>

<style scoped>
  .status {
    color: green;
  }
</style>
