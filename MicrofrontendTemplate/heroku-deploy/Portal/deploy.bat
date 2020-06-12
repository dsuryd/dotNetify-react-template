@echo off

echo --- Copy source code
xcopy ..\..\Portal\*.* .\__tmp__\Portal\ /q /s /e /d /y /exclude:excludedfiles.txt
xcopy ..\..\Shared\*.* .\__tmp__\Shared\ /q /s /e /d /y /exclude:excludedfiles.txt

xcopy appsettings.json .\__tmp__\Portal\ /q /y

call heroku container:push web -a dotnetify-portal
call heroku container:release web -a dotnetify-portal

rd __tmp__ /q /s
