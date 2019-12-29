<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="500px"
  >
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="上级菜单">
        <el-select v-model="form.pid" placeholder="请选择">
          <el-option
            v-for="item in menu"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="名称" required prop="name">
        <el-input v-model="form.name" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="组件地址">
        <el-input v-model="form.component" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="组件名称">
        <el-input v-model="form.componentName" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.icon" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="链接地址" required prop="path">
        <el-input v-model="form.path" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="权限">
        <el-input v-model="form.permission" style="width: 370px;" />
      </el-form-item>
      <el-form-item label="是否为外链" label-width="auto">
        <el-radio-group v-model="form.iframe">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否隐藏">
        <el-radio-group v-model="form.hidden">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否缓存">
        <el-radio-group v-model="form.cache">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否为目录" label-width="auto">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit, listajaxMenu } from '@/api/admin/menu/menu'

export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: false, dialog: false, menu: [],
      form: {
        id: '',
        name: '',
        iframe: false,
        component: '',
        pid: null,
        sort: '',
        icon: '',
        path: '',
        cache: false,
        hidden: false,
        componentName: '',
        permission: '',
        type: 0
      },
      rules: {}
    }
  },
  created() {
    listajaxMenu().then(res => {
      this.menu = res
    })
  },
  methods: {
    load() {
      listajaxMenu().then(res => {
        this.menu = res
      })
    },
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.loading = true
      if (this.isAdd) {
        this.doAdd()
      } else {
        this.doEdit()
      }
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.load()
        this.$emit('close')
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        // this.$parent.load()
        this.load()
        this.$emit('close')
      }).catch(err => {
        this.loading = false
        console.log(err.response.data.message)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = {
        id: '',
        name: '',
        iframe: false,
        component: '',
        pid: null,
        sort: '',
        icon: '',
        path: '',
        cache: false,
        hidden: false,
        componentName: '',
        permission: '',
        type: 0
      }
    }
  }
}
</script>

<style scoped>

</style>
