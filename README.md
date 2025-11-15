# test-repo

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

This repository contains a stunning landing page featuring a WebGL raymarching shader inspired by compact shader art. The page now includes **LaunchDarkly feature flag integration** for dynamic configuration management.

### Features

- **Procedural Graphics**: Real-time 3D raymarching shader with rotating patterns
- **Responsive Design**: Works on all screen sizes
- **Pure HTML/CSS/JS**: No frameworks or dependencies required
- **WebGL Animation**: Smooth, performance-optimized shader effects
- **LaunchDarkly Integration**: Dynamic feature flag management for real-time configuration

### LaunchDarkly Feature Flags

The landing page demonstrates LaunchDarkly MCP integration with two feature flags:

#### 1. `animation-speed` (Number flag)
- **Type**: Number
- **Default**: 1.0
- **Description**: Controls the animation speed multiplier for the WebGL shader
- **Values**: 
  - `0.5` - Slow motion (50% speed)
  - `1.0` - Normal speed (default)
  - `2.0` - Fast motion (2x speed)

#### 2. `vibrant-colors` (Boolean flag)
- **Type**: Boolean
- **Default**: true
- **Description**: Controls the color vibrancy of the shader
- **Values**:
  - `true` - Full vibrant colors (default)
  - `false` - Subdued colors for a calmer effect

### Setting Up LaunchDarkly

To use this page with actual LaunchDarkly feature flags:

1. **Create a LaunchDarkly Account**
   - Sign up at [launchdarkly.com](https://launchdarkly.com)
   - Create a new project

2. **Create Feature Flags**
   - Create a flag named `animation-speed` (Number type, default: 1.0)
   - Create a flag named `vibrant-colors` (Boolean type, default: true)

3. **Get Your Client-Side ID**
   - Navigate to Account Settings > Projects
   - Copy your client-side ID for your environment

4. **Update the HTML**
   - Open `index.html`
   - Replace `'demo-client-id'` with your actual LaunchDarkly client-side ID
   ```javascript
   const LAUNCHDARKLY_CLIENT_ID = 'your-client-side-id-here';
   ```

5. **Test Flag Changes**
   - Open the page in your browser
   - Open browser console to see LaunchDarkly logs
   - Change flag values in LaunchDarkly dashboard
   - Watch the animation respond in real-time!

### LaunchDarkly MCP Tools

This integration demonstrates the use of LaunchDarkly MCP (Model Context Protocol) tools for:

- **Feature Flag Management**: Create, read, update, and archive flags
- **Environment Configuration**: Manage flags across multiple environments
- **Real-time Updates**: Flags update in the client without page refresh
- **Code References**: Track where flags are used in your codebase
- **Flag Status Monitoring**: Check flag health and usage statistics

For more information on LaunchDarkly MCP tools, see the [LaunchDarkly MCP Server documentation](https://github.com/launchdarkly/mcp-server-launchdarkly).

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