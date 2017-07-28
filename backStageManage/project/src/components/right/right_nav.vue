<template>
  <div class="">
    <div class="nav">
      <div class="search">
        <label class="lab">
          <span>用户：</span>
          <input type="text">
          <button class="g_btn">搜索</button>
        </label>
      </div>
      <div class="effect">
        <router-link class="shell-a g_btn g_ico"  to="/driverList/">
          <span>
            司机列表
          </span>
          <span class="span">
            <img src="../../assets/img/icon_tran_w.png" alt="">
            <img src="" alt="">
          </span>
        </router-link>
        <router-link class="shell-a g_btn g_ico"  to="/driverList/addRegDriver">添加注册司机
          <span class="span">
            <img src="../../assets/img/icon_tran_w.png" alt="">
          </span>
        </router-link>
        <router-link class="shell-a g_btn g_ico"  to="/driverList/addNewDriver">添加新司机
          <span class="span">
            <img src="../../assets/img/icon_tran_w.png" alt="">
          </span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    beforeRouteUpdate (to, from, next) {
        console.log("我没变");
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteEnter (to, from, next) {
        console.log('就是这样了');
        next();
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
    },
  }
</script>
<style scoped>
  .nav{
    background-color: #f9f9f9;
    height: 84px;
    margin: 25px 10px 20px;
    border: 1px solid #dbdddd;
    vertical-align: middle;
    position: relative;
  }
  .search{
    float: left;
    margin: 25px 0 0 30px;
  }
  .effect{
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .effect a{
    margin-left: 20px;
  }
  .lab span{
    font-weight: bold;
    font-size: 14px;
  }
  .lab input{
    height: 28px;
    border: 1px solid #ddd;
    width: 170px;
    outline: none;
    margin-right: 15px;
  }
  .shell-a{
    display: inline-block;
  }
</style>
