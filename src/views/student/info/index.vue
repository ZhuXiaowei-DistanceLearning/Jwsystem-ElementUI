<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
    </div>
    <!--表格渲染-->
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
          <span class="role-span">个人信息</span>
        </el-tooltip>
        <table class="formlist" width="100%" align="center">
          <TBODY>
          <tr>
            <TD class="trbg1">编号：</TD>
            <TD><span id="xh">{{data.id}}</span></TD>
            <TD class="trbg1"><span id="Label1">学生证号：</span></TD>
            <TD colSpan="2"><span id="lbl_xszh">{{data.id}}</span></TD>
            <td class="trbg1">手机类型：</td>
            <td width="165"><span id="lbl_TELLX"></span></td>
            <td rowSpan="6"><img id="xszp"
                                 src="../../../assets/images/avatar.png"
                                 alt="照片" align="AbsMiddle" border="0" height="144" width="112"/><br>
              <span id="Label7"><b><font color="Red">建议照片大小不超过100k<br>照片像素（宽×高）为：144×172<br>照片格式为BMP/JPG/JPEG</font></b></span>
            </td>
          </tr>
          <tr>
            <TD class="trbg1">姓名：
            </TD>
            <TD><span id="xm">{{data.username}}</span></TD>
            <TD class="trbg1">培养方向：</TD>
            <TD colSpan="2"><span id="lbl_pyfx"></span></TD>
            <td class="trbg1">手机号码：</td>
            <td width="165"><span id="lbl_TELNUMBER">{{data.phone}}</span></td>
          </tr>
          <tr>
            <TD class="trbg1">曾用名：</TD>
            <TD>
              <P></P>
              <P><span id="lbl_zym"></span></P>
            </TD>
            <TD class="trbg1">专业方向：</TD>
            <TD colSpan="2"><span id="lbl_zyfx"></span></TD>
            <td class="trbg1">家庭邮编：
            </td>
            <td width="165"><span id="lbl_jtyb"></span></td>
          </tr>
          <tr>
            <TD class="trbg1">性别：</TD>
            <TD><span id="lbl_xb">{{data.sex}}</span></TD>
            <TD class="trbg1">入学日期：</TD>
            <TD colSpan="2"><span id="lbl_rxrq">{{data.beginTime}}</span></TD>
            <td class="trbg1">家庭电话：
            </td>
            <td width="165"><span id="lbl_jtdh"></span></td>
          </tr>
          <tr>
            <TD class="trbg1">出生日期：</TD>
            <TD><span id="lbl_csrq">19961214</span></TD>
            <TD class="trbg1">毕业中学：</TD>
            <TD colSpan="2"><span id="lbl_byzx"></span></TD>
            <td class="trbg1">父亲姓名：
            </td>
            <td width="165"><span id="lbl_fqxm"></span></td>
          </tr>
          <tr>
            <TD class="trbg1">民族：</TD>
            <TD><span id="lbl_mz">汉族</span></TD>
            <TD class="trbg1">宿舍号：</TD>
            <TD colSpan="2"><span id="lbl_ssh">10-1-101-3</span></TD>
            <TD class="trbg1">父亲单位：</TD>
            <TD width="165"><span id="lbl_fqdw"></span></TD>
          </tr>
          <tr>
            <TD class="trbg1">籍贯：</TD>
            <TD><SPAN
              style="BORDER-BOTTOM: red 0px solid; BORDER-LEFT: red 0px solid; WIDTH: 18px; BORDER-TOP: red 0px solid; BORDER-RIGHT: red 0px solid">
										</SPAN><span id="lbl_jg">{{data.scity}}</span></TD>
            <TD class="trbg1">电子邮箱：</TD>
            <TD colSpan="2"><span id="lbl_dzyxdz">502513206@qq.com</span></TD>
            <TD class="trbg1">父亲单位邮编：</TD>
            <TD width="165"><span id="lbl_fqdwyb"></span></TD>
            <td><input name="File1" id="File1" type="file" class="button" onclick="return check();" size="8"/></td>
          </tr>
          <tr>
            <TD class="trbg1" height="7">政治面貌：</TD>
            <TD height="7"><span id="lbl_zzmm">{{data.politicalStatus}}</span></TD>
            <TD class="trbg1" height="7">联系电话：</TD>
            <TD height="7" colSpan="2"><span id="lbl_lxdh">13026667662</span></TD>
            <TD class="trbg1" height="7">母亲姓名：</TD>
            <TD height="7" width="165"><span id="lbl_mqxm"></span></TD>
            <td height="7" align="center"></td>
          </tr>
          <tr>
            <TD class="trbg1">来源地区：</TD>
            <TD><span id="lbl_lydq">湖南省张家界市</span></TD>
            <TD class="trbg1">邮政编码：</TD>
            <TD colSpan="2"><span id="lbl_yzbm">421009</span></TD>
            <TD class="trbg1">母亲单位：</TD>
            <TD width="165"><span id="lbl_mqdw"></span></TD>
            <td align="center"></td>
          </tr>
          <tr>
            <td class="trbg1">来源省：</td>
            <td><span id="lbl_lys">{{data.scity}}</span></td>
            <TD class="trbg1">准考证号：</TD>
            <TD colSpan="2"><span id="lbl_zkzh"></span></TD>
            <TD class="trbg1">母亲单位邮编：
            </TD>
            <TD width="165"><span id="lbl_mqdwyb"></span></TD>
            <td align="center">&nbsp;</td>
          </tr>
          <tr>
            <TD class="trbg1">出生地：</TD>
            <TD><span id="lbl_csd"></span></TD>
            <TD class="trbg1">身份证号：</TD>
            <TD colSpan="2"><span id="lbl_sfzh">430421199612143737</span></TD>
            <TD class="trbg1" width="241" colSpan="2"><span id="Label8">父亲单位电话或手机：</span></TD>
            <TD><span id="lbl_fqdwdh"></span></TD>
          </tr>
          <tr>
            <td class="trbg1">健康状况：
            </td>
            <td><span id="lbl_jkzk"></span></td>
            <TD class="trbg1">学历层次：</TD>
            <TD colSpan="2"><span id="lbl_CC">本科</span></TD>
            <TD class="trbg1" width="241" colSpan="2"><span id="Label9">母亲单位电话或手机：</span></TD>
            <TD><span id="lbl_mqdwdh"></span></TD>
          </tr>
          <tr>
            <TD class="trbg1">学院：</TD>
            <TD><span id="lbl_xy">软件学院</span></TD>
            <TD class="trbg1">港澳台码：</TD>
            <TD colSpan="2"><span id="lbl_gatm"></span></TD>
            <td class="trbg1" width="241" colSpan="2">家庭地址：
            </td>
            <TD><span id="lbl_jtdz"></span></TD>
          </tr>
          <tr>
            <TD class="trbg1">系：</TD>
            <TD><span id="lbl_xi"></span></TD>
            <TD class="trbg1">报到号：</TD>
            <TD colSpan="2"><span id="lbl_bdh">2797</span></TD>
            <TD class="trbg1" width="241" colSpan="2">家庭所在地（/省/县）：</TD>
            <TD><span id="lbl_jtszd">{{data.address}}</span></TD>
          </tr>
          <tr>
            <TD id="TDzymc" class="trbg1">专业名称：</TD>

            <TD><span id="lbl_zymc">软件技术（软件开发方向）</span></TD>
            <TD id="TDsfgspydy" class="trbg1" colSpan="3"><span id="Label2">是否高水平运动员：</span><FONT face="宋体">&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp; &nbsp;</FONT><span id="lbl_SFGSPYDY"></span></TD>
            <td class="trbg1" vAlign="top" rowSpan="4">备注：</td>
            <td rowSpan="4" colSpan="2"><span id="lbl_bz"></span></td>
          </tr>
          <tr>
            <TD class="trbg1">教学班名称：</TD>
            <TD><span id="lbl_JXBMC"></span></TD>
            <TD id="TDyydj" class="trbg1">英语等级：</TD>

            <TD colSpan="2"><span id="lbl_yydj"></span></TD>
          </tr>
          <tr>
            <TD class="trbg1">行政班：</TD>
            <TD><span id="lbl_xzb">软开1537</span></TD>
            <TD id="TDyycj" class="trbg1">英语成绩：
            </TD>

            <TD colSpan="2"><span id="lbl_YYCJ">93</span></TD>
          </tr>
          <tr>
            <TD id="TDxz" class="trbg1">学制：</TD>

            <TD><span id="lbl_xz">4</span></TD>
            <TD id="TDljbym" class="trbg1">录检表页码：</TD>

            <TD colSpan="2"><span id="lbl_LJBYM"></span></TD>
          </tr>
          <tr>
            <TD class="trbg1" height="39">学习年限：</TD>
            <TD height="39"><span id="lbl_xxnx"></span></TD>
            <TD class="trbg1" height="39">特长：</TD>
            <TD height="39" colSpan="2"><span id="lbl_tc"></span></TD>
            <td class="trbg1" height="39" width="241" colSpan="2"></td>
            <TD height="39"></TD>
          </tr>
          <tr>
            <TD class="trbg1" height="39">学籍状态：</TD>
            <TD height="39"><span id="lbl_xjzt">有</span></TD>
            <TD class="trbg1" height="39">党(团)时间：</TD>
            <TD height="39" colSpan="2"><span id="lbl_RDSJ"></span></TD>
            <td class="trbg1" height="39" width="241" colSpan="2"></td>
            <TD height="39"></TD>
          </tr>
          <tr>
            <TD class="trbg1" height="39">当前所在级：</TD>
            <TD height="39"><span id="lbl_dqszj">2016</span></TD>
            <TD id="TDccqj" class="trbg1" height="39">火车终点站：</TD>

            <TD height="39" colSpan="2"><span id="lbl_ccqj"></span></TD>
            <td class="trbg1" height="39" width="241" colSpan="2"></td>
            <TD height="39"></TD>
          </tr>
          <tr id="trksh">
            <td class="trbg1">考生号：</td>
            <TD><span id="lbl_ksh">15430421156881</span></TD>
            <td class="trbg1">学习形式：</td>
            <TD colspan="2"><span id="lbl_xxxs"></span></TD>
            <TD class="trbg1" width="241" colspan="2"></TD>
            <TD><FONT face="宋体"></FONT></TD>
          </tr>


          <tr id="qgjl">
            <td class="trbg1" valign="top" rowspan="4"><SPAN class="pagination">
										</SPAN></td>
            <td rowspan="4" colspan="7"></td>
          </tr>

          </TBODY>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
  import service from '../../../utils/request'
  import { findInfo } from '@/api/student/info/info'

  export default {
    data() {
      return {
        exportUrl: 'http://localhost:8080/api/export',
        fileList: [],
        loading: true,
        total: 0,
        show: false,
        params: {
          offset: 1,
          limit: 10,
          keyword: null,
        },
        data:{}
      }
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        findInfo().then(res => {
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
      toQuery() {
        this.load()
      },
    }
  }
</script>

<style scoped>
  @import '../../../assets/css/info.css';

</style>
