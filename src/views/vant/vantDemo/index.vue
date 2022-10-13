<template>
  <div :class="uiStyle=='normal'?'about':'aboutold'">
    <!-- 导航 -->
    <van-tabs v-model="actives" color="#3296fa" title-active-color="#3296fa" sticky >
      <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh" >
        <!-- 点位测评 -->
        <van-tab title="点位测评" name="a" >
          <!-- 点位信息-->
          <div class="pin">
            <van-row>
              <van-col span="12" offset="2" >
                <h2>点位信息</h2>
              </van-col>
            </van-row>
            <van-row class="txt">
              <van-col span="5" offset="2" >点位名称:</van-col>
              <van-col span="14" offset="1" style="color: #569bfd" >{{ headers.name }}</van-col>
            </van-row>
            <van-row class="txt">
              <van-col span="5" offset="2" >所属区: </van-col>
              <van-col span="8" offset="1" >{{ headers.itsarea }}</van-col>
            </van-row>
            <van-row class="txt">
              <van-col span="5" offset="2" >所属街道:</van-col>
              <van-col span="8" offset="1" >{{ headers.townName }}</van-col>
            </van-row>
            <van-row class="txt">
              <van-col span="5" offset="2" >具体地址:</van-col>
              <van-col span="10" offset="1" >{{ headers.address }}</van-col>
            </van-row>
            <van-row class="txt">
              <van-col span="5" offset="2" >负责人:</van-col>
              <van-col span="8" offset="1" >{{ headers.contact }}</van-col>
            </van-row>
            <!-- <van-row class="txt">
              <van-col span="4" offset="2">职务:</van-col>
              <van-col span="8" offset="1">科长</van-col>
            </van-row> -->
            <van-row class="txt">
              <van-col span="5" offset="2" >联系电话:</van-col>
              <van-col span="8" offset="1" style="margin-top: 2px" >{{ headers.phone|formatPhone }}</van-col>
            </van-row>
          </div>
          <!-- 点位测评一 -->
          <div class="ce" v-for="(item, index) in [{}, {}, {}] || cepin" :key="index" >
            <van-collapse v-model="activeNames">
              <van-collapse-item :title="'点位测评(' + convertToChinaNum(index + 1) + ')'" :name="String(index)" >
                <van-row class="ces">
                  <van-col span="6">测评标准:</van-col>
                  <van-col span="17" offset="1" class="van_color">{{item.content }}</van-col>
                </van-row>
                <van-row class="ces">
                  <van-col span="6">测评情况:</van-col>
                  <van-col span="8" offset="1">
                    <div class="ds" v-if="item.state == 1">
                      <span id="dstyle"></span>
                      <span id="dstype1">合格</span>
                    </div>
                    <div class="ds" v-else-if="item.state == 2">
                      <span id="dstyleNo"></span>
                      <span id="dstype2">不合格</span>
                    </div>
                    <div class="ds" v-else-if="item.state == 3">
                      <span id="dstyleNos"></span>
                      <span id="dstype3">严重不合格</span>
                    </div>
                  </van-col>
                </van-row>
                <van-row class="ces">
                  <van-col span="6">责任单位:</van-col>
                  <van-col span="8" offset="1" class="van_color">{{item.townName }}</van-col>
                </van-row>
                <van-row class="ces">
                  <van-col span="6">联系人:</van-col>
                  <van-col span="8" offset="1" class="van_color">{{item.contact }}</van-col>
                </van-row>
                <van-row class="ces">
                  <van-col span="6">联系电话:</van-col>
                  <van-col span="8" offset="1" class="van_color">{{item.phone|formatPhone }}</van-col>
                </van-row>
                <van-row class="ces">
                  <van-col span="24">问题图片:</van-col>
                  <van-row gutter="10">
                    <van-col v-for="(ite, indexs) in item.img" :key="indexs">
                      <van-image width="1.2rem" height="1.2rem" fit="cover" :src="ite">
                        <template v-slot:error>暂无图片</template>
                      </van-image>
                    </van-col>
                  </van-row>
                </van-row>
                <van-row class="ces">
                  <van-col span="6">整改进度:</van-col>
                  <van-col span="8" offset="1" style="color: #0bd464" v-if="item.status == 1">已整改</van-col>
                  <van-col span="8" offset="1" style="color: #ff9f00" v-else-if="item.status == 3">已提交</van-col>
                  <van-col span="8" offset="1" style="color: #0bd464" v-else-if="item.status == 4">已评价</van-col>
                  <van-col span="8" offset="1" style="color: #f55e4e" v-else-if="item.status != 1 || 2 || 3 || 4">未整改</van-col>
                </van-row>
                <!-- 点位评价 -->
                <van-row class="ces" v-if="User" >
                  <van-col span="6">点位评价:</van-col>
                  <van-col span="13" offset="1" class="pingjia" >
                    <van-checkbox v-model="item.sex1" icon-size="14px" @click="yesHander(item.pid, index)">好</van-checkbox>
                    <van-checkbox v-model="item.sex2" icon-size="14px" @click="midelHander(item.pid, index)">一般</van-checkbox>
                    <van-checkbox v-model="item.sex3" icon-size="14px" @click="noHander(item.pid, index)">差</van-checkbox>
                  </van-col>
                </van-row>
                <van-row class="ces">
                  <van-col span="6">测评记录:</van-col>
                  <van-col span="8" offset="1" >
                    <b @click="aHander(item.pid, index)" style="
                      text-decoration: revert;
                      color: #3296fa;
                      font-weight: normal;
                      cursor: pointer;
                    ">查看详情</b>
                  </van-col>
                </van-row>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
      </van-pull-refresh>
      <!-- 抄告单 -->
      <van-tab title="抄告单" name="b">

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" style="margin-bottom:56px">
          <div class="per">
            <van-row type="flex" justify="center" class="vrow" v-for="(ite, index) in [{}, {}, {}] || trees" :key="index" @click="allHander(ite.id, index, ite.status)">
              <van-col span="22" class="data">
                <van-row type="flex" :class="ite.status == 3 ? 'daheader' : ite.status == 1 || ite.status == 4 ? 'daheaderNo' : 'daheaders'">
                  <van-col span="7" offset="1" id="code" style="
                      text-align: left;
                      white-space: nowrap;
                      text-overflow: ellipsis;
                      overflow: hidden;
                      word-break: break-all;
                    ">{{ ite.code }}测试测试测试测试测试测试测试测试</van-col>
                  <van-col span="7" offset="8" v-if="ite.status == 1">镇街未处理</van-col>
                  <van-col span="7" offset="8" v-if="ite.status == 2">镇街已提交</van-col>
                  <van-col span="7" offset="8" v-if="ite.status == 3">审核已通过</van-col>
                  <van-col span="7" offset="8" v-if="ite.status == 4">审核未通过</van-col>
                  <van-col span="7" offset="8">审核未通过</van-col>
                </van-row>
                <van-divider></van-divider>
                <van-row class="datas">
                  <van-col span="6" offset="1" class="sty">抄告时间:</van-col>
                  <van-col span="15" class="sty">{{ ite.createDate }}抄告时间</van-col>
                </van-row>
                <van-row class="datas">
                  <van-col span="6" offset="1" class="sty">抄告对象:</van-col>
                  <van-col span="16" class="sty">{{ ite.source }}抄告对象</van-col>
                </van-row>
                <van-row class="datas">
                  <van-col span="6" offset="1" class="sty">预警时间:</van-col>
                  <van-col span="16" class="sty">{{ ite.wartingDate }}预警时间</van-col>
                </van-row>
                <van-divider></van-divider>
                <van-row style="margin: 0px 0px 12px 0px">
                  <van-col span="6" offset="1" style="text-align: left" id="xf">下发人:</van-col>
                  <van-col span="10" style="color: #3296fa; text-align: left" id="xfs">{{ite.townName }}</van-col>
                </van-row>
              </van-col>
            </van-row>
            <van-empty :description="haha" v-if="trees.length == 0"/>
          </div>
        </van-list>

        <!-- 下发抄告单按钮 -->
        <van-row type="flex" justify="center" class="btn" v-if="User_cg">
          <van-col span="21">
            <van-button round type="info" style="width: 100%" @click="addHander" size="small" class="typ">下发抄告单</van-button>
          </van-col>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
//点位测评/抄告单
import { Toast } from "vant";
import { Dialog } from "vant";
//使用第三方库调用接口
// import { mgop } from "@aligov/jssdk-mgop";

export default {
  data() {
    return {
      token: this.$store.getters.token,
      uiStyle: "", //normal:标准 elder:适老
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      actives: "a",
      activeNames: ["0"], //展开的地位测评下标（name）
      trees: [], //镇街抄告单
      currentPage: 1, //第一页
      pages: "", //页数
      total: "", //总条数
      haha: "未下发抄告单",
      headers: {
        //点位信息
        name: "", //点位名称
        itsarea: "", //所属区
        townName: "", //所属街道
        address: "", //具体地址
        contact: "", //负责人
        phone: "", //电话
      },
      cepin: [], //所有点位测评
      access_token: "", //token
      User: true, //查看详情状态能不能评价
      User_cg: true, //能不能下发抄告单
    };
  },
  filters: {
    //电话脱敏
    formatPhone: function (p) {
      if (p) {
        return p.substring(0, 3) + "*****" + p.substring(p.length - 2);
      }
    },
  },
  created() {
    this.init()
  },
  methods: {
    // 原 mounted 运行的方法 迁移至 created
    init() {
      console.log("INIT")
      // ZWJSBridge.showPreloader({ text: "加载中..", showIcon: true });
      // console.log(this.$route.params.ids); //路由跳转的点位id
      // console.log("用户权限", window.sessionStorage.getItem("User"));

      let Users = window.sessionStorage.getItem("User"); //1.宣传部 2.文明办 3.测评点位负责人 4.群众

      if (/^[3]$/.test(Users)) {
        this.User = false; //不能评价
        this.User_cg = false; //不能下发抄告单
      } else {
        this.User = true; //测评点位负责人只能在查看详情里整改不能评价
        if (/^[12]$/.test(Users)) {
          this.User_cg = true; //宣传部和文明办可以下发抄告单
        }
      }

      //获取
      // ZWJSBridge.getLocalStorage({ key: "access_token" }).then(result => {
      //   this.access_token = result.access_token;
      //   this.getCopyNoticeList(Users)
      // }).catch(error => console.error(error));
    },
    //抄告单分页
    onLoad() {
      console.log("onLoad 抄告单分页")
      //获取

      if (this.currentPage < this.pages) {
        this.currentPage++;
        const params = {
          api: "mgop.hkwl.xswmcsszxt.pages",
          header: {Authorization: "Bearer " + this.token, "content-type": "application/json"},
          data: {
            // 点位id  this.$route.params.ids
            copyId: this.$route.params.ids || window.sessionStorage.getItem("MAPKEY"),
            pageSize: "2",
            pageIndex: this.currentPage,
            type: "2"
          }
        }
        this.$Ajax.MGop(params).then(res => {
          (res || []).forEach(item => this.trees.push(item))
        })
      }
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.trees.length == this.total) {
        this.finished = true
      }
    },
    //下拉刷新
    onRefresh(showToast = true) {
      setTimeout(() => {
        showToast && Toast("刷新成功");
        this.isLoading = false;

        // console.log(this.$route.params.ids); //路由跳转的点位id
        // console.log("用户权限", window.sessionStorage.getItem("User"));

        let Users = window.sessionStorage.getItem("User"); //1.宣传部 2.文明办 3.测评点位负责人 4.群众

        if (/^[3]$/.test(Users)) {
          this.User = false; //不能评价
          this.User_cg = false; //不能下发抄告单
        } else {
          this.User = true; //测评点位负责人只能在查看详情里整改不能评价
          if (/^[12]$/.test(Users)) {
            this.User_cg = true; //宣传部和文明办可以下发抄告单
          }
        }

        //获取
        // ZWJSBridge.getLocalStorage({ key: "access_token" }).then((result) => {
        //   console.log("下拉刷新 getLocalStorage", result)
        //   this.access_token = result.access_token;
        //   //点位测评
        //   this.getPointList()
        // }).catch(error => console.error(error));
      }, 1000);
    },
    //下发抄告单
    addHander() {
      this.$router.push({
        path: "./add" + this.$route.params.ids,
        query: { debug: "true" },
      });
    },
    //查看详情/处理镇街
    allHander(id, i, types) {
      window.sessionStorage.setItem("types", types);
      this.$router.push("/deal" + id);
    },
    //点位测评查看详情
    aHander(id, index) {
      //to="/eval"
      //存储单个评价信息
      // ZWJSBridge.setLocalStorage({
      //   key: "pj",
      //   value: JSON.stringify(this.cepin[index]),
      // }).then(() => {
      //   this.$router.push("/eval" + id); //存储完跳转到新的提交评价页面
      // }).catch(error => {
      //   console.error(error);
      // })

      // this.$router.push("/eval" + id);
    },
    //将数字（整数）转为汉字
    convertToChinaNum(num) {
      var arr1 = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
      var arr2 = new Array("", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"); //可继续追加更高位转换值
      if (!num || isNaN(num)) {
        return "零";
      }
      var english = num.toString().split("");
      var result = "";
      for (var i = 0; i < english.length; i++) {
        var des_i = english.length - 1 - i; //倒序排列设值
        result = arr2[i] + result;
        var arr1_index = english[des_i];
        result = arr1[arr1_index] + result;
      }
      //将【零千、零百】换成【零】 【十零】换成【十】
      result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十");
      //合并中间多个零为一个零
      result = result.replace(/零+/g, "零");
      //将【零亿】换成【亿】【零万】换成【万】
      result = result.replace(/零亿/g, "亿").replace(/零万/g, "万");
      //将【亿万】换成【亿】
      result = result.replace(/亿万/g, "亿");
      //移除末尾的零
      result = result.replace(/零+$/, "");
      //将【零一十】换成【零十】
      //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
      //将【一十】换成【十】
      result = result.replace(/^一十/g, "十");
      return result;
    },
    //点位评价:好
    yesHander(id, index) {
      const _this = this
      this.cepin[index].sex1 = false;
      if (/^[12]$/.test(window.sessionStorage.getItem("User"))) {
        //点位评价（是否可以评价）宣传部1 文明办2 需要调用,
        mgop({
          api: "mgop.hkwl.xswmcsszxt.namephones", // 必须
          host: "https://mapi.zjzwfw.gov.cn/",
          header: {
            "content-type": "application/json",
            Authorization: "Bearer " + this.access_token,
          },
          data: {
            id: id, //pid
          },
          dataType: "JSON",
          type: "post",
          appKey: "78gfqt8h+2002021040+wwblty", // 必须
          onSuccess: (data) => {
            if (data.data.data) {
              //可以评价
              Dialog.confirm({
                title: "点位评价",
                message: "确认评价为:'好'",
              })
                  .then(() => {
                    // on confirm
                    this.cepin[index].sex1 = false;

                    //确定为好
                    mgop({
                      api: "mgop.hkwl.xswmcsszxt.wmzspingjias", // 必须
                      host: "https://mapi.zjzwfw.gov.cn/",
                      header: {
                        "content-type": "application/json",
                        Authorization: "Bearer " + this.access_token,
                      },
                      data: {
                        pointEvaluationId: this.cepin[index].pid, //pid
                        pedId: "",
                        ipId: this.cepin[index].id,
                        iwId: this.cepin[index].wid,
                        state: "1", //好：1 一般：2 差：3
                        content: "",
                        img: "",
                      },
                      dataType: "JSON",
                      type: "post",
                      appKey: "78gfqt8h+2002021040+wwblty", // 必须
                      onSuccess: (data) => {
                        if (data.data.msg) {
                          Toast.success("评价成功");
                          this.onRefresh(); //刷新
                        }
                      },
                      onFail: (err) => {
                        console.error("err", err);
                      },
                    });
                  })
                  .catch(() => {
                    // on cancel
                    this.cepin[index].sex1 = false;
                  });
            } else {
              //没有权限
              this.cepin[index].sex1 = false;
              Toast.fail(data.data.msg);
            }
          },
          onFail: (err) => {
            console.error("mgop.hkwl.xswmcsszxt.namephones", err);
          },
        });
      } else {
        //群众4 能无限测评 不影响数据 不需要判断能够评价
        this.cepin[index].sex1 = false;
        //确定为好
        mgop({
          api: "mgop.hkwl.xswmcsszxt.wmzspingjias", // 必须
          host: "https://mapi.zjzwfw.gov.cn/",
          header: {
            "content-type": "application/json",
            Authorization: "Bearer " + this.access_token,
          },
          data: {
            pointEvaluationId: this.cepin[index].pid, //pid
            pedId: "",
            ipId: this.cepin[index].id,
            iwId: this.cepin[index].wid,
            state: "1", //好：1 一般：2 差：3
            content: "",
            img: "",
          },
          dataType: "JSON",
          type: "post",
          appKey: "78gfqt8h+2002021040+wwblty", // 必须
          onSuccess: (data) => {
            if (data.data.msg) {
              Toast.success("评价成功");
              _this.onRefresh(false); //刷新
            }
          },
          onFail: (err) => {
            console.error("err", err);
          },
        });
      }
    },
    //点位评价:一般
    midelHander(id, index) {
      this.cepin[index].sex2 = false; //评价选框不展示状态
      if (/^[12]$/.test(window.sessionStorage.getItem("User"))) {
        //点位评价（是否可以评价）

        mgop({
          api: "mgop.hkwl.xswmcsszxt.namephones", // 必须
          host: "https://mapi.zjzwfw.gov.cn/",
          header: {
            "content-type": "application/json",
            Authorization: "Bearer " + this.access_token,
          },
          data: {
            id: id, //pid
          },
          dataType: "JSON",
          type: "post",
          appKey: "78gfqt8h+2002021040+wwblty", // 必须
          onSuccess: (data) => {
            if (data.data.data) {
              //可以评价

              //存储单个评价状态
              // ZWJSBridge.setLocalStorage({
              //   key: "state",
              //   value: "2",
              // })
              //     .then((res) => {})
              //     .catch((err) => {});
              //存储单个评价信息
              // ZWJSBridge.setLocalStorage({
              //   key: "pj",
              //   value: this.cepin[index],
              // })
              //     .then((result) => {
              //       this.$router.push({ path: "./pj" }); //存储完跳转到新的提交评价页面
              //     })
              //     .catch((error) => {
              //       console.error(error);
              //     });
            } else {
              //没有权限
              Toast.fail(data.data.msg);
            }
          },
          onFail: (err) => {
            console.error("err", err);
          },
        });
      } else {
        //群众
        //存储单个评价状态
        // ZWJSBridge.setLocalStorage({
        //   key: "state",
        //   value: "2",
        // });

        //存储单个评价信息
        // ZWJSBridge.setLocalStorage({
        //   key: "pj",
        //   value: JSON.stringify(this.cepin[index]),
        // })
        //     .then((result) => {
        //       this.$router.push({ path: "./pj" }); //存储完跳转到新的提交评价页面
        //     })
        //     .catch((error) => {
        //       console.error("存储单个评价信息error", error);
        //     });
      }
    },
    //点位评价:差
    noHander(id, index) {
      this.cepin[index].sex3 = false;
      if (/^[12]$/.test(window.sessionStorage.getItem("User"))) {
        //点位评价（是否可以评价）
        // mgop({
        //   api: "mgop.hkwl.xswmcsszxt.namephones", // 必须
        //   host: "https://mapi.zjzwfw.gov.cn/",
        //   header: {
        //     "content-type": "application/json",
        //     Authorization: "Bearer " + this.access_token,
        //   },
        //   data: {
        //     id: id, //pid
        //   },
        //   dataType: "JSON",
        //   type: "post",
        //   appKey: "78gfqt8h+2002021040+wwblty", // 必须
        //   onSuccess: (data) => {
        //     if (data.data.data) {
        //       //可以评价
        //       //存储单个评价状态
        //       // ZWJSBridge.setLocalStorage({
        //       //   key: "state",
        //       //   value: "3",
        //       // })
        //       //     .then((res) => {})
        //       //     .catch((err) => {});
        //
        //       //存储单个评价信息
        //       // ZWJSBridge.setLocalStorage({
        //       //   key: "pj",
        //       //   value: this.cepin[index],
        //       // })
        //       //     .then((result) => {
        //       //       this.$router.push({ path: "./pj" }); //存储完跳转到新的提交评价页面
        //       //     })
        //       //     .catch((error) => {
        //       //       console.error(error);
        //       //     });
        //     } else {
        //       //没有权限
        //       Toast.fail(data.data.msg);
        //     }
        //   },
        //   onFail: (err) => {
        //     console.error("err", err);
        //   },
        // });
        //点位评价（是否可以评价）
        // man({
        //   url: "civilizationCopyZlbService/getInsertPointCountStateZlb",
        //   method: "post",
        //   data: this.$qs.stringify({
        //     id: id, //pid
        //   }),
        //   headers: {
        //     "content-type": "multipart/form-data",
        //     Authorization: "Bearer " + this.access_token,
        //   },
        // }).then((data) => {
        //   if (data.data.data) {
        //     //可以评价
        //     //存储单个评价状态
        //     ZWJSBridge.setLocalStorage({
        //       key: "state",
        //       value: "3",
        //     })
        //       .then((res) => {})
        //       .catch((err) => {});

        //     //存储单个评价信息
        //     ZWJSBridge.setLocalStorage({
        //       key: "pj",
        //       value: this.cepin[index],
        //     })
        //       .then((result) => {
        //         this.$router.push({ path: "./pj" }); //存储完跳转到新的提交评价页面
        //       })
        //       .catch((error) => {
        //         console.error(error);
        //       });

        //     // this.$router.push({ path: "./pj", });
        //   } else {
        //     //没有权限
        //     Toast.fail(data.data.msg);
        //   }
        // });
      } else {
        //存储单个评价状态
        ZWJSBridge.setLocalStorage({ key: "state", value: "3" }).then(res => {
        }).catch(err => {})
        //存储单个评价信息
        ZWJSBridge.setLocalStorage({key: "pj",value: JSON.stringify(this.cepin[index])}).then(result => {
          this.$router.push({ path: "./pj" }); //存储完跳转到新的提交评价页面
        }).catch(error => console.error(error))
      }
    },
    // 获取全部抄告单
    getCopyNoticeList: function (Users) {
      //全部抄告单
      console.log("mgop.hkwl.xswmcsszxt.pages",)
      const params = {
        api: "mgop.hkwl.xswmcsszxt.pages",
        header: {"content-type": "application/json", Authorization: "Bearer " + this.token},
        data: {
          // 点位id  this.$route.params.ids
          copyId: this.$route.params.ids || window.sessionStorage.getItem("MAPKEY"),
          type: "2", //区分浙里办浙政钉
          pageSize: "2",
          pageIndex: "1"
        }
      }
      // this.$Ajax.MGop(params).then(res => {
      //   console.log(params.api, "已获取抄告单", res)
      //   //隐藏加载
      //   // ZWJSBridge.hidePreloader()
      //   if (/^[4]$/.test(Users)) {
      //     this.trees = []
      //     this.User_cg = false
      //     this.haha = "暂无权限查看"
      //   } else {
      //     this.trees = res.list
      //     this.pages = res.pages
      //     this.total = res.total
      //   }
      //   this.getPointList()
      // }).catch(() => ZWJSBridge.hidePreloader())
    },
    // 获取全部测评点位
    getPointList() {
      //全部点位测评
      const params = {
        api: "mgop.hkwl.xswmcsszxt.wmzsliebiaos",
        header: {"content-type": "application/json", Authorization: "Bearer " + this.token},
        data: {investigatepointId: this.$route.params.ids || window.sessionStorage.getItem("MAPKEY")}
      }
      // ZWJSBridge.showPreloader({ text: "加载中..", showIcon: true });
      // this.$Ajax.MGop(params).then(res => {
      //   ZWJSBridge.hidePreloader();
      //   console.log(params.api, "全部点位测评", res)
      //   if(Array.isArray(res) && res.length) {
      //     res.forEach((value, index) => {
      //       value["sex1"] = false;
      //       value["sex2"] = false;
      //       value["sex3"] = false;
      //       if (value.img != undefined || value.img != null) {
      //         console.log("JSON.stringify(value.img)", value.img)
      //         value.img = JSON.stringify(value.img)
      //             .replace('"', "")
      //             .replace('"', "")
      //             .split("^-^");
      //       }
      //     });
      //     this.headers.name = res[0].name;
      //     this.headers.itsarea = res[0].itsarea;
      //     this.headers.townName = res[0].townName;
      //     this.headers.address = res[0].address;
      //     this.headers.contact = res[0].contact;
      //     this.headers.phone = res[0].phone;
      //     this.cepin = res;
      //   }
      // }).catch(() => ZWJSBridge.hidePreloader())
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  box-sizing: border-box;
  background-color: #f6f7f8;
  position: relative;
  #code {
    font-size: 14px;
  }
  #xf {
    font-size: 12px;
  }
  #xfs {
    font-size: 12px;
  }
  .sty {
    font-size: 12px;
  }
  ::v-deep .van-cell__title,
  .van-cell__value {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 15px;
    font-weight: bolder;
    margin-left: 15px;
  }
  ::v-deep .van-image__error,
  .van-image__loading {
    font-size: 9px;
  }
  ::v-deep .van-collapse-item__content {
    padding: 0.32rem 0.426667rem;
    color: #969799;
    font-size: 0.373333rem;
    line-height: 1.5;
    background-color: #fff;
    margin-left: 15px;
  }
  ::v-deep .van-collapse-item__title--expanded::after {
    display: none;
  }
  .pingjia {
    display: flex;
    justify-content: space-between;
    ::v-deep .van-checkbox__icon{
      width: 14px;
      height: 14px;
      box-sizing: border-box;
    }
    ::v-deep .van-checkbox__icon .van-icon {
      width: inherit;
      height: inherit;
    }
  }
  .pin {
    margin-top: 1px;
    padding: 0px 0px 10px 0px;
    width: 100%;
    background-color: white;
    margin-bottom: 16px;
    .van-col {
      text-align: left;
    }
    .txt {
      margin-bottom: 10px;
      font-size: 12px;
      :first-child {
        color: #d8d8db;
      }
    }
  }
  .ds {
    display: flex;
    align-items: center;
  }
  #dstype1 {
    color: #0bd464;
    font-size: 12px;
  }
  #dstype2 {
    color: #ff9f00;
    font-size: 12px;
  }
  #dstype3 {
    color: #ee0a24;
    font-size: 12px;
  }
  #dstyle {
    border-radius: 50%;
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 6px;
    background-image: radial-gradient(
            6px at center center,
            rgb(11, 212, 100) 2px,
            white 5px,
            rgb(12, 248, 118) 9px
    );
  }
  #dstyle {
    border-radius: 50%;
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 6px;
    background-image: radial-gradient(
            6px at center center,
            rgb(11, 212, 100) 2px,
            white 5px,
            rgb(12, 248, 118) 9px
    );
  }
  #dstyleNo {
    border-radius: 50%;
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 6px;
    background-image: radial-gradient(
            6px at center center,
            #ff9f00 2px,
            white 5px,
            #ff9f00 9px
    );
  }
  #dstyleNos {
    border-radius: 50%;
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 6px;
    background-image: radial-gradient(
            6px at center center,
            #ee0a24 2px,
            white 5px,
            #ee0a24 9px
    );
  }
  .ce {
    width: 100%;
    background-color: white;
    margin-bottom: 20px;
    .van-col {
      text-align: left;
      font-size: 11px;
    }
    .van_color {
      color: black;
    }
    .van-collapse-item {
      text-align: left;
    }
    .ces {
      margin-bottom: 7px;
    }
  }

  .per {
    padding: 20px 0px;
    box-sizing: border-box;
    width: 100%;
    padding-bottom: 70px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #f6f7f8;
    position: relative;

    .vrow {
      margin-bottom: 20px;
    }

    .van-divider {
      margin: 0px 0px 12px 0px !important;
    }
    .data {
      background-color: white;
      border-radius: 5px;
      overflow: auto;
      box-sizing: border-box;
      // 审核通过
      .daheader {
        padding: 12px 0px 9px 0px;
        background-image: linear-gradient(
                to right,
                #c9fcdc 10px,
                #d5ffe5 30px,
                white
        );
        :first-child {
          padding: 3px;
          font-weight: bolder;
        }
        :last-child {
          background-color: #dbf6e4;
          padding: 3px;
          color: #6ade93;
        }
      }
      //未提交
      .daheaderNo {
        padding: 12px 0px 9px 0px;
        background-image: linear-gradient(
                to right,
                #fff0ed 10px,
                #fff4f1 30px,
                white
        );
        :first-child {
          padding: 3px;
          font-weight: bolder;
        }
        :last-child {
          background-color: #fddbd8;
          padding: 3px;
          color: #f55a4a;
        }
      }
      //待审核
      .daheaders {
        padding: 12px 0px 9px 0px;
        background-image: linear-gradient(
                to right,
                #fff7e5 10px,
                #fff2d6 30px,
                white
        );
        :first-child {
          padding: 3px;
          font-weight: bolder;
        }
        :last-child {
          background-color: #fff2d6;
          padding: 3px;
          color: #ffa40e;
        }
      }
      .datas {
        margin: 0px 0px 12px 0px;
        :first-child {
          color: #d8d8db;
        }
        :last-child {
          padding: 2px 0px 0px 4px;
          text-align: left;
        }
      }
    }
  }
  .btn {
    width: 100%;
    // height: 96px;
    background-color: white;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    padding: 10px 0px;
    border-top: 1px solid rgb(228, 227, 227);
  }
}
.aboutold {
  width: 100%;
  box-sizing: border-box;
  background-color: #f6f7f8;
  position: relative;
  ::v-deep .van-tab__text--ellipsis {
    font-size: 18px;
  }
  .typ {
    font-size: 17px;
  }
  #code {
    font-size: 18px;
  }
  #xf {
    font-size: 18px;
  }
  #xfs {
    font-size: 18px;
  }
  ::v-deep .van-collapse-item__content {
    padding: 0.32rem 0.426667rem;
    color: #969799;
    font-size: 24px;
    line-height: 1.5;
    background-color: #fff;
  }
  ::v-deep .van-collapse-item__title--expanded::after {
    display: none;
  }
  ::v-deep .van-image__error,
  .van-image__loading {
    font-size: 9px;
  }
  .pingjia {
    display: flex;
    justify-content: space-between;
    ::v-deep .van-checkbox__icon{
      width: 18px;
      height: 18px;
      box-sizing: border-box;
    }
    ::v-deep .van-checkbox__icon .van-icon {
      width: inherit;
      height: inherit;
    }
  }
  ::v-deep .van-cell__title,
  .van-cell__value {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 24px;
    font-weight: bolder;
  }
  .pin {
    margin-top: 1px;
    padding: 0px 0px 10px 0px;
    width: 100%;
    background-color: white;
    margin-bottom: 16px;
    .van-col {
      text-align: left;
    }
    h2 {
      font-size: 24px;
    }
    .txt {
      margin-bottom: 10px;
      font-size: 18px;
      :first-child {
        color: #d8d8db;
      }
    }
  }
  .ds {
    display: flex;
    align-items: center;
  }
  #dstype1 {
    color: #0bd464;
    font-size: 14px;
  }
  #dstype2 {
    color: #ff9f00;
    font-size: 14px;
  }
  #dstype3 {
    color: #ee0a24;
    font-size: 14px;
  }
  #dstyle {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 6px;
    background-image: radial-gradient(
            4px at center center,
            rgb(11, 212, 100) 1px,
            white 7px,
            rgb(12, 248, 118) 9px
    );
  }
  #dstyleNo {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 6px;
    background-image: radial-gradient(
            4px at center center,
            #ff9f00 1px,
            white 7px,
            #ff9f00 9px
    );
  }
  #dstyleNos {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 6px;
    background-image: radial-gradient(
            4px at center center,
            #ee0a24 1px,
            white 7px,
            #ee0a24 9px
    );
  }
  .ce {
    width: 100%;
    background-color: white;
    margin-bottom: 20px;
    .van-col {
      text-align: left;
      font-size: 18px;
    }
    .van_color {
      color: black;
    }
    .van-collapse-item {
      text-align: left;
    }
    .ces {
      margin-bottom: 7px;
    }
  }

  .per {
    padding: 20px 0px;
    box-sizing: border-box;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #f6f7f8;
    position: relative;

    .vrow {
      margin-bottom: 20px;
    }

    .van-divider {
      margin: 0px 0px 12px 0px !important;
    }
    .data {
      background-color: white;
      border-radius: 5px;
      overflow: auto;
      box-sizing: border-box;
      // 审核通过
      .daheader {
        padding: 12px 0px 9px 0px;
        background-image: linear-gradient(
                to right,
                #c9fcdc 10px,
                #d5ffe5 30px,
                white
        );
        :first-child {
          padding: 3px;
          font-weight: bolder;
        }
        :last-child {
          background-color: #dbf6e4;
          padding: 3px;
          color: #6ade93;
          font-size: 18px;
        }
      }
      //未提交
      .daheaderNo {
        padding: 12px 0px 9px 0px;
        background-image: linear-gradient(
                to right,
                #fff0ed 10px,
                #fff4f1 30px,
                white
        );
        :first-child {
          padding: 3px;
          font-weight: bolder;
        }
        :last-child {
          background-color: #fddbd8;
          padding: 3px;
          color: #f55a4a;
          font-size: 18px;
        }
      }
      //待审核
      .daheaders {
        padding: 12px 0px 9px 0px;
        background-image: linear-gradient(
                to right,
                #fff7e5 10px,
                #fff2d6 30px,
                white
        );
        :first-child {
          padding: 3px;
          font-weight: bolder;
        }
        :last-child {
          background-color: #fff2d6;
          padding: 3px;
          color: #ffa40e;
          font-size: 18px;
        }
      }
      .datas {
        margin: 0px 0px 12px 0px;
        :first-child {
          color: #d8d8db;
          font-size: 18px;
        }
        :last-child {
          padding: 2px 0px 0px 4px;
          text-align: left;
          font-size: 18px;
        }
      }
    }
  }
  .btn {
    width: 100%;
    // height: 96px;
    background-color: white;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    padding: 20px 0px;
    border-top: 1px solid rgb(228, 227, 227);
    .typ{
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC, sans-serif;
      font-weight: 400;
      color: #FFFFFF;
      height: 44px;
    }
  }

  ::v-deep .van-list__finished-text{
    font-size: 22px;
  }

  ::v-deep .van-empty{
    .van-empty__image{
      width: 260px;
      height: 260px;
    }
    .van-empty__description{
      font-size: 22px;
    }
  }
}
</style>