// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex'


Vue.config.productionTip = false;

Vue.directive('sclick', {
  // 当绑定元素插入到 DOM 中。
  bind(el,binding){

    let time=0;
    el.onclick=function (e) {
      console.log(this);
      el.style.backgroundColor='rgba(71, 70, 72, 0.81)';
      clearInterval(time);
      time=setInterval(function () {
        el.style.backgroundColor='';
      },100)
    };
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
