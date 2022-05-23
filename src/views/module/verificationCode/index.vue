<template>
  <div class="verificationCode" v-loading="createLoading">
    <canvas id="canvas" @click="setVerificationCode" width="140" height="40"></canvas>
  </div>
</template>

<script>
export default {
  name: "VerificationCode",
  data () {
    return {
      createLoading: false,
      num: [],
      number: '',
      verificationCode: ''
    }
  },
  mounted () {
    this.draw(this.num)
    this.number = this.num.join().replace('/,/g','')
  },
  methods: {
    setVerificationCode () {
      this.createLoading = true
      setTimeout(() => {
        this.draw(this.num)
        this.number = this.num.join().replace('/,/g','')
      }, 1000)
    },
    draw (num) {
      this.verificationCode = ''
      let canvas_width = 140
      let canvas_height = 40
      let canvas = document.getElementById("canvas");//获取到canvas的对象，演员
      let context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
      canvas.width = canvas_width;
      canvas.height = canvas_height;
      const sCode = "1,2,3,4,5,6,7,8,9,0";
      let aCode = sCode.split(',')
      let aLength = aCode.length
      for (let i = 0;i < 4;i++) {
        let j = Math.floor(Math.random() *aLength);//获取到随机的索引值
        let deg = Math.random() *15 *Math.PI /180;//产生0~30之间的随机弧度
        let txt = aCode[j];//得到随机的一个内容
        this.verificationCode += txt
        //num[i] = txt.toLowerCase(); toUpperCase()
        num[i] = txt;
        let x =20 + i * 30;//文字在canvas上的x坐标
        let y =20 +Math.random() *8;//文字在canvas上的y坐标
        context.font ="bold 23px 微软雅黑";
        context.translate(x,y);
        context.rotate(deg);
        context.fillStyle =this.randomColor();
        context.fillText(txt,0,0);
        context.rotate(-deg);
        context.translate(-x, -y);
        this.createLoading = false
      }
      // for (let k =0;k <=5;k++) {//验证码上显示线条
      //   context.strokeStyle =this.randomColor();
      //   context.beginPath();
      //   context.moveTo(Math.random() *canvas_width,Math.random() *canvas_height);
      //   context.lineTo(Math.random() *canvas_width,Math.random() *canvas_height);
      //   context.stroke();
      // }
      this.$emit('setVerificationCode',this.verificationCode)
    },
    randomColor () {
      let r =Math.floor(Math.random() *256);
      let g =Math.floor(Math.random() *256);
      let b =Math.floor(Math.random() *256);
      return "rgb(" +r +"," +g +"," +b +")";
    }
  }
}
</script>

<style lang="scss" scoped>
.verificationCode{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  #canvas{
    width: 200px;
    height: 40px;
  }
}
</style>
