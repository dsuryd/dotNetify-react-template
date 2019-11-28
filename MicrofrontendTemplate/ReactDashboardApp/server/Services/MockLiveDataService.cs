using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using Bogus;

namespace ReactDashboardApp
{
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
      private static readonly Dictionary<int, string> _activities = new Dictionary<int, string> {
            {1, "Offline"},
            {2, "Active"},
            {3, "Busy"},
            {4, "Away"},
            {5, "In a Call"}
        };

      public int Id { get; set; }
      public string PersonName { get; set; }
      public int StatusId { get; set; }
      public string Status => _activities[StatusId];
   }

   public class Customer
   {
      public int Id { get; set;}
      public string Name { get; set; }
   }

   public class MockLiveDataService : ILiveDataService
   {
      private readonly Random _random = new Random();

      public IObservable<string> Download { get; }

      public IObservable<string> Upload { get; }

      public IObservable<string> Latency { get; }

      public IObservable<int> Users { get; }

      public IObservable<int[]> Traffic { get; }

      public IObservable<int[]> ServerUsage { get; }

      public IObservable<int[]> Utilization { get; }

      public IObservable<Activity> RecentActivity { get; }

      public MockLiveDataService()
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
            .Select(_ => GetRandomCustomer())
            .Select(customer => new Activity
            {
               Id = customer.Id,
               PersonName = customer.Name,
               StatusId = _random.Next(1, 6)
            })
            .StartWith(
               Enumerable.Range(1, 4)
               .Select(_ => GetRandomCustomer())
               .Select(customer => new Activity
               {
                  Id = customer.Id,
                  PersonName = customer.Name,
                  StatusId = _random.Next(1, 6)
               })
               .ToArray()
            );
      }
      
      private Customer GetRandomCustomer() 
      {
         return new Faker<Customer>()
            .CustomInstantiator(f => new Customer { Id = f.Random.Number(0, 100) })
            .RuleFor(o => o.Name, f => f.Person.FullName)
            .Generate();
      }
   }
}
