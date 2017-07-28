/**
 * Created by zhengchaofan on 2017/6/22.
 */
let mongo = require('mongodb');


let mongoClient = new mongo.MongoClient();
// let server=mongoClient(new mongo.Server('localhost',27017));
//
// server.open(function (err,mClient) {
//     if(err){
//         console.log(err);
//     }
//     let db=mClient.db('myDBhome');
//     console.log("db");
// });

mongoClient.connect("mongodb://localhost/", function (err, mClient) {
    if (err) {
        console.log(err);
    }
    let db = mClient.db('myDBhome');
    console.log("db",db);
    db.close();
});