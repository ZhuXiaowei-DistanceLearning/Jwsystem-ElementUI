<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div>
        <!-- 搜索 -->
        <el-input
          size="small"
          clearable
          placeholder="输入名称或者描述搜索"
          style="width: 200px;"
          class="filter-item"
        />
      </div>
    </div>
    <el-row :gutter="15">
      <!-- 菜单授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-row>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                <span class="role-span">专业列表</span>
              </el-tooltip>
            </div>
            <el-tree
              ref="tree"
              :data="specialty"
              show-checkbox
              empty-text="暂无查询到专业列表"
              node-key="id"
              @check="selectSpecialty"
              highlight-current
              default-expand-all
              :expand-on-click-node="false"
              :props="defaultProps"
            />
          </el-card>
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                <span class="role-span">教学计划列表</span>
              </el-tooltip>
              <el-button
                :loading="menuLoading"
                size="mini"
                style="float: right; padding: 6px 9px"
                type="primary"
                @click="addPlan"
                :disabled="specialtyId !=null ? false:true"
              >添加教学计划
              </el-button>
            </div>
            <el-tree
              ref="planTree"
              :data="plan"
              show-checkbox
              empty-text="暂无查询到计划列表"
              node-key="id"
              @check="selectPlan"
              highlight-current
              default-expand-all
              :expand-on-click-node="false"
              :props="defaultProps"
            />
          </el-card>
        </el-row>
      </el-col>
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">课程列表</span>
            <el-button size="mini" type="primary" icon="el-icon-plus" style="margin-left: 10px" @click="add">添加课程
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
            <el-table-column prop="name" label="名称"/>
            <el-table-column prop="code" label="编号"/>
            <el-table-column :show-overflow-tooltip="true" prop="description" label="描述"/>
            <el-table-column
              label="操作"
              width="200px"
              align="center"
            >
              <template slot-scope="scope">
                <el-row>
                  <el-col :span="10">
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑
                    </el-button>
                  </el-col>
                  <el-col :span="4"/>
                  <el-col :span="10">
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="subDelete(scope.row.id)">删除
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
      <e-from ref="form" :is-add="isAdd" @close="loadPlan()"/>
    </el-row>
  </div>
</template>

<script>
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import service from '../../../utils/request'
  import eFrom from './form'
  import {listajaxSpecialty, listajax,pageQueryPlanCourse} from '@/api/admin/plan/plan'
  // crud交由presenter持有
  export default {
    name: 'Role',
    components: {
      eFrom
    },
    data() {
      return {
        total: 0,
        currentId: 0, menuLoading: false,
        defaultProps: {
          label: 'name'
        },
        courseData: [],
        params: {
          offset: 1,
          limit: 10,
          keyword: null,
          status: null
        },
        specialty: [],
        plan: [],
        isAdd: false,
        loading: true,
        specialtyId: null,
        planId: ''
      }
    },
    created() {
      listajaxSpecialty().then(res => {
        this.specialty = res
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
      loadRole() {
        service.get('/api/role/pageQuery', {params: this.params}).then(res => {
          this.roleData = res.records
          this.loading = false
          this.params.offset = res.current
          this.total = res.realTotal
        })
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
      handleSelectionChange(val, row) {
        this.checkedKey = []
        if (val.length == 0) {
        } else if (val.length > 1) {
          this.$refs.table.clearSelection()
          this.$refs.table.toggleRowSelection(row)
          this.roleId = row.id
          val.splice(0, val.length - 1)
        } else {
          this.roleId = row.id
        }
        service.get('/api/role/findMenuByRole', {params: {'roleId': this.roleId}}).then(res => {
          for (const i of res) {
            if (i.pid != 0) {
              this.checkedKey.push(i.id)
            }
          }
          this.$refs.tree.setCheckedKeys(this.checkedKey)
        })
      },
      loadPlan() {
        listajax(this.specialtyId).then(res => {
          this.plan = res
        })
      },
      selectSpecialty(node, key, halfNode, halfKey) {
        if (key.checkedKeys.length == 0) {
          this.specialtyId = null
          this.plan = null
        } else {
          this.$refs.tree.setCheckedKeys([node.id]);
          this.specialtyId = node.id
          listajax(this.specialtyId).then(res => {
            this.plan = res
          })
        }
      },
      selectPlan(node, key, halfNode, halfKey) {
        if (key.checkedKeys.length == 0) {
          this.planId = null
          this.plan = null
        } else {
          this.$refs.tree.setCheckedKeys([node.id]);
          this.planId = node.id
          pageQueryPlanCourse(this.planId).then(res => {
            this.courseData = res
          })
        }
      },
      subDelete(id) {
        this.$confirm('确定进行此操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(id).then(res => {
            this.$notify({
              title: '成功',
              type: 'success',
              duration: 2500
            })
            this.loadRole()
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
