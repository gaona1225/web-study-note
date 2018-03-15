@echo off 
color A
echo --------------------
echo 源码构建程序就绪
echo --------------------
pause
call buildJsList.bat
call buildCssList.bat
call buildSkinList.bat
call copySkin.bat
call packagejs.bat
call buildDoc.bat
call copyPlus.bat
echo.
echo --------------------
echo 构建完成 !!!
echo --------------------
echo.
pause