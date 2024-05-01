using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ManageTodosAPI.Models;
using ManageTodosAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ManageTodosAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly ITodosService _todoService;

        public TodosController(ITodosService todoService)
        {
            _todoService = todoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetAllTodos()
        {
            var todos = await _todoService.GetAllTodos();
            return Ok(todos);
        }

        [HttpGet("incomplete")]
        public async Task<ActionResult<IEnumerable<Todo>>> GetAllIncompleteTodos()
        {
           var incompleteTodos = await _todoService.GetAllIncompleteTodos();
            return Ok(incompleteTodos);
        }

        [HttpGet("completed")]
        public async Task<ActionResult<IEnumerable<Todo>>> GetAllCompletedTodos()
        {
            var completedTodos = await _todoService.GetAllCompletedTodos();
            return Ok(completedTodos);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodoById(int id)
        {
            var todo = await _todoService.GetTodoById(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }

        [HttpPost]
        public async Task<ActionResult<Todo>> CreateTodo(Todo todo)
        {
            await _todoService.CreateTodo(todo);
            return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, Todo todo)
        {
            if (id != todo.Id)
            {
                return BadRequest();
            }

            await _todoService.UpdateTodo(todo);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            await _todoService.DeleteTodo(id);
            return NoContent();
        }
    }
}
