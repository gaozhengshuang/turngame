'use strict';
var process = require('child_process');

module.exports = {
    load() {
        // execute when package loaded
    },

    unload() {
        // execute when package unloaded
    },

    // register your ipc messages here
    messages: {
        'checkInnerTest'() {
            let sourcePath = __dirname + '\\NormalPlatformInner\\Platform.js';
            let targetFile = __dirname + '\\..\\..\\assets\\Script\\Util\\';
            let cmd = 'copy ' + sourcePath + ' ' + targetFile;
            process.exec(cmd, function (err, stdout, stderr) {
                if (err) {
                    Editor.log('++++++ Json 错误 ++++++' + stderr);
                } else {
                    Editor.log('++++++ 切换成功 ++++++');
                }
            });
        },
        'checkTVPacketTest'() {
            let sourcePath = __dirname + '\\TVPacketTest\\Platform.js';
            let targetFile = __dirname + '\\..\\..\\assets\\Script\\Util\\';
            let cmd = 'copy ' + sourcePath + ' ' + targetFile;
            process.exec(cmd, function (err, stdout, stderr) {
                if (err) {
                    Editor.log('++++++ Json 错误 ++++++' + stderr);
                } else {
                    Editor.log('++++++ 切换成功 ++++++');
                }
            });
        },
        'checkOuterTest'() {
            let sourcePath = __dirname + '\\NormalPlatformOuter\\Platform.js';
            let targetFile = __dirname + '\\..\\..\\assets\\Script\\Util\\';
            let cmd = 'copy ' + sourcePath + ' ' + targetFile;
            process.exec(cmd, function (err, stdout, stderr) {
                if (err) {
                    Editor.log('++++++ Json 错误 ++++++' + stderr);
                } else {
                    Editor.log('++++++ 切换成功 ++++++');
                }
            });
        }
    },
};