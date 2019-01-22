(function() {
    // 内部迭代器
    $.each = function(obj, callback) {
        var value, i = 0,
            length = obj.length,
            isArray = isArraylike(obj);
        if (isArray) { // 迭代 类 数组
            for (; i < length; i++) {
                value = callback.call(obj[i], i, obj[i]);
                if (value === false) {
                    break;
                }
            }
        } else {
            for (i in obj) { // 迭代 object 对象 
                value = callback.call(obj[i], i, obj[i]);
                if (value === false) {
                    break;
                }
            }
        }
        return obj;
    };
    // 外部迭代器
    var Iterator = function(obj) {
        var current = 0;
        var next = function() {
            current += 1;
        };
        var isDone = function() {
            return current >= obj.length;
        };
        var getCurrItem = function() {
            return obj[current];
        };
        return {
            next: next,
            isDone: isDone,
            getCurrItem: getCurrItem,
            length: obj.length
        }
    };

    var compare = function(iterator1, iterator2) {
        if (iterator1.length !== iterator2.length) {
            alert(' iterator1 和 iterator2 不相等');
        }
        while (!iterator1.isDone() && !iterator2.isDone()) {
            if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
                throw new Error('iterator1 和 iterator2 不相等');
            }
            iterator1.next();
            iterator2.next();
        }
        alert('iterator1 和 iterator2 相等');
    }
    var iterator1 = Iterator([1, 2, 3]);
    var iterator2 = Iterator([1, 2, 3]);
    compare(iterator1, iterator2);
})()
