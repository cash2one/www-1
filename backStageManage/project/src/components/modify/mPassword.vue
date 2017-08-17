<template>
  <div class="s_bcTr">
    <div class="s_bcB">
      <ul class="s_bcC">
        <li class="logo_x">
          <span v-on:click="mShow">x</span>
        </li>
        <li class="s_bg s_bgInput">
          <label>
            <span>原始密码：</span>
            <input type="password" v-model="initialPassword">
          </label>
        </li>
        <li class="s_bg s_bgInput">
          <label>
            <span>新密码：</span>
            <input type="password" v-model="newPassword">
          </label>
        </li>
        <li class="s_bg s_bgInput">
          <label>
            <span>确认密码：</span>
            <input type="password" v-model="certainNewPassword">
          </label>
        </li>
        <li class="s_bg">
          <button class="g_btn s_btnT" @click="modifyUp" v-if="!isModify">修改</button>
          <button class="g_btn s_btnT g_btnM " v-else >修改中...</button>
          <span class="g_m g_ms" v-if="isSuccess=='yes'">修改成功</span>
          <span class="g_m g_mf" v-else-if="isSuccess=='no'">{{'修改失败:'+errMsg}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
      data(){
          return {
            initialPassword:'',
            newPassword:'',
            certainNewPassword:'',
            isSuccess:'',
            isModify:'',
            errMsg:'',
          }
      },
    methods:{
      mShow(){
        this.$store.commit('changeMPassword');
      },
      modifyUp(){
        let _this=this;
        let state=_this.dataCheck(_this.newPassword,_this.certainNewPassword);

        if(!state){
            return
        }
        _this.isModify=true;
        let formData=new FormData();
        formData.append('oldPassword',_this.initialPassword);
        formData.append('password',_this.newPassword);

        this.$axios({
          method: 'post',
          url: _this.$store.state.apiHref+'/user/changePwd',
          headers: {
            "Content-Type":"application/x-www-form-urlencoded",
          },
          data:formData,

        }).then(function (res) {
          console.log('res',res);
          if(res.data.response_state==1){
            _this.isModify=false;
            _this.isSuccess='yes';
          }else{
            _this.isModify=false;
            _this.isSuccess='no';
            _this.errMsg=res.data.response_note;
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      dataCheck(fp,sp){
          let _this=this;
         let fp1=_this.$unit.trim(fp);
         let sp1=_this.$unit.trim(sp);

         if(!fp1){
           _this.isSuccess='no';
           _this.errMsg="密码不能为空";
           return false;
         }

         if(fp1.length>18){
           _this.isSuccess='no';
           _this.errMsg="密码最大长度为18位英文字符";
           return false;
         }

         if(fp1!=sp1){
           _this.isSuccess='no';
           _this.errMsg="两次输入密码不一致";
           return false;
         }

         return true;
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
    height: 274px;
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
  .s_bgT span{
    margin-left: 20px;
  }
  .s_bgInput span{
    display: inline-block;
    width: 74px;
    text-align: right;
    font-weight: bold;
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
