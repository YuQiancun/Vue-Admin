<template>
  <div class="graphics">
    <transition name="app" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Graphics"
}
</script>

<style lang="scss">
.graphics{
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: #F2F2F2;;
}
</style>