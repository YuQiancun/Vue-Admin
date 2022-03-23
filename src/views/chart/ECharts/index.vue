<template>
  <div class="echarts">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "ECharts"
}
</script>

<style lang="scss" scoped>
.echarts{
  position: relative;
  display: flex;
  width: 100%;
  min-height: 100%;
  background-color: #F2F2F2;
}
</style>
