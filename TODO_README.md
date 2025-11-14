# Tiny Todo CLI

A lightweight command-line application for managing your todos. Simple, fast, and requires no external dependencies.

## Features

- ✅ Add, list, complete, and delete todos
- 💾 Persistent storage (JSON file in home directory)
- 🚀 Zero dependencies (uses only Node.js built-ins)
- 📝 Clean, intuitive command-line interface
- ✨ Simple and easy to use

## Installation

### Global Installation

Install the CLI globally to use it from anywhere:

```bash
npm install -g .
```

Then use it anywhere with the `todo` command:

```bash
todo add "My first task"
```

### Local Usage

Or run it directly without installation:

```bash
node todo.js add "My first task"
```

## Usage

### Add a Todo

```bash
todo add "Buy groceries"
todo add "Finish project report"
```

### List All Todos

```bash
todo list
# or
todo ls
```

Output:
```
Todos:
[ ] 1. Buy groceries
[ ] 2. Finish project report
```

### Mark Todo as Complete

```bash
todo done 1
```

Output:
```
✓ Completed: Buy groceries
```

### Delete a Todo

```bash
todo delete 2
# or
todo rm 2
```

Output:
```
✓ Deleted: Finish project report
```

### Clear Completed Todos

Remove all completed todos at once:

```bash
todo clear
```

Output:
```
✓ Cleared 3 completed todo(s)
```

### Show Help

```bash
todo help
# or
todo --help
```

## Data Storage

Todos are stored in a JSON file at `~/.todos.json`. The file is created automatically when you add your first todo.

Example data structure:
```json
{
  "todos": [
    {
      "id": 1,
      "text": "Buy groceries",
      "completed": false,
      "created": "2024-01-15T10:30:00.000Z"
    }
  ],
  "nextId": 2
}
```

## Requirements

- Node.js version 14.0.0 or higher

## Commands Reference

| Command | Alias | Description |
|---------|-------|-------------|
| `todo add <text>` | - | Add a new todo |
| `todo list` | `ls` | List all todos |
| `todo done <id>` | - | Mark todo as completed |
| `todo delete <id>` | `rm` | Delete a todo |
| `todo clear` | - | Remove all completed todos |
| `todo help` | `--help`, `-h` | Show help message |

## Examples

Complete workflow example:

```bash
# Add some todos
todo add "Learn Node.js"
todo add "Build a CLI app"
todo add "Write documentation"

# List todos
todo list
# [ ] 1. Learn Node.js
# [ ] 2. Build a CLI app
# [ ] 3. Write documentation

# Complete the second todo
todo done 2

# List updated todos
todo list
# [ ] 1. Learn Node.js
# [✓] 2. Build a CLI app
# [ ] 3. Write documentation

# Delete a todo
todo delete 1

# Clear completed todos
todo clear
# ✓ Cleared 1 completed todo(s)
```

## License

MIT
