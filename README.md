# Task Management System

This project is a simple task management application built with Angular. It allows users to create, edit, delete, filter, and sort tasks. The application interacts with a fake API using JSON Server and includes features like a skeleton loader during API calls, a detailed view of individual tasks, and a responsive UI.

## Features

- **Task List:** Display tasks with Title, Description, Status, Assigned User, and Creation Time.
- **Task Operations:** Create new tasks, edit existing tasks, and delete tasks.
- **Filtering & Sorting:** Filter tasks by user and sort tasks by creation date.
- **Detailed Task View:** View more detailed information about each task.
- **API Integration:** Fetch tasks from a fake API (using JSON Server) with simulated delays.
- **Skeleton Loader:** Show loading indicators while fetching data.
- **Responsive Design:** The application is responsive and user-friendly across various devices.

## Getting Started

### Clone the Repository:
`git clone https://github.com/yassaasalib/task-management-system`


# Install Dependencies
`cd task-management-system`
`npm install`

## Run the Development Server
`ng serve`

The application will be available at http://localhost:4200/.

## JSON Server Setup
To simulate a backend API, this project uses JSON Server.

`json-server --watch db.json --port 3000`

This will start a JSON Server instance on port 3000, serving your task data.
