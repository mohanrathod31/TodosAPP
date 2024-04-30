using ManageTodosAPI.Data;
using ManageTodosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ManageTodosAPI.Services
{
    public class TodosService : ITodosService
    {
        private readonly DataContext _context;

        public TodosService(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Todo>> GetAllTodos()
        {
            return await _context.Todos.ToListAsync();
        }

        public async Task<Todo> GetTodoById(int id)
        {
            return await _context.Todos.FindAsync(id);
        }

        public async Task CreateTodo(Todo todo)
        {
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTodo(Todo todo)
        {
            _context.Entry(todo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);
            if (todo != null)
            {
                _context.Todos.Remove(todo);
                await _context.SaveChangesAsync();
            }
        }
    }
}
