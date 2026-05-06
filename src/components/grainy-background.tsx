"use client";

import { useEffect, useRef } from "react";

type GrainStyle = "film" | "ordered" | "halftone";

export type GrainSettings = {
  color1L: number;
  color1C: number;
  color1H: number;
  color2L: number;
  color2C: number;
  color2H: number;
  color3L: number;
  color3C: number;
  color3H: number;
  speed: number;
  blobSize: number;
  softness: number;
  complexity: number;
  grainStyle: GrainStyle;
  grainIntensity: number;
  halftoneSize: number;
};

const defaultSettings: GrainSettings = {
  color1L: 0.88,
  color1C: 0.274,
  color1H: 218,
  color2L: 0.68,
  color2C: 0.209,
  color2H: 262,
  color3L: 0.65,
  color3C: 0.09384057971014494,
  color3H: 323.4782608695652,
  speed: 0.23,
  blobSize: 0.5,
  softness: 0.75,
  complexity: 3,
  grainStyle: "ordered",
  grainIntensity: 0.04,
  halftoneSize: 3,
};

const vertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 v_uv;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform float u_speed;
  uniform float u_blobSize;
  uniform float u_softness;
  uniform float u_complexity;
  uniform int u_grainStyle;
  uniform float u_grainIntensity;
  uniform float u_halftoneSize;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p, float time, float complexity) {
    float value = 0.0;
    float amplitude = 0.6;
    float frequency = 1.0;
    for (int i = 0; i < 5; i++) {
      if (float(i) >= complexity) break;
      value += amplitude * snoise(p * frequency + time * 0.05);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float filmGrain(vec2 uv, float time) {
    return hash(uv * u_resolution + fract(time * 100.0)) - 0.5;
  }

  float bayerMatrix(vec2 uv) {
    vec2 pixel = floor(mod(uv * u_resolution, 4.0));
    int x = int(pixel.x);
    int y = int(pixel.y);
    float pattern[16];
    pattern[0] = 0.0; pattern[1] = 8.0; pattern[2] = 2.0; pattern[3] = 10.0;
    pattern[4] = 12.0; pattern[5] = 4.0; pattern[6] = 14.0; pattern[7] = 6.0;
    pattern[8] = 3.0; pattern[9] = 11.0; pattern[10] = 1.0; pattern[11] = 9.0;
    pattern[12] = 15.0; pattern[13] = 7.0; pattern[14] = 13.0; pattern[15] = 5.0;
    int index = y * 4 + x;
    float value = 0.0;
    for (int i = 0; i < 16; i++) {
      if (i == index) value = pattern[i];
    }
    return (value / 16.0) - 0.5;
  }

  float luminance(vec3 color) {
    return dot(color, vec3(0.2126, 0.7152, 0.0722));
  }

  float halftone(vec2 uv, float luminanceValue) {
    float dotSize = u_halftoneSize;
    vec2 pixel = uv * u_resolution;
    vec2 cell = floor(pixel / dotSize);
    vec2 cellCenter = (cell + 0.5) * dotSize;
    float dist = length(pixel - cellCenter);
    float maxRadius = dotSize * 0.5;
    float radius = maxRadius * (1.0 - luminanceValue);
    return (dist < radius) ? -0.3 : 0.1;
  }

  void main() {
    vec2 uv = v_uv;
    float time = u_time * u_speed;
    vec2 aspectUv = uv;
    aspectUv.x *= u_resolution.x / u_resolution.y;
    vec2 noiseCoord = aspectUv * u_blobSize;
    float n1 = fbm(noiseCoord + vec2(0.0, 0.0) + time * vec2(0.15, 0.1), time, u_complexity);
    float n2 = fbm(noiseCoord + vec2(3.7, 1.2) + time * vec2(-0.1, 0.12), time, u_complexity);
    float n3 = fbm(noiseCoord + vec2(1.4, 4.3) + time * vec2(0.08, -0.11), time, u_complexity);
    float edge = u_softness;
    float w1 = smoothstep(-edge, edge, n1);
    float w2 = smoothstep(-edge, edge, n2);
    float w3 = smoothstep(-edge, edge, n3);
    w1 = max(w1, 0.1);
    w2 = max(w2, 0.1);
    w3 = max(w3, 0.1);
    float total = w1 + w2 + w3;
    vec3 color = u_color1 * (w1 / total) + u_color2 * (w2 / total) + u_color3 * (w3 / total);
    float grain = 0.0;
    if (u_grainStyle == 0) {
      grain = filmGrain(uv, u_time);
    } else if (u_grainStyle == 1) {
      grain = bayerMatrix(uv);
    } else if (u_grainStyle == 2) {
      grain = halftone(uv, luminance(color));
    }
    color += grain * u_grainIntensity;
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

export function GrainyBackground({
  fixed = true,
  className = "",
}: {
  fixed?: boolean;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ReturnType<typeof createRenderer> | null>(null);
  const settingsRef = useRef(defaultSettings);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createRenderer(canvas);
    if (!renderer) return;

    rendererRef.current = renderer;
    let animationFrame = 0;
    const startedAt = performance.now();

    const resize = () => renderer.resize();
    const render = () => {
      renderer.render(settingsRef.current, (performance.now() - startedAt) / 1000);
      animationFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      renderer.destroy();
      rendererRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${fixed ? "fixed" : "absolute"} inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}

function oklchToLinearRgb(l: number, c: number, h: number) {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);
  const lValue = l + 0.3963377774 * a + 0.2158037573 * b;
  const mValue = l - 0.1055613458 * a - 0.0638541728 * b;
  const sValue = l - 0.0894841775 * a - 1.291485548 * b;
  const l3 = lValue * lValue * lValue;
  const m3 = mValue * mValue * mValue;
  const s3 = sValue * sValue * sValue;

  return [
    clamp(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3),
    clamp(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3),
    clamp(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3),
  ] as const;
}

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function createRenderer(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("webgl", {
    antialias: false,
    preserveDrawingBuffer: false,
  });

  if (!context) return null;

  const gl: WebGLRenderingContext = context;

  const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    return null;
  }

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const uniforms = {
    time: gl.getUniformLocation(program, "u_time"),
    resolution: gl.getUniformLocation(program, "u_resolution"),
    color1: gl.getUniformLocation(program, "u_color1"),
    color2: gl.getUniformLocation(program, "u_color2"),
    color3: gl.getUniformLocation(program, "u_color3"),
    speed: gl.getUniformLocation(program, "u_speed"),
    blobSize: gl.getUniformLocation(program, "u_blobSize"),
    softness: gl.getUniformLocation(program, "u_softness"),
    complexity: gl.getUniformLocation(program, "u_complexity"),
    grainStyle: gl.getUniformLocation(program, "u_grainStyle"),
    grainIntensity: gl.getUniformLocation(program, "u_grainIntensity"),
    halftoneSize: gl.getUniformLocation(program, "u_halftoneSize"),
  };
  const grainStyleMap: Record<GrainStyle, number> = {
    film: 0,
    ordered: 1,
    halftone: 2,
  };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function render(state: GrainSettings, time: number) {
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.uniform1f(uniforms.time, time);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform3fv(uniforms.color1, oklchToLinearRgb(state.color1L, state.color1C, state.color1H));
    gl.uniform3fv(uniforms.color2, oklchToLinearRgb(state.color2L, state.color2C, state.color2H));
    gl.uniform3fv(uniforms.color3, oklchToLinearRgb(state.color3L, state.color3C, state.color3H));
    gl.uniform1f(uniforms.speed, state.speed);
    gl.uniform1f(uniforms.blobSize, state.blobSize);
    gl.uniform1f(uniforms.softness, state.softness);
    gl.uniform1f(uniforms.complexity, state.complexity);
    gl.uniform1i(uniforms.grainStyle, grainStyleMap[state.grainStyle]);
    gl.uniform1f(uniforms.grainIntensity, state.grainIntensity);
    gl.uniform1f(uniforms.halftoneSize, state.halftoneSize);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function destroy() {
    gl.deleteBuffer(positionBuffer);
    gl.deleteProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
  }

  return { resize, render, destroy };
}

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
