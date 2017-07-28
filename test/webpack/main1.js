/**
 * Created by zhengchaofan on 2017/6/7.
 */
import Vue from 'vue';
import style from './css.css';

let app = new Vue({
    el:'#app',
    data:{
      name:'jack'
    },
    template:'<div id="name" class="box">' +
    '{{name}}' +
    '</div>',
});