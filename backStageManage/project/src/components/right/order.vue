<template>
  <div class="s_shell">
    <ul class="s_title" v-sChangeColor="'s_titleColor'">
      <li style="display: none"></li>
      <li class="s_titleColor" v-on:click="changeState('cityOrder')">
        <span>调度城市订单</span>
      </li>
      <li v-on:click="changeState('mySendOrder')">
        <span>我发的单</span>
      </li>
      <li v-on:click="changeState('myRobOrder')">
        <span>我抢的单</span>
      </li>

    </ul>
    <div class="s_search">
      <ul>
        <li class="s_labelG">
          <label>
            <span>状态：</span>
            <span>
              <!--<input class="s_input" type="text">-->
              <v-select class="s_outDiv" :obj="obj" :shape="status" @changeValue="changeValue"></v-select>
            </span>
          </label>
          <label v-if="!cityOrder" for="none">
            <span>起点：</span>
            <span>
              <v-select class="s_outDiv" :obj="objStartProvince"  @changeValue="changeValue"></v-select>
            </span>
            <span>
              <v-select class="s_outDiv" :obj="objStartCity"  @changeValue="changeValue"></v-select>
            </span>
          </label>
          <label for="none">
            <span>终点：</span>
            <span>
              <v-select class="s_outDiv" :obj="objEndProvince"  @changeValue="changeValue"></v-select>
            </span>
            <span>
              <v-select class="s_outDiv" :obj="objEndCity"  @changeValue="changeValue"></v-select>
            </span>
          </label>
          <label>
            <span>下单日期：</span>
            <span class="s_inputBackground">
              <!--<input class="s_input s_inputW" type="text">-->
              <!--<datepicker :wrapper-class="'s_outDiv'"-->
              <!--:input-class="'g_input g_inputW'"-->
              <!--:clear-button="false"-->
              <!--:calendar-button="false"-->
              <!--:disabled-picker="false"-->
              <!--:format="'yyyy-M-dd'"-->
              <!--:initial-view="'day'"-->

              <!--language="zh"></datepicker>-->
              <flat-pickr class="s_input s_inputW"
                          v-model="orderBegin"
                          :config="config"
              ></flat-pickr>
            </span>
            <span>至</span>
            <span class="s_inputBackground">
              <flat-pickr class="s_input s_inputW"
                          v-model="orderEnd"
                          :config="config"
              ></flat-pickr>
            </span>
          </label>
        </li>
        <li class="s_btnG">
          <button class="g_btn s_sBtn" v-on:click="search">搜索</button>
        </li>
      </ul>
    </div>
    <div class="s_table">
      <table>
        <thead>
        <tr>
          <th>序号</th>
          <th>创建时间</th>
          <th>起始位置</th>
          <th>到达位置</th>
          <th>运费</th>
          <!--<th>客服备注</th>-->
          <th>状态</th>
          <th>其他</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in ajaxData">
          <td>{{showIndex(index,item)}}</td>
          <td>{{item.createdDate?formData(new Date(item.createdDate)):''}}</td>
          <td>{{locationFrom(item)}}</td>
          <td>{{locationTo(item)}}</td>
          <td>{{item.total}}</td>
          <!--<td>{{item.note}}</td>-->
          <td>{{statusTransform(item.status)}}</td>
          <td>
            <button v-on:click="changeShowOrderDetail(item.id)">详情</button>
          </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td class="tf" colspan="8">
            <span>共</span><span>{{totalElement}}</span><span>条，每页</span><input type="text" v-model="pageSize"
                                                                               class="s-input"><span>条，第</span>
            <input type="text" class="s-input" v-model="pageNow"><span>{{'/' + pageTotal + '页'}}</span>
            <button @click="jump" class="g_btn g_smallBtn" v-sclick>跳转</button>
            <button @click="first" class="g_btn g_smallBtn" v-sclick>首页</button>
            <button @click="beforePage" class="g_btn g_smallBtn" v-sclick>上一页</button>
            <button @click="nextPage" class="g_btn g_smallBtn" v-sclick>下一页</button>
            <button @click="last" class="g_btn g_smallBtn" v-sclick>尾页</button>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
    <v-detail v-if="showOrderDetail" :orderId="orderId"></v-detail>
  </div>
</template>
<script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import select from '../other/select.vue';
  import bus from '../eventBus';
  import detail from '../other/orderDetail.vue';


  export default {
    data(){
      return {
        cityOrder: true,
        url:'/order/agent/query',//'/order/agent/query'等等
        mySendOrder: false,
        myRobOrder: false,
        config: {},
        status: '',//搜索参数
        startProvince:'',
        startCity:'',
        endCity:'',
        endProvince:'',
        orderBegin:'',
        orderEnd:'',//搜索参数
        pageTotal: '',//页数
        pageNow: 1,
        pageN: 1,
        pageSize: 10,
        pageS: 10,
        totalElement: '',//页数
        ajaxData:'',
        orderId:'',
        obj: {
          classInput: 'g_input',//设置表单的样式
          classUl:'g_selectUlOrder',//设置ul的类
          type: 'status',//对应状态值多个组件必须传
          defaultValue:'选择',
          isValue:true,//选择list中的要传出的值
          list: [
            {
              text: '全部',
              value: '',
            },
            {
              text: '进行中',
              value: 'START',
            },
            {
              text: '已收货',
              value: 'RECEIVED',
            },
            {
              text: '已成交',
              value: 'SUCCESS',
            },
          ]
        },
        objStartProvince:{
          classInput: 'g_input',//设置表单的样式
          classUl:'g_selectUlOrderHigh',//设置ul的类
          type: 'startProvince',//对应状态值多个组件必须
          defaultValue:'省',
          busTypeEmit:'changeArea1',//必须与busTypeOn配对
          list:[

          ],
        },
        objStartCity:{
          classInput: 'g_input',//设置表单的样式
          classUl:'g_selectUlOrderHigh',//设置ul的类
          type: 'startCity',//对应状态值多个组件必须
          defaultValue:'市',
          busTypeOn:'changeArea1',//必须与busTypeEmit配对
          list:[

          ],
        },
        objEndProvince:{
          classInput: 'g_input',//设置表单的样式
          classUl:'g_selectUlOrderHigh',//设置ul的类
          type: 'endProvince',//对应状态值多个组件必须
          defaultValue:'省',
          busTypeEmit:'changeArea2',
          list:[

          ],
        },
        objEndCity:{
          classInput: 'g_input',//设置表单的样式
          classUl:'g_selectUlOrderHigh',//设置ul的类
          type: 'endCity',//对应状态值多个组件必须
          defaultValue:'市',
          busTypeOn:'changeArea2',
          list:[

          ],
        }
      }
    },
    created(){
        let _this=this;
      _this.showPage({
        url:_this.url,
        status:_this.status,
        fromProvince:_this.startProvince,
        fromCity:_this.startCity,
        toProvince:_this.endProvince,
        toCity:_this.endCity,
        startDate:_this.orderBegin,
        endDate:_this.orderEnd,
        pageNow:_this.pageNow,
        pageSize:_this.pageSize,
      });
    },
    computed:{
      showOrderDetail(){
          return this.$store.state.showOrderDetail;
      }
    },
    methods: {
      changeShowOrderDetail(val){
        this.orderId=val;
        this.$store.commit('changeShowOrderDetail');
      },
      changeState(val){
        let _this = this;
        _this.cityOrder = false;
        _this.mySendOrder = false;
        _this.myRobOrder = false;
        _this[val] = true;
        switch (val){
          case 'cityOrder':
              _this.url='/order/agent/query';
            _this.showPage({
              url:_this.url,
              status:_this.status,
              fromProvince:_this.startProvince,
              fromCity:_this.startCity,
              toProvince:_this.endProvince,
              toCity:_this.endCity,
              startDate:_this.orderBegin,
              endDate:_this.orderEnd,
              pageNow:_this.pageNow,
              pageSize:_this.pageSize,
            });
              break;
          case 'mySendOrder':
              _this.url='/order/meIssued';
            _this.showPage({
              url:_this.url,
              status:_this.status,
              fromProvince:_this.startProvince,
              fromCity:_this.startCity,
              toProvince:_this.endProvince,
              toCity:_this.endCity,
              startDate:_this.orderBegin,
              endDate:_this.orderEnd,
              pageNow:_this.pageNow,
              pageSize:_this.pageSize,
            });
              break;
          case 'myRobOrder':
              _this.url='/order/meTook';
            _this.showPage({
              url:_this.url,
              status:_this.status,
              fromProvince:_this.startProvince,
              fromCity:_this.startCity,
              toProvince:_this.endProvince,
              toCity:_this.endCity,
              startDate:_this.orderBegin,
              endDate:_this.orderEnd,
              pageNow:_this.pageNow,
              pageSize:_this.pageSize,
            });
              break;
          default :
              break;
        }
      },
      statusTransform(val){
        switch (val){
          case 'SUCCESS':
              return '已成交';
              break;
          case 'START':
              return '进行中';
              break;
          case 'RECEIVED':
              return '已收货';
              break;
          default:
              break;
        }
      },
      getArea(obj){
          let _this=obj._this;
          _this.$axios({
            method: 'get',
            url: obj._this.$store.state.apiHref +'/region/select?pid='+obj.pid,
          }).then(function (res) {
            console.log(res.data);
          })
      },
      search(){
          let _this=this;
        _this.showPage({
          url:_this.url,
          status:_this.status,
          fromProvince:_this.startProvince,
          fromCity:_this.startCity,
          toProvince:_this.endProvince,
          toCity:_this.endCity,
          startDate:_this.orderBegin,
          endDate:_this.orderEnd,
          pageNow:_this.pageNow,
          pageSize:_this.pageSize,
        });
      },
      locationFrom(val){
        return (val.fromProvince?val.fromProvince:'')+(val.fromCity?val.fromCity:'')+ (val.fromCounty?val.fromCounty:'')+(val.fromAddress?val.fromAddress:'');
      },
      locationTo(val){
        return (val.toProvince?val.toProvince:'')+(val.toCity?val.toCity:'')+ (val.toCounty?val.toCounty:'')+(val.toAddress?val.toAddress:'');
      },
      formData(data){
//            console.log(data);
        return this.$unit.formData.call(data, "yyyy-MM-dd hh:mm:ss");
      },
      changeValue(obj){
        this[obj.type] = obj.value;
      },
      showIndex(val,item){
        return val+1+(this.pageN-1)*this.pageS;
      },
      showPage(obj){
          let _this=this;
          let formData=new FormData();
          formData.append('status',obj.status);
          formData.append('fromProvince',obj.fromProvince);
          formData.append('fromCity',obj.fromCity);
          formData.append('toProvince',obj.toProvince);
          formData.append('toCity',obj.toCity);
          formData.append('startDate',obj.startDate);
          formData.append('endDate',obj.endDate);
          formData.append('page.page',obj.pageNow-1);
          formData.append('page.size',obj.pageSize);

        _this.$axios({
          method: 'post',
          url: this.$store.state.apiHref + obj.url,
          data: formData,
        }).then(function (res) {
           if(res.data.response_state!=-1){
               _this.ajaxData=res.data.list;
               _this.totalElement=res.data.totalElement;
               _this.pageTotal=res.data.totalPage;
               _this.pageNow=res.data.pageNum+1;
               _this.pageN=res.data.pageNum+1;
               _this.pageS=res.data.pageSize;

           }
        })
      },
      jump(){
          let _this=this;
        this.showPage({
          url:_this.url,
          status:_this.status,
          fromProvince:_this.startProvince,
          fromCity:_this.startCity,
          toProvince:_this.endProvince,
          toCity:_this.endCity,
          startDate:_this.orderBegin,
          endDate:_this.orderEnd,
          pageNow:_this.pageNow,
          pageSize:_this.pageSize,
        })
      },
      first(){
          let _this=this;
        this.showPage({
          pageNow: 1,
          pageSize: this.pageSize,
          url:_this.url,
          status:_this.status,
          fromProvince:_this.startProvince,
          fromCity:_this.startCity,
          toProvince:_this.endProvince,
          toCity:_this.endCity,
          startDate:_this.orderBegin,
          endDate:_this.orderEnd,
//          pageNow:_this.pageNow,
//          pageSize:_this.pageSize,
        })
      },
      beforePage(){
          let _this=this;
        this.showPage({
          pageNow: this.pageNow - 1,
          pageSize: this.pageSize,
          url:_this.url,
          status:_this.status,
          fromProvince:_this.startProvince,
          fromCity:_this.startCity,
          toProvince:_this.endProvince,
          toCity:_this.endCity,
          startDate:_this.orderBegin,
          endDate:_this.orderEnd,
//          pageNow:_this.pageNow,
//          pageSize:_this.pageSize,
        })
      },
      nextPage(){
          let _this=this;
        if (this.pageNow >= this.pageTotal) {
          return
        }
        this.showPage({
          pageNow: this.pageNow + 1,
          pageSize: this.pageSize,
          url:_this.url,
          status:_this.status,
          fromProvince:_this.startProvince,
          fromCity:_this.startCity,
          toProvince:_this.endProvince,
          toCity:_this.endCity,
          startDate:_this.orderBegin,
          endDate:_this.orderEnd,
//          pageNow:_this.pageNow,
//          pageSize:_this.pageSize,
        })
      },
      last(){
          let _this=this;
        this.showPage({
          pageNow: this.pageTotal,
          pageSize: this.pageSize,
          url:_this.url,
          status:_this.status,
          fromProvince:_this.startProvince,
          fromCity:_this.startCity,
          toProvince:_this.endProvince,
          toCity:_this.endCity,
          startDate:_this.orderBegin,
          endDate:_this.orderEnd,
//          pageNow:_this.pageNow,
//          pageSize:_this.pageSize,
        })
      }
    },
    components: {
      flatPickr,
      'v-select': select,
      'v-detail':detail
    }
  }
</script>
<style scoped>
  .s_shell {
    margin: 10px 10px 30px;
  }

  .s_search {
    background-color: #f9f9f9;
    border: 1px solid #dbdddd;
    min-height: 84px;
    position: relative;
  }

  .s_labelG {
    margin-right: 150px;
    font-size: 14px;
    text-align: left;
    margin-top: 28px;
    font-weight: bold;
  }

  .s_labelG label {
    margin: 0 12px;
    display: inline-block;
    margin-bottom: 20px;
  }

  .s_input {
    border: 1px solid #dbdddd;
    width: 100px;
    color: #5c5c5c;
    height: 26px;
  }

  .s_inputW {
    width: 160px;
  }

  .s_btnG {
    position: absolute;
    top: 30px;
    right: 40px;
  }

  .s_sBtn {
    width: 80px;
  }

  .s_table table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    margin-top: 6px;
  }

  .s_table table td, .s_table table th {
    border: 1px solid #dbdddd;
  }

  .s_table thead tr {
    height: 40px;
    background-color: #f9f9f9;
  }

  .s_table tbody tr {
    height: 32px;
  }

  .s_table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  .s_title {
    overflow: hidden;
  }

  .s_title li {
    float: left;
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    color: #666666;
    margin: 0 20px;
    box-sizing: border-box;
    cursor: pointer;
  }

  .s_title .s_titleColor {
    color: #1fb5ac;
    border-bottom: 2px solid #1fb5ac;
  }

  .s_outDiv {
    display: inline-block;
  }

  .s_input {
    border: 1px solid #dbdddd;
    width: 100px;
    color: #5c5c5c;
    height: 26px;
    box-sizing: content-box;
    position: relative;
    /*padding-left: 4px;*/
  }

  .s_inputBackground {
    display: inline-block;
    position: relative;
  }

  .s_inputBackground::after {
    content: '';
    display: inline-block;
    position: absolute;
    width: 22px;
    height: 22px;
    background: url("../../assets/img/icon_date.png") no-repeat;
    right: 4px;
    top: 50%;
    margin-top: -11px;

  }

  .s_inputW {
    width: 160px;
  }
  .s-input {
    height: 28px;
    width: 26px;
    box-sizing: border-box;
  }
  .s_table button{
    cursor: pointer;
  }
</style>
