<template>
  <div id="app">

      <router-view class="left" name="left" v-if="pageStatus=='normal'"></router-view>
      <div class="right" v-if="pageStatus=='normal'">
        <router-view class="right_head" name="right_head" v-bind:userInfo="userInfo"></router-view>
        <router-view class="right_nav" name="right_nav"></router-view>
        <!--<keep-alive>-->
          <router-view class="right_main" name="right_main"></router-view>
        <!--</keep-alive>-->
      </div>
    <div v-else-if="pageStatus=='error'">
      出错了!!
    </div>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data(){
        return {
            userInfo:'test',
        }
    },
    created(){
        let _this=this;
        console.log('_this.$store.state.apiHref13',_this.$store.state.apiHref);
        this.$axios({
          method: 'get',
          url: _this.$store.state.apiHref+'/user/info',
          headers: {'accept': 'application/json'},
        }).then(function (res) {

//          console.log(res.data);
          if(res.data.response_state==1){
              _this.userInfo=res.data;
              _this.$store.commit('changeRoleName',res.data.roleName);
              _this.$store.commit('changeUserBaseInfo',res.data)
          }else {
              _this.$store.commit('changePageStatus','error');
          }
        })
    },
    computed:{
      pageStatus:function () {
        return this.$store.state.pageStatus
      }
    }
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
  .g_hidden{
    display: none;
  }
  .g_floatR{
    float: right;
  }
  .g_cursor{
    cursor: pointer;
  }
  .g_clear:after{
    content: '';
    clear: both;
    display: block;
  }
  .g_btnM{
    background-color: #7f7f7f;
    border: 1px solid #7f7f7f;
  }
  .g_m{
    float: right;
  }
  .g_ms{
    color: #0df925;
  }
  .g_mf{
    color: #ff2c2e;
  }
  .g_imgS{
    width: 70px;
    height: 60px;
  }
  input.g_input {
    border: 1px solid #dbdddd;
    width: 100px;
    color: #5c5c5c;
    height: 26px;
    box-sizing: content-box;
  }

  input.g_inputW {
    width: 160px;
  }
  .g_selectUlOrder li{
    color: #5c5c5c;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }
  .s_outDiv ul.g_selectUlOrder{
    height: 80px;
    bottom: -80px;
  }
  .s_outDiv ul.g_selectUlOrderHigh{
    height: 180px;
    bottom: -180px;
  }

</style>
