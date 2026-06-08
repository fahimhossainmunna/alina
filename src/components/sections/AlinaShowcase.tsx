"use client";

import { useEffect, useRef } from "react";

export const AlinaShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // ─────────────────────────────────────────────
    // VERTEX SHADER
    // ─────────────────────────────────────────────
    const vertexSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        vUv.y = 1.0 - vUv.y;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // ─────────────────────────────────────────────
    // FRAGMENT SHADER
    // ─────────────────────────────────────────────
    const fragmentSource = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec2  uMouse;
      uniform float uRadius;
      uniform float uStrength;
      uniform float uAspect;
      uniform float uImageAspect;
      uniform float uTime;

      void main() {
        vec2 uv = vUv;
        
        // Cover image aspect ratio control
        if (uAspect > uImageAspect) {
          float scale = uAspect / uImageAspect;
          uv.y = (uv.y - 0.5) * (1.0 / scale) + 0.5;
        } else {
          float scale = uImageAspect / uAspect;
          uv.x = (uv.x - 0.5) * (1.0 / scale) + 0.5;
        }

        // Map mouse vector to aspect ratio corrected scales
        vec2 scaledMouse = uMouse;
        if (uAspect > uImageAspect) {
          float scale = uAspect / uImageAspect;
          scaledMouse.y = (scaledMouse.y - 0.5) * (1.0 / scale) + 0.5;
        } else {
          float scale = uImageAspect / uAspect;
          scaledMouse.x = (scaledMouse.x - 0.5) * (1.0 / scale) + 0.5;
        }

        vec2 diff = uv - scaledMouse;
        diff.x *= uAspect;
        float dist = length(diff);
        float r = uRadius;

        if (dist < r) {
          float t = dist / r;
          float falloff = 1.0 - smoothstep(0.0, 1.0, t);

          /* Radial inward pull = magnify/lens bulge */
          vec2 dir = normalize(diff);
          float push = falloff * falloff * uStrength * 0.048;
          uv -= dir / uAspect * push;

          /* Subtle slow swirl ring only inside blob */
          float spin = uTime * 0.4;
          float ring = sin(dist * 55.0 - spin) * 0.0018 * falloff * uStrength;
          uv += normalize(vec2(-diff.y, diff.x)) * ring / uAspect;
        }

        gl_FragColor = texture2D(uTexture, clamp(uv, 0.001, 0.999));
      }
    `;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER,   vertexSource));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uMouse       = gl.getUniformLocation(prog, "uMouse");
    const uRadius      = gl.getUniformLocation(prog, "uRadius");
    const uStrength    = gl.getUniformLocation(prog, "uStrength");
    const uAspect      = gl.getUniformLocation(prog, "uAspect");
    const uImageAspect = gl.getUniformLocation(prog, "uImageAspect");
    const uTime        = gl.getUniformLocation(prog, "uTime");

    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,
      new Uint8Array([252,246,242,255]));

    let imgAspect = 1.0;
    const img = document.createElement("img");
    img.src = "/images/faceCream.jpg";
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgAspect = img.naturalWidth / img.naturalHeight;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,img);
    };

    const resize = () => {
      const w = containerRef.current?.clientWidth  ?? window.innerWidth;
      const h = containerRef.current?.clientHeight ?? window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let cur      = { x: -1, y: -1 };
    let target   = { x: -1, y: -1 };
    let strength = 0;
    let isOver   = false;

    const toUV = (cx: number, cy: number) => {
      const r = canvas.getBoundingClientRect();
      return { x: (cx - r.left)/r.width, y: (cy - r.top)/r.height };
    };

    const el = containerRef.current;
    const onEnter = () => { isOver = true; };
    const onLeave = () => { isOver = false; };
    const onMove  = (cx: number, cy: number) => { target = toUV(cx, cy); };
    const handleMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      onMove(e.touches[0].clientX, e.touches[0].clientY);
    };

    el?.addEventListener("mouseenter",  onEnter);
    el?.addEventListener("mouseleave",  onLeave);
    el?.addEventListener("mousemove",   handleMouseMove);
    el?.addEventListener("touchstart",  onEnter);
    el?.addEventListener("touchend",    onLeave);
    el?.addEventListener("touchmove",   handleTouchMove, { passive: false });

    const start = Date.now();
    let raf: number;

    const render = () => {
      cur.x += (target.x - cur.x) * 0.10;
      cur.y += (target.y - cur.y) * 0.10;
      strength += ((isOver ? 1 : 0) - strength) * 0.06;

      const w = canvas.width;
      const h = canvas.height;
      const aspect   = w / h;
      const radiusUV = (Math.min(w, h) * 0.19) / h;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uMouse,       cur.x, cur.y);
      gl.uniform1f(uRadius,      radiusUV);
      gl.uniform1f(uStrength,    strength);
      gl.uniform1f(uAspect,      aspect);
      gl.uniform1f(uImageAspect, imgAspect);
      gl.uniform1f(uTime,        (Date.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Lock Framer Layout aspect configurations natively
      if (containerRef.current) {
        containerRef.current.style.setProperty('--framer-aspect-ratio-supported', 'auto');
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      el?.removeEventListener("mouseenter",  onEnter);
      el?.removeEventListener("mouseleave",  onLeave);
      el?.removeEventListener("mousemove",   handleMouseMove);
      el?.removeEventListener("touchstart",  onEnter);
      el?.removeEventListener("touchend",    onLeave);
      el?.removeEventListener("touchmove",   handleTouchMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full block bg-[#FCF6F2] overflow-hidden select-none flex flex-col justify-between p-6 sm:p-10 lg:p-14 box-border text-rendering-optimizeLegibility antialiased"
      style={{ 
        aspectRatio: "1920 / 869", 
        cursor: "none"
      }}
    >
      {/* ── WebGL Canvas Backing Layer ── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
      </div>

      {/* ── Baseline Aligned Curated Tags Grid ── */}
      <div className="relative z-10 w-full grid grid-cols-3 items-end text-white font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] mt-36 md:mt-64 pointer-events-none">
        
        {/* Left Slot Tag */}
        <div className="text-left pb-2">
          <span>E-COMMERCE</span>
        </div>

        {/* Center Slot Tag */}
        <div className="text-center pb-2">
          <span>COSMETICS</span>
        </div>

        {/* Right Dual-Stacked Brand Meta Tags */}
        <div className="flex flex-col items-end text-right">
          <span className="font-serif text-5xl tracking-normal font-bold text-[#e2ffa0] lowercase mb-15 normal-case">
            paradis
          </span>
          <span className="pb-2">BEAUTY</span>
        </div>
      </div>

      {/* ── Massive Typography Overlay Frame ── */}
      <div className="relative z-10 w-full flex flex-col items-center justify-end mb-4 sm:mb-8 pointer-events-none">
        
        {/* Fine Dashed Grid Separator */}
        <div className="w-full h-[1px] border-t border-dashed border-white absolute -top-[2px] left-0" />
        
        {/* Responsive Brand Viewport Header */}
        <h2 className="font-sans text-[16vw] sm:text-[15vw] md:text-[14vw] lg:text-[13vw] font-bold text-[#FFFCF9] leading-none tracking-tight uppercase drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
          ALINA
        </h2>
      </div>
    </section>
  );
};

export default AlinaShowcase;