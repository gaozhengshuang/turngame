教程
服务器
安装redis

sudo yum install redis

安装dlv调试工具

go get -u github.com/derekparker/delve/cmd/dlv

子模块更新

git submodule init

git submodule update

客户端


# turngame
#环境变量设置
PATH=$PATH:$HOME/.local/bin:$HOME/bin:/usr/lib/golang/bin:/home/goturn/turngame/server/gopath/bin
export PATH
export GOPATH=/home/goturn/turngame/server/gopath
export GOROOT=/usr/lib/golang
export JUMPGAME_ROOT=/home/goturn/turngame
export JUMPGAME_SERVER=/home/goturn/turngame/server/gopath/src/gitee.com/jntse/minehero
export JUMPGAME_TOOLKIT=/home/goturn/turngame/server/gopath/src/gitee.com/jntse/gotoolkit
