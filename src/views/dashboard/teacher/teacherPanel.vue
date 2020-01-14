<template>
  <el-row>
    <el-col>
      <el-row>
        <!--评价得分-->
        <el-col :span="12">
          <ping-jia></ping-jia>
        </el-col>
        <!--教学进度完成-->
        <el-col :span="12">
          <jiao-xue></jiao-xue>
        </el-col>
      </el-row>
      <el-row>

        <!--缺勤课程最多前5-->
        <el-col :span="8">
          <course></course>
        </el-col>
        <!--课程考勤-->
        <el-col :span="8">
          <kao-qin/>
        </el-col>
        <!--通知公告-->
        <el-col :span="8">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import KaoQin from './KaoQin'
  import JiaoXue from './JiaoXue'
  import PingJia from './PingJia'
  import Course from './Course'

  export default {
    components: {
      Course,
      JiaoXue,
      KaoQin,
      PingJia
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    mounted() {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .top-card-middle {
    position: relative;
    color: #77CDD6;
  }

  .top-card-middle-1 {
    position: relative;
    color: #E3AEA1
  }

  .middle-card-middle {
    position: relative;
    color: #60ABD9;
  }

  .top-card-content {
    padding: 15px 5px;
    font-size: 12px;
    font-weight: bold;
  }

  .middle-card-content {
    padding: 15px 5px;
    font-size: 24px;
    font-weight: bold;
  }
</style>
