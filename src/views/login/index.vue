<template>
  <div class="login">
    <el-button @click="onLogin">onLogin</el-button>
    {{ asyncRoutes }}
  </div>
</template>

<script>
import {asyncRoutes} from "@/router/routes";

export default {
  name: "index",
  data() {
    return {
      asyncRoutes: asyncRoutes
    }
  },
  methods: {
    onLogin() {
      console.log(asyncRoutes);
    }
  }
}
</script>

<style scoped>

</style>