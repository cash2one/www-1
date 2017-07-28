/**
 * Created by zhengchaofan on 2017/6/27.
 */
// let user='johnny';
// let pass='c-bad';
// let authstring=user +":"+pass;
//
// console.log(new Buffer(authstring).toString('utf8'));
// console.log(new Buffer(authstring));


// buf = new Buffer(256);
// len = buf.write("www.runoob.com");
//
// console.log("写入字节数 : "+  len);
//
// const buf4 = Buffer.from(['dede', 16, 3,'e']);
//
// console.log(Array.from(buf4));
// console.log(Buffer.from([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ])[2]);

// const arr = new Uint16Array(2);
//
// arr[0] = 5000;
// arr[1] = 4000;
//
// // 拷贝 `arr` 的内容
// const buf1 = Buffer.from(arr);
//
// // 与 `arr` 共享内存
// const buf2 = Buffer.from(arr.buffer);
//
// // 输出: <Buffer 88 a0>
// console.log(buf1);
//
// // 输出: <Buffer 88 13 a0 0f>
// console.log(buf2);
//
// arr[1] = 6000;
//
// // 输出: <Buffer 88 a0>
// console.log(buf1);
//
// // 输出: <Buffer 88 13 70 17>
// console.log(Array.from(buf2));


// const buf = Buffer.from([1, 2, 255]);

// 输出:
//   1
//   2
//   3
// for (const b of buf2) {
//     console.log(b);
// }

// const buf2 = Buffer.alloc(10, 16);
// console.log(buf2);
//
// let buf1=new Uint8Array([0x1f,2,3,256]);
//
// console.log(buf1);
//
// let buffer = new ArrayBuffer(16);
// console.log(buffer[0]);

let f64=new Float64Array(8);
let f32=new Float32Array(f64.buffer);
f64[0]=10;
f64[1]=20;
f64[2]=0x1000;
f64[3]=f64[0]+f64[2];
console.log(f64,f32);