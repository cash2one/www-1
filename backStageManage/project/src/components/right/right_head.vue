<template>
  <div class="self">
    <img class="face" src="../../assets/img/face.jpg" alt="">
    <span class="name">就是屌屌屌</span>
    <div class="arrow">
      <img v-if="show" src="../../assets/img/icon_cart_b.png" alt="">
      <img src="../../assets/img/icon_cart_t.png" alt="" v-else>
    </div>
    <img class="exit" src="../../assets/img/icon_quit.png" alt="">
  </div>
</template>
<script>
  export default {
      data(){
          return {
              show:true
          }
      }
  }
</script>
<style scoped>
  .self{
    width: 100%;
    background-color: #f9f9f9;
    height: 48px;
    line-height: 48px;
    text-align: right;
    border: 1px solid #dbdddd;
  }
  .self div{
    display: inline-block;
  }
  .self>*{
    vertical-align: middle;
  }
  .face{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .name{
    /*font-weight: bold;*/
    font-size: 18px;
    color: black;
    padding: 0 4px 0 20px;
  }
  .exit{
    width: 26px;
    height: 26px;
    margin-right: 50px;
  }
  .arrow{
    width: 10px;
    margin-right: 30px;
  }
  .arrow img{
    vertical-align: middle;
  }
</style>
