<template>
  <el-dialog :append-to-body="true" :close-on-click-modal="false" :before-close="cancel" :visible.sync="dialog"
             :title="isAdd ? '新增' : '编辑'" width="500px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="上级菜单">
        <el-input v-model="form.pid" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="权限名称">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="组件地址">
        <el-input v-model="form.component" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="组件名称">
        <el-input v-model="form.componentName" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="form.sort" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="form.icon" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="链接地址">
        <el-input v-model="form.path" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="权限名称">
        <el-input v-model="form.permission" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="是否为外链">
        <el-input v-model="form.iFrame" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="是否隐藏">
        <el-input v-model="form.hidden" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="是否缓存">
        <el-input v-model="form.cache" style="width: 370px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { add, edit } from '@/api/admin/menu/menu'

  export default {
    props: {
      isAdd: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        loading: false, dialog: false,
        form: {
          id: '',
          name: '',
          iFrame: '',
          component: '',
          pid: '',
          sort: '',
          icon: '',
          path: '',
          cache: '',
          hidden: '',
          componentName: '',
          permission: '',
          type: ''
        },
        rules: {}
      }
    },
    methods: {
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
          // this.$parent.load()
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
          name: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
