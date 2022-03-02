<template>
  <div class="">
    Excel
    <div>
      <el-upload
          action=""
          :on-change="onChange"
          accept=".xlsx,.xls"
          :auto-upload="false"
          :show-file-list="false"
          :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
    <el-button @click="onExcel">onExcel</el-button>
  </div>
</template>

<script>
// import XLSX from 'xlsx'
export default {
  name: "index",
  data() {
    return {
      fileData: null,
      fileList: [],
      outputs: [],
      query: [],
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    onChange(file) {
      this.fileData = file
      this.readExcel(this.fileData)
      return false
    },
    readExcel(fileData) {
      if(fileData && /(xlsx)$/.test(fileData.name)) {
        if (fileData.raw) {
          const reader = new FileReader()
          console.log(reader)
          reader.onload = ev => {
            console.log("进入onload", ev)
            try {
              const data = ev.target.result
              console.log("data", data)
              // const workbook = XLSX.read(data, {
              //   type: 'binary'
              // });
              // console.log(workbook)
            }
            catch (e) {
              console.log(e)
            }
          }
          reader.onerror = err => {
            console.log(err)
          }
          try {
            reader.readAsArrayBuffer(fileData.raw)
          }
          catch (e) {
            console.log("readAsArrayBuffer", e)
          }
        }

        // console.log("XSLX文件")
        // const fileReader = new FileReader()
        // console.log("fileReader", fileReader)
        // fileReader.onload = (ev) => {
        //   try {
        //     const data = ev.target.result;
        //     const workbook = this.XLSX.read(data, {
        //       type: 'binary'
        //     });
        //     const wsname = workbook.SheetNames[0]; // 取第一张表
        //     const ws = this.XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 生成json表格内容
        //     this.outputs = []; // 清空接收数据
        //     for (let i = 0; i < ws.length; i++) {
        //       console.log(ws[i])
        //       // let sheetData = {
        //       //   // 键名为绑定 el 表格的关键字，值则是 ws[i][对应表头名]
        //       //   query的key值: ws[i]['表头名'],
        //       //   query的key值: ws[i]['表头名'],
        //       //   query的key值: ws[i]['表头名'],
        //       //   query的key值: ws[i]['表头名']
        //       // };
        //       //data里定义的query,用于给请求后台传入的参数
        //       // this.query.push(sheetData);
        //     }
        //     // //getList是请求后台的方法
        //     // this.getList();
        //     // this.$refs.upload.value = '';
        //   } catch (e) {
        //     console.log(e)
        //   }
        // }
      } else {
        this.$message.error("请上传 Excel")
      }
    },
    onExcel() {
      // console.log(XLSX)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
