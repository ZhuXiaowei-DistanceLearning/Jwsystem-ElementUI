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
      <el-form-item label="用户名">
        <el-input v-model="form.username" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="权限">
        <el-input v-model="form.qx" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="学院名称">
        <el-select v-model="form.collegeId" placeholder="请选择">
          <el-option
            v-for="item in college"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { listajax, add, edit } from '@/api/admin/user/user'

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
        qx: '',
        collegeId: '',
        status: '1'
      },
      college: [],
      rules: {}
    }
  },
  created() {
    listajax().then(res => {
      this.college = res
    })
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
        name: '',
        qx: '',
        collegeId: '',
        status: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
