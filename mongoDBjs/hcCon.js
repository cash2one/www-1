/**
 * Created by zhengchaofan on 2017/6/20.
 */
var mongo= new Mongo("localhost");
var db=mongo.getDB("myDBhome");
var collA=db.createCollection("collA");
var collB=db.createCollection("collB");

print(JSON.stringify(db.stats()));