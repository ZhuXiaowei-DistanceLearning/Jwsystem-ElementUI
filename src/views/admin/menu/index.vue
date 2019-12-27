<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-input v-model="params.keyword" clearable placeholder="输入搜索内容" style="width: 200px;" class="filter-item"
                @keyup.enter.native="toQuery"/>
      <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索</el-button>
      <el-button class="filter-item" size="mini" type="primary" icon="el-icon-plus" @click="add">新增</el-button>
    </div>
    <!--表单组件-->
    <e-from ref="form" :is-add="isAdd" @close="load()"/>
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
          <span class="role-span">菜单分配</span>
        </el-tooltip>
        <div style="margin: 10px">
        <el-button type="primary" icon="el-icon-circle-plus-outline" round @click="add">添加权限</el-button>
        </div>
        <el-tree
          :data="data"
          show-checkbox
          empty-text="暂无查询到权限列表"
          node-key="id"
          highlight-current
          default-expand-all
          :expand-on-click-node="false"
          :props="defaultProps"
          :render-content="renderContent">
        </el-tree>
      </div>
    </el-card>
  </div>
</template>

<script>
  import service from '../../../utils/request'
  import eFrom from './form'
  import { del } from '@/api/admin/college/college'

  export default {
    components: {
      eFrom
    },
    data() {
      return {
        loading: true,
        delLoading: false,
        total: 0,
        isAdd: false,
        params: {
          offset: 1,
          limit: 10,
          keyword: null,
          status: null
        },
        data: null,
        defaultProps: {
          label: 'name'
        }
      }
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        service.get('/api/function/pageQuery').then(res => {
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
      subDelete(id) {
        this.delLoading = true
        this.$confirm('确定进行此操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          del(id).then(res => {
            this.delLoading = false
            this.$notify({
              title: '成功',
              type: 'success',
              duration: 2500
            })
            this.load()
          }).catch(err => {
            this.delLoading = false
            console.log(err.response.data.message)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
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
          name: data.name
        }
        _this.dialog = true
      },
      toQuery() {
        this.load()
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] }
        if (!data.children) {
          this.$set(data, 'children', [])
        }
        data.children.push(newChild)
      },

      remove(node, data) {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
      },
      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
          <span>{node.label}</span>
          <span style="margin-left:10px">
          <span><i class="el-icon-edit-outline" on-click={ () => this.edit(node, data) }></i></span>
          <span><i class="el-icon-remove-outline"on-click={ () => this.remove(node, data)}></i></span>
          </span>
          </span>);
      }
    }
  }
</script>

<style scoped>
  .status {
    color: green;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
