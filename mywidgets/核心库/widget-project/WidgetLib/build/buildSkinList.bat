@echo off 
echo --------------------
echo 开始构建皮肤文件列表
echo --------------------
set n=0
setlocal enabledelayedexpansion
for /f "delims=" %%a in (buildList.txt) do set /a n+=1 & set c!n!=%%a
for /l %%a in (1 1 !n!) do (
if not %%a==1 (echo !c%%a!images\*.*>>ImageList.txt) else (echo !c%%a!images\*.*>ImageList.txt)
)
echo --------------------
echo 构建皮肤文件列表完成!
echo --------------------
