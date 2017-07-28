/**
 * Created by zhengchaofan on 2017/7/3.
 */
// axios({
//     method:'get',
//     url:'http://localhost:63342/www/mobileWebFreeList/payList/mimicry.json',
// }).then(function(response) {
//     console.log(response)
//     });



var pay_list = {
    data: function () {
        return {
            ajaxData: {},
            chosePaid:'',//zfb,wx
            status:GLOBAL.status,//error,normal
            payStatus:'',
        }
    },
    template: "#pay_template",
    created: function () {
        // console.log(this);
        var _this=this;
        axios({
            method: 'get',
            url: GLOBAL.basePath+'h5/order/no/'+localStorage.no,
        }).then(function (response) {
            if(response.data.response_state==1){
                _this.ajaxData=response.data;//接口数据
                _this.payStatus=response.data.status;
            }else {
                _this.status='error';
            }

        });
        if(is_weixin()){
            _this.choiceW();
        }else {
            _this.choiceZ();
        }
        //jssdk当前页面的签名
        if(_this.chosePaid=='wx'){
            axios({
                method: 'get',
                url: GLOBAL.basePath+'h5/wxJsSdk/sign?url=' + encodeURI(GLOBAL.basePathWeb),
                responseType:'json'
            }).then(function (response) {
                if(response.data.response_state==1){
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: response.data.appId, // 必填，公众号的唯一标识
                        timestamp: response.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
                        signature: response.data.signature,// 必填，签名，见附录1
                        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                }
                console.log('response.data',response.data,'response',response);
            }).catch(function (err) {
                console.log(err)
            });
        }

    },
    computed:{
        formAdress:function () {
            return this.ajaxData.fromProvince+this.ajaxData.fromCity+this.ajaxData.fromCounty+this.ajaxData.fromAddress
        },
        toAdress:function () {
            return this.ajaxData.toProvince+this.ajaxData.toCity+this.ajaxData.toCounty+this.ajaxData.toAddress
        },
        distance:function () {
            var distance=this.ajaxData.distance?this.ajaxData.distance:0;
            return Math.round(distance)+"公里"
        },
        zfbC:function () {
            return this.chosePaid=="zfb"?'pfppter-choice pbb-red':'pfppter-choice'
        },
        wxC:function () {
            return this.chosePaid=="wx"?'pfppter-choice pbb-red':'pfppter-choice'
        }
    },
    methods:{
        pay:function (e) {
            // console.log(e)
            var _this=this;
            _this.payStatus='PAYING';
            if(_this.chosePaid=='wx'){
                axios({
                    method: 'post',
                    url:GLOBAL.basePath+ 'mobile/wxpay/order?orderNo='+localStorage.no+'&wxsr=gzh&openId='+localStorage.openid + '&t=' + new Date().getTime(),//
                    responseType:'json',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data:{
                        orderNo:localStorage.no,
                        openId:localStorage.openid,
                        wxsr:'gzh',
                        t:new Date().getTime(),
                    }
                }).then(function (response) {
                    if(response.data.response_state==1){
                        wx.chooseWXPay({
                            timestamp: response.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: response.data.noncestr, // 支付签名随机串，不长于 32 位
                            'package': "prepay_id="+response.data['prepayid'], // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign: response.data.sign, // 支付签名
                            cancel:function () {
                                _this.payStatus='START'
                            },
                            success:function () {
                                _this.payStatus='SUCCESS'
                            }
                        });

                    }
                }).catch(function (err) {
                    _this.payStatus='START';
                    console.log(err)
                });
            }else if(_this.chosePaid=='zfb'){
                //http://test.51pingbanche.com/haul/alipay/wapPay/order/CGH010LmA?returnUrl=//192.168.1.30:8084/haul/home
                window.location.href=GLOBAL.basePath+'alipay/wapPay/order/'+localStorage.no+'?returnUrl='+localStorage.href;
            }
        },
        choiceZ:function () {
            this.chosePaid="zfb"
        },
        choiceW:function () {
            this.chosePaid="wx"
        },
        payInitial:function () {

        }
    }
};
var app = new Vue({
    el: '#app',
    data: {},
    methods: {},
    components: {
        'pay-list': pay_list,
    }
});