@echo off 
echo --------------------
echo ��ʼ����Ƥ����Դ
echo --------------------
del /s /q ..\uiBase\ui.js
del /s /q ..\uiBase\ui-min.js
del /s /q ..\uiBase\skins\default\skin.css
del /s /q ..\uiBase\skins\default\skin-min.css
del /s /q ..\uiBase\*.*
for /f %%i in (ImageList.txt) do xcopy %%i ..\uiBase\skins\default\images\ /s /e /y
del /f /s /q ..\uiBase\skins\default\images\*.psd
echo --------------------
echo ����Ƥ����Դ���!
echo --------------------