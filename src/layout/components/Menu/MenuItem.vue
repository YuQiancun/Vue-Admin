<template>
  <div class="layout_menu_item">
    <template v-if="MenuItem.meta && !MenuItem.meta.hidden">
      <template v-if="MenuItem.children && !MenuItem.meta.showSub">
        <el-submenu :index="resolvePath(MenuItem)">
          <template slot="title">
            <i class="el-icon-" :class="MenuItem.meta.icon || ''"/>
            <span>{{ MenuItem.meta ? (MenuItem.meta.reTitle || MenuItem.meta.title) : (MenuItem.path || MenuItem.path) }}</span>
          </template>
          <LayoutMenuItem v-for="(item, index) in MenuItem.children" :key="index" :MenuItem="item" :base-path="resolvePath(MenuItem)"/>
        </el-submenu>
      </template>
      <template v-else-if="MenuItem.meta.showSub">
        <LayoutMenuItem v-for="(item, index) in resolveSubMenu(MenuItem.children, MenuItem.meta.showSubName)" :key="index" :MenuItem="item" :base-path="resolvePath(MenuItem)"/>
      </template>
      <template v-else>
        <el-menu-item :index="resolvePath(MenuItem)">
          <i class="el-icon-" :class="MenuItem.meta.icon || ''" />
          <span slot="title">{{ MenuItem.meta ? (MenuItem.meta.reTitle || MenuItem.meta.title) : MenuItem.path }}</span>
        </el-menu-item>
      </template>
    </template>
  </div>
</template>

<script>
import { isExternal } from "@/libs/utils";

export default {
  name: "LayoutMenuItem",
  props: {
    BasePath: {
      type: String,
      default: () => {
        return ""
      }
    },
    MenuItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    resolveSubMenu(item, subName = null) {
      let SubMenu = item.filter(sub => !sub.meta.hidden)
      return SubMenu.filter((sub, index) => {
        return subName ? (sub.name === subName) : (index === 0)
      })
    },
    resolvePath(item) {
      if(isExternal(item.path)){
        return item.path
      }
      if (isExternal(this.BasePath)) {
        return this.BasePath
      }
      return this.BasePath.concat("/", item.path).replace(/\/+/g, '/')
    }
  }
}
</script>
