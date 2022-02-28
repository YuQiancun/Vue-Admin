<template>
  <div class="menu">
    <div class="menu_box">
      <el-menu
          :default-active="defaultActive"
          router
      >
        <div v-for="(item, index) in $store.getters.routers" :key="index">
          <LayoutMenuItem :MenuItem="item" />
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
import LayoutMenuItem from "./MenuItem.vue"

export default {
  name: "LayoutMenu",
  components: { LayoutMenuItem },
  data() {
    return {
      defaultActive: ""
    }
  },
  mounted() {
    this.routeActive()
  },
  watch: {
    $route: {
      handler() {
        this.routeActive()
      }
    }
  },
  methods: {
    routeActive() {
      const route = this.$route
      this.defaultActive = route.path
    }
  }
}

</script>

<style lang="scss" scoped>
/deep/ .el-menu-item{
  color: $LayoutMenuItemColorDefault;
  background-color: $LayoutMenuItemBackDefault;

  height: 42px;
  line-height: 42px;
  margin: 4px 0;
  box-sizing: border-box;
  // 放弃渐变方案，渐变无法使用 transition 过度
  //background:linear-gradient(to left,$LayoutMenuItemBackDefault 0%,$LayoutMenuItemBackDefault 0,$LayoutMenuItemBackDefault 0,$LayoutMenuItemBackDefault 100%);
  transition: all .2s;
  //&:hover{
  //  background:linear-gradient(to left,$LayoutMenuItemBackActive 0%,$LayoutMenuItemBackActive 50%,$LayoutMenuItemBackActive 51%,$LayoutMenuItemBackActive 100%);
  //  transition: all .2s;
  //}
  &:after{
    position: absolute;
    top: 50%;
    right: 0;
    content: "";
    width: 4px;
    height: 0;
    background-color: $LayoutMenuItemActiveAfter;
    transition: all .2s;
  }
  &.is-active{
    color: $LayoutMenuItemColorActive;
    background-color: $LayoutMenuItemBackActive;
    transition: all .2s;
    &:after{
      top: 0;
      width: 4px;
      height: 100%;
      transition: all .2s;
    }
  }
}

/deep/ .el-submenu{
  & > .el-submenu__title{
    color: $LayoutMenuSubMenuColorDefault;
    background-color: $LayoutMenuSubMenuBackDefault;
    position: relative;

    height: 42px;
    line-height: 42px;
    margin: 4px 0 0 0;
    box-sizing: border-box;

    &:after{
      position: absolute;
      top: 50%;
      right: 0;
      content: "";
      width: 4px;
      height: 0;
      background-color: $LayoutMenuSubMenuActiveAfter;
      transition: all .8s;
    }
  }

  & .el-menu-item{
    height: 42px;
    line-height: 42px;
    margin: 4px 0;
    //margin: 0 0 4px 0;
    box-sizing: border-box;
  }

  &.is-active{
    & > .el-submenu__title{
      color: $LayoutMenuSubMenuColorActive;
      background-color: $LayoutMenuSubMenuBackActive;
      transition: all .8s;
      &:after{
        top: 0;
        height: 100%;
        transition: all .8s;
      }
    }
  }
}
</style>
