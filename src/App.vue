<template>
  <div id="app">
    <transition name="app" mode="out-in">
      <Loading v-if="!$store.getters.isRoles && $route.path !== '/login'" />
      <router-view />
    </transition>
  </div>
</template>

<style>
#app {
  min-width: 700px;
  position: relative;
  height: 100vh;
}
</style>

<style lang="scss" scoped>
.app-enter-active, .app-leave-active {
  transition: all .5s;
}
.app-enter, .app-leave-to {
  transform: scale(.95);
  opacity: 0;
}
.loading-enter-active, .loading-leave-active {
  transition: all 1s;
}
.loading-enter, .loading-leave-to {
  transform: scale(.95);
  opacity: 0;
}
</style>