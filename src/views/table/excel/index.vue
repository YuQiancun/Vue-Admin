<template>
  <div class="excel">
    <div class="excel_box">
      <div class="excel_header">

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
        <div class="header_tabs">
          <el-tabs v-model="activeName">
            <el-tab-pane
              v-for="(item, index) in workbook.SheetNames || []"
              :label="item"
              :name="item"
              :key="index"
            />
          </el-tabs>
        </div>
      </div>
      <div class="excel_content">
        <el-table
          :data="(workBookSheet[activeName] || {})['body'] || []"
          style="width: 100%"
          height="100%">
          <el-table-column
            v-for="(item, index) in ((workBookSheet[activeName] || {})['body'] || [])[0]"
            fixed
            :prop="index"
            :label="index"
            :key="item"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
// 直接引入 XLSX 无法使用，可以按需引入
// import XLSX from 'xlsx'
import { read, utils } from 'xlsx'
export default {
  name: "Excel",
  data() {
    return {
      activeName: '',
      workbook: {},
      FileReader: null,
      fileData: null,
      fileList: [],
      outputs: [],
      query: [],
      workBookSheet: {}
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
          this.FileReader = new FileReader()
          this.FileReader.onload = ev => {
            try {
              this.workbook = read(ev.target.result, {
                type: 'binary'
              })

              console.log(this.workbook)
              this.activeName = this.workbook.SheetNames[0] || ''
              let workBookSheet = {}
              this.workbook.SheetNames.forEach(item => {
                workBookSheet[item] = { body: utils.sheet_to_json(this.workbook.Sheets[item])}
              })
              this.workBookSheet = workBookSheet

              // let arr = (this.workbook.Sheets || {})[this.activeName]
              // let Sheet = {}
              // for (const arrKey in arr) {
              //   let match = arrKey.match(/^[A-Za-z]+/)
              //   let key = match ? match[0] : null
              //   if(key){

                //   if(Sheet[key]){
                //     Sheet[key].push(arr[arrKey])
                //   } else {
                //     Sheet[key] = [arr[arrKey]]
                //   }
              //   }
              // }

            }
            catch (e) {
              console.log(e)
            }
          }
          try {
            this.FileReader.readAsArrayBuffer(fileData.raw)
          }
          catch (e) {
            console.log("readAsArrayBuffer Error", e)
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
.excel{
  position: relative;
  height: calc(100vh - #{ $LayoutHeaderHeight });
  padding: 12px;
  box-sizing: border-box;
  .excel_box{
    height: 0;
    min-height: 100%;
    padding: 12px;
    box-sizing: border-box;
    background-color: white;
    .excel_header{
      height: 160px;
      padding: 12px;
      box-sizing: border-box;
    }
    .excel_content{
      height: 100%;
      min-height: 100%;
      background-color: #2d2f33;
    }
  }
}
</style>
