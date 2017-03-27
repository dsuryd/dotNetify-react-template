using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace DotNetify.Routing
{
   public static class ServerSideRender
    {
      public static string GetInitialStates(ref string path, Type entryVMType)
      {
         try
         {
            // Traverse the routing path to get initial states of all the view models involved.
            var vmStates = new List<string>();
            if (path.Trim('/').Length > 0)
            {
               var viewData = new RoutingViewData(path, null, entryVMType);
               RoutableExtension.Route(ref viewData, out IRoutable vm);
               while (vm != null)
               {
                  // If at the end of the path and the view model has a default route template (blank url pattern),
                  // append a slash to the path to ensure it's correctly routed.
                  if (string.Compare(viewData.UrlPath, viewData.Root, true) == 0 && vm.RoutingState.Templates.Any(i => i.UrlPattern == ""))
                     path += "/";

                  // Determine the "RoutingState.Origin" property value and pass it as argument to the view model 
                  // associated with the current path to set its initial state correctly.
                  object vmArgs = null;
                  var args = vm.InitArgs(viewData);
                  var match = Regex.Match(args, "'RoutingState.Origin':\\s*'(.*?)'");
                  if (match.Success)
                     vmArgs = JsonConvert.DeserializeObject($"{{{match.Value}}}");

                  var vmName = vm.GetType().Name;
                  vmStates.Add($"\"{vmName}\":{VMController.GetInitialState(vmName, vmArgs)}");

                  // Traverse the next path.
                  RoutableExtension.Route(ref viewData, out vm);
               }
            }

            return $"{{{string.Join(",", vmStates)}}}";
            
         }
         catch (Exception ex)
         {
            System.Diagnostics.Trace.Fail( ex.ToString() );
            return null;
         }
      }
   }
}
