<template>
  <div>
    <div>
      <div v-for="(item, index) in this.$store.getters.routers" :key="index">
        <template v-if="item.meta && !item.meta.hidden">
          <router-link :to="item.path">{{ item.meta.reTitle || item.meta.title }}</router-link>
<!--          <pre>-->
<!--            {{ item.redirect }}-->
<!--            {{ item.children }}-->
<!--          </pre>-->
<!--          <hr>-->
<!--          <br>-->
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "LayoutMenu"
}
</script>

<style scoped>

</style>
