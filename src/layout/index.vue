<template>
  <el-container class="layout">
    <el-header class="layout_header">
      <LayoutHeader />
    </el-header>
    <el-container class="layout_container">
      <el-aside class="layout_aside" width="200px">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <LayoutMenu />
        </el-scrollbar>
      </el-aside>
      <el-main class="layout_main">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutHeader from "./components/Header"
import LayoutMenu from "./components/Menu"
export default {
  name: "Layout",
  components: { LayoutHeader, LayoutMenu },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.layout{
  height: 100%;
  .el-header{
    z-index: 1;
    box-shadow: 0 0 10px #e2e2e2;
  }
  .layout_header{
  }
  .layout_container{
    height: calc(100vh - 60px);
    .layout_main{
      padding: 0;
      margin: 0;
      height: 100%;
      background: #F9FAFD;
      overflow-x: hidden;
    }
    /deep/ .el-scrollbar{
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      .el-scrollbar__wrap{
        overflow-x: hidden;
        .el-scrollbar__view{
          //height: 100%;
          //min-height: 100%;
        }
      }
      .el-scrollbar__bar.is-horizontal{
        //display: none
      }
    }
  }
}
</style>