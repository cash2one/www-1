/**
 * Created by zhengchaofan on 2017/7/14.
 */
function obj() {
    this.value='123124124';
}

let obj2={
    value:'123',
    con(){
      console.log(this.value)
    },
};

obj.bind(obj2)();

obj2.con();
