import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo, TodosService } from './todo-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todoForm!: FormGroup;
  todos: Todo[] = [];
  isMarkingCompleted = true; // Flag to track button text

  constructor(private fb: FormBuilder, private todosService: TodosService) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      newTodo: ['', [Validators.required, Validators.minLength(11)]],
      newDeadline: ['', Validators.required]
    });

    this.loadTodos();
  }

  loadTodos() {
    this.todosService.getAllTodos().subscribe(
      todos => {
        this.todos = todos;
      },
      error => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  addTodo() {
    if (this.todoForm.valid) {
      const newTodo: Omit<Todo, 'id'> = {
        task: this.todoForm.get('newTodo')?.value,
        isCompleted: false,
        deadline: this.todoForm.get('newDeadline')?.value
          ? new Date(this.todoForm.get('newDeadline')?.value)
          : null
      };
      this.todosService.createTodo(newTodo).subscribe(
        createdTodo => {
          this.todos.push(createdTodo);
          this.todoForm.reset(); // Reset the form
        },
        error => {
          console.error('Error adding todo:', error);
        }
      );
    }
  }
  
  markTodo(todo: Todo) {
    todo.isCompleted = !todo.isCompleted;
    this.todosService.updateTodo(todo).subscribe(
      () => {},
      error => {
        console.error('Error updating todo:', error);
        // Revert back the change in UI if there is an error
        todo.isCompleted = !todo.isCompleted;
      }
    );
  }

  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todosService.deleteTodo(todo.id).subscribe(
        () => {
          this.todos.splice(index, 1);
        },
        error => {
          console.error('Error deleting todo:', error);
        }
      );
    }
  }

  formatDeadline(deadline: Date | null): string {
    if (deadline instanceof Date && !isNaN(deadline.getTime())) {
      return deadline.toLocaleDateString();
    }
    return '';
  }

  isOverdue(todo: Todo): boolean {
    if (!todo.deadline) {
      return false; // If no deadline is set, task is not overdue
    }
    const deadlineTime = new Date(todo.deadline).getTime();
    const now = new Date().getTime();
    return deadlineTime < now;
  }
}
