<template>
  <div class="layout_header">
    <el-button @click="onLoginOut" v-loading="loading">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "LayoutHeader",
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onLoginOut() {
      this.loading = true
      this.$store.dispatch("LoginOut").then(() => {
        this.loading = false
        this.$message.success("LOGINOUT")
        this.$router.push("/login")
        // this.$router.push("/")
        // this.$router.replace("/")
      }).catch(() => this.loading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout_header{
  width: 100%;
  height: 100%;
}
</style>