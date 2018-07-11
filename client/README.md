# 项目介绍
该项目是一个世界杯射门的游戏客户端，基于cocos-creator 1.8.2版本，依赖nodejs中的部分库。

## 环境搭建
### 1.安装nodejs 8.11.2(windows下)

    https://npm.taobao.org/mirrors/node/v8.11.2/win-x64/
    下载并安装

这样nodejs和npm就安装好了，需要设置环境变量

### 2.安装需要的工具(windows下)
    
#### 1）安装protobufjs 解析proto文件并生成javascript文件

    npm install protobufjs -g

#### 2）安装项目依赖库
在当前路径下执行

    npm install;
会根据package.json文件中的dependencies 安装相应的依赖文件到node_modules文件夹下


## 自定义项目
### 1.自定义工具
在cocos creator中的扩展->创建新插件,会在当前路径下生成packages文件夹，并生成对应的文件。修改代码可完成自定义的流程。这里可以使用绝大部分的npm管理的工具，目前有的工具有:拷贝服务器生成的json文件，解析proto文件。具体细节请查看

    http://docs.cocos.com/creator/manual/zh/extension/?h=%E6%89%A9%E5%B1%95