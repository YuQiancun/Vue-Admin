<template>
  <div>
    <div>
      <div v-for="(item, index) in this.$store.getters.routers" :key="index">
        <router-link :to="item.path">{{ item.meta.title || "ITEM" }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "index"
}
</script>

<style scoped>

</style>