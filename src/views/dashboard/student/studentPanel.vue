<template>
  <el-row>
    <el-col :span="16">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card>
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
          <el-card style="width: 200px;height: 200px">
            <el-image>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="8">
      <el-card style="width: 200px;height: 200px">
        <el-image>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <time class="time">{{ currentDate }}</time>
            <el-button type="text" class="button">操作按钮</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import { get } from '@/api/monitor/visits'

  export default {
    data() {
      return {
        count: { newIp: 0, newVisits: 0, recentIp: 0, recentVisits: 0 }
      }
    },
    mounted() {
      get().then(res => {
        this.count.newIp = res.newIp
        this.count.newVisits = res.newVisits
        this.count.recentIp = res.recentIp
        this.count.recentVisits = res.recentVisits
      })
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .top-card-middle {
    position: relative;
    color: #77CDD6
  }

  .top-card-middle-1 {
    position: relative;
    color: #E3AEA1
  }

  .top-card-content {
    padding: 15px 10px;
    font-size: 16px;
    font-weight: bold;
  }
</style>
