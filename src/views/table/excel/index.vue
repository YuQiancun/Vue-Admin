<template>
  <div class="excel">
    <div class="excel_box">
      <div class="excel_header">
        <div>
          <div v-for="(item, index) in tableList" :key="index">
            {{ item.name }}
            <button @click="onEdit(item)" v-show="item.state">编辑{{ item.state }}</button>
            <button @click="onEdit(item)" v-show="!item.state">提交{{ !item.state }}</button>
          </div>
        </div>
        <div>
          <el-upload
              action=""
              :on-change="onChange"
              accept=".xlsx,.xls"
              :auto-upload="false"
              :show-file-list="false"
              :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
<!--        <el-button @click="onExcel">onExcel</el-button>-->
        <div class="header_tabs">
          <el-tabs
              @tab-click="onTabClick"
              v-model="activeName"
          >
            <el-tab-pane
              v-for="(item, index) in workbook.SheetNames || ['']"
              :label="item"
              :name="item"
              :key="index"
            />
          </el-tabs>
        </div>
      </div>
      <div class="excel_content" v-loading="loading">
        <el-table
          :data="workBookSheetSlice"
          style="width: 100%"
          height="100%">
          <el-table-column type="index"/>
          <el-table-column
            v-for="(item, index) in ((workBookSheet[activeName] || {})['body'] || [])[0]"
            fixed
            :prop="index"
            :label="index"
            :key="index + item"
          />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
// 直接引入 XLSX 无法使用，可以按需引入
// import XLSX from 'xlsx'
import {read, utils} from 'xlsx'

export default {
  name: "Excel",
  data() {
    return {
      tableList: [
        { name: 'A'},
        { name: 'B'},
        { name: 'C'},
        { name: 'D'},
      ],
      loading: false,
      activeName: '',
      workbook: {},
      FileReader: null,
      fileData: null,
      fileList: [],
      outputs: [],
      query: [],
      workBookSheet: {},
      workBookSheetSlice: []
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    onEdit(item) {
      console.log(item.state)
      // item.state = !item.state
      this.$set(item, "state", !item.state)
    },
    onTabClick(e) {
      this.activeName = e.name
      this.workBookSheetSlice = this.workBookSheet[this.activeName].body.slice(0, 100)
    },
    onChange(file) {
      this.fileData = file
      this.readExcel(this.fileData)
      return false
    },
    sheet_to_json(sheet) {
      return utils.sheet_to_json(sheet);
    },
    readExcel(fileData) {
      this.loading = true
      if(fileData && /(xlsx)$/.test(fileData.name)) {
        if (fileData.raw) {
          this.FileReader = new FileReader()
          this.FileReader.onload = async ev => {
            try {
              this.workbook = read(ev.target.result, {
                type: 'binary'
              })
              this.activeName = this.workbook.SheetNames[0] || ''
              let workBookSheet = {}

              for (const item of this.workbook.SheetNames) {
                let body = this.sheet_to_json(this.workbook.Sheets[item])
                console.log(item, body)
                workBookSheet[item] = { body }
              }
              this.loading = false
              this.workBookSheet = workBookSheet
              this.workBookSheetSlice = workBookSheet[this.activeName].body.slice(0, 100)
            } catch (e) {
              console.error(e)
            }
          }
          this.FileReader.onerror = e => {
            this.loading = false
            console.error(e)
          }
          try {
            this.FileReader.readAsArrayBuffer(fileData.raw)
          }
          catch (e) {
            console.error("readAsArrayBuffer Error", e)
          }
        }
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
