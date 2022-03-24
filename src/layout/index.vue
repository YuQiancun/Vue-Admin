<template>
  <el-container class="layout">
    <el-header class="layout_header">
      <LayoutHeader />
    </el-header>
    <el-container class="layout_container">

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
    background-color: #333;
  }
  .layout_container{
    width: 100%;
    max-width: 1920px;
    min-width: 325px;
    margin: 0 auto;
    height: calc(100vh - #{ $LayoutHeaderHeight });
    .layout_aside{
      background-color: $LayoutAsideBack;
      transition: all .3s;
    }
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
          height: 100%;
          //overflow: hidden;
          //min-height: 100%;
        }
      }
      .el-scrollbar__bar.is-horizontal{
        display: none
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all .25s;
}
.fade-enter, .fade-leave-to {
  transform: translateX(2%);
  opacity: 0;
}
</style>

<style lang="scss">
@import "../assets/style/body_page_style";
@import "../assets/style/global_media";
@import "../assets/style/global_NiTai_style";
</style>
