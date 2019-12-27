<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-row>
        <el-col :span="6">
          选择学院:
          <el-select v-model="params.collegeId" placeholder="请选择" @change="selectCollege">
            <el-option
              v-for="item in college"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          选择专业:
          <el-select v-model="params.specialtyId" placeholder="请选择">
            <el-option
              v-for="item in specialty"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          选择年级:
          <el-select v-model="params.gradeId" placeholder="请选择">
            <el-option
              v-for="item in grade"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-button class="filter-item" size="mini" type="success" icon="el-icon-search" @click="toQuery">搜索
          </el-button>
        </el-col>
      </el-row>
      <div style="margin-top: 10px">
        <el-button class="filter-item" size="mini" type="success" icon="el-icon-circle-plus-outline" @click="add">新增
        </el-button>
        <el-button class="filter-item" size="mini" type="warning" icon="el-icon-download" :loading="exportLoading"
                   @click="download">学生模块导出
        </el-button>
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-upload" @click="upload">学生信息导入
        </el-button>
        <el-button class="filter-item" size="mini" type="warning" icon="el-icon-download" :loading="exportInfoLoading"
                   @click="downloadInfo">学生信息导出
        </el-button>
        <el-button class="filter-item" size="mini" type="primary" icon="el-icon-zoom-in" @click="StudentInfo">查询班级学生
        </el-button>
      </div>
    </div>
    <!-- 文件上传 -->
    <el-dialog :visible.sync="uploadDialog" append-to-body width="500px">
      <el-upload
        ref="upload"
        :action="exportUrl+'/importXlsStudent'"
        :data="{'classesId':this.classesId,'gradeId':this.params.gradeId}"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" :loading="uploadLoading"
                   @click="submitUpload">上传到服务器
        </el-button>
        <div style="margin: 10px">
          选择年级:
          <el-select v-model="params.gradeId" placeholder="请选择">
            <el-option
              v-for="item in grade"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div slot="tip" class="el-upload__tip">只能上传xlsx/xls，且不超过500kb</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doSubmit">确认</el-button>
      </div>
    </el-dialog>
    <!--表单组件-->
    <e-from ref="form" :is-add="isAdd" @close="load()"/>
    <!--学生信息组件-->
    <student-info ref="studentForm"/>
    <!--表格渲染-->
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
      size="small"
      style="width: 100%;"
      stripe
      empty-text="暂无数据"
      highlight-current-row
      current-row-key="id"
      @select="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column prop="classname" label="班级名称"/>
      <el-table-column prop="cname" label="所属学院"/>
      <el-table-column prop="sname" label="所属专业" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="gname" label="所属年级" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="200px"
                       align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon="el-icon-edit" @click="edit(scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-row>
      <el-col :offset="10">
        <el-pagination
          :total="total"
          :current-page="params.offset"
          style="margin-top: 8px;"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, prev, pager, next, sizes"
          @size-change="sizeChange"
          @current-change="pageChange"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import service from '../../../utils/request'
  import eFrom from './form'
  import { download } from '@/api/data'
  import { parseTime, downloadFile } from '@/utils/index'
  import { del, listajaxCollege, listajaxSpecialty, listajaxGrade } from '@/api/admin/classes/classes'
  import studentInfo from './studentInfo'

  export default {
    components: {
      eFrom,
      studentInfo
    },
    data() {
      return {
        exportUrl: 'http://localhost:8080/api/export',
        fileList: [],
        loading: true,
        exportLoading: false,
        exportInfoLoading: false,
        uploadLoading: false,
        uploadDialog: false,
        total: 0,
        show: false,
        isAdd: false,
        college: [],
        specialty: [],
        grade: [],
        classesId: null,
        classname: null,
        params: {
          offset: 1,
          limit: 10,
          keyword: null,
          collegeId: null,
          specialtyId: null,
          gradeId: null,
          status: null
        },
        data: null
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
      this.load()
    },
    methods: {
      load() {
        service.get('/api/classes/pageQuery', { params: this.params }).then(res => {
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
        listajaxSpecialty(val).then(res => {
          this.specialty = res
        })
      },
      downloadInfo() {
        if (this.classesId != null) {
          this.exportLoading = true
          download(this.exportUrl + '/exportXlsStudent', { 'classesId': this.classesId }).then(result => {
            console.log(result)
            downloadFile(result, this.classname + '学生信息', 'xlsx')
            this.exportLoading = false
          }).catch(() => {
            this.exportLoading = false
          })
        } else {
          this.$message({
            type: 'warning',
            message: '请选择一个班级'
          })
        }
      },
      download() {
        this.exportLoading = true
        download(this.exportUrl + '/exportXlsModel', null).then(result => {
          downloadFile(result, '学生信息模块', 'xlsx')
          this.exportLoading = false
        }).catch(() => {
          this.exportLoading = false
        })
      },
      upload() {
        if (this.classesId == null) {
          this.$message({
            type: 'warning',
            message: '请选择一个班级'
          })
        } else {
          this.uploadDialog = true
        }
      },
      submitUpload() {
        this.uploadLoading = true
        this.$refs.upload.submit()
      },
      handleSuccess(response, file, fileList) {
        this.uploadLoading = false
        this.$notify({
          title: '成功信息',
          message: '上传成功',
          type: 'success'
        })
      },
      handleError(err, file, fileList) {
        this.uploadLoading = false
        this.$notify({
          title: '错误信息',
          message: '上传失败',
          type: 'error'
        })
      },
      doSubmit() {
        this.$refs.upload.clearFiles()
        this.uploadDialog = false
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
  .status {
    color: green;
  }
</style>
