# Secret Management for GitHub Copilot Custom Agents

## Current Status: FACTORY_API_KEY Access

**Answer to "Do you have a value set for FACTORY_API_KEY?"**

**No**, GitHub Copilot custom agents running in the chat interface do **not** have direct access to repository secrets by default. This is by design for security reasons.

## Understanding Secret Access Contexts

### Where FACTORY_API_KEY IS Available ✅

1. **GitHub Actions Workflows**
   - Secrets configured in **Settings > Secrets and variables > Actions** are accessible
   - Example from `droid-summary-on-merge.yml`:
   ```yaml
   env:
     FACTORY_API_KEY: ${{ secrets.FACTORY_API_KEY }}
   ```

2. **GitHub Codespaces (with configuration)**
   - Secrets can be added at: **Settings > Codespaces > Secrets**
   - Available as environment variables in your Codespace

3. **Local Development**
   - Set as environment variable: `export FACTORY_API_KEY="your-key-here"`
   - Or use `.env` files (remember to add to `.gitignore`!)

### Where FACTORY_API_KEY is NOT Available ❌

1. **GitHub Copilot Chat (Custom Agents)**
   - Custom agents in Copilot chat don't have access to Actions secrets
   - This includes repository-level custom agents like the Droid CLI agent
   - Security isolation prevents secret exposure in chat contexts

## How to Configure Secret Access

### Option 1: For GitHub Actions (Recommended)

This is already configured in your repository! To verify or update:

1. Go to: `https://github.com/factory-davidgu/test-repo/settings/secrets/actions`
2. Ensure `FACTORY_API_KEY` is listed
3. If not, click **New repository secret**:
   - **Name**: `FACTORY_API_KEY`
   - **Value**: Your API key from [app.factory.ai](https://app.factory.ai)

The workflow at `.github/workflows/droid-summary-on-merge.yml` will automatically use this secret.

### Option 2: For GitHub Codespaces

1. Go to your GitHub settings: `https://github.com/settings/codespaces`
2. Click **New secret**
3. Configure:
   - **Name**: `FACTORY_API_KEY`
   - **Value**: Your API key
   - **Repository access**: Select `factory-davidgu/test-repo`

Now when you open a Codespace, the secret will be available as an environment variable.

### Option 3: For Local Development

Create a `.env` file in your project root (already in `.gitignore`):

```bash
FACTORY_API_KEY=your-actual-api-key-here
```

Then source it before running Droid CLI:

```bash
source .env
droid exec "your command here"
```

Or export it directly:

```bash
export FACTORY_API_KEY="your-actual-api-key-here"
droid --version  # Verify installation
droid exec "analyze this codebase"
```

### Option 4: For Custom Agents in Copilot Chat

**Current Limitation**: GitHub Copilot custom agents cannot directly access repository secrets.

**Workarounds**:

1. **Run commands in a Codespace** (with secrets configured)
   - Open repository in a Codespace
   - Use Copilot chat within the Codespace
   - Shell commands will have access to Codespace secrets

2. **Use GitHub Actions instead**
   - Create workflow files that use `droid exec` with secrets
   - Trigger workflows manually or on events
   - View results in Actions logs

3. **Provide key in chat context** (NOT RECOMMENDED for security)
   - Only use for testing with temporary/limited keys
   - Never commit API keys to repository

## Security Best Practices

### ✅ DO:
- Store secrets in GitHub Secrets (Actions or Codespaces)
- Use environment-specific secrets (dev vs. prod)
- Rotate API keys regularly
- Use `.gitignore` to exclude `.env` files
- Limit secret access to necessary workflows only
- Use `environment:` in workflows for additional protection

### ❌ DON'T:
- Commit API keys to the repository
- Share secrets in issues or pull requests
- Include secrets in code comments
- Log secrets in workflow outputs
- Share secrets in Copilot chat messages

## Verifying Your Configuration

### Test GitHub Actions Access

Trigger the workflow by pushing to main, or add this test workflow:

```yaml
name: Test FACTORY_API_KEY Access
on:
  workflow_dispatch:

jobs:
  test-key:
    runs-on: ubuntu-latest
    steps:
      - name: Check if secret is set
        env:
          FACTORY_API_KEY: ${{ secrets.FACTORY_API_KEY }}
        run: |
          if [ -n "$FACTORY_API_KEY" ]; then
            echo "✅ FACTORY_API_KEY is configured (length: ${#FACTORY_API_KEY} characters)"
          else
            echo "❌ FACTORY_API_KEY is NOT set"
            exit 1
          fi
```

### Test Local Access

```bash
# Verify environment variable
echo ${FACTORY_API_KEY:+FACTORY_API_KEY is set} ${FACTORY_API_KEY:-FACTORY_API_KEY is NOT set}

# Test Droid CLI
droid exec "echo test" 2>&1 | grep -i "authentication\|api key" || echo "Key appears valid"
```

## Troubleshooting

### "Authentication failed" in GitHub Actions
- Verify secret is named exactly `FACTORY_API_KEY` (case-sensitive)
- Check that secret has a valid value (not expired/revoked)
- Ensure workflow has permission to access secrets
- Verify `environment:` if specified matches configured environment

### "API key not found" in Codespaces
- Confirm secret is added at `https://github.com/settings/codespaces`
- Check repository access is granted for the secret
- Restart Codespace after adding secret
- Verify: `echo $FACTORY_API_KEY | cut -c1-10` (shows first 10 chars)

### Custom Agent Cannot Access Key
- Expected behavior - custom agents don't have secret access
- Use Codespace or GitHub Actions as workaround
- For testing, set key locally before invoking Copilot

## Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Codespaces Secrets](https://docs.github.com/en/codespaces/managing-your-codespaces/managing-encrypted-secrets-for-your-codespaces)
- [Droid CLI Documentation](https://docs.factory.ai)
- [GitHub Copilot Custom Agents](https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)

## Summary

**Direct Answer**: No, the custom agent does not have FACTORY_API_KEY set because GitHub Copilot custom agents don't have access to repository secrets. To use Droid CLI with secrets:

1. **In CI/CD**: Use GitHub Actions (already configured)
2. **In Development**: Use Codespaces with secrets or local environment variables
3. **For Testing**: Set locally with `export FACTORY_API_KEY="..."`

The separation is intentional for security - secrets are isolated to execution contexts (Actions, Codespaces) rather than chat interfaces.
