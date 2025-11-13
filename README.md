# test-repo

## Automated Change Summaries with Droid CLI

This repository includes a GitHub Action that automatically runs when branches are merged to the `main` branch. The action uses the [Droid CLI](https://docs.factory.ai) to analyze and summarize recent changes.

### How It Works

When a pull request is merged to `main`, the workflow:
1. Checks out the repository with full history
2. Installs the Droid CLI
3. Executes `droid exec` to generate a summary of the changes
4. Displays the summary in the GitHub Actions log

### Setup Instructions

To enable this automation, you need to configure the `FACTORY_API_KEY` secret:

1. Go to your repository's **Settings** > **Secrets and variables** > **Actions**
2. Click **New repository secret**
3. Name: `FACTORY_API_KEY`
4. Value: Your Factory AI API key (obtain from [app.factory.ai](https://app.factory.ai))
5. Click **Add secret**

> 📘 **Note**: For detailed information about secret management, including access from GitHub Copilot custom agents, Codespaces, and local development, see [Secret Management Guide](.github/SECRET_MANAGEMENT.md)

### Viewing Summaries

After each merge to `main`, you can view the change summary in:
- **Actions** tab > Select the workflow run > View the "Run Droid exec to summarize recent changes" step

### Workflow Details

The workflow is defined in `.github/workflows/droid-summary-on-merge.yml` and can be customized to:
- Change the analysis prompt
- Adjust autonomy levels with `--auto` flags
- Enable different tools or models
- Add additional automation steps

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