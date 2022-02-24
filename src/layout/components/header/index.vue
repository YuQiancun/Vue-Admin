<template>
  <div>
    <el-button @click="onLoginOut">退出</el-button>
  </div>
</template>

<script>
export default {
  name: "LayoutHeader",
  data() {
    return {

    }
  },
  methods: {
    onLoginOut() {
      this.$store.dispatch("LoginOut").then(() => {
        this.$message.success("LOGINOUT")
        this.$router.push("/login")
        // this.$router.replace("/")
      })
    }
  }
}
</script>

<style scoped>

</style>