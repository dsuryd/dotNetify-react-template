using System;
using System.Collections.Generic;
using System.Linq;
using DotNetify;
using DotNetify.Security;

namespace dotnetify_react_template
{
   [Authorize]
   public class Table : BaseVM
   {
      private readonly IEmployeeService _employeeService;
      private readonly int _recordsPerPage = 8;

      public class EmployeeInfo
      {
         public int Id { get; set; }
         public string FirstName { get; set; }
         public string LastName { get; set; }
      }

      // If you use CRUD methods on a list, you must set the item key prop name of that list
      // by defining a string property that starts with that list's prop name, followed by "_itemKey".
      public string Employees_itemKey => nameof(EmployeeInfo.Id);

      public IEnumerable<EmployeeInfo> Employees => Paginate(
          _employeeService
              .GetAll()
              .Select(i => new EmployeeInfo
              {
                 Id = i.Id,
                 FirstName = i.FirstName,
                 LastName = i.LastName
              }));

      public Action<string> Add => fullName =>
      {
         var names = fullName.Split(new char[] { ' ' }, 2);
         var newRecord = new EmployeeModel
         {
            FirstName = names.First(),
            LastName = names.Length > 1 ? names.Last() : ""
         };

         this.AddList(nameof(Employees), new EmployeeInfo
         {
            Id = _employeeService.Add(newRecord),
            FirstName = newRecord.FirstName,
            LastName = newRecord.LastName
         });

         SelectedPage = GetPageCount(_employeeService.GetAll().Count);
      };

      public Action<EmployeeInfo> Update => changes =>
      {
         var record = _employeeService.GetById(changes.Id);
         if (record != null)
         {
            record.FirstName = changes.FirstName ?? record.FirstName;
            record.LastName = changes.LastName ?? record.LastName;
            _employeeService.Update(record);

            ShowNotification = true;
         }
      };

      public Action<int> Remove => id =>
      {
         _employeeService.Delete(id);
         this.RemoveList(nameof(Employees), id);

         ShowNotification = true;
         Changed(nameof(SelectedPage));
         Changed(nameof(Employees));
      };

      // Whether to show notification that changes have been saved.
      // Once this property is accessed, it will revert itself back to false.
      private bool _showNotification;
      public bool ShowNotification
      {
         get
         {
            var value = _showNotification;
            _showNotification = false;
            return value;
         }
         set
         {
            _showNotification = value;
            Changed(nameof(ShowNotification));
         }
      }

      public int[] Pages
      {
         get => Get<int[]>();
         set
         {
            Set(value);
            SelectedPage = 1;
         }
      }

      public int SelectedPage
      {
         get => Get<int>();
         set
         {
            Set(value);
            Changed(nameof(Employees));
         }
      }

      public Table(IEmployeeService employeeService)
      {
         _employeeService = employeeService;
      }

      private IEnumerable<EmployeeInfo> Paginate(IEnumerable<EmployeeInfo> employees)
      {
         // ChangedProperties is a base class property that contains a list of changed properties.
         // Here it's used to check whether user has changed the SelectedPage property value by clicking a pagination button.
         if (this.ChangedProperties.ContainsKey(nameof(SelectedPage)))
            return employees.Skip(_recordsPerPage * (SelectedPage - 1)).Take(_recordsPerPage);
         else
         {
            Pages = Enumerable.Range(1, GetPageCount(employees.Count())).ToArray();
            return employees.Take(_recordsPerPage);
         }
      }

      private int GetPageCount(int records) => (int)Math.Ceiling(records / (double)_recordsPerPage);
   }
}