<template>
  <div class="s_bcTr">
    <div class="s_bcB">
      <ul class="s_bcC">
        <li class="logo_x">
          <span v-on:click="mShow">x</span>
        </li>
        <li class="s_contain">
          <span v-if="content">
            {{content.tip}}
          </span>
          <span v-else>
              确认删除吗？
          </span>
        </li>
        <li class="s_btnG">
          <button class="g_btn s_margin" v-on:click="fn" v-if="content">确认</button>
          <button class="g_btn s_margin" v-on:click="deleteMsg" v-else>确认</button>
          <button class="g_btn" v-on:click="mShow">取消</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import bus from '../eventBus';
  export default {
    props: ['driverId','content'],
    created(){

    },
    data(){
        return {

        }
    },
    methods: {
      mShow(){
          if(this.content){
            this.$emit('changeShowAlert');
          }else {
            this.$store.commit('changeShowAlert');
          }

      },
      deleteMsg(){
          let _this=this;
          this.$axios({
            method: 'post',
            url: _this.$store.state.apiHref+'/driver/delete/'+_this.driverId,
          }).then(function (res) {
            if(res.data.response_state==1){
                bus.$emit('delete');//触发在right_main中的事件
                _this.$store.commit('changeShowAlert');
            }else {

            }
          })
      },
      fn(){
          this.content.fn(this.content.obj);
      },
    },
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
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: left;
    font-size: 14px;
  }

  .s_bcB {
    width: 400px;
    height: 200px;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
  }

  .logo_x {
    text-align: right;
    font-weight: bold;
    color: #666;
    font-size: 20px;
    margin-right: 20px;
  }

  .logo_x span {
    cursor: pointer;
  }

  .s_contain {
    height: 110px;
    text-align: center;
    font-size: 16px;
    line-height: 100px;
  }

  .s_btnG {
    text-align: center;
  }

  .s_margin {
    margin-right: 30px;
  }
</style>
