/**
 * Created by zhengchaofan on 2017/7/7.
 */
let util=require('util'),
    events=require('events');

function MyClass() {
    this.valuess=false;
    events.EventEmitter.call(this);//不明白这句话什么意思
}

util.inherits(MyClass,events.EventEmitter);

let c=new MyClass();

c.on('newListener',function (name,listener) {
    console.log('name',name,'listener',listener.name)
});
function show(a) {
    this.valuess=true;
}
c.on('test',show);

c.on('test',function (a) {
    console.log(a)
});

c.emit('test','hahaahjaa');