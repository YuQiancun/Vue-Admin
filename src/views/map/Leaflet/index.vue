<template>
  <div class="Leaflet">
    <div class="Leaflet_box">
      <div id="Leaflet_Map" >
        <el-button @click="total += 10">添加</el-button>
        <el-button @click="total -= 10">减少</el-button>
      </div>
      <div id="Leaflet_Map2" >
        <div v-for="i in total" :key="i">{{i}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Leaflet",
  data() {
    return {
      total: 20
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

.Leaflet{
  position: relative;
  width: 100%;
  min-height: 100%;
  padding: 12px;
  display: flex;
  border: 1px solid red;
  box-sizing: border-box;
  .Leaflet_box{
    width: 100%;
    min-height: 100%;
    height: 100%;
    border: 1px solid blueviolet;
    box-sizing: border-box;
    #Leaflet_Map{
      position: sticky;
      top: 0;
      width: 100%;
      height: 20%;
      border: 1px solid sienna;
      box-sizing: border-box;
    }

    #Leaflet_Map2{
      border: 1px solid green;
      box-sizing: border-box;
    }
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