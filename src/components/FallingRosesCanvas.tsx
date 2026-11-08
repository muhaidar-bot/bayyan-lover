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
  spriteIndex: number; // 0: Top Rose, 1: Blossom Rose, 2: Real Petal
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
  blur: number;
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
function createTransparentSprite(img: HTMLImageElement, size = 256): HTMLCanvasElement {
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

    // Background is black studio backdrop
    const maxVal = Math.max(r, g, b);
    if (maxVal < 24) {
      data[i + 3] = 0; // Transparent
    } else if (maxVal < 60) {
      // Smooth feathering on petal edges
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

  // Preload and convert real rose photography to transparent sprites
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
          spritesRef.current = loadedImages.map((image) => createTransparentSprite(image, 240));
          setSpritesLoaded(true);
        }
      };
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = density === 'gentle' ? 24 : density === 'romantic' ? 44 : 70;

    const createParticle = (initialY = -50): RealRoseParticle => {
      // 40% full real rose blossoms, 60% real individual rose petals
      const isBlossom = Math.random() < 0.42;
      const spriteIndex = isBlossom ? (Math.random() < 0.5 ? 0 : 1) : 2;

      // Realistic scale variations
      const size = isBlossom
        ? Math.random() * 26 + 32 // 32px - 58px for real rose heads
        : Math.random() * 18 + 24; // 24px - 42px for real petals

      return {
        x: Math.random() * width,
        y: initialY === -50 ? Math.random() * height : initialY,
        size,
        speedY: isBlossom ? Math.random() * 0.8 + 0.7 : Math.random() * 1.1 + 0.8,
        speedX: Math.random() * 0.7 - 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.035 + 0.015,
        opacity: Math.random() * 0.25 + 0.75,
        spriteIndex,
        swayAmplitude: Math.random() * 1.8 + 0.9,
        swayFrequency: Math.random() * 0.018 + 0.009,
        swayOffset: Math.random() * 100,
        blur: Math.random() < 0.25 ? Math.random() * 1.5 : 0, // Depth of field
      };
    };

    rosesRef.current = Array.from({ length: count }, () => createParticle());

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
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

        // Interactive gentle wind draft
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (1 - dist / 150) * 4.5;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Loop around edges
        if (p.y > height + 60) {
          particles[i] = createParticle(-50);
        }
        if (p.x > width + 40) p.x = -30;
        else if (p.x < -40) p.x = width + 30;

        // Draw the real rose / petal sprite
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        // 3D perspective flip (especially breathtaking on petals)
        const scaleX = Math.cos(p.flip);
        ctx.scale(scaleX, 1);
        ctx.globalAlpha = p.opacity;

        const sprite = sprites[p.spriteIndex];
        if (sprite) {
          const s = p.size;
          // Soft romantic drop shadow under each real rose/petal
          ctx.shadowColor = 'rgba(244, 63, 94, 0.35)';
          ctx.shadowBlur = 12;
          ctx.drawImage(sprite, -s / 2, -s / 2, s, s);
        } else {
          // Fallback while sprites decode
          ctx.fillStyle = '#fb7185';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Render glowing romantic sparkles
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
        ctx.shadowColor = '#fb7185';
        ctx.shadowBlur = 10;
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
      window.removeEventListener('resize', handleResize);
    };
  }, [density, spritesLoaded]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseRef.current = { x, y, active: true };

    if (Math.random() < 0.35) {
      sparklesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5 - 0.5,
        size: Math.random() * 2.5 + 1.2,
        alpha: 0.9,
        color: Math.random() < 0.6 ? '#fecdd3' : '#fde047',
        life: 0,
        maxLife: 35,
      });
    }
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
  };

  const handleClick = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Burst a shower of real pink roses and petals from click point
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI * 2) / 6 + Math.random() * 0.3;
      const speed = Math.random() * 2.5 + 1.5;
      rosesRef.current.push({
        x,
        y,
        size: Math.random() * 20 + 26,
        speedY: Math.sin(angle) * speed + 1,
        speedX: Math.cos(angle) * speed,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        flip: Math.random() * Math.PI,
        flipSpeed: 0.04,
        opacity: 0.95,
        spriteIndex: Math.floor(Math.random() * 3),
        swayAmplitude: 1.5,
        swayFrequency: 0.015,
        swayOffset: Math.random() * 50,
        blur: 0,
      });
    }

    // Sparkles
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1.5;
      sparklesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: Math.random() * 3 + 1.5,
        alpha: 1,
        color: ['#f43f5e', '#fb7185', '#ffe4e6', '#fde047'][i % 4],
        life: 0,
        maxLife: 40,
      });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className="absolute inset-0 w-full h-full pointer-events-auto z-10"
      style={{ touchAction: 'none' }}
    />
  );
};
