<p align="center"><img width="300px" src="http://dotnetify.net/content/images/dotnetify-logo.png"></p>

## DotNetify React Template

DotNetify is a [free, open source project](https://github.com/dsuryd/dotNetify) that lets you create real-time, reactive, cross-platform apps with React, React Native, or Knockout front-end on C# .NET back-end via WebSocket.

This is a full React SPA template for ASP.NET Core featuring:

- Reactive, real-time dashboard page.
- Edit form + CRUD table pages.
- Login page with JWT bearer token authentication.
- UI components from [Material-UI](https://material-ui.com/).
- Routing with deep links.
- Webpack hot module replacement + [dotnet watch](https://docs.microsoft.com/en-us/aspnet/core/tutorials/dotnet-watch).
- [OpenID Connect/OAuth2](https://github.com/aspnet-contrib/AspNet.Security.OpenIdConnect.Server) authentication server.

### How to install from NuGet

```
dotnet new -i DotNetify.React.Template

dotnet new dotnetify -o MyApp
cd MyApp
npm i
dotnet watch
```

Open http://localhost:5000.

![alt screenshot](https://github.com/dsuryd/dotnetify-react-demo-vs2017/blob/master/ReactTemplate/screenshot.gif)

### How to make it work with IE 11

Add the following scripts in `index.html`:

```
 <!-- Polyfills for IE 11 -->
 <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/fetch-polyfill@0.8.2/fetch.min.js"></script>
```

### Documentation

Documentation and live demo are available at [http://dotnetify.net/react](http://dotnetify.net/react).

### Credits

The UI layout was adapted from the [work by @rafaelhz](https://github.com/rafaelhz/react-material-admin-template).
