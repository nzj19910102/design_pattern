(function() {
    // 职责链模式
    //Chain.prototype.setNextSuccessor指定在链中的下一个节点
    //Chain.prototype.passRequest传递请求给某个节点
    var order500 = function(orderType, pay, stock) {
        if (orderType === 1 && pay === true) {
            console.log('500元定金预购，得到100优惠券');
        } else {
            return 'nextSuccessor'; //我不知道下一个节点是谁，反正把请求往后面传递
        }
    };
    var order200 = function(orderType, pay, stock) {
        if (orderType === 2 && pay === true) {
            console.log('200元定金预购，得到50优惠券');
        } else {
            return 'nextSuccessor'; //我不知道下一个节点是谁，反正把请求往后面传递
        }
    };
    var orderNormal = function(orderType, pay, stock) {
        if (stock > 0) {
            console.log('普通购买，无优惠券');
        } else {
            console.log('手机库存不足');
        }
    };

    var Chain = function(fn) {
        this.fn = fn;
        this.successor = null;
    };
    Chain.prototype.setNextSuccessor = function(successor) {
        return this.successor = successor;
    };
    Chain.prototype.passRequest = function() {
        var ret = this.fn.apply(this, arguments);
        if (ret === 'nextSuccessor') {
            return this.successor && this.successor.passRequest.apply(this.successor, arguments);
        }
        return ret;
    }
    // 异步 手动传递请求
    Chain.prototype.next = function() {
        return this.successor && this.successor.passRequest.apply(this.successor, arguments);
    };

    // 包装成职责链的节点
    var chainOrder500 = new Chain(order500);
    var chainOrder200 = new Chain(order200);
    var chainOrderNormal = new Chain(orderNormal);

    // 指定节点在职责链中的顺序
    chainOrder500.setNextSuccessor(chainOrder200);
    chainOrder200.setNextSuccessor(chainOrderNormal);

    // 把请求传给第一个节点
    chainOrder500.passRequest(1, true, 500); //输出：500元定金预购，得到100优惠券
    chainOrder500.passRequest(2, true, 500); //输出：200元定金预购，得到50优惠券
    chainOrder500.passRequest(3, true, 500); //输出：普通购买，无优惠券
    chainOrder500.passRequest(1, false, 0); //输出：手机库存不足

    // AOP实现职责链
    Function.prototype.after = function(fn) {
        var self = this;
        return function() {
            var ret = self.apply(this, arguments);
            if (ret === 'nextSuccessor') {
                return fn.apply(this, arguments);
            }
            return ret;
        }
    };
    varorder = order500yuan.after(order200yuan).after(orderNormal);
    order(1, true, 500); //输出：500元定金预购，得到100优惠券
    order(2, true, 500); //输出：200元定金预购，得到50优惠券
    order(1, false, 500); //输出：普通购买，无优惠券
})()
