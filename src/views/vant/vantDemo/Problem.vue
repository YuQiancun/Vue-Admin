<template>
  <div :class="uiStyle=='normal'?'problem':'problemold'">
    <div class="adds" v-for="(item, index) in [{}, {}, {}] || all" :key="index">
      <van-row>
        <van-col span="22" style="text-align: left; margin-top: 5px; margin-bottom: 10px" offset="1" class="typ">
          抄告问题{{ index + 1 }}
        </van-col>
      </van-row>
      <div class="anys">
        <van-row>
          <van-col span="8" offset="1" class="typ">问题具体地点</van-col>
        </van-row>
        <van-row>
          <van-col span="23">
            <van-field v-model="item.address" placeholder="请输入问题具体地点" readonly/>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="22">
            <van-divider />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="8" offset="1" class="typ">问题描述</van-col>
        </van-row>
        <van-row>
          <van-col span="23">
            <van-field v-model="item.content" placeholder="请输入问题描述" readonly/>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center">
          <van-col span="22">
            <van-divider />
          </van-col>
        </van-row>
        <van-row style="margin-bottom: 10px">
          <van-col span="8" offset="1" class="typ">问题图片</van-col>
        </van-row>
        <van-row gutter="10">
          <van-col v-for="(ite, indexs) in item.img" :key="indexs" offset="1">
            <van-image width="1.3rem" height="1.3rem" fit="cover" :src="ite">
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
          <van-col span="8" offset="1" class="typ">整改图片</van-col>
        </van-row>

        <van-row style="margin-top: 10px" gutter="0">
          <van-col offset="1" span="3" v-for="(its, indexss) in item.newImg" :key="indexss">
            <van-badge>
              <van-image width="1.3rem" height="1.3rem" fit="cover" :src="its"/>
              <template #content>
                <van-icon name="cross" class="badge-icon" @click="removeImgs(index, indexss)"/>
              </template>
            </van-badge>
          </van-col>

          <van-col offset="1" span="3">
            <!-- <van-image
              width="1.5rem"
              height="1.5rem"
              fit="cover"
              src="/public/img/cp_btn_tj.png"
              @click="imgChanges(index)"
            /> -->
            <van-icon name="plus" class="icons" style="background-color: #f5f1f3;" color="#ecdbdb" @click="imgChanges(index)"/>
          </van-col>
        </van-row>
      </div>
    </div>
    <!-- 提交按钮 -->
    <van-row type="flex" justify="center" class="btn">
      <van-col span="21">
        <van-button round type="info" style="width: 100%" size="small" @click="submit()" class="typ">提交</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
// 提交
export default {
  name: "Problem",
  data() {
    return {
      uiStyle: "", //normal:标准 elder:适老
      all: [], //所有抄告问题
      axs: [],
    };
  },

  methods: {
    //图片选择
    imgChanges(i) {
    },
    //删除图片
    removeImgs(i, index) {
      console.log(i, index);
      this.all[i].newImg.splice(index, 1);
    },
    //提交
    submit() {
      console.log(this.axs);
      let newArr = [];
      for (let i = 0; i < this.axs.arr.length; i++) {
        newArr.push({
          id: String(this.axs.arr[i].id),
          pomg: this.all[i].newImg.join("^-^"),
        });
      }
      console.log(newArr);
    },
  },
  mounted() {
    // console.log(this.Max);
  },
  created() {

  },

};
</script>

<style lang="scss" scoped>
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
.problem {
  width: 100%;
  background-color: #f6f7f8;
  padding-bottom: 80px;
  .van-cell {
    padding: 5px 0px 0px 0px;
  }
  .icons {
    font-size: 38px;
  }
  .van-divider {
    margin: 10px 0px;
  }
  .adds {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    .anys {
      background-color: white;
      padding: 10px 0px;
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
  }
  .btn {
    width: 100%;
    background-color: white;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    padding: 10px 0px;
    border-top: 1px solid rgb(228, 227, 227);
  }
}
.problemold {
  width: 100%;
  background-color: #f6f7f8;
  padding-bottom: 80px;
  .van-cell {
    padding: 5px 0px 0px 0px;
  }
  .icons {
    font-size: 48px;
  }
  .typ{
    font-size: 18px;
    line-height: 28px;
  }
  .van-divider {
    margin: 10px 0px;
  }
  .adds {
    width: 100%;
    box-sizing: border-box;
    text-align: left;
    .anys {
      background-color: white;
      padding: 10px 0px;
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
        margin-left: 15px;
      }
    }
  }
  .btn {
    width: 100%;
    background-color: white;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    padding: 20px 0px;
    border-top: 1px solid rgb(228, 227, 227);
    .van-button{
      height: 44px;
    }
  }
}
</style>