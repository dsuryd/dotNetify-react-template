@echo off
if "%1"=="" goto :error
set hostip=%1

echo --- Remove any existing image
docker rmi gateway -f

echo --- Build a new image
docker build -t gateway -f ./Dockerfile .

echo --- Run a container on port 8080
docker run -it --rm -p:8080:80 --add-host=hostip:%hostip% --name gateway_8080 gateway 

goto :end
:error
echo Syntax: 'build ip_address' & echo.
:end