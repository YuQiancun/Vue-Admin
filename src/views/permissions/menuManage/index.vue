<template>
  <div class="body_page menu_manage">
    <div>
      <el-button @click="onFromDate">FromDate</el-button>

      <hr>
      <el-upload
          class="upload-demo"
          :before-upload="beforeUpload"
          action="https://jsonplaceholder.typicode.com/posts/">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuManage",
  data() {
    return {}
  },
  methods: {
    onFromDate() {
      let FD = new FormData();
      FD.append("file", "asd")
      console.log(FD.get("file"))
    },
    beforeUpload(file) {
      console.log("beforeUpload", file)
      let FD = new FormData();
      FD.append("file", file)
      FD.append("testData", "testData")
      this.$api.uploadFile({url: "/fromData", data: FD})
      return false
    }
  }
}
</script>

<style scoped>

</style>
