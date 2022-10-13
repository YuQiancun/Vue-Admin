<template>
  <div :class="uiStyle=='normal'?'pin':'pinold'">
    <div class="pj">
      <van-row class="tt">
        <van-col span="8" offset="1" class="typ" >测评标准</van-col>
      </van-row>

      <van-row class="tt" style="margin-top: 10px" >
        <van-col span="22" offset="1" class="typ" style="font-weight: bolder" >{{ content }}</van-col>
      </van-row>

      <van-row type="flex" justify="center" >
        <van-col span="22">
          <van-divider />
        </van-col>
      </van-row>

      <van-row class="tt">
        <van-col span="8" offset="1" class="typ" >问题描述</van-col>
      </van-row>

      <van-row>
        <van-col span="24">
          <van-field v-model="messages" rows="1" autosize label="" type="textarea" placeholder="请输入整改问题描述" />
        </van-col>
      </van-row>

      <van-row type="flex" justify="center" >
        <van-col span="22">
          <van-divider />
        </van-col>
      </van-row>

      <van-row class="tt">
        <van-col span="18" offset="1" class="typ" >问题图片(至多上传五张)</van-col>
      </van-row>

      <van-row style="margin-top: 10px" gutter="0">
        <van-col offset="2" span="3" v-for="(ite, index) in fileList" :key="index">
          <van-badge>
            <van-image width="1.5rem" height="1.5rem" fit="cover" :src="ite"/>
            <template #content>
              <van-icon name="cross" class="badge-icon" @click="removeImg(index)"/>
            </template>
          </van-badge>
        </van-col>

        <van-col offset="1" span="3">
          <!-- <van-image
            width="1.5rem"
            height="1.5rem"
            fit="cover"
            src="@/assets/icons/cp_btn_tj.png"
            @click="imgChange"
          /> -->
          <van-icon name="plus" class="icons" style="background-color: #f5f1f3;" color="#ecdbdb"  @click="imgChange" />
        </van-col>
      </van-row>
    </div>
    <div class="foot">
      <van-row type="flex" justify="center" style="margin-top: 10px">
        <van-col span="22">
          <van-button round type="info" block size="small" @click="onSubmit()" class="typ">提交</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
//使用第三方库调用接口
import { Toast } from "vant";
export default {
  data() {
    return {
      uiStyle: "", //normal:标准 elder:适老
      fileList: [],
      access_token: "",
      content: "", //测评标准
      messages: "", //问题描述
      pj: {
        pointEvaluationId: "",
        pedId: "",
        ipId: "",
        iwId: "",
        state: "",
        content: "",
        img: [],
      },
    };
  },
  created() {


    //获取状态
    this.getState()
    //获取 access_token
    // this.getAccessToken()
    //获取存储的pj相关id信息
    // this.getPingJia()
  },
  mounted() {
  },
  methods: {
    //图片选择
    imgChange() {

    },
    //删除图片
    removeImg(index) {
      console.log(index);
      this.fileList.splice(index, 1);
    },
    //提交
    onSubmit() {
      let IMGs = this.fileList; //所有图片
      this.pj.content = this.messages; //问题描述
      this.pj.img = IMGs.join("^-^"); //提交图片
      const params = {
        api: "mgop.hkwl.xswmcsszxt.wmzspingjias",
        header: {
          "content-type": "application/json",
          Authorization: "Bearer " + this.access_token,
        },
        data:{
          pointEvaluationId: this.pj.pointEvaluationId, //pid
          pedId: "",
          ipId: this.pj.ipId,
          iwId: this.pj.iwId,
          state: this.pj.state, //好：1 一般：2 差：3
          content: this.pj.content,
          img: this.pj.img,
        },
      }
    },

    async getAccessToken() {
      //获取 access_token
      console.log("获取 access_token")

    },
    async getPingJia() {
      console.log("获取 getPingJia")
      //获取存储的pj相关id信息

    },
    async getState() {
      console.log("获取 getState")
      //获取状态

    }
  },

};
</script>

<style lang="scss" scoped>
::v-deep .van-uploader {
  position: relative;
  display: inline-block;
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
.pin {
  .pj {
    padding: 5px;
    background-color: white;
    box-sizing: border-box;
    .typ {
      font-size: 14px;
    }
    .tt {
      text-align: left;
    }
    .icons{
      font-size: 38px;
    }
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
  }
  .foot {
    width: 100%;
    height: 48px;
    background-color: white;
    position: absolute;
    bottom: 0;
  }
}
.pinold {
  .pj {
    padding: 5px;
    background-color: white;
    box-sizing: border-box;
    .typ {
      font-size: 18px;
    }
    .tt {
      text-align: left;
    }
    .icons{
      font-size: 48px;
    }

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
  }
  ::v-deep .van-button--small{
    font-size: 18px;
  }
  .foot {
    width: 100%;
    //height: 48px;
    background-color: white;
    position: absolute;
    bottom: 0;
    padding: 20px 0;
    .van-button{
      height: 44px;
    }
  }
}
</style>