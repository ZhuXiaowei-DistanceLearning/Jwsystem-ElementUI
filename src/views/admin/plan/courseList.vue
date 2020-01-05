<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    width="500px"
  >
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-tooltip class="item" effect="dark" content="选择指定课程" placement="top">
          <span class="role-span">课程列表</span>
        </el-tooltip>
      </div>
      <el-tree
        ref="tree"
        :data="course"
        show-checkbox
        empty-text="暂无查询到课程列表"
        node-key="id"
        highlight-current
        default-expand-all
        :expand-on-click-node="false"
        :props="defaultProps"
      />
    </el-card>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {listajaxCourse, addPlanCourse} from '@/api/admin/plan/plan'

  export default {
    data() {
      return {
        loading: false, dialog: false, course: [],
        defaultProps: {
          label: 'name'
        },
        form: {
          cids: [],
          planId: '',
          systemId: '',
          natureId: '',
          cstatusId: '',
          keyword: ''
        },
      }
    },
    methods: {
      load() {
        listajaxCourse(this.form).then(res => {
          this.course = res
        })
      },
      cancel() {
        this.resetForm()
      },
      doSubmit() {
        this.loading = true
        this.doAdd()
      },
      doAdd() {
        this.form.cids = this.$refs.tree.getCheckedKeys()
        addPlanCourse(this.form).then( res => {
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
      resetForm() {
        this.dialog = false
        this.$refs.tree.setCheckedKeys([]);
        this.form = {
          cids: [],
          planId: '',
          systemId: '',
          natureId: '',
          cstatusId: '',
          keyword: ''
        }
      }
    }
  }
</script>

<style scoped>

</style>
