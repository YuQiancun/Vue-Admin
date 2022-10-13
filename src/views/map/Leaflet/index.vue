<template>
  <div class="Leaflet">
    <div class="Leaflet_box" id="LeafletMap" ref="leafletMap" />
  </div>
</template>

<script>
import * as L from "leaflet"
// import '@supermap/iclient-leaflet';
import { tiledMapLayer } from '@supermap/iclient-leaflet';

export default {
  name: "Leaflet",
  data() {
    return {
      url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World",
      map: {
        center: [30.074, 120.34],
        maxZoom: 18,
        zoom: 10,
        iconSize: {
          Pie: [30, 15],
          Table: [20, 20],
        },
        instance: null,
        url: "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World",
        searchUrl: "https://iserver.supermap.io/iserver/services/data-world/rest/data",
        MarkerArr: []
      },
      total: 20,
      leafletInstance: null
    }
  },
  created() {
  },
  mounted() {
    this.initLeaflet()
  },
  methods: {
    initLeaflet() {
      // this.leafletMap = L.map("LeafletMap", {})
      let instance = L.map(this.$refs.leafletMap, {
        center: this.map.center,
        zoom: 13
        // crs: L.CRS.EPSG4326,
        // center: this.map.center,
        // maxZoom: this.map.maxZoom,
        // zoom: this.map.zoom,
        // inertia: false,
        // zoomControl: false,
        // attributionControl: false
      })
      this.leafletInstance = instance
      // let Layer = new L.supermap.TiledMapLayer("https://iserver.supermap.io/iserver/services/map-world/rest/maps/World", {})
      // Layer.addTo(this.leafletInstance)
      tiledMapLayer("https://iserver.supermap.io/iserver/services/map-world/rest/maps/World").addTo(instance)
    }
  }
}
</script>

<style lang="scss" scoped>

.Leaflet{
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 12px;

  border: 1px solid red;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;

  .Leaflet_box{
    width: 100%;
    height: 100%;
    border: 1px solid blueviolet;
    box-sizing: border-box;
  }
}
//.Leaflet{
//  position: relative;
//  width: 100%;
//  padding: 12px;
//  box-sizing: border-box;
//  .Leaflet_box{
//    height: 100%;
//    padding: 24px;
//    box-sizing: border-box;
//    background-color: white;
//  }
//}
</style>