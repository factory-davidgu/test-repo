const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Create a temporary test file
const TEST_FILE = path.join(os.tmpdir(), '.todos.json');

function setup() {
  // Clean up test file if it exists
  if (fs.existsSync(TEST_FILE)) {
    fs.unlinkSync(TEST_FILE);
  }
}

function teardown() {
  // Clean up test file
  if (fs.existsSync(TEST_FILE)) {
    fs.unlinkSync(TEST_FILE);
  }
}

function runCommand(cmd) {
  try {
    return execSync(`HOME="${os.tmpdir()}" node todo.js ${cmd} 2>&1`, { encoding: 'utf8' });
  } catch (error) {
    return (error.stdout || '') + (error.stderr || '') + (error.message || '');
  }
}

function test(name, fn) {
  try {
    setup();
    fn();
    console.log(`✓ ${name}`);
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
    process.exit(1);
  } finally {
    teardown();
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

// Tests
test('should show help message', () => {
  const output = runCommand('help');
  assert(output.includes('Todo CLI'), 'Help should show title');
  assert(output.includes('Usage:'), 'Help should show usage');
});

test('should add a new todo', () => {
  const output = runCommand('add "Test task"');
  assert(output.includes('Added task'), 'Should confirm task added');
  assert(output.includes('Test task'), 'Should show task name');
});

test('should list todos', () => {
  runCommand('add "Task 1"');
  runCommand('add "Task 2"');
  const output = runCommand('list');
  assert(output.includes('Task 1'), 'Should list first task');
  assert(output.includes('Task 2'), 'Should list second task');
  assert(output.includes('Completed: 0/2'), 'Should show correct count');
});

test('should complete a todo', () => {
  runCommand('add "Task to complete"');
  const output = runCommand('complete 1');
  assert(output.includes('Completed task'), 'Should confirm completion');
  
  const listOutput = runCommand('list');
  assert(listOutput.includes('Completed: 1/1'), 'Should show as completed');
});

test('should delete a todo', () => {
  runCommand('add "Task to delete"');
  const output = runCommand('delete 1');
  assert(output.includes('Deleted task'), 'Should confirm deletion');
  
  const listOutput = runCommand('list');
  assert(listOutput.includes('No tasks found'), 'Should show no tasks');
});

test('should handle empty list', () => {
  const output = runCommand('list');
  assert(output.includes('No tasks found'), 'Should show empty message');
});

test('should handle invalid command', () => {
  const output = runCommand('invalid');
  assert(output.toLowerCase().includes('unknown') || output.toLowerCase().includes('error'), 'Should show error for invalid command');
});

console.log('\nRunning tests...\n');
console.log('All tests passed! ✓');
