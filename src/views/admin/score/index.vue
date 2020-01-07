<template>
  <div class="app-container">
    <el-row :gutter="15">
      <!-- 菜单授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-row>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <el-tooltip class="item" effect="dark" content="选择指定年级" placement="top">
                <span class="role-span">年级列表</span>
              </el-tooltip>
            </div>
            <el-tree
              ref="tree"
              :data="grade"
              show-checkbox
              empty-text="暂无查询到年级列表"
              node-key="id"
              @check="selectGrade"
              highlight-current
              default-expand-all
              :expand-on-click-node="false"
              :props="defaultProps"
            />
          </el-card>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <el-tooltip class="item" effect="dark" content="选择指定班级" placement="top">
                <span class="role-span">班级列表</span>
              </el-tooltip>
            </div>
            <el-tree
              ref="classesTree"
              :data="classes"
              show-checkbox
              empty-text="暂无查询到班级列表"
              node-key="id"
              @check="selectClasses"
              highlight-current
              default-expand-all
              :expand-on-click-node="false"
              :props="defaultPropsClasses"
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
                       :disabled="this.planId == null ? true : false">成绩统计
            </el-button>
            <el-button size="mini" type="primary" icon="el-icon-plus" style="margin-left: 10px" @click="addCourse"
                       :disabled="this.planId == null ? true : false">成绩导出
            </el-button>
          </div>
          <el-table
            ref="table"
            highlight-current-row
            style="width: 100%;"
            :data="courseData"
            empty-text="暂时无课程"
            current-row-key="id"
          >
            <el-table-column type="selection" width="55"/>
            <el-table-column prop="systemName" label="课程体系"/>
            <el-table-column prop="nname" label="课程性质"/>
            <el-table-column prop="csname" label="课程属性"/>
            <el-table-column prop="courseId" label="课程编码" align="center"/>
            <el-table-column prop="cname" label="课程名称" min-width="200"/>
            <el-table-column prop="totalTime" label="总学时" align="center"/>
            <el-table-column prop="credit" label="学分" align="center"/>
            <el-table-column prop="coname" label="开课学院" min-width="100"/>
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
      <e-from ref="form" :is-add="isAdd" @close="loadPlan()"/>
      <!--课程列表组件-->
      <course-list ref="courseList" @close="loadCourse()"></course-list>
    </el-row>
  </div>
</template>

<script>
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  // import eFrom from './form'
  import {listajaxGrade, listajaxClasses} from '@/api/admin/score/score'
  // import courseList from './courseList'

  // crud交由presenter持有
  export default {
    name: 'Role',
    components: {
      // eFrom,
      // courseList
    },
    data() {
      return {
        total: 0,
        currentId: 0, menuLoading: false,
        defaultProps: {
          label: 'name'
        },
        defaultProps: {
          label: 'name'
        },
        defaultPropsClasses: {
          label: 'classname'
        },
        courseData: [],
        params: {
          offset: 1,
          limit: 10,
          keyword: null,
          status: null,
          planId: null
        },
        gradeId:null,
        classesId:null,
        grade: [],
        classes: [],
        isAdd: false,
        loading: true,
      }
    },
    created() {
      listajaxGrade().then(res => {
        this.grade = res
      })
    },
    methods: {
      sizeChange(val) {
        this.params.limit = val
        this.load()
      },
      pageChange(val) {
        this.params.offset = val
        this.load()
      },
      // 保存菜单
      addPlan() {
        this.isAdd = true
        this.$refs.form.dialog = true
        this.$refs.form.form['specialtyId'] = this.specialtyId
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
          name: data.name,
          code: data.code,
          description: data.description
        }
        _this.dialog = true
      },
      loadCourse() {
        listajaxClasses(this.params).then(res => {
          this.courseData = res.records
          this.params.offset = res.current
          this.total = res.total
        })
      },
      selectGrade(node, key, halfNode, halfKey) {
        if (key.checkedKeys.length == 0) {
          this.gradeId = null
          this.classes = null
        } else {
          this.$refs.tree.setCheckedKeys([node.id]);
          this.gradeId = node.id
          listajaxClasses(this.gradeId).then(res => {
            this.classes = res
          })
        }
      },
      selectClasses(node, key, halfNode, halfKey) {
        if (key.checkedKeys.length == 0) {
          this.planId = null
          this.courseData = null
        } else {
          this.$refs.planTree.setCheckedKeys([node.id]);
          this.planId = node.id
          this.params.planId = this.planId
          listajaxClasses(this.params).then(res => {
            this.courseData = res.records
            this.params.offset = res.current
            this.total = res.total
          })
        }
      },
      addCourse(val) {
        this.$refs.courseList.dialog = true
        this.$refs.courseList.form.planId = this.planId
        this.$refs.courseList.load()
      },
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
