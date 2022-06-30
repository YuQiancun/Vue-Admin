<template>
  <div class="graphicsLoad">
    graphicsLoad
    <div>
      <el-radio v-for="(item, index) in responseType" :key="index" v-model="responseTypeKey" :label="item.value">{{ item.label }}</el-radio>
    </div>
    <el-button @click="onGetImg">onGetImg</el-button>
    <div v-show="UrlBlob">
      <el-image :src="UrlBlob"></el-image>
    </div>
  </div>
</template>

<script>
import Axios from "axios"
import fileDownload from 'js-file-download'

export default {
  name: "GraphicsLoad",
  data() {
    return {
      UrlBlob: null,
      responseTypeKey: 'blob',
      fileType: {
        "image/jpeg": "jpg"
      },
      responseType: [
        { label: "Blob", value: 'blob'},
        { label: "ArrayBuffer", value: 'arraybuffer'},
      ]
    }
  },
  methods: {
    onGetImg() {
      let params = {
        url: "/aliOss/recognition2022/06/1656251182756.png",
        method: "GET",
        responseType: this.responseTypeKey
      }
      Axios(params).then(res => {
        console.log(res.data.type)
        this.UrlBlob = URL.createObjectURL(res.data)
        fileDownload(res.data, `file${new Date().getTime()}.${this.fileType[res.data.type||'jpeg']}`)
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
