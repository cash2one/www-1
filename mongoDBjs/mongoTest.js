/**
 * Created by zhengchaofan on 2017/6/18.
 */

let mongo=new Mongo("localhost");
// let db=mongo.getDB("test");
// db.createUser({
//     user:"testAdmin",
//     pwd:"test",
//     roles:["dbAdmin"]
// });
// db.createUser({
//     user:"testRead",
//     pwd:"test",
//     roles:["readWrite"]
// });
// db.createUser({
//     user:"testWrite",
//     pwd:"test",
//     roles:["read"]
// });
let db=mongo.getDB("admin");
db.createUser({
    user:"testUser2",
    pwd:"test",
    roles:[{
        role:"readWrite",
        db:"test",
    }]
});