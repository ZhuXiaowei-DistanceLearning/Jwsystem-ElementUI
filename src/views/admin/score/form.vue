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
      <el-form-item label="名称" required prop="name">
        <el-input v-model="form.name" style="width: 370px;"/>
      </el-form-item>
      <el-form-item label="所属学期">
        <el-select v-model="form.teamId" placeholder="请选择">
          <el-option
            v-for="item in team"
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
  import {add, edit, listajaxTeam} from '@/api/admin/plan/plan'

  export default {
    props: {
      isAdd: {
        type: Boolean,
        required: true
      }
    },
    created() {
      listajaxTeam().then(res => {
          this.team = res.records
      })
    },
    data() {
      return {
        loading: false, dialog: false, team: [],
        form: {
          id: '',
          name: '',
          status: '',
          teamId: '',
          specialtyId: ''
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
          code: '',
          description: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
