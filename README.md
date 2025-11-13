# Factory.ai and Droid CLI

## Overview

Factory.ai provides an advanced AI-powered development platform that enables developers to automate complex workflows, integrate AI capabilities into their development process, and build more efficiently.

## Droid CLI

The Droid CLI is a powerful command-line tool that brings AI-assisted development directly to your terminal. It's designed for automation, integration, and CI/CD scenarios.

### Installation

Install Droid CLI with a single command:

```bash
curl -fsSL https://app.factory.ai/cli | sh
```

This script will:
- Download the latest Droid CLI binary for your platform
- Install it to `/usr/local/bin` (or add to your PATH)
- Set up the necessary permissions

### Verification

After installation, verify it's working:

```bash
droid --version
droid --help
```

## Key Features

### droid exec - Non-Interactive Command Execution

`droid exec` is perfect for automation and scripting:

```bash
droid exec [options] "your prompt here"
```

### Autonomy Levels

Droid CLI provides different autonomy levels to control the scope of operations:

- **Read-Only (Default)**: Safe analysis without modifications
- **--auto low**: Low-risk file operations (formatting, typo fixes)
- **--auto medium**: Development tasks with recoverable side effects
- **--auto high**: Production operations requiring maximum trust

### Common Use Cases

#### Code Review and Analysis
```bash
droid exec "Review this codebase for security vulnerabilities"
```

#### Automated Fixes
```bash
droid exec --auto low "fix typos in README.md and format Python files"
```

#### Development Workflows
```bash
droid exec --auto medium "install dependencies, run tests, and fix failing tests"
```

#### Production Deployments
```bash
droid exec --auto high "build application, run tests, and deploy to staging"
```

## Advanced Features

### Session Continuation
Continue previous conversations:

```bash
droid exec -s <session-id> "continue task"
```

### Model Selection
Choose specific AI models:

```bash
droid exec --model gpt-5.1 "design microservices architecture"
droid exec --model claude-sonnet-4-5-20250929 "review React component"
```

### Tool Management
Control available tools:

```bash
droid exec --list-tools
droid exec --enabled-tools Read,Grep,Edit "analyze code"
droid exec --disabled-tools Execute "analyze without running commands"
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: AI Code Review
  run: |
    droid exec "Review PR for security and quality" \
      --output-format json > review.json
```

### Automated Testing
```bash
droid exec --auto medium "run test suite and fix failing tests"
```

## Security Best Practices

1. **API Key Management**: Set `FACTORY_API_KEY` environment variable
2. **Autonomy Levels**: Start with `--auto low` and increase as needed
3. **Sandboxing**: Use Docker containers for high-risk operations
4. **Review Outputs**: Always review results before applying
5. **Session Isolation**: Use session IDs to maintain context

## Quick Reference

| Task | Command |
|------|---------|
| Install | `curl -fsSL https://app.factory.ai/cli \| sh` |
| Verify | `droid --version` |
| Analyze code | `droid exec "review code for issues"` |
| Fix typos | `droid exec --auto low "fix typos in docs"` |
| Run tests | `droid exec --auto medium "install deps and test"` |
| Deploy | `droid exec --auto high "build and deploy"` |
| Continue session | `droid exec -s <id> "continue task"` |
| List tools | `droid exec --list-tools` |

## GitHub Copilot Integration

Droid CLI integrates seamlessly with GitHub Copilot as a custom agent, providing:
- Repository-level scope and context
- Standard tool aliases for file operations
- Shell execution capabilities
- Version control through Git commit SHAs

## Documentation

For more information, visit:
- Documentation: https://docs.factory.ai
- CLI Reference: https://app.factory.ai/cli

## Support

For issues and questions:
- Check the documentation at docs.factory.ai
- Review the `--help` output for detailed usage information
- Enable debug mode with `DEBUG=1` for troubleshooting