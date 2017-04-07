using System;
using System.Reactive.Linq;
using Rx = System.Reactive.Linq;
using DotNetify;

namespace LiveChart
{
   public class LiveChart : BaseVM
   {
      private IDisposable _subscription;
      public int NextValue { get; set; }

      public LiveChart()
      {
         var sineStream = Rx.Observable.Interval(TimeSpan.FromSeconds(.1)).Select(t => Math.Sin(2 * Math.PI * .06 * t));
         var ampStream = Rx.Observable.Interval(TimeSpan.FromSeconds(.1)).Select(a => a % 50 + 1);

         _subscription = Rx.Observable
            .Zip(sineStream, ampStream, (sine, amp) => (int) Math.Abs( sine * amp))
            .Subscribe(value =>
            {
               NextValue = value;
               Changed(nameof(NextValue));
               PushUpdates();
            });
      }

      public override void Dispose() => _subscription.Dispose();
   }
}