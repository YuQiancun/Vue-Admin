<template>
  <div class="login">
    {{ api }}
    <br>
    {{   $store.getters.isRoles }}
    <div>{{ $store.getters.token }}</div>
    <pre>
      {{ $store.getters.routers }}
    </pre>
    <el-button @click="onLogin" v-loading="loading">onLogin</el-button>
    <el-button @click="onGetRoutes">onGetRoutes</el-button>
    <el-button @click="onAddRouterOptions">onAddRouterOptions</el-button>
  </div>
</template>

<script>

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
        console.log(res)
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

<style scoped>

</style>