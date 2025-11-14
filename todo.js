#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Configuration
const TODO_FILE = path.join(os.homedir(), '.todos.json');

// Helper functions
function loadTodos() {
  try {
    if (fs.existsSync(TODO_FILE)) {
      const data = fs.readFileSync(TODO_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading todos:', error.message);
  }
  return { todos: [], nextId: 1 };
}

function saveTodos(data) {
  try {
    fs.writeFileSync(TODO_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving todos:', error.message);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Todo CLI - A tiny app to manage your todos

Usage:
  todo add <text>        Add a new todo
  todo list              List all todos
  todo ls                List all todos (alias)
  todo done <id>         Mark a todo as completed
  todo delete <id>       Delete a todo
  todo rm <id>           Delete a todo (alias)
  todo clear             Remove all completed todos
  todo help              Show this help message

Examples:
  todo add "Buy groceries"
  todo list
  todo done 1
  todo delete 2
  todo clear
`);
}

function addTodo(text) {
  if (!text || text.trim() === '') {
    console.error('Error: Todo text cannot be empty');
    process.exit(1);
  }

  const data = loadTodos();
  const newTodo = {
    id: data.nextId,
    text: text.trim(),
    completed: false,
    created: new Date().toISOString()
  };

  data.todos.push(newTodo);
  data.nextId++;
  saveTodos(data);

  console.log(`✓ Added: ${newTodo.text} (ID: ${newTodo.id})`);
}

function listTodos() {
  const data = loadTodos();
  
  if (data.todos.length === 0) {
    console.log('No todos yet. Add one with: todo add "Your task"');
    return;
  }

  console.log('Todos:');
  data.todos.forEach(todo => {
    const status = todo.completed ? '[✓]' : '[ ]';
    console.log(`${status} ${todo.id}. ${todo.text}`);
  });
}

function completeTodo(id) {
  const todoId = parseInt(id);
  if (isNaN(todoId)) {
    console.error('Error: Invalid todo ID');
    process.exit(1);
  }

  const data = loadTodos();
  const todo = data.todos.find(t => t.id === todoId);

  if (!todo) {
    console.error(`Error: Todo with ID ${todoId} not found`);
    process.exit(1);
  }

  if (todo.completed) {
    console.log(`Todo already completed: ${todo.text}`);
    return;
  }

  todo.completed = true;
  saveTodos(data);
  console.log(`✓ Completed: ${todo.text}`);
}

function deleteTodo(id) {
  const todoId = parseInt(id);
  if (isNaN(todoId)) {
    console.error('Error: Invalid todo ID');
    process.exit(1);
  }

  const data = loadTodos();
  const todoIndex = data.todos.findIndex(t => t.id === todoId);

  if (todoIndex === -1) {
    console.error(`Error: Todo with ID ${todoId} not found`);
    process.exit(1);
  }

  const deletedTodo = data.todos.splice(todoIndex, 1)[0];
  saveTodos(data);
  console.log(`✓ Deleted: ${deletedTodo.text}`);
}

function clearCompleted() {
  const data = loadTodos();
  const completedCount = data.todos.filter(t => t.completed).length;

  if (completedCount === 0) {
    console.log('No completed todos to clear');
    return;
  }

  data.todos = data.todos.filter(t => !t.completed);
  saveTodos(data);
  console.log(`✓ Cleared ${completedCount} completed todo(s)`);
}

// Main command handling
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    return;
  }

  const command = args[0].toLowerCase();

  switch (command) {
    case 'add':
      const text = args.slice(1).join(' ');
      addTodo(text);
      break;

    case 'list':
    case 'ls':
      listTodos();
      break;

    case 'done':
      if (args.length < 2) {
        console.error('Error: Please provide a todo ID');
        process.exit(1);
      }
      completeTodo(args[1]);
      break;

    case 'delete':
    case 'rm':
      if (args.length < 2) {
        console.error('Error: Please provide a todo ID');
        process.exit(1);
      }
      deleteTodo(args[1]);
      break;

    case 'clear':
      clearCompleted();
      break;

    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;

    default:
      console.error(`Error: Unknown command '${command}'`);
      console.log('Run "todo help" to see available commands');
      process.exit(1);
  }
}

// Run the CLI
main();
