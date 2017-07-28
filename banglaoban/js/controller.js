/**
 * Created by Administrator on 2017/3/30.
 */
var $j = jQuery.noConflict();
var firstMid = '';

var tip_tc = function($timeout,status,callback){
    if( status =='success' ){
        $j('#tip_s').modal('show').css({
            width: 'auto',
            'margin-top': function () {
                return 50;
            }
        }).on('shown.bs.modal',function(){
            callback && callback();
            var a = $timeout(function(){
                //$j('#tip_s').modal('hide');
                $j('.modal').map(function() {
                    $j(this).modal('hide');
                });
                $timeout.cancel(a);
            },500);
        });
    }else if(status=='fail' ){
        $j('#tip_f').modal('show').css({
            width: 'auto',
            'margin-top': function () {
                return 50;
            }
        }).on('shown.bs.modal', function() {
            var a = $timeout(function(){
                $j('#tip_f').modal('hide');
                $timeout.cancel(a);
            },500);
        });
    }
}

m1.controller('tips', function($rootScope,$timeout,$window,$scope) {
    $scope.$on('tipsMsg',function(event,data,obj){
        $scope.$apply( function(){
            $scope.msg = data.note;
        });
        if( data.state == 0){
            $j(obj).modal('hide');
            tip_tc($timeout,'success',function(){
                $window.location.reload();
            });
        }else{
            tip_tc($timeout,'fail');
        }
    });
});

m1.controller('log', function(comFun,$rootScope,$timeout,$window,$scope) {

    var log = function(){
        comFun.log( $j.param($scope.logInfo),function(data){
            if(data.state==0){
                $j(obj).modal('hide');
                $window.location.reload();
                $window.localStorage.clear();
            }else{
                $rootScope.$broadcast('tipsMsg',data);
            }
        });
    }

    $scope.logFn = function($event,obj ){
        log();
    }

    $scope.doSomeThing = function(e){
        console.log( e );
        if($event.keyCode==13){//回车
            log();
        }
    };
});

m1.controller('hasLog', function(comFun,$window,$rootScope,$scope,$q,$http,locals) {
    $rootScope.userInfo = null;
    $scope.trueName = '';
    comFun.getInfo(function(data){
        if( data.state == 0){
            $scope.$apply(function () { // 更新视图
                $scope.trueName = angular.copy(data.trueName);
            });
            locals.set('roleName', data.roleName);
        }else{
            $rootScope.$broadcast('tipsMsg',data);
        }
    });
    $scope.logInfo = {
        j_username : '',
        j_password : ''
    }
    $scope.logOut = function(){
        comFun.goOut();
    }
    $scope.showLog = function(){
        $j('#log').modal('show');
    }
});


m1.controller('mList',['comFun','$q','$scope','$rootScope','$http','$state', '$location','locals',
    function(comFun,$q,$scope,$rootScope,$http,$state,$location,locals) {
        var defer = $q.defer();
        var promise = defer.promise;

        comFun.getMangerList(function(data){
            if(data.state == 0){
                $scope.$apply(function(){
                    $scope.mList = angular.copy(data.list);
                });
                locals.set('firstMid', $scope.mList[0].id );
                locals.setObject('mList', data.list);
            }
        });

        $scope.pathParams = $location.search(); // 路径参数
        $scope.nowIndex = 0;
        $scope.mIndex = 0;
        $scope.curIndex ="";

        $scope.mToggle = function($event){
            var self = $j($event.target);
            self.parent().toggleClass('cur');
            if( self.parent().hasClass('cur') ){
                self.find('.icon_12').removeClass('icon_add');
            }else{
                self.find('.icon_12').addClass('icon_add');
            }
        }

        $scope.mToggle2 = function($event){
            var self = $j($event.target);
            self.addClass('on').parent().siblings().find('.js_tit').removeClass("on");
        }

        $scope.toggleTab = function($event,item){
            var state='';
            var self = $j($event.target);
            var managerId = self.data('mid');
            $scope.pathParams = {
                mid: managerId,
                role: item
            }

            switch (item){
                case 'WJ':
                    state = 'org.dw';
                    break;
                case 'YSC':
                    state = 'org.dy';
                    break;
                case 'wj_c':
                    state = 'org.wj';
                    break;
                case 'ysc_c':
                    state = 'org.ysc';
                    break;
                default :
                    state = 'org';
            }
            $state.go(state, $scope.pathParams);
        }

        $scope.goOrg = function(){
            var state = 'org';
            $state.go( state);
        }

        $scope.mToggle3 = function($event,item){
            var self = $j($event.target);
            var managerId = self.data('mid');
            var index = self.data('index');
            var isFirst = $j.isEmptyObject( $location.search() );

            if( isFirst ){ // 是空的情况下
                $scope.time = 'day';
            }else{
                var params =  $location.search();
                $scope.time = params.t;
            }

            $scope.pathParams = {
                mid: managerId,
                role: item,
                t: $scope.time
            }
            $rootScope.$broadcast('managerIdChange', item ,managerId, $scope.time);
            if( !!index ){
                $state.go('pro.m', $scope.pathParams);
            }else{
                $state.go('pro');
            }
        }

        $scope.$on('gomList', function( data ){
            $scope.pathParams.mid = '';
        });

        $scope.$on('roleChange', function(event, data){

            console.log( data );

            $scope.pathParams["role"] = data;
        });

        $scope.togglePro = function($event,item){
            var state='';
            var self = $j($event.target);
            var managerId = self.data('mid');
            var isFirst = $j.isEmptyObject( $location.search() );

            if( isFirst ){ // 是空的情况下
                $scope.time = 'day';
            }else{
                var params =  $location.search();
                $scope.time = params.t;
            }

            $scope.pathParams = {
                mid: managerId,
                role: item,
                t: $scope.time
            }
            switch (item){
                case 'WJ':
                    state = 'pro.dw';
                    break;
                case 'YSC':
                    state = 'pro.dy';
                    break;
                case 'wj_c':
                    state = 'pro.wj';
                    break;
                case 'ysc_c':
                    state = 'pro.ysc';
                    break;
                case 'm':
                    state = 'pro.m';
                    break;
                default :
                    state = 'pro';
            }
            $rootScope.$broadcast('managerIdChange', item ,managerId, $scope.time);
            $state.go(state, $scope.pathParams);
        }
        $scope.goPro = function(){
            var state = 'pro';
            $state.go( state );
        }
        $scope.mOk = function(){
            return false;
        }
    }]);


