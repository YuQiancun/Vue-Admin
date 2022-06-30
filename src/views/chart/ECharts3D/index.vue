<template>
  <div class="echarts3d">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "ECharts3D"
}
</script>

<style lang="scss" scoped>
.echarts3d{
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: #F2F2F2;
}
</style>
