import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Todo {
  text: string;
  completed: boolean;
  deadline: Date | null; // Allow null for deadline
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      newTodo: ['', [Validators.required, Validators.minLength(11)]],
      newDeadline: ['', Validators.required]
    });
  }

  title = 'todo-app';
  todos: Todo[] = [];
  isMarkingCompleted = true; // Flag to track button text

  addTodo() {
    if (this.todoForm.valid) {
      const newTodo: Todo = {
        text: this.todoForm.get('newTodo')?.value,
        completed: false,
        deadline: this.todoForm.get('newDeadline')?.value ? new Date(this.todoForm.get('newDeadline')?.value) : null
      };
      console.log(newTodo); // Log the newTodo object
      this.todos.push(newTodo);
      this.todoForm.reset(); // Reset the form
    }
  }
  

  markTodo(index: number) {
    this.todos[index].completed = !this.todos[index].completed;
    this.isMarkingCompleted = !this.isMarkingCompleted; // Toggle button text flag
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
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
  console.log("Deadline Time:", deadlineTime);
  console.log("Now:", now);
  console.log("Is Overdue:", deadlineTime < now);
  return deadlineTime < now;
}
  
}
