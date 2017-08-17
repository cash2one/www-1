<template>
  <div class="s_bcTr">
    <div class="s_bcB">
      <ul class="s_bcC">
        <li class="logo_x">
          <span class="s_title">修改用户信息</span>
          <span v-on:click="mShowMBase" class="g_floatR">x</span>
        </li>
        <v-addDriver :driverId="driverId" @upData="upData"></v-addDriver>
      </ul>
    </div>
  </div>
</template>
<script>
  import addDriver from '../addDriver/addNewDriver.vue';
  export default {
    props:['driverId'],
    created(){

    },
    data(){
        return {

        }
    },
    methods:{
      mShowMBase(){
        this.$store.commit('changeShowModify');
      },
      upData(){
          this.$emit('upData');
      }
    },
    components:{
      'v-addDriver':addDriver,
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
    /*display: flex;*/
    justify-content: center;
    align-items: center;
    text-align: left;
    font-size: 14px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .s_bcB{
    width: 960px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    margin: 50px auto;
  }
  .s_bcC{
    padding-bottom: 30px;
    padding-top: 10px;
  }
  .logo_x{
    text-align: center;
    font-weight: bold;
    color: #666;
    font-size: 20px;
    /*margin-right: 20px;*/
    margin-top: 10px;
    position: relative;
  }
  .s_title{
    font-size: 14px;
    font-weight: 500;
  }
  .logo_x .g_floatR{
    cursor: pointer;
    margin-right: 20px;
    position: absolute;
    right: 0;
    top: 0;
  }
  .s_left{
    float: left;
    width: 220px;
    position: relative;
    height: 300px;
  }
  .s_left_img{
    position: absolute;
    top: 0;
    left: 50px;
    width: 100px;
    height: 100px;
  }
  .s_bcShell{
    margin: 20px 60px 0;
  }
  .s_right{
    float: left;
    width: 520px;
  }
  .s_t{
    height: 36px;
    line-height: 36px;
    font-weight: bold;
    background-color: #f9f9f9;
    font-size: 14px;
    text-align: left;
    text-indent: 2em;
    color: #1fb5ac;
  }
  .s_table{
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .s_table td{
    border: 1px solid #ddd;
    text-align: left;
    width: 128px;
    height: 30px;
    line-height: 30px;
    padding-left: 4px;
  }
  td.s_tip{
    background-color: #f5f5f5;
    text-align: right;
  }
  .s_btnGroup{
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .s_btnGroup li{
    float: left;
    margin-left: 4px;
    padding: 10px 15px;
    border-radius: 4px;
    color: #337ab7;
    cursor: pointer;
  }
  .s_btnGroup li:hover{
    background-color: #e2e2e2;
  }
  .s_btnGroup li.s_clickC{
    background-color: #33b0b7;
    color: white;
  }
  .s_changeImageG{
    min-height: 300px;
    border: 1px solid #cccccc;
  }
</style>
