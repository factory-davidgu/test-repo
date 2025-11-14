# test-repo

## Droid MCP Integration Example

This repository includes examples of how to use **droid-mcp** to call the `droidExec` tool programmatically through the Model Context Protocol (MCP).

### What is droid-mcp?

droid-mcp is an MCP server that exposes Droid agent capabilities through the standardized MCP interface. It allows MCP-compatible applications (like Claude Desktop, IDEs, or custom AI agents) to programmatically request Droid to analyze code, implement features, fix bugs, and answer questions about codebases.

### Example Files

1. **`simple-droid-mcp-example.js`** - A conceptual demonstration showing the structure of calling droidExec
2. **`droid-mcp-example.js`** - A full implementation example using the MCP SDK (requires MCP client setup)

### Quick Start

Run the simple conceptual example:

```bash
npm install
npm run simple-example
```

This demonstrates calling droidExec with the prompt: **"What is the meaning of life?"**

### Example Tool Call Structure

```javascript
{
  name: 'droidExec',
  arguments: {
    prompt: 'What is the meaning of life?',
    model: 'claude-sonnet-4-5-20250929',  // Optional
    cwd: '/path/to/project'                 // Optional
  }
}
```

### Using droid-mcp in Practice

1. **Set up an MCP client** (e.g., Claude Desktop, custom application)
2. **Configure droid-mcp server** in your MCP client settings
3. **Set environment variable**: `FACTORY_API_KEY` with your Factory AI API key
4. **Call droidExec tool** with your prompt
5. **Process the response** from Droid

For more details, see the [droid-mcp documentation](https://docs.factory.ai).

---

## Automated Code Review and Change Summaries with Droid CLI

This repository includes two GitHub Actions that use the [Droid CLI](https://docs.factory.ai) to automate code review and change analysis:

1. **PR Review** - Automatically reviews every new pull request
2. **Merge Summary** - Summarizes changes when merged to `main`

### PR Review Automation

When a pull request is opened or updated, the workflow automatically:
1. Checks out the repository with full history
2. Installs the Droid CLI
3. Executes `droid exec` to perform a comprehensive code review
4. Analyzes code quality, security issues, and best practices
5. Displays the review in the GitHub Actions log

### Change Summary on Merge

This repository also includes a GitHub Action that automatically runs when branches are merged to the `main` branch. The action uses the [Droid CLI](https://docs.factory.ai) to analyze and summarize recent changes.

### How It Works

**PR Review Workflow** (`.github/workflows/droid-pr-review.yml`):
- Triggers on: Pull request opened or synchronized
- Reviews: Code quality, security, best practices
- Output: Detailed review in GitHub Actions log

**Merge Summary Workflow** (`.github/workflows/droid-summary-on-merge.yml`):
- Triggers on: Push to `main` branch
- Analyzes: Recent changes and their impact
- Output: Summary in GitHub Actions log

### Setup Instructions

To enable this automation, you need to configure the `FACTORY_API_KEY` secret:

1. Go to your repository's **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Name: `FACTORY_API_KEY`
4. Value: Your Factory AI API key (obtain from [app.factory.ai](https://app.factory.ai))
5. Click **Add secret**

### Viewing Results

**PR Reviews:**
- Navigate to **Pull Requests** > Select a PR
- Click **Actions** tab or **Checks** section
- View the "Run Droid exec to review PR" step in the workflow

**Merge Summaries:**
- Navigate to **Actions** tab > Select the workflow run
- View the "Run Droid exec to summarize recent changes" step

### Workflow Details

Both workflows can be customized to:
- Change the analysis prompt
- Adjust autonomy levels with `--auto` flags
- Enable different tools or models
- Add additional automation steps

The PR review workflow (`.github/workflows/droid-pr-review.yml`) focuses on:
- Code quality assessment
- Security vulnerability detection
- Best practices validation
- Specific improvement suggestions

The merge summary workflow (`.github/workflows/droid-summary-on-merge.yml`) focuses on:
- Understanding what changed
- Impact assessment
- Change documentation

For more information about `droid exec` capabilities, see the [Droid CLI documentation](https://docs.factory.ai).


## Landing Page with WebGL Shader

This repository contains a stunning landing page featuring a WebGL raymarching shader inspired by compact shader art.

### Features

- **Procedural Graphics**: Real-time 3D raymarching shader with rotating patterns
- **Responsive Design**: Works on all screen sizes
- **Pure HTML/CSS/JS**: No frameworks or dependencies required
- **WebGL Animation**: Smooth, performance-optimized shader effects

### Getting Started

Simply open `index.html` in a modern web browser that supports WebGL.

Or run a local server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js
npx http-server
```

Then navigate to `http://localhost:8080`

### Technical Details

The shader implements:
- 2D rotation matrices for animated effects
- Raymarching through a 3D distance field
- Fractal patterns using `fract()` and distance calculations
- Phase-shifted color channels (RGB) for vibrant effects
- Color grading with contrast and brightness adjustments

### Browser Compatibility

Requires a browser with WebGL support:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

### Credits

Shader inspiration from compact raymarching art techniques.