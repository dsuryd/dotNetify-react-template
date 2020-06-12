@echo off
set env=Production
if "%1"=="" goto :next
set env=%1
:next

echo --- Copy source code
xcopy ..\..\Portal\*.* .\__tmp__\Portal\ /q /s /e /d /y /exclude:excludedfiles.txt
xcopy ..\..\Shared\*.* .\__tmp__\Shared\ /q /s /e /d /y /exclude:excludedfiles.txt

echo --- Remove any existing image
docker rmi portal -f

echo --- Build a new image
docker build -t portal -f ./Dockerfile . --build-arg aspnetenv=%env%

echo --- Remove build images
docker image prune -f --filter label=stage=build
rd __tmp__ /q /s

echo --- Run a container on port 5000
docker run -it --rm -p:5000:80 --name portal_5000 portal