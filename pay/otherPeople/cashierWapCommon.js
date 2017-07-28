/**
 * wap 公共业务处理
 */
var cashierWapCommon=window.cashierWapCommon||{};

/**
 * 处理订单下拉框
 * */
(function($){
    cashierWapCommon.orderDropDown = function(orderInfoMap) {
        if (orderInfoMap == "") {
            $("#showDetail").removeClass("nav-list-down");
            var detailHeight=$("#payDetail").height()==null?0:$("#payDetail")[0].scrollHeight;
            $("#payDetail").height(detailHeight);
        } else {
            /**
             * 页面下拉框
             * */
            $("#showDetail").on("click",function(){
                $(this).toggleClass('show');
                var detailHeight=$("#payDetail").height()?0:$("#payDetail")[0].scrollHeight;
                $("#payDetail").height(detailHeight);
            });
        }
    }
    /**
     * 小于3个，则用下拉框。否则用弹出框
     * */
    cashierWapCommon.orderDropDownAndPopup = function(orderInfoMap, orderInfoSize) {
        if (orderInfoMap == "") {
            $("#showDetail").removeClass("nav-list-down");
            var detailHeight=$("#payDetail").height()==null?0:$("#payDetail")[0].scrollHeight;
            $("#payDetail").height(detailHeight);
        } else {
            /**
             * 页面下拉框
             * */
            if (parseInt(orderInfoSize) > 2) {
                $("#showDetail, .pop-close").click(function() {
                    $(".m-pay-mask,.result-page,.pop-close").toggle();
                });
            } else {
                $("#showDetail").on("click",function(){
                    $(this).toggleClass('show');
                    var detailHeight=$("#payDetail").height()?0:$("#payDetail")[0].scrollHeight;
                    $("#payDetail").height(detailHeight);
                });
            }
        }
    }
})( jQuery ); //end jQuery


/**
 * 花呗初始化
 * */
(function($){
    cashierWapCommon.initHb = function(successPage) {
        var _isGetAntHbInfo = false; //只需要调用后台一次
        $(".list-group-item .anthb").on("click",function(){
            if (!_isGetAntHbInfo) {
                $.ajax({
                    dataType : "jsonp",
                    jsonp: "callback",
                    //url: domain+'/cashier/checkPayOrderAction/checkOrderJsonp.json',
                    url:domain+'/cashier/mobile/cashierWapPayAction/getAntHbInfo.json',
                    data:{
                        "amt":$("#amt").val(),
                        "merchantCode":$("#merchantCode").val()
                    },
                    success:function(data){
                        if (data.isSuccess == 'Y') {
                            processHbInfo(data.value);
                            _isGetAntHbInfo = true;
                        } else {
                            //alert(data.errorMessage);
                            $("#hbErrorDialog").addClass("show");
                            $(".m-pay-mask").addClass("show");
                            _isGetAntHbInfo = false;
                        }
                    }
                });
            } else {
                $("#showHBInfo").toggle();
            }

        });

        /**
         * 处理花呗的下拉框
         * */
        var processHbInfo = function(hbInfos) {
            var _hbInfos = JSON.parse(hbInfos);
            //console.log(_hbInfos);
            var _hbHtml = "";
            for (var i=0;i<_hbInfos.length;i++) {
                _hbHtml += "<li hbFqAmt='"+_hbInfos[i].fqAmt +"' hbFqNum='" + _hbInfos[i].fqNum + "' hbFqFeeAmt='" + _hbInfos[i].fqFeeAmt + "' hbTotalAmt='" + _hbInfos[i].totalAmt
                    +"' class='list-group-item hbInfo'><strong class='tc-number'>"+_hbInfos[i].fqNum
                    +"</strong>期<span class='m-hb-split'>丨</span><strong class='tc-number'>"+_hbInfos[i].fqAmt
                    +"</strong>x"+_hbInfos[i].fqNum;
                if (_hbInfos[i].fqFeeAmt > 0) {
                    _hbHtml += "<span class='tc-small'>（含手续费"+_hbInfos[i].fqFeeAmt+"元/期）</span>";
                } else {
                    _hbHtml += "&nbsp;<span class='m-text-bradge'>0首付0利息0手续费</span></li>";
                }
            }
            $("#showHBInfo").append(_hbHtml);
            // 点击花呗分期下面的每一项,关闭分期详细列表，并且将 花呗最上面的信息更新
            $('.hbInfo').click(function() {
                /*￥215.14 x 9期 （含手续费5.25元/期）*/
                /*<span class="m-text-bradge">免手续费</span>*/
                $("#hbTitle").text("￥" + $(this).attr("hbFqAmt")+" x "+$(this).attr("hbFqNum")+"期");
                var _hbFqFee = $(this).attr("hbFqFeeAmt");
                if (_hbFqFee > 0) {
                    $("#showFee").text($(this).attr("hbFqFeeAmt"));
                    $("#haveFee").show();
                    $("#notHaveFee").hide();
                } else {
                    $("#notHaveFee").show();
                    $("#haveFee").hide();
                }
                $("#showHBInfo").hide();
                $("#antHBNum").val($(this).attr("hbFqNum"));
                $("#payAmt").text($(this).attr("hbTotalAmt"));//应付金额
            });
        }

        // 花呗失败
        $("#hbErrorDialog .m-pay-ok").on("click",function(){
            $("#hbErrorDialog").removeClass("show");
            $(".m-pay-mask").removeClass("show");
        });
    }

})( jQuery ); //end jQuery

/**
 * 页面倒计时
 * */
(function($){
    cashierWapCommon.pageCountDown = function(locationUrl) {
        var countDownEvent = function() {
            var _countDownTime = $("#expireTimeInterval").val();
            _countDownTime = _countDownTime - 1000;
            if(_countDownTime > 0){
                var _leftSecond = parseInt((_countDownTime % 60000) / 1000);
                var _leftMin = parseInt((_countDownTime % 3600000) / 60000);
                var _leftDay = parseInt(_countDownTime / 86400000);
                var _leftHour = 0;
                if (_leftDay > 0) {
                    _leftHour = parseInt(_countDownTime % 86400000 / 3600000);
                } else {
                    _leftHour = parseInt(_countDownTime / 3600000);
                }
                $("#expireTimeInterval").val(_countDownTime);
                var _time = "";
                if (_leftDay > 0) {
                    _time += "<strong class='tc-number'>"+_leftDay+"</strong>天";
                }
                if (_leftHour > 0) {
                    _time += "<strong class='tc-number'>"+_leftHour+"</strong>小时";
                }
                _time += "<strong class='tc-number'>"+_leftMin+"</strong>分<strong class='tc-number'>"+_leftSecond+"</strong>";
                $("#countDownText").html(_time);
            } else {
                window.clearInterval(_countDownEventId);
                if (locationUrl != "" && locationUrl != null) {
                    window.location=locationUrl;
                }
            }
        };
        countDownEvent();
        var _countDownEventId = window.setInterval(countDownEvent,"1000");
    }
})( jQuery ); //end jQuery

/**
 * 微信WAP支付弹出框
 * */
(function($){
    cashierWapCommon.wxWapAlert = function(successPage, zaOrderNo) {
        shytUI.Confirm.init({
            content:'如果您在微信中支付成功,请点击"支付成功";如果未完成支付请点击"关闭".',
            name:'支付成功',
            callbackCancel:function() {
                cashierCommon.checkOrderNoLoading(successPage,zaOrderNo)
            },
            callback:function(){
                //业务逻辑
                $.ajax({
                    url:domainNoHttps+'/cashier/checkPayOrderAction/checkOrder.json',
                    data:{
                        "zaOrderNo":zaOrderNo
                    },
                    success:function(data){
                        //关闭
                        shytUI.Confirm.close();
                        if (data == 'paid') {
                            $(".m-pay-mask").removeClass("show");
                            window.location=domainNoHttps+'/cashier/vehicle/mobile/cashierVehicleWapPayResult.htm?zaOrderNo=' + zaOrderNo;
                        } else {
                            shytUI.Alert.init({
                                content:'<div class="dis-table mg-mid"><i class="m-alert-fail dis-tablecell"></i>\
      		              <div class="dis-tablecell m-lineheight-35"><p style="font-weight: bold; text-align: center;">抱歉,支付失败了</p>\
      		              <p style="margin-top:10px;">可能因为您未安装微信或版本太低.请选择其他支付方式支付.</p></div>\
      		              </div>',
                                name:'<span class="m-alert-grey">知道了<span>',
                                callback:function(){
                                    shytUI.Alert.close();
                                }
                            }).show();
                        }
                    }
                });
            }
        }).show();
    }
})( jQuery ); //end jQuery