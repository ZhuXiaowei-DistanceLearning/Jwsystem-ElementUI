<template>
  <el-row>
    <el-row>

      <!--评价得分-->
      <el-col :span="8">
        <cheng-ji></cheng-ji>
      </el-col>
      <!--本学期教学评价得分前5-->
      <!--教学任务完成情况-->
      <!--缺勤班级前5排名-->
      <!--课程考勤-->
      <el-col :span="8">
        <zong-he></zong-he>
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
  </el-row>
</template>

<script>
  import zhnl from './zhnl'
  import KaoQin from './KaoQin'
  import ChengJi from './ChengJi'
  import ZongHe from './ZongHe'

  export default {
    components: {
      zhnl,
      KaoQin,
      ChengJi,
      ZongHe
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
