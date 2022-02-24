<template>
  <div>
    <div>
      <div v-for="(item, index) in this.$store.getters.routers" :key="index">
        <template v-if="item.meta && !item.meta.hidden">
          <router-link :to="item.path">{{ item.meta.title || "ITEM" }}</router-link>
        </template>
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