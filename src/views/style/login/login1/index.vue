<template>
  <div class="sign">
    <div class="sign_box">
      <div class="module_box">
        <div class="module_center" :style="{ backgroundImage: `url(${require('./back.jpg')})` }">
          <div class="btn_float right" :class="{'left': float}">
            <transition name="right" mode="out-in">
              <div class="btn_sign_in" v-if="float">
                <h1>用户登陆</h1>
                <el-button size="mini" @click="onFloat">登陆</el-button>
              </div>
            </transition>
            <transition name="left" mode="out-in">
              <div class="btn_sign_up" v-if="!float">
                <h1>用户注册</h1>
                <el-button size="mini" @click="onFloat">注册</el-button>
              </div>
            </transition>
          </div>
        </div>
        <div class="module_float left" :class="{'right': float}">
          <transition name="left" mode="out-in">
            <SignIn v-if="!float"/>
          </transition>
          <transition name="right" mode="out-in">
            <SignUp v-if="float"/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackImg from "@/assets/img/back.jpg"
import SignIn from "./component/SignIn"
import SignUp from "./component/SignUp"
export default {
  name: "Login1",
  components: { SignIn, SignUp },
  data() {
    return {
      BackImg: BackImg,
      float: false
    }
  },
  methods: {
    onFloat() {
      this.float = !this.float
    }
  }
}
</script>

<style lang="scss" scoped>
.sign{
  height: calc(100vh - #{ $LayoutHeaderHeight });
  background-color: rgba(66, 185, 131, 0.15);
  .sign_box{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .module_box{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 600px;
      height: 400px;
      background-color: transparent;
      .module_center{
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 280px;
        overflow: hidden;
        background-size: 100% auto;
        background-position-y: center;
        transform: translateY(-50%);
        .btn_float{
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          overflow: hidden;
          transition: all .8s;
          &.right{
            left: 100%;
            transform: translateX(-100%);
            transition: all .8s;
          }
          &.left{
            left: 0;
            right: auto;
            transform: translateX(0);
            transition: all .8s;
          }

          .btn_sign_in, .btn_sign_up{
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            min-height: 100px;
            padding: 12px 20px;
            box-sizing: border-box;
            transform: translateX(-50%) translateY(-50%);
          }
          .btn_sign_in {
            padding: 12px 60px;
            text-align: left;
          }
          .btn_sign_up {
            padding: 12px 60px;
            text-align: right;
          }
        }
      }
      .module_float{
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
        background-color: white;
        overflow: hidden;
        transition: all 1s;
        &.left{
          left: 0;
          right: auto;
          transition: all .5s;
        }
        &.right{
          left: 100%;
          transform: translateX(-100%);
          transition: all .5s;
        }
      }
    }
  }
}


.left-enter-active, .left-leave-active {
  transition: all .8s;
}
.left-enter, .left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.right-enter-active, .right-leave-active {
  transition: all .8s;
}
.right-enter, .right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>