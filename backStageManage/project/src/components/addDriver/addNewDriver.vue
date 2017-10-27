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
              <input type="text" v-model="nickname">
            </label>
            <label class="s_ad_inBlock" v-if="!driverId">
              <span>手机：</span>
              <input type="text" v-model="username">
            </label>
            <label class="s_ad_inBlock">
              <span>微信号：</span>
              <input type="text" v-model="weixin">
            </label>
            <label class="s_ad_inBlock">
              <span>城市：</span>
              <input type="text" v-model="city">
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
              <input type="text" v-model="bankName">
            </label>
            <label class="s_ad_inBlock">
              <span>银行卡号：</span>
              <input type="text" v-model="bankNo">
            </label>
            <label class="s_ad_inBlock">
              <span>户名：</span>
              <input type="text" v-model="bankUser">
            </label>
            <label class="s_ad_inBlock">
              <span>支付宝账户：</span>
              <input type="text" v-model="alipayId">
            </label>
            <label class="s_ad_inBlock">
              <span>支付宝姓名：</span>
              <input type="text" v-model="alipayTruename">
            </label>
          </div>
        </li>
        <li class="s_li">
          <div class="s_ad_title">
            <span class="s_ad_span1">车辆信息</span>
          </div>
          <div class="s_ad_right">
            <!--<label class="s_ad_inBlock">-->
              <!--<span>生产厂家：</span>-->
              <!--<input type="text" v-model="brand">-->
            <!--</label>-->
            <!--<label class="s_ad_inBlock">-->
              <!--<span>购买年份：</span>-->
              <!--<input type="text" v-model="buyDate">-->
            <!--</label>-->
            <label class="s_ad_inBlock">
              <span>车牌号码：</span>
              <input type="text" v-model="number">
            </label>
          </div>
          <!--<div class="s_ad_right">-->
            <!--<label class="s_ad_inBlock">-->
              <!--<span>车宽：</span>-->
              <!--<input type="text" v-model="width">-->
            <!--</label>-->
            <!--<label class="s_ad_inBlock">-->
              <!--<span>车长：</span>-->
              <!--<input type="text" v-model="length">-->
            <!--</label>-->
            <!--<label class="s_ad_inBlock">-->
              <!--<span>车型：</span>-->
              <!--<v-select :obj="obj" :shape="shape" @changeValue="changeValue"></v-select>-->
            <!--</label>-->
          <!--</div>-->
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
                <img :src="photo?localphoto:(imgUrl+returnAjax.photo)" :alt="altWord">
              </li>
              <li class="s_btG">
                <input type="file" id="add_photo" @change="inputChange('photo',$event)">
                <button class="s_btn" @click="choseImg('add_photo')" v-sclick>选择</button>
              </li>
            </ul>
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>驾驶证：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img :src="driverLicense?localdriverLicense:(imgUrl+returnAjax.driverLicense)" :alt="altWord">
              </li>
              <li class="s_btG">
                <input type="file" id="add_driverLicense" @change="inputChange('driverLicense',$event)">
                <button class="s_btn" @click="choseImg('add_driverLicense')" v-sclick>选择</button>
              </li>
            </ul>
            <!--<ul class="s_ad_imgG">-->
              <!--<li class="s_title">-->
                <!--<span>行驶证：</span>-->
              <!--</li>-->
              <!--<li class="s_bg">-->
                <!--&lt;!&ndash;<div class="s_bg_replace"></div>&ndash;&gt;-->
                <!--<img :src="drivingLicense?localdrivingLicense:(imgUrl+returnAjax.drivingLicense)" :alt="altWord">-->
              <!--</li>-->
              <!--<li class="s_btG">-->
                <!--<input type="file" id="add_drivingLicense" @change="inputChange('drivingLicense',$event)">-->
                <!--<button class="s_btn" @click="choseImg('add_drivingLicense')" v-sclick>选择</button>-->
              <!--</li>-->
            <!--</ul>-->
            <!--<ul class="s_ad_imgG">-->
              <!--<li class="s_title">-->
                <!--<span>保险单：</span>-->
              <!--</li>-->
              <!--<li class="s_bg">-->
                <!--&lt;!&ndash;<div class="s_bg_replace"></div>&ndash;&gt;-->
                <!--<img :src="carInsurance?localcarInsurance:(imgUrl+returnAjax.carInsurance)" :alt="altWord">-->
              <!--</li>-->
              <!--<li class="s_btG">-->
                <!--<input type="file" id="add_carInsurance" @change="inputChange('carInsurance',$event)">-->
                <!--<button class="s_btn" @click="choseImg('add_carInsurance')" v-sclick>选择</button>-->
              <!--</li>-->
            <!--</ul>-->
            <!--<ul class="s_ad_imgG">-->
              <!--<li class="s_title">-->
                <!--<span>货物险：</span>-->
              <!--</li>-->
              <!--<li class="s_bg">-->
                <!--&lt;!&ndash;<div class="s_bg_replace"></div>&ndash;&gt;-->
                <!--<img :src="cargoInsurance?localcargoInsurance:(imgUrl+returnAjax.cargoInsurance)" :alt="altWord">-->
              <!--</li>-->
              <!--<li class="s_btG">-->
                <!--<input type="file" id="add_cargoInsurance" @change="inputChange('cargoInsurance',$event)">-->
                <!--<button class="s_btn" @click="choseImg('add_cargoInsurance')" v-sclick>选择</button>-->
              <!--</li>-->
            <!--</ul>-->
            <!--<ul class="s_ad_imgG">-->
              <!--<li class="s_title">-->
                <!--<span>车辆照片：</span>-->
              <!--</li>-->
              <!--<li class="s_bg">-->
                <!--&lt;!&ndash;<div class="s_bg_replace"></div>&ndash;&gt;-->
                <!--<img :src="carPhoto?localcarPhoto:(imgUrl+returnAjax.car.photo)" :alt="altWord">-->
              <!--</li>-->
              <!--<li class="s_btG">-->
                <!--<input type="file" id="add_carPhoto" @change="inputChange('carPhoto',$event)">-->
                <!--<button class="s_btn" @click="choseImg('add_carPhoto')" v-sclick>选择</button>-->
              <!--</li>-->
            <!--</ul>-->
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>身份证正面：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img :src="idCardFront?localidCardFront:(imgUrl+returnAjax.idCardFront)" :alt="altWord">
              </li>
              <li class="s_btG">
                <input type="file" id="add_idCardFront" @change="inputChange('idCardFront',$event)">
                <button class="s_btn" @click="choseImg('add_idCardFront')" v-sclick>选择</button>
              </li>
            </ul>
            <ul class="s_ad_imgG">
              <li class="s_title">
                <span>身份证反面：</span>
              </li>
              <li class="s_bg">
                <!--<div class="s_bg_replace"></div>-->
                <img :src="idCardBack?localidCardBack:(imgUrl+returnAjax.idCardBack)" :alt="altWord">
              </li>
              <li class="s_btG">
                <input type="file" id="add_idCardBack" @change="inputChange('idCardBack',$event)">
                <button class="s_btn" @click="choseImg('add_idCardBack')" v-sclick>选择</button>
              </li>
            </ul>
          </div>
        </li>
        <li class="s_li s_liL">
          <button class="g_btn" v-if="!isSaving" v-on:click="submitValue">保存</button>
          <button class="g_btn g_btnM" v-else>保存中...</button>
          <span v-if="errMsg=='suc'" class="g_ms">保存成功</span>
          <span v-else-if="errMsg" class="g_mf">{{errMsg}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import select from '../other/select.vue';
  import bus from '../eventBus';

  export default {
    props: ['driverId'],
    created(){
      let _this = this;
      if (this.driverId) {
        this.$axios({
          method: 'get',
          url: _this.$store.state.apiHref + '/driver/view/' + _this.driverId,
        }).then(function (res) {
          if (res.data.response_state == 1) {
            if (!res.data.car) {
              res.data.car = {};
            }
            _this.returnAjax = res.data;
            _this.username = res.data.username;//手机号
            _this.nickname = res.data.nickname;//昵称
            _this.weixin = res.data.weixin;//微信
            _this.city = res.data.city;//城市
            _this.bankName = res.data.bankName;//开户银行
            _this.bankNo = res.data.bankNo;//银行卡号
            _this.bankUser = res.data.bankUser;//户名
            _this.alipayId = res.data.alipayId;//支付宝账号
            _this.alipayTruename = res.data.alipayTruename//支付宝姓名
            _this.brand = _this.$unit.isUndefined(res.data.car.brand)?'':res.data.car.brand;//生产厂家
            _this.buyDate = _this.$unit.isUndefined(res.data.car.buyDate)?'':res.data.car.buyDate;//购买日期
            _this.number = _this.$unit.isUndefined(res.data.car.number)?'':res.data.car.number;//车牌号
            _this.shape = _this.$unit.isUndefined(res.data.car.shape)?'':res.data.car.shape;//车型
            _this.width = _this.$unit.isUndefined(res.data.car.width)?'':res.data.car.width;//板宽
            _this.length = _this.$unit.isUndefined(res.data.car.length)?'':res.data.car.length;//板长
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
      }
    },
    data(){
      return {
        altWord:'请选择图片',
        isSaving: false,//是否正在修改
        errMsg: '',//显示信息
        id: '',//修改时传
        username: '',//手机号
        nickname: '',//昵称
        weixin: '',//微信
        city: '',//城市
        bankName: '',//开户银行
        bankNo: '',//银行卡号
        bankUser: '',//户名
        alipayId: '',//支付宝账号
        alipayTruename: '',//支付宝姓名
        brand: '',//生产厂家
        buyDate: '',//购买日期
        number: '',//车牌号
        shape: '',//车型
        width: '',//板宽
        length: '',//板长
        photo: '',//个人头像
        localphoto: '',//个人头像
        driverLicense: '',//驾驶证
        localdriverLicense: '',//驾驶证
        drivingLicense: '',//行驶证
        localdrivingLicense: '',//行驶证
        carInsurance: '',//车险carInsurance
        localcarInsurance: '',//车险
        cargoInsurance: '',//货物险
        localcargoInsurance: '',//货物险
        carPhoto: '',//车照片
        localcarPhoto: '',//车照片
        idCardFront: '',//身份证正面
        localidCardFront: '',//身份证正面
        idCardBack: '',//身份证反面
        localidCardBack: '',//身份证反面
        obj: {
          class: 's_select',//传给input的属性
          list: [
            {
              text: '蓝牌标准',
              value: '',
            },
            {
              text: '蓝牌加长',
              value: '',
            },
            {
              text: '黄牌三吨落地',
              value: '',
            },
            {
              text: '黄牌三吨斜板',
              value: '',
            },
            {
              text: '黄牌三吨厢式改装',
              value: '',
            },
            {
              text: '黄牌三吨厢式改装',
              value: '',
            },
            {
              text: '五吨落地',
              value: '',
            },
            {
              text: '五吨斜板',
              value: '',
            },
            {
              text: '五吨厢式原装',
              value: '',
            },
            {
              text: '五吨厢式改装',
              value: '',
            },
            {
              text: '上下位俩位板',
              value: '',
            },
            {
              text: '前后位俩位板',
              value: '',
            },
            {
              text: '四位板',
              value: '',
            },
          ],//要遍历的数组
        },
        returnAjax: {
          car: {}
        }
      }
    },
    components: {
      'v-select': select,
    },
    methods: {
      changeValue(value){
        console.log(value);
        this.shape = value;
      },
      choseImg(value){
        document.getElementById(value).click();
      },
      inputChange(value, event){
        let dom = event.target;
        let _this = this;
        if (!dom.files[0]) {
          _this[value] = '';
          return;
        }
        ;
        _this[value] = dom.files[0];

        let url = this.$unit.createObjectURL(dom.files[0]);
        _this['local' + value] = url;

      },
      clearValue(){
        this.username = ''//手机号
        this.nickname = ''//昵称
        this.weixin = ''//微信
        this.city = ''//城市
        this.bankName = ''//开户银行
        this.bankNo = ''//银行卡号
        this.bankUser = ''//户名
        this.alipayId = ''//支付宝账号
        this.alipayTruename = ''//支付宝姓名
        this.brand = ''//生产厂家
        this.buyDate = ''//购买日期
        this.number = ''//车牌号
        this.shape = ''//车型
        this.width = ''//板宽
        this.length = ''//板长
        this.photo = ''//个人头像
        this.localphoto = ''//个人头像
        this.driverLicense = ''//驾驶证
        this.localdriverLicense = ''//驾驶证
        this.drivingLicense = ''//行驶证
        this.localdrivingLicense = ''//行驶证
        this.carInsurance = ''//车险carInsurance
        this.localcarInsurance = ''//车险
        this.cargoInsurance = ''//货物险
        this.localcargoInsurance = ''//货物险
        this.carPhoto = ''//车照片
        this.localcarPhoto = ''//车照片
        this.idCardFront = ''//身份证正面
        this.localidCardFront = ''//身份证正面
        this.idCardBack = ''//身份证反面
        this.localidCardBack = ''//身份证反面
        bus.$emit('resetValue')//select组件
      },
      showMsg(str){
        this.errMsg = str;
      },
      submitValue(){
        let _this = this;
        let formData = new FormData();
//车牌限制
//        if(!_this.$unit.isLicenseNo(_this.number)){
//          _this.showMsg('请输入合法车牌号');
//          return
//        }
        _this.isSaving = true;

        if (_this.driverId) {
          formData.append('id', _this.driverId)
        }
        formData.append('username', this.username)
        formData.append('nickname', this.nickname)
        formData.append('weixin', this.weixin)
        formData.append('city', this.city)
        formData.append('detail.bankName', this.bankName)
        formData.append('detail.bankNo', this.bankNo)
        formData.append('detail.bankUser', this.bankUser)
        formData.append('detail.alipayId', this.alipayId)
        formData.append('detail.alipayTruename', this.alipayTruename)
        formData.append('car.brand', this.brand)
        formData.append('car.buyDate', this.buyDate)
        formData.append('car.number', this.number)
        formData.append('car.shape', this.shape)
        formData.append('car.width', this.width)
        formData.append('car.length', this.length)
        formData.append('photo', this.photo)
        formData.append('driverLicense', this.driverLicense)
        formData.append('drivingLicense', this.drivingLicense)
        formData.append('carInsurance', this.carInsurance)
        formData.append('cargoInsurance', this.cargoInsurance)
        formData.append('car.photo', this.carPhoto)
        formData.append('idCardFront', this.idCardFront)
        formData.append('idCardBack', this.idCardBack)

        this.$axios({
          method: 'post',
          url: _this.$store.state.apiHref + '/driver/saveByManager',
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        }).then(function (res) {
          console.log(res.data);
          _this.isSaving = false;
          if (res.data.response_state == 1) {
            _this.clearValue();
            _this.showMsg('suc');


            if (_this.driverId) {
              _this.$store.commit('changeShowModify');
              _this.$emit('upData');
            }
          } else {
            _this.showMsg(res.data.response_note);
          }
        }).catch(function (err) {
          console.log(err)
        })

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
  .s_height {
    height: auto;
    font-size: 14px;
    text-align: left;
  }

  .s_li {
    background-color: #f9f9f9;
    margin: 10px;
    position: relative;
  }

  .s_liL {
    text-align: center;
    margin-bottom: 30px;
  }

  .s_liL button {
    width: 310px;
    margin: 10px 0;
  }

  .s_li div {
    display: inline-block;
  }

  .s_ad_inBlock {
    display: inline-block;
    margin: 10px 15px;
  }

  .s_ad_inBlock > span {
    display: inline-block;
    color: #666;
    width: 90px;
    text-align: right;
  }

  .s_ad_inBlock > input {
    width: 136px;
    border: 1px solid #ddd;
    padding: 0 8px;
    height: 32px;
    box-sizing: border-box;
  }

  .s_ad_inBlock > div {
    color: #666;
  }

  .s_ad_title {
    position: absolute;
    width: 90px;
    text-align: right;
    top: 15px;
    left: 0;
  }

  .s_ad_right {
    margin-left: 90px;
  }

  .s_ad_title .s_ad_span1 {
    font-weight: bold;
    color: #1fb5ac;
    display: block;
  }

  .s_ad_span2 {
    color: #666;
    font-size: 12px;
    text-align: left;
  }

  .s_ad_imgG {
    display: inline-block;
    width: 148px;
    color: #666;
    margin: 15px 20px 10px 30px;
  }

  .s_title {
    text-align: left;
  }

  .s_bg {
    height: 90px;
    background-color: white;
    border: 1px solid #ddd;
    margin-top: 10px;
  }

  .s_bg_replace {
    width: 140px;
    height: 82px;
    margin: 2px;
    background-color: #efefef;
  }

  .s_bg img {
    width: 140px;
    height: 82px;
    margin: 4px 3px;
    background-color: #efefef;
    display: block;
    float: left;
    line-height: 82px;
    text-align: center;
    border: none;
    position: relative;
  }

  .s_bg img:after{
    content: " ";
    display: block;
    width: 100%;
    height: 100%;
    background-color: #efefef;
    top: 0;
    position: absolute;
    left: 0;
  }

  .s_btG {
    text-align: center;
  }

  .s_btG input {
    display: none;
  }

  .s_btn {
    display: inline-block;
    width: 90px;
    height: 30px;
    cursor: pointer;
    background: linear-gradient(to bottom, #f5f5f5 0%, #e1e1e1 100%);
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
