import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from '../task-edit-dialog/task-edit-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit, OnChanges {
  @Input() status: string = ''; // Accepts 'To Do', 'In Progress', 'Done'
  @Input() filterUser: string | null = null; // Accepts the selected user for filtering
  @Input() sortOrder: 'asc' | 'desc' = 'asc'; // Accepts sort order ('asc' or 'desc')

  tasks: Task[] = [];
  loading: boolean = true;

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterUser'] || changes['sortOrder']) {
      this.loadTasks();
    }
  }

  loadTasks(): void {
    this.loading = true;
    this.taskService.getTasks().subscribe(tasks => {
      let filteredTasks = tasks.filter(task => task.status === this.status);
      
      if (this.filterUser) {
        filteredTasks = filteredTasks.filter(task => task.assignedUser === this.filterUser);
      }

      if (this.sortOrder === 'asc') {
        filteredTasks.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      } else {
        filteredTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      this.tasks = filteredTasks;
      this.loading = false;
    });
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(TaskEditDialogComponent, {
      width: '400px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.loadTasks(); // Refresh tasks if an update was made
      }
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.taskService.loadTasks();
    });
  }

  getCategoryClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'done':
        return 'Done';
      case 'in progress':
        return 'InProgress';
      case 'to do':
        return 'ToDo';
      default:
        return '';
    }
  }
}
