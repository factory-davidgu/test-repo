# AI Agents Guide

This repository uses AI agents powered by [Factory AI](https://factory.ai) and [LaunchDarkly](https://launchdarkly.com) to automate code review, change analysis, and feature flag management. This guide explains what agents are available, how they work, and how to use them effectively.

## 📋 Table of Contents

- [Overview](#overview)
- [Available Agents](#available-agents)
  - [Droid CLI Agent](#1-droid-cli-agent)
  - [Droid MCP Agent](#2-droid-mcp-agent)
  - [LaunchDarkly Flag Cleanup Agent](#3-launchdarkly-flag-cleanup-agent)
- [Automated Workflows](#automated-workflows)
- [Getting Started](#getting-started)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

This repository demonstrates best practices for integrating AI agents into your development workflow. We use three specialized agents:

1. **Droid CLI Agent** - Command-line automation for CI/CD pipelines
2. **Droid MCP Agent** - Model Context Protocol integration for IDE and tool integration
3. **LaunchDarkly Flag Cleanup Agent** - Automated feature flag lifecycle management

These agents are configured in the `.github/agents/` directory and integrated into GitHub Actions for automated PR reviews and merge summaries.

---

## Available Agents

### 1. Droid CLI Agent

**Location**: [`.github/agents/droid-cli.md`](.github/agents/droid-cli.md)

The Droid CLI agent provides command-line access to Factory AI's Droid capabilities, designed for automation, CI/CD integration, and non-interactive workflows.

#### Key Capabilities

- **Code Analysis**: Review code for security vulnerabilities, quality issues, and best practices
- **Automated Testing**: Run and fix failing tests automatically
- **Documentation Generation**: Create comprehensive API docs from codebases
- **Deployment Automation**: Build, test, and deploy applications with varying autonomy levels

#### Installation

```bash
curl -fsSL https://app.factory.ai/cli | sh
```

After installation, verify it's working:
```bash
droid --version
droid --help
```

#### Usage Examples

**Read-Only Analysis** (Safe, no file modifications):
```bash
# Review this repository for security issues
droid exec "Review this codebase for security vulnerabilities and generate a prioritized list"

# Generate documentation
droid exec "Generate comprehensive API documentation from the codebase"
```

**Safe Operations** (`--auto low` - easily reversible):
```bash
# Fix typos and formatting
droid exec --auto low "fix typos in README.md and format all JavaScript files"

# Add documentation
droid exec --auto low "add JSDoc comments to all functions lacking documentation"
```

**Development Tasks** (`--auto medium` - recoverable side effects):
```bash
# Install dependencies and run tests
droid exec --auto medium "install dependencies, run tests, and fix any failing tests"

# Update packages
droid exec --auto medium "update packages to latest stable versions and resolve conflicts"
```

**Production Operations** (`--auto high` - critical operations):
```bash
# Full deployment workflow
droid exec --auto high "fix critical bug, run full test suite, commit changes, and push to main"
```

#### Advanced Features

**Session Continuation**:
```bash
# Start a session
droid exec "analyze authentication system" --output-format json | jq '.sessionId'

# Continue the session
droid exec -s <session-id> "what specific improvements did you suggest?"
```

**Tool Control**:
```bash
# List available tools
droid exec --list-tools

# Use specific tools only
droid exec --enabled-tools Read,Grep,Edit "analyze only using read operations"
```

**Model Selection**:
```bash
# Use GPT-5 for complex tasks
droid exec --model gpt-5.1 "design comprehensive microservices architecture"

# Use Claude for code analysis
droid exec --model claude-sonnet-4-5-20250929 "review and refactor this React component"
```

#### Environment Variables

Set your Factory API key:
```bash
export FACTORY_API_KEY="your-api-key-here"
```

Get your API key from [app.factory.ai](https://app.factory.ai).

#### For This Repository

The Droid CLI is integrated into our GitHub Actions workflows for:
- Automated PR reviews (see [PR Review Workflow](#pr-review-automation))
- Merge summaries (see [Merge Summary Workflow](#merge-summary-automation))

---

### 2. Droid MCP Agent

**Location**: [`.github/agents/droid-mcp.md`](.github/agents/droid-mcp.md)

The Droid MCP (Model Context Protocol) agent exposes Droid's capabilities through a standardized MCP interface, enabling integration with MCP-compatible applications like Claude Desktop, IDEs, and other AI tools.

#### Key Capabilities

- **Implementation Planning**: Analyze codebases and propose design approaches
- **Feature Implementation**: Generate implementation-ready code following existing patterns
- **Bug Fixing**: Locate root causes and generate targeted fixes
- **Code Review**: Answer codebase questions without manual file reading
- **Onboarding**: Help new team members understand architecture
- **Refactoring**: Identify improvement opportunities and generate refactored code
- **Test Generation**: Create comprehensive test cases by analyzing code behavior

#### The `droidExec` Tool

The MCP server exposes a single tool called `droidExec`:

```typescript
droidExec({
  prompt: string,           // Required: Your task description
  model?: string,           // Optional: AI model to use (default: claude-sonnet-4-5-20250929)
  cwd?: string              // Optional: Working directory
})
```

#### Usage Examples

**Basic Code Analysis**:
```typescript
droidExec({
  prompt: "How does the authentication flow work? Explain the token lifecycle."
})
```

**Feature Implementation**:
```typescript
droidExec({
  prompt: "Implement a user profile settings page following existing component patterns",
  model: "gpt-5.1-codex"
})
```

**Bug Fixing**:
```typescript
droidExec({
  prompt: "Find and fix the crash in the export-to-PDF feature when special characters are present"
})
```

**Mono-repo Support**:
```typescript
droidExec({
  prompt: "Implement the user authentication endpoints",
  cwd: "/path/to/backend-service"
})
```

#### Available Models

- `gpt-5.1-codex` (recommended for complex tasks)
- `gpt-5.1`
- `gpt-5-codex`
- `claude-sonnet-4-5-20250929` (default)
- `gpt-5-2025-08-07`
- `claude-opus-4-1-20250805`
- `claude-haiku-4-5-20251001` (faster for simple tasks)
- `glm-4.6`

#### Setup

The MCP server is configured to run automatically when invoked through compatible applications. It requires the `FACTORY_API_KEY` environment variable.

#### For This Repository

While this repository doesn't currently use Droid MCP in its workflows, the agent configuration is available for:
- IDE integration with GitHub Copilot
- Custom development tools
- AI-driven workflow automation

---

### 3. LaunchDarkly Flag Cleanup Agent

**Location**: [`.github/agents/launchdarkly.md`](.github/agents/launchdarkly.md)

A specialized agent that uses the LaunchDarkly MCP server to safely automate feature flag cleanup workflows. This agent determines removal readiness, identifies the correct forward value, and creates PRs that preserve production behavior while removing obsolete flags.

#### Key Capabilities

- **Safe Flag Removal**: Automatically determine if flags are safe to remove
- **Production Preservation**: Ensure current production behavior is maintained
- **Code Reference Tracking**: Find all flag references across repositories
- **Automated PR Creation**: Generate detailed PRs with safety assessments

#### Core Principles

1. **Safety First**: Never alter production behavior
2. **LaunchDarkly as Source of Truth**: Use LD's MCP tools, not just code
3. **Clear Communication**: Explain reasoning in PR descriptions
4. **Follow Conventions**: Respect existing team patterns

#### Flag Removal Workflow

When you ask the agent to remove a feature flag, it follows this procedure:

**Step 1: Identify Critical Environments**
- Uses `get-environments` to find production and staging environments
- Focuses safety checks on critical environments only

**Step 2: Fetch Flag Configuration**
- Uses `get-feature-flag` to retrieve full configuration
- Extracts variations, targeting rules, and environment states

**Step 3: Determine Forward Value**
- Identifies which variation should replace the flag in code
- Ensures consistency across all critical environments
- Stops if environments differ in behavior

**Step 4: Assess Removal Readiness**
- Uses `get-flag-status-across-environments` to check lifecycle status
- Evaluates criteria:
  - ✅ **READY**: Flag is `launched` or `active`, same value everywhere, no complex targeting
  - ⚠️ **PROCEED WITH CAUTION**: Flag is `inactive` or has zero evaluations
  - ❌ **NOT READY**: Flag is `new`, has different values, or has complex targeting

**Step 5: Check Code References**
- Uses `get-code-references` to find all repositories using the flag
- Focuses on current repository, notes others for awareness

**Step 6: Remove from Code**
- Searches for all flag evaluation patterns
- Replaces with forward value
- Removes dead code and unused branches

**Step 7: Create PR**
- Generates detailed PR with safety assessment
- Includes removal readiness criteria
- Provides risk assessment for reviewers

#### Usage Example

Ask the agent to remove a flag:
```
Remove the `new-checkout-flow` flag
```

The agent will:
1. Verify the flag is safe to remove
2. Determine the correct forward value
3. Update all code references
4. Create a PR with detailed explanation

#### Setup Requirements

This agent requires:
- LaunchDarkly access token set as `LD_ACCESS_TOKEN` environment variable
- LaunchDarkly MCP server installed via: `npx -y --package @launchdarkly/mcp-server -- mcp start --api-key $LD_ACCESS_TOKEN`

#### For This Repository

While this repository doesn't currently use LaunchDarkly, the agent configuration is available as a reference for teams that want to implement automated feature flag management.

---

## Automated Workflows

This repository includes two GitHub Actions workflows that leverage the Droid CLI agent.

### PR Review Automation

**Workflow**: [`.github/workflows/droid-pr-review.yml`](.github/workflows/droid-pr-review.yml)

**Trigger**: Pull request opened or synchronized

**What it does**:
1. Checks out repository with full history
2. Installs Droid CLI
3. Runs `droid exec` to perform comprehensive code review
4. Analyzes:
   - Code quality
   - Security issues
   - Best practices
   - Potential bugs
5. Displays review in GitHub Actions log

**Example Output**:
```
✅ Droid PR review completed successfully
```

**Viewing Results**:
1. Navigate to your PR
2. Click **Actions** tab or **Checks** section
3. View the "Run Droid exec to review PR" step

### Merge Summary Automation

**Workflow**: [`.github/workflows/droid-summary-on-merge.yml`](.github/workflows/droid-summary-on-merge.yml)

**Trigger**: Push to `main` branch

**What it does**:
1. Checks out repository with full history
2. Installs Droid CLI
3. Runs `droid exec` to analyze recent changes
4. Provides summary of:
   - Files changed
   - Main purpose of changes
   - Potential impacts
5. Displays summary in GitHub Actions log

**Example Output**:
```
✅ Droid summary completed successfully
```

**Viewing Results**:
1. Navigate to **Actions** tab
2. Select the workflow run
3. View the "Run Droid exec to summarize recent changes" step

---

## Getting Started

### Prerequisites

- **Factory API Key**: Get yours from [app.factory.ai](https://app.factory.ai)
- **GitHub Repository**: With Actions enabled
- **(Optional) LaunchDarkly Access Token**: For flag cleanup automation

### Setup Instructions

#### 1. Configure Factory API Key

For GitHub Actions:
1. Go to **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Name: `FACTORY_API_KEY`
4. Value: Your Factory AI API key
5. Click **Add secret**

For local development:
```bash
export FACTORY_API_KEY="your-api-key-here"
```

#### 2. Install Droid CLI (for local use)

```bash
curl -fsSL https://app.factory.ai/cli | sh
```

Verify installation:
```bash
droid --version
```

#### 3. Enable GitHub Actions

The workflows are already configured in `.github/workflows/`. They will automatically run when:
- PR Review: A pull request is opened or updated
- Merge Summary: Changes are merged to `main`

#### 4. (Optional) Configure LaunchDarkly

If using the flag cleanup agent:
```bash
export LD_ACCESS_TOKEN="your-launchdarkly-token"
```

---

## Best Practices

### For Droid CLI

✅ **Do**:
- Start with `--auto low` and increase autonomy as needed
- Use read-only analysis by default for safety
- Review `droid exec` outputs before applying changes
- Use session IDs to maintain conversation context
- Choose appropriate models for task complexity

⚠️ **Avoid**:
- Running `--auto high` commands without understanding impacts
- Skipping safety checks in production environments
- Using generic prompts without context
- Exposing API keys in logs or version control

### For Droid MCP

✅ **Do**:
- Provide clear, specific prompts with context
- Use appropriate models for task complexity
- Specify `cwd` for mono-repos
- Review generated code before committing

⚠️ **Avoid**:
- Vague prompts without context
- Passing unsanitized user input
- Assuming the agent will catch all edge cases

### For LaunchDarkly Flag Cleanup

✅ **Do**:
- Always verify removal readiness before proceeding
- Review PR descriptions for safety assessments
- Check that forward values match expectations
- Test changes in staging before production

⚠️ **Avoid**:
- Removing flags with inconsistent environment states
- Skipping safety checks
- Removing flags still being rolled out
- Guessing forward values

### For This Repository

Since this is a test repository with a WebGL shader landing page:

- Use Droid CLI for code quality checks on HTML/CSS/JavaScript
- Test shader code reviews for WebGL-specific issues
- Experiment with different autonomy levels safely
- Learn automation patterns before applying to production repositories

**Example Workflow**:
```bash
# Review the WebGL shader code
droid exec "Review the WebGL shader in index.html for performance and compatibility issues"

# Check for accessibility issues
droid exec "Analyze index.html for accessibility improvements"

# Optimize the landing page
droid exec --auto low "Optimize the CSS and add responsive design improvements"
```

---

## Troubleshooting

### Common Issues

#### Droid CLI

**Problem**: `command not found: droid`
- **Solution**: Ensure `/usr/local/bin` is in your PATH. Run: `export PATH="/usr/local/bin:$PATH"`

**Problem**: `API authentication failed`
- **Solution**: Set `FACTORY_API_KEY` environment variable: `export FACTORY_API_KEY="your-key"`

**Problem**: `Permission denied during installation`
- **Solution**: The install script may need sudo for system-wide installation

**Problem**: Workflow fails with "No Factory API key found"
- **Solution**: Verify `FACTORY_API_KEY` is set in repository secrets (Settings > Secrets and variables > Actions)

#### Droid MCP

**Problem**: MCP server won't start
- **Solution**: Ensure Node.js is installed and `FACTORY_API_KEY` is set

**Problem**: Tool not found in IDE
- **Solution**: Check MCP server configuration and restart IDE

#### LaunchDarkly Agent

**Problem**: Cannot access LaunchDarkly data
- **Solution**: Verify `LD_ACCESS_TOKEN` is set and has correct permissions

**Problem**: Flag not found
- **Solution**: Check for typos in flag key and verify it exists in LaunchDarkly

### Debug Mode

Enable verbose logging for Droid CLI:
```bash
DEBUG=1 droid exec "your command"
```

### Getting Help

- **Droid CLI Documentation**: [docs.factory.ai](https://docs.factory.ai)
- **GitHub Copilot Agents**: [GitHub Copilot Custom Agents Configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration)
- **LaunchDarkly MCP**: [@launchdarkly/mcp-server](https://www.npmjs.com/package/@launchdarkly/mcp-server)
- **Factory Support**: [app.factory.ai](https://app.factory.ai)

---

## Additional Resources

### Agent Configuration Files

- [Droid CLI Agent](.github/agents/droid-cli.md) - Complete CLI reference and examples
- [Droid MCP Agent](.github/agents/droid-mcp.md) - MCP integration guide
- [LaunchDarkly Agent](.github/agents/launchdarkly.md) - Feature flag cleanup workflows

### Workflow Files

- [PR Review Workflow](.github/workflows/droid-pr-review.yml) - Automated code review on PRs
- [Merge Summary Workflow](.github/workflows/droid-summary-on-merge.yml) - Change analysis on merge

### Repository Purpose

This repository serves as a demonstration of:
1. **WebGL Shader Landing Page** ([index.html](index.html)) - A stunning landing page with real-time WebGL raymarching effects
2. **AI Agent Integration** - Best practices for integrating Factory AI agents into development workflows
3. **GitHub Actions Automation** - Automated PR reviews and merge summaries using Droid CLI
4. **Agent Configuration Patterns** - Reusable agent configurations for different use cases

### Quick Reference

| Task | Command |
|------|---------|
| Install Droid CLI | `curl -fsSL https://app.factory.ai/cli \| sh` |
| Verify Installation | `droid --version` |
| Analyze Code | `droid exec "review code for issues"` |
| Fix Issues | `droid exec --auto low "fix typos in docs"` |
| Run Tests | `droid exec --auto medium "install deps and test"` |
| Continue Session | `droid exec -s <id> "continue task"` |
| List Tools | `droid exec --list-tools` |

---

## Contributing

When contributing to this repository:

1. Create a pull request - the Droid PR Review workflow will automatically analyze your changes
2. Review the automated feedback in the GitHub Actions log
3. Address any issues identified by the review
4. Once merged to `main`, the Merge Summary workflow will document your changes

This workflow demonstrates how AI agents can enhance code review and documentation processes.

---

## License

This repository is provided as-is for demonstration and learning purposes.

For Factory AI Droid licensing, see [factory.ai](https://factory.ai).
