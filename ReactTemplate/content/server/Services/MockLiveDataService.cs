using System.Reactive.Linq;

namespace projectName;

public interface ILiveDataService
{
   IObservable<string> Download { get; }
   IObservable<string> Upload { get; }
   IObservable<string> Latency { get; }
   IObservable<int> Users { get; }
   IObservable<int[]> Traffic { get; }
   IObservable<int[]> ServerUsage { get; }
   IObservable<int[]> Utilization { get; }
   IObservable<Activity> RecentActivity { get; }
}

public class Activity
{
   public int Id { get; set; }
   public string PersonName { get; set; }
   public string Status { get; set; }
}

public class MockLiveDataService : ILiveDataService
{
   private readonly Random _random = new Random();

   private readonly Dictionary<int, string> _activities = new Dictionary<int, string> {
            {1, "Offline"},
            {2, "Active"},
            {3, "Busy"},
            {4, "Away"},
            {5, "In a Call"}
        };

   public IObservable<string> Download { get; }

   public IObservable<string> Upload { get; }

   public IObservable<string> Latency { get; }

   public IObservable<int> Users { get; }

   public IObservable<int[]> Traffic { get; }

   public IObservable<int[]> ServerUsage { get; }

   public IObservable<int[]> Utilization { get; }

   public IObservable<Activity> RecentActivity { get; }

   public MockLiveDataService(IEmployeeService employeeService)
   {
      Download = Observable
         .Interval(TimeSpan.FromMilliseconds(900))
         .StartWith(0)
         .Select(_ => $"{Math.Round(_random.Next(15, 30) + _random.NextDouble(), 1)} Mb/s");

      Upload = Observable
         .Interval(TimeSpan.FromMilliseconds(800))
         .StartWith(0)
         .Select(_ => $"{Math.Round(_random.Next(5, 7) + _random.NextDouble(), 1)} Mb/s");

      Latency = Observable
         .Interval(TimeSpan.FromSeconds(1))
         .StartWith(0)
         .Select(_ => $"{_random.Next(50, 200)} ms");

      Users = Observable
         .Interval(TimeSpan.FromMilliseconds(1200))
         .StartWith(0)
         .Select(_ => _random.Next(200, 300));

      Traffic = Observable
         .Interval(TimeSpan.FromMilliseconds(600))
         .StartWith(0)
         .Select(_ => Enumerable.Range(1, 7).Select(i => _random.Next(1000, 10000)).ToArray());

      ServerUsage = Observable
         .Interval(TimeSpan.FromMilliseconds(400))
         .StartWith(0)
         .Select(_ => Enumerable.Range(1, 10).Select(i => _random.Next(1, 100)).ToArray());

      Utilization = Observable
         .Interval(TimeSpan.FromMilliseconds(800))
         .StartWith(0)
         .Select(_ => Enumerable.Range(1, 3).Select(i => _random.Next(1, 100)).ToArray());

      RecentActivity = Observable
         .Interval(TimeSpan.FromSeconds(2))
         .StartWith(0)
         .Select(_ => GetRandomEmployee(employeeService))
         .Select(employee => new Activity
         {
            Id = employee.Id,
            PersonName = employee.FullName,
            Status = _activities[_random.Next(1, 6)]
         })
         .StartWith(
            Enumerable.Range(1, 4)
            .Select(_ => GetRandomEmployee(employeeService))
            .Select(employee => new Activity
            {
               Id = employee.Id,
               PersonName = employee.FullName,
               Status = _activities[_random.Next(1, 6)],
            })
            .ToArray()
         );
   }

   private EmployeeModel GetRandomEmployee(IEmployeeService employeeService)
   {
      EmployeeModel record;
      while ((record = employeeService.GetById(_random.Next(1, 20))) == null) ;
      return record;
   }
}