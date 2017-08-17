<template>
  <div class="s_bcTr">
    <div class="s_bcB">
      <ul class="s_bcC">
        <li class="logo_x">
          <span class="s_title">用户信息</span>
          <span v-on:click="mShowMBase" class="g_floatR">x</span>
        </li>
        <li class="s_bcShell g_clear">
          <div class="s_left">
            <img :src="imgUrl+returnAjax.photo" alt="" class="s_left_img">
          </div>
          <div class="s_right">
            <div class="s_t">
              <span>基本信息</span>
            </div>
            <div>
              <table class="s_table">
                <tr>
                  <td class="s_tip">用户名：</td>
                  <td>{{returnAjax.username}}</td>
                  <td class="s_tip">昵称：</td>
                  <td>{{returnAjax.nickname}}</td>
                </tr>
                <tr>
                  <td class="s_tip">微信：</td>
                  <td>{{returnAjax.weixin}}</td>
                  <td class="s_tip">银行卡号：</td>
                  <td>{{returnAjax.bankNo}}</td>
                </tr>
              </table>
            </div>
            <div class="s_t">
              <span>账户信息</span>
            </div>
            <div>
              <table class="s_table">
                <tr>
                  <td class="s_tip">开户银行：</td>
                  <td>{{returnAjax.bankName}}</td>
                  <td class="s_tip">银行卡号：</td>
                  <td>{{returnAjax.bankNo}}</td>
                </tr>
                <tr>
                  <td class="s_tip">户名：</td>
                  <td>{{returnAjax.bankUser}}</td>
                  <td class="s_tip"></td>
                  <td></td>
                </tr>
                <tr>
                  <td class="s_tip">支付宝账号：</td>
                  <td>{{returnAjax.alipayId}}</td>
                  <td class="s_tip">支付宝姓名：</td>
                  <td>{{returnAjax.alipayTruename}}</td>
                </tr>
              </table>
            </div>
            <div class="s_t">
              <span>车辆信息</span>
            </div>
            <div>
              <table class="s_table">
                <tr>
                  <!--<td class="s_tip">生产厂家：</td>-->
                  <!--<td>{{returnAjax.car.brand}}</td>-->
                  <td class="s_tip">车牌：</td>
                  <td>{{returnAjax.car.number}}</td>
                  <td class="s_tip"></td>
                  <td></td>
                </tr>
                <!--<tr>-->
                <!--<td class="s_tip">车型：</td>-->
                <!--<td>{{returnAjax.car.shape}}</td>-->
                <!--<td class="s_tip">车长：</td>-->
                <!--<td>{{returnAjax.car.length}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                <!--<td class="s_tip">载重：</td>-->
                <!--<td>{{returnAjax.car.no}}</td>-->
                <!--<td class="s_tip">车宽：</td>-->
                <!--<td>{{}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                <!--<td class="s_tip">购买日期：</td>-->
                <!--<td>{{returnAjax.buyDate}}</td>-->
                <!--<td class="s_tip"></td>-->
                <!--<td></td>-->
                <!--</tr>-->
              </table>
            </div>
          </div>
        </li>
        <li class="s_imgGroup s_bcShell">
          <ul class="s_btnGroup g_clear" v-sChangeColor="'s_clickC'">
            <li style="display: none" ></li>
            <li class="s_clickC" v-on:click="changeState('identifyID')">身份证</li>
            <li v-on:click="changeState('driverID')">驾驶证</li>
            <li v-on:click="changeState('drivingID')">行驶证</li>
            <li v-on:click="changeState('carInsurance')">车险</li>
            <li v-on:click="changeState('cargoInsurance')">货物险</li>
          </ul>
          <div v-sChangeColor="'s_display'">
            <div style="display: none"></div>
            <div class="s_changeImageG s_identifyID s_display" id="identifyID">
              <img v-if="returnAjax.idCardFront" :src="imgUrl+returnAjax.idCardFront" alt="">
              <img v-if="returnAjax.idCardBack" :src="imgUrl+returnAjax.idCardBack" alt="">
            </div>
            <div class="s_changeImageG" id="driverID">
              <img v-if="returnAjax.driverLicense" :src="imgUrl+returnAjax.driverLicense" alt="">
            </div>
            <div class="s_changeImageG" id="drivingID">
              <img v-if="returnAjax.drivingLicense" :src="imgUrl+returnAjax.drivingLicense" alt="">
            </div>
            <div class="s_changeImageG" id="carInsurance">
              <img v-if="returnAjax.carInsurance" :src="imgUrl+returnAjax.carInsurance" alt="">
            </div>
            <div class="s_changeImageG" id="cargoInsurance">
              <img v-if="returnAjax.cargoInsurance" :src="imgUrl+returnAjax.cargoInsurance" alt="">
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['driverId'],
    created(){
      let _this = this;
      this.$axios({
        method: 'get',
        url: _this.$store.state.apiHref + '/driver/view/' + _this.driverId,
      }).then(function (res) {
        if (res.data.response_state == 1) {
          if (!res.data.car) {
            res.data.car = {};
          }
//            _this.returnAjax = res.data;
//            _this.username = res.data.username;//手机号
//            _this.nickname = res.data.nickname;//昵称
//            _this.weixin = res.data.weixin;//微信
//            _this.city = res.data.city;//城市
//            _this.bankName = res.data.bankName;//开户银行
//            _this.bankNo = res.data.bankNo;//银行卡号
//            _this.bankUser = res.data.bankUser;//户名
//            _this.alipayId = res.data.alipayId;//支付宝账号
//            _this.alipayTruename = res.data.alipayTruename//支付宝姓名
          res.data.car.brand = _this.$unit.isUndefined(res.data.car.brand) ? '' : res.data.car.brand;//生产厂家
          res.data.car.buyDate = _this.$unit.isUndefined(res.data.car.buyDate) ? '' : res.data.car.buyDate;//购买日期
          res.data.car.number = _this.$unit.isUndefined(res.data.car.number) ? '' : res.data.car.number;//车牌号
          res.data.car.shape = _this.$unit.isUndefined(res.data.car.shape) ? '' : res.data.car.shape;//车型
          res.data.car.width = _this.$unit.isUndefined(res.data.car.width) ? '' : res.data.car.width;//板宽
          res.data.car.length = _this.$unit.isUndefined(res.data.car.length) ? '' : res.data.car.length;//板长
          _this.returnAjax = res.data;
//                _this.photo = res.data.//个人头像
//                _this.localphoto = res.data.//个人头像
//                _this.driverLicense = res.data.//驾驶证
//                _this.localdriverLicense = res.data.//驾驶证
//                _this.drivingLicense = res.data.//行驶证
//                _this.localdrivingLicense = res.data.//行驶证
//                _this.carInsurance = res.data.//车险carInsurance
//                _this.localcarInsurance = res.data.//车险
//                _this.cargoInsurance = res.data.//货物险
//                _this.localcargoInsurance = res.data.//货物险
//                _this.carPhoto = res.data.//车照片
//                _this.localcarPhoto = res.data.//车照片
//                _this.idCardFront = res.data.//身份证正面
//                _this.localidCardFront = res.data.//身份证正面
//                _this.idCardBack = res.data.//身份证反面
//                _this.localidCardBack = res.data.//身份证反面

        }
      })
    },
    data(){
      return {
        returnAjax: {
          car: {}
        },
        identifyID:true,
        driverID:false,
        drivingID:false,
        carInsurance:false,
        cargoInsurance:false,
      }
    },
    methods: {
      mShowMBase(){
        this.$store.commit('changeShowDetail');
      },
      changeState(val){
          document.getElementById(val).click();
      }
    },
    computed: {
      imgUrl: function () {
        return this.$store.state.imgUrl;
      },
    }
  }
</script>
<style scoped>
  .s_bcTr {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(58, 58, 58, 0.53);
    z-index: 1;
    /*display: flex;*/
    justify-content: center;
    align-items: center;
    text-align: left;
    font-size: 14px;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .s_bcB {
    width: 860px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
    margin: 50px auto;
  }

  .s_bcC {
    padding-bottom: 30px;
    padding-top: 10px;
  }

  .logo_x {
    text-align: center;
    font-weight: bold;
    color: #666;
    font-size: 20px;
    /*margin-right: 20px;*/
    margin-top: 10px;
    position: relative;
  }

  .s_title {
    font-size: 14px;
    font-weight: 500;
  }

  .logo_x .g_floatR {
    cursor: pointer;
    margin-right: 20px;
    position: absolute;
    right: 0;
    top: 0;
  }

  .s_left {
    float: left;
    width: 220px;
    position: relative;
    height: 300px;
  }

  .s_left_img {
    position: absolute;
    top: 0;
    left: 50px;
    width: 100px;
    height: 100px;
  }

  .s_bcShell {
    margin: 20px 60px 0;
  }

  .s_right {
    float: left;
    width: 520px;
  }

  .s_t {
    height: 36px;
    line-height: 36px;
    font-weight: bold;
    background-color: #f9f9f9;
    font-size: 14px;
    text-align: left;
    text-indent: 2em;
    color: #1fb5ac;
  }

  .s_table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 20px;
  }

  .s_table td {
    border: 1px solid #ddd;
    text-align: left;
    width: 128px;
    height: 30px;
    line-height: 30px;
    padding-left: 4px;
  }

  td.s_tip {
    background-color: #f5f5f5;
    text-align: right;
  }

  .s_btnGroup {
    margin-left: 20px;
    margin-bottom: 20px;
  }

  .s_btnGroup li {
    float: left;
    margin-left: 4px;
    padding: 10px 15px;
    border-radius: 4px;
    color: #337ab7;
    cursor: pointer;
  }

  .s_btnGroup li:hover {
    background-color: #e2e2e2;
  }

  .s_btnGroup li.s_clickC {
    background-color: #33b0b7;
    color: white;
  }

  .s_changeImageG {
    min-height: 300px;
    border: 1px solid #cccccc;
    display: none;

  }
  .s_changeImageG img{
    width: 500px;
    height: 400px;
    padding: 20px;
  }
  .s_identifyID img{
    width: 320px;
    height: 200px;
    padding-right: 10px;
  }
  .s_display{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
