<template>
  <div class="body_page user_info">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <div class="body_box user_info_box">
      <!--DOM模块-->
      <!--
          将auto-upload设置为false是为了关闭默认上传，
          过后将会使用单独的上传进行上传
          on-change事件获取当前upload组件的文件缓存
      -->
      <div v-for="i in 4" :key="i">
        <el-upload
            action=''
            class="avatar-uploader"
            :auto-upload='false'
            :on-change='getUploadFile'
        >
          <el-image style="width: 200px;height: 100px;" ></el-image>
        </el-upload>
      </div>
    </div>
    </el-scrollbar>
    <div class="dialog_box">

      <!--我将裁剪的Dom放在了一个dialog弹框中-->
      <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
        <div class="cropper-content">
          <div class="cropper" style="text-align:center">
            <vueCropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :autoCrop="option.autoCrop"
                :fixed="option.fixed"
                :fixedNumber="option.fixedNumber"
                :centerBox="option.centerBox"
                :infoTrue="option.infoTrue"
                :fixedBox="option.fixedBox"
                :autoCropWidth="option.autoCropWidth"
                :autoCropHeight="option.autoCropHeight"
            ></vueCropper>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onFinish">确认</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      dialogVisible: false,
      fileInfo: null,
      params: {
        video_cover: "uploadFiles"
      },
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        autoCropWidth: 100, // 默认生成截图框宽度
        autoCropHeight: 100, // 默认生成截图框高度
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
    }
  },
  methods: {
    getUploadFile(file){
      let files = file.raw;
      this.fileInfo = file; // 保存下当前文件的一些基本信息
      let reader = new FileReader(); // 创建文件读取对象
      reader.onload = async e => {
        let data;
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          data = window.URL.createObjectURL(new Blob([e.target.result]));
        } else {
          data = e.target.result;
        }
        this.option.img = data; // 设置option的初始image
        this.dialogVisible = true;
      };
      reader.readAsArrayBuffer(files);
      this.option.fixedNumber = [1, 1]; // 图片的裁剪宽高比在这里也可以进行设置
    },
    onFinish() {
      this.$refs.cropper.getCropBlob((data) => { // 获取当前裁剪好的数据
        // 注此时的data是一个Blob数据，部分接口接收的是File转化的FormData数据
        let formData = new FormData();
        formData.append(
            "file",
            new File(
                [data], // 将Blob类型转化成File类型
                this.fileInfo.name, // 设置File类型的文件名称
                {type: this.fileInfo.type} // 设置File类型的文件类型
            )
        );
        formData.append("testData", "testData")
        // 调用接口上传
        this.$message.success("调用")
        this.$api.uploadFile({url: '/uploadFiles', data: formData})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.user_info{
  height: calc(100vh - #{ $LayoutHeaderHeight });
  background-color: rgba(66, 185, 131, 0.15);
  overflow-y: hidden;
  padding: 12px;
  box-sizing: border-box;
  /deep/ .el-scrollbar__view{
    min-height: 100%;
    height: 100%;
  }
  .user_info_box{
    background-color: rgba(66, 185, 131, 0.15);
    min-height: 100%;
  }
}
.cropper-content {
  .cropper {
    width: auto;
    height: 400px;
  }
}
</style>