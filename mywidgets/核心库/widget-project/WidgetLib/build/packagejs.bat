@echo off 
echo --------------------
echo 开始构建核心资源文件
echo --------------------
md ..\uiBase\js
for /f %%i in (JsList.txt) do type %%i >> ..\uiBase\js\ui.js
java -jar yuicompressor-2.4.6.jar --type js --charset utf-8 -o ..\uiBase\js\ui-min.js ..\uiBase\js\ui.js
for /f %%i in (CssList.txt) do type %%i >> ..\uiBase\skins\default\skin.css
java -jar yuicompressor-2.4.6.jar --type css --charset utf-8 -o ..\uiBase\skins\default\skin-min.css ..\uiBase\skins\default\skin.css
echo --------------------
echo 构建核心资源文件完成!
echo --------------------
echo.
echo --------------------
echo 清除缓存
echo --------------------
del /s /q ImageList.txt
del /s /q JsList.txt
del /s /q CssList.txt
echo --------------------
echo 清除缓存完成!
echo --------------------