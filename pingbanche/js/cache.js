window.addEventListener('load', function(e) {  
    window.applicationCache.addEventListener('updateready', function(e) { 
        //缓存更新完毕 
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {  
            //切换为最新缓存
            window.applicationCache.swapCache();  
            if (confirm('新版本已经更新完成，是否重新加载?')) {  
                window.location.reload();  
            }  
        }  
    }, false);  
}, false);  