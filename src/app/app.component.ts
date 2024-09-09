import { Component } from '@angular/core';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private dialog: MatDialog) {}

  openTaskForm() {
    this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: {}
    });
  }
}
