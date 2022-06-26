<template>
  <div class="graphicsLoad">
    graphicsLoad
    <el-button @click="onGetImg">onGetImg</el-button>
  </div>
</template>

<script>
import Axios from "axios"

export default {
  name: "GraphicsLoad",
  data() {
    return {

    }
  },
  methods: {
    onGetImg() {
      let params = {
        url: "/aliOss/recognition2022/06/1656251182756.png",
        method: "GET",
        responseType: "blob" || "arraybuffer"
      }
      Axios(params).then(res => {
        console.log(res)
      })
      // let params = {
      //   url: "/aliOss/recognition2022/06/1656251182756.png",
      //   method: "GET",
      //   headers: {
      //     responseType: "ArrayBuffer"
      //   }
      // }
      // this.$api.post(params).then(res => {
      //   console.log(res)
      // })
    }
  }
}
</script>
