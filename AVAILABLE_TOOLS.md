# Available Tools

This document lists all the tools and capabilities available when working with this repository.

## GitHub Integration Tools

### Repository Management
- **File Operations**: Read, create, edit, and view files and directories
- **Git Operations**: Check status, view commits, manage branches, and view diffs
- **Branch Management**: List, create, and switch between branches
- **Commit Operations**: View commit history and details

### Code Review & Analysis
- **Code Review Tool**: Automated code review for pull request changes
- **CodeQL Security Checker**: Discover security vulnerabilities in code using CodeQL
- **Pull Request Analysis**: Get details about PRs, reviews, comments, and file changes
- **Issue Tracking**: Read and analyze issues, comments, and labels

### GitHub Actions & Workflows
- **Workflow Management**: List workflows, view workflow runs, and check run status
- **Job Management**: List jobs for workflow runs, view job logs
- **Artifact Management**: List and download workflow artifacts
- **Run Analysis**: Get workflow run usage metrics and details

### Security Tools
- **Code Scanning Alerts**: List and get details of code scanning alerts
- **Secret Scanning Alerts**: List and get details of secret scanning alerts
- **GitHub Advisory Database**: Check dependencies for known vulnerabilities

### Search & Discovery
- **Code Search**: Fast code search across GitHub repositories
- **Issue Search**: Search for issues using GitHub's search syntax
- **Pull Request Search**: Search for pull requests
- **Repository Search**: Find repositories by name, description, topics, etc.
- **User Search**: Find GitHub users by username or profile information

### Release Management
- **Release Information**: Get latest releases, releases by tag, list all releases
- **Tag Management**: List and get details about git tags

## Development Tools

### Code Execution
- **Bash Shell**: Run commands in an interactive bash session with support for:
  - Synchronous execution for quick commands
  - Asynchronous execution for long-running processes
  - Detached mode for persistent background processes
  - Interactive command support with keyboard input
  - Python, Node.js, and Go code execution
  - Package installation (apt, pip, npm, go)

### File System Operations
- **View**: View file contents with line numbers or browse directory structures
- **Create**: Create new files with specified content
- **Edit**: Make string replacements in files with precise control

### Browser Automation (Playwright)
- **Navigation**: Navigate to URLs, go back, manage browser tabs
- **Page Interaction**: Click elements, type text, fill forms, select options
- **Advanced Actions**: Hover, drag and drop, keyboard input, file uploads
- **Page Analysis**: Take screenshots, capture accessibility snapshots, evaluate JavaScript
- **Network Monitoring**: View console messages, network requests
- **Dialog Handling**: Handle browser dialogs and alerts
- **Browser Management**: Resize window, close browser

## Droid CLI Integration

This repository uses the [Droid CLI](https://docs.factory.ai) for automated code review and analysis:

### Available via GitHub Actions
- **PR Review**: Automatically reviews pull requests for code quality, security, and best practices
- **Merge Summary**: Summarizes changes when merged to main branch

### Droid Capabilities
- **Code Analysis**: Understand codebase structure and patterns
- **Feature Implementation**: Generate code following existing conventions
- **Bug Fixing**: Locate and fix bugs with targeted solutions
- **Code Review**: Answer questions about architecture and patterns
- **Refactoring**: Identify improvements and generate refactored code
- **Test Generation**: Create comprehensive test cases

## Project Specific Context

### Repository Structure
```
/home/runner/work/test-repo/test-repo/
├── .github/
│   ├── workflows/
│   │   ├── droid-pr-review.yml
│   │   └── droid-summary-on-merge.yml
│   └── agents/
├── index.html (WebGL landing page with shader)
├── README.md (Project documentation)
└── .gitignore
```

### Key Files
- **index.html**: Landing page with WebGL raymarching shader
- **README.md**: Documentation for Droid CLI automation and landing page
- **GitHub Workflows**: Automated PR reviews and merge summaries

### Technologies in Use
- HTML/CSS/JavaScript
- WebGL for graphics rendering
- GitHub Actions for CI/CD
- Droid CLI for code analysis

## Workflow Capabilities

### Progress Tracking
- **Report Progress**: Commit changes, push to PR, and update progress with checklists

### Quality Assurance
- Run linters, build tools, and tests to validate changes
- Security scanning with CodeQL
- Automated code reviews
- Dependency vulnerability checks

## Environment Details

- **Working Directory**: `/home/runner/work/test-repo/test-repo`
- **Current Branch**: `copilot/update-documentation-files`
- **Environment**: Sandboxed GitHub Actions runner with limited internet access
- **Process PID**: 2051 (critical system process)

## Limitations

### Cannot Do
- Direct git push/commit operations (must use report_progress tool)
- Update GitHub issues or PRs directly via git/gh CLI
- Clone additional repositories
- Force push or rebase operations
- Access files in `.github/agents` directory
- Access blocked internet domains

### Security Restrictions
- No sharing sensitive data with 3rd party systems
- No committing secrets to source code
- No introducing security vulnerabilities
- No accessing other repositories or branches without permission

## Best Practices

1. **Use Custom Agents**: Delegate tasks to specialized agents when available
2. **Make Minimal Changes**: Only modify what's necessary to address the task
3. **Test Frequently**: Run linters, builds, and tests iteratively
4. **Report Progress**: Use report_progress tool regularly to commit and update status
5. **Security First**: Always validate changes don't introduce vulnerabilities
6. **Parallel Operations**: Use multiple tools simultaneously when possible for efficiency
