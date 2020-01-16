<template>
  <el-dialog
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="cancel"
    :visible.sync="dialog"
    title="学生评价"
    width="50%"
  >
    <table class="table-s" style="width:100%;">
      <thead>
      <tr>
        <th colspan="2">课程名称：社会网络分析 总评分:96.7</th>
      </tr>
      </thead>
      <thead>
      <tr>
        <th>评价指标(权重)</th>
        <th>评价选项</th>
      </tr>
      </thead>
      <tbody id="tbodyId">
      <tr>
        <td>课前准备充分，教案、课件等准备认真</td>
        <td width="40%">
          <el-rate
            v-model="form.q1"
            show-text>
          </el-rate>
        </td>
      </tr>
      <tr>
        <td>教态大方，精神饱满，准时上、下课</td>
        <td>
          <el-rate
            v-model="form.q2"
            show-text>
          </el-rate>
        </td>
      </tr>
      <tr>
        <td>授课容量时钟，反映学科发展新动态</td>
        <td>
          <el-rate
            v-model="form.q3"
            show-text>
          </el-rate>
        </td>
      </tr>
      <tr>
        <td>阐述准确，重点突出，难点讲透，不照本宣科</td>
        <td>
          <el-rate
            v-model="form.q4"
            show-text>
          </el-rate>
        </td>
      </tr>
      <tr>
        <td>普通话标准，语言生动，感染力强</td>
        <td>
          <el-rate
            v-model="form.q5"
            show-text>
          </el-rate>
        </td>
      </tr>
      <tr>
        <td>善于启发诱导，教学方法灵活，乐与学生交流</td>
        <td>
          <el-rate
            v-model="form.q6"
            show-text>
          </el-rate>
        </td>
      </tr>
      <tr>
        <td>合理运用现代化教学手段，效果良好</td>
        <td>
          <el-rate
            v-model="form.q7"
            show-text>
          </el-rate>
        </td>
      </tr>
      <tr>
        <td>对课堂违纪现象能及时处理，关心学生。</td>
        <td>
          <el-rate
            v-model="form.q8"
            show-text>
          </el-rate>
        </td>
      </tr>
      <tr>
        <td>作业评阅认真，成绩评定公正，问题讲评及时。</td>
        <td>
          <el-rate
            v-model="form.q9"
            show-text>
          </el-rate>
        </td>
      </tr>
      <tr>
        <td>学生能理解课程基础知识，掌握基本技能，上课积极性高，课堂气氛好。</td>
        <td>
          <el-rate
            v-model="form.q10"
            show-text>
          </el-rate>
        </td>
      </tr>
      <tr>
        <td>2019-2020第一学期学生评教</td>
        <td>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="form.sContent">
          </el-input>
        </td>
      </tr>
      <tr>
        <td>教师回复</td>
        <td>
          {{tContent}}
        </td>
      </tr>
      </tbody>
    </table>
    <el-button type="primary" style="position: absolute;right: 20px;top: 25px" v-if="status == 1 ? false:true"
               onclick="submit">提交
    </el-button>
  </el-dialog>
</template>

<script>
  import { add, edit, addCourseComment } from '@/api/student/comment/comment'

  export default {
    data() {
      return {
        loading: false, dialog: false,
        status: null,
        form: {
          q1: null,
          q2: null,
          q3: null,
          q4: null,
          q5: null,
          q6: null,
          q7: null,
          q8: null,
          q9: null,
          q10: null,
          sContent: null,
          tmId: null,
          tContent: null
        }
      }
    },
    created() {
    },
    methods: {
      cancel() {
        this.resetForm()
      },
      submit() {
        addCourseComment(this.form).then(res => {
          if (res.code == 1) {
            this.$message({
              type: 'success',
              message: res.msg
            })
          } else {
            this.$message({
              type: 'warning',
              message: res.msg
            })
          }
        }).catch(res => {
          this.$message({
            type: 'warning',
            message: "操作异常，请联系管理员"
          })
        })
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
      }
    }
  }
</script>

<style scoped>
  .table-s {
    width: 100%;
    border: 1px solid #e2e7ec;
  }

  .table-s tr {
  }

  .table-s tr th {
    text-align: center;
    height: 35px;
    background: #8e9aa9;
    color: #f4f7fa;
    font-size: 12px;
    border-bottom: 1px solid #e2e7ec;
    border-right: 1px solid #e2e7ec;
  }

  .table-s tr td {
    position: relative;
    text-align: center;
    padding: 8px 0px;
    border-bottom: 1px solid #e2e7ec;
    border-right: 1px solid #e2e7ec;
  }

  .table-s tr:nth-child(2n) {
    background: #f4f7fa;
  }
</style>
