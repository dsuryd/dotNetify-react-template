using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using DotNetify.Routing;
using DotNetify.Security;

namespace dotnetify_react_template
{
   [Authorize]
   public class Dashboard : DotNetify.BaseVM, IRoutable
   {
      private readonly IDisposable[] _subscriptions;
      private readonly object _lock = new object();

      public class Activity
      {
         public string PersonName { get; set; }
         public Route Route { get; set; }
         public string Status { get; set; }
      }

      public RoutingState RoutingState { get; set; }

      public string Download
      {
         get => Get<string>();
         set => Set(value);
      }

      public string Upload
      {
         get => Get<string>();
         set => Set(value);
      }

      public string Latency
      {
         get => Get<string>();
         set => Set(value);
      }

      public int Users
      {
         get => Get<int>();
         set => Set(value);
      }

      public int[] Traffic
      {
         get => Get<int[]>();
         set => Set(value);
      }

      public int[] ServerUsage
      {
         get => Get<int[]>();
         set => Set(value);
      }

      public string[] ServerUsageLabel => new string[] { "dns", "sql", "nethst", "w2k", "ubnt", "uat", "ftp", "smtp", "exch", "demo" };

      public Activity[] RecentActivities
      {
         get => Get<Activity[]>();
         set => Set(value);
      }

      public int[] Utilization
      {
         get => Get<int[]>();
         set => Set(value);
      }

      public string[] UtilizationLabel => new string[] { "Memory", "Disk", "Network" };

      public Dashboard(ILiveDataService liveDataService)
      {
         _subscriptions = new IDisposable[]
         {
            liveDataService.Download.Subscribe(value => SafeUpdate(() => Download = value)),
            liveDataService.Upload.Subscribe(value => SafeUpdate(() => Upload = value)),
            liveDataService.Latency.Subscribe(value => SafeUpdate(() => Latency = value)),
            liveDataService.Users.Subscribe(value => SafeUpdate(() => Users = value)),
            liveDataService.Traffic.Subscribe(value => SafeUpdate(() => Traffic = value)),
            liveDataService.ServerUsage.Subscribe(value => SafeUpdate(() => ServerUsage = value)),
            liveDataService.Utilization.Subscribe(value => SafeUpdate(() => Utilization = value)),
            liveDataService.RecentActivity.Subscribe(value =>
            {
               var activities = new Queue<Activity>(RecentActivities?.Reverse() ?? new Activity[] { });
               activities.Enqueue(new Activity
               {
                  PersonName = value.PersonName,
                  Status = value.Status,
                  Route = this.Redirect(AppLayout.FormPagePath, value.Id.ToString())
               });

               if (activities.Count > 4)
                  activities.Dequeue();

               SafeUpdate(() => RecentActivities = activities.Reverse().ToArray());
            }),

            // Regulate data update interval to no less than every 200 msecs.
            Observable
               .Interval(TimeSpan.FromMilliseconds(200))
               .StartWith(0)
               .Subscribe(_ =>
               {
                  lock(_lock)
                  {
                     if (ChangedProperties.Any())
                        PushUpdates();
                  }
               })
         };
      }

      public override void Dispose() => _subscriptions.ToList().ForEach(i => i.Dispose());

      private void SafeUpdate(Action action)
      {
         lock (_lock)
         {
            action.Invoke();
         }
      }
   }
}