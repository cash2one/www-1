<template>
  <div>
    <div class="self">
      <div class="s_position" v-on:click="showModify=!showModify">
        <img class="face" :src="imgUrl+userBaseInfo.photo" alt="">
        <span class="name">{{userBaseInfo.nickname}}</span>
        <div class="arrow">
          <img v-if="showModify" src="../../assets/img/icon_cart_b.png" alt="">
          <img src="../../assets/img/icon_cart_t.png" alt="" v-else>
        </div>
        <ul class="s_modify" v-if="showModify">
          <li class="s_li" v-on:click="mShowMBase">修改资料</li>
          <li class="s_li" v-on:click="mShowMPassword">修改密码</li>
        </ul>
      </div>
      <img @click="changeShowAlert" class="exit" src="../../assets/img/icon_quit.png" alt="">
      <mBase v-if="showMBase"></mBase>
      <mPassword v-if="showMPassword"></mPassword>
    </div>
    <mAlert v-if="showAlert" :content="content" @changeShowAlert="changeShowAlert"></mAlert>
  </div>
</template>
<script>
  import mBase from '../modify/mBase.vue';
  import mPassword from '../modify/mPassword.vue';
  import alert from '../other/alert.vue';

  export default {
    data: function () {
      return {
        show: true,
        showModify: false,
        showAlert: false,
        content: {
          tip: '确认退出吗？',
          fn: this.exit,
          obj:this,
        }
      }
    },
    props: ['userInfo'],
    computed: {
      showMBase: function () {
        return this.$store.state.showMBase;
      },
      showMPassword: function () {
        return this.$store.state.showMPassword;
      },
      imgUrl: function () {
        return this.$store.state.imgUrl;
      },
      userBaseInfo: function () {
        return this.$store.state.userBaseInfo;
      },
    },
    methods: {
      mShowMBase(){
        console.log('showMBase', this.showMBase);
        this.$store.commit('changeMBase');
      },
      mShowMPassword(){
        this.$store.commit('changeMPassword');
      },
      changeShowAlert(){
        this.showAlert = !this.showAlert;
      },
      exit(obj){
          obj.$axios({
            method: 'get',
            url: obj.$store.state.apiHref+'/logout',
          }).then(function (res) {
              if(res){
                  window.location.href='/haul/logout'
              }
          })
      }
    },
    components: {
      mBase: mBase,
      mPassword: mPassword,
      mAlert: alert,
    }
  }
</script>
<style scoped>
  .self {
    width: 100%;
    background-color: #f9f9f9;
    height: 48px;
    line-height: 48px;
    text-align: right;
    border: 1px solid #dbdddd;
    color: #666;
    box-sizing: border-box;
  }

  .arrow {
    display: inline-block;
  }

  .s_position > * {
    vertical-align: middle;
  }

  .s_position {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }

  .s_modify {
    position: absolute;
    left: 0;
    top: 46px;
    width: 100%;
    line-height: 20px;
    text-align: left;
    z-index: 1;
    font-size: 12px;
    background-color: #f9f9f9;
    box-sizing: border-box;
    border: 1px solid #dbdddd;
    border-top: none;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .s_modify .s_li {
    margin-left: 20px;
  }

  .face {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .name {
    /*font-weight: bold;*/
    font-size: 18px;
    /*color: black;*/
    padding: 0 4px 0 20px;
  }

  .exit {
    width: 26px;
    height: 26px;
    margin-right: 50px;
    vertical-align: middle;
    margin-left: 15px;
    cursor: pointer;
  }

  .arrow {
    width: 10px;
    margin-right: 15px;
  }

  .arrow img {
    vertical-align: middle;
  }
</style>
