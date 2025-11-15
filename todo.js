#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// File to store todos
const TODO_FILE = path.join(process.env.HOME || process.env.USERPROFILE, '.todos.json');

// Load todos from file
function loadTodos() {
  try {
    if (fs.existsSync(TODO_FILE)) {
      const data = fs.readFileSync(TODO_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading todos:', error.message);
  }
  return [];
}

// Save todos to file
function saveTodos(todos) {
  try {
    fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error('Error saving todos:', error.message);
  }
}

// Display help
function showHelp() {
  console.log(`
Todo CLI - Simple task management

Usage:
  todo add <task>       Add a new task
  todo list             List all tasks
  todo complete <id>    Mark a task as complete
  todo delete <id>      Delete a task
  todo help             Show this help message

Examples:
  todo add "Buy groceries"
  todo list
  todo complete 1
  todo delete 2
`);
}

// Add a new todo
function addTodo(task) {
  const todos = loadTodos();
  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    task: task,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(newTodo);
  saveTodos(todos);
  console.log(`✓ Added task #${newTodo.id}: "${task}"`);
}

// List all todos
function listTodos() {
  const todos = loadTodos();
  
  if (todos.length === 0) {
    console.log('No tasks found. Add one with: todo add <task>');
    return;
  }

  console.log('\nYour Tasks:');
  console.log('─'.repeat(60));
  
  todos.forEach(todo => {
    const status = todo.completed ? '✓' : '○';
    const strikethrough = todo.completed ? '\x1b[9m' : '';
    const reset = todo.completed ? '\x1b[0m' : '';
    console.log(`${status} [${todo.id}] ${strikethrough}${todo.task}${reset}`);
  });
  
  console.log('─'.repeat(60));
  
  const completed = todos.filter(t => t.completed).length;
  const total = todos.length;
  console.log(`Completed: ${completed}/${total} tasks\n`);
}

// Complete a todo
function completeTodo(id) {
  const todos = loadTodos();
  const todo = todos.find(t => t.id === parseInt(id));
  
  if (!todo) {
    console.error(`Error: Task #${id} not found`);
    return;
  }
  
  if (todo.completed) {
    console.log(`Task #${id} is already completed`);
    return;
  }
  
  todo.completed = true;
  todo.completedAt = new Date().toISOString();
  saveTodos(todos);
  console.log(`✓ Completed task #${id}: "${todo.task}"`);
}

// Delete a todo
function deleteTodo(id) {
  const todos = loadTodos();
  const index = todos.findIndex(t => t.id === parseInt(id));
  
  if (index === -1) {
    console.error(`Error: Task #${id} not found`);
    return;
  }
  
  const deleted = todos.splice(index, 1)[0];
  saveTodos(todos);
  console.log(`✓ Deleted task #${id}: "${deleted.task}"`);
}

// Main CLI handler
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    return;
  }
  
  const command = args[0].toLowerCase();
  
  switch (command) {
    case 'add':
      if (args.length < 2) {
        console.error('Error: Please provide a task description');
        console.log('Usage: todo add <task>');
        return;
      }
      addTodo(args.slice(1).join(' '));
      break;
      
    case 'list':
    case 'ls':
      listTodos();
      break;
      
    case 'complete':
    case 'done':
      if (args.length < 2) {
        console.error('Error: Please provide a task ID');
        console.log('Usage: todo complete <id>');
        return;
      }
      completeTodo(args[1]);
      break;
      
    case 'delete':
    case 'rm':
      if (args.length < 2) {
        console.error('Error: Please provide a task ID');
        console.log('Usage: todo delete <id>');
        return;
      }
      deleteTodo(args[1]);
      break;
      
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
      
    default:
      console.error(`Error: Unknown command "${command}"`);
      showHelp();
  }
}

// Run the CLI
main();
