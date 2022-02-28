<template>
  <div class="body_page about">
    <div class="body_box about_box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>About</span>
<!--          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
        </div>
        <div v-for="o in 1" :key="o" class="text item">
          {{ "VueAdmin Demo 项目" }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style lang="scss" scoped>
.about{
  .about_box{
    padding: 12px;
    box-sizing: border-box;
  }
  width: 100%;
  min-height: 100%;
  .box-card{
    width: 400px;
    margin: 200px auto;
  }
}
</style>