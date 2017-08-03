<template>
  <div class="g_shell s_height">
    <div>
      <ul class="s_ul">
        <li class="s_li">
          <div class="s_ad_title">
            <span class="s_ad_span1">基本信息</span>
          </div>
          <div class="s_ad_right">
            <label class="s_ad_inBlock">
              <span>昵称：</span>
              <input type="text">
            </label>
            <label class="s_ad_inBlock">
              <span>手机：</span>
              <input type="text">
            </label>
            <label class="s_ad_inBlock">
              <span>微信号：</span>
              <input type="text">
            </label>
            <label class="s_ad_inBlock">
              <span>城市：</span>
              <input type="text">
            </label>
          </div>
        </li>
        <li class="s_li">
          <div class="s_ad_title">
            <span class="s_ad_span1">账户信息</span>
          </div>
          <div class="s_ad_right">
            <label class="s_ad_inBlock">
              <span>开户银行：</span>
              <input type="text">
            </label>
            <label class="s_ad_inBlock">
              <span>银行卡号：</span>
              <input type="text">
            </label>
            <label class="s_ad_inBlock">
              <span>户名：</span>
              <input type="text">
            </label>
            <label class="s_ad_inBlock">
              <span>支付宝账户：</span>
              <input type="text">
            </label>
            <label class="s_ad_inBlock">
              <span>支付宝姓名：</span>
              <input type="text">
            </label>
          </div>
        </li>
        <li class="s_li">
          <div class="s_ad_title">
            <span class="s_ad_span1">车辆信息</span>
          </div>
          <div class="s_ad_right">
            <label class="s_ad_inBlock">
              <span>车辆品牌：</span>
              <input type="text">
            </label>
            <label class="s_ad_inBlock">
              <span>购买年份：</span>
              <input type="text">
            </label>
            <label class="s_ad_inBlock">
              <span>车牌号码：</span>
              <input type="text">
            </label>
          </div>
          <div class="s_ad_right">
            <label class="s_ad_inBlock">
              <span>车型：</span>
              <div>
                <input type="radio" name="1">
                <span>平板</span>
                <input type="radio" name="1">
                <span>斜板</span>
              </div>
            </label>
            <label class="s_ad_inBlock">
              <span>载重：</span>
              <div>
                <input type="radio" name="2">
                <span>3T</span>
                <input type="radio" name="2">
                <span>4T</span>
              </div>
            </label>
            <label class="s_ad_inBlock">
              <span>车宽：</span>
              <div>
                <input type="radio" name="3">
                <span>2.3米</span>
                <input type="radio" name="3">
                <span>2.4米</span>
              </div>
            </label>
            <label class="s_ad_inBlock">
              <span>车长：</span>
              <div>
                <input type="radio" name="4">
                <span>5米</span>
                <input type="radio" name="4">
                <span>6米</span>
                <input type="radio" name="4">
                <span>7米</span>
              </div>
            </label>
          </div>
        </li>
        <li class="s_li">
          <div class="s_ad_title">
            <span class="s_ad_span1">上传照片</span>
            <span class="s_ad_span2">
              (请保持横屏拍摄,文字清晰可读）
            </span>
          </div>
          <div class="s_ad_right">
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>头像：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img src="" alt="">
              </li>
              <li class="s_btG">
                <input type="file">
                <button class="s_btn" v-sclick>选择</button>
              </li>
            </ul>
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>驾驶证：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img src="" alt="">
              </li>
              <li class="s_btG">
                <input type="file">
                <button class="s_btn" v-sclick>选择</button>
              </li>
            </ul>
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>行驶证：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img src="" alt="">
              </li>
              <li class="s_btG">
                <input type="file">
                <button class="s_btn" v-sclick>选择</button>
              </li>
            </ul>
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>保险单：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img src="" alt="">
              </li>
              <li class="s_btG">
                <input type="file">
                <button class="s_btn" v-sclick>选择</button>
              </li>
            </ul>
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>货物险：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img src="" alt="">
              </li>
              <li class="s_btG">
                <input type="file">
                <button class="s_btn" v-sclick>选择</button>
              </li>
            </ul>
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>车辆照片：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img src="" alt="">
              </li>
              <li class="s_btG">
                <input type="file">
                <button class="s_btn" v-sclick>选择</button>
              </li>
            </ul>
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>身份证正面：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img src="" alt="">
              </li>
              <li class="s_btG">
                <input type="file">
                <button class="s_btn" v-sclick>选择</button>
              </li>
            </ul>
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>身份证反面：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img src="" alt="">
              </li>
              <li class="s_btG">
                <input type="file">
                <button class="s_btn" v-sclick>选择</button>
              </li>
            </ul>
          </div>
        </li>
        <li class="s_li s_liL">
          <button class="g_btn" v-sclick>保存</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
<style scoped>
  .s_height{
    height: auto;
    font-size: 14px;
    text-align: left;
  }
  .s_li{
    background-color: #f9f9f9;
    margin: 10px;
    position: relative;
  }
  .s_liL{
    text-align: center;
    margin-bottom: 30px;
  }
  .s_liL button{
    width: 310px;
    margin: 10px 0;
  }
  .s_li div{
    display: inline-block;
  }
  .s_ad_inBlock{
    display: inline-block;
    margin: 10px 15px;
  }
  .s_ad_inBlock>span{
    display: inline-block;
    color: #666;
    width: 90px;
    text-align: right;
  }
  .s_ad_inBlock>input{
    width: 136px;
    border: 1px solid #ddd;
    padding: 0 8px;
    height: 32px;
    box-sizing: border-box;
  }
  .s_ad_inBlock>div{
    color: #666;
  }
  .s_ad_title{
    position: absolute;
    width: 90px;
    text-align: right;
    top:15px;
    left: 0;
  }
  .s_ad_right{
    margin-left: 90px;
  }
  .s_ad_title .s_ad_span1{
    font-weight: bold;
    color: #1fb5ac;
    display: block;
  }
  .s_ad_span2{
    color: #666;
    font-size: 12px;
    text-align: left;
  }
  .s_ad_imgG{
    display: inline-block;
    width: 148px;
    color: #666;
    margin:15px 20px 10px 30px;
  }
  .s_title{
    text-align: left;
  }
  .s_bg{
    height: 90px;
    background-color: white;
    border: 1px solid #ddd;
    margin-top: 10px;
  }
  .s_bg_replace{
    width: 140px ;
    height: 82px;
    margin: 2px;
    background-color:#efefef ;
  }
  .s_bg img{
    width: 140px ;
    height: 82px;
    margin: 4px 3px;
    background-color:#efefef ;
    display: block;
    float: left;
  }
  .s_btG{
    text-align: center;
  }
  .s_btG input{
    display: none;
  }
  .s_btn{
    display: inline-block;
    width: 90px;
    height: 30px;
    cursor: pointer;
    background: linear-gradient(to bottom, #f5f5f5 0%,#e1e1e1 100%);
    border: none;
    font-size: 14px;
    color: #666;
    border-radius: 4px;
    outline: none;
    padding: 6px 12px;
    box-sizing: border-box;
    margin-top: 20px;
  }
</style>
