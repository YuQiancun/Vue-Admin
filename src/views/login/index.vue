<template>
  <div class="login">
    <div>{{ $store.getters.token }}</div>
    <pre>
      {{ $store.getters.routers }}
    </pre>
    <el-button @click="onLogin">onLogin</el-button>
    <el-button @click="onGetRoutes">onGetRoutes</el-button>
    <el-button @click="onAddRouterOptions">onAddRouterOptions</el-button>
  </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
    }
  },
  methods: {
    onAddRouterOptions() {
    },
    onGetRoutes() {

    },
    onLogin() {
      const res = {
        token: "token-test",
        user: {
          name: "Admin"
        }
      }
      this.$store.dispatch("LoginByUsername", res).then(() => {
        this.$message.success(this.$store.getters.token)
        this.$router.push({ path: '/' }); //登录成功之后重定向到首页
      }).catch(err => {
        this.$message.error(err); //登录失败提示错误
      })
    }
  }
}
</script>

<style scoped>

</style>