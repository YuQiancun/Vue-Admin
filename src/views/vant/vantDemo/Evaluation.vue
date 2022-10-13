<template>
  <div :class="uiStyle === 'normal' ? 'Evaluation' : 'Evaluationold '">
    <!-- 搜索框-->
    <van-row>
      <van-col span="24">
        <van-search v-model="search" placeholder="请输入考察点名称搜索" class="search_box" show-action @cancel="onCancel" @input="onInput"/>
      </van-col>
    </van-row>

    <div class="nps">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
          <div class="vrow" v-for="(item, index) in all || 2" :key="index" >
            <van-row type="flex">
              <van-col span="17" offset="1" class="typ item-title" style="font-weight: bolder" >{{ item.content || "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试" }}</van-col>
              <van-col span="5" class="typ item-status" style="text-align: right; color: #ff9f00" v-if="item.status == 3">待评价</van-col>
              <van-col class="typ item-status" span="5" style="text-align: right; color: #ff9f00" v-else-if="item.status == 4" >已评价</van-col>
              <van-col span="5" class="typ item-status" style="text-align: right; color: #ff9f00" v-else-if="item.status == 0" >未整改</van-col>
              <van-col span="5" class="typ item-status" style="text-align: right; color: #ff9f00" v-else-if="item.status == 1" >已整改</van-col>
              <van-col span="5" class="typ item-status" style="text-align: right; color: #ff9f00" >已整改</van-col>
            </van-row>
            <van-row type="flex" class="fk" >
              <van-col span="5" offset="1" class="typ fk-label" style="color: #c2c3c6" >测评人员:</van-col>
              <van-col span="6" class="typ fk-content" >{{ item.username }}测评人员</van-col>
            </van-row>
            <van-row type="flex" class="fk" >
              <van-col span="5" offset="1" class="typ fk-label" style="color: #c2c3c6" >测评时间:</van-col>
              <van-col span="15" class="typ fk-content" >{{ item.pDate }}</van-col>
            </van-row>
            <van-row type="flex" class="fk" >
              <van-col span="23" offset="1" style="color: #c2c3c6" class="typ fk-label" >问题图片:</van-col>
              <van-col span="23" offset="1" class="fk-content">
                <van-row gutter="20" class="fk" >
                  <van-col v-for="(ite, indexs) in item.img" :key="indexs" >
                    <van-image width="1.3rem" height="1.3rem" fit="cover" :src="ite" >
                      <template v-slot:error>暂无图片</template>
                    </van-image>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
            <van-row type="flex" class="fk line" >
              <van-col span="23" offset="1" style="color: #c2c3c6" class="typ fk-label" >整改图片:</van-col>
              <van-col span="23" offset="1" class="fk-content">
                <van-row gutter="12" class="fk" >
                  <van-col v-for="(ites, indexss) in item.qimg || ['', '', '']" :key="indexss" >
                    <van-image class="content-image" fit="cover" :src="ites || 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'" >
                      <template v-slot:error>暂无图片</template>
                    </van-image>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
            <van-row type="flex" class="fk-line" justify="center" >
              <van-col span="22">
                <van-divider />
              </van-col>
            </van-row>
            <van-row type="flex" class="fk-footer" gutter="10" v-if="!btnOn" >
              <van-col span="7" offset="4" >
                <van-button round type="danger" size="small" @click="noHander()" >差</van-button>
              </van-col>
              <van-col span="6">
                <van-button round color="#ff9f00" size="small" @click="nopassHander()" >一般</van-button>
              </van-col>
              <van-col span="6">
                <van-button round type="primary" size="small" @click="passHander(item.content)" >好</van-button>
              </van-col>
            </van-row>

            <van-row type="flex" class="fk-footer" gutter="10" v-if="item.status == 0&&isbt" >
              <van-col span="7" offset="14" >
                <van-button round type="danger" size="small" @click="zgHander(index)" >整改</van-button>
              </van-col>
            </van-row>
          </div>
        </van-list>
      </van-pull-refresh>

      <van-empty description="暂无测评记录" v-if="!isLn" />
    </div>
  </div>
</template>

<script>
export default {
  name: "VantDemo",
  data() {
    return {
      uiStyle: "", //normal:标准 elder:适老
      total: "",
      loading: false,
      finished: false,
      isLoading: false,
      refreshing: false,
      path: "/about",
      all: "",
      pages: "",
      currentPages: 1,
      search: "",
      btnOn: false,
      isbt: false,
      access_token: "",
      isLn: false,
    };
  },
  created() {
  },
  mounted() {
    console.log(this.$route.params);
    let Users = sessionStorage.getItem("User"); //用户权限
    console.log(Users, "用户");

    switch (Users) {
      case "1": //宣传部
        this.btnOn = false;
        this.isbt = false;
        break;
      case "2": //文明办
        this.btnOn = false;
        this.isbt = false;
        break;
      case "3": //点位负责人
        this.btnOn = true;
        this.isbt = true;
        break;
      default:
        //群众
        this.btnOn = false;
        this.isbt = false;
        break;
    }

    /* if (window.sessionStorage.getItem("User") == "4") {
      //群众不展示按钮
      this.btnOn = false;
    } else {
      if (window.sessionStorage.getItem("User") == "3") {
        //点位负责人展示整改按钮
        this.btnOn = false;
      } else {
        //宣传部 文明办展示三个按钮
        this.btnOn = true;
      }
    } */

    //获取
    // ZWJSBridge.getLocalStorage({ key: "access_token" }).then((result) => {
    //   this.token = result.access_token;
    //   //获取点位测评详情
    //   mgop({
    //     api: "mgop.hkwl.xswmcsszxt.wmzscepingxqs", // 必须
    //     host: "https://mapi.zjzwfw.gov.cn/",
    //     header: {
    //       "content-type": "application/json",
    //       Authorization: "Bearer " + result.access_token,
    //     },
    //     data:{
    //       pageIndex: "1",
    //       pageSize: "2",
    //       pointEvaluationId: this.$route.params.id,
    //     },
    //     dataType: "JSON",
    //     type: "post",
    //     appKey: "78gfqt8h+2002021040+wwblty", // 必须
    //     onSuccess: (data) => {
    //       console.log("点位测评详情", data);
    //       this.pages = data.data.data.pages; //页数
    //       this.total = data.data.data.total; //总条数
    //       let all = data.data.data.list;
    //       all.length == 0 ? (this.isLn = false) : (this.isLn = true);
    //       all.forEach((value, index) => {
    //         if (value.img != undefined) {
    //           value.img = JSON.stringify(value.img)
    //               .replace('"', "")
    //               .replace('"', "")
    //               .split("^-^");
    //         }
    //         if (value.qimg != null) {
    //           if (
    //               sessionStorage.getItem("User") == "3" &&
    //               value.qimg.length != 0
    //           ) {
    //             this.isbt = false;
    //           }
    //           value.qimg = JSON.stringify(value.qimg)
    //               .replace('"', "")
    //               .replace('"', "")
    //               .split("^-^");
    //         }
    //       });
    //       this.all = all;
    //     },
    //     onFail: (err) => {
    //       console.log("err", err);
    //     },
    //   });
    // }).catch((error) => {
    //   console.log(error);
    // });
  },
  methods: {
    //下拉分页
    onLoad() {
      setTimeout(() => {
        console.log("=====", this.pages, this.total, this.all);
        let Users = sessionStorage.getItem("User"); //用户权限

        switch (Users) {
          case "1": //宣传部
            this.btnOn = false;
            this.isbt = false;
            break;
          case "2": //文明办
            this.btnOn = false;
            this.isbt = false;
            break;
          case "3": //点位负责人
            this.btnOn = true;
            this.isbt = true;
            break;
          default:
            //群众
            this.btnOn = false;
            this.isbt = false;
            break;
        }
        // ZWJSBridge.getLocalStorage({ key: "access_token" })
        //     .then((result) => {
        //       this.token = result.access_token;
        //
        //       if (this.currentPages < this.pages) {
        //         this.currentPages++;
        //         //获取点位测评
        //         mgop({
        //           api: "mgop.hkwl.xswmcsszxt.wmzscepingxqs", // 必须
        //           host: "https://mapi.zjzwfw.gov.cn/",
        //           header: {
        //             "content-type": "application/json",
        //             Authorization: "Bearer " + result.access_token,
        //           },
        //           data: {
        //             pageIndex: this.currentPages,
        //             pageSize: "2",
        //             pointEvaluationId: this.$route.params.id,
        //           },
        //           dataType: "JSON",
        //           type: "post",
        //           appKey: "78gfqt8h+2002021040+wwblty", // 必须
        //           onSuccess: (data) => {
        //             console.log("2", data);
        //             let all = data.data.data.list;
        //             all.length ? (this.isLn = true) : (this.isLn = false);
        //             all.forEach((value, index) => {
        //               if (value.img != undefined) {
        //                 value.img = JSON.stringify(value.img).replace('"', "").replace('"', "").split("^-^");
        //               }
        //               if (value.qimg != null) {
        //                 if (sessionStorage.getItem("User") == "3" && value.qimg.length != 0) {this.isbt = false}
        //
        //                 value.qimg = JSON.stringify(value.qimg).replace('"', "").replace('"', "").split("^-^");
        //               } else {
        //                 if (sessionStorage.getItem("User") == "3" && value.qimg.length == "0") {
        //                   value.qimg = [];
        //                   this.isbt = true;
        //                 }
        //               }
        //               this.all.push(value);
        //             });
        //           },
        //           onFail: (err) => {
        //             console.log("err", err);
        //           },
        //         });
        //       }
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
      }, 1000);
      // 加载状态结束
      this.loading = false;
      // 数据全部加载完成
      if (this.all.length == this.total) {
        this.finished = true;
      }
    },
    //刷新
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },

    //搜索框输入时
    onInput() {
      console.log(this.search);
      //获取
      ZWJSBridge.getLocalStorage({ key: "access_token" })
          .then((result) => {
            // console.log(result.access_token);
            // this.token = result.access_token;

            //获取点位测评
            mgop({
              api: "mgop.hkwl.xswmcsszxt.wmzscepingxqs", // 必须
              host: "https://mapi.zjzwfw.gov.cn/",
              header: {
                "content-type": "application/json",
                Authorization: "Bearer " + result.access_token,
              },
              data:{
                pageIndex: "1",
                pageSize: "2",
                content: this.search,
              },
              dataType: "JSON",
              type: "post",
              appKey: "78gfqt8h+2002021040+wwblty", // 必须
              onSuccess: (data) => {
                console.log(data);
                let all = data.data.data.list;

                if (all.length == 0) {
                  this.all = all;
                } else {
                  all.forEach((value, index) => {
                    value.img = JSON.stringify(value.img)
                        .replace('"', "")
                        .replace('"', "")
                        .split("^-^");
                    value.qimg = JSON.stringify(value.qimg)
                        .replace('"', "")
                        .replace('"', "")
                        .split("^-^");
                  });
                  this.all = all;
                  this.pages = data.data.data.pages * 10;
                }
              },
              onFail: (err) => {
                console.log("err", err);
              },
            })
          })
          .catch((error) => {
            console.log(error);
          });
    },

    //取消搜索
    onCancel() {
      console.log("取消");
      //获取
      ZWJSBridge.getLocalStorage({ key: "access_token" }).then((result) => {
        // console.log(result.access_token);
        // this.token = result.access_token;
        const params = {
          api: "mgop.hkwl.xswmcsszxt.wmzscepingxqs",
          header: {"content-type": "application/json", Authorization: "Bearer " + result.access_token},
          data: {pageIndex: "1", pageSize: "2", pointEvaluationId: this.$route.params.id,}
        }
        //获取点位测评详情
        this.$Ajax.MGop(params).then(res => {
          console.log("点位测评详情", res);
          this.pages = res.pages; //页数
          this.total = res.total; //总条数
          let all = res.list;
          all.length ? (this.isLn = true) : (this.isLn = false);
          all.forEach(value => {
            if (value.img != undefined) {
              value.img = JSON.stringify(value.img).replace('"', "").replace('"', "").split("^-^");
            }
            if (value.qimg != null) {
              if (/^[3]$/.test(sessionStorage.getItem("User")) && !/^[0]$/.test(value.qimg.length)) {
                this.isbt = false;
              }
              value.qimg = JSON.stringify(value.qimg).replace('"', "").replace('"', "").split("^-^");
            }
          });
          this.all = all;
        }).catch(err => console.error(err))
      })
          .catch((error) => {
            console.log(error);
          });
    },
    //合格
    passHander(i) {
      Dialog.confirm({title: "",message: "确定合格？"}).then(() => {
        ZWJSBridge.getLocalStorage({ key: "pj" }).then((result) => {
          let res = JSON.parse(result.pj)
          //确定合格
          const params = {
            api: "mgop.hkwl.xswmcsszxt.wmzspingjias",
            header: {"content-type": "application/json", Authorization: "Bearer " + this.token},
            data:{
              pointEvaluationId: res.pid, //pid
              pedId: res.id,
              ipId: res.pid,
              iwId: res.wid,
              state: "1", //好：1 一般：2 差：3
              content: i,
              img: "",
            }
          }
          this.$Ajax.MGop(params).then(() => {
            Toast("评价成功");
          }).catch(err => console.err(err))
        }).catch((error) => {
          console.log(error);
        });
      }).catch(() => {});
    },
    //不合格
    nopassHander() {
      //存储单个评价状态
      // ZWJSBridge.setLocalStorage({key: "state", value: "2"}).then((res) => {
      //   this.$router.push({ path: "./pj" });
      // }).catch((err) => {});
    },
    //严重不合格
    noHander() {
      //存储单个评价状态
      ZWJSBridge.setLocalStorage({key: "state", value: "3"}).then((res) => {
        this.$router.push({ path: "./pj" });
      }).catch((err) => {});
    },
    //整改
    zgHander(i) {
      console.log("整改");

      //存储单个评价信息
      ZWJSBridge.setLocalStorage({key: "pjs", value: this.all[i]}).then((result) => {
        console.log(result);
        this.$router.push("/revise");
      }).catch((error) => console.error(error))

      // this.$router.push("/revise");
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .van-image__error,
.van-image__loading {
  font-size: 9px;
}
.Evaluation {
  width: 100%;
  background-color: #f6f7f8;
  position: relative;
  box-sizing: border-box;
  .typ {
    font-size: 15px;
  }
  .nps {
    width: 100%;
    min-height: 16rem;
    position: relative;
    box-sizing: border-box;
    padding: 10px 10px 0px 10px;
    // border: 1px solid red;
    .vrow {
      background-color: white;
      border-radius: 8px;
      text-align: left;
      padding: 10px 0px 10px 0px;
      margin-bottom: 16px;
    }
    .van-button--round {
      width: 100%;
    }
    .fk {
      margin-top: 10px;
      .content-image{
        width: 48px;
        height: 48px;
      }
    }
    .van-divider {
      margin: 10px 0px;
    }
  }
  .van-col {
    float: left;
    box-sizing: border-box;
    min-height: 0.026667rem;
    font-size: 10px;
  }
}
.Evaluationold {
  width: 100%;
  background-color: #f6f7f8;
  position: relative;
  box-sizing: border-box;
  .search_box {
    padding: 8px 16px;
    .van-search__content {
      background: rgba(179,181,185,0.0700);
      border-radius: 12px;
      //box-shadow: 0 2px 6px 0 #c7c4c4;
      .van-cell{
        box-sizing: border-box;
        line-height: 36px;
        ::v-deep .van-field__left-icon{
          width: 32px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          .van-icon-search {
            box-sizing: border-box;
            width: 32px;
            height: 32px;
            &:before{
              line-height: 32px;
              font-size: 32px;
            }
          }
        }
        ::v-deep .van-cell__value{
          font-size: 20px;
          font-family: PingFangSC-Regular, PingFang SC, sans-serif;
          font-weight: 400;
          color: #B3B5B9;
        }
      }
    }
    .van-search__action{
      font-size: 20px;
      font-weight: 400;
      color: #363A44;
      line-height: 22px;
      margin-left: 16px;
    }
  }
  .nps {
    width: 100%;
    min-height: 16rem;
    position: relative;
    box-sizing: border-box;
    padding: 10px 10px 0 10px;

    ::v-deep .van-pull-refresh{
      .van-pull-refresh__track{
        .van-list{
          .vrow{
            background-color: white;
            border-radius: 8px;
            text-align: left;
            padding: 10px 0;
            margin-bottom: 16px;
            .fk{
              margin-top: 10px;
              &.line{

              }
            }
            .item-title{
              font-size: 24px;
              font-family: PingFangSC-Medium, PingFang SC, sans-serif;
              font-weight: 500;
              color: #363A44;
            }
            .item-status{
              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC, sans-serif;
              font-weight: 400;
            }
            .fk-label{
              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC, sans-serif;
              font-weight: 400;
              color: #B3B5B9;
              line-height: 25px;
            }
            .fk-content{
              font-size: 18px;
              font-family: HelveticaNeue, sans-serif;
              color: #363A44;
              line-height: 22px;
              .content-image{
                width: 68px;
                height: 68px;
              }
            }
            .fk-line{
              margin: 10px 0;
            }
            .fk-footer{
              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC, sans-serif;
              font-weight: 400;
              color: #FFFFFF;
              .van-button{
                width: 100%;
                height: 36px;
                .van-button__content{
                  font-size: 18px;
                  font-family: PingFangSC-Regular, PingFang SC, sans-serif;
                  font-weight: 400;
                }
              }
            }
          }
        }
        .van-list__finished-text{
          font-size: 22px;
        }
      }
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
}
</style>