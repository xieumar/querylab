"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const vertexShaderSource = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_theme; // 0.0 for light, 1.0 for dark
  uniform float u_time;
  uniform float u_pixelRatio;

  void main() {
    vec2 st = gl_FragCoord.xy;
    
    // Grid properties
    float gridSize = 64.0 * u_pixelRatio; // Exact 64px (4rem) grid size
    
    // Draw grid lines
    vec2 grid = fract(st / gridSize);
    
    // Line thickness in pixels
    float lineThickness = 1.0 / gridSize;
    
    // Determine if pixel is on a line
    float isLine = step(1.0 - lineThickness, grid.x) + step(1.0 - lineThickness, grid.y);
    isLine = clamp(isLine, 0.0, 1.0);
    
    // Mouse interaction
    // Distance from the cell center to the mouse
    vec2 cellCenter = floor(st / gridSize) * gridSize + (gridSize * 0.5);
    float dist = distance(cellCenter, vec2(u_mouse.x, u_resolution.y - u_mouse.y)); // Invert Y for WebGL
    
    // Hover glow calculation
    float glowRadius = 160.0 * u_pixelRatio; // ~2.5 grid cells radius
    float glow = smoothstep(glowRadius, 0.0, dist);
    
    // Colors
    vec3 lightBg = vec3(1.0, 1.0, 1.0); // white
    vec3 darkBg = vec3(0.035, 0.035, 0.043); // zinc-950 approx (#09090b)
    
    vec3 lightLine = vec3(0.898, 0.906, 0.922); // zinc-200 (#e5e7eb)
    vec3 darkLine = vec3(0.153, 0.153, 0.165); // zinc-800 (#27272a)
    
    // Cluster hover colors
    vec3 lightHover = vec3(0.231, 0.510, 0.965); // Primary blue (#3b82f6)
    vec3 darkHover = vec3(0.2, 0.4, 0.9); // Vivid bright blue
    
    vec3 bgColor = mix(lightBg, darkBg, u_theme);
    vec3 lineColor = mix(lightLine, darkLine, u_theme);
    
    // Adjust dark hover to simulate opacity mixing
    vec3 hoverColor = mix(lightHover, darkHover, u_theme);
    
    // Calculate final background color for this cell
    vec3 cellColor = mix(bgColor, hoverColor, glow * 0.9);
    
    // Blend line on top of cell color
    vec3 finalColor = mix(cellColor, lineColor, isLine);
    
    // Optional: add a mask fading out near the edges to match the CSS mask-image
    vec2 centerDist = st / u_resolution.xy - 0.5;
    centerDist.x *= u_resolution.x / u_resolution.y;
    float vignette = smoothstep(1.5, 0.4, length(centerDist));
    
    // Instead of fading to black/white, we just output the color. The mask was fading to transparent.
    // We can simulate fading to the background color at the edges.
    finalColor = mix(bgColor, finalColor, vignette);
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function ShaderGridBackground({
  forceTheme,
}: { forceTheme?: "light" | "dark" } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // Create program
    const vertexShader = compileShader(
      gl,
      gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = compileShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const resolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const mouseLoc = gl.getUniformLocation(program, "u_mouse");
    const themeLoc = gl.getUniformLocation(program, "u_theme");
    const timeLoc = gl.getUniformLocation(program, "u_time");
    const pixelRatioLoc = gl.getUniformLocation(program, "u_pixelRatio");

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;
    let animationFrameId: number;
    const startTime = Date.now();

    const resize = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth * window.devicePixelRatio;
        canvas.height = displayHeight * window.devicePixelRatio;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = (e.clientX - rect.left) * window.devicePixelRatio;
      targetMouseY = (e.clientY - rect.top) * window.devicePixelRatio;
    };

    const handleMouseLeave = () => {
      targetMouseX = -1000;
      targetMouseY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      // Smoothly interpolate mouse position
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseX, mouseY);
      gl.uniform1f(
        themeLoc,
        (forceTheme || resolvedTheme) === "dark" ? 1.0 : 0.0
      );
      gl.uniform1f(timeLoc, (Date.now() - startTime) / 1000.0);
      gl.uniform1f(pixelRatioLoc, window.devicePixelRatio);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme, forceTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ touchAction: "none" }}
    />
  );
}
