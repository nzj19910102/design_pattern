/*
 * @Author: zhanjun
 * @Date:   2019-01-21 15:44:39
 * @Last Modified by:   zhanjun
 * @Last Modified time: 2019-01-21 16:02:56
 */
(function() {
    // 装饰者模式
    Function.prototype.before = function(beforefn) {
        var__self = this;
        return function() {
            beforefn.apply(this, arguments); //(1)
            return __self.apply(this, arguments); //(2)
        }
    }
})()
