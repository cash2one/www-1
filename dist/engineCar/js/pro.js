/**
 * Created by Administrator on 2017/4/5.
 */
m1.controller('proSec', function(comFun,$window,$scope,$rootScope,$location,$state,$stateParams,$http,$timeout,locals) {

     //成功之后要重新获取数据
    $scope.pageSize = 6;
    $scope.pageInit = function(){
        $scope.mdaypageNum = 0;
        $scope.mpropageNum = 0;
        $scope.wjdaypageNum = 0;
        $scope.wjpropageNum = 0;
        $scope.yscdaypageNum = 0;
        $scope.yscpropageNum = 0;
        $scope.dwdaypageNum = 0;
        $scope.dwpropageNum = 0;
        $scope.dydaypageNum = 0;
        $scope.dypropageNum = 0;
    }
    $scope.pageInit();


    var isEmpty = $j.isEmptyObject( $location.search() );
    if( isEmpty ){ // 是空的情况下
        $scope.mid = locals.get('firstMid');
        $scope.t = 'day';
        $scope.role = 'm';
    }else{
        var params =  $location.search();
        $scope.mid = params.mid;
        $scope.t = params.t;
        $scope.role = params.role;
    }


    var time1 = locals.get('gotime1');
    var time2 = locals.get('gotime2');
    var time3 = locals.get('gotime3');

    if( $scope.t == 'day'){ // 天
        $scope.time1 = time1 || formatDate( new Date( new Date().getTime() ));
        $scope.time2 = formatTime( new Date(new Date().getTime() - 86400000));
        $scope.time3 = formatTime( new Date( new Date().getTime() ));

        locals.removeItem('gotime1');
        locals.removeItem('gotime2');
        locals.removeItem('gotime3');

    }else if( $scope.t=='period'){
        $scope.time1 = formatDate( new Date( new Date().getTime() ));
        $scope.time2 = time2 || formatTime( new Date(new Date().getTime() - 86400000));
        $scope.time3 = time3 || formatTime( new Date( new Date().getTime() ));

        locals.removeItem('gotime1');
        locals.removeItem('gotime2');
        locals.removeItem('gotime3');
    }

    comFun.getMangerList(function(data){
        if(data.state == 0){
            var mList = data.list;
            mList.forEach(function(element, index){
                var self = $j(element)[0];
                if( self.id == $scope.mid ){
                    $scope.mName = self.trueName;
                }
            });
        }
    });

    $scope.gocar= function($event, item1, item2){  //带上ID
        var self = $j($event.target);
        var id = self.data('id');
        var no = self.data('number');
        var state = '';
        var belong = self.parents('tr').find('.js_name').html();
        if(!no){
            return false;
        }
        if( $scope.role == 'm' ){
            locals.set('belong', '');
        }else{
            locals.set('belong', belong + ' > ');
        }

        if( item1 == 'w'){
            state = 'pro.wj_car';
        }else if(item1=='y'){
            state = 'pro.ysc_car';
        }else if(item1=='m'){
            state = 'pro.match_car';
        }

        var obj = {
            day: $scope.time1 || format( new Date( new Date().getTime() ) ,"yyyy-MM-dd" ),
            startDate: $scope.time2 || format( new Date(new Date().getTime() - 86400000), "yyyy-MM-dd hh:mm" ),
            endDate: $scope.time3 || format( new Date(new Date().getTime()), "yyyy-MM-dd hh:mm" ) ,
            id: id,
            wy: item1,
            role: item2,
            t: $scope.t,
            mid: $scope.mid
        }
        locals.setObject('gocarobj', obj );
        $state.go( state,{role: item2, t: $scope.t, mid: $scope.mid});
    }

    $scope.gocarM=function($event, item1, item2){  //带上ID
        var self = $j($event.target);
        var id = self.data('id');
        var idM = self.data('number');
        var state = '';
        var belong = self.parents('tr').find('.js_name').html();
        console.log(idM,"idM",id,"id");
        if( $scope.role == 'm' ){
            locals.set('belong', '');
        }else{
            locals.set('belong', belong + ' > ');
        }

        if( item1 == 'w'){
            state = 'pro.wj_car';
        }else if(item1=='y'){
            state = 'pro.ysc_car';
        }else if(item1=='m'){
            state = 'pro.match_car';
        }

        var obj = {
            day: $scope.time1 || format( new Date( new Date().getTime() ) ,"yyyy-MM-dd" ),
            startDate: $scope.time2 || format( new Date(new Date().getTime() - 86400000), "yyyy-MM-dd hh:mm" ),
            endDate: $scope.time3 || format( new Date(new Date().getTime()), "yyyy-MM-dd hh:mm" ) ,
            id: id,
            idM:idM,
            wy: item1,
            role: item2,
            t: $scope.t,
            mid: $scope.mid
        }
        locals.setObject('gocarobj', obj );
        $state.go( state,{role: item2, t: $scope.t, mid: $scope.mid});
    }

    $scope.goAllTime= function($event, item1, item2){  //到总工时页面  等待完成
        var self = $j($event.target);
        var id = self.data('id');
        var no = self.data('number');
        var state = '';
        var belong = self.parents('tr').find('.js_name').html();


        if( $scope.role == 'm' ){
            locals.set('belong', '');
        }else{
            locals.set('belong', belong + ' > ');
        }
        state = "pro.driver";
        var obj = {
            day: $scope.time1 || formatDate( new Date( new Date().getTime() )),
            startDate: $scope.time2 || formatTime( new Date(new Date().getTime() - 86400000)),
            endDate: $scope.time3 || formatTime( new Date(new Date().getTime())),
            id: id,
            wy: item1,
            role: item2,
            t: $scope.t,
            mid: $scope.mid
        }
        locals.setObject('gotimeobj', obj );
        $state.go( state,{role: item2, t: $scope.t, mid: $scope.mid});
    }

    $scope.goMatchCar=function($event, item1, item2){
    //pro.match_car
        var self = $j($event.target);
        var id = self.data('id');
        var no = self.data('number');
        var state = 'pro.match_car';
        var belong = self.parents('tr').find('.js_name').html();


        if( $scope.role == 'm' ){
            locals.set('belong', '');
        }else{
            locals.set('belong', belong + ' > ');
        }
        // state = "";
        var obj = {
            day: $scope.time1 || formatDate( new Date( new Date().getTime() )),
            startDate: $scope.time2 || formatTime( new Date(new Date().getTime() - 86400000)),
            endDate: $scope.time3 || formatTime( new Date(new Date().getTime())),
            id: id,
            wy: item1,
            role: item2,
            t: $scope.t,
            mid: $scope.mid
        }
        locals.setObject('gomatchobj', obj );
        $state.go( state,{role: item2, t: $scope.t, mid: $scope.mid});
    };

    $scope.showDetails = function($event,data) {
        if( data == 'wj'){
            $j("#showMwj").modal('show');
        }else{
            $j("#showMysc").modal('show');
        }
    }

    $scope.showwDetails = function($event) {
        var id = $j($event.target).data('id');
        $scope.wjList.forEach(function (element,index) {
            if( element.id == id){
                $scope.carModel = element;
                $j("#wDetails").modal('show');
            }
        });
    }
    $scope.showyDetails = function($event) {
        var id = $j($event.target).data('id');
        $scope.yscList.forEach(function (element,index) {
            if( element.id == id){
                $scope.carModel = element;
                $j("#yDetails").modal('show');
            }
        });
    }
    comFun.getThing(function(data){
        if( data.state == 0){
            $scope.things = data.list;
            $scope.thLen = data.list.length;
        }
    });

    var getMdata = function(){ // 获取经理数据
        $scope.mDlist = [];
        if( $scope.t == "day" ){
            comFun.getDailym({
                'day' : $scope.time1,
                'managerId':$scope.mid ,
                'page.page': $scope.mdaypageNum
            } ,function(data){
                if( data.state == 0){
                    $scope.$apply(function(){
                        $scope.mDlist = angular.copy(data.list);
                    });
                    $scope.$broadcast('mdatachange', data.pageNum, $scope.pageSize, data.totalPage, data.totalElement,$scope.t);
                }
            });
        }else if( $scope.t == 'period' ){
            comFun.getPeriodM({
                'start': $scope.time2,
                'end': $scope.time3,
                'managerId':$scope.mid,
                'page.page': $scope.mpropageNum
            },function(data){
                if( data.state == 0){
                    $scope.$apply(function(){
                        $scope.mDlist = angular.copy(data.list);
                    });
                    $scope.$broadcast('mdatachange', data.pageNum, $scope.pageSize, data.totalPage, data.totalElement,$scope.t);
                }
            });
        }
    }


    var getdwData = function(){ // 获取挖机司机
        $scope.dwList = [];
        if( $scope.t == "day" ){
            comFun.getDailyDw(
                {'day': $scope.time1, 'managerId': $scope.mid,'page.size': $scope.pageSize, 'page.page': $scope.dwdaypageNum}
                ,function(data){
                if( data.state == 0){
                    $scope.$apply(function(){
                        $scope.dwList = angular.copy(data.list);
                        $scope.$broadcast('dwdatachange', data.pageNum, $scope.pageSize, data.totalPage, data.totalElement,$scope.t);
                    });
                }
            });
        }else if( $scope.t == 'period' ){
            comFun.getPeriodDw(
                {'start': $scope.time2, 'end': $scope.time3, 'managerId': $scope.mid,'page.size': $scope.pageSize, 'page.page': $scope.dwpropageNum}
                ,function(data){
                if( data.state == 0){
                    $scope.$apply(function(){
                        $scope.dwList = angular.copy(data.list);
                        $scope.$broadcast('dwdatachange', data.pageNum, $scope.pageSize, data.totalPage, data.totalElement,$scope.t);
                    });
                }
            });
        }
    }
    var getdyData = function(){ // 获取运输车司机
        $scope.dyList = [];
        if( $scope.t == "day" ){
            comFun.getDailyDy({'day': $scope.time1, 'managerId': $scope.mid,'page.size': $scope.pageSize, 'page.page': $scope.dydaypageNum},function(data){
                if( data.state == 0){
                    $scope.$apply(function(){
                        $scope.dyList = angular.copy(data.list);
                        $scope.$broadcast('dydatachange', data.pageNum, $scope.pageSize, data.totalPage, data.totalElement,$scope.t);
                        //console.log($scope.role);
                    });
                }
            });
        }else if( $scope.t == 'period' ){
            comFun.getPeriodDy({'start': $scope.time2, 'end': $scope.time3,'managerId': $scope.mid,'page.size': $scope.pageSize, 'page.page': $scope.dypropageNum},function(data){
                if( data.state == 0){
                    $scope.$apply(function(){
                        $scope.dyList = angular.copy(data.list);
                        $scope.$broadcast('dydatachange', data.pageNum, $scope.pageSize, data.totalPage, data.totalElement,$scope.t);
                    });
                }
            });
        }
    }
    var getwjData = function(){ // 获取挖机数据
        $scope.wjList = [];
        if( $scope.t == "day" ){
            comFun.getDailyWj({
                'day': $scope.time1, 'managerId': $scope.mid,
                'page.size': $scope.pageSize, 'page.page': $scope.wjdaypageNum
            },function(data){
                if( data.state == 0){
                    $scope.$apply(function(){
                        $scope.wjList = angular.copy(data.list);
                        $scope.$broadcast('wjdatachange', data.pageNum, $scope.pageSize, data.totalPage, data.totalElement,$scope.t);
                    });
                }
            });
        }else if( $scope.t == 'period' ){
            comFun.getPeriodWj({'start': $scope.time2, 'end': $scope.time3,'managerId': $scope.mid,'page.size': $scope.pageSize, 'page.page': $scope.wjpropageNum},function(data){
                if( data.state == 0){
                    $scope.$apply(function(){
                        $scope.wjList = angular.copy(data.list);
                        $scope.$broadcast('wjdatachange', data.pageNum, $scope.pageSize, data.totalPage, data.totalElement,$scope.t);
                    });
                }
            });
        }
    }
    var getyscData = function(){ // 获取运输车数据
        $scope.yscList = [];
        if( $scope.t == "day" ){
            comFun.getDailyYsc({'day': $scope.time1, 'managerId': $scope.mid ,'page.size': $scope.pageSize, 'page.page': $scope.yscdaypageNum},function(data){
                if( data.state == 0){
                    $scope.$apply(function(){
                        $scope.yscList = angular.copy(data.list);
                        $scope.$broadcast('yscdatachange', data.pageNum, $scope.pageSize, data.totalPage, data.totalElement,$scope.t);
                    });
                }
            });

        }else if( $scope.t == 'period' ){
            comFun.getPeriodYsc({'start': $scope.time2, 'end': $scope.time3,'managerId': $scope.mid ,'page.size': $scope.pageSize, 'page.page': $scope.yscpropageNum},function(data){
                if( data.state == 0){
                    $scope.$apply(function(){
                        $scope.yscList = angular.copy(data.list);
                        $scope.$broadcast('yscdatachange', data.pageNum, $scope.pageSize, data.totalPage, data.totalElement,$scope.t);
                    });
                }
            });
        }
    }
    var goSec = function( role ){
        if( role == 'm'){
            getMdata();
        }else if( role == 'wj_c'){
            getwjData();
        }else if (role == 'ysc_c'){
            getyscData();
        }else if(role =='WJ'){
            getdwData();
        }else if(role == 'YSC'){
            getdyData();
        }
    }

    goSec( $scope.role);

    $scope.gowjList =  function($event, data) {
        locals.set('gotime1',$scope.time1);
        locals.set('gotime2',$scope.time2);
        locals.set('gotime3',$scope.time3);
        $rootScope.$broadcast('roleChange', data);
        goSec( data );
        $state.go( 'pro.wj',{role: data, t: $scope.t, mid: $scope.mid},{reload: true});
    }

    $scope.goyscList =  function($event, data) {
        locals.set('gotime1',$scope.time1);
        locals.set('gotime2',$scope.time2);
        locals.set('gotime3',$scope.time3);

        $rootScope.$broadcast('roleChange', data);
        goSec( data );
        $state.go( 'pro.ysc',{role: data, t: $scope.t, mid: $scope.mid},{reload: true});
    }


    $scope.$on('datetimechange', function(event, data) { //时间改变
        $scope.time1 = data;
        $scope.t = 'day';
        $scope.pageInit();
        goSec($scope.role);
    });


    $scope.$on('periodChange', function(event, data1, data2, data3) { //区域改变
        $scope.time2 = data1;
        $scope.time3 = data2;
        $scope.t = data3;
        $scope.pageInit();
        goSec($scope.role);
    });

    $scope.$on('managerIdChange', function(event, role , mid, time) {  // 经理改变
        $scope.mid = mid;
        $scope.role = role;
        $scope.t = time;

        $scope.pageInit();
        goSec($scope.role);
    });

    $scope.$on('mpagechange', function(event, data1, data2){
        var curpage = data1;
        var t= data2;
        if(t == 'day'){
            $scope.mdaypageNum = curpage
        }else if( t == 'period' ){
            $scope.mpropageNum = curpage
        }
        goSec($scope.role);
    });
    $scope.$on('dwpagechange', function(event, data1, data2){
        var curpage = data1;
        var t= data2;
        if(t == 'day'){
            $scope.dwdaypageNum = curpage
        }else if( t == 'period' ){
            $scope.dwpropageNum = curpage
        }
        goSec($scope.role);
    });

    $scope.$on('dypagechange', function(event, data1, data2){
        var curpage = data1;
        var t= data2;
        if(t == 'day'){
            $scope.dydaypageNum = curpage
        }else if( t == 'period' ){
            $scope.dypropageNum = curpage
        }
        goSec($scope.role);
    });

    $scope.$on('wjpagechange', function(event, data1, data2){
        var curpage = data1;
        var t= data2;
        if(t == 'day'){
            $scope.wjdaypageNum = curpage
        }else if( t == 'period' ){
            $scope.wjpropageNum = curpage
        }
        goSec($scope.role);
    });
    $scope.$on('yscpagechange', function(event, data1, data2){
        var curpage = data1;
        var t= data2;
        if(t =='day'){
            $scope.yscdaypageNum = curpage
        }else if( t =='period' ){
            $scope.yscpropageNum = curpage
        }
        goSec($scope.role);
    });
});

m1.controller('carOilSec', function(comFun, $scope, $rootScope, $location, $state, $stateParams, $http, $timeout, locals) {  // 成功之后要重新获取数据

    var stateParams = locals.getObject('gocarobj');
    var state = '';
    var status = '';

    var role = stateParams.role;
    var wy = stateParams.wy;
    var day = stateParams.day;
    var t = stateParams.t;
    var mid = stateParams.mid;

    switch (role) {
        case 'wj_c':
            status = 'pro.wj';
            break;
        case 'ysc_c':
            status = 'pro.ysc';
            break;
        case 'YSC':
            status = 'pro.dy';
            break;
        case 'WJ':
            status = 'pro.dw';
            break;
        case 'm':
            status = 'pro.m';
            break;
    }

    if( t=='day' ){ // 日
        $scope.tabTitle1 = day;
        $scope.tabTitle2 = '本日油耗';
    }else if( t=='period'){
        $scope.tabTitle1 = '时间区间';
        $scope.tabTitle2 = '区间油耗';
    }

    $scope.belong = locals.get('belong');
    if (/wj_c/.test( $location.path() ) || /ysc_c/.test( $location.path() ) ) {  // 是车的列表的话
        $scope.name = 'car';
        $scope.bread = "总数";
    }

    if (/oil/.test( $location.path() ) ) {  // 是油的话
        $scope.name = 'oil';
        $scope.bread = "油耗";
    }
    if( role == 'WJ' || role=='YSC' ){ // 是挖机司机和运输车司机的时候  不显示油
        $scope.oilShow = false;
    }else{
        $scope.oilShow = true;
    }
    $scope.ocTab = function( $event, item){
        if(item == 'car'){
            if(wy=='w'){
                state = "pro.wj_car";
            }else if( wy=='y'){
                state = "pro.ysc_car";
            }
            $scope.name = 'car';
            $scope.bread = "总数";
        }
        if(item == 'oil'){
            state = "pro.oil";
            $scope.name = 'oil';
            $scope.bread = "油耗";
        }
        $state.go( state );
    }


    $scope.goBack = function(){

        var mid = $stateParams.mid;
        var prames = {
            t: t,
            mid: mid,
            role: role
        }

        console.log(status);
        $state.go(status, prames,{reload:true});

        //$rootScope.back();
    }
});





m1.controller('driverTable', function(comFun, $scope, $rootScope, $location, $state, $stateParams, $http, $timeout, locals) {
    var data = {};
    var stateParams = locals.getObject('gotimeobj');
    var status = '';

    $scope.pageSize = 4;
    $scope.carrPage = 0;
    $scope.role = stateParams.role;
    $scope.id = stateParams.id;
    $scope.mid= stateParams.mid;
    $scope.t = stateParams.t;
    $scope.wy = stateParams.wy;
    $scope.day = stateParams.day;
    $scope.startDate = stateParams.startDate;
    $scope.endDate = stateParams.endDate;

    switch ($scope.role) {
        case 'wj_c':
            data["digMachineId"] = $scope.id;
            state = 'pro.wj';
            break;
        case 'ysc_c':
            data["carrierCarId"] = $scope.id;
            state = 'pro.ysc';
            break;
        case 'YSC':
            data["userId"] = $scope.id;
            state = 'pro.dy';
            break;
        case 'WJ':
            data["userId"] = $scope.id;
            state = 'pro.dw';
            break;
    }

    if($scope.role == 'm'){
        if($scope.wy == 'w'){
            data["wjManagerId"] = $scope.mid;
        }else if($scope.wy == 'y'){
            data["yscManagerId"] = $scope.mid;
        }
        state = 'pro.m';
    }

    $scope.belong = locals.get('belong');

    if( $scope.t == 'day' ){
        data['day'] = $scope.day;
    }else if($scope.t == 'period' ){
        data['startDate'] = $scope.startDate;
        data['endDate'] = $scope.endDate;
    }
    data['page.size'] = $scope.pageSize;
    $scope.driverPage = 0;

    var getDriverFn = function(){
        data['page.page'] = $scope.driverPage;
        comFun.driverClock(data, function(data){ // 挖机
            if( data.state=='0'){
                var list = data.list;
                $scope.$broadcast('driverPageChange', data.pageNum, $scope.pageSize , data.totalPage, data.totalElement);
                angular.forEach(list, function(data,index,array){
                    var clockOnPhotos = data["clockOnPhotos"][0];
                    var clockOffPhotos = data["clockOffPhotos"][0];

                    if(!!clockOnPhotos){
                        data["onPhotos"] = img_thumb_URL58 + clockOnPhotos;
                        data["onBgPhotos"] = img_bg_URL + clockOnPhotos;
                    }else{
                        data["onPhotos"] = '';
                        data["onBgPhotos"] = '';
                    }
                    if(!!clockOffPhotos){
                        data["offPhotos"] = img_thumb_URL58 + clockOffPhotos;
                        data["offBgPhotos"] = img_bg_URL + clockOffPhotos;
                    }else{
                        data["offPhotos"] = '';
                        data["offBgPhotos"] = '';
                    }
                    var onTime = data["onTime"];
                    var offTime = data["offTime"];
                    data["onTime"] = !!onTime ? formatTime( new Date( onTime)):"";
                    data["offTime"] = !!offTime ? formatTime( new Date( offTime)):"";
                });
                $scope.$apply( function(data){
                    $scope.driverList = list;
                });
            }
        });
    };

    getDriverFn();

    $scope.$on('clockPageChange',function(event, curPage){
        $scope.driverPage = curPage;
        getDriverFn();
    });

    $scope.showBigImg = function($event){
        var self = $j($event.target);
        var bigImg = self.data('img');
        $j('#bgImgShow').modal('show');
        $rootScope.$broadcast("imgsrc", [bigImg]);
    }

    $scope.goBack = function(){
        var mid = $stateParams.mid;
        var prames = {
            t: $scope.t,
            mid: mid,
            role: $scope.role
        }
        $state.go(state, prames,{reload:true});
    }
});
m1.controller('matchCar', function(comFun, $scope, $rootScope, $location, $state, $stateParams, $http, $timeout, locals) {
    var data = {};
    var stateParams = locals.getObject('gomatchobj');


    $scope.pageSize = 4;
    $scope.carrPage = 0;
    $scope.role = stateParams.role;
    $scope.id = stateParams.id;
    $scope.mid= stateParams.mid;
    $scope.t = stateParams.t;
    $scope.wy = stateParams.wy;
    $scope.day = stateParams.day;
    $scope.startDate = stateParams.startDate;
    $scope.endDate = stateParams.endDate;

    switch ($scope.role) {
        case 'wj_c':
            data["digMachineId"] = $scope.id;
            state = 'pro.wj';
            break;
        case 'ysc_c':
            data["carrierCarId"] = $scope.id;
            state = 'pro.ysc';
            break;
        case 'YSC':
            data["userId"] = $scope.id;
            state = 'pro.dy';
            break;
        case 'WJ':
            data["userId"] = $scope.id;
            state = 'pro.dw';
            break;
    }

    if($scope.role == 'm'){
        if($scope.wy == 'w'){
            data["wjManagerId"] = $scope.mid;
        }else if($scope.wy == 'y'){
            data["yscManagerId"] = $scope.mid;
        }
        state = 'pro.m';
    }

    $scope.belong = locals.get('belong');

    if( $scope.t == 'day' ){
        data['day'] = $scope.day;
    }else if($scope.t == 'period' ){
        data['start'] = $scope.startDate;
        data['end'] = $scope.endDate;
    }
    data['page.size'] = $scope.pageSize;
    $scope.driverPage = 0;

    var getDriverFn = function(){
        data['page.page'] = $scope.driverPage;
        if($scope.t == 'day'){
            comFun.matchCar(data, function(data){ // 挖机
                if( data.state=='0'){
                    var list = data.items,
                        _data=data;
                    $scope.$broadcast('driverPageChange', data.pageNum, $scope.pageSize , data.totalPage, data.totalElement);

                    $scope.$apply( function(data){
                        $scope.data=_data;
                        $scope.driverList = list;
                    });
                }
            });
        }else if($scope.t == 'period'){
            comFun.matchCar2(data, function(data){ // 挖机
                if( data.state=='0'){
                    var list = data.items,
                        _data=data;
                    $scope.$broadcast('driverPageChange', data.pageNum, $scope.pageSize , data.totalPage, data.totalElement);

                    $scope.$apply( function(data){
                        $scope.data=_data;
                        $scope.driverList = list;
                    });
                }
            });
        }

    };

    getDriverFn();

    $scope.$on('clockPageChange',function(event, curPage){
        $scope.driverPage = curPage;
        getDriverFn();
    });

    $scope.showBigImg = function($event){
        var self = $j($event.target);
        var bigImg = self.data('img');
        $j('#bgImgShow').modal('show');
        $rootScope.$broadcast("imgsrc", [bigImg]);
    }

    $scope.goBack = function(){
        var mid = $stateParams.mid;
        var prames = {
            t: $scope.t,
            mid: mid,
            role: $scope.role
        }
        $state.go(state, prames,{reload:true});
    }
});
m1.controller('drivePageCtrl', function ($scope) {
    $scope.$on('driverPageChange', function(event, pageNum, pageSize, totalPage, totalElement,t){ // 日子的改变
        $scope.totalItems = totalElement;
        $scope.currentPage = pageNum + 1 ;
        $scope.totalPage = totalPage;
        $scope.pageSize = pageSize;
        $scope.maxSize = 3;
        $scope.pageSelect = $scope.currentPage;
        $scope.pageSize = pageSize;
        $scope.t = t;
    });
    $scope.setPage = function () { // 将当前页面的当前页传递出去
        $scope.currentPage = $scope.pageSelect;
        $scope.$emit('clockPageChange', $scope.currentPage ,$scope.t);
    }
    $scope.pageChanged = function() {
        $scope.pageSelect = $scope.currentPage;
        $scope.$emit('clockPageChange', $scope.currentPage, $scope.t);
    };
});

m1.controller('wjTable', function(comFun, $scope, $rootScope, $location, $state, $stateParams, $http, $timeout, locals) {
     comFun.getloadList(function(data){
        if(data.state==0){
            data.list.unshift({'id':'','name':''});
            $scope.$apply(function(){
                $scope.loadList = data.list;
                $scope.load = data.list[0].name;
            });
        }
    });
    var data = {};
    var stateParams = locals.getObject('gocarobj');
    $scope.pageSize = 6;
    $scope.carrPage = 0;
    $scope.role = stateParams.role;
    $scope.id = stateParams.id;
    $scope.mid= stateParams.mid;
    $scope.t = stateParams.t;
    $scope.wy = stateParams.wy;
    $scope.day = stateParams.day;
    $scope.startDate = stateParams.startDate;
    $scope.endDate = stateParams.endDate;

    switch ($scope.role) {
        case 'm':
            data["digManagerId"] = $scope.mid;
            $scope.showE = true;
            $scope.showS = true;
            break;
        case 'wj_c':
            data["digMachineId"] = $scope.id;
            $scope.showE = true;
            $scope.showS = false;
            break;
        case 'WJ':
            data["userId"] = $scope.id;
            $scope.showE = false;
            $scope.showS = true;
            break;
        default :
            data["digManagerId"] = $scope.mid;
            $scope.showE = true;
            $scope.showS = true;
            break;
    }

    if( $scope.t == 'day' ){
        data['day'] = $scope.day;
    }else if($scope.t == 'period' ){
        data['startDate'] = $scope.startDate;
        data['endDate'] = $scope.endDate;
    }
    data['page.size'] = $scope.pageSize;
    $scope.digPage = 0;

    var getDigFn = function(){
        data['page.page'] = $scope.digPage;
        comFun.getDigRecord(data, function(data){ // 挖机
            if( data.state=='0'){
                var list = data.list;
                $scope.$broadcast('digPageChange', data.pageNum, $scope.pageSize , data.totalPage, data.totalElement);
                angular.forEach(list, function(data,index,array){
                    var data_photos = data.photos;
                    if(!!data_photos){
                        data["photos"] = img_thumb_URL58 + data_photos;
                        data["bgPhotos"] = img_bg_URL + data_photos;
                    }else{
                        data["photos"] = '';
                        data["bgPhotos"] = '';
                    }
                    data["createdDate"] = formatTime( new Date( data["createdDate"] ));
                });
                $scope.$apply( function(data){
                    $scope.carList = list;
                });
            }
        });
    }
    getDigFn();

    $scope.$on('wjCarPagechange',function(event, curPage){
        $scope.digPage = curPage;
        getDigFn();
    });
    $scope.showBigImg = function($event){
        var self = $j($event.target);
        var bigImg = self.data('img');
        $j('#bgImgShow').modal('show');
        $rootScope.$broadcast("imgsrc", [bigImg]);
    }
});
m1.controller('yscTable', function(comFun, $scope, $rootScope, $location, $state, $stateParams, $http, $timeout,$filter,locals) {
    var data = {};
    var stateParams = locals.getObject('gocarobj');
    $scope.pageSize = 6;
    $scope.carrPage = 0;
    $scope.role = stateParams.role;
    $scope.id = stateParams.id;
    $scope.idM = stateParams.idM;
    $scope.t = stateParams.t;
    $scope.wy = stateParams.wy;
    $scope.day = stateParams.day;
    $scope.startDate = stateParams.startDate;
    $scope.endDate = stateParams.endDate;
    console.log("yscTable");
    if( $scope.t == 'day' ){
        data['day'] = $scope.day;
    }else if($scope.t == 'peroid' ){
        data['startDate'] = $scope.startDate;
        data['endDate'] = $scope.endDate;
    }
    console.log( $scope.idM," $scope.idM");
    switch ($scope.role) {
        case 'm':
            data["managerId"] = $scope.id;
            $scope.showE = true;
            $scope.showS = true;
            $scope.showD = true;
            break;
        case 'c_m':
            data["carrierCarId"] = $scope.id;
            data["digMachineId"] = $scope.idM;
            $scope.showE = true;
            $scope.showS = true;
            $scope.showD = true;
            break;
        case 'ysc_c':
            data["carrierCarId"] = $scope.id;
            $scope.showE = true;
            $scope.showS = true;
            $scope.showD = true;
            break;
        case 'YSC':
            data["userId"] = $scope.id;
            $scope.showE = false;
            $scope.showS = true;
            break;
        default :
            data["managerId"] = $scope.id;
            $scope.showE = true;
            $scope.showS = true;
            break;
    }

    switch ( $scope.t ) {
        case 'day':
            data["day"] = $scope.day;
            break;
        case 'period':
            data["startDate"] = $scope.startDate;
            data["endDate"] = $scope.endDate;
            break;
    }

    data['page.size'] = $scope.pageSize;
    $scope.carrPage = 0;

    comFun.getUnload(function(data){
        if(data.state==0){
            data.list.unshift({'id':'','name':''});
            $scope.$apply(function(){
                $scope.unloadList = data.list;
                $scope.unload = data.list[0].name;
            });
        }
    });

    var getCarryFn = function(){
        data['page.page'] = $scope.carrPage;
        comFun.getCarryRecord(data, function(data){ // 运输车
            if( data.state=='0'){
                $scope.$broadcast('carrPageChange', data.pageNum, $scope.pageSize , data.totalPage, data.totalElement);

                var list = data.list;
                angular.forEach(list, function(data,index,array){
                    var data_photos = data.photos;
                    if(!!data_photos){
                        data["photos"] = img_thumb_URL58 + data_photos;
                        data["bgPhotos"] = img_bg_URL + data_photos;
                    }else{
                        data["photos"] = '';
                        data["bgPhotos"] = '';
                    }
                    data["createdDate"] = formatTime( new Date( data["createdDate"] ));
                });
                $scope.$apply( function(data){
                    $scope.carList = list;//进行数据传值
                });
            }
        });
    }
    getCarryFn();

    $scope.$on('yscCarPagechange',function(event, curPage){
        $scope.carrPage = curPage;
        getCarryFn();
    });
    // $scope.$on('yscCarPagechange',function(event, curPage){
    //     $scope.carrPage = curPage;
    //     getCarryFn();
    // });
    $scope.showBigImg = function($event){
        var self = $j($event.target);
        var bigImg = self.data('img');

        $j('#bgImgShow').modal('show');
        $rootScope.$broadcast("imgsrc", [bigImg]);
    }
});

m1.controller('bgImg', function(comFun, $scope, $location, $timeout, locals) {  // 成功之后要重新获取数据
     $scope.$on("imgsrc", function(event,data){
         $scope.imgArray = data;
    });
});
m1.controller('wjCarPageCtrl', function ($scope) { // 挖机的分页
    $scope.$on('digPageChange', function(event, pageNum, pageSize, totalPage, totalElement){ // 日子的改变
        $scope.totalItems = totalElement;
        $scope.currentPage = pageNum + 1 ;
        $scope.totalPage = totalPage;
        $scope.pageSize = pageSize;
        $scope.maxSize = 3;
        $scope.pageSelect = $scope.currentPage;
        $scope.pageSize = pageSize;
    });

    $scope.setPage = function () { // 将当前页面的当前页传递出去
        if($scope.pageSelect > $scope.totalPage ){
            $scope.pageSelect = $scope.currentPage;
            return false;
        }
        $scope.currentPage = $scope.pageSelect;
        $scope.$emit('wjCarPagechange', $scope.currentPage);

    }

    $scope.pageChanged = function() {
        $scope.pageSelect = $scope.currentPage;
        $scope.$emit('wjCarPagechange', $scope.currentPage);
    };
});
m1.controller('yscCarPageCtrl', function ($scope) {  // 运输车的分页
    $scope.$on('carrPageChange', function(event, pageNum, pageSize, totalPage, totalElement){ // 日子的改变
        $scope.totalItems = totalElement;
        $scope.currentPage = pageNum + 1 ;
        $scope.totalPage = totalPage;
        $scope.pageSize = pageSize;
        $scope.maxSize = 3;
        $scope.pageSelect = $scope.currentPage;
        $scope.pageSize = pageSize;
    });
    $scope.setPage = function () { // 将当前页面的当前页传递出去
        if($scope.pageSelect > $scope.totalPage ){
            $scope.pageSelect = $scope.currentPage;
            return false;
        }

        $scope.currentPage = $scope.pageSelect;
        $scope.$emit('yscCarPagechange', $scope.currentPage);
    }

    $scope.pageChanged = function() {
        $scope.pageSelect = $scope.currentPage;
        $scope.$emit('yscCarPagechange', $scope.currentPage);
    };
});
m1.controller('mPageCtrl', function ($scope) {
    $scope.$on('mdatachange', function(event, pageNum, pageSize, totalPage, totalElement,t){ // 日子的改变
        $scope.totalItems = totalElement;
        $scope.currentPage = pageNum + 1 ;
        $scope.totalPage = totalPage;
        $scope.pageSize = pageSize;
        $scope.maxSize = 3;
        $scope.pageSelect = $scope.currentPage;
        $scope.pageSize = pageSize;
        $scope.t = t;
    });

    $scope.isOnly = function(){
        if( $scope.totalPage == 1){
            return false;
        }else{
            return true;
        }
    }
    $scope.setPage = function () { // 将当前页面的当前页传递出去
        if(  $scope.pageSelect > ( $scope.totalPage + 1 ) ){
            $scope.pageSelect = $scope.currentPage;
        }else{
            $scope.currentPage = $scope.pageSelect;
            $scope.$emit('mpagechange', $scope.currentPage, $scope.t);
        }
    }
    $scope.pageChanged = function() {
        $scope.pageSelect = $scope.currentPage;
        $scope.$emit('mpagechange', $scope.currentPage, $scope.t);
    };
});
m1.controller('dwPageCtrl', function ($scope) {

    $scope.$on('dwdatachange', function(event, pageNum, pageSize, totalPage, totalElement,t){ // 日子的改变
        $scope.totalItems = totalElement;
        $scope.currentPage = pageNum + 1 ;
        $scope.totalPage = totalPage;
        $scope.pageSize = pageSize;
        $scope.maxSize = 3;
        $scope.pageSelect = $scope.currentPage;
        $scope.pageSize = pageSize;
        $scope.t = t;
    });

    $scope.isOnly = function(){
        if( $scope.totalPage == 1){
            // 只有一页
            return false;
        }else{
            return true;
        }
    }

    $scope.setPage = function () { // 将当前页面的当前页传递出去
        if(  $scope.pageSelect > ( $scope.totalPage + 1 ) ){
            $scope.pageSelect = $scope.currentPage;
        }else{
            $scope.currentPage = $scope.pageSelect;
            $scope.$emit('dwpagechange', $scope.currentPage, $scope.t);
        }
    }
    $scope.pageChanged = function() {
        $scope.pageSelect = $scope.currentPage;
        $scope.$emit('dwpagechange', $scope.currentPage, $scope.t);
    };
});
m1.controller('dyPageCtrl', function ($scope) {
    $scope.$on('dydatachange', function(event, pageNum, pageSize, totalPage, totalElement,t){ // 日子的改变
        $scope.totalItems = totalElement;
        $scope.currentPage = pageNum + 1 ;
        $scope.totalPage = totalPage;
        $scope.pageSize = pageSize;
        //$scope.maxSize = 0;
        $scope.maxSize = 3;
        $scope.pageSelect = $scope.currentPage;
        $scope.pageSize = pageSize;
        $scope.t = t;
    });
    $scope.isOnly = function(){
        if( $scope.totalPage == 1){
            // 只有一页
            return false;
        }else{
            return true;
        }
    }

    $scope.setPage = function () { // 将当前页面的当前页传递出去
        if(  $scope.pageSelect > ( $scope.totalPage + 1 ) ){
            $scope.pageSelect = $scope.currentPage;
        }else{
            $scope.currentPage = $scope.pageSelect;
            $scope.$emit('dypagechange', $scope.currentPage, $scope.t);
        }
    }
    $scope.pageChanged = function() {
        $scope.pageSelect = $scope.currentPage;
        $scope.$emit('dypagechange', $scope.currentPage, $scope.t);
    };
});
m1.controller('wjPageCtrl', function ($scope) {
    $scope.$on('wjdatachange', function(event, pageNum, pageSize, totalPage, totalElement,t){ // 日子的改变
        $scope.totalItems = totalElement;
        $scope.currentPage = pageNum + 1 ;
        $scope.totalPage = totalPage;
        $scope.pageSize = pageSize;
        //$scope.maxSize = 0;
        $scope.maxSize = 3;
        $scope.pageSelect = $scope.currentPage;
        $scope.pageSize = pageSize;
        $scope.t = t;
    });

    $scope.isOnly = function(){
        if( $scope.totalPage == 1){
            // 只有一页
            return false;
        }else{
            return true;
        }
    }
    $scope.setPage = function () { // 将当前页面的当前页传递出去
        if(  $scope.pageSelect > ( $scope.totalPage + 1 ) ){
            $scope.pageSelect = $scope.currentPage;
        }else{
            $scope.currentPage = $scope.pageSelect;
            $scope.$emit('wjpagechange', $scope.currentPage, $scope.t);
        }
    }
    $scope.pageChanged = function() {
        $scope.pageSelect = $scope.currentPage;
        $scope.$emit('wjpagechange', $scope.currentPage, $scope.t);
    };
});
m1.controller('yscPageCtrl', function ($scope) {
    $scope.$on('yscdatachange', function(event, pageNum, pageSize, totalPage, totalElement,t){ // 日子的改变
        $scope.totalItems = totalElement;
        $scope.currentPage = pageNum + 1 ;
        $scope.totalPage = totalPage;
        $scope.pageSize = pageSize;
        $scope.maxSize = 3;
        $scope.pageSelect = $scope.currentPage;
        $scope.pageSize = pageSize;
        $scope.t = t;
    });
    $scope.isOnly = function(){
        if( $scope.totalPage == 1){
            // 只有一页
            return false;
        }else{
            return true;
        }
    }
    $scope.setPage = function () { // 将当前页面的当前页传递出去
        $scope.currentPage = $scope.pageSelect;
        $scope.$emit('yscpagechange', $scope.currentPage ,$scope.t);
    }
    $scope.pageChanged = function() {
        $scope.pageSelect = $scope.currentPage;
        $scope.$emit('yscpagechange', $scope.currentPage, $scope.t);
    };
});

m1.controller('dateSelect', function(comFun, $scope,$location,$state,$stateParams,$http,$timeout,locals) {

    var yesterday = new Date(new Date().getTime());
    var firstMid = locals.get('firstMid');
    var state = '';
    var isEmpty = $j.isEmptyObject( $location.search() );

    if( isEmpty ){ // 是空的情况下
        $scope.mid = locals.get('firstMid');
        $scope.t = 'day';
        $scope.role = 'm';
    }else{
        var params =  $location.search();
        $scope.mid = params.mid;
        $scope.t = params.t;
        $scope.role = params.role;
    }


    $scope.choseDate = function( params ){
        $scope.t = params;
        $scope.pathParams = $location.search();
        $scope.isEmpty = $j.isEmptyObject( $scope.pathParams ); // 第一个经理 而且为 day的情况下

        if( $scope.isEmpty ){
            $scope.mid = firstMid;
            $scope.role = 'm';
            if( params == 'day') {
                state = 'pro';
            }else{
                state = 'pro.m'
            }
        }else{
            $scope.mid = $scope.pathParams.mid;
            $scope.role = $scope.pathParams.role;
            // 有参数的情况下
            if( $scope.role == 'm'){  // 是m 的情况
                state = 'pro.m';
            }else{
                switch ( $scope.role ){
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
                }
            }
        }
        if( params == 'day'){
            $scope.$emit('datetimechange', $scope.time1, $scope.t);
        }else{
            $scope.$emit('periodChange', $scope.time2,$scope.time3, $scope.t);
        }
        $scope.pathParams = {
            mid : $scope.mid,
            role: $scope.role,
            t : params
        }
        $state.go( state ,$scope.pathParams);
    }

    $scope.getTime1 = function(time1){
        locals.set('time1', time1);
        $scope.$emit('datetimechange', time1, $scope.t);
    }

    $scope.getPeriod = function(time2,time3){
        locals.set('time2', time2);
        locals.set('time3', time3);

        $scope.time2 = time2;
        $scope.time3 = time3;
        $scope.$emit('periodChange', time2,time3,$scope.t);
    }
});
