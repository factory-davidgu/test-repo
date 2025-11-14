/**
 * Advanced droid-mcp Examples
 * 
 * This file demonstrates various use cases for calling droidExec
 * through the droid-mcp MCP server with different types of prompts.
 */

// Example 1: Philosophical question - "What is the meaning of life?"
const meaningOfLifeExample = {
  name: 'droidExec',
  arguments: {
    prompt: 'What is the meaning of life?',
    // Uses default model: claude-sonnet-4-5-20250929
  }
};

// Example 2: Code analysis
const codeAnalysisExample = {
  name: 'droidExec',
  arguments: {
    prompt: 'Analyze the authentication system in this codebase and propose a plan for adding multi-factor authentication (MFA). Consider existing patterns, libraries, and database schema.',
    model: 'claude-sonnet-4-5-20250929'
  }
};

// Example 3: Bug fixing
const bugFixExample = {
  name: 'droidExec',
  arguments: {
    prompt: 'Users report that the export-to-PDF feature occasionally crashes when the file contains special characters. Find the bug, explain what\'s causing it, and provide a fix.',
    model: 'gpt-5.1-codex'
  }
};

// Example 4: Feature implementation with specific directory
const featureImplementationExample = {
  name: 'droidExec',
  arguments: {
    prompt: 'Implement a user profile settings page. The page should allow users to update their email, password, and notification preferences. Follow the existing component patterns and styling conventions used in the dashboard.',
    cwd: '/path/to/frontend-service',
    model: 'claude-sonnet-4-5-20250929'
  }
};

// Example 5: Test generation
const testGenerationExample = {
  name: 'droidExec',
  arguments: {
    prompt: 'Generate unit tests for the payment processing module. Cover normal transactions, failed payments, timeout scenarios, and edge cases with large amounts.',
    model: 'gpt-5.1-codex'
  }
};

// Example 6: Architecture questions
const architectureExample = {
  name: 'droidExec',
  arguments: {
    prompt: 'How do we handle API authentication across the backend services? What tokens do we use and where are they validated?',
  }
};

// Example 7: Refactoring suggestions
const refactoringExample = {
  name: 'droidExec',
  arguments: {
    prompt: 'Review the data validation logic across all API endpoints. Are we following a consistent pattern? Suggest refactorings to consolidate validation and improve maintainability.',
    model: 'claude-opus-4-1-20250805'
  }
};

/**
 * Display all examples
 */
function displayExamples() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║         Advanced droid-mcp Examples Collection            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  const examples = [
    { title: '1. Philosophical Question - Meaning of Life', data: meaningOfLifeExample },
    { title: '2. Code Analysis - MFA Implementation', data: codeAnalysisExample },
    { title: '3. Bug Fixing - PDF Export Issue', data: bugFixExample },
    { title: '4. Feature Implementation - User Profile', data: featureImplementationExample },
    { title: '5. Test Generation - Payment Module', data: testGenerationExample },
    { title: '6. Architecture Questions - Authentication', data: architectureExample },
    { title: '7. Refactoring Suggestions - Validation Logic', data: refactoringExample },
  ];

  examples.forEach((example, index) => {
    console.log(`\n${example.title}:`);
    console.log('─'.repeat(80));
    console.log(JSON.stringify(example.data, null, 2));
    if (index < examples.length - 1) {
      console.log('');
    }
  });

  console.log('\n' + '═'.repeat(80));
  console.log('💡 Available Models:');
  console.log('─'.repeat(80));
  console.log('• claude-sonnet-4-5-20250929 (default)');
  console.log('• gpt-5.1-codex');
  console.log('• gpt-5.1');
  console.log('• gpt-5-codex');
  console.log('• gpt-5-2025-08-07');
  console.log('• claude-opus-4-1-20250805');
  console.log('• claude-haiku-4-5-20251001');
  console.log('• glm-4.6');
  console.log('═'.repeat(80) + '\n');

  console.log('✅ All examples displayed successfully!\n');
}

// Run if executed directly
if (require.main === module) {
  displayExamples();
}

module.exports = {
  meaningOfLifeExample,
  codeAnalysisExample,
  bugFixExample,
  featureImplementationExample,
  testGenerationExample,
  architectureExample,
  refactoringExample,
  displayExamples
};
