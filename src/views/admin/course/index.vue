<template>
  <div class="app-container">
    <el-row :gutter="15">
      <!-- 菜单授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-row>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <el-tooltip class="item" effect="dark" content="选择指定体系" placement="top">
                <span class="role-span">课程体系列表</span>
              </el-tooltip>
            </div>
            <el-tree
              ref="tree"
              :data="courseSystem"
              show-checkbox
              empty-text="暂无查询到课程体系"
              node-key="id"
              @check="selectCourseSystem"
              highlight-current
              default-expand-all
              :expand-on-click-node="false"
              :props="defaultProps"
            />
          </el-card>
        </el-row>
      </el-col>
      <!--课程管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">课程列表</span>
            <el-button size="mini" type="primary" icon="el-icon-plus" style="margin-left: 10px" @click="addCourse"
                       :disabled="this.systemId == null ? true : false">添加课程
            </el-button>
          </div>
          <el-table
            ref="table"
            highlight-current-row
            style="width: 100%;"
            :data="course"
            empty-text="暂时无课程"
            current-row-key="id"
          >
            <el-table-column prop="id" label="课程编号" min-width="100" show-overflow-tooltip/>
            <el-table-column prop="name" label="课程名称" min-width="200"/>
            <el-table-column prop="classroom" label="上课教室"/>
            <el-table-column prop="sname" label="上课时间" show-overflow-tooltip min-width="100">
              <template slot-scope="scope">
                {{scope.row.sw}}&nbsp; {{scope.row.sse}}
              </template>
            </el-table-column>
            <el-table-column prop="wname" label="上课周数" show-overflow-tooltip min-width="120"/>
            <el-table-column prop="teacherName" label="上课教师" show-overflow-tooltip min-width="120"/>
            <el-table-column prop="collegeName" label="开课学院" show-overflow-tooltip min-width="120"/>
            <el-table-column prop="nname" label="课程性质" show-overflow-tooltip min-width="100"/>
            <el-table-column prop="totalTime" label="总学时" show-overflow-tooltip width="60"/>
            <el-table-column prop="ename" label="考核方式" show-overflow-tooltip min-width="80"/>
            <el-table-column
              label="操作"
              width="200px"
              align="center"
            >
              <template slot-scope="scope">
                <el-row>
                  <el-col :push="8" :span="10">
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑
                    </el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
          <!--分页组件-->
          <el-pagination
            :total="total"
            :current-page="params.offset"
            style="margin-top: 8px;"
            :page-sizes="[10, 20, 30, 50]"
            layout="total, prev, pager, next, sizes"
            @size-change="sizeChange"
            @current-change="pageChange"
          />
        </el-card>
      </el-col>
      <!--表单组件-->
      <e-from ref="form" :is-add="isAdd" @close="loadCourse()"/>
    </el-row>
  </div>
</template>

<script>
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import service from '../../../utils/request'
  import eFrom from './form'
  import {
    findCourseBySystemId,
    listajax,
    pageQueryPlanCourse,
    delPlanCourse,
    courseSystemlistajax
  } from '@/api/admin/course/course'
  import courseList from './courseList'

  // crud交由presenter持有
  export default {
    name: 'Role',
    components: {
      eFrom,
      courseList
    },
    data() {
      return {
        total: 0,
        currentId: 0, menuLoading: false,
        defaultProps: {
          label: 'name'
        },
        params: {
          offset: 1,
          limit: 10,
          keyword: null,
          status: null,
          systemId: null
        },
        specialty: [],
        courseSystem: [],
        course:[],
        isAdd: false,
        loading: true,
        systemId: null,
        planId: null
      }
    },
    created() {
      this.loadCourseSystem()
    },
    methods: {
      loadCourseSystem() {
        courseSystemlistajax().then(res => {
          this.courseSystem = res
        })
      },
      sizeChange(val) {
        this.params.limit = val
        this.loadCourse()
      },
      pageChange(val) {
        this.params.offset = val
        this.loadCourse()
      },
      // 保存菜单
      addPlan() {
        this.isAdd = true
        this.$refs.form.dialog = true
        this.$refs.form.form['specialtyId'] = this.specialtyId
      },
      edit(data) {
        console.log(data)
        this.isAdd = false
        const _this = this.$refs.form
        _this.form = {
          id: data.id,
          name: data.name,
          credit: data.credit,
          point: data.point,
          classroom: data.classroom,
          totalTime: data.totalTime,
          wayId: data.wayId,
          natureId: data.natureId,
          teamId: data.teamId,
          cstatusId: data.cstatusId,
          sectionId: data.sectionId,
          weekId: data.weekId,
          teacherId: data.teacherId,
          totalPeople: data.totalPeople,
          isExam: data.isExam
        }
        _this.dialog = true
      },
      loadCourse() {
        findCourseBySystemId(this.params).then(res => {
          this.course = res.records
          this.currentPage = res.current
          this.total = res.realTotal
        })
      },
      selectCourseSystem(node, key, halfNode, halfKey) {
        if (key.checkedKeys.length == 0) {
          this.systemId = null
          this.course = null
        } else {
          this.$refs.tree.setCheckedKeys([node.id])
          this.systemId = node.id
          this.params.systemId = this.systemId
          findCourseBySystemId(this.params).then(res => {
            this.course = res.records
            this.currentPage = res.current
            this.total = res.realTotal
          })
        }
      },
      addCourse(val) {
        this.$refs.form.dialog = true
        this.isAdd = true
        this.$refs.form.form['systemId'] = this.systemId
        this.$refs.form.load()
      },
      subDelete(id) {
        this.$confirm('确定进行此操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delPlanCourse(id).then(res => {
            this.$notify({
              title: '成功',
              type: 'success',
              duration: 2500
            })
            this.loadCourse()
          }).catch(err => {
            console.log(err.response.data.message)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .role-span {
    font-weight: bold;
    color: #303133;
    font-size: 15px;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  /deep/ .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
