/**
 * Created by zhengchaofan on 2017/6/18.
 */
let mongo =new Mongo("localhost");
let ab=mongo.getDB("test");
let curs=ab.system.users.find();
print(JSON.stringify(curs));
// print(curs);