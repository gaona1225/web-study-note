@echo off 
echo --------------------
echo 开始构建资源
echo --------------------
xcopy ..\source\jquery-ui\*.* ..\uiBase\jquery-ui\ /s /e /y
xcopy ..\source\UIBase\*.* ..\uiBase\ /s /e /y
xcopy ..\source\reset\reset.css ..\uiBase\skins\base\ /s /e /y
del /f /s /q ..\uiBase\*.scc
echo --------------------
echo 构建资源完成!
echo --------------------