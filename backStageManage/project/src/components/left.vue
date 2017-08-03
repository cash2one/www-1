<template>
  <ul class="ul" v-sChangeColor="'li-bc'">
    <li class="logo" data-except=true>
      <img src="../assets/img/logo.png" alt="">
    </li>
    <li class="li-bc" id="sourceList">
      <router-link class="shell-a s_source" to="/sourceList" >货源列表</router-link>
    </li>
    <li id="driverList">
      <router-link class="shell-a s_driver" to="/driverList" >司机列表</router-link>
    </li>
    <li id="order">
      <router-link class="shell-a s_order" to="/order" >订单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</router-link>
    </li>
  </ul>
</template>
<script>

  export default{
      data(){
          return {
              color:{

              }
          }
      },
      mounted(){
          //解决刷新地址左边栏无法正确显示当前路由位置
          let href=window.location.href;
          let arr=href.split('#/');
          let el=this.$el;
          console.log(el,arr[1]);

          if('order'.indexOf(arr[1])>-1){
            document.getElementById('order').click();
          }
          if('driverList'.indexOf(arr[1])>-1){
            document.getElementById('driverList').click();
          }
          if('sourceList'.indexOf(arr[1])>-1){
            document.getElementById('sourceList').click();
          }
          if(!arr[1]){
            document.getElementById('sourceList').click();
          }
      },
      methods:{
          routerJudge:function (str) {

          }

      }
  }

</script>
<style scoped>
  .ul li {
    height: 80px;
    line-height: 80px;
    color: #ccced2;
    font-size: 14px;
    font-weight: 700;
  }
  .ul a{
    color: #ccced2;
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .li-bc {
    background-color: #1fb5ac;
    color: white;
    /*background-color: rgba(71, 70, 72, 0.81);*/
  }
  .li-bc a{
    color: white;
  }
  .logo {
    text-align: center;
  }

  .logo img {
    vertical-align: middle;
  }

  .shell-a:before {
    content: '';
    display: inline-block;
    width: 46px;
    height: 40px;
    background: url("../assets/img/icon_nav.png") no-repeat;
    background-position: 0 -40px;
    vertical-align: middle;
    margin-right: 20px;
  }
  .li-bc .s_driver:before{
    background-position: -47px -40px;
  }
  .s_source:before{
    background-position: 0px 0px;
  }
  .li-bc .s_source:before{
    background-position: -46px 0px;
  }
  .s_order:before{
    background-position: 0px -80px;
  }
  .li-bc .s_order:before{
    background-position: -46px -80px;
  }
</style>
