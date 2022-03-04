<template>
  <div class="body_page a_map">
    <div class="body_box a_map_box">
      <div class="AMapMenu">
        <el-card class="box-card" v-loading="mapLoading">
          <div slot="header" class="clearfix">
            <span>AMap</span>
            <el-button style="float: right;margin-left: 40px;" size="mini" @click="onReloadAMap" :disabled="mapLoading">重载AMap</el-button>
          </div>
          <div v-for="(item, index) in list" :key="index" class="text item">
            <div>
              <span>{{ item.label }}</span>
              <el-button size="mini" @click="item.on">{{ item.onName }}</el-button>
            </div>
          </div>
        </el-card>
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
          </div>
        </el-card>
      </div>
      <div id="map_container" v-loading="mapLoading">
        <div class="rightMenu" :class="{'show': isShow}" :style="{top: rightMenuTop + 'px', left: rightMenuLeft + 'px'}">
          MENU
        </div>
      </div>
    </div>
  </div>
</template>
offsetX
<script>
export default {
  name: "AMap",
  data() {
    return {
      isShow: false,
      mapLoading: true,
      rightMenuTop: 0,
      rightMenuLeft: 0,
      map: null,
      mapOption: {
        mapStyle: "amap://styles/ba3b3dde8e0ab42d1081852f3cdb6356",
        center: '',
        zoom: 10,
        marker: [
          [119.34707, 29.075206],
          [119.29707, 30.075206],
          [118.29907, 29.070206],
          [119.28807, 30.070206],
          [120.26707, 29.070336],
          [120.26707, 29.072236],
          [119.29907, 30.073336],
          [120.29907, 29.071316],
          [119.21107, 30.079226]
        ],
        markerList: []
      },
      list: [
        { label: "新增一个随机Marker", on: this.onAddMarker, onName: '新增Marker'},
        { label: "自适应窗口显示Marker", on: this.onSetFitView, onName: '自适应窗口'},
      ]
    }
  },
  mounted() {
    this.initRightMenu()
    this.initAMap()
  },
  methods: {
    initRightMenu() {
      const dom = document.getElementById("map_container")
      console.log(dom)
      // dom.onmousedown = () => {
      //   this.isShow = false
      // }
      dom.ondblclick = () => {
        this.isShow = false
      }
      dom.oncontextmenu = e => {
        console.log(e)
        this.rightMenuTop = e.offsetY
        this.rightMenuLeft = e.offsetX
        console.log(this.rightMenuTop,
        this.rightMenuLeft)
        e.preventDefault()
        !this.isShow && (this.isShow = true);
      }
      // dom.click = e => {
      //   console.log(e)
      //   e.preventDefault()
      //   this.isShow = !this.isShow
      // }
      // dom.ondblclick = e => {
      //   console.log(e)
      //   e.preventDefault()
      // }
    },
    initAMap() {
      /* eslint-disable */
      this.map = new AMap.Map('map_container', {
        resizeEnable: true,
        center: this.mapOption.center,
        zoom: this.mapOption.zoom,
      });
      setTimeout(() => {
        this.mapLoading = false
      }, 1000)
    },
    onAddMarker() {
      let list = this.onCreateMarker(this.mapOption.marker)
      this.mapOption.markerList = this.mapOption.markerList.concat(list)
      list.forEach(item => {
        this.map.add(item)
      })
      // 地图加载完成时执行
      this.map.on('complete', () => {
        this.onSetFitView()
      })
    },
    onCreateMarker(list = []) {
      let marker = []
      list.forEach(item => {
        console.log(...item)
        const newMarker = new AMap.Marker({
          position: new AMap.LngLat(...item)
        })
        marker.push(newMarker)
      })
      return marker
    },
    onSetFitView(now = false,arr = [100, 100, 100, 100]) {
      this.map && this.map.setFitView(null, now, arr)
    },
    onReloadAMap() {
      this.mapLoading = true
      this.map && this.map.destroy();
      this.initAMap()
    }
  },
  beforeDestroy() {
    this.map && this.map.destroy();
    console.log("销毁AMap")
  }
}
</script>

<style lang="scss" scoped>
.a_map{
  .a_map_box{
    position: relative;
    width: 100%;
    height: 100%;
    #map_container{
      width: 100%;
      height: 100%;
      .rightMenu{
        position: absolute;
        left: 0;
        top: 0;
        width: 120px;
        height: 200px;
        background-color: #42b983;
        box-shadow: 0 0 10px #666;
        z-index: 9999;
        display: none;
        transition: all .3s;
        &.show{
          transition: all .3s;
          display: block;
        }
      }
    }
    .AMapMenu{
      z-index: 9999;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }
}
</style>
