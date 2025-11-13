# test-repo

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
