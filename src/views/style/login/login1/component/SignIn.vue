<template>
  <div class="sign_up">
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             autocomplete="on"
             label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
            prefix-icon="el-icon-user"
        />
      </el-form-item>
      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="onSignIn"
              prefix-icon="el-icon-lock"
          />
          <span class="show-pwd" @click="onShowPwd">
            <i :class="passwordType === 'password' ? 'el-icon-view' : 'el-icon-view'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="onSignIn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {
      loginRules: {

      },
      loginForm: {
        userName: '',
        passWord: '',
        rePassword: '',
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
    }
  },
  methods: {
    checkCapslock(e) {
      console.log(e)
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    onShowPwd() {

    },
    onSignIn() {

    }
  }
}
</script>

<style lang="scss" scoped>
.sign_up{
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;

  .show-pwd {
    position: absolute;
    right: 10px;
    bottom: 0;
    font-size: 16px;
    color: #333333;
    cursor: pointer;
    user-select: none;
    z-index: 1;
  }
}
</style>
