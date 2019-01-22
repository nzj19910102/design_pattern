(function() {
    // 代理模式
    var myImage = (function() {
        var imgNode = document.createElement('img');
        document.body.appendChild(imgNode);
        return {
            setSrc: function(src) {
                imgNode.src = src;
            }
        }
    })();
    var proxyImage = (function() {
        var img = new Image;
        img.onload = function() {
            console.log(this)
            myImage.setSrc(this.src);
        }
        return {
            setSrc: function(src) {
                myImage.setSrc('file:///C:/Users/svenzeng/Desktop/loading. gif');
                img.src = src;
            }
        }
    })();
    proxyImage.setSrc('http://imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');

    // 虚拟代理
    var synchronousFile = function(id) {
        console.log('开始 同步 文件， id 为: ' + id);
    };
    var proxySynchronousFile = (function() {
        var cache = [], // 保存一段时间内需要同步的ID
            timer; // 定时器 
        return function(id) {
            cache.push(id);
            if (timer) { // 保证不会覆盖已经启动的定时器
                return;
            }
            timer = setTimeout(function() {
                synchronousFile(cache.join(',')); // 2秒后向本体发送需要同步的ID集合
                clearTimeout(timer); // 清空定时器 
                timer = null;
                cache.length = 0; // 清空ID集合 
            }, 2000);
        }
    })();
    var checkbox = document.getElementsByTagName('input');
    for (var i = 0, c; c = checkbox[i++];) {
        c.onclick = function() {
            if (this.checked === true) {
                proxySynchronousFile(this.id);
            }
        }
    };

    // 缓存代理
    /**************** 计算乘积 *****************/
    var mult = function() {
        var a = 1;
        for (var i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i];
        }
        return a;
    };
    /**************** 计算加和 *****************/
    var plus = function() {
        var a = 0;
        for (var i = 0, l = arguments.length; i < l; i++) {
            a = a + arguments[i];
        }
        return a;
    };
    /**************** 创建缓存代理的工厂 *****************/
    var createProxyFactory = function(fn) {
        var cache = {};
        return function() {
            var args = Array.prototype.join.call(arguments, ',');
            if (args in cache) {
                return cache[args];
            }
            return cache[args] = fn.apply(this, arguments);
        }
    };
    var proxyMult = createProxyFactory(mult),
        proxyPlus = createProxyFactory(plus);
    alert(proxyMult(1, 2, 3, 4)); // 输出：24 
    alert(proxyMult(1, 2, 3, 4)); // 输出：24 
    alert(proxyPlus(1, 2, 3, 4)); // 输出：10 
    alert(proxyPlus(1, 2, 3, 4)); // 输出：10
})()
