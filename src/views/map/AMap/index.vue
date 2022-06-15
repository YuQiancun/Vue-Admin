<template>
  <div class="body_page a_map">
    <div class="body_box a_map_box">
      <el-dialog title="提示" :visible.sync="url" width="30%" >
        <el-image style="width: 400px; height: 320px" :src="url" fit="fill" />
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="url = false">确 定</el-button>
        </span>
      </el-dialog>
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
      <div ref="AMap" id="map_container" v-loading="mapLoading">
        <div class="rightMenu" :class="{'show': isShow}" :style="{top: rightMenuTop + 'px', left: rightMenuLeft + 'px'}">
          MENU
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas"

export default {
  name: "AMap",
  data() {
    return {
      url: null,
      isShow: false,
      mapLoading: true,
      rightMenuTop: 0,
      rightMenuLeft: 0,
      polylineList: [],
      polyline: null,
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
        { label: "添加点击显示点位", on: this.setMapClickPoint, onName: '添加点击显示点位'},
        { label: "打印获取点位", on: () => console.log(this.polylineList), onName: '打印获取点位'},
        { label: "画面截取", on: this.onInterceptDom, onName: '截取地图画面'},
      ],
      style: {
        initial: {
          padding: ".162rem .2rem",
          "border-radius": ".25rem",
          width: "",
          "border-width": 0,
          "box-shadow": "0 2px 6px 0 rgba(114, 124s, 245, .5)",
          "text-align": "center",
          "font-size": "13px",
          color: "black",
        }
      }
    }
  },
  mounted() {
    this.initRightMenu()
    this.initAMap()
  },
  methods: {
    initRightMenu() {
      const dom = document.getElementById("map_container")
      // console.log(dom)
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
      // let list = this.onCreateMarker(this.mapOption.marker)
      let list = this.setCreateMarker(this.mapOption.marker)
      this.mapOption.markerList = this.mapOption.markerList.concat(list)
      // list.forEach(item => {
      //   this.map.add(item)
      // })

      this.map.add(list)
      // 地图加载完成时执行
      this.map.on('complete', () => {
        this.onSetFitView()
      })
    },
    onInterceptDom() {

      if (this.$refs.AMap) {
        console.log("html2canvas", this.$refs.AMap)
        html2canvas(this.$refs.AMap, {
          useCORS: true,
          dpi: window.devicePixelRatio * 2,
          scale: 2,
          width: this.$refs.AMap.clientWidth,
          height: this.$refs.AMap.clientHeight,
        }).then((canvas) => {
          console.log(canvas)
          // 通过html2canvas将html渲染成canvas，然后获取图片数据
          let imgData = canvas.toDataURL("image/jpeg");
          this.url = imgData
          console.log(imgData)

          // //初始化pdf，设置相应格式
          // var doc = new jsPDF("p", "mm", "a4");
          //
          // //这里设置的是a4纸张尺寸
          // doc.addImage(imgData, "JPEG", 0, 0, 210, 297);
          //
          // //输出保存命名为content的pdf
          // doc.save(`${filename}.pdf`);
        });
      }
    },
    setMapClickPoint() {
      this.map && this.map.on('click', item => {
        this.polylineList.push([item.lnglat.getLng(), item.lnglat.getLat()])
        this.setCreatePolyline(this.polylineList)
      })
    },
    setClearPolyline() {
      if(this.polyline) {this.map.remove(this.polyline); (this.polyline = null);}
    },
    setCreatePolyline(points = []) {
      this.setClearPolyline()
      this.polyline = new AMap.Polyline({ path: points }).on("click", () => {this.setClearPolyline();this.polylineList = [];})
      this.map && this.map.add(this.polyline)
    },
    setCreateMarker(list = []) {
      let marker = []
      list.forEach((item, index) => {
        let newMarker = new AMap.Text({
          text: '纯文本标记',
          anchor: 'center', // 设置文本标记锚点
          draggable: false,
          cursor: 'pointer',
          angle:0,
          style: this.style["initial"],
          position: item,
          extData: index
        }).on("click", e => {
          console.log("AMap Marker Click e: ", e)
          console.log("PUSH")
          // this.$router.push({path: "./about" + e.target.getExtData()});
        })
        marker.push(newMarker)
      })
      return marker
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
