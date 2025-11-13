# FAQ: Using Droid CLI with GitHub Copilot Custom Agents

## Q: Do you (the custom agent) have access to FACTORY_API_KEY?

**A: No.** GitHub Copilot custom agents running in the chat interface do not have direct access to repository secrets like `FACTORY_API_KEY`. This is a security feature to prevent secret exposure.

## Q: Then how can I use Droid CLI commands that need authentication?

**A: Choose the right context for your use case:**

### 🤖 For Automated CI/CD (Recommended)
✅ **Use GitHub Actions workflows**

Your repository already has this configured in `.github/workflows/droid-summary-on-merge.yml`:

```yaml
env:
  FACTORY_API_KEY: ${{ secrets.FACTORY_API_KEY }}
run: |
  droid exec "your command here"
```

**Setup**: Configure secret at `Settings > Secrets and variables > Actions`

### 💻 For Development & Testing
✅ **Use GitHub Codespaces**

1. Add secret at: `https://github.com/settings/codespaces`
2. Open repository in Codespace
3. Secret is automatically available as `$FACTORY_API_KEY`
4. Run Droid CLI commands directly in the terminal

### 🏠 For Local Development
✅ **Set environment variable**

```bash
# One-time for session
export FACTORY_API_KEY="your-key-here"

# Or create .env file (already in .gitignore)
echo 'FACTORY_API_KEY=your-key-here' > .env
source .env
```

## Q: Can you run `droid exec` commands for me in this chat?

**A: Yes, but with limitations:**

✅ **I can demonstrate** Droid CLI usage patterns and syntax
✅ **I can show** how to structure commands
✅ **I can verify** Droid CLI is installed
❌ **I cannot authenticate** without FACTORY_API_KEY being set in my environment

**Example - What I can do:**
```bash
# Show version (no auth needed)
droid --version

# Show help (no auth needed)  
droid exec --help

# Demonstrate command structure
echo "Example command: droid exec --auto low 'fix typos in README.md'"
```

**What requires authentication:**
- Actually executing `droid exec` commands that contact Factory AI
- Running analysis, code generation, or automation tasks
- Anything beyond `--help` and `--version`

## Q: What's the best way to test if my FACTORY_API_KEY is configured correctly?

**A: Use the test workflow:**

1. Go to **Actions** tab in your repository
2. Select "Test FACTORY_API_KEY Configuration" workflow
3. Click **Run workflow**
4. View the results to confirm configuration

Or test locally:
```bash
# Check if set
echo ${FACTORY_API_KEY:+✅ Set} ${FACTORY_API_KEY:-❌ Not set}

# Test with Droid CLI
droid exec "echo test" 2>&1 | grep -i "error\|authentication" || echo "✅ Working"
```

## Q: How do I configure the custom agent to have access to secrets?

**A: You can't directly**, but here are workarounds:

### Workaround 1: Use Codespaces (Best for Development)
1. Configure Codespace secrets (see above)
2. Open repository in Codespace  
3. Use Copilot chat inside Codespace
4. Shell commands I run will have access to `$FACTORY_API_KEY`

### Workaround 2: Use GitHub Actions (Best for Automation)
1. Create workflows with secrets configured
2. Trigger them manually or automatically
3. View results in Actions logs

### Workaround 3: Local Environment (Best for Ad-hoc Testing)
1. Set `FACTORY_API_KEY` in your local shell
2. Run Droid CLI commands directly (not through me)
3. Or share the key temporarily in chat (⚠️ not recommended)

## Q: Is it safe to share my FACTORY_API_KEY with you?

**A: Not recommended.** While I won't intentionally misuse it:
- Chat conversations may be logged
- Keys could be exposed in logs or UI
- Better to use proper secret management

**If you must** (for quick testing):
- Use a temporary/limited API key
- Revoke it immediately after testing
- Never commit keys to the repository

## Q: Can you access secrets from GitHub Actions in your responses?

**A: No.** Secrets in GitHub Actions are:
- Only available during workflow execution
- Not accessible from Copilot chat context
- Isolated for security reasons

The custom agent and GitHub Actions are completely separate execution contexts.

## Q: Where can I learn more?

📚 **Documentation**:
- [SECRET_MANAGEMENT.md](.github/SECRET_MANAGEMENT.md) - Complete guide
- [README.md](../README.md) - Quick start instructions
- [Droid CLI Docs](https://docs.factory.ai) - Official documentation

🧪 **Test Tools**:
- `.github/workflows/test-secret-access.yml` - Verify configuration
- `.github/workflows/droid-summary-on-merge.yml` - Working example

## Summary Decision Tree

```
Need to use Droid CLI with FACTORY_API_KEY?
│
├─ For CI/CD automation?
│  └─ ✅ Use GitHub Actions (already configured)
│
├─ For development/testing?
│  ├─ Have Codespace access?
│  │  └─ ✅ Use Codespaces with secrets
│  └─ Working locally?
│     └─ ✅ Export FACTORY_API_KEY in terminal
│
└─ Want custom agent to execute?
   └─ ⚠️ Not supported directly
      ├─ Use Codespace + chat (secrets available in shell)
      ├─ Use GitHub Actions instead
      └─ Set locally + run commands yourself
```

---

**TL;DR**: Custom agents don't have secret access by design. Use GitHub Actions for automation, Codespaces for development, or local environment variables for testing.
