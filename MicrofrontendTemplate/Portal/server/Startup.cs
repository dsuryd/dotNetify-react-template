using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shared;
using System.Collections.Generic;
using System.IO;

namespace Portal
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
         var identityServerSettings = _config.GetSection(IdentityServerSettings.SectionName);
         var identityServerUri = identityServerSettings.GetValue<string>(nameof(IdentityServerSettings.Uri));

         services.AddOptions();
         services.Configure<IdentityServerSettings>(identityServerSettings);

         services.AddIdentityServer()
           .AddDeveloperSigningCredential()
           .AddInMemoryApiResources(IdentityServerConfig.GetApiResources())
           .AddInMemoryClients(IdentityServerConfig.GetClients());

         services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddIdentityServerAuthentication(options =>
            {
               options.Authority = identityServerUri;
               options.RequireHttpsMetadata = false;
               options.ApiName = IdentityServerConfig.MyClientId;
            });

         services.AddAuthorization()
           .AddMvcCore()
           .AddJsonFormatters();

         services.AddHttpClient();
         services.AddResponseCompression();
      }

      public void Configure(IApplicationBuilder app, IHostingEnvironment env)
      {
         if(env.IsDevelopment())
         {
            app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
            {
               HotModuleReplacement = true,
               HotModuleReplacementClientOptions = new Dictionary<string, string> { { "reload", "true" } },
            });
         }

         app.UseIdentityServer();

         app.UseResponseCompression();
         app.UseMvc();
         app.UseFileServer();
         app.Run(async (context) =>
         {
            using(var reader = new StreamReader(File.OpenRead("wwwroot/index.html")))
               await context.Response.WriteAsync(reader.ReadToEnd());
         });
      }
   }
}