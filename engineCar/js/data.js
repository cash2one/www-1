/**
 * Created by Administrator on 2017/3/30.
 */

m1.controller('dataSec',function(comFun, $location,$scope,$q,$http,$timeout,$state,$location,locals){
    // 页面多视图部分 E
    var roleName = locals.get('roleName');

    if(!!roleName) {
        if (roleName == "ROLE_BOSS") { // 是总裁
            $scope.roleBoss = true;
        } else {
            $scope.roleBoss = false;
        }
    }
    //}else{
    //    comFun.getInfo(function(data){
    //        if( data.state == 0){
    //            $scope.$apply(function () {
    //                if( data.roleName == "ROLE_BOSS" ){ // 是总裁
    //                    $scope.roleBoss = true;
    //                }else{
    //                    $scope.roleBoss = false;
    //                }
    //            });
    //        }else{
    //            $rootScope.$broadcast('tipsMsg',data);
    //        }
    //    });
    //}
});

m1.controller('Data',function($location,$scope,$q,$http,$timeout,$state,$location){
    $scope.pathParams =  $location.search();
    $scope.toggleSec = function($event,item){
        var state = '';
        if( item == 'load'){
            $scope.pathParams = {
                des : ''
            }
        }else{
            $scope.pathParams = {
                des : item
            }
        }

        switch (item){
            case 'load':
                state = 'data';
                break;
            case 'unload':
                state = 'data.unload';
                break;
            case 'distance':
                state = 'data.dis';
                break;
            case 'things':
                state = 'data.th';
                break;
            case 'oil':
                state = 'data.oil';
                break;
        }

        $state.go(state,{des:item});
    }
    $scope.toggleCur = function($event){
        var self = $j($event.target);
        self.find('.icon_12').toggleClass('icon_add');

        if( self.find('.icon_12').hasClass('icon_add') ){
            self.siblings("a").hide();
        }else{
            self.siblings("a").show();
        }
    };
});

m1.controller('loadC',['$rootScope','comFun','$scope','$http','$timeout','$window',function($rootScope,comFun,$scope, $http, $timeout,$window){
    comFun.getloadList(function(data){
        if( data.state == 0){
            $scope.$apply(function(){
                $scope.loadList = angular.copy(data.list);
            });
        }
    });
    $scope.initC = {
        id: '',
        name: ''
    };
    $scope.desM = angular.copy($scope.initC);

    $scope.saveFn = function(obj){ // 保存装车地点
        comFun.saveload( $j.param($scope.desM),function(data){
            $rootScope.$broadcast('tipsMsg',data, obj);
        });
    }

    $scope.saveM = function($event, obj){
        var self = $j($event.target);
        var id =self.data('id');
        var con = self.parents('tr');
        var name = con.find('.area').html();
        $scope.desM = {
            id: id,
            name: name
        }
        $j(obj).modal('show');
    }

    $scope.delete = function($event, obj){
        var self = $j($event.target);
        $scope.dId = self.data('id');
        $j(obj).modal('show');
    }

    $scope.deleteFn = function(obj){
        comFun.deleteLoad( $scope.dId ,function(data){
            $rootScope.$broadcast('tipsMsg',data, obj);
        });
    }
}]);
m1.controller('unloadC',['$rootScope','comFun','$scope','$http','$timeout','$window',function($rootScope,comFun,$scope, $http, $timeout,$window){
    comFun.getUnload(function(data){
        if( data.state == 0){
            $scope.$apply(function(){
                $scope.unload = angular.copy(data.list);
            });
        }
    });
    $scope.initC = {
        id: '',
        name: ''
    };
    $scope.desM = $scope.initC;
    $scope.saveFn = function(obj){ // 保存卸车地点
        comFun.saveUnload( $j.param($scope.desM), function(data){
            $rootScope.$broadcast('tipsMsg',data, obj);
        });
    }

    $scope.saveM = function($event, obj){
        var self = $j($event.target);
        var id =self.data('id');
        var con = self.parents('tr');
        var area = con.find('.area').html();
        $scope.desM = {
            id: id,
            name: area
        }
        $j(obj).modal('show');
    }

    $scope.delete = function($event, obj){
        var self = $j($event.target);
        $scope.dId = self.data('id');
        $j(obj).modal('show');
    }

    $scope.deleteFn = function(obj){
        comFun.deleteLoad( $scope.dId ,function(data){
            $rootScope.$broadcast('tipsMsg',data, obj);
        });
    }
}]);
m1.controller('thC',['$rootScope','comFun','$scope','$http','$timeout','$window',function($rootScope,comFun,$scope, $http, $timeout,$window) {
        comFun.getThing(function(data){
            if( data.state == 0){
                $scope.$apply(function(){
                    $scope.thList = angular.copy(data.list);
                });
            }
        });
        $scope.dId = "";
        $scope.initM = {
            id: '',
            name: '',
            priceForDigMachine : ''
        }

        $scope.modelM = angular.copy( $scope.initM ) ;

        $scope.saveFn = function(obj){
            comFun.saveThing( $j.param($scope.modelM) ,function(data){
                $rootScope.$broadcast('tipsMsg',data, obj);
            });
        };

        $scope.saveM = function($event, obj){
            var self = $j($event.target);
            var id =self.data('id');
            var con = self.parents('tr');
            var name = con.find('.name').html();
            var price = Number( $j.trim( con.find('.price').html()));

            $scope.dId = id;

            $scope.modelM = {
                id: id,
                name: name,
                priceForDigMachine: price
            }
            $j(obj).modal('show');
        }

        $scope.delete = function($event, obj){
            var self = $j($event.target);
            $scope.dId = self.data('id');
            $j(obj).modal('show');
        }

        $scope.deleteFn = function(obj){
            console.log($scope.dId);
            comFun.deleteThing($scope.dId, function(data){
                $rootScope.$broadcast('tipsMsg',data, obj);
            });
        };

        $scope.delete2 = function(obj){
            $j(obj).modal('show');
        };
    }]
);
m1.controller('oilC',['$scope','$http','$timeout',function($scope, $http, $timeout) {
        $scope.oilList = [
            {
                name: '98号汽油',
                price: 9,
                id: 1
            },
            {
                name: '96号汽油',
                price: 2,
                id: 2
            }
        ];

        $scope.initM = {
            id: '',
            price: '',
            name: ''
        }

        $scope.modelM = $scope.initM;

        $scope.saveFn = function(obj){  // 油的地址
            $http({
                method:"POST",
                url: URL + '/place/unload',
                data: $j.param($scope.modelM),
                headers:{'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data) {
                $rootScope.$broadcast('tipsMsg',data, obj);
            }).error(function(){
                tip_tc($timeout,'fail');
            });
        }
        $scope.saveM = function($event, obj){
            var self = $j($event.target);
            var id =self.data('id');
            var con = self.parents('tr').find('td');

            $scope.modelM = {
                id: id,
                name: con.eq(0).html(),
                price: con.eq(1).html()
            }

            $j(obj).modal('show');
        }

        $scope.delete = function($event, obj){
            //var self = $j($event.target);
            //$scope.dId = self.data('id');
            $j(obj).modal('show');
        }

        $scope.deleteFn = function(obj){ // 删除
            //$http({
            //    method:"GET",
            //    url: URL + 'place/delete/'+$scope.dId
            //    data: {
            //        id: $scope.dId
            //    },
            //    headers:{'Content-Type': 'application/x-www-form-urlencoded'}
            //}).success(function (data) {
            //
            $j(obj).modal('hide');
            tip_tc($timeout,'success');
            $scope.modelM = $scope.initM;

            //
            //}).error(function(){
            //    tip_tc($timeout,'fail');
            //});
        }

        $scope.delete2 = function(obj){
            $j(obj).modal('show');
        }

    }]
)