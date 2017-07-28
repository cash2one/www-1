/**
 * Created by Administrator on 2017/4/22.
 */


m1.controller('homeSide', function(comFun,$window,$scope,$rootScope,$location,$state,$stateParams,$timeout) {
    comFun.getThing(function(data){
        if( data.state == 0){
            $scope.$apply(function(){
                $scope.thList = data.list;
                $scope.initId = $scope.thList[0].id;
                $scope.initName = $scope.thList[0].name;
                $rootScope.$broadcast("thList", $scope.thList);
                $rootScope.$broadcast("carIdChange", $scope.initId, $scope.initName);
            });
        }
    });

    $scope.goHome = function($event){
        var self = $j($event.target);
        var id = self.data("id");
        var name = self.data("name");

        $scope.initId = id;
        $scope.name = name;
        $rootScope.$broadcast("carIdChange", $scope.initId, $scope.name);
    }
});

m1.controller('homeCon', function(comFun,$window,$scope,$rootScope,$location,$state,$stateParams,$timeout,locals) {
    $scope.roleBoss = true;

    var role_boss = locals.get('roleName');

    if(role_boss == 'ROLE_BOSS'){
        $scope.roleBoss = true;
    }else{
        $scope.roleBoss = false;
    }

    var compare = function (data,data1, data2){
        var absVal = Math.abs(data1 - data2 );
        var val = data1 - data2;
        var arr = {};

        if(data2 == 0) {
            arr[data + 'p'] = "--";
        }else{
            if( absVal == val){ // 是正数
                arr[data+'c'] = true;
                arr[data + 'p'] = Math.round(absVal / data2 * 10000) / 100.00 + "%";
            }else{ // 是负数
                arr[data + 'p'] = Math.round(absVal / data2 * 10000) / 100.00 + "%";
                arr[data+'c'] = false;
            }
        }
        return arr;
    }

    var getStatisFn = function( d , name ){ // 获取
        comFun.getStatis({"cargoTypeId": d}, function(data){
            if(data.state == 0){
                var carry = data.carry;
                var yesdayC= carry.yesterdayAmount || 0;
                var todayC = carry.todayAmount || 0;
                var thisMonthC= carry.thisMonthAmount || 0;
                var lastMonthC = carry.lastMonthAmount || 0;
                var c = $j.extend(compare('day',todayC, yesdayC), compare('month',thisMonthC, lastMonthC));

                c["today"] = todayC;
                c["thisMonth"] = thisMonthC;
                c["name"] = name;

                if(!$scope.roleBoss){
                    var dig = data.dig;
                    var yesdayD = dig.yesterdayAmount;
                    var todayD = dig.todayAmount;
                    var thisMonthD = dig.thisMonthAmount;
                    var lastMonthD = dig.lastMonthAmount;

                    var d = $j.extend(compare('day',todayD, yesdayD), compare('month',thisMonthD, lastMonthD));

                    d["today"] = todayD;
                    d["thisMonth"] = thisMonthD;

                    d["name"] = name;
                    $scope.$apply( function(){
                        $scope.indicatorC = angular.copy(c);
                        $scope.indicatorD = angular.copy(d);
                    });
                }else{
                    $scope.$apply( function(){
                        $scope.indicatorC = angular.copy(c);
                    });
                }
            }
        });
    };

    $scope.$on("thList",function(event,data){
        $scope.thList = data;
    });

    $scope.$on("carIdChange",function(event,data1,data2){
        getStatisFn(data1,data2);
    });
});

