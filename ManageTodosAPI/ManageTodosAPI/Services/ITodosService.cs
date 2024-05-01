using ManageTodosAPI.Models;

namespace ManageTodosAPI.Services
{
    public interface ITodosService
    {
        Task<IEnumerable<Todo>> GetAllTodos();

        Task<Todo> GetTodoById(int id);

        Task CreateTodo(Todo todo);

        Task UpdateTodo(Todo todo);

        Task DeleteTodo(int id);

        Task<IEnumerable<Todo>> GetAllIncompleteTodos();

        Task<IEnumerable<Todo>> GetAllCompletedTodos();
    }
}
