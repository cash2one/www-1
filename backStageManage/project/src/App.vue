<template>
  <div id="app">
    <router-view class="left" name="left"></router-view>
    <div class="right">
      <router-view class="right_head" name="right_head"></router-view>
      <router-view class="right_nav" name="right_nav"></router-view>
      <keep-alive>
      <router-view class="right_main" name="right_main"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'app',

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    /*color: #2c3e50;*/
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  html, body, p, ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a{
    color: white;
    text-decoration: none;

  }

  .left {
    width: 250px;
    background-color: #32323a;
    z-index: 1;
  }
  .right{
    background-color: white;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: 0;
    margin-left: 250px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .float_l{
    float: left;
  }
  .g_btn{
    background-color: #37b4ae;
    outline: none;
    color: white;
    padding: 6px 12px;
    font-size: 14px;
    border: 1px solid #34a19b;
    border-radius: 3px;
    vertical-align: middle;
    cursor: pointer;
    font-weight: bold;
  }
  .g_smallBtn{
    padding: 0 10px;
  }
  .g_ico .span{
    width: 16px;
    height: 14px;
    display: inline-block;
    margin-left: 2px;
  }
  .g_ico img{
    vertical-align: middle;
  }
  .g_shell{
    border: 1px solid #ddd;
    height: 166px;
    margin: 10px;
  }
  table{
    border-spacing: 0;
    border-collapse: collapse;
  }
  input{
    outline: none;
  }
</style>
