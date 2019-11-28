@echo off
if "%1" == "apps" goto :apps

cd nginx
start cmd /k run.bat
cd ..

cd Portal
start cmd /k run prod
cd ..
@echo Wait until the portal app started, then type "run apps" to start the other apps.
@echo Open the website at http://localhost:8080.
pause
goto :end

:apps
cd ReactDashboardApp
start cmd /k run prod

cd ../ReactFormApp
start cmd /k run prod

cd ../ReactTodoApp
start cmd /k run prod

cd ../VueTodoApp
start cmd /k run prod

cd ..

:end