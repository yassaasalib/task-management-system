import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit {
  tasksToDo: Task[] = [];
  tasksInProgress: Task[] = [];
  tasksDone: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasksToDo = tasks.filter(task => task.status === 'To Do');
      this.tasksInProgress = tasks.filter(task => task.status === 'In Progress');
      this.tasksDone = tasks.filter(task => task.status === 'Done');
    });
  }
}
