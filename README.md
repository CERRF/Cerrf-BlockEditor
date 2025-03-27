# Cerrf-BlockEditor


# Cerrf-BlockEditor

Cerrf-BlockEditor is a web-based visual programming environment built using Flask. It allows users to create Python code by arranging and configuring interactive blocks, which are then translated into executable Python code. The application provides a simple drag-and-drop interface with a toolbox of block types such as control structures, functions, and variable assignments.

## Project Goals

- **Intuitive Visual Programming:** Allow users to design and generate Python code without manually writing it.
- **Interactive Block Editor:** Offer a variety of customizable blocks (e.g., if statements, loops, function calls) to cover common programming constructs.
- **Immediate Code Execution:** Enable users to run the generated code and view terminal output within the application.
- **Extensibility:** Provide a foundation for further customization and extension with features such as additional block types and enhanced editing capabilities.

## Current Features

- **User Interface:**
  - A responsive layout with a vertical toolbox sidebar, main workspace, and a terminal output panel.
  - A toggleable toolbox activated via a hamburger menu.
- **Block Creation:**
  - Predefined blocks for print statements, assignments, conditions, loops, function definitions, and more.
  - Blocks are drag-enabled to allow repositioning in the workspace.
- **Code Generation and Execution:**
  - Blocks are converted into valid Python code.
  - Flask backend executes the generated Python code and returns the output for display.

## Roadmap & MoSCoW Prioritization

### Must-Have

- **Improved Security for Code Execution:** Implement a safe sandbox for executing user-supplied code.
- **Error Handling and Feedback:** Enhance error messages and block validation to help users correct mistakes.
- **Block Deletion and Editing:** Allow users to remove or modify blocks after creation.

### Should-Have

- **Block Nesting Enhancements:** Support more complex nested structures and visually represent hierarchy.
- **User Authentication:** Provide user accounts to save and manage projects.
- **Responsive Design Improvements:** Ensure the editor works well on different devices and screen sizes.

### Could-Have

- **Custom Block Creation:** Enable users to create their own custom blocks and extend functionality.
- **Collaboration Tools:** Support real-time collaboration where multiple users edit the block workspace concurrently.
- **Version Control Integration:** Allow users to track changes and revert to previous versions.

### Won’t-Have (for now)

- **Full-Fledged IDE Features:** Advanced code refactoring, debugging, and autocompletion support are outside the current scope.
- **Offline Mode:** The initial release will focus on a web-based experience without offline capabilities.

## Getting Started

1. **Install Dependencies:**
   Ensure you have Python installed, then install Flask:
   ```bash
   pip install flask
   ```


2. **Run the Application:**
   From the project root, run:

   **python** **app.py**
3. **Access the Editor:**
   Open your browser and navigate to `http://localhost:8000`.
