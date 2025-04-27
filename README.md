# Task Management Application

This is a task management application built with React and Tailwind CSS, featuring user authentication and task management functionality. It allows users to manage their tasks with features like status toggling, task creation, and editing. The application also includes authentication, custom hooks for state management, and a clean, responsive UI.

## Core Structure

- **App.jsx**: Main application component with routing.
- **Auth and Task contexts**: For state management of authentication and task data.

## Features

### Authentication:
- Login and Register forms.
- Protected routes to ensure only authenticated users can access certain pages.
- Authentication context and custom hook (`useAuth`) to manage user authentication state.

### Task Management:
- Task list with filtering options.
- Task items that can be toggled between different statuses, edited, or deleted.
- Task form for creating and editing tasks.
- Task context and custom hook (`useTasks`) for task operations.

### UI Components:
- Modern and clean UI built with **Tailwind CSS**.
- Responsive design for both mobile and desktop devices.
- Loading states and error handling to improve user experience.
- Feedback with **toast notifications** for user actions.

### Custom Hooks:
- `useAuth`: Manages authentication state.
- `useTasks`: Handles task-related operations like creating, editing, and deleting tasks.

## Design Approach

The application follows a modern design approach with:
- **Clean, minimalist UI**.
- **Intuitive user experience** to easily manage tasks.
- **Responsive layout** for all device sizes.
- **Visual feedback** for user actions like task status change or error notifications.
- Proper **error handling** and loading states to guide the user through the application.

## How to Run the Application

To run the application, follow the steps below:

### 1. Start the backend server:
In the terminal, navigate to the `server` folder and start the server.

```bash
cd server
npm run dev
