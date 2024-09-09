export interface Task {
	id: number;
	title: string;
	description: string;
	status: string;
	assignedUser: string; // New property for user assignment
	createdAt: Date; // New property for task creation time
  }
  