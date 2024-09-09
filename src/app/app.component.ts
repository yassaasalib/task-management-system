import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from './components/task-form/task-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  users: string[] = ['User1', 'User2', 'User3']; // Static list of users
  selectedUser: string = '';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private dialog: MatDialog) {}

  openTaskForm() {
    this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: {}
    });
  }

  onUserFilterChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedUser = selectElement.value;
  }

  sortTasks(order: 'asc' | 'desc') {
    this.sortOrder = order;
  }
}
