using System;
using System.Collections.Generic;
using DotNetify;
using DotNetify.Routing;

namespace Routing
{
   public class Page1 : BaseVM, IRoutable
   {
      public string Title => "Page 1";

      public RoutingState RoutingState { get; set; }
      public Route LinkPage1A => this.GetRoute("Page1A");
      public Route LinkPage1B => this.GetRoute("Page1B");

      public Page1()
      {
         this.RegisterRoutes("Page1", new List<RouteTemplate>
         {
            new RouteTemplate("Page1Home") { UrlPattern = "", ViewUrl = "Page1A" },
            new RouteTemplate("Page1A")  { UrlPattern = "Page1A" },
            new RouteTemplate("Page1B")  { UrlPattern = "Page1B" }
         });
      }
   }
}
