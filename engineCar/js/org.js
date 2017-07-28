/**
 * Created by Administrator on 2017/4/1.
 */
m1.controller('mTable', function(comFun,$window,$q,$scope,$rootScope,$http,$timeout,locals) {  // 成功之后要重新获取数据

    var roleName = locals.get('roleName');

    if(!!roleName){
        if( roleName == "ROLE_BOSS" ){ // 是总裁
            $scope.roleBoss = true;
        }else{
            $scope.roleBoss = false;
        }
    }else{
        comFun.getInfo(function(data){
            if( data.state == 0){
                $scope.$apply(function () {
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
    }
    comFun.getMangerList(function(data){
        if(data.state == 0){
            $scope.$apply( function(){
                $scope.mList = angular.copy(data.list);
            });
        }
    });

    $scope.initM = {
        id:'',
        username: '',
        trueName: '',
        role2: ''
    }
    $scope.desM = angular.copy($scope.initM);
    $scope.selectedD = $scope.desM.role2;
    $scope.moption = [
        {name : "无", value : ""},
        {name : "挖机司机", value : "WJ"},
        {name : "运输车司机", value : "YSC"}
    ];

    $scope.$watch('selectedD', function(newValue, oldValue) {
        if(newValue === oldValue){
            return;
        }
        $scope.desM.role2 = $scope.selectedD;
    });

    $scope.saveFn = function(obj){ // 新增经理
        comFun.saveManger($j.param($scope.desM),function(data){
            $rootScope.$broadcast('tipsMsg', data, obj);
        });
    }

    $scope.saveM = function($event){
        var self = $j($event.target)
        var id =self.data('id');
        var con = self.parents('tr');
        var username = con.find(".username").html();
        var trueName = con.find(".truename").html();
        var role= con.find('.role').data('role');

        $scope.desM = {
            id: id,
            username: username,
            trueName: trueName,
            role2: role
        }

        $scope.selectedD = $scope.desM.role2;
        $j("#editManager").modal('show');
    }

    $scope.delete = function($event){
        var self = $j($event.target);
        $scope.dId = self.data('id');
        $j("#delete").modal('show');
    }

    $scope.deleteFn = function(obj){ // 删除经理
        comFun.deleteManger($scope.dId,function(data){
            $rootScope.$broadcast('tipsMsg',data,obj);
        });
    }
});

m1.controller('dw', function(comFun, $window, $rootScope, $scope, $state,$stateParams,$timeout, $filter, locals) { // 存起来
    $scope.role = $stateParams.role;
    $scope.mid = $stateParams.mid;
    // 根据角色找数据
    comFun.getDriver({
        "managerId" : $scope.mid,
        "role2" : $scope.role
    },function(data){
        if( data.state == 0){
            $scope.$apply(function(){
                $scope.dList = angular.copy( data.list );
            });
        }
    });

    $scope.dId = '';
    $scope.initM = {
        id:'',
        username: '',
        trueName: '',
        role2: $scope.role,
        'manager.id' : $scope.mid
    }

    $scope.desM = angular.copy( $scope.initM );
    $scope.selectedD = $scope.desM.role2;

    $scope.$watch('selectedD', function(newValue, oldValue) {
        if(newValue === oldValue){
            return;
        }
        $scope.desM.role2 = $scope.selectedD;
    });

    $scope.saveFn = function(obj){ // 新增司机
        comFun.saveDriver($j.param($scope.desM),function(data){
            $rootScope.$broadcast('tipsMsg',data,obj);
        });
    }


    $scope.saveM = function($event,obj){ // 编辑司机

        var self = $j($event.target);
        var id =self.data('id');
        var con = self.parents('tr');
        var truename = con.find('.truename').html();
        var username = con.find('.username').html();

        $scope.dId = id;
        $scope.roledes = '';

        switch ( $scope.role ){
            case 'WJ':
                $scope.roledes = '挖机司机';
                break;
            case 'YSC':
                $scope.roledes = '运输车司机';
                break;
        }

        $scope.desM = {
            id: id,
            username: username,
            trueName: truename,
            role2: $scope.role,
            'manager.id': $scope.mid
        }
        $j(obj).modal('show');

    }

    $scope.delete2 = function(obj){
        $j(obj).modal('show');
    }

    $scope.delete = function($event,obj){
        var self = $j($event.target);
        $scope.dId = self.data('id');
        $j(obj).modal('show');
    }

    $scope.deleteFn = function(obj){
        comFun.deleteDriver($scope.dId, function(data){
            $rootScope.$broadcast('tipsMsg',data,obj);
        });
    }

    $scope.goOrg = function(){
        $scope.$broadcast('gomList', $stateParams.mid );
        $state.go('org');
    };
});
m1.controller('wj', function(comFun,$window, $scope,$state, $rootScope,$stateParams,$timeout,$filter) {

    $scope.mid = $stateParams.mid;

    comFun.getWjlist($scope.mid, function(data){
        if( data.state == 0){
            $scope.$apply(function(){
                $scope.wjList = angular.copy( data.list );
            });
        }
    });

    $scope.initC = {
        id:'',
        digMachineNo: '',
        power: '',
        'manager.id': $scope.mid
    }

    $scope.dId = "";
    $scope.desC = angular.copy( $scope.initC );

    $scope.saveFn = function(obj){
        comFun.saveWjlist( $j.param($scope.desC) , function(data){
            $rootScope.$broadcast('tipsMsg',data,obj);
        });
    }

    $scope.delete2 = function(obj){
        $j(obj).modal('show');
    }

    $scope.delete = function($event,obj){
        var self = $j($event.target);
        $scope.dId = self.data('id');
        $j(obj).modal('show');
    }

    $scope.saveM = function($event,obj){
        var self = $j($event.target);
        var id =self.data('id');
        var con = self.parents('tr');
        var digMachineNo = $j.trim( con.find('.no').html() );
        var power = Number($j.trim( con.find('.num').html() ));

        $scope.dId = id;
        $scope.desC = {
            id: id,
            "digMachineNo": digMachineNo,
            "power": power,
            'manager.id': $scope.mid
        }
        $j(obj).modal('show');
    }
    $scope.deleteFn = function(obj){
        comFun.deleteWjlist( $scope.dId, function( data ){
            $rootScope.$broadcast('tipsMsg',data, obj);
        });
    }
    $scope.goOrg = function(){
        $scope.$broadcast('gomList', $stateParams.mid );
        $state.go('org');
    };
});
m1.controller('ysc', function(comFun,$window,$scope,$http,$state, $rootScope,$stateParams,$timeout) {
    $scope.role = $stateParams.role;
    $scope.mid = $stateParams.mid;

    comFun.getYscList($scope.mid,function(data){
        if( data.state == 0){
            $scope.$apply(function(){
                $scope.yscList = angular.copy( data.list );
            });
        }
    });

    $scope.initC = {
        id:'',
        "carrierCarNo": '',
        tonnage: '',
        'manager.id' : $scope.mid
    }

    $scope.desC = angular.copy($scope.initC );
    $scope.saveFn = function(obj){
        comFun.saveYscList($j.param($scope.desC),function(data){
            $rootScope.$broadcast('tipsMsg',data,obj);
        });
    }

    $scope.saveM = function($event,obj){

        var self = $j($event.target);
        var id =self.data('id');
        var con = self.parents('tr');
        var carrierCarNo = $j.trim( con.find('.no').html() );
        var tonnage = Number($j.trim( con.find('.num').html() ));

        $scope.dId = id;

        $scope.desC = {
            id: id,
            "carrierCarNo": carrierCarNo,
            "tonnage": tonnage,
            'manager.id': $scope.mid
        }

        $j(obj).modal('show');
    }

    $scope.delete2 = function(obj){
        $j(obj).modal('show');
    }

    $scope.delete = function($event,obj){
        var self = $j($event.target);
        $scope.dId = self.data('id');
        $j(obj).modal('show');
    }

    $scope.deleteFn = function(obj){
        comFun.deleteYscList($scope.dId,function(data){
            console.log(data);
            $rootScope.$broadcast('tipsMsg',data,obj);
        });
    }

    $scope.goOrg = function(){
        $scope.$broadcast('gomList', $stateParams.mid );
        $state.go('org');
    };

});
