using DotNetify;
using DotNetify.Security;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Shared;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;

namespace ReactFormApp
{
   public class Startup
   {
      private readonly IConfiguration _config;

      public Startup(IConfiguration config)
      {
         _config = config;
      }

      public void ConfigureServices(IServiceCollection services)
      {
         services.AddCors();
         services.AddMemoryCache();
         services.AddSignalR();
         services.AddDotNetify();
         services.AddResponseCompression();

         services.AddScoped<ICustomerRepository, CustomerRepository>();
      }

      public void Configure(IApplicationBuilder app, IHostingEnvironment env)
      {
         app.UseCors(builder => builder
          .AllowAnyMethod()
          .AllowAnyHeader()
          .AllowAnyOrigin()
          .AllowCredentials());

         app.UseWebSockets();
         app.UseSignalR(routes => routes.MapDotNetifyHub());
         app.UseDotNetify(config =>
         {
            if (env.IsProduction())
            {
               IEnumerable<SecurityKey> keys;
               using (var client = HttpClientFactory.Create())
               {
                  var identityServerSettings = _config.GetSection(IdentityServerSettings.SectionName).Get<IdentityServerSettings>();
                  keys = IdentityServerClient.GetIssuerSigningKeysAsync(client, identityServerSettings).GetAwaiter().GetResult();
               }

               // Middleware to do authenticate token in incoming request headers.
               config.UseJwtBearerAuthentication(new TokenValidationParameters
               {
                  IssuerSigningKeys = keys,
                  ValidateIssuerSigningKey = true,
                  ValidateAudience = false,
                  ValidateIssuer = false,
                  ValidateLifetime = true,
                  ClockSkew = TimeSpan.FromSeconds(0)
               });

               // Filter to check whether user has permission to access view models with [Authorize] attribute.
               config.UseFilter<AuthorizeFilter>();
            }
            else
               config.UseDeveloperLogging();
         });

         if (env.IsDevelopment())
         {
            app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
            {
               HotModuleReplacement = true,
               HotModuleReplacementClientOptions = new Dictionary<string, string> { { "reload", "true" } },
            });
         }

         app.UseResponseCompression();
         app.UseFileServer();
         app.Run(async (context) =>
         {
            using (var reader = new StreamReader(File.OpenRead("wwwroot/index.html")))
               await context.Response.WriteAsync(reader.ReadToEnd());
         });
      }
   }
}