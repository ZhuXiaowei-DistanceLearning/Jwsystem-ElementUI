<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    :title="isAdd ? '新增' : '编辑'"
    width="700px"
  >
    <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="80px">
      <el-form-item label="名称" required prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="学分" required prop="credit">
        <el-input v-model="form.credit"/>
      </el-form-item>
      <el-form-item label="绩点" required prop="point">
        <el-input v-model="form.point"/>
      </el-form-item>
      <el-form-item label="上课教室" required prop="classroom">
        <el-input v-model="form.classroom"/>
      </el-form-item>
      <el-form-item label="总学时" required prop="totalTime">
        <el-input v-model="form.totalTime"/>
      </el-form-item>
      <el-form-item label="总人数" required prop="totalPeople">
        <el-input v-model="form.totalPeople"/>
      </el-form-item>

      <el-form-item label="课时">
        <el-select v-model="form.sectionId" placeholder="请选择">
          <el-option
            v-for="item in section"
            :key="item.id"
            :label="item.week + item.section"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="周数">
        <el-select v-model="form.weekId" placeholder="请选择">
          <el-option
            v-for="item in week"
            :key="item.id"
            :label="item.time"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="教师">
        <el-select v-model="form.teacherId" placeholder="请选择">
          <el-option
            v-for="item in teacher"
            :key="item.id"
            :label="item.username"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程性质">
        <el-select v-model="form.natureId" placeholder="请选择">
          <el-option
            v-for="item in nature"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="考核方式">
        <el-select v-model="form.wayId" placeholder="请选择">
          <el-option
            v-for="item in way"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="课程属性">
        <el-select v-model="form.cstatusId" placeholder="请选择">
          <el-option
            v-for="item in cstatus"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开课学期">
        <el-select v-model="form.teamId" placeholder="请选择">
          <el-option
            v-for="item in team"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="开课学院">
        <el-select v-model="form.collegeId" placeholder="请选择" disabled>
          <el-option
            v-for="item in college"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否考试" required prop="name">
        <el-radio v-model="form.isExam" :label="1">是</el-radio>
        <el-radio v-model="form.isExam" :label="2">否</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import '@/api/admin/course/course'
  import {
    add,
    listajaxSpecialty,
    listajaxTeam,
    listajaxCollege,
    listajaxCStatus,
    listajaxNature,
    listajaxSection,
    listajaxWay,
    listajaxWeek,
    listajaxTeacher
  } from "../../../api/admin/course/course";

  export default {
    props: {
      isAdd: {
        type: Boolean,
        required: true
      }
    },
    created() {
      listajaxWay().then(res => {
        this.way = res.records
      })
      listajaxNature().then(res => {
        this.nature = res.records
      })
      listajaxTeam().then(res => {
        this.team = res.records
      })
      listajaxCStatus().then(res => {
        this.cstatus = res.records
      })
      listajaxCollege().then(res => {
        this.college = res
      })
      listajaxSection().then(res => {
        this.section = res.records
      })
      listajaxWeek().then(res => {
        this.week = res.records
      })
      listajaxTeacher().then(res => {
        this.teacher = res
      })
      if (this.$store.state.user.user.collegeId != null) {
        this.form['collegeId'] = this.$store.state.user.user.collegeId
      }
    },
    data() {
      return {
        loading: false, dialog: false,
        form: {
          id: '',
          name: '',
          credit: null,
          point: null,
          classroom: null,
          totalTime: null,
          wayId: null,
          natureId: null,
          teamId: null,
          cstatusId: null,
          collegeId: null,
          sectionId: null,
          weekId: null,
          teacherId: null,
          totalPeople: null,
          isExam: 1
        },
        rules: {},
        way: null,
        nature: null,
        team: null,
        cstatus: null,
        college: null,
        section: null,
        week: null,
        teacher: null
      }
    },
    methods: {
      load() {

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
          credit: null,
          classroom: null,
          totalTime: null,
          wayId: null,
          natureId: null,
          teamId: null,
          cstatusId: null,
          collegeId: null,
          sectionId: null,
          weekId: null,
          teacherId: null,
          totalPeople: null,
          isExam: null,
          systemId: null
        }
      }
    }
  }
</script>

<style scoped>

</style>
