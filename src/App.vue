<template>
  <div id="app">
    <transition name="app" mode="out-in">
      <router-view />
    </transition>
    <transition name="app" mode="out-in">
      <Loading v-if="!$store.getters.isRoles && $route.path !== '/login'" />
    </transition>
  </div>
</template>

<style>
#app {
  /*min-width: 700px;*/
  position: relative;
  height: 100vh;
  overflow: hidden;
}
</style>

<style lang="scss">
.app-enter-active, .app-leave-active {
  transition: all .2s;
}
.app-enter, .app-leave-to {
  transform: scale(.95);
  opacity: 0;
}
</style>
