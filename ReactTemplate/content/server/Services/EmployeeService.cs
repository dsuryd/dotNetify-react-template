using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Newtonsoft.Json;

namespace projectName
{
   public interface IEmployeeService
   {
      IList<EmployeeModel> GetAll();
      EmployeeModel GetById(int id);
      int Add(EmployeeModel record);
      void Update(EmployeeModel record);
      void Delete(int id);
   }

   public class EmployeeModel
   {
      public int Id { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public int ReportTo { get; set; }
      public string FullName => $"{FirstName} {LastName}";
   }

   public class EmployeeService : IEmployeeService
   {
      private List<EmployeeModel> _employees;
      private int _newId;

      public EmployeeService()
      {
         _employees = JsonConvert.DeserializeObject<List<EmployeeModel>>(this.GetEmbeddedResource("employees.json"));
         _newId = _employees.Count;
      }

      public IList<EmployeeModel> GetAll() => _employees;

      public EmployeeModel GetById(int id) => _employees.FirstOrDefault(i => i.Id == id);

      public int Add(EmployeeModel record)
      {
         record.Id = ++_newId;
         _employees.Add(record);
         return record.Id;
      }

      public void Update(EmployeeModel record)
      {
         var idx = _employees.FindIndex(i => i.Id == record.Id);
         if (idx >= 0)
            _employees[idx] = record;
      }

      public void Delete(int id) => _employees.Remove(_employees.FirstOrDefault(i => i.Id == id));

      private string GetEmbeddedResource(string resourceName)
      {
         var assembly = GetType().Assembly;
         var name = assembly.GetManifestResourceNames().Where(i => i.EndsWith(resourceName, StringComparison.OrdinalIgnoreCase)).FirstOrDefault();
         if (string.IsNullOrEmpty(name))
            throw new FileNotFoundException();

         using (var reader = new StreamReader(assembly.GetManifestResourceStream(name), Encoding.UTF8))
            return reader.ReadToEnd();
      }
   }
}
