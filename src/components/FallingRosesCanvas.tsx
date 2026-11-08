import React, { useEffect, useRef, useState } from 'react';
import roseBlossomUrl from '../assets/images/real_pink_rose_blossom_1794132750309.jpg';
import rosePetalUrl from '../assets/images/real_pink_rose_petal_1794132765826.jpg';
import roseTopUrl from '../assets/images/real_pink_rose_top_1794132783397.jpg';

interface RealRoseParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  spriteIndex: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

interface FallingRosesCanvasProps {
  petalColors?: string[];
  density?: 'gentle' | 'romantic' | 'blizzard';
  interactive?: boolean;
}

// Converts black-background image to transparent canvas sprite
function createTransparentSprite(img: HTMLImageElement, size = 240): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.drawImage(img, 0, 0, size, size);
  const imgData = ctx.getImageData(0, 0, size, size);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const maxVal = Math.max(r, g, b);
    if (maxVal < 24) {
      data[i + 3] = 0;
    } else if (maxVal < 60) {
      const alphaFactor = (maxVal - 24) / 36;
      data[i + 3] = Math.floor(alphaFactor * 255);
    }
  }

  ctx.putImageData(imgData, 0, 0);
  return canvas;
}

export const FallingRosesCanvas: React.FC<FallingRosesCanvasProps> = ({
  density = 'romantic',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rosesRef = useRef<RealRoseParticle[]>([]);
  const sparklesRef = useRef<Sparkle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -100, y: -100, active: false });
  const spritesRef = useRef<HTMLCanvasElement[]>([]);
  const [spritesLoaded, setSpritesLoaded] = useState(false);

  // Preload real rose images into cached offscreen transparent sprites
  useEffect(() => {
    let isMounted = true;
    const urls = [roseTopUrl, roseBlossomUrl, rosePetalUrl];
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    urls.forEach((url, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      img.onload = () => {
        if (!isMounted) return;
        loadedImages[index] = img;
        loadedCount++;
        if (loadedCount === urls.length) {
          // 200px is optimal for both Retina phones and 4K laptops while conserving memory
          spritesRef.current = loadedImages.map((image) => createTransparentSprite(image, 200));
          setSpritesLoaded(true);
        }
      };
    });

    return () => {
      isMounted = false;
    };
  }, []);

  // Main canvas animation and high-DPI scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;

    // Retina & High-DPI support (iPhones, Android OLEDs, MacBook Retina, 4K monitors)
    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;

      // Reset transform and scale for DPR
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('orientationchange', resizeCanvas, { passive: true });

    // Adaptive particle count: optimized for mobile phones vs laptops
    const isMobile = cssWidth < 640;
    const baseCount = isMobile
      ? density === 'gentle' ? 14 : density === 'romantic' ? 24 : 38
      : density === 'gentle' ? 24 : density === 'romantic' ? 44 : 70;

    const createParticle = (initialY = -50): RealRoseParticle => {
      const isBlossom = Math.random() < 0.4;
      const spriteIndex = isBlossom ? (Math.random() < 0.5 ? 0 : 1) : 2;

      // Responsive particle sizing: slightly smaller on mobile to keep view clean
      const sizeMultiplier = isMobile ? 0.8 : 1.0;
      const size = isBlossom
        ? (Math.random() * 22 + 28) * sizeMultiplier
        : (Math.random() * 16 + 20) * sizeMultiplier;

      return {
        x: Math.random() * cssWidth,
        y: initialY === -50 ? Math.random() * cssHeight : initialY,
        size,
        speedY: isBlossom ? Math.random() * 0.7 + 0.6 : Math.random() * 1.0 + 0.7,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.012,
        opacity: Math.random() * 0.25 + 0.75,
        spriteIndex,
        swayAmplitude: Math.random() * 1.5 + 0.8,
        swayFrequency: Math.random() * 0.016 + 0.008,
        swayOffset: Math.random() * 100,
      };
    };

    rosesRef.current = Array.from({ length: baseCount }, () => createParticle());

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      step += 1;

      const sprites = spritesRef.current;
      const particles = rosesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        const sway = Math.sin(step * p.swayFrequency + p.swayOffset) * p.swayAmplitude;
        p.x += p.speedX + sway;
        p.y += p.speedY;

        // Interactive touch/mouse draft (works on laptop hover & phone taps)
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const force = (1 - dist / 130) * 4;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Loop boundaries
        if (p.y > cssHeight + 50) {
          particles[i] = createParticle(-40);
        }
        if (p.x > cssWidth + 40) p.x = -30;
        else if (p.x < -40) p.x = cssWidth + 30;

        // Draw real rose sprite
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const scaleX = Math.cos(p.flip);
        ctx.scale(scaleX, 1);
        ctx.globalAlpha = p.opacity;

        const sprite = sprites[p.spriteIndex];
        if (sprite) {
          const s = p.size;
          ctx.drawImage(sprite, -s / 2, -s / 2, s, s);
        } else {
          ctx.fillStyle = '#fb7185';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Sparkles
      const sparkles = sparklesRef.current;
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 1 / s.maxLife;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
    };
  }, [density, spritesLoaded]);

  // Global touch & mouse handlers that DO NOT block scrolling on phones
  useEffect(() => {
    if (!interactive) return;

    const handlePointerMove = (e: PointerEvent) => {
      // Only track if it's mouse or direct touch
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };

      if (Math.random() < 0.25) {
        sparklesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 2 + 1,
          alpha: 0.85,
          color: Math.random() < 0.6 ? '#fecdd3' : '#fde047',
          life: 0,
          maxLife: 30,
        });
      }
    };

    const handlePointerUp = () => {
      // Fade out mouse force after brief moment
      setTimeout(() => {
        mouseRef.current.active = false;
      }, 400);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-10"
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    />
  );
};
