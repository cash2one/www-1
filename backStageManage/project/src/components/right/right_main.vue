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
      <tr>
        <td>1</td>
        <td>18509090987</td>
        <td>测试</td>
        <td>2016-08-30 11:23</td>
        <td>无</td>
        <td>无</td>
        <td>
          <button class="g_cursor">修改</button>
          <button v-on:click="changeShowAlert" class="g_cursor">删除</button>
          <button v-on:click="changeShowDetail" class="g_cursor">详情</button>
        </td>
      </tr>
      <tr>
        <td>1</td>
        <td>18509090987</td>
        <td>测试</td>
        <td>2016-08-30 11:23</td>
        <td>无</td>
        <td>无</td>
        <td>
          <button>修改</button>
          <button>删除</button>
          <button>详情</button>
        </td>
      </tr>
      <tr>
        <td>1</td>
        <td>18509090987</td>
        <td>测试</td>
        <td>2016-08-30 11:23</td>
        <td>无</td>
        <td>无</td>
        <td>
          <button>修改</button>
          <button>删除</button>
          <button>详情</button>
        </td>
      </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="tf" colspan="7">
            <span>共</span><span>3</span><span>条，每页</span><input type="text" class="s-input"><span>条，第</span>
            <input type="text" class="s-input"><span>/1页</span>
            <button class="g_btn g_smallBtn" v-sclick>跳转</button>
            <button class="g_btn g_smallBtn">首页</button>
            <button class="g_btn g_smallBtn">上一页</button>
            <button class="g_btn g_smallBtn">下一页</button>
            <button class="g_btn g_smallBtn">尾页</button>
          </td>
        </tr>
      </tfoot>

      <s-detail v-if="showDetail"></s-detail>
      <s-alert v-if="showAlert"></s-alert>
    </table>

  </div>
</template>
<script>
import detail from '../other/detail.vue';
import alert from '../other/alert.vue';

  export default {
    computed:{
        showDetail(){
            return this.$store.state.showDetail;
        },
        showAlert(){
            return this.$store.state.showAlert;
        }
    },
    methods:{
        changeShowDetail(){
            this.$store.commit('changeShowDetail');
        },
      changeShowAlert(){
            this.$store.commit('changeShowAlert');
      }
    },
    components:{
        's-detail':detail,
        's-alert':alert
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
  .tf>*{
    vertical-align: middle;
  }
  .s-input{
    height: 28px;
    width: 26px;
    box-sizing: border-box;
  }
  .tf>button{
    height: 26px;
  }
</style>
