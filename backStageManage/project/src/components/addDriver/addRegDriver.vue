<template>
  <div class="g_shell">
    <div class="contain">
      <span class="s_left float_l">基本信息</span>
      <div class="s_right float_l">
        <ul>
          <li class="s_li">
            <span class="s_title s_t1">手机：</span>
            <input class="s_input" type="text" v-model="phone">
            <span v-if="!errMsg" class="s_tail">(请输入已注册的手机号码，点添加按钮，该司机就归属为你的公司)</span>
            <span class="s_tail s_warn" v-else>{{errMsg}}</span>
          </li>
          <li class="s_li">
            <span class="s_title">验证码：</span>
            <input class="s_input" type="text" v-model="code">
            <span class="s_tail_c" @click="getCode">点击获取验证码</span>
          </li>
          <li>
            <button class="g_btn s_bt" v-if="!adding" @click="addDriver">添加</button>
            <button class="g_btn s_bt" v-else>添加中...</button>
            <span class="s_warn s_tip" v-if="errMsg1">{{errMsg1}}</span>
            <span class="s_suc s_tip" v-else-if="errMsg1=='suc'">添加成功</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        phone: '',
        code: '',
        errMsg: '',
        adding: false,
        errMsg1: '',
      }
    },
    methods: {
      getCode(){
        let result = this.checkPhoneNmuber(this.phone);
        let _this = this;
        if (!result) {
          this.errMsg = '请输入正确的手机号码';
          return
        } else {
          this.errMsg = '';
        }
        let formData = new FormData;
        formData.append('mobile', this.phone);

        this.$axios({
          method: 'post',
          url: this.$store.state.apiHref + '/sms/verifyCode',
          data: formData,
        }).then(function (res) {
          if (res.data.response_state != 1) {
            _this.errMsg = res.data.response_note;
          } else {
            _this.errMsg = '';
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      checkPhoneNmuber(num){
        num = this.$unit.trim(num);
        return /^\d{11}$/ig.test(num);
      },
      addDriver(){
          let _this=this;
        if(!this.code){
            this.errMsg1='请输入验证码';
          return
        }else {
            this.errMsg1='';
        }

        let formData = new FormData;
        formData.append('mobile', this.phone);
        formData.append('verifyCode', this.code);

        this.$axios({
          method: 'post',
          url: this.$store.state.apiHref + '/driver/addExistsUser',
          data: formData,
        }).then(function (res) {
          if (res.data.response_state != 1) {
            _this.errMsg1 = res.data.response_note;
          } else {
            _this.errMsg1 = 'suc';
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>

  .contain {
    margin: 10px;
    background-color: #f9f9f9;
    height: 146px;
    position: relative;
    font-size: 14px;
    text-align: left;
  }

  .s_li {
    margin: 10px 0 10px 10px;
  }

  .s_left {
    width: 100px;
    color: #1fb5ac;
    text-align: center;
    height: 100%;
    padding-top: 15px;
    box-sizing: border-box;
    font-weight: bold;
    padding-left: 10px;
  }

  .s_title {
    font-weight: bold;
    color: #666;
    vertical-align: middle;
  }

  .s_t1 {
    padding-left: 14px;
  }

  .s_input {
    width: 200px;
    border: 1px solid #ddd;
    padding: 0 8px;
    vertical-align: middle;
    height: 32px;
    line-height: 32px;
  }

  .s_tail {
    margin-left: 6px;
    font-size: 12px;
    font-weight: bold;
    vertical-align: middle;
    color: #666666;
  }

  .s_tail_c {
    color: #337ab7;
    cursor: pointer;
  }

  .s_tail_c:hover {
    text-decoration: underline;
  }

  .s_bt {
    width: 114px;
    height: 34px;
    margin-left: 70px;
  }

  .s_warn {
    color: #cc1419;
  }
  .s_suc{
    color: #07f922;
  }
  .s_tip{
    padding: 110px;
    font-size: 12px;
  }
</style>
