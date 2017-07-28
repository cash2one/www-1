/**
 * Created by Administrator on 2017/3/31.
 */
var $j = jQuery.noConflict();
var URL = '/bangxundian/';
var img_thumb_URL58 = URL + 'grid/thumbnail/58/';
var img_bg_URL = URL + 'grid/';

$j(function(){
    var w_h = $j(window).height();
    var h_h = $j('.js_header').outerHeight();
    var m_h = Math.round(w_h-h_h);
    var n_h = $j(".js_nav_w").outerHeight();
    var c_h = Math.round(w_h-h_h-n_h-8);

    $j(".js_main").height(m_h);
    $j(".js_contain").height(c_h);
    $j(".js_fold").on("click",function(){ // 点击
        $j(".js_side").hide();
        $j("#js_unfold").show();
        $j(".side_on").width(40);
    });
    $j("#js_unfold").on("click",function(){
        $j(".js_side").show();
        $j("#js_unfold").hide();
        $j(".side_on").width(210);
    });
    $j(".js_side").height( $j(".side_on").height() );
});

function format(obj, fmt){
    var o = {
        "M+": obj.getMonth() + 1, //月份
        "d+": obj.getDate(), //日
        "h+": obj.getHours(), //小时
        "m+": Math.floor(obj.getMinutes()), //分
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function formatTime(obj){
    var o = {
        "Y": obj.getFullYear(),
        "M":    (Array(2).join(0)+(obj.getMonth() + 1)).slice(-2), //月份
        "d": (Array(2).join(0) + obj.getDate() ).slice(-2), //日
        "h": (Array(2).join(0)+ obj.getHours() ).slice(-2), //小时
        "m": ( Array(2).join(0)+Math.floor(obj.getMinutes())).slice(-2) //分
    };
    return o.Y+"-"+ o.M+"-"+ o.d+" "+o.h+":"+o.m;
}
function formatDate(obj){
    var o = {
        "Y": obj.getFullYear(),
        "M":    (Array(2).join(0)+(obj.getMonth() + 1)).slice(-2), //月份
        "d": (Array(2).join(0) + obj.getDate() ).slice(-2)
    };
    return o.Y+"-"+ o.M+"-"+ o.d;
}

angular.module("directives",[]).directive("datePicker",function(){ // 时间指令
    return {
        restrict:"A",
        link:function(scope, element, attr){
            $j(element).bind("click", function () {
                window.WdatePicker({
                    dateFmt:'yyyy-MM-dd',
                    maxDate:'%y-%M-%d',
                    isShowClear: false,
                    isShowToday: false,
                    onpicked: function () {
                        scope.$apply(scope.time1 = this.value);
                    }
                });
            });
        }
    };
}).directive("datePicker2",function(){
    return {
        restrict:"A",
        link:function(scope,element, attr){
            $j(element).on("click", function () {
                window.WdatePicker({
                    dateFmt:'yyyy-MM-dd HH:mm',
                    maxDate: scope.time3 || '%y-%M-%d -%H-%m',
                    isShowClear: false,
                    isShowToday: false,
                    onpicked:function () {
                        scope.$apply(scope.time2 = this.value);
                    }
                });
            });
        }
    };
}).directive("datePicker3",function(){
    return {
        restrict:"A",
        link:function(scope,element, attr){
            $j(element).bind("click", function () {
                window.WdatePicker({
                    dateFmt:'yyyy-MM-dd HH:mm',
                    minDate: scope.time2,
                    maxDate: '%y-%M-%d -%H-%m',
                    isShowClear: false,
                    isShowToday: false,
                    onpicked: function () {
                        scope.$apply(scope.time3 = this.value);
                    }
                });
            });
        }
    };
});

var m1 = angular.module('myApp', ['ui.router','directives','ui.bootstrap']);
m1.run(function($rootScope, $state, $stateParams,$window) { //返回上一页
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on("$stateChangeSuccess",  function(event, toState, toParams, fromState, fromParams) {
        $rootScope.previousState_name = fromState.name;
        $rootScope.previousState_params = fromParams;
    });

    $rootScope.back = function() {
        $state.go($rootScope.previousState_name,$rootScope.previousState_params, {reload: true});
    };
});

m1.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when("", "/");
    $stateProvider
        .state('index',{
            url: '/',
            views:{
                //这里必须要绝对定位
                'header@':{
                    templateUrl:'header/header.html'
                },
                'main@':{
                    templateUrl:'view/home.html'
                },
                'tip@':{
                    templateUrl:'view/tips/tips.html'
                },
                'side@': {
                    templateUrl:'view/side/side_home.html'
                },
                'breadline@': {
                    template:'指标分析'
                }
            }
        })
        .state('org',{
            url:'/org',
            views:{
                'header@':{
                    templateUrl:'header/header.html'
                },
                'main@':{
                    templateUrl:'view/org.html'
                },
                'tip@':{
                    templateUrl:'view/tips/tips.html'
                },
                'content@org':{
                    templateUrl:'view/org/mList.html'
                },
                'side@': {
                    templateUrl:'view/side/side_org.html'
                },
                'breadline@': {
                    template:'组织架构'
                }
            }
        })
        .state('org.dw',{
            url:'/d_w/?:mid:role',
            views:{
                'content@org':{
                    templateUrl:'view/org/dwList.html',
                }
            },
            params:{"mid":null,"role":null}
        })
        .state('org.dy',{
            url:'/d_y/?:mid:role',
            views:{
                'content@org':{
                    templateUrl:'view/org/dyList.html'
                }
            },
            params:{"mid":null,"role":null}
        })
        .state('org.wj',{
            url:'/d_wj/?:mid:role',
            views:{
                'content@org':{
                    templateUrl:'view/org/wjList.html'
                }
            },
            params:{"mid":null,"role":null}
        })
        .state('org.ysc',{
            url:'/d_yc/?:mid:role',
            views:{
                'content@org':{
                    templateUrl:'view/org/yscList.html'
                }
            },
            params:{"mid":null,"role":null}
        })
        .state('pro',{
            url:'/pro',
            views:{
                'header':{
                    templateUrl:'header/header.html'
                },
                'main':{
                    templateUrl:'view/pro.html'
                },
                'content@pro':{
                    templateUrl:'view/pro/frame.html'
                },
                'selectDate@pro': {
                    templateUrl:'view/pro/date.html'
                },
                'allTable@pro':{
                    templateUrl:'view/pro/t1.html'
                },
                'tip@':{
                    templateUrl:'view/tips/tips.html'
                },
                'side@': {
                    templateUrl:'view/side/side_pro.html'
                },
                'breadline@': {
                    template:'工程管理'
                }
            }
        })
        .state('pro.m',{
            url:'/m/?:mid:role:t',
            views:{
                'allTable@pro':{
                    templateUrl:'view/pro/t1.html',
                    controller: "mTable"
                }
            },
            params:{"mid":null,"role":null,"t": null}
        })
        .state('pro.wj',{
            url:'/wj/?:mid:role:t',
            views:{
                'allTable@pro':{
                    templateUrl:'view/pro/t2.html'
                }
            },
            params:{"mid":null,"role":null,"t": null}
        })
        .state('pro.ysc',{
            url:'/ysc/?:mid:role:t',
            views:{
                'allTable@pro':{
                    templateUrl:'view/pro/t3.html'
                }
            },
            params:{"mid":null,"role":null,"t": null}
        })
        .state('pro.dw',{
            url:'/d_wj/?:mid:role:t',
            views:{
                'allTable@pro':{
                    templateUrl:'view/pro/t4.html'
                }
            },
            params:{"mid":null,"role":null,"t": null}
        })
        .state('pro.dy',{
            url:'/d_dy/?:mid:role:t',
            views:{
                'allTable@pro':{
                    templateUrl:'view/pro/t5.html'
                }
            },
            params:{"mid":null,"role":null,"t": null}
        })
        .state('pro.wj_car',{
            url:'/wj_car?/mid:role:t',
            views:{
                'content@pro':{
                    templateUrl:'view/pro/all.html'
                },
                'con@pro.wj_car':{
                    templateUrl : 'view/pro/t_allcar.html'
                },
                'tcar@pro.wj_car' : {
                    templateUrl : 'view/pro/t_wj_c.html'
                }
            },
            params:{"mid":null,"role":null,"t": null}
        })
        .state('pro.ysc_car',{
            url:'/ysc_car?/mid:role:t',
            views:{
                'content@pro':{
                    templateUrl:'view/pro/all.html'
                },
                'con@pro.ysc_car':{
                    templateUrl : 'view/pro/t_allcar.html'
                },
                'tcar@pro.ysc_car' : {
                    templateUrl : 'view/pro/t_ysc_c.html'
                }
            },
            params:{"mid":null,"role":null,"t": null}
        })
        .state('pro.driver',{
            url:'/driver?/mid:role:t',
            views: {
                'content@pro': {
                    templateUrl:'view/pro/driverClock.html',
                }
            },
            params:{"mid":null,"role":null,"t": null},
        })
        .state('pro.oil',{
            url:'/oil',
            views:{
                'content@pro':{
                    templateUrl:'view/pro/all.html'
                },
                'con@pro.oil':{
                    templateUrl : 'view/pro/oil.html'
                },
                'toil@pro.oil' : {
                    templateUrl : 'view/pro/t_oil.html'
                }
            }
        })
        .state('data',{
            url:'/data',
            views:{
                'header@':{
                    templateUrl:'header/header.html'
                },
                'main@':{
                    templateUrl:'view/data.html'
                },
                'tip@':{
                    templateUrl:'view/tips/tips.html'
                },
                'content@data':{
                    templateUrl:'view/data/load.html',
                    controller: 'loadC'
                },
                'side@': {
                    templateUrl:'view/side/side_data.html'
                },
                'breadline@': {
                    template:'数据管理'
                }
            }
        })
        .state('data.unload',{  // state
            url:'/unload/?:des',
            views:{
                'content@data':{
                    templateUrl:'view/data/unload.html',
                    controller: 'unloadC'
                }
            },
            params:{"des":null}
        })
        .state('data.dis',{
            url:'/dis/?:des',
            views:{
                'content@data':{
                    templateUrl:'view/data/distance.html',
                    controller: 'disC'
                }
            },
            params:{"des":null}
        })
        .state('data.th',{
            url:'/th/?:des',
            views:{
                'content@data':{
                    templateUrl:'view/data/article.html',
                    controller: 'thC',

                }
            },
            params:{"des":null}
        })
        .state('data.oil',{
            url:'/oil/?:des',
            views:{
                'content@data':{
                    templateUrl:'view/data/oil.html',
                    controller: 'oilC'
                }
            },
            params:{"des":null}
        })
        .state('set',{
            url:'/set',
            views:{
                'header@':{
                    templateUrl:'header/header.html'
                },
                'main@':{
                    templateUrl:'view/set.html',
                    controller: 'setC'
                },
                'content@set': {
                    templateUrl:'view/set/info.html',
                },
                'tip@':{
                    templateUrl:'view/tips/tips.html'
                },
                'side@': {
                    templateUrl:'view/side/side_set.html'
                },
                'breadline@': {
                    template:'设置'
                }
            }
        })
        .state('set.pwd',{
            url:'/pwd/?:set',
            views:{
                'content@set':{
                    templateUrl:'view/set/pwd.html',
                }
            },
            params:{"set":null}
        })
        .state('set.limit',{
            url:'/limit/?:set',
            views:{
                'content@set':{
                    templateUrl:'view/set/limits.html',
                }
            },
            params:{"set":null}
        });
}).service('Paginator',function(){
    return function(fetchFunction, pageSize) {
        var paginator = {
            hasNextVar : false,
            next: function() {
                if(this.hasNextVar) {
                    this.currentOffset += pageSize;
                    this._load();
                }
            },
            _load: function() {
                var self = this;
                fetchFunction(this.currentOffset, pageSize+1, function(items) {
                    self.currentPageItems = items.slice(0, pageSize);
                    self.hasNextVar = items.length === pageSize + 1;
                });
            },
            hasNext: function() {
                return this.hasNextVar;
            },
            previous: function() {
                if(this.hasPrevious()) {
                    this.currentOffset -= pageSize;
                    this._load();
                }
            },
            hasPrevious: function() {
                return this.currentOffset !== 0;
            },currentPageItems: [],
            currentOffset:0
        };
        //加载第一页
        paginator._load();
        return paginator;
    };
}).factory('comFun', function() {
    var factory = {};
    $j.ajaxSetup({
        complete: function(jqXHR, textStatus) {
            if (jqXHR.status == '401') { // 401 未登录
                $j("#log").modal('show');
            }
        }
    });

    var http_get = function(url,data,success,error){
        $j.ajax({
            url: URL + url + ((url.indexOf("?") == -1) ? "?" : "&") + "_=" + new Date().getTime(),
            type: 'GET',
            data: data,
            dataType: 'json',
            success: function(data) {
                success&&success(data);
            }
        });
    }

    var http_post = function(url,data,success,error){
        $j.ajax({
            url: URL + url,
            type: 'POST',
            headers: {
                Accept: "application/json; charset=utf-8"
            },
            data: data,
            dataType: 'json',
            success: function(data) {
                success&&success(data);
            }
        });
    }

    factory.log = function(data,success) { // 登录
        http_post('j_spring_security_check',data,success);
    };

    factory.goOut = function(data,success) { // 登录
        window.location.href=URL+"logout";
    };

    factory.getInfo = function(success,error){
        http_get('user/infoOwn',{},success,error);
    }

    factory.updateInfo = function(data,success,error){
        http_post('user/infoOwn4Waji',data,success,error);
    }

    factory.getMangerList = function(success,error) { // 获取经理列表
        http_get('waji/org/manager',{},success);
    }

    factory.saveManger = function(data, success,error) { // 保存经理
        http_post('waji/org/saveManager',data,success,error);
    }

    factory.deleteManger = function(id, success,error) { // 删除经理
        var id = id || '';
        http_get( "waji/org/deleteManager/"+id,{},success,error);
    }

    factory.getDriver = function(data, success,error) { // 获取司机
        http_get('waji/org/getDriver',data,success,error);
    }

    factory.saveDriver = function(data, success,error) { // 保存司机
        http_post('waji/org/saveDriver',data,success,error);
    }

    factory.deleteDriver = function(id, success,error) { // 保存司机
        http_get('waji/org/deleteDriver/' + id,{id:id},success,error);
    }

    factory.getWjlist = function(mid, success,error){
        http_get('digMachine',{managerId :mid},success,error);
    }

    factory.saveWjlist = function(data, success,error){
        http_post('digMachine/save',data,success,error);
    }

    factory.deleteWjlist = function(id, success,error){
        http_get('digMachine/delete/'+id,{id:id},success,error);
    }

    factory.getYscList = function(mid, success,error){
        http_get('carrierCar',{managerId :mid},success,error);
    }

    factory.saveYscList = function(data, success,error){
        http_post('carrierCar/save',data,success,error);
    }

    factory.deleteYscList = function(id, success,error){
        http_get('carrierCar/delete/'+id,{id:id},success,error);
    }

    factory.getloadList = function(success,error){
        http_get('place/load',{},success,error);
    }

    factory.saveload = function(data,success,error){
        http_post('place/load',data,success,error);
    }

    //   删除地点
    factory.deleteLoad = function(id,success,error){
        http_get('place/delete/'+id,{},success,error);
    }

    factory.getUnload = function(success,error){
        http_get('place/unload',{},success,error);
    }

    factory.saveUnload = function(data,success,error){
        http_post('place/unload',data,success,error);
    }

    factory.getThing = function(success,error){
        http_get('cargoType/all',{},success,error);
    }

    factory.saveThing = function(data,success,error){
        http_post('cargoType',data,success);
    }

    factory.deleteThing = function(id,success,error){
        http_get('cargoType/delete/'+id,{id: id},success);
    }

    factory.changePwd = function(data, success,error){
        http_post('user/changePassword',data, success);
    }

    factory.getDailym = function(data, success,error){
        http_get('waji/statis/manager/daily',data, success);
    }

    factory.getPeriodM = function(data, success, error){
        http_get('waji/statis/manager/scope',data, success);
    }

    factory.getDailyWj = function(data, success,error){
        http_get('waji/statis/digMachine/daily',data, success);
    }

    factory.getPeriodWj = function(data, success, error){
        http_get('waji/statis/digMachine/scope',data, success);
    }

    factory.getDailyYsc = function(data, success,error){
        http_get('waji/statis/carrierCar/daily',data, success);
    }

    factory.getPeriodYsc = function(data, success,error){
        http_get('waji/statis/carrierCar/scope',data, success);
    }

    factory.getDailyDw = function(data, success,error){
        http_get('waji/statis/wjDriver/daily',data, success);
    }

    factory.getPeriodDw = function(data, success,error){
        http_get('waji/statis/wjDriver/scope',data, success);
    }

    factory.getDailyDy = function(data, success,error){
        http_get('waji/statis/yscDriver/daily',data, success);
    }

    factory.getPeriodDy = function(data, success,error){
        http_get('waji/statis/yscDriver/scope',data, success);
    }

    factory.getSet = function(success,error){
        http_get('settings/digMachineScopeForDigDriver',{},success,error);
    }

    factory.setSet = function(data,success,error){
        http_post('settings/digMachineScopeForDigDriver',data,success,error);
    }

    factory.getCarryRecord = function(data,success,error){
        http_get('carryRecord',data,success,error);
    }

    factory.getCarryRecord = function(data,success,error){
        http_get('carryRecord',data,success,error);
    }
    factory.getDigRecord= function(data,success,error){
        http_get('digRecord',data,success,error);
    }

    factory.getStatis = function(data,success,error){
        http_get('waji/statis/latest',data,success,error);
    }
    factory.driverClock = function(data,success,error){
        http_get('driverClock',data,success,error);
    }
    return factory;
}).factory('locals',['$window',function($window){
    return{        //存储单个属性
        set :function(key,value){
            $window.localStorage[key]=value;
        },        //读取单个属性
        get:function(key,defaultValue){
            return  $window.localStorage[key] || defaultValue;
        },        //存储对象，以JSON格式存储
        removeItem:function(key){
            return $window.localStorage.removeItem(key);
        },
        setObject:function(key,value){
            $window.localStorage[key]=JSON.stringify(value);
        },        //读取对象
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}]);