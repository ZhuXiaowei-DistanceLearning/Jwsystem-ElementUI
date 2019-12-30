<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
    </div>
    <!--表格渲染-->
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-tooltip class="item" effect="dark" placement="top">
          <span class="role-span">个人课表</span>
        </el-tooltip>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <div style="margin: 10px">
              选择学期:
              <el-select v-model="params.teamId" placeholder="请选择">
                <el-option
                  v-for="item in team"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <table id="kbtable" border="1" width="100%" cellspacing="0"
               cellpadding="0">
          <tr>
            <td align="center" colspan="2" width="1%" height="25px">时间</td>
            <td width="17%" align="center">星期一</td>
            <td width="123" height="10" align="center">星期二</td>
            <td width="123" height="10" align="center">星期三</td>
            <td width="124" height="10" align="center">星期四</td>
            <td width="124" height="10" align="center">星期五</td>
            <td width="124" height="10" align="center">星期六</td>
            <td width="124" height="10" align="center">星期日</td>
          </tr>
          <tr>
            <td align="center" colspan="2" width="1%" height="20px">早晨</td>
            <td width="123" height="10" align="center"></td>
            <td width="123" height="10" align="center"></td>
            <td width="123" height="10" align="center"></td>
            <td width="124" height="10" align="center"></td>
            <td width="124" height="10" align="center"></td>
            <td width="124" height="10" align="center"></td>
            <td width="124" height="10" align="center"></td>
          </tr>
          <tr>
            <td rowspan="4" align="center">上午</td>
            <td align="center">第<br/>一<br/>节
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
          </tr>

          <tr>
            <td align="center">第<br/>二<br/>节
            </td>
          </tr>

          <tr>
            <td width="70" height="28" align="center">第<br/>三<br/>节
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
          </tr>

          <tr>
            <td width="70" height="28" align="center">第<br/>四<br/>节
            </td>
          </tr>

          <tr>
            <td rowspan="4" align="center">下午</td>
            <td width="70" height="28" align="center">第<br/>五<br/>节
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
          </tr>
          <tr>
            <td width="70" height="28" align="center">第<br/>六<br/>节
            </td>
          </tr>
          <tr>
            <td width="70" height="28" align="center">第<br/>七<br/>节
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
          </tr>
          <tr>
            <td width="70" height="28" align="center">第<br/>八<br/>节
            </td>
          </tr>
          <tr>
            <td rowspan="2" align="center">晚上</td>
            <td width="70" height="28" align="center">第<br/>九<br/>节
            </td>
            <td width="123" align="center" valign="top" rowspan="2">
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
            </td>
          </tr>
          <tr>
            <td width="70" height="28" align="center">第<br/>十<br/>节
            </td>
          </tr>
          <tr>
            <th>备注:</th>
          </tr>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
  import service from '../../../utils/request'
  import { del, listajaxSection, listajaxTeam, listajaxWeek } from '@/api/teacher/course/course'

  export default {
    data() {
      return {
        exportUrl: 'http://localhost:8080/api/export',
        fileList: [],
        loading: true,
        total: 0,
        show: false,
        isAdd: false,
        team: [],
        week: [],
        section: [],
        classesId: null,
        classname: null,
        params: {
          offset: 1,
          limit: 10,
          keyword: null,
          teamId: null,
          weekId: null,
          sectionId: null,
          status: null
        },
        data: null
      }
    },
    created() {
      listajaxSection().then(res => {
        this.section = res.records
      })
      listajaxTeam().then(res => {
        this.team = res.records
      })
      listajaxWeek().then(res => {
        this.week = res.records
      })
      this.load()
    },
    methods: {
      load() {
        service.get('/api/course/findCourseByteacherId', { params: this.params }).then(res => {
          this.data = res.records
          this.loading = false
          this.currentPage = res.current
          this.total = res.realTotal
        }).catch(error => {
          this.loading = false
          this.$notify({
            title: '错误信息',
            message: '登录超时，请重新登录'
          })
          this.$router.push({ path: '/login' })
        })
      },
      sizeChange(val) {
        this.params.limit = val
        this.load()
      },
      pageChange(val) {
        this.params.offset = val
        this.load()
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
          classname: data.classname,
          collegeId: data.collegeId,
          specialtyId: data.specialtyId,
          gradeId: data.gradeId
        }
        _this.dialog = true
      },
      toQuery() {
        this.load()
      },
      selectCollege(val) {
      },
      StudentInfo() {
        this.$refs.studentForm.dialog = true
      },
      handleSelectionChange(val, row) {
        if (val.length == 0) {
          this.classesId = null
          this.classname = null
        } else if (val.length > 1) {
          this.$refs.table.clearSelection()
          this.$refs.table.toggleRowSelection(row)
          val.splice(0, val.length - 1)
          this.classesId = val[0].id
          this.classname = val[0].classname
        } else {
          this.classesId = val[0].id
          this.classname = val[0].classname
        }
      }
    }
  }
</script>

<style scoped>
  #kbtable {
    font-family: Verdana, Tahoma, Arial, Helvetica, sans-serif;
    font-size: 12px;
    font-weight: normal;
    margin-top: 10px;
  }
</style>
