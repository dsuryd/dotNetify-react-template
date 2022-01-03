using System.Text;
using BrunoLau.SpaServices.Webpack;
using DotNetify;
using DotNetify.Security;
using Microsoft.IdentityModel.Tokens;
using projectName;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

// Add OpenID Connect server to produce JWT access tokens.
services.AddAuthenticationServer();

services.AddSignalR();
services.AddDotNetify();

services.AddTransient<ILiveDataService, MockLiveDataService>();
services.AddSingleton<IEmployeeService, EmployeeService>();

var app = builder.Build();

app.UseAuthentication();

app.UseWebSockets();
app.UseDotNetify(config =>
{
   // Middleware to do authenticate token in incoming request headers.
   config.UseJwtBearerAuthentication(new TokenValidationParameters
   {
      IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(AuthServer.SecretKey)),
      ValidateIssuerSigningKey = true,
      ValidateAudience = false,
      ValidateIssuer = false,
      ValidateLifetime = true,
      ClockSkew = TimeSpan.FromSeconds(0)
   });

   // Filter to check whether user has permission to access view models with [Authorize] attribute.
   config.UseFilter<AuthorizeFilter>();
});

if (app.Environment.IsDevelopment())
   app.UseWebpackDevMiddlewareEx(new WebpackDevMiddlewareOptions { HotModuleReplacement = true });

app.UseFileServer();
app.UseRouting();
app.UseEndpoints(endpoints =>
{
   endpoints.MapHub<DotNetifyHub>("/dotnetify");
   endpoints.MapFallbackToFile("index.html");
});

app.Run();