using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.NodeServices;
using Microsoft.Extensions.DependencyInjection;
using DotNetify;
using DotNetify.Routing;

namespace Routing
{
   public class Startup
   {
      public void ConfigureServices(IServiceCollection services)
      {
         services.AddNodeServices();
         services.AddMemoryCache();
         services.AddSignalR();
         services.AddDotNetify();
      }

      public void Configure(IApplicationBuilder app, INodeServices nodeServices)
      {
         app.UseStaticFiles();
         app.UseWebSockets();
         app.UseSignalR();
         app.UseDotNetify();

         app.Run(async (context) =>
         {
            if (context.Request.Query["ssr"] == "false")
            {
               // Client-side rendering.
               using (var reader = new StreamReader(File.OpenRead("wwwroot/index.html")))
                  await context.Response.WriteAsync(reader.ReadToEnd());
            }
            else
            {
               // Server-side reandering.
               var path = context.Request.Path.Value;
               path = path == "/" ? "/index" : path;
               var ssrStates = ServerSideRender.GetInitialStates(ref path, typeof(Index));

               var result = await nodeServices.InvokeAsync<string>("./src/app.server", path, ssrStates);
               await context.Response.WriteAsync(result);
            }
         });
      }
   }
}