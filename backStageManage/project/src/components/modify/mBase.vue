<template>
  <div class="s_bcTr">
    <div class="s_bcB">
      <ul class="s_bcC">
        <li class="logo_x">
          <span v-on:click="mShowMBase">x</span>
        </li>
        <li class="s_bg s_bgI">
          <div>
            <img  :src="showNet?(imgUrl+userBaseInfo.photo):localUrl" alt="">
          </div>
          <div>
            <input type="file" class="g_hidden" id="mBase_file" multiple v-on:change="changeInput(null,$event)">
            <button @click="buttonTrigger" v-sclick>选择照片</button>
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
            <input type="text"  v-model="nickname">
          </label>
        </li>
        <li class="s_bg s_bgInput">
          <label>
            <span>姓名：</span>
            <input type="text"  v-model="trueName">
          </label>
        </li>
        <li class="s_bg">
          <button class="g_btn s_btnT" @click="modifyUp" v-if="!isModify">修改</button>
          <button class="g_btn s_btnT g_btnM " v-else >修改中...</button>
          <span class="g_m g_ms" v-if="isSuccess=='yes'">修改成功</span>
          <span class="g_m g_mf" v-else-if="isSuccess=='no'">修改失败</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  mounted(){
      let _this=this;
//      document.getElementById('mBase_file').onchange=function () {
//        if(!this.files[0]){
//            _this.showNet=true;
//            return;
//        };
//        let createObjectURL = function(blob){
//          return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
//        };
//        let url = createObjectURL(this.files[0]);
//        _this.showNet=false;
//        _this.localUrl=url;
//      }
    this.nickname=this.$store.state.userBaseInfo.nickname;
    this.trueName=this.$store.state.userBaseInfo.trueName;
  },
  data(){
      return {
        showNet:true,
        localUrl:'',
        nickname:'',
        trueName:'',
        photo:'',
        isModify:false,
        isSuccess:'',//两个值yes no
      }
  },
  computed:{
      userBaseInfo:function () {
        return this.$store.state.userBaseInfo;
      },
      imgUrl:function () {
        return this.$store.state.imgUrl;
      }
  },
  methods:{
    mShowMBase(){
      this.$store.commit('changeMBase');
    },
    buttonTrigger(){
        document.getElementById('mBase_file').click();
    },
    changeInput(a,event){
        console.log('event',event);
        let dom=event.target;
        let _this=this;
      if(!dom.files[0]){
            _this.showNet=true;
            return;
        };
      _this.photo=dom.files[0];
        let createObjectURL = function(blob){
          return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
        };
        let url = createObjectURL(dom.files[0]);
        _this.showNet=false;
        _this.localUrl=url;
        console.log(event);
    },
    modifyUp(){

        let _this=this;
        _this.isModify=true;
        console.log('this.photo',this.photo);
        let formData=new FormData;
        formData.append("nickname", this.nickname);
        formData.append("trueName", this.trueName);

        formData.append("photo", this.photo);

        this.$axios({
          method: 'post',
          url: _this.$store.state.apiHref+'/user/selfEdit',
          headers: {
              "Content-Type":"multipart/form-data",
          },
          data:formData,

        }).then(function (res) {
          console.log('res',res);
          if(res.data.response_state==1){
            _this.isModify=false;
            _this.isSuccess='yes';
            let obj =JSON.parse(JSON.stringify(_this.$store.state.userBaseInfo));
            obj.nickname=res.data.nickname;
            obj.trueName=res.data.trueName;
            obj.photo=res.data.photo;
            console.log('changeUserBaseInfo');
            _this.$store.commit('changeUserBaseInfo',obj);
          }else{
            _this.isSuccess='no';
            _this.isModify=false;
          }
        }).catch(function (err) {
          console.log(err)
        })
    },

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
    outline: none;
    cursor: pointer;
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
