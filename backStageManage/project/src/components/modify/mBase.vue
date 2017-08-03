<template>
  <div class="s_bcTr">
    <div class="s_bcB">
      <ul class="s_bcC">
        <li class="logo_x">
          <span v-on:click="mShowMBase">x</span>
        </li>
        <li class="s_bg s_bgI">
          <div>
            <img src="../../assets/img/face.jpg" alt="">
          </div>
          <div>
            <input type="file" class="g_hidden">
            <button>选择照片</button>
          </div>
        </li>
        <li class="s_bg s_bgT">
          <span>
            基本资料
          </span>
        </li>
        <li class="s_bg s_bgInput">
          <label>
            <span>昵称：</span>
            <input type="text">
          </label>
        </li>
        <li class="s_bg s_bgInput">
          <label>
            <span>姓名：</span>
            <input type="text">
          </label>
        </li>
        <li class="s_bg">
          <button class="g_btn s_btnT">修改</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  created(){
      console.log(this.$store)
  },
  methods:{
    mShowMBase(){
      this.$store.commit('changeMBase');
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
    width: 558px;
    height: 494px;
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
  .s_bg{
    margin: 0 50px 6px;
  }
  .s_bgI{
    text-align: center;
    margin-top: 20px;
  }
  .s_bgI>div>img{
    width: 112px;
    height: 112px;
    border-radius: 50%;
  }
  .s_bgI>div>button{
    width: 90px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: white;
    color: black;
    font-size: 14px;
  }
  .s_bgT{
    background-color: #f9f9f9;
    border-radius: 3px;
    color: #1fb5ac;
    font-weight: bold;
  }
  .s_bgT span{
    margin-left: 20px;
  }
  .s_bgInput span{
    display: inline-block;
    width: 54px;
    padding-left: 20px;
  }
  .s_bgInput input{
    width: 350px;
    outline: none;
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
    color: #666;
  }
  .s_btnT{
    margin-left: 78px;
    width: 124px;
  }
</style>
