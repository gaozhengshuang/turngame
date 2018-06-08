#!/usr/bin/env python
#coding=utf-8

import os
import sys
import shutil

#获取系统变量
env_dict = os.environ
#for k, v in env_dict.items():
#    print k, v

# 解析输入参数
quick = {}
for arg in sys.argv:
    if arg == 'svn':
        curdir = os.getcwd()
        os.chdir(env_dict['JUMPGAME_ROOT'])
        print os.popen('svn up', 'r').read()
        os.chdir(env_dict['JUMPGAME_TOOLKIT'])
        print os.popen('svn up', 'r').read()
        os.chdir(curdir)
    if arg == 'git':
        print os.popen('git pull', 'r').read()
        #curdir = os.getcwd()
        #os.chdir(env_dict['JUMPGAME_ROOT'])
        #print os.popen('git pull', 'r').read()
        #os.chdir(env_dict['JUMPGAME_TOOLKIT'])
        #print os.popen('git pull', 'r').read()
        #os.chdir(curdir)

    if arg == 'match':  quick[arg] = True
    if arg == 'login':  quick[arg] = True
    if arg == 'gate':   quick[arg] = True
    if arg == 'room':   quick[arg] = True


if os.path.exists('./bin') == False:
    os.makedirs('./bin', 0775)

# 编译函数
def compile(server):
    os.chdir(server)
    print os.popen('gob', 'r').read(),
    print "copy %s -> ../bin/ " % server
    dstfile = '../bin/' + server
    if os.path.isfile(dstfile) == True: os.remove(dstfile)
    shutil.copy(server, '../bin/')
    os.chdir('../')

if len(quick) == 0:
    # 清理
    filelist = os.listdir('./bin')
    for f in filelist:
        if f != ".gitignore": os.remove('./bin/'+f)

    # 打表
    print os.popen('git log > version.txt', 'r').read()
    print os.popen('./maketbl.py', 'r').read()

    # 编译
    compile('gateserver')
    compile('loginserver')
    compile('roomserver')
    compile('matchserver')

if quick.get('gate') != None:
    compile('gateserver')
if quick.get('login') != None:
    compile('loginserver')
if quick.get('room') != None:
    compile('roomserver')
if quick.get('match') != None:
    compile('matchserver')



