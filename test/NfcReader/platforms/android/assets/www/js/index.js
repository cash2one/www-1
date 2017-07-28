
// var app = {
//     // Application Constructor
//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//
//         console.log('web');
//         var p=document.getElementById('p');
//         p.innerHTML='xasxaxasxasxasx';
//     },
//
//     // deviceready Event Handler
//     //
//     // Bind any cordova events here. Common events are:
//     // 'pause', 'resume', etc.
//     onDeviceReady: function() {
//         this.receivedEvent('deviceready');
//         // console.log('window.screen.width',window.screen.width,'window.innerWidth.width',window.innerWidth.width,'body.clientWidth' +
//         //     '',document.body.clientWidth,'body.offsetWidth',document.body.offsetWidth);
//
//     },
//
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         // var parentElement = document.getElementById(id);
//         // var listeningElement = parentElement.querySelector('.listening');
//         // var receivedElement = parentElement.querySelector('.received');
//         //
//         // listeningElement.setAttribute('style', 'display:none;');
//         // receivedElement.setAttribute('style', 'display:block;');
//         //
//         // console.log('Received Event: ' + id);
//     }
// };
//
// app.initialize();

document.addEventListener('deviceready', ready, false);

function ready() {
    var my_app={
        template:'<div>' +
        '<h1>{{name}}</h1>' +
        '<div>{{url}}</div>' +
        '<div>{{eve3}}</div>' +
        '<button v-on:click="changeLocation(87898987)">按钮12</button>' +
        '我来自mars</div>',
        data:function () {
            return{
                name:'david bowie',
                url:'',
                eve3:'35435',
            }
        },
        created:function () {
            var _this=this;
            _this.url=window.location.href;
        },
        methods:{
            changeLocation:function (e) {

                this.eve3=e;

            }
        }
    };

    var vue=new Vue({
        el:'#app',
        components:{
            'my-app':my_app,
        }
    });

}


