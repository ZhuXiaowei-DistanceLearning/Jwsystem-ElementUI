<template>
  <el-row>
    <el-col :span="14">
      <!--row1-->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card align="center">
            <img src="../../../assets/images/avatar.png"/>
            <div style="padding: 14px;">
              <span>姓名</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card class="top-card-middle">
                <div style="position: absolute;right: 2px;top: 2px;font-size: 14px;font-weight: bold">
                  <i style="font-size: 1.5em;" class="el-icon-user"></i>
                </div>
                <div align="center" class="top-card-content">
                  <span>男</span>
                </div>
                <div style="position: absolute;left: 2px;bottom: 2px;font-size: 14px;">
                  性别
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="top-card-middle">
                <div style="position: absolute;right: 2px;top: 2px;font-size: 14px;font-weight: bold">
                  <i style="font-size: 1.5em;" class="el-icon-notebook-2"></i>
                </div>
                <div align="center" class="top-card-content">
                  <span>英语专业</span>
                </div>
                <div style="position: absolute;left: 2px;bottom: 2px;font-size: 14px;">
                  专业名称
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 10px">
            <el-col :span="12">
              <el-card class="top-card-middle-1">
                <div style="position: absolute;right: 2px;top: 2px;font-size: 14px;font-weight: bold">
                  <i style="font-size: 1.5em;" class="el-icon-user"></i>
                </div>
                <div align="center" class="top-card-content">
                  <span>汉</span>
                </div>
                <div style="position: absolute;left: 2px;bottom: 2px;font-size: 14px;">
                  民族
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="top-card-middle-1">
                <div style="position: absolute;right: 2px;top: 2px;font-size: 14px;font-weight: bold">
                  <i style="font-size: 1.5em;" class="el-icon-school"></i>
                </div>
                <div align="center" class="top-card-content">
                  <span>本科</span>
                </div>
                <div style="position: absolute;left: 2px;bottom: 2px;font-size: 14px;">
                  学历层次
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <zhnl></zhnl>
        </el-col>
      </el-row>
      <!--row2-->
      <el-row :gutter="20" style="margin-top: 30px">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-card class="middle-card-middle">
              <div align="center" class="middle-card-content">
                <span>14</span>
              </div>
              <div align="center" style="color: #1f2d3d;font-size: 12px">
                课程数
              </div>
            </el-card>
          </el-col>
          <el-col :span="5">
            <el-card class="middle-card-middle">
              <div align="center" class="middle-card-content">
                <span>14</span>
              </div>
              <div align="center" style="color: #1f2d3d;font-size: 12px">
                总学时
              </div>
            </el-card>
          </el-col>
          <el-col :span="5">
            <el-card class="middle-card-middle">
              <div align="center" class="middle-card-content">
                <span>14</span>
              </div>
              <div align="center" style="color: #1f2d3d;font-size: 12px">
                到课率
              </div>
            </el-card>
          </el-col>
          <el-col :span="5">
            <el-card class="middle-card-middle">
              <div align="center" class="middle-card-content">
                <span>14</span>
              </div>
              <div align="center" style="color: #1f2d3d;font-size: 12px">
                合格率
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card class="middle-card-middle">
              <div align="center" class="middle-card-content">
                <span>14</span>
              </div>
              <div align="center" style="color: #1f2d3d;font-size: 12px">
                奖学金
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 10px">
          <el-col :span="5">
            <el-card class="middle-card-middle">
              <div align="center" class="middle-card-content">
                <span>14</span>
              </div>
              <div align="center" style="color: #1f2d3d;font-size: 12px">
                上网时间
              </div>
            </el-card>
          </el-col>
          <el-col :span="5">
            <el-card class="middle-card-middle">
              <div align="center" class="middle-card-content">
                <span>14</span>
              </div>
              <div align="center" style="color: #1f2d3d;font-size: 12px">
                缴费及欠费
              </div>
            </el-card>
          </el-col>
          <el-col :span="5">
            <el-card class="middle-card-middle">
              <div align="center" class="middle-card-content">
                <span>14</span>
              </div>
              <div align="center" style="color: #1f2d3d;font-size: 12px">
                违纪
              </div>
            </el-card>
          </el-col>
          <el-col :span="5">
            <el-card class="middle-card-middle">
              <div align="center" class="middle-card-content">
                <span>14</span>
              </div>
              <div align="center" style="color: #1f2d3d;font-size: 12px">
                心理卫生
              </div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card class="middle-card-middle">
              <div align="center" class="middle-card-content">
                <span>14</span>
              </div>
              <div align="center" style="color: #1f2d3d;font-size: 12px">
                校园卡余额
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 10px">
          <kao-qin></kao-qin>
        </el-row>
      </el-row>
    </el-col>
    <el-col :span="10" align="center">
        <zong-he></zong-he>
      <div>
        <cheng-ji></cheng-ji>
      </div>
    </el-col>
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
      return {}
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
