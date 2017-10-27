<template>
  <div class="s_selectBack" @mouseleave="select('a')">
    <input @click="select(false)"
           class="" :class="obj.classInput?obj.classInput:''"
           :value="text?text:obj.defaultValue"

           type="text"
           readonly>
    <div class="s_arrow">
      <img v-if="show" src="../../assets/img/icon_cart_b.png" alt="">
      <img src="../../assets/img/icon_cart_t.png" alt="" v-else>
    </div>
    <ul class="s_selectShow" :class="obj.classUl?obj.classUl:''" v-if="show">
      <li v-for="item in list" @click="selectLi($event)" :data-value="item.value?item.value:item.text">{{item.text}}</li>
    </ul>
  </div>
</template>
<script>
  import bus from '../eventBus'
  export default{
    props:['obj','shape'],
    created(){
        let _this=this;
        _this.list=_this.obj.list;
         bus.$on('resetValue',function () {
           _this.value='';
         });

         if(_this.obj.busTypeOn){
             bus.$on(_this.obj.busTypeOn,function (value) {
               _this.getArea(value);
             });
         }
         if(_this.obj.busTypeEmit){
           _this.getArea(0);
         }
    },
    data(){
      return {
        show: false,
        value: '',
        text:'',
        list:[]//对象的数据组
      }
    },
    methods: {
      getArea(value){
        let _this=this;
        _this.$axios({
          method: 'get',
          url: _this.$store.state.apiHref +'/region/select?pid='+value,
        }).then(function (res) {
          _this.list=_this.arryFormat(res.data);
          console.log('_this.list',_this.list);
        })
      },
      select(a){
        if (a) {
          this.show = false;
          return
        }
        this.show = !this.show;
      },
      arryFormat(arr){
          let arr1=[],
            i;
          for(i=0;i<arr.length;i++){
              arr1[i]={};
              arr1[i]['text']=arr[i]['v'];
              arr1[i]['value']=arr[i]['k'];
          }
          arr1.unshift({
            text:'全部',
            value:'全部',
          });
          return arr1;
      },
      selectLi(e){
          let value=e.target.attributes['data-value'].value;
          console.log('e',e.target.attributes['data-value'].value);
          this.value=value;
          console.log('value1212',this.value);
          this.text=e.target.innerHTML;
          this.$emit('changeValue',{
              value:this.text==='全部'?'':(this.obj.isValue===true?this.value:this.text),
              type:this.obj.type
          });
          if(this.obj.busTypeEmit){
              bus.$emit(this.obj.busTypeEmit,this.value)
          }
      }
    }
  }
</script>
<style scoped>
  .s_selectBack {
    position: relative;
    cursor: pointer;
  }

  /*.s_selectInput {*/
    /*background-color: white;*/
    /*cursor: pointer;*/
    /*border: 1px solid #ddd;*/
    /*box-sizing: border-box;*/
    /*padding-right: 15px;*/
  /*}*/

  .s_selectShow {
    position: absolute;
    left: 0;
    bottom: -200px;
    border: 1px solid #ddd;
    border-top: none;
    width: 100%;
    height: 200px;
    z-index: 1;
    background-color: white;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .s_selectShow li{
    cursor: pointer;
  }

  .s_arrow {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 15px;
    line-height: 32px;
  }

  .s_arrow img {
    width: 7px;
    height: 5px;
    vertical-align: middle;
  }
  /*.s_select{*/
    /*width: 136px;*/
    /*border: 1px solid #ddd;*/
    /*padding: 0 8px;*/
    /*height: 32px;*/
    /*box-sizing: border-box;*/
  /*}*/
</style>
