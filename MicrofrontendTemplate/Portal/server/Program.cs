using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace Portal
{
   public class Program
   {
      public static void Main(string[] args)
      {
         BuildWebHost(args).Run();
      }

      public static IWebHost BuildWebHost(string[] args) =>
          WebHost.CreateDefaultBuilder(args)
              .ConfigureAppConfiguration((_, config) => config.AddJsonFile("appsettings.json"))
              .UseStartup<Startup>()
              .Build();
   }
}