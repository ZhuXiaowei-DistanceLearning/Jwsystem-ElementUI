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
      <!--角色管理-->
      <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span class="role-span">角色列表</span>
            <el-button size="mini" type="primary" icon="el-icon-plus" style="margin-left: 10px" @click="add">添加角色
            </el-button>
          </div>
          <el-table
            ref="table"
            v-loading="loading"
            highlight-current-row
            style="width: 100%;"
            :data="roleData"
            current-row-key="id"
            @select="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="code" label="编号" />
            <el-table-column :show-overflow-tooltip="true" prop="description" label="描述" />
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
                  <el-col :span="4" />
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
      <e-from ref="form" :is-add="isAdd" @close="loadRole()" />
      <!-- 菜单授权 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
              <span class="role-span">菜单分配</span>
            </el-tooltip>
            <el-button
              :loading="menuLoading"
              size="mini"
              style="float: right; padding: 6px 9px"
              type="primary"
              @click="saveMenu"
            >保存
            </el-button>
          </div>
          <el-tree
            ref="tree"
            :data="menuData"
            show-checkbox
            empty-text="暂无查询到权限列表"
            node-key="id"
            highlight-current
            :default-checked-keys="checkedKey"
            default-expand-all
            :expand-on-click-node="false"
            :props="defaultProps"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import service from '../../../utils/request'
import eFrom from './form'
import { del, saveMenu } from '@/api/admin/role/role'
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
      params: {
        offset: 1,
        limit: 10,
        keyword: null,
        status: null
      },
      menuData: [],
      isAdd: false,
      roleData: [],
      loading: true,
      roleId: null,
      expandKey: [],
      checkedKey: []
    }
  },
  created() {
    this.loadMenu()
    this.loadRole()
  },
  methods: {
    loadMenu() {
      service.get('/api/function/pageQuery').then(res => {
        this.menuData = res
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
    loadRole() {
      service.get('/api/role/pageQuery', { params: this.params }).then(res => {
        this.roleData = res.records
        this.loading = false
        this.params.offset = res.current
        this.total = res.realTotal
      })
    },
    // 保存菜单
    saveMenu() {
      this.menuLoading = true
      const params = {
        'roleId': this.roleId,
        'menuIds': this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      }
      saveMenu(params).then(res => {
        if (res.status == 1) {
          this.$message({
            type: 'success',
            message: '保存权限成功'
          })
        }
        this.menuLoading = false
      }).catch(res => {
        this.$message({
          type: 'error',
          message: '保存失败'
        })
        this.menuLoading = false
      })
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
      this.expandKey = []
      if (val.length == 0) {
      } else if (val.length > 1) {
        this.$refs.table.clearSelection()
        this.$refs.table.toggleRowSelection(row)
        this.roleId = row.id
        val.splice(0, val.length - 1)
      } else {
        this.roleId = row.id
      }
      service.get('/api/role/findMenuByRole', { params: { 'roleId': this.roleId }}).then(res => {
        for (const i of res) {
          if (i.pid != 0) {
            this.checkedKey.push(i.id)
          }
        }
        this.$refs.tree.setCheckedKeys(this.checkedKey)
      })
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
