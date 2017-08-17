// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'
import axios from 'axios'
import unit from './unit'

// axios.defaults.baseURL = '/api';

Vue.prototype.$axios=axios;
Vue.prototype.$unit=unit;

Vue.config.productionTip = false;

Vue.directive('sclick', {
  // 当绑定元素插入到 DOM 中。
  bind(el,binding){

    let time=0;
    el.onclick=function (e) {
      // console.log(this);
      el.style.backgroundColor='rgba(71, 70, 72, 0.81)';
      clearInterval(time);
      time=setInterval(function () {
        el.style.backgroundColor='';
      },100)
    };
  }
})

//
//指令配合data-except
Vue.directive('sChangeColor', {
  // 当绑定元素插入到 DOM 中。
  bind(el,binding){
    let children=el.children;
    // for (let i=0;i<children.length;i++){
    //   if(children[i].attributes['data-except']){
    //     Array.prototype.slice.call(children,i,1);
    //     // children.splice(i,1);
    //     i--;
    //   }
    // }

    for(let i=1;i<children.length;i++){
      children[i].onclick=function () {
        if(this.className.indexOf(binding.value)>-1)return;
        if(!this.className){
          this.className=binding.value
        }else{
          this.className=this.className+' '+binding.value;
        }
        for(let j=1;j<children.length;j++){
          if(i==j){
            continue;
          }
          if(children[j].className.indexOf(binding.value)>-1){
            children[j].className=children[j].className.slice(0,children[j].className.indexOf(binding.value))
          }

        }
      }
    }


  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
