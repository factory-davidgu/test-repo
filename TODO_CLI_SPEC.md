# Todo CLI App - Specification

## Overview
A lightweight command-line application for managing todo items. The app provides basic CRUD operations for todos with persistent storage using JSON.

## Features

### Core Functionality
1. **Add Todo** - Create a new todo item
2. **List Todos** - Display all todos with their status
3. **Complete Todo** - Mark a todo as completed
4. **Delete Todo** - Remove a todo from the list
5. **Clear Completed** - Remove all completed todos

### Data Model
Each todo item contains:
- `id` (number): Unique identifier, auto-incremented
- `text` (string): Description of the todo task
- `completed` (boolean): Completion status, defaults to false
- `created` (timestamp): ISO 8601 formatted creation date

### Storage
- Data persisted to a JSON file: `~/.todos.json`
- File created automatically if it doesn't exist
- Human-readable JSON format for easy debugging

## Command Line Interface

### Commands

#### `todo add <text>`
Add a new todo item.
```bash
todo add "Buy groceries"
# Output: ✓ Added: Buy groceries (ID: 1)
```

#### `todo list` or `todo ls`
Display all todos with their status.
```bash
todo list
# Output:
# Todos:
# [ ] 1. Buy groceries
# [✓] 2. Finish project
# [ ] 3. Call dentist
```

#### `todo done <id>`
Mark a todo as completed.
```bash
todo done 1
# Output: ✓ Completed: Buy groceries
```

#### `todo delete <id>` or `todo rm <id>`
Delete a specific todo.
```bash
todo delete 2
# Output: ✓ Deleted: Finish project
```

#### `todo clear`
Remove all completed todos.
```bash
todo clear
# Output: ✓ Cleared 3 completed todo(s)
```

#### `todo help`
Display help information.
```bash
todo help
# Output: [displays usage information]
```

## Technical Requirements

### Language
- Node.js (JavaScript/TypeScript) - for cross-platform compatibility
- No external dependencies (use Node.js built-in modules only)

### File Structure
```
todo-cli/
├── package.json          # Package configuration with bin entry
├── todo.js              # Main CLI application
└── README.md            # Usage instructions
```

### Implementation Details

1. **CLI Argument Parsing**
   - Use `process.argv` to parse command-line arguments
   - First argument after script name is the command
   - Remaining arguments are command parameters

2. **File System Operations**
   - Use `fs` module for reading/writing JSON file
   - Handle file not found gracefully (create new)
   - Use `os.homedir()` to locate home directory

3. **Error Handling**
   - Validate command arguments
   - Provide helpful error messages
   - Handle file system errors gracefully

4. **Output Formatting**
   - Use emojis/symbols for visual feedback (✓, [ ], [✓])
   - Color coding optional but not required
   - Clear, concise messages

## Usage Examples

```bash
# Add some todos
todo add "Learn Node.js"
todo add "Build a CLI app"
todo add "Write tests"

# List all todos
todo list
# [ ] 1. Learn Node.js
# [ ] 2. Build a CLI app
# [ ] 3. Write tests

# Complete a todo
todo done 2
# ✓ Completed: Build a CLI app

# List updated todos
todo list
# [ ] 1. Learn Node.js
# [✓] 2. Build a CLI app
# [ ] 3. Write tests

# Delete a todo
todo delete 3
# ✓ Deleted: Write tests

# Clear completed
todo clear
# ✓ Cleared 1 completed todo(s)
```

## Installation

After implementation, the CLI can be installed globally:
```bash
npm install -g .
```

Or run directly:
```bash
node todo.js add "My task"
```

## Future Enhancements (Not Required)
- Due dates for todos
- Priority levels
- Categories/tags
- Search and filter
- Undo functionality
- Export/import

## Success Criteria
- All commands work as specified
- Data persists across sessions
- Error handling is robust
- User-friendly output
- Zero external dependencies
