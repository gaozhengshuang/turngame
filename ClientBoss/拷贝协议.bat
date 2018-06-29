del /s /q /a .\protobuf\protofile\
del /s /q /a .\src\table\
@echo off
for /r "..\protocol\" %%a in (*.proto) do (copy "%%a" ".\protobuf\protofile\")
for /r "..\docs\tbl\" %%a in (*.proto) do (copy "%%a" ".\protobuf\protofile\")
for /r "..\docs\tbl\" %%a in (*.lua) do (copy "%%a" ".\src\table\")
ren .\src\table\*.lua *.ts
pb-egret generate
pause