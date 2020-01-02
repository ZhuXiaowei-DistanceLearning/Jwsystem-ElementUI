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
              <el-select v-model="params.teamId" placeholder="请选择" @change="handleSelectionChange">
                <el-option
                  v-for="item in team"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
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
          <tr ref="one_two" id="one_two">
            <td rowspan="4" align="center">上午</td>
            <td align="center">第<br/>一<br/>节
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[0][0]==null?"":data[0][0]["courseName"]}}</p>
              <p>{{data[0][0]==null?"":data[0][0]["week"]}}</p>
              <p>{{data[0][0]==null?"":data[0][0]["teacherName"]}}</p>
              <p>{{data[0][0]==null?"":data[0][0]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[0][1]==null?"":data[0][1]["courseName"]}}</p>
              <p>{{data[0][1]==null?"":data[0][1]["week"]}}</p>
              <p>{{data[0][1]==null?"":data[0][1]["teacherName"]}}</p>
              <p>{{data[0][1]==null?"":data[0][1]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[0][2]==null?"":data[0][2]["courseName"]}}</p>
              <p>{{data[0][2]==null?"":data[0][2]["week"]}}</p>
              <p>{{data[0][2]==null?"":data[0][2]["teacherName"]}}</p>
              <p>{{data[0][2]==null?"":data[0][2]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[0][3]==null?"":data[0][3]["courseName"]}}</p>
              <p>{{data[0][3]==null?"":data[0][3]["week"]}}</p>
              <p>{{data[0][3]==null?"":data[0][3]["teacherName"]}}</p>
              <p>{{data[0][3]==null?"":data[0][3]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[0][4]==null?"":data[0][4]["courseName"]}}</p>
              <p>{{data[0][4]==null?"":data[0][4]["week"]}}</p>
              <p>{{data[0][4]==null?"":data[0][4]["teacherName"]}}</p>
              <p>{{data[0][4]==null?"":data[0][4]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[0][5]==null?"":data[0][5]["courseName"]}}</p>
              <p>{{data[0][5]==null?"":data[0][5]["week"]}}</p>
              <p>{{data[0][5]==null?"":data[0][5]["teacherName"]}}</p>
              <p>{{data[0][5]==null?"":data[0][5]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[0][6]==null?"":data[0][6]["courseName"]}}</p>
              <p>{{data[0][6]==null?"":data[0][6]["week"]}}</p>
              <p>{{data[0][6]==null?"":data[0][6]["teacherName"]}}</p>
              <p>{{data[0][6]==null?"":data[0][6]["classroom"]}}</p>
            </td>
          </tr>

          <tr>
            <td align="center">第<br/>二<br/>节
            </td>
          </tr>

          <tr ref="three_four" id="three_four">
            <td width="70" height="28" align="center">第<br/>三<br/>节
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[1][0]==null?"":data[1][0]["courseName"]}}</p>
              <p>{{data[1][0]==null?"":data[1][0]["week"]}}</p>
              <p>{{data[1][0]==null?"":data[1][0]["teacherName"]}}</p>
              <p>{{data[1][0]==null?"":data[1][0]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[1][1]==null?"":data[1][1]["courseName"]}}</p>
              <p>{{data[1][1]==null?"":data[1][1]["week"]}}</p>
              <p>{{data[1][1]==null?"":data[1][1]["teacherName"]}}</p>
              <p>{{data[1][1]==null?"":data[1][1]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[1][2]==null?"":data[1][2]["courseName"]}}</p>
              <p>{{data[1][2]==null?"":data[1][2]["week"]}}</p>
              <p>{{data[1][2]==null?"":data[1][2]["teacherName"]}}</p>
              <p>{{data[1][2]==null?"":data[1][2]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[1][3]==null?"":data[1][3]["courseName"]}}</p>
              <p>{{data[1][3]==null?"":data[1][3]["week"]}}</p>
              <p>{{data[1][3]==null?"":data[1][3]["teacherName"]}}</p>
              <p>{{data[1][3]==null?"":data[1][3]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[1][4]==null?"":data[1][4]["courseName"]}}</p>
              <p>{{data[1][4]==null?"":data[1][4]["week"]}}</p>
              <p>{{data[1][4]==null?"":data[1][4]["teacherName"]}}</p>
              <p>{{data[1][4]==null?"":data[1][4]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[1][5]==null?"":data[1][5]["courseName"]}}</p>
              <p>{{data[1][5]==null?"":data[1][5]["week"]}}</p>
              <p>{{data[1][5]==null?"":data[1][5]["teacherName"]}}</p>
              <p>{{data[1][5]==null?"":data[1][5]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[1][6]==null?"":data[1][6]["courseName"]}}</p>
              <p>{{data[1][6]==null?"":data[1][6]["week"]}}</p>
              <p>{{data[1][6]==null?"":data[1][6]["teacherName"]}}</p>
              <p>{{data[1][6]==null?"":data[1][6]["classroom"]}}</p>
            </td>
          </tr>

          <tr>
            <td width="70" height="28" align="center">第<br/>四<br/>节
            </td>
          </tr>

          <tr ref="five_six" id="five_six">
            <td rowspan="4" align="center">下午</td>
            <td width="70" height="28" align="center">第<br/>五<br/>节
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[2][0]==null?"":data[2][0]["courseName"]}}</p>
              <p>{{data[2][0]==null?"":data[2][0]["week"]}}</p>
              <p>{{data[2][0]==null?"":data[2][0]["teacherName"]}}</p>
              <p>{{data[2][0]==null?"":data[2][0]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[2][1]==null?"":data[2][1]["courseName"]}}</p>
              <p>{{data[2][1]==null?"":data[2][1]["week"]}}</p>
              <p>{{data[2][1]==null?"":data[2][1]["teacherName"]}}</p>
              <p>{{data[2][1]==null?"":data[2][1]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[2][2]==null?"":data[2][2]["courseName"]}}</p>
              <p>{{data[2][2]==null?"":data[2][2]["week"]}}</p>
              <p>{{data[2][2]==null?"":data[2][2]["teacherName"]}}</p>
              <p>{{data[2][2]==null?"":data[2][2]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[2][3]==null?"":data[2][3]["courseName"]}}</p>
              <p>{{data[2][3]==null?"":data[2][3]["week"]}}</p>
              <p>{{data[2][3]==null?"":data[2][3]["teacherName"]}}</p>
              <p>{{data[2][3]==null?"":data[2][3]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[2][4]==null?"":data[2][4]["courseName"]}}</p>
              <p>{{data[2][4]==null?"":data[2][4]["week"]}}</p>
              <p>{{data[2][4]==null?"":data[2][4]["teacherName"]}}</p>
              <p>{{data[2][4]==null?"":data[2][4]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[2][5]==null?"":data[2][5]["courseName"]}}</p>
              <p>{{data[2][5]==null?"":data[2][5]["week"]}}</p>
              <p>{{data[2][5]==null?"":data[2][5]["teacherName"]}}</p>
              <p>{{data[2][5]==null?"":data[2][5]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[2][6]==null?"":data[2][6]["courseName"]}}</p>
              <p>{{data[2][6]==null?"":data[2][6]["week"]}}</p>
              <p>{{data[2][6]==null?"":data[2][6]["teacherName"]}}</p>
              <p>{{data[2][6]==null?"":data[2][6]["classroom"]}}</p>
            </td>
          </tr>
          <tr>
            <td width="70" height="28" align="center">第<br/>六<br/>节
            </td>
          </tr>
          <tr ref="seven_eight" id="seven_eight">
            <td width="70" height="28" align="center">第<br/>七<br/>节
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[3][0]==null?"":data[3][0]["courseName"]}}</p>
              <p>{{data[3][0]==null?"":data[3][0]["week"]}}</p>
              <p>{{data[3][0]==null?"":data[3][0]["teacherName"]}}</p>
              <p>{{data[3][0]==null?"":data[3][0]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[3][1]==null?"":data[3][1]["courseName"]}}</p>
              <p>{{data[3][1]==null?"":data[3][1]["week"]}}</p>
              <p>{{data[3][1]==null?"":data[3][1]["teacherName"]}}</p>
              <p>{{data[3][1]==null?"":data[3][1]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[3][2]==null?"":data[3][2]["courseName"]}}</p>
              <p>{{data[3][2]==null?"":data[3][2]["week"]}}</p>
              <p>{{data[3][2]==null?"":data[3][2]["teacherName"]}}</p>
              <p>{{data[3][2]==null?"":data[3][2]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[3][3]==null?"":data[3][3]["courseName"]}}</p>
              <p>{{data[3][3]==null?"":data[3][3]["week"]}}</p>
              <p>{{data[3][3]==null?"":data[3][3]["teacherName"]}}</p>
              <p>{{data[3][3]==null?"":data[3][3]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[3][4]==null?"":data[3][4]["courseName"]}}</p>
              <p>{{data[3][4]==null?"":data[3][4]["week"]}}</p>
              <p>{{data[3][4]==null?"":data[3][4]["teacherName"]}}</p>
              <p>{{data[3][4]==null?"":data[3][4]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[3][5]==null?"":data[3][5]["courseName"]}}</p>
              <p>{{data[3][5]==null?"":data[3][5]["week"]}}</p>
              <p>{{data[3][5]==null?"":data[3][5]["teacherName"]}}</p>
              <p>{{data[3][5]==null?"":data[3][5]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[3][6]==null?"":data[3][6]["courseName"]}}</p>
              <p>{{data[3][6]==null?"":data[3][6]["week"]}}</p>
              <p>{{data[3][6]==null?"":data[3][6]["teacherName"]}}</p>
              <p>{{data[3][6]==null?"":data[3][6]["classroom"]}}</p>
            </td>
          </tr>
          <tr>
            <td width="70" height="28" align="center">第<br/>八<br/>节
            </td>
          </tr>
          <tr ref="night_ten" id="night_ten">
            <td rowspan="2" align="center">晚上</td>
            <td width="70" height="28" align="center">第<br/>九<br/>节
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[4][0]==null?"":data[4][0]["courseName"]}}</p>
              <p>{{data[4][0]==null?"":data[4][0]["week"]}}</p>
              <p>{{data[4][0]==null?"":data[4][0]["teacherName"]}}</p>
              <p>{{data[4][0]==null?"":data[4][0]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[4][1]==null?"":data[4][1]["courseName"]}}</p>
              <p>{{data[4][1]==null?"":data[4][1]["week"]}}</p>
              <p>{{data[4][1]==null?"":data[4][1]["teacherName"]}}</p>
              <p>{{data[4][1]==null?"":data[4][1]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[4][2]==null?"":data[4][2]["courseName"]}}</p>
              <p>{{data[4][2]==null?"":data[4][2]["week"]}}</p>
              <p>{{data[4][2]==null?"":data[4][2]["teacherName"]}}</p>
              <p>{{data[4][2]==null?"":data[4][2]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[4][3]==null?"":data[4][3]["courseName"]}}</p>
              <p>{{data[4][3]==null?"":data[4][3]["week"]}}</p>
              <p>{{data[4][3]==null?"":data[4][3]["teacherName"]}}</p>
              <p>{{data[4][3]==null?"":data[4][3]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[4][4]==null?"":data[4][4]["courseName"]}}</p>
              <p>{{data[4][4]==null?"":data[4][4]["week"]}}</p>
              <p>{{data[4][4]==null?"":data[4][4]["teacherName"]}}</p>
              <p>{{data[4][4]==null?"":data[4][4]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[4][5]==null?"":data[4][5]["courseName"]}}</p>
              <p>{{data[4][5]==null?"":data[4][5]["week"]}}</p>
              <p>{{data[4][5]==null?"":data[4][5]["teacherName"]}}</p>
              <p>{{data[4][5]==null?"":data[4][5]["classroom"]}}</p>
            </td>
            <td width="123" height="28" align="center" valign="top" rowspan="2">
              <p>{{data[4][6]==null?"":data[4][6]["courseName"]}}</p>
              <p>{{data[4][6]==null?"":data[4][6]["week"]}}</p>
              <p>{{data[4][6]==null?"":data[4][6]["teacherName"]}}</p>
              <p>{{data[4][6]==null?"":data[4][6]["classroom"]}}</p>
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
          teamId: null,
          weekId: null,
          sectionId: null
        },
        data: null,
        pageData: new Array(5)
      }
    },
    created() {
      for (let i = 0; i < this.pageData.length; i++) {
        this.pageData[i] = new Array(7);
      }
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
      Views() {
      },
      load() {
        service.get('/api/student/findSchedule', { params: this.params }).then(res => {
          this.data = res
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
      handleSelectionChange(val) {
        this.params.teamId = val
        this.load()
        this.Views()
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
