# GitHub Kanban Board

A dynamic web application that visualizes GitHub repository issues as a Kanban board. Simply enter the URL of a GitHub repository, and view its issues categorized into different stages of a workflow.

## Features

- **Dynamic Repository Input**: Enter any GitHub repository URL to visualize its issues.
- **Three-Column Layout**:
  - **To Do**: Displays all new issues.
  - **In Progress**: Shows opened issues that have an assignee.
  - **Done**: Lists all closed issues.
- **Drag-n-Drop Functionality**: Easily move issues between columns and change their order.
- **Persistent State**: The position of issues (both column and order) is stored across searches and browser sessions. If you load issues for one repo, switch to another, and then return to the first, all your changes will be retained.
- **Quick Links**: Directly visit the profile of the repository owner or the repository itself with convenient links located below the input.

## Technologies Used

- **React 18**: Utilizes the latest React version with hooks for efficient state management and rendering.
- **TypeScript**: Strongly-typed language that builds on JavaScript, ensuring more robust code.
- **React-Bootstrap**: Provides responsive design and styled-components for a modern UI/UX.
- **Redux-Toolkit**: Efficient state management tool for storing issues and their positions.
- **GitHub API**: Fetches issues dynamically based on user input.

## How to Use

1. Navigate to the application.
2. Enter the desired GitHub repository URL in the input at the top of the page (e.g., `https://github.com/facebook/react`).
3. Click "Load".
4. View the issues displayed on the Kanban board.
5. Drag and drop issues between columns or reorder them as desired.
6. To visit the profile of the repository owner or the repository itself, click on the respective links below the input.
