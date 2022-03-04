<template>
  <div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .25s;
}
.fade-enter, .fade-leave-to {
  transform: translateX(2%);
  opacity: 0;
}
</style>