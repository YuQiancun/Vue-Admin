<template>
  <div :class="uiStyle=='normal'?'deal':'dealold'">
    <div v-if="isKn" class="rax">
      <div class="add">
        <van-row>
          <van-col span="8" offset="1" class="typ row-label">抄告对象</van-col>
        </van-row>
        <van-row>
          <van-col span="23" offset="1">
            <van-field v-model="headerTxt.objects" class="row-content" placeholder="请输入抄告对象" readonly/>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="22">
            <van-divider />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8" offset="1" class="typ row-label">抄告时间</van-col>
        </van-row>
        <van-row>
          <van-col span="23" offset="1">
            <van-field v-model="headerTxt.time" class="row-content"  placeholder="请输入抄告时间" readonly/>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="22">
            <van-divider />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8" offset="1" class="typ row-label">预警时间</van-col>
        </van-row>
        <van-row>
          <van-col span="23" offset="1">
            <van-field v-model="headerTxt.times" class="row-content"  placeholder="请输入预警时间" readonly/>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="22">
            <van-divider />
          </van-col>
        </van-row>

        <van-row>
          <van-col span="8" offset="1" class="typ row-label">抄告内容</van-col>
        </van-row>
        <van-row>
          <van-col span="23" offset="1">
            <van-field v-model="headerTxt.txt" rows="3" class="row-content"  autosize type="textarea" readonly placeholder="请输入抄告内容"/>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="22">
            <van-divider />
          </van-col>
        </van-row>
      </div>

      <hr>
      <div class="adds">
        <van-row>
          <van-col span="22" class="typ"
                   style="
              text-align: left;
              margin-top: 10px;
              margin-bottom: 10px;
              color: #969799;
            " offset="1"
          >
            处理信息
          </van-col>
        </van-row>
        <div class="anys">
          <van-row>
            <van-col span="8" offset="1" class="typ row-label">经办人</van-col>
          </van-row>
          <van-row>
            <van-col span="23" offset="1">
              <van-field v-model="people" class="row-content"  placeholder="请输入经办人" readonly/>
            </van-col>
          </van-row>
          <van-row type="flex" justify="center">
            <van-col span="22">
              <van-divider />
            </van-col>
          </van-row>
          <van-row>
            <van-col span="8" offset="1" class="typ row-label">联系电话</van-col>
          </van-row>
          <van-row>
            <van-col span="23" offset="1">
              <van-field v-model="phone" class="row-content"  placeholder="请输入联系电话" readonly/>
            </van-col>
          </van-row>
          <van-row type="flex" justify="center">
            <van-col span="22">
              <van-divider />
            </van-col>
          </van-row>
          <van-row style="margin-bottom: 10px">
            <van-col span="8" offset="1" class="typ row-label">处理反馈</van-col>
          </van-row>
          <van-row>
            <van-col span="23" offset="1">
              <van-field
                  v-model="tst"
                  rows="3"
                  autosize
                  type="textarea"
                  class="row-content"
                  placeholder="请输入处理反馈内容"
                  :readonly="!nextOn"
              />
            </van-col>
          </van-row>
          <van-row type="flex" justify="center">
            <van-col span="22">
              <van-divider />
            </van-col>
          </van-row>
          <van-row>
            <van-col span="8" offset="1" class="typ row-label">反馈时间</van-col>
          </van-row>
          <van-row>
            <van-col span="23" style="color: #969799" offset="1">
              <van-field v-model="oktime" @focus="timeHander()" class="row-content" placeholder="请输入反馈时间" :readonly="!nextOn"/>
              <van-dialog v-model="show" :show-confirm-button="false" v-if="nextOn">
                <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    title="选择完整时间"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="yes"
                    @cancel="no"
                />
              </van-dialog>
            </van-col>
          </van-row>
        </div>
      </div>

      <hr>

      <div>
        <div class="ass" v-for="(ite, index) in 1 || problems" :key="index">
          <van-row>
            <van-col span="22" style="text-align: left;margin-top: 10px;margin-bottom: 10px;color: #969799;" offset="1" class="typ">
              抄告问题{{ index + 1 }}
            </van-col>
          </van-row>
          <div class="as">
            <van-row>
              <van-col span="8" offset="1" class="typ row-label">问题具体地点</van-col>
            </van-row>
            <van-row>
              <van-col span="23">
                <van-field v-model="ite.address" class="row-content"  placeholder="请输入问题具体地点" readonly/>
              </van-col>
            </van-row>
            <van-row type="flex" justify="center">
              <van-col span="22">
                <van-divider />
              </van-col>
            </van-row>
            <van-row>
              <van-col span="8" offset="1" class="typ row-label">问题描述</van-col>
            </van-row>
            <van-row>
              <van-col span="23">
                <van-field v-model="ite.content" class="row-content"  placeholder="请输入问题描述" readonly/>
              </van-col>
            </van-row>
            <van-row type="flex" justify="center">
              <van-col span="22">
                <van-divider />
              </van-col>
            </van-row>
            <van-row style="margin-bottom: 10px">
              <van-col span="8" offset="1" class="row-label">问题图片</van-col>
            </van-row>
            <van-row gutter="10">
              <van-col v-for="(it, indexs) in ite.img" :key="indexs" offset="1">
                <van-image width="1.2rem" height="1.2rem" fit="cover" :src="it">
                  <template v-slot:error>暂无图片</template>
                </van-image>
              </van-col>
            </van-row>

            <van-row type="flex" justify="center">
              <van-col span="22">
                <van-divider />
              </van-col>
            </van-row>
            <van-row style="margin-bottom: 10px">
              <van-col span="8" offset="1" class="row-label">整改图片</van-col>
            </van-row>
            <van-row gutter="10">
              <van-col v-for="its in ite.pomg" :key="its" offset="1">
                <van-image width="1.2rem" height="1.2rem" fit="cover" :src="its">
                  <template v-slot:error>暂无图片</template>
                </van-image>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>

      <!-- 下一步 -->
      <div v-if="nextOn">
        <van-row type="flex" justify="center" class="btn">
          <van-col span="21">
            <van-button round type="info" style="width: 100%" @click="getHander" size="small">下一步</van-button>
          </van-col>
        </van-row>
      </div>

      <!-- 通过不通过 -->
      <div v-if="passOn">
        <van-row type="flex" class="btn" gutter="20">
          <van-col span="11" offset="1">
            <van-button round type="default" style="width: 100%" size="small" @click="noHander()">不通过</van-button>
          </van-col>
          <van-col span="11">
            <van-button round type="info" style="width: 100%" size="small" @click="psHander()">通过</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
//镇街未提交处理
import { Toast } from "vant";
export default {
  name: "Deal",
  data() {
    return {
      uiStyle: "", //normal:标准 elder:适老
      nextOn: true, //下一步
      passOn: true, //通过
      pass_id: "",
      headerTxt: {
        objects: "", //抄告对象
        time: "", //抄告时间
        times: "", //预警时间
        txt: "", //抄告内容
      },
      people: "", //经办人
      phone: "", //电话
      tst: "", //反馈内容
      oktime: "", //反馈时间
      D_id: "",
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2065, 10, 1),
      currentDate: new Date(),
      max: "", //下一步传的信息
      any: "", //下一步抄告问题集合
      readonly: false, //输入框只读
      problems: [], //抄告问题
      token: "",
      isKn: true,
    };
  },

  methods: {
    //下一步
    getHander() {
      this.isKn = false;
      console.log("下一步");
      this.max = {
        time: this.oktime, //反馈时间
        txts: this.tst, //反馈内容
        id: this.D_id, //id
        arr: this.any, //抄告问题
      };


      this.$router.push("./problem");
    },
    BackVal(data) {
      console.log(data);
      this.isKn = data;
    },
    //时间选择
    timeHander() {
      this.show = true;
    },
    //时间选择
    yes() {
      this.show = false;


    },
    //不选择时间
    no() {
      this.show = false;
    },
    //通过
    psHander() {
      //抄告单审核

    },
    //不通过
    noHander() {
      Toast.fail("审核不通过");
      let id = window.sessionStorage.getItem("MAPKEY");
      this.$router.push("./about" + id);
    },
  },
  created() {

  },
  mounted() {
    console.log("样式-------uiStyle", this.uiStyle);
    // console.log("num", this.$route.params.num);
    let Users = window.sessionStorage.getItem("User"); //用户权限
    let Types = window.sessionStorage.getItem("types"); //抄告单状态
    // console.log("用户:", Users, "抄告单状态:", Types);
    // console.log(this.Msg, this.Ttype); //id,和头部信息

  }
};
</script>

<style lang="scss" scoped>
::v-deep button,
input,
textarea {
  font: icon;
}
::v-deep .van-badge {
  display: inline-block;
  box-sizing: border-box;
  min-width: 0.426667rem;
  padding: 0.02rem 0.03rem;
  color: #fff;
  font-weight: 500;
  font-size: 0.3rem;
  font-family: -apple-system-font, Helvetica Neue, Arial, sans-serif;
  line-height: 1px;
  text-align: center;
  background-color: #ee0a24;
  border: 0.026667rem solid #fff;
  border-radius: 26.64rem;
}
.deal {
  width: 100%;
  background-color: #f6f7f8;
  padding-bottom: 50px;
  margin-top: 15px;

  .van-divider {
    margin: 0px 0px 10px 0px;
  }
  //修改原有样式
  ::v-deep .van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: #323233;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
    font-size: 14px;
  }
  .add {
    width: 100%;
    // height: 350px;
    background-color: white;
    box-sizing: border-box;
    text-align: left;
  }
  .adds {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    .anys {
      background-color: white;
      padding: 10px 0px;
    }
  }
  .ass {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    .as {
      background-color: white;
      padding: 10px 0px;
    }
  }

  .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.266667rem 0rem;
    overflow: hidden;
    color: #323233;
    font-size: 0.373333rem;
    line-height: 0.64rem;
    background-color: #fff;
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
.dealold {
  width: 100%;
  background-color: #f6f7f8;
  padding-bottom: 50px;
  margin-top: 15px;
  .typ {
    font-size: 18px;
  }
  .van-divider {
    margin: 0 0 10px 0;
  }
  //修改原有样式
  ::v-deep .van-field__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    margin: 0;
    padding: 0;
    color: #323233;
    line-height: inherit;
    text-align: left;
    background-color: transparent;
    border: 0;
    resize: none;
    font-size: 18px;
  }
  ::v-deep .van-field__body {
    margin-left: 15px;
    font-size: 22px;
  }
  .add {
    width: 100%;
    // height: 350px;
    background-color: white;
    box-sizing: border-box;
    text-align: left;
    .van-field__control {
      display: block;
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      margin: 0;
      padding: 0;
      color: #323233;
      line-height: inherit;
      text-align: left;
      background-color: transparent;
      border: 0;
      resize: none;
      font-size: 13px;
    }
  }
  .adds {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    .anys {
      background-color: white;
      padding: 10px 0px;
    }
  }
  .ass {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    .as {
      background-color: white;
      padding: 10px 0px;
    }
  }

  .van-cell {
    position: relative;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 0.266667rem 0;
    overflow: hidden;
    color: #323233;
    font-size: 18px;
    line-height: 18px;
    background-color: #fff;
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
    .van-button{
      font-size: 18px;
      height: 44px;
    }
  }
  .row-label{
    font-size: 18px;
  }
}
</style>