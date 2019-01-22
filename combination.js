(function() {
    // 组合模式
    var closeDoorCommand = {
        execute: function() {
            console.log('关门');
        }
    };
    var openPcCommand = {
        execute: function() {
            console.log('开 电脑');
        }
    };
    var openQQCommand = {
        execute: function() {
            console.log('登录 QQ');
        }
    };
    var MacroCommand = function() {
        return {
            commandsList: [],
            add: function(command) {
                this.commandsList.push(command);
            },
            execute: function() {
                for (var i = 0, command; command = this.commandsList[i++];) {
                    command.execute();
                }
            }
        }
    };
    var macroCommand = MacroCommand();
    macroCommand.add(closeDoorCommand);
    macroCommand.add(openPcCommand);
    macroCommand.add(openQQCommand);
    macroCommand.execute();

    // Folder File
    var Folder = function(name) {
        this.name = name;
        this.parent = null; // 增加 this. parent 属性 
        this.files = [];
    };
    Folder.prototype.add = function(file) {
        file.parent = this; // 设置 父 对象 
        this.files.push(file);
    };
    Folder.prototype.scan = function() {
        console.log('开始扫描文件夹: ' + this.name);
        for (var i = 0, file, files = this.files; file = files[i++];) {
            file.scan();
        }
    };
    Folder.prototype.remove = function() {
        if (!this.parent) { // 根节点或者树外的游离节点 
            return;
        }
        for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
            var file = files[l];
            if (file === this) {
                files.splice(l, 1);
            }
        }
    };


    var File = function(name) {
        this.name = name;
        this.parent = null;
    };
    File.prototype.add = function() {
        throw new Error('不能添加在文件下面');
    };
    File.prototype.scan = function() {
        console.log('开始扫描文件: ' + this.name);
    };
    File.prototype.remove = function() {
        if (!this.parent) { // 根节点或者树外的游离节点 
            return;
        }
        for (var files = this.parent.files, l = files.length - 1; l >= 0; l--) {
            var file = files[l];
            if (file === this) {
                files.splice(l, 1);
            }
        }
    };

    var folder = new Folder('学习 资料');
    var folder1 = new Folder('JavaScript');
    var file1 = new Folder('深入浅出 Node. js');
    folder1.add(new File('JavaScript 设计 模式 与 开发 实践'));
    folder.add(folder1);
    folder.add(file1);
    folder1.remove(); // 移除文件夹folder.scan();
    folder.scan();
})()
