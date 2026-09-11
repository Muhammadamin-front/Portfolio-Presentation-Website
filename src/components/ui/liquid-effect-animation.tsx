"use client";

import { useEffect, useRef } from "react";

type LiquidApplication = {
  dispose?: () => void;
};

const LIQUID_MODULE_URL =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js";
const LIQUID_IMAGE_URL =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=90";

export function LiquidEffectAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.dataset.liquidState = "reduced-motion";
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.dataset.liquidLoader = "true";
    script.textContent = `
      try {
        const { default: LiquidBackground } = await import('${LIQUID_MODULE_URL}');
        const canvas = document.getElementById('liquid-canvas');
        if (canvas && canvas.isConnected) {
          const app = LiquidBackground(canvas);
          app.loadImage('${LIQUID_IMAGE_URL}');
          app.liquidPlane.material.metalness = 0.75;
          app.liquidPlane.material.roughness = 0.25;
          app.liquidPlane.uniforms.displacementScale.value = 5;
          app.setRain(false);
          window.__liquidApp = app;
          canvas.dataset.liquidState = 'ready';
        }
      } catch (error) {
        const canvas = document.getElementById('liquid-canvas');
        if (canvas) canvas.dataset.liquidState = 'error';
        console.error('Liquid background failed to initialize.', error);
      }
    `;
    document.body.appendChild(script);

    return () => {
      window.__liquidApp?.dispose?.();
      window.__liquidApp = undefined;
      script.remove();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 m-0 h-full w-full touch-none overflow-hidden"
      style={{ fontFamily: '"Montserrat", sans-serif' }}
    >
      <canvas
        ref={canvasRef}
        id="liquid-canvas"
        aria-hidden="true"
        className="fixed inset-0 h-full w-full"
      />
    </div>
  );
}

declare global {
  interface Window {
    __liquidApp?: LiquidApplication;
  }
}

export default LiquidEffectAnimation;
