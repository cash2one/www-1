/**
 * Created by zhengchaofan on 2017/7/26.
 */
let obj={
  sclick:{
    bind(el,binding){

      el.onclick=function (e) {
        console.log(this);
      };

      el.onmousedown=function () {
        el.style.backgroundColor='rgba(71, 70, 72, 0.81)';
      };
      el.onmouseup=function () {
        el.style.backgroundColor='';
      }
    }
  }
};

export default obj
