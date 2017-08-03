<template>
  <div class="s_shell">
    <div class="s_search">
      <ul>
        <li class="s_labelG">
          <label>
            <span>状态：</span>
            <span>
              <input class="s_input" type="text">
            </span>
          </label>
          <label>
            <span>起点：</span>
            <span>
              <input class="s_input" type="text">
            </span>
            <span>
              <input class="s_input" type="text">
            </span>
          </label>
          <label>
            <span>终点：</span>
            <span>
              <input class="s_input" type="text">
            </span>
            <span>
              <input class="s_input" type="text">
            </span>
          </label>
          <label>
            <span>预约日期：</span>
            <span>
              <input class="s_input s_inputW" type="text">
            </span>
            <span>至</span>
            <span>
              <input class="s_input s_inputW" type="text">
            </span>
          </label>
        </li>
        <li class="s_btnG">
          <button class="g_btn s_sBtn">搜索</button>
        </li>
      </ul>
    </div>
    <div class="s_table">
      <table>
        <thead>
        <tr>
          <th>序号</th>
          <th>预约人</th>
          <th>预约时间</th>
          <th>起始位置</th>
          <th>达到位置</th>
          <th>发布日期</th>
          <th>有效期</th>
          <th>预付</th>
          <th>状态</th>
          <th>其他</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>客户（13847637645）</td>
          <td>2016-07-05</td>
          <td>郑州市中陈区</td>
          <td>杭州市拱墅区</td>
          <td>2016-07-05 12:34</td>
          <td>2016-07-05 12:34</td>
          <td>300</td>
          <td>未下单</td>
          <td>
            <button>详情</button>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>客户（13847637645）</td>
          <td>2016-07-05</td>
          <td>郑州市中陈区</td>
          <td>杭州市拱墅区</td>
          <td>2016-07-05 12:34</td>
          <td>2016-07-05 12:34</td>
          <td>300</td>
          <td>未下单</td>
          <td>
            <button>详情</button>
          </td>

        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>
  .s_shell{
    margin: 30px 10px;
  }
  .s_search{
    background-color: #f9f9f9;
    border: 1px solid #dbdddd;
    min-height: 84px;
    position: relative;
  }
  .s_labelG{
    margin-right: 150px;
    font-size: 14px;
    text-align: left;
    margin-top: 28px;
    font-weight: bold;
  }
  .s_labelG label{
    margin: 0 12px;
    display: inline-block;
    margin-bottom: 20px;
  }
  .s_input{
    border: 1px solid #dbdddd;
    width: 100px;
    color: #d1d1d1;
    height: 26px;
  }
  .s_inputW{
    width: 160px;
  }
  .s_btnG{
    position: absolute;
    top: 30px;
    right: 40px;
  }
  .s_sBtn{
    width: 80px;
  }
  .s_table table{
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    margin-top: 6px;
  }
  .s_table table td,.s_table table th{
    border: 1px solid #dbdddd;
  }
  .s_table thead tr{
    height: 40px;
    background-color: #f9f9f9;
  }
  .s_table tbody tr{
    height: 32px;
  }
  .s_table tbody tr:nth-child(even){
    background-color: #f9f9f9;
  }
</style>
