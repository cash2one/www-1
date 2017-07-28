<template>
  <div class="g_shell">
    <div class="contain">
      <span class="s_left float_l">基本信息</span>
      <div class="s_right float_l">
        <ul>
          <li class="s_li">
            <span class="s_title s_t1">手机：</span>
            <input class="s_input" type="text">
            <span class="s_tail">(请输入已注册的手机号码，点添加按钮，该司机就归属为你的公司）</span>
          </li>
          <li class="s_li">
            <span class="s_title">验证码：</span>
            <input class="s_input" type="text">
            <span class="s_tail_c">点击获取验证码</span>
          </li>
          <li>
            <button class="g_btn s_bt">添加</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default{

}
</script>
<style scoped>

  .contain{
    margin: 10px;
    background-color:#f9f9f9 ;
    height: 146px;
    position: relative;
    font-size: 14px;
    text-align: left;
  }
  .s_li{
    margin: 10px 0 10px 10px;
  }
  .s_left{
    width: 100px;
    color:#1fb5ac ;
    text-align: center;
    height: 100%;
    padding-top: 15px;
    box-sizing: border-box;
    font-weight: bold;
    padding-left: 10px;
  }
  .s_title{
    font-weight: bold;
    color: #666;
    vertical-align: middle;
  }
  .s_t1{
    padding-left: 14px;
  }
  .s_input{
    width: 200px;
    border: 1px solid #ddd;
    padding: 0 8px;
    vertical-align: middle;
    height: 32px;
    line-height: 32px;
  }
  .s_tail{
    margin-left: 6px;
    font-size: 12px;
    font-weight: bold;
    vertical-align: middle;
    color: #666666;
  }
  .s_tail_c{
    color: #337ab7;
    cursor: pointer;
  }
  .s_tail_c:hover{
    text-decoration: underline;
  }
  .s_bt{
    width: 114px;
    height: 34px;
    margin-left: 70px;
  }
</style>
