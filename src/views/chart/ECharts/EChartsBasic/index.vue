<template>
  <div class="echartsbasic">
    <div ref="echartsbasic_box" class="echartsbasic_box">
    </div>
  </div>
</template>

<script>
export default {
  name: "EChartsBasic",
  data() {
    return {
      echarts: null,
      Jump: null,
      option: {
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    }
  },
  created() {

  },
  mounted() {
    this.EChartsInit().then(() => {
      this.echarts.on('click', res => {
        this.$notify({
          title: `点击了第${res.dataIndex + 1}个柱子`,
          message: `名字：${res.name} ${res.seriesName}：${res.data}, 2秒后跳转页面 重复点击可延迟`,
          duration: 2000
        });
        this.Jump && clearTimeout(this.Jump)
        this.Jump = setTimeout(() => {
          this.$router.push({name: 'ToBase64'})
        }, 3000)
      });
      window.onresize = () => {
        this.echarts.resize()
      }
    })
  },
  methods: {
    EChartsInit() {
      this.echarts && this.echarts.dispose()
      this.echarts = new this.$echarts.init(this.$refs.echartsbasic_box)
      // 使用刚指定的配置项和数据显示图表。
      this.echarts.setOption(this.option);
      return Promise.resolve()
    }
  },
  beforeDestroy() {
    this.Jump && clearTimeout(this.Jump)
    this.echarts && this.echarts.dispose()
  }
}
</script>

<style lang="scss" scoped>
.echartsbasic{
  position: relative;
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  .echartsbasic_box{
    //min-height: 100%;
    height: 100%;
    width: 100%;
    padding: 12px;
    box-sizing: border-box;
    border-radius: 2px;
    background-color: white;
  }
}
</style>
