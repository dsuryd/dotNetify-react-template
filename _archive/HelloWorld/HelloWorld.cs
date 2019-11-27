using System;
using DotNetify;
using System.Threading;

namespace HelloWorld
{
   public class HelloWorld : BaseVM
   {
      public class Person
      {
         public string Name { get; set; }
      }

      private Timer _timer;
      public Person User { get; set; } = new Person() { Name = "World" };
      public string Greetings => $"Hello {User.Name}!";
      public DateTime ServerTime => DateTime.Now;

      public HelloWorld()
      {
         _timer = new Timer(state =>
         {
            Changed(nameof(ServerTime));
            PushUpdates();
         }, null, 0, 1000);
      }

      public override void Dispose() => _timer.Dispose();
   }
}