@echo off

echo --- Copy source code
xcopy ..\..\ReactDashboardApp\*.* .\__tmp__\ReactDashboardApp\ /q /s /e /d /y /exclude:excludedfiles.txt
xcopy ..\..\Shared\*.* .\__tmp__\Shared\ /q /s /e /d /y /exclude:excludedfiles.txt

xcopy appsettings.json .\__tmp__\ReactDashboardApp\ /q /y

call heroku container:push web -a dotnetify-dashboard
call heroku container:release web -a dotnetify-dashboard

rd __tmp__ /q /s
