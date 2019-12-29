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
      <el-form-item label="班级名称" prop="classname">
        <el-input v-model="form.classname" style="width: 350px;" />
      </el-form-item>
      <el-form-item label="学院名称" prop="collegeId">
        <el-select v-model="form.collegeId" placeholder="请选择" @change="selectCollege">
          <el-option
            v-for="item in college"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="专业名称" prop="specialtyId">
        <el-select v-model="form.specialtyId" placeholder="请选择">
          <el-option
            v-for="item in specialty"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="所属年级" prop="gradeId">
        <el-select v-model="form.gradeId" placeholder="请选择">
          <el-option
            v-for="item in grade"
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
import { add, edit, listajaxCollege, listajaxSpecialty, listajaxGrade } from '@/api/admin/classes/classes'

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
        classname: '',
        collegeId: '',
        specialtyId: '',
        gradeId: ''
      },
      college: [],
      specialty: [],
      grade: [],
      rules: {
        classname: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        collegeId: [
          { required: true, message: '请选择学院', trigger: 'change' }
        ],
        specialtyId: [
          { required: true, message: '请选择专业', trigger: 'change' }
        ],
        gradeId: [
          { required: true, message: '请选择年级', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    listajaxCollege().then(res => {
      this.college = res
    })
    listajaxGrade().then(res => {
      this.grade = res
    })
    listajaxSpecialty().then(res => {
      this.specialty = res
    })
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
    selectCollege(val) {
      listajaxSpecialty(val).then(res => {
        this.specialty = res
      })
    }
  }
}
</script>

<style scoped>

</style>
