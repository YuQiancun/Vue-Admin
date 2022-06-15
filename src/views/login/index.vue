<template>
  <div class="login">
    <div class="login_box">
      <div class="module">
        <div class="img" />
        <div class="form nt_container">
          <div class="language_select">
            <el-select ref="language" class="nt_input" size="mini" @change="onLanguage" v-model="language" placeholder="请选择">
              <el-option v-for="(item, index) in options.language" :key="index" :label="item" :value="index" />
            </el-select>
          </div>
          <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             autocomplete="on"
             label-position="left"
              :disabled="loading"
          >
            <div class="title-container">
              <h3 class="title">{{ $t('message.loginTitle') }}</h3>
            </div>

            <el-form-item prop="username">
              <el-input
                  class="nt_input"
                  ref="username"
                  v-model="loginForm.username"
                  :placeholder="$t('message.userName')"
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
                    class="nt_input"
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    :placeholder="$t('message.passWord')"
                    name="password"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.native="checkCapslock"
                    @blur="capsTooltip = false"
                    @keyup.enter.native="onLogin"
                    prefix-icon="el-icon-lock"
                />
                <span class="show-pwd" @click="onShowPwd">
            <i :class="passwordType === 'password' ? 'el-icon-view' : 'el-icon-view'" />
          </span>
              </el-form-item>
            </el-tooltip>

            <el-button class="nt_button" :loading="loading" type="primary" style="width:100%;" @click.native.prevent="onLogin">
              {{ $t("message.signUp") }}</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { resetRouter } from "@/router";

export default {
  name: "index",
  data() {
    return {
      language: this.$store.getters.language,
      options: {
        language: {
          'zh-CN': '中文',
          'zh-EN': 'English',
        }
      },
      loginRules: {

      },
      loginForm: {
        userName: '',
        passWord: ''
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      api: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    onLanguage(e) {
      this.$i18n.locale = e
      this.$store.commit("SET_LANGUAGE", e)
      this.$nextTick(() => {
        this.$refs.language.blur()
      })
    },
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    onAddRouterOptions() {

    },
    onGetRoutes() {

    },
    onShowPwd() {
      this.passwordType = this.passwordType ? '' : "password"
    },
    onLogin() {
      this.loading = true
      const params = {
        url: '/api/login'
      }
      this.$api.post(params).then(res => {
        resetRouter()
        this.$store.dispatch("LoginByUsername", res).then(() => {
          this.$message.success(this.$store.getters.token)
          this.$router.push({ path: '/' }); //登录成功之后重定向到首页
        }).catch(err => {
          this.$message.error(err); //登录失败提示错误
          this.loading = false
        })
      }).catch(e => {
        console.log(e)
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
