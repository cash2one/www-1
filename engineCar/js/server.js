/**
 * Created by Administrator on 2017/4/7.
 */
angular.module('services', []).factory('Paginator', function() {
    //虽然这是一个服务，但是每次用户调用它时都会获得一个全新的Paginator。这是因为我们会返回一个function，当它被执行时会返回一个对象
    return function(fetchFunction, pageSize) {
        var paginator = {
            hasNextVar : false,
            next: function() {
                if(this.hasNextVar) {
                    this.currentOffset += pageSize;
                    this._load();
                }
            },
            _load: function() {
                var self = this;
                fetchFunction(this.currentOffset, pageSize+1, function(items) {
                    self.currentPageItems = items.slice(0, pageSize);
                    self.hasNextVar = items.length === pageSize + 1;
                });
            },
            hasNext: function() {
                return this.hasNextVar;
            },
            previous: function() {
                if(this.hasPrevious()) {
                    this.currentOffset -= pageSize;
                    this._load();
                }
            },
            hasPrevious: function() {
                return this.currentOffset !== 0;
            },currentPageItems: [],
            currentOffset:0
        };

        //加载第一页
        paginator._load();
        return paginator;
    };
});