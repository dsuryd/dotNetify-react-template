# &nbsp;![alt tag](http://dotnetify.net/content/images/greendot.png) dotNetify-React template

DotNetify is a free, open source project that lets you create real-time, reactive, cross-platform apps with React, React Native, or Knockout front-end on C# .NET back-end via WebSocket.

This is a full React SPA template for ASP.NET Core 2.0 featuring:
- Real-time dashboard page.
- Edit form + CRUD table pages.
- Login page with JWT bearer token authentication.
- UI components from [Material-UI](http://www.material-ui.com/#/).
- Routing with deep linking.
- Webpack hot module replacement + [dotnet watch](https://docs.microsoft.com/en-us/aspnet/core/tutorials/dotnet-watch).
- [OpenID Connect/OAuth2](https://github.com/aspnet-contrib/AspNet.Security.OpenIdConnect.Server) authentication server.

### How to install from NuGet

```
dotnet new -i DotNetify.React.Template

dotnet new dotnetify -o MyApp
cd MyApp
npm i
dotnet build
dotnet watch run
```
Open http://localhost:5000.

Note: Doesn't run on IE 11 (yet).

### Credits

The UI layout was adapted from the [work by @rafaelhz](https://github.com/rafaelhz/react-material-admin-template).  
