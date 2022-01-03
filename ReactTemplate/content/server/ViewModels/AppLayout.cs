using System.Security.Claims;
using DotNetify;
using DotNetify.Routing;
using DotNetify.Security;

namespace projectName;

[Authorize]
public class AppLayout : BaseVM, IRoutable
{
   private enum Route
   {
      Home,
      Dashboard,
      FormPage,
      TablePage
   };

   public static string FormPagePath => "Form";

   public RoutingState RoutingState { get; set; }

   public object Menus => new List<object>()
      {
         new { Title = "Dashboard",    Icon = "assessment", Route = this.GetRoute(nameof(Route.Dashboard)) },
         new { Title = "Form Page",    Icon = "web",        Route = this.GetRoute(nameof(Route.FormPage), $"{FormPagePath}/1") },
         new { Title = "Table Page",   Icon = "grid_on",    Route = this.GetRoute(nameof(Route.TablePage)) }
      };

   public string UserName { get; set; }
   public string UserAvatar { get; set; }

   public AppLayout(IPrincipalAccessor principalAccessor)
   {
      var userIdentity = principalAccessor.Principal.Identity as ClaimsIdentity;

      UserName = userIdentity.Name;
      UserAvatar = userIdentity.Claims.FirstOrDefault(i => i.Type == ClaimTypes.Uri)?.Value;

      this.RegisterRoutes("/", new List<RouteTemplate>
            {
                new RouteTemplate(nameof(Route.Home)) { UrlPattern = "", ViewUrl = nameof(Route.Dashboard) },
                new RouteTemplate(nameof(Route.Dashboard)),
                new RouteTemplate(nameof(Route.FormPage)) { UrlPattern = $"{FormPagePath}(/:id)" },
                new RouteTemplate(nameof(Route.TablePage))
            });
   }
}