@echo off
if not exist node_modules call npm i
if "%1" == "prod" goto :prod
call npm run build
dotnet run
exit

:prod
call npm run prod
dotnet run --launch-profile prod
