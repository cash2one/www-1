<template>
  <div class="shell">
    <table>
      <thead>
      <tr>
        <th>序号</th>
        <th>用户名</th>
        <th>昵称</th>
        <th>注册时间</th>
        <th>身份证</th>
        <th>驾驶证</th>
        <th>其他</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(item,index) in ajaxData">
        <td >{{index + (pageN - 1) * pageS + 1}}</td>
        <td>{{item.username}}</td>
        <td>{{item.nickname}}</td>
        <td>{{item.createdDate ? formData(new Date(item.createdDate)) : ''}}</td>
        <td>
          <img v-if="item.idCardFront" :src="imgUrl+item.idCardFront" alt="" class="g_imgS">
          <img v-if="item.idCardBack" :src="imgUrl+item.idCardBack" alt="" class="g_imgS">
        </td>
        <td>
          <img v-if="item.drivingLicense" :src="imgUrl+item.drivingLicense" alt="" class="g_imgS">
        </td>
        <td>
          <button v-on:click="changeShowModify(item.id)" class="g_cursor" :data-driverId="item.id">修改</button>
          <button v-on:click="changeShowAlert(item.id)" class="g_cursor" :data-driverId="item.id">删除</button>
          <button v-on:click="changeShowDetail(item.id)" class="g_cursor" :data-driverId="item.id">详情</button>
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td class="tf" colspan="7">
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

      <s-detail v-if="showDetail" :driverId="driverId"></s-detail>
      <s-alert v-if="showAlert" :driverId="driverId"></s-alert>
      <s-modify v-if="showModify" :driverId="driverId" @upData="showPage({})"></s-modify>
    </table>

  </div>
</template>
<script>
  import detail from '../other/detail.vue';
  import alert from '../other/alert.vue';
  import modify from '../other/modify.vue';
  import bus from '../eventBus';

  export default {
    data(){
      return {
        ajaxData: [],
        pageTotal: '',
        pageNow: '',
        pageN: '',
        pageSize: '',
        pageS: '',
        totalElement: '',
        keyword: '',
        driverId: '',//传到组件中的数值
      }
    },
    created(){
      let _this = this;
      bus.$on('search', function (value) {
        _this.keyword = value;
        let obj = {
          keyword: value
        };
        _this.showPage(obj)
      });
      bus.$on('delete',function () {//定义在alert中
        _this.showPage({
          pageNow: 0,
          pageSize: this.pageSize,
          keyword: this.keyword
        })
      });
      this.showPage({});
    },
    computed: {
      showDetail(){
        return this.$store.state.showDetail;
      },
      showAlert(){
        return this.$store.state.showAlert;
      },
      showModify(){
        return this.$store.state.showModify;
      },
      imgUrl: function () {
        return this.$store.state.imgUrl;
      }
    },
    methods: {
      changeShowDetail(val){
        this.driverId = val;
        this.$store.commit('changeShowDetail');
      },
      changeShowAlert(val){
        this.driverId = val;
        this.$store.commit('changeShowAlert');
      },
      changeShowModify(val){
        this.driverId = val;
        this.$store.commit('changeShowModify');
      },
      formData(data){
//            console.log(data);
        return this.$unit.formData.call(data, "yyyy-MM-dd hh:mm:ss");
      },
      showPage(obj){
        let formData = new FormData();
        let _this = this;
        formData.append('keyword', obj.keyword ? obj.keyword : '');
        formData.append('page.page', obj.pageNow ? obj.pageNow - 1 : 0);
        formData.append('page.size', obj.pageSize ? obj.pageSize : 10);

        this.$axios({
          method: 'post',
          url: this.$store.state.apiHref + '/driver/query',
          data: formData,
        }).then(function (res) {
          if (res.data.response_state == 1) {
            _this.ajaxData = res.data.list;
            _this.pageSize = res.data.pageSize;
            _this.pageS = res.data.pageSize;
            _this.pageTotal = res.data.totalPage;
            _this.pageNow = res.data.pageNum + 1;
            _this.pageN = res.data.pageNum + 1;
            _this.totalElement = res.data.totalElement;

          }
        }).catch(function (err) {

        })
      },
      jump(){
        this.showPage({
          pageNow: this.pageNow,
          pageSize: this.pageSize,
          keyword: this.keyword
        })
      },
      first(){
        this.showPage({
          pageNow: 0,
          pageSize: this.pageSize,
          keyword: this.keyword
        })
      },
      beforePage(){
        this.showPage({
          pageNow: this.pageNow - 1,
          pageSize: this.pageSize,
          keyword: this.keyword
        })
      },
      nextPage(){
        if (this.pageNow >= this.pageTotal) {
          return
        }
        this.showPage({
          pageNow: this.pageNow + 1,
          pageSize: this.pageSize,
          keyword: this.keyword
        })
      },
      last(){
        this.showPage({
          pageNow: this.pageTotal,
          pageSize: this.pageSize,
          keyword: this.keyword
        })
      }
    },
    components: {
      's-detail': detail,
      's-alert': alert,
      's-modify': modify
    }
  }
</script>
<style scoped>
  table {
    width: 100%;
    font-size: 14px;
  }

  table tr th, table tr td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  table tbody tr:nth-of-type(odd) {
    background-color: #f9f9f9;
  }

  .shell {
    margin: 0 10px;
  }

  .tf > * {
    vertical-align: middle;
  }

  .s-input {
    height: 28px;
    width: 26px;
    box-sizing: border-box;
  }

  .tf > button {
    height: 26px;
  }
</style>
