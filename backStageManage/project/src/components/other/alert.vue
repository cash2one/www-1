<template>
  <div class="s_bcTr">
    <div class="s_bcB">
      <ul class="s_bcC">
        <li class="logo_x">
          <span v-on:click="mShow">x</span>
        </li>
        <li class="s_contain">
          <span>
              确认删除吗？
          </span>
        </li>
        <li class="s_btnG">
          <button class="g_btn s_margin">确认</button>
          <button class="g_btn">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    methods:{
      mShow(){
        this.$store.commit('changeShowAlert');
      }
    },
  }
</script>
<style scoped>
  .s_bcTr{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(58, 58, 58, 0.53);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    font-size: 14px;
  }
  .s_bcB{
    width: 400px;
    height: 200px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
  }
  .logo_x{
    text-align: right;
    font-weight: bold;
    color: #666;
    font-size: 20px;
    margin-right: 20px;
  }
  .logo_x span{
    cursor: pointer;
  }
  .s_contain{
    height: 110px;
    text-align: center;
    font-size: 16px;
    line-height: 100px;
  }
  .s_btnG{
    text-align: center;
  }
  .s_margin{
    margin-right: 30px;
  }
</style>
