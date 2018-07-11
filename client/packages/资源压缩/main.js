'use strict';
var process = require('child_process');
var async = require('async');
var path = require('path');

module.exports = {
    load() {
        // execute when package loaded
    },

    unload() {
        // execute when package unloaded
    },

    // register your ipc messages here
    messages: {
        'minAssets'() {
            async.waterfall([
                function (anext) {
                    let cmd = 'gulp imagemin --cwd ' + path.join(__dirname, '../../');
                    Editor.log('开始压缩图片');
                    process.exec(cmd, function (err, stdout, stderr) {
                        if (err == null) {
                            Editor.log(stdout);
                        }
                        anext(err);
                    });
                },
                // function (anext) {
                //     let cmd = 'gulp htmlmin --cwd ' + path.join(__dirname, '../../');
                //     Editor.log('开始压缩html');
                //     process.exec(cmd, function (err, stdout, stderr) {
                //         if (err == null) {
                //             Editor.log(stdout);
                //         }
                //         anext(err);
                //     });
                // }
            ], function (err) {
                if (err) {
                    Editor.log('压缩失败 ' + err);
                    return;
                }
                Editor.log('压缩完成');
            });
        }
    }
};