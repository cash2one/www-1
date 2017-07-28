/**
 * Created by zhengchaofan on 2017/6/18.
 */
let mongo =new Mongo("localhost");

let db=mongo.getDB("admin");
db.auth("userAdmin","z1234567cf-");
db.createUser({
    user:"dbAdmin",
    pwd:"z1234567cf-",
    roles:["readWriteAnyDatabase",
        "dbAdminAnyDatabase",
        "clusterAdmin"
    ]
});