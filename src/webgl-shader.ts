interface WebGLContext {
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  positionLocation: number;
  resolutionLocation: WebGLUniformLocation;
  timeLocation: WebGLUniformLocation;
}

const VERTEX_SHADER_SOURCE = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SOURCE = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;
  
  mat2 rotate2D(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat2(c, -s, s, c);
  }
  
  void main() {
    vec2 FC = gl_FragCoord.xy;
    vec2 r = u_resolution;
    float t = u_time;
    vec4 o = vec4(0.0);
    
    for(float i = 1.0; i < 100.0; i += 1.0) {
      float d = i * 0.08;
      float s;
      
      vec2 uv = (FC.xy * 2.0 - r.xy) / r.y;
      vec3 p = vec3(uv * d * rotate2D(t * 0.5), d - 8.0);
      p.xz *= rotate2D(t * 0.5);
      
      vec3 q = fract(p) * p;
      s = 0.012 + 0.07 * abs(max(sin(length(q)), length(p) - 4.0) - i / 100.0);
      
      vec4 c = 1.3 * sin(vec4(1.0, 2.0, 3.0, 1.0) + i * 0.3) / s;
      c = max(c, -length(p * p) * 0.0002);
      o += c;
    }
    
    o = o * o / 80000.0;
    o = o / (1.0 + o);
    o = pow(o * 4.0, vec4(0.65));
    
    gl_FragColor = vec4(clamp(o.rgb, 0.0, 1.0), 1.0);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    console.error("Failed to create shader");
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) {
    console.error("Failed to create program");
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program linking error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

function initWebGL(canvas: HTMLCanvasElement): WebGLContext | null {
  const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl || !(gl instanceof WebGLRenderingContext)) {
    console.error("WebGL not supported");
    return null;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SOURCE);

  if (!vertexShader || !fragmentShader) {
    return null;
  }

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) {
    return null;
  }

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1,
  ]);
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "position");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const timeLocation = gl.getUniformLocation(program, "u_time");

  if (!resolutionLocation || !timeLocation) {
    console.error("Failed to get uniform locations");
    return null;
  }

  return {
    gl,
    program,
    positionLocation,
    resolutionLocation,
    timeLocation,
  };
}

function resizeCanvas(canvas: HTMLCanvasElement, gl: WebGLRenderingContext): void {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  gl.viewport(0, 0, canvas.width, canvas.height);
}

function createRenderer(
  canvas: HTMLCanvasElement,
  context: WebGLContext
): (time: number) => void {
  const { gl, program, positionLocation, resolutionLocation, timeLocation } = context;

  return function render(time: number): void {
    const timeInSeconds = time * 0.001;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, timeInSeconds);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  };
}

export function initShader(): void {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
  if (!canvas) {
    console.error("Canvas element not found");
    return;
  }

  const context = initWebGL(canvas);
  if (!context) {
    alert("WebGL not supported");
    return;
  }

  resizeCanvas(canvas, context.gl);
  window.addEventListener("resize", () => resizeCanvas(canvas, context.gl));

  const render = createRenderer(canvas, context);
  requestAnimationFrame(render);
}

export function handleGetStarted(): void {
  alert("Let's build something amazing!");
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", initShader);
}
