# Documentation Index: FACTORY_API_KEY & Secret Management

This directory contains comprehensive documentation about configuring and using `FACTORY_API_KEY` with GitHub Copilot custom agents, GitHub Actions, and development environments.

## Quick Answer

**Question**: "Do you have a value set for FACTORY_API_KEY? If not, how could I configure you to have access to repo secrets?"

**Answer**: No, GitHub Copilot custom agents don't have access to repository secrets by design. See [FACTORY_API_KEY_STATUS.md](FACTORY_API_KEY_STATUS.md) for the complete answer and solutions.

## Documentation Files

### 📋 Start Here
- **[FACTORY_API_KEY_STATUS.md](FACTORY_API_KEY_STATUS.md)** - Direct answer to your question with quick-start solutions

### ❓ Frequently Asked Questions
- **[CUSTOM_AGENT_FAQ.md](CUSTOM_AGENT_FAQ.md)** - FAQ specifically for GitHub Copilot custom agent context
  - Why don't custom agents have secret access?
  - What can custom agents actually do?
  - How to test if secrets are configured?
  - Decision tree for choosing the right approach

### 📚 Complete Reference
- **[SECRET_MANAGEMENT.md](SECRET_MANAGEMENT.md)** - Comprehensive guide covering:
  - All contexts where secrets are/aren't available
  - Step-by-step configuration for GitHub Actions, Codespaces, and local dev
  - Security best practices
  - Troubleshooting common issues
  - Verification procedures

### 🔧 Workflows
- **[workflows/test-secret-access.yml](workflows/test-secret-access.yml)** - Manual workflow to test secret configuration
- **[workflows/droid-summary-on-merge.yml](workflows/droid-summary-on-merge.yml)** - Working example using secrets

### 🤖 Custom Agent
- **[agents/droid.md](agents/droid.md)** - Droid CLI custom agent configuration

## Quick Reference

| Context | FACTORY_API_KEY Access | Setup Location | Documentation |
|---------|------------------------|----------------|---------------|
| **GitHub Copilot Chat** | ❌ No | N/A - Not supported | [FAQ](CUSTOM_AGENT_FAQ.md) |
| **GitHub Actions** | ✅ Yes | `Settings > Secrets > Actions` | [SECRET_MANAGEMENT.md](SECRET_MANAGEMENT.md#option-1-for-github-actions-recommended) |
| **GitHub Codespaces** | ✅ Yes | `github.com/settings/codespaces` | [SECRET_MANAGEMENT.md](SECRET_MANAGEMENT.md#option-2-for-github-codespaces) |
| **Local Development** | ✅ Yes | `export FACTORY_API_KEY=...` | [SECRET_MANAGEMENT.md](SECRET_MANAGEMENT.md#option-3-for-local-development) |

## Common Tasks

### I want to test if my secret is configured
```bash
# In GitHub Actions
Go to Actions tab > Run "Test FACTORY_API_KEY Configuration" workflow

# Locally
echo ${FACTORY_API_KEY:+✅ Set} ${FACTORY_API_KEY:-❌ Not set}
```

### I want to run Droid CLI commands
Choose your context:
- **Automated CI/CD**: Use GitHub Actions (already configured)
- **Development**: Use Codespaces or local terminal
- **One-off testing**: Local terminal with exported variable

See [FACTORY_API_KEY_STATUS.md](FACTORY_API_KEY_STATUS.md#quick-start-guide) for step-by-step guides.

### I want to understand why custom agents can't access secrets
Read: [CUSTOM_AGENT_FAQ.md](CUSTOM_AGENT_FAQ.md#q-do-you-the-custom-agent-have-access-to-factory_api_key)

Summary: Security isolation by design. Custom agents run in chat context, secrets are only available in execution contexts (Actions, Codespaces, local terminal).

### I want to configure a new secret
See: [SECRET_MANAGEMENT.md](SECRET_MANAGEMENT.md#how-to-configure-secret-access)

### I'm getting authentication errors
See: [SECRET_MANAGEMENT.md](SECRET_MANAGEMENT.md#troubleshooting)

## Security Notes

🔒 **Never commit API keys to the repository**
- Use GitHub Secrets for CI/CD
- Use `.env` files locally (already in `.gitignore`)
- Don't share keys in issues, PRs, or chat

🔒 **GitHub Copilot custom agents don't have secret access**
- This is intentional for security
- Prevents accidental exposure in chat logs
- Use proper execution contexts instead

🔒 **Best practices**
- Rotate keys regularly
- Use environment-specific keys (dev vs. prod)
- Limit secret access to necessary workflows only
- Use `environment:` in workflows for additional protection

## Architecture Overview

```
Repository Secret Management Architecture
==========================================

┌─────────────────────────────────────────────────────────┐
│ Repository: factory-davidgu/test-repo                   │
│                                                          │
│  Secrets stored at: Settings > Secrets and variables    │
│    ├─ Actions (for GitHub Actions workflows)            │
│    └─ Codespaces (for development environments)         │
│                                                          │
│  ┌────────────────────┐    ┌────────────────────────┐  │
│  │ Copilot Chat       │    │ GitHub Actions         │  │
│  │ ❌ No secret access│    │ ✅ Has secret access   │  │
│  └────────────────────┘    └────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘

External Execution Contexts
============================

┌─────────────────────────┐  ┌─────────────────────────┐
│ GitHub Codespaces       │  │ Local Development       │
│ ✅ Has secret access    │  │ ✅ Via export/env vars  │
└─────────────────────────┘  └─────────────────────────┘
```

## Related Documentation

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Droid CLI Documentation](https://docs.factory.ai)
- [GitHub Copilot Custom Agents](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)
- [Repository README](../README.md)

## Need Help?

1. **Start with**: [FACTORY_API_KEY_STATUS.md](FACTORY_API_KEY_STATUS.md) - Direct answer to common questions
2. **Check**: [CUSTOM_AGENT_FAQ.md](CUSTOM_AGENT_FAQ.md) - FAQ for custom agent context
3. **Deep dive**: [SECRET_MANAGEMENT.md](SECRET_MANAGEMENT.md) - Complete reference
4. **Test**: Run the test workflow in Actions tab
5. **Still stuck?**: Open an issue with details about your setup and error messages

---

**Last Updated**: 2025-11-13  
**Maintained by**: Repository contributors
