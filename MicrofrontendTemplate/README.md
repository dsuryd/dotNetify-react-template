<p align="center"><img width="400px" src="https://dotnetify.net/content/images/dotnetify-logo.png"></p>

## DotNetify - Micro-Frontend Demo

### How to Run

If on Windows, type `run` from the command prompt to start the portal and the nginx API gateway.  Wait until the portal app started, then type `run apps` to start all the apps. Alternatively, you can start them one at a time by going to an app's folder and type `run prod`.  Open the website at http://localhost:8080.  

If not on Windows, you can't use the Windows-based nginx from this repo.  Either install one for your system and copy the configuration `conf/nginx.conf`, or just run the portal and the apps in development mode below.

### Running In Dev Mode

Go the the Portal folder and type `npm i` followed by `dotnet run`.  Then go to each app's folder and do the same thing.  They will start in development mode. Open the website at http://localhost:5000.  

In development mode, authentication is disabled so you can run the app as stand-alone, and hot module reload is also enabled.  The app's port is specified in `Properties/launchsettings.json`.