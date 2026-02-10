import { useEffect, useRef, useState } from 'react';

const glyphs = '01{}[]()<>/\\=+-_*&|;:,.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const codeTokens = ['const', 'let', 'await', 'return', 'class', 'function', '=>', 'if', 'else'];

function randomGlyph() {
  if (Math.random() < 0.08) {
    return codeTokens[Math.floor(Math.random() * codeTokens.length)];
  }

  return glyphs[Math.floor(Math.random() * glyphs.length)];
}

function CodeRain() {
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionPreference = () => {
      setEnabled(!mediaQuery.matches);
    };

    handleMotionPreference();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMotionPreference);
    } else {
      mediaQuery.addListener(handleMotionPreference);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleMotionPreference);
      } else {
        mediaQuery.removeListener(handleMotionPreference);
      }
    };
  }, []);

  useEffect(() => {
    if (!enabled || !canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let fontSize = 14;
    let columns = 0;
    let drops = [];
    let speeds = [];
    let previousTime = 0;

    const setupCanvas = () => {
      const parent = canvas.parentElement;
      const nextWidth = parent ? parent.clientWidth : window.innerWidth;
      const nextHeight = parent ? parent.clientHeight : window.innerHeight;

      width = nextWidth;
      height = nextHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(nextWidth * dpr);
      canvas.height = Math.floor(nextHeight * dpr);
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      fontSize = nextWidth < 700 ? 12 : 14;
      columns = Math.max(1, Math.floor(nextWidth / fontSize));
      drops = Array.from({ length: columns }, () => -Math.random() * (nextHeight / fontSize));
      speeds = Array.from({ length: columns }, () => 0.5 + Math.random() * 0.9);
    };

    const renderFrame = (time) => {
      if (!previousTime) {
        previousTime = time;
      }

      const delta = time - previousTime;

      if (delta > 34) {
        context.fillStyle = 'rgba(2, 8, 24, 0.15)';
        context.fillRect(0, 0, width, height);

        context.font = `600 ${fontSize}px "IBM Plex Mono", monospace`;

        for (let index = 0; index < columns; index += 1) {
          const x = index * fontSize;
          const y = drops[index] * fontSize;

          context.fillStyle = Math.random() > 0.2 ? 'rgba(70, 124, 255, 0.72)' : 'rgba(42, 193, 120, 0.9)';
          context.fillText(randomGlyph(), x, y);

          if (y > height + Math.random() * 320) {
            drops[index] = -Math.random() * 24;
            speeds[index] = 0.5 + Math.random() * 0.9;
          } else {
            drops[index] += speeds[index];
          }
        }

        previousTime = time;
      }

      animationRef.current = window.requestAnimationFrame(renderFrame);
    };

    setupCanvas();
    animationRef.current = window.requestAnimationFrame(renderFrame);

    window.addEventListener('resize', setupCanvas);

    return () => {
      window.cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', setupCanvas);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return <canvas ref={canvasRef} className="hero-code-rain" aria-hidden="true" />;
}

export default CodeRain;
