/**
 * Created by zhengchaofan on 2017/7/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let a={
  namespaced:true,
  state:{
    show1:'yes'
  },
  getters:{

  },
  actions:{

  },
  mutations:{

  },
  modules:{

  },
};

let b={
  namespaced:true,
  state:{
    show2:"yes"
  },
  getters:{

  },
  actions:{

  },
  mutations:{

  },
  modules:{

  },
};

export default new Vuex.Store({
  state:{
    showMBase:false,//关于是否显示修改资料弹出框
    showMPassword:false,//关于是否显示修改密码弹出框
    showDetail:false,//详情框
    showAlert:false,//删除框
    showModify:false,//修改框
    showOrderDetail:false,//订单详情
    // apiHref:'http://192.168.1.150:9999/haul/',//api地址
    apiHref:'/haul',//api地址
    pageStatus:'normal',//normal代表正常 error代表错误
    imgUrl:'/haul/imag?uri=',//图片的地址前缀
    roleName:'',//
    userBaseInfo:{},//用户基本信息
    page:{}

  },
  getters:{

  },
  actions:{

  },
  mutations:{
    changeMBase(state){
      state.showMBase=!state.showMBase;
    },
    changeMPassword(state){
      state.showMPassword=!state.showMPassword;
    },
    changeShowDetail(state){
      state.showDetail=!state.showDetail;
    },
    changeShowAlert(state){
      state.showAlert=!state.showAlert;
    },
    changeShowModify(state){
      state.showModify=!state.showModify;
    },
    changeRoleName(state,str){
      state.roleName=str;
    },
    changePageStatus(state,str){
      state.pageStatus=str;
    },
    changeUserBaseInfo(state,obj){
      state.userBaseInfo=obj;
    },
    changeShowOrderDetail(state){
      state.showOrderDetail=!state.showOrderDetail;
    }
  },
  modules:{
    a:a,//备用测试
    b:b,//备用测试
  },
})
