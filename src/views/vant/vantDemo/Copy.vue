<template>
  <!-- 下发抄告单 -->
  <div :class="uiStyle=='normal'?'copy':'copyold'">
    <div class="add">
      <van-row>
        <van-col span="8" offset="1" class="typ">抄告对象</van-col>
      </van-row>
      <van-row>
        <van-col span="23">
          <van-field v-model="objects" placeholder="请输入抄告对象"/>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="22">
          <van-divider />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8" offset="1" class="typ">预警时间</van-col>
      </van-row>
      <van-row>
        <van-col span="23">
          <van-field v-model="time" placeholder="请输入预警时间" @focus="timeHander()"/>
        </van-col>
        <van-dialog v-model="show" :show-confirm-button="false">
          <van-datetime-picker v-model="currentDate" type="datetime" title="选择完整时间" :min-date="minDate" :max-date="maxDate" @confirm="yes" @cancel="no"/>
        </van-dialog>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="22">
          <van-divider />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="8" offset="1" class="typ">抄告内容</van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <van-field v-model="txt" rows="3" autosize type="textarea" placeholder="请输入抄告内容"/>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="22">
          <van-divider />
        </van-col>
      </van-row>
    </div>
    <!-- 抄告问题 -->
    <div class="adds" v-for="(item, index) in newArr" :key="index">
      <van-row>
        <van-col span="22" style="text-align: left; margin-top: 10px; margin-bottom: 10px" offset="1" class="typ">
          抄告问题{{ index + 1 }}
        </van-col>
      </van-row>
      <div class="anys">
        <van-row>
          <van-col span="8" offset="1" class="typ">问题具体地点</van-col>
        </van-row>
        <van-row>
          <van-col span="23">
            <van-field v-model="item.address" placeholder="请输入问题具体地点"/>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8" offset="1" class="typ">问题描述</van-col>
        </van-row>
        <van-row>
          <van-col span="23">
            <van-field v-model="item.content" placeholder="请输入问题描述"/>
          </van-col>
        </van-row>
        <van-row style="margin-bottom: 10px">
          <van-col span="8" offset="1" class="typ">问题图片</van-col>
        </van-row>
        <van-row style="margin-top: 10px" gutter="0">
          <van-col offset="2" span="3" v-for="(ite, indexs) in item.fileList" :key="indexs">
            <van-badge>
              <van-image width="1.3rem" height="1.3rem" fit="cover" :src="ite"/>
              <template #content>
                <van-icon name="cross" class="badge-icon" @click="removeImg(index, indexs)"/>
              </template>
            </van-badge>
          </van-col>
          <van-col offset="1" span="3">
            <!-- <van-image
              width="1.5rem"
              height="1.5rem"
              fit="cover"
              src="/public/img/cp_btn_tj.png"
              @click="imgChange(index)"
            /> -->
            <van-icon name="plus" class="icons" style="background-color: #f5f1f3;" color="#ecdbdb" @click="imgChange(index)"/>
          </van-col>
        </van-row>

        <van-row type="flex" justify="center">
          <van-col span="22">
            <van-divider />
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" v-if="arr_indexs == index">
          <van-col span="22" style="text-align: center; color: #3296fa" @click="adds" class="typ">
            <van-icon name="plus" /> 新增抄告问题
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 下发按钮 -->
    <van-row type="flex" justify="center" class="btn">
      <van-col span="21">
        <van-button round type="info" style="width: 100%;color:white" size="small" @click="addHander" class="typ">下发抄告单</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { Toast } from "vant";
export default {
  name: "Copy",
  data() {
    return {
      uiStyle: "", //normal:标准 elder:适老
      value: "",
      text: "",
      source: "", //抄告来源
      objects: "", //抄告对象
      time: "", //预警时间
      txt: "", //抄告内容
      townId: "",
      newArr: [
        {
          address: "", //具体地点
          content: "", //问题描述
          fileList: [],
          img: "",
        },
      ], //
      arr_indexs: "",
      token: "",
      show: false,
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2065, 10, 1),
      currentDate: new Date(),
    };
  },
  methods: {
    //选择图片
    imgChange(i) {
    },
    //删除图片
    removeImg(i, index) {
      console.log(index);
      this.newArr[i].fileList.splice(index, 1);
    },
    //新增抄告问题
    adds() {
      this.newArr.push({
        address: "",
        content: "",
        fileList: [],
        img: "",
      });
      this.arr_indexs = this.newArr.length - 1;
      console.log(this.newArr);
    },
    //下发抄告单
    addHander() {
      let ALL = this.newArr;
      let Man = "";
      let IMG = [];
      for (let i = 0; i < ALL.length; i++) {
        let Max = [];
        IMG.push({
          address: "",
          content: "",
          img: "",
        });
        for (let j = 0; j < ALL[i].fileList.length; j++) {
          Max.push(ALL[i].fileList[j]);
          IMG[i].address = ALL[i].address;
          IMG[i].content = ALL[i].content;
        }
        Man = Max.join("^-^");
        IMG[i].img = Man;
      }
      console.log(IMG);

    },
    //时间选择
    timeHander() {
      this.show = true;
    },
    yes() {
      this.show = false;
    },
    no() {
      this.show = false;
    },
  },
  mounted() {
    console.log("样式-------uiStyle", this.uiStyle);
    console.log(this.$route.params.key); //点位id
    this.arr_indexs = this.newArr.length - 1;

  },
  created() {
  },

};
</script>

<style scoped lang="scss">
::v-deep button,
input,
textarea {
  color: inherit;
  font: initial;
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
.copy {
  width: 100%;
  background-color: #f6f7f8;
  padding-bottom: 120px;
  .add {
    width: 100%;
    // height: 280px;
    background-color: white;
    box-sizing: border-box;
    text-align: left;
    margin-top: 15px;
    .van-divider {
      margin: 0px 0px 10px 0px;
    }
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
  .icons {
    font-size: 38px;
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
.copyold {
  width: 100%;
  background-color: #f6f7f8;
  padding-bottom: 120px;
  ::v-deep .van-field__control {
    font-size: 17px;
  }
  .icons {
    font-size: 48px;
  }
  .typ {
    font-size: 18px;
  }
  .add {
    width: 100%;
    // height: 280px;
    background-color: white;
    box-sizing: border-box;
    text-align: left;
    margin-top: 15px;
    .van-divider {
      margin: 0px 0px 10px 0px;
    }
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
</style>
