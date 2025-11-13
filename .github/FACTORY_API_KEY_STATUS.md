# FACTORY_API_KEY Status & Configuration

## Direct Answer to Your Question

### Do you have a value set for FACTORY_API_KEY?

**No, I do not have access to FACTORY_API_KEY.** 

As a GitHub Copilot custom agent running in the chat interface, I am isolated from repository secrets for security purposes. This is intentional and by design.

### How could you configure me to have access to repo secrets?

**Short answer**: You cannot directly configure custom agents to access repository secrets.

**Longer answer**: GitHub Copilot custom agents are designed to be isolated from sensitive data like secrets. However, there are several ways to enable Droid CLI functionality that requires `FACTORY_API_KEY`:

## Recommended Solutions

### ✅ Solution 1: Use GitHub Actions (Current Setup)
**Status**: Already configured in your repository!

- **Location**: `.github/workflows/droid-summary-on-merge.yml`
- **How it works**: Workflow accesses `${{ secrets.FACTORY_API_KEY }}` during execution
- **Setup**: Configure secret at `Settings > Secrets and variables > Actions`
- **Use case**: Automated analysis on merge, scheduled tasks, manual workflows

### ✅ Solution 2: Use GitHub Codespaces
**Status**: Requires one-time configuration

- **Setup**: Add secret at `https://github.com/settings/codespaces`
- **How it works**: Secret automatically available as `$FACTORY_API_KEY` in Codespace
- **Use case**: Development, testing, interactive work with Droid CLI

### ✅ Solution 3: Local Development
**Status**: Set in your local environment

```bash
# Export in your terminal
export FACTORY_API_KEY="your-key-here"

# Or create .env file (already in .gitignore)
echo 'FACTORY_API_KEY=your-key-here' > .env
source .env
```

- **Use case**: Local testing, one-off commands, development

## Why This Architecture?

```
┌─────────────────────────────────────────────────────────────┐
│  GitHub Repository                                           │
│                                                              │
│  ┌────────────────────┐        ┌─────────────────────────┐ │
│  │ Copilot Chat       │        │ GitHub Actions          │ │
│  │ (Custom Agent)     │        │                         │ │
│  │                    │        │  ✅ Has access to       │ │
│  │  ❌ No access to   │        │     secrets             │ │
│  │     secrets        │        │                         │ │
│  │                    │        │  env:                   │ │
│  │  Security          │        │    FACTORY_API_KEY: ${{ │ │
│  │  Isolation         │        │      secrets....        │ │
│  └────────────────────┘        └─────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘

External Environment (Your choice):
┌─────────────────────────┐
│ GitHub Codespaces       │
│ ✅ Has access to secrets│
│    via configuration    │
└─────────────────────────┘

┌─────────────────────────┐
│ Local Terminal          │
│ ✅ Has access via export│
│    FACTORY_API_KEY=...  │
└─────────────────────────┘
```

**Reasoning**:
- **Security**: Prevents accidental secret exposure in chat logs
- **Isolation**: Chat context is separate from execution context
- **Best practice**: Secrets should only be in execution environments

## What CAN the Custom Agent Do?

Even without `FACTORY_API_KEY`, I can:

✅ **Guide you** on Droid CLI usage and best practices
✅ **Show examples** of command syntax and patterns
✅ **Explain** how to configure secrets properly
✅ **Help debug** workflow files and configurations
✅ **Generate** workflow definitions that use secrets
✅ **Review** code and suggest improvements
✅ **Answer questions** about Droid CLI capabilities

❌ **Cannot execute** `droid exec` commands requiring authentication
❌ **Cannot access** any repository secrets
❌ **Cannot retrieve** API keys or sensitive data

## Quick Start Guide

Want to start using Droid CLI with authentication right now?

### Option A: Test in GitHub Actions (2 minutes)
1. Ensure `FACTORY_API_KEY` is set: `Settings > Secrets and variables > Actions`
2. Go to **Actions** tab
3. Run "Test FACTORY_API_KEY Configuration" workflow
4. View results

### Option B: Use in Codespace (5 minutes)
1. Go to `https://github.com/settings/codespaces`
2. Add `FACTORY_API_KEY` secret with repository access
3. Open repository in Codespace
4. Run: `droid exec "analyze this codebase"`

### Option C: Test Locally (1 minute)
1. Get API key from `https://app.factory.ai`
2. Run: `export FACTORY_API_KEY="your-key"`
3. Run: `droid exec "your command"`

## Documentation Index

- **Quick FAQ**: [CUSTOM_AGENT_FAQ.md](.github/CUSTOM_AGENT_FAQ.md)
- **Complete Guide**: [SECRET_MANAGEMENT.md](.github/SECRET_MANAGEMENT.md)
- **Setup Instructions**: [README.md](../README.md#setup-instructions)
- **Test Workflow**: [test-secret-access.yml](.github/workflows/test-secret-access.yml)

## Still Have Questions?

Common follow-ups:

**Q**: "Can I temporarily share my key with you for testing?"
**A**: Not recommended for security. Use Codespace or local terminal instead.

**Q**: "Will this ever change?"
**A**: GitHub may add features for secret access in custom agents, but current architecture is secure and intentional.

**Q**: "How do I know if my secret is configured correctly?"
**A**: Run the test workflow or check locally: `echo ${FACTORY_API_KEY:+Set} ${FACTORY_API_KEY:-Not set}`

---

**Summary**: No, custom agents don't have FACTORY_API_KEY access, and you cannot configure them to have it. Instead, use GitHub Actions (already set up), Codespaces, or local environment variables to run Droid CLI commands that need authentication.
