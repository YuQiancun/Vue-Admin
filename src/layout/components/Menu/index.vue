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

<!--      <div v-for="(item, index) in this.$store.getters.routers" :key="index">-->
<!--        <template v-if="item.meta && !item.meta.hidden">-->
<!--          <router-link :to="item.path">{{ item.meta.reTitle || item.meta.title }}</router-link>-->
<!--&lt;!&ndash;          <pre>&ndash;&gt;-->
<!--&lt;!&ndash;            {{ item.redirect }}&ndash;&gt;-->
<!--&lt;!&ndash;            {{ item.children }}&ndash;&gt;-->
<!--&lt;!&ndash;          </pre>&ndash;&gt;-->
<!--&lt;!&ndash;          <hr>&ndash;&gt;-->
<!--&lt;!&ndash;          <br>&ndash;&gt;-->
<!--        </template>-->
<!--      </div>-->
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
    },
    curActive() {
      console.log(this.$route)
      return "/home"
    }
  }
}
</script>

<style scoped>

</style>
