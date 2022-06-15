<template>
  <div class="to_base64">
    <div class="to_base64_box">
      <div class="upload el-button el-button--small">
        <el-upload
            class="upload-demo"
            ref="my-upload"
            action="/"
            :on-change="onChange"
            multiple
            :auto-upload="false"
            :show-file-list="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div class="upload_result">
        <div class="result_content" v-for="item in activities" :key="item.uid">
          <div class="name">{{ item.name }}</div>
          <div class="base64">{{ item.content.slice(0, 50) }}</div>
          <div class="bopy">
            <!-- Trigger -->
            <el-button size="mini" @click="onCopy(item)" :loading="options.copyLoad">复制</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog_box">
      <!-- Target -->
      <textarea ref="copyValue" id="copyValue" readonly="readonly" :value="copyValue" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ToBase64",
  data() {
    return {
      options: {
        copyLoad: false,
      },
      copyValue: '',
      activities: []
    }
  },
  methods: {
    onCopy(item) {
      this.options.copyLoad = true
      setTimeout(async () => {
        this.copyValue = await item.content
        let elm = this.$refs.copyValue
        this.$nextTick(() => {
          elm.select()
          if(document.execCommand('Copy')) {
            this.$message.success(`${item.name} 复制成功`)
          } else {
            this.$message.success('不支持一键复制')
          }
          this.options.copyLoad = false
          this.copyValue = ''
        })
      }, 100)
    },
    onChange(file) {
      let reader = new FileReader()
      reader.onload = e => {
        let obj = {
          timestamp: file.raw.uid,
          lastModified: file.raw.lastModified,
          name: file.raw.name,
          size: file.raw.size,
          type: file.raw.type,
          content: e.target.result
        }
        this.activities.push(obj)
        this.$refs["my-upload"].clearFiles()
      }
      reader.readAsDataURL(file.raw)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>