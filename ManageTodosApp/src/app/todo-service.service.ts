import { Injectable } from '@angular/core';
import { HttpErrorResponse ,HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private baseUrl = 'https://localhost:32770/api/todos';

  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.baseUrl);
  }

  getActiveTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/incomplete`);
  }

  getCompletedTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.baseUrl}/completed`);
  }

  getTodoById(id: number): Observable<Todo> {
    return this.http.get<Todo>(`${this.baseUrl}/${id}`);
  }

  createTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, todo).pipe(
      catchError((error: HttpErrorResponse) => { 
        console.error('Error creating todo:', error);
        return throwError(() => new Error('Failed to create todo')); 
      })
    );
  }
  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

export interface Todo {
  id: number;
  task: string;
  isCompleted: boolean;
  deadline: Date | null;
}
