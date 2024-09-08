import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-edit-dialog',
  templateUrl: './task-edit-dialog.component.html',
  styleUrls: ['./task-edit-dialog.component.sass']
})
export class TaskEditDialogComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<TaskEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.data.task.title, Validators.required],
      description: [this.data.task.description],
      status: [this.data.task.status, Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.data.task,
        ...this.taskForm.value
      };

      this.taskService.editTask(updatedTask).subscribe(() => {
        this.dialogRef.close(true); // Notify task was updated
      });
    }
  }
}
