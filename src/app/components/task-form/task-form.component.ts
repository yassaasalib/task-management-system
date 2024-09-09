import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup;
  users: string[] = ['User1', 'User2', 'User3']; // Static list of users

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['To Do', Validators.required],
      assignedUser: ['', Validators.required]
    });

    if (this.data && this.data.task) {
      this.taskForm.patchValue(this.data.task); // Populate the form if editing a task
    }
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        createdAt: new Date() // Add creation time
      };

      if (this.data && this.data.task) {
        // Update existing task
        this.taskService.updateTask({ ...this.data.task, ...newTask }).subscribe(() => {
          this.taskService.loadTasks();
          this.dialogRef.close(); // Close the dialog
        });
      } else {
        // Create new task
        this.taskService.createTask(newTask).subscribe(() => {
          this.taskForm.reset({ status: 'To Do' });
          this.taskService.loadTasks();
          this.dialogRef.close(); // Close the dialog
        });
      }
    }
  }
}
