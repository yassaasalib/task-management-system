import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';
  private tasksSubject = new BehaviorSubject<Task[]>([]);  // BehaviorSubject to hold tasks
  tasks$ = this.tasksSubject.asObservable();  // Observable for tasks

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  // Function to load tasks from the API and update the BehaviorSubject
  loadTasks() {
    this.http.get<Task[]>(this.apiUrl).subscribe(tasks => {
      this.tasksSubject.next(tasks);  // Emit the new tasks array to subscribers
    });
  }

  // Function to get the tasks as an Observable
  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  // Function to create a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Function to edit an existing task
  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }

  // Function to delete a task
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
