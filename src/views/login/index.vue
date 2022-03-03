<template>
  <div class="login">
    <div class="login_box">
      <div class="module">
        <div class="img" />
        <div class="form" v-loading="loading">
          <el-button @click="onLogin">onLogin</el-button>
          onLogin
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
      loading: false,
      api: process.env.VUE_APP_BASE_API
    }
  },
  methods: {
    onAddRouterOptions() {

    },
    onGetRoutes() {

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
        })
        this.loading = false
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
