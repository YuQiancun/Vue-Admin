<template>
  <div class="body_page b_map">
    <div class="body_box b_map_box">
      <div id="map_container" v-loading="mapLoading" />
    </div>
  </div>
</template>

<script>
export default {
  name: "BMap",
  data() {
    return {
      BMap: null,
      mapLoading: false,
    }
  },
  created() {
    if (navigator.geolocation) {
      console.log("想干嘛就干嘛");
      navigator.geolocation.getCurrentPosition(res => {
        console.log("res")
      })
    }
  },
  mounted() {
    this.initBMap()
  },
  methods: {
    initBMap() {
      this.BMap = new BMapGL.Map("map_container");
      this.setPoint()
      console.log("this.BMap", this.BMap)
      console.log("BMapGL", BMapGL)
    },
    setPoint() {
      this.mapLoading = true
      let point = new BMapGL.Point(116.404, 39.915);
      this.BMap.centerAndZoom(point, 10);
      setTimeout(() => {
        this.mapLoading = false
      }, 1000)
    }
  },
  beforeDestroy() {
    this.BMap && this.BMap.destroy();
    console.log("销毁BMap")
  }
}
</script>

<style lang="scss" scoped>
.b_map{
  .b_map_box{
    position: relative;
    width: 100%;
    height: 100%;
    #map_container {
      width: 100%;
      height: 100%;
      background-color: red;
    }
  }
}
</style>
