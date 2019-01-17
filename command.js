(function() {
    // 命令模式
    var ball = document.getElementById('ball');
    var pos = document.getElementById('pos');
    var moveBtn = document.getElementById('moveBtn');
    var cancelBtn = document.getElementById('cancelBtn');
    var MoveCommand = function(receiver, pos) {
        this.receiver = receiver;
        this.pos = pos;
        this.oldPos = null;
    };
    MoveCommand.prototype.execute = function() {
        this.receiver.start('left', this.pos, 1000, 'strongEaseOut');
        this.oldPos = this.receiver.dom.getBoundingClientRect()[this.receiver.propertyName]; // 记录 小球 开始 移动 前 的 位置 
    };
    MoveCommand.prototype.undo = function() {
        this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut'); // 回到 小球 移动 前 记录 的 位置 
    };
    var moveCommand;
    moveBtn.onclick = function() {
        var animate = new Animate(ball);
        moveCommand = new MoveCommand(animate, pos.value);
        moveCommand.execute();

    };
    cancelBtn.onclick = function() {
        moveCommand.undo(); // 撤销 命令
    };


})()
(function() {
    // 播放录像
    var Ryu = {
        attack: function() {
            console.log('攻击');
        },
        defense: function() {
            console.log('防御');
        },
        jump: function() {
            console.log('跳跃');
        },
        crouch: function() {
            console.log('蹲下');
        }
    };
    var makeCommand = function(receiver, state) { // 创建命令 
        return function() {
            receiver[state]();
        }
    };
    var commands = {
        "119": "jump", // W 
        "115": "crouch", // S 
        "97": "defense", // A 
        "100": "attack" // D 
    };
    var commandStack = []; // 保存 命令 的 堆栈 
    document.onkeypress = function(ev) {
        var keyCode = ev.keyCode,
            command = makeCommand(Ryu, commands[keyCode]);
        if (command) {
            command(); // 执行命令 
            commandStack.push(command); // 将刚刚执行过的命令保存存进堆栈
        }
    };
    document.getElementById('replay').onclick = function() { // 点击播放录像 
        var command;
        while (command = commandStack.shift()) { // 从堆栈里依次取出命令并执行 
            command();
        }
    };
})()
