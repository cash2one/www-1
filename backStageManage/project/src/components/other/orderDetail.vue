<template>
  <div class="s_bcTr">
    <div class="s_bcB">
      <ul class="s_bcC">
        <li class="logo_x">
          <span class="s_title">&nbsp;</span>
          <span v-on:click="mShowMBase" class="g_floatR">x</span>
        </li>
        <li class="s_bcShell g_clear">
          <div class="s_right">
            <div class="s_t">
              <span>订单信息</span>
            </div>
            <div>
              <table class="s_table">
                <tr>
                  <td class="s_tip">装车时间：</td>
                  <td>{{formData(new Date(returnAjax.createdDate))}}</td>
                  <td class="s_tip">有效时间：</td>
                  <td>{{formData(new Date(returnAjax.validDate))}}</td>
                </tr>
                <tr>
                  <td class="s_tip">起点：</td>
                  <td>{{returnAjax.fromLoc?locationFrom(returnAjax.fromLoc):''}}</td>
                  <!--//bug？不加判断会报错-->
                  <td class="s_tip">终点：</td>
                  <td>{{returnAjax.toLoc?locationTo(returnAjax.toLoc):''}}</td>
                </tr>
                <tr>
                  <td class="s_tip">单返程：</td>
                  <td>{{returnAjax.routeType}}</td>
                  <td class="s_tip">状态：</td>
                  <td>{{returnAjax.status}}</td>
                </tr>
                <tr>
                  <td class="s_tip" colspan="1">备注：</td>
                  <td colspan="3">{{returnAjax.note}}</td>
                </tr>
                <tr>
                  <td class="s_tip">距离：</td>
                  <td>{{returnAjax.distance}}</td>
                  <td class="s_tip">运费：</td>
                  <td>{{returnAjax.total}}</td>
                </tr>
                <tr>
                  <td class="s_tip" colspan="1">最新位置：</td>
                  <td colspan="3">{{returnAjax.latestLoc?(formData(new Date(returnAjax.latestLoc.createdDate))+" "+latestLoc(returnAjax.latestLoc)):''}}</td>
                </tr>
              </table>

            </div>
            <!--<div class="s_t">-->
              <!--<span>账户信息</span>-->
            <!--</div>-->
            <!--<div>-->
              <!--<table class="s_table">-->
                <!--<tr>-->
                  <!--<td class="s_tip">发布时间：</td>-->
                  <!--<td>{{returnAjax.bankName}}</td>-->
                  <!--<td class="s_tip">车型：</td>-->
                  <!--<td>{{returnAjax.bankNo}}</td>-->
                  <!--<td class="s_tip">单返程：</td>-->
                  <!--<td>{{returnAjax.bankNo}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td class="s_tip">有效时间：</td>-->
                  <!--<td>{{returnAjax.bankUser}}</td>-->
                  <!--<td class="s_tip">车重：</td>-->
                  <!--<td></td>-->
                  <!--<td class="s_tip">单价：</td>-->
                  <!--<td></td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td class="s_tip">状态：</td>-->
                  <!--<td>{{returnAjax.alipayId}}</td>-->
                  <!--<td class="s_tip">车长：</td>-->
                  <!--<td>{{returnAjax.alipayTruename}}</td>-->
                  <!--<td class="s_tip">距离：</td>-->
                  <!--<td>{{returnAjax.alipayTruename}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td class="s_tip">收货人姓名：</td>-->
                  <!--<td>{{returnAjax.bankUser}}</td>-->
                  <!--<td class="s_tip">车宽：</td>-->
                  <!--<td></td>-->
                  <!--<td class="s_tip">价格：</td>-->
                  <!--<td></td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td class="s_tip">收货人电话：</td>-->
                  <!--<td>{{returnAjax.bankUser}}</td>-->
                  <!--<td class="s_tip">起始位置：</td>-->
                  <!--<td></td>-->
                  <!--<td class="s_tip">预付款：</td>-->
                  <!--<td></td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td class="s_tip">备注：</td>-->
                  <!--<td>{{returnAjax.bankUser}}</td>-->
                  <!--<td class="s_tip">到达位置：</td>-->
                  <!--<td></td>-->
                  <!--<td class="s_tip">支付方式：</td>-->
                  <!--<td></td>-->
                <!--</tr>-->
              <!--</table>-->
            <!--</div>-->
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['orderId'],
    created(){
      let _this = this;
      this.$axios({
        method: 'get',
        url: _this.$store.state.apiHref + '/order/view/' + _this.orderId,
      }).then(function (res) {
        if (res.data.response_state == 1) {
          _this.returnAjax = res.data;
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
      locationFrom(val){
        return (val.province?val.province:'')+(val.city?val.city:'')+ (val.county?val.county:'')+(val.address?val.address:'');
      },
      locationTo(val){
        return (val.province?val.province:'')+(val.city?val.city:'')+ (val.county?val.county:'')+(val.address?val.address:'');
      },
      latestLoc(val){
        return (val.province?val.province:'')+(val.city?val.city:'')+ (val.county?val.county:'')+(val.address?val.address:'');
      },
      mShowMBase(){
        this.$store.commit('changeShowOrderDetail');
      },
      changeState(val){
        document.getElementById(val).click();
      },
      formData(data){
//            console.log(data);
        return this.$unit.formData.call(data, "yyyy-MM-dd hh:mm:ss");
      },
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
    width: 100%;
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
