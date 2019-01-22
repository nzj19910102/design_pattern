/*
 * @Author: zhanjun
 * @Date:   2019-01-15 20:18:07
 * @Last Modified by:   zhanjun
 * @Last Modified time: 2019-01-22 11:23:04
 */

1. 单一职责原则（ SRP）
就一个类而言， 应该仅有一个引起它变化的原因。 一个对象（ 方法） 只做一件事
2. 最少知识原则（ LKP）
是一个软件实体应当尽可能少地与其他实体发生相互作用。
这里的软件实体是一个广义的概念， 不仅包括对象， 还包括系统、 类、 模块、 函数、 变量等。
3. 开放 - 封闭原则（ OCP）
软件实体（ 类、 模块、 函数） 等应该是可以扩展的， 但是不可修改。
4. 接口和面向接口编程

代码重构
1. 提炼函数
在JavaScript开发中， 我们大部分时间都在与函数打交道， 所以我们希望这些函数有着良好的命名， 函数体内包含的逻辑清晰明了。
如果一个函数过长， 不得不加上若干注释才能让这个函数显得易读一些， 那这些函数就很有必要进行重构。
如果在函数中有一段代码可以被独立出来， 那我们最好把这些代码放进另外一个独立的函数中
这是一种很常见的优化工作， 这样做的好处主要有以下几点。
避免出现超大函数。
独立出来的函数有助于代码复用。
独立出来的函数更容易被覆写。
独立出来的函数如果拥有一个良好的命名， 它本身就起到了注释的作用。
2. 合并重复的条件片段
如果一个函数体内有一些条件分支语句， 而这些条件分支语句内部散布了一些重复的代码， 那么就有必要进行合并去重工作


