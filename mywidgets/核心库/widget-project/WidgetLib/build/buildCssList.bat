@echo off 
echo --------------------
echo ��ʼ������ʽ�ļ��б�
echo --------------------
set n=0
setlocal enabledelayedexpansion
for /f "delims=" %%a in (buildList.txt) do set /a n+=1 & set c!n!=%%a
for /l %%a in (1 1 !n!) do (
if not %%a==1 (echo !c%%a!*.css>>CssList.txt) else (echo !c%%a!*.css>CssList.txt)
)
echo --------------------
echo ������ʽ�ļ��б����!
echo --------------------
