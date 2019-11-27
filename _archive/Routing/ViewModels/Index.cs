using System;
using System.Collections.Generic;
using DotNetify;
using DotNetify.Routing;

namespace Routing
{
   public class Index : BaseVM, IRoutable
   {
      public RoutingState RoutingState { get; set; }

      public List<object> Links => new List<object>()
      {
         new { Title = "Page 1", Route = this.GetRoute("Page1") },
         new { Title = "Page 2", Route = this.GetRoute("Page2") },
         new { Title = "Page 3", Route = this.GetRoute("Page3") }
      };

      public Index()
      {
         this.RegisterRoutes("", new List<RouteTemplate>
         {
            new RouteTemplate("Home")                 { UrlPattern = "" },
            new RouteTemplate("Page1", "/page1.js")   { UrlPattern = "Page1", VMType = typeof(Page1) },
            new RouteTemplate("Page2", "/page2.js")   { UrlPattern = "Page2", VMType = typeof(Page2) },
            new RouteTemplate("Page3")                { UrlPattern = "Page3", ViewUrl = "/page3.html" },
         });
      }
   }
}