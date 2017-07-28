/**
 * Created by zhengchaofan on 2017/6/6.
 */
import  Vue from 'vue';

let app = new Vue({
    el:'#app',
    data:{
        here:'hello world',
        class:'foo1',
        children:'yes',
        classChildren:'back'
    },
    methods:{
      clickHandle: function () {
          this.children='no12';
          console.log(this.children+12);
      }
    },
    render: function (createElement) {
        let _this=this;
        return createElement(
            'div',   // tag name 标签名称
            {
                'attrs': {
                    id: 'foo'
                },
                // domProps: {//有了这个选线所有子选项都会被清空
                //     innerText: _this.here,
                // },
                on:{
                  click:this.clickHandle
                },
                class:_this.class
            },
            [
                createElement('coms'),
            ]
        )
    },
    components:{
        'coms':{
            render:function (cret) {
                let _this=this;
                return cret(
                    'div',
                    {
                        domProps: {
                            innerText: _this.$parent.children,
                        },
                        class:_this.$parent.classChildren,
                    }
                )
            }
        }
    }
});