<template>
  <ul class="ul">
    <li class="logo">
      <img src="../assets/img/logo.png" alt="">
    </li>
    <li class="li-bc">
      <router-link class="shell-a"  to="/driverList">司机列表</router-link>
    </li>
  </ul>
</template>
<script>

  export default{

  }

</script>
<style scoped>
  .ul li{
    height: 80px;
    line-height: 80px;
    color: white;
    font-size: 14px;
    font-weight: 700;
  }
  .li-bc{
    background-color: #1fb5ac;
    /*background-color: rgba(71, 70, 72, 0.81);*/
  }
  .logo{
    text-align: center;
  }
  .logo img{
    vertical-align: middle;
  }
  .shell-a:before{
    content: '';
    display: inline-block;
    width: 46px;
    height: 40px;
    background: url("../assets/img/icon_nav.png") no-repeat;
    background-position: -46px -40px;
    vertical-align: middle;
    margin-right: 20px;
  }
</style>
