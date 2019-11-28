using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Security;

namespace ReactTodoApp
{
   [Authorize]
   public class TodoList : MulticastVM
   {
      private static List<Todo> _todos = new List<Todo>();
      
      public class Todo
      {
         public int Id { get; set; }
         public string Text { get; set; }
         public bool Done { get; set; }
      }

      public List<Todo> Todos => _todos;

      public string Todos_itemKey => nameof(Todo.Id);

      public int ItemsLeft => Todos.Count(x => !x.Done);

      public Action<string> Add => text =>
      {
         var todo = new Todo { Id = text.GetHashCode(), Text = text };
         if(!Todos.Any(x => x.Id == todo.Id))
         {
            Todos.Add(todo);
            this.AddList(nameof(Todos), todo);
            Changed(nameof(ItemsLeft));
         }
      };

      public Action<Todo> Update => update =>
      {
         var todo = Todos.Find(x => x.Id == update.Id);
         if(todo != null)
         {
            if(string.IsNullOrWhiteSpace(update.Text))
               Remove(update.Id);
            else
            {
               todo.Text = update.Text;
               todo.Done = update.Done;
               this.UpdateList(nameof(Todos), todo);
               Changed(nameof(ItemsLeft));
            }
         }
      };

      public Action<int> Remove => id =>
      {
         var todo = Todos.Find(x => x.Id == id);
         if(todo != null)
         {
            Todos.Remove(todo);
            this.RemoveList(nameof(Todos), id);
            Changed(nameof(ItemsLeft));
         }
      };
   }
}