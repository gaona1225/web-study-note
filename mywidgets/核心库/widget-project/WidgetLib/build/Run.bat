@echo off 
color A
echo --------------------
echo Դ�빹���������
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
echo ������� !!!
echo --------------------
echo.
pause