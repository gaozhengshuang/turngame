/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin, RenamePlugin, ResSplitPlugin } from 'built-in';
import { WxgamePlugin } from './wxgame/wxgame';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';

const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;

        var outputDir: string = `../${projectName}_wxgame`;
        var remote = `../${projectName}_wxremote`

        if (command == 'build') {

            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),

                    // new ResSplitPlugin({
                    //     verbose: true, matchers: [
                    //         { from: "resource/**/**.@(jpg|fnt|mp3)", to: `${remote}_alpha`},
                    //         { from: "resource/assets/!(ball|login)/**", to: `${remote}_alpha`},
                    //     ]
                    // }),

                    // new EmitResConfigFilePlugin({
                    //     output: "resource/default.res.json",
                    //     typeSelector: config.typeSelector,
                    //     nameSelector: (p: string) => {
                    //         var b = p.lastIndexOf(".");
                    //         var t = "assets/"
                    //         var name = p.substring(p.indexOf(t) + t.length, b);
                    //         return name;
                    //     },
                    //     groupSelector: p => "preload"
                    // }),

                    new UglifyPlugin([{
                        sources: ["main.js"],
                        target: "main.min.js"
                    }
                    ]),
                    new ManifestPlugin({ output: 'manifest.js' })
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),

                    // new RenamePlugin({
                    //     verbose: true, hash: "crc32", matchers: [
                    //         { from: "resource/**/**", to: "[path][name]_[hash].[ext]" }
                    //     ]
                    // }),

                    // new ResSplitPlugin({
                    //     verbose: true, matchers: [
                    //         { from: "resource/**/**.@(jpg|fnt|mp3)", to: remote },
                    //         { from: "resource/assets/!(ball|login)/**", to: remote },
                    //     ]
                    // }),

                    // new EmitResConfigFilePlugin({
                    //     output: "resource/default.res.json",
                    //     typeSelector: config.typeSelector,
                    //     nameSelector: (p: string) => {
                    //         var b = p.lastIndexOf(".");
                    //         var t = "assets/"
                    //         var name = p.substring(p.indexOf(t) + t.length, b);
                    //         return name;
                    //     },
                    //     groupSelector: p => "preload"
                    // }),

                    new UglifyPlugin([{
                        sources: ["main.js"],
                        target: "main.min.js"
                    }
                    ]),
                    new ManifestPlugin({ output: 'manifest.js' })
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
