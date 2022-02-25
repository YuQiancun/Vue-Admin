<template>
  <div class="login">
    <div class="login_box">
      <div class="module">
        <div class="img" />
        <div class="form" v-loading="loading">
          <el-button @click="onLogin">onLogin</el-button>
        </div>
      </div>
    </div>
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

<style lang="scss" scoped>
.login{
  .login_box{
    padding: 0;
    overflow: hidden;
    .module{
      margin: 200px auto 0;
      width: 700px;
      height: 400px;
      box-shadow: 0 0 10px #c1c1c1;
      box-sizing: border-box;

      display: flex;
      flex-wrap: nowrap;

      .img{
        position: relative;
        flex: 1;
        overflow: hidden;
        &:after{
          background: url("back.jpg") 100% 100%/ 100% 100% no-repeat;
          position: absolute;
          content: "";
          width: 100%;
          height: 100%;
          //background-color: rgba(0,0, 0, .1);
          //-webkit-filter: blur(1px);
          //-moz-filter: blur(1px);
          //-ms-filter: blur(1px);
          //-o-filter: blur(1px);
          //filter: blur(1px);
        }
      }
      .form{
        width: 240px;
        background-color: #E2E2E2;
        transition: all .3s;
      }
    }
  }
}
</style>
