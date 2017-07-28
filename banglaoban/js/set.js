/**
 * Created by Administrator on 2017/3/30.
 */
m1.controller('setC',function(comFun, $rootScope, $scope, $location, $state,$timeout,$window,locals){

    var state = null;
    $scope.pathParams = $location.search();

    $scope.toggle = function ($event,item){
        if( item == 'info'){
            $scope.pathParams = {}
        }else{
            $scope.pathParams = {
                set : item
            }
        }
        switch (item){
            case 'info':
                state  = 'set';
                break;
            case 'pwd':
                state  = 'set.pwd';
                break;
            case 'limit':
                state  = 'set.limit';
                break;
        }
        $state.go( state ,{set: item });
    }

    /* 个人信息部分 S */
    $scope.mOption = [
        {name : '无', value : ''},
        {name : "挖机司机", value : "WJ"},
        {name : "运输车司机", value : "YSC"}
    ];

    // 页面多视图部分 E
    comFun.getInfo(function(data){
        if( data.state == 0){
            $scope.$apply(function () {
                $scope.initInfo = angular.copy(data);
                $scope.userInfo = angular.copy( data );
                $scope.selectedD = $scope.userInfo.role2;

                if( data.roleName == "ROLE_BOSS" ){ // 是总裁
                    $scope.roleBoss = true;
                }else{
                    $scope.roleBoss = false;
                }
            });
        }else{
            $rootScope.$broadcast('tipsMsg',data);
        }
    });

    $scope.subInfo = function(data){
        comFun.updateInfo($j.param( $scope.userInfo), function(data){
            $rootScope.$broadcast('tipsMsg',data);
        });
    }
    /* 个人信息部分 E */

    /* 密码修改 S */
    $scope.initPwd = {
        newPassword1: '',
        newPassword2: '',
        oldPassword: ''
    };

    $scope.pwd = angular.copy( $scope.initPwd );

    $scope.subPwd = function(){
        comFun.changePwd( $j.param($scope.pwd), function( data ){
            $rootScope.$broadcast('tipsMsg',data, obj);
        });
    };
    /* 密码修改 E */
});

m1.controller('setPower',function(comFun, $rootScope, $scope, $location, $state,$timeout,$window,locals) {
    /* 权限修改 S */
    $scope.radioObj = [
        {
            value:'DEPT',
            name:'挖机司机只能选择本部门挖机'
        },
        {
            value:'ALL',
            name:'挖机司机可以选择全公司挖机'
        }
    ];

    comFun.getSet(function(data){
        if( data.state == 0){
            $scope.$apply(function(){
                $scope.radios = data.digMachineScopeForDigDriver;
            });
        }
    });

    $scope.subFn = function( item ){
        comFun.setSet($j.param({ "digMachineScopeForDigDriver" : item}),function(data){
            $rootScope.$broadcast('tipsMsg',data, obj);
        });
    }
});
