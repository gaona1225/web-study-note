@echo off 
echo -------------------
echo 开始构建文档
echo -------------------
java -jar jsdoc-toolkit\jsrun.jar jsdoc-toolkit\app\run.js -a -d=..\uiBase\doc\ -t=jsdoc-toolkit\templates\codeview ..\uiBase\js\ui.js 
echo -------------------
echo 构建文档完成！
echo -------------------