import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskEditDialogComponent } from '../task-edit-dialog/task-edit-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.sass']
})
export class TaskListComponent implements OnInit {
  @Input() status: string = '';
  tasks: Task[] = [];
  loading: boolean = true;

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.filter(task => task.status === this.status);
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
