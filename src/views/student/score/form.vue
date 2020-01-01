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
      <el-form-item label="考勤分" prop="attendance">
        <el-input v-model.number="form.attendance" style="width: 350px;" auto-complete="false"/>
      </el-form-item>
      <el-form-item label="平时分" prop="usually">
        <el-input v-model.number="form.usually" style="width: 350px;"/>
      </el-form-item>
      <el-form-item label="考试分" prop="exam">
        <el-input v-model.number="form.exam" style="width: 350px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {add, edit} from '@/api/teacher/score/score'

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
          sid: '',
          cid: '',
          attendance: '',
          usually: '',
          exam: '',
        },
        rules: {
          attendance: [
            {required: true, message: '不能为空'},
            {type: 'number', message: '必须为数字值'}
          ],
          usually: [
            {required: true, message: '不能为空'},
            {type: 'number', message: '必须为数字值'}
          ],
          exam: [
            {required: true, message: '不能为空'},
            {type: 'number', message: '必须为数字值'}
          ],
        }
      }
    },
    created() {
    },
    methods: {
      cancel() {
        this.resetForm()
      },
      doSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.isAdd) {
              this.doAdd()
            } else {
              this.doEdit()
            }
          }
        })
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
          classname: '',
          collegeId: '',
          specialtyId: '',
          gradeId: ''
        }
      },
    }
  }
</script>

<style scoped>

</style>
