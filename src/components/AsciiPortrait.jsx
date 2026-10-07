import { useEffect, useRef } from 'react';
import portrait from '../assets/profile.png';

// The portrait is drawn with the stack itself, row after row.
const STACK = 'NESTJS·POSTGRES·REDIS·SOCKET.IO·REACT·ANGULAR·.NET·TYPESCRIPT·SUPABASE·DENO·MONGODB·DOCKER·AZURE·PYTHON·FLASK·C#·';
const GLITCH = '01<>/\\{}[]=+*#%&;:';
// crop of profile.png: keeps the subject, drops the ceiling lights and the corner watermark
const CROP = { x: 40, y: 160, w: 688, h: 900 };

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export default function AsciiPortrait() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const img = new Image();
    const pointer = { x: -1e4, y: -1e4 };
    let cols = 0, rows = 0, cw = 0, ch = 0, W = 0, H = 0;
    let weightsDark = null, weightsLight = null;
    let raf = 0, visible = false, ready = false;

    const sample = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      W = rect.width;
      H = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = W < 420 ? 58 : 86;
      cw = W / cols;
      ch = cw * 1.65;
      rows = Math.floor(H / ch);

      const off = document.createElement('canvas');
      off.width = cols;
      off.height = rows;
      const o = off.getContext('2d', { willReadFrequently: true });
      o.drawImage(img, CROP.x, CROP.y, CROP.w, CROP.h, 0, 0, cols, rows);
      const px = o.getImageData(0, 0, cols, rows).data;

      const n = cols * rows;
      const lum = new Float32Array(n);
      const blue = new Float32Array(n);
      let lo = 1, hi = 0;
      for (let i = 0; i < n; i++) {
        const r = px[i * 4], g = px[i * 4 + 1], b = px[i * 4 + 2];
        const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        lum[i] = l;
        blue[i] = Math.max(0, (b - (r + g) / 2) / 255);
        if (l < lo) lo = l;
        if (l > hi) hi = l;
      }

      weightsDark = new Float32Array(n);
      weightsLight = new Float32Array(n);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const l = (lum[i] - lo) / (hi - lo || 1);
          const nx = c / cols - 0.5, ny = r / rows - 0.5;
          const mask = 1 - smooth(0.36, 0.7, Math.hypot(nx * 1.55, ny * 0.95));
          const wall = blue[i] > 0.05 ? 0.25 : 1;
          weightsDark[i] = Math.pow(l, 1.0) * mask * wall;
          weightsLight[i] = Math.pow(1 - l, 1.15) * mask * wall;
        }
      }
      ctx.font = `500 ${Math.round(ch * 0.8)}px "Geist Mono", ui-monospace, monospace`;
      ctx.textBaseline = 'top';
    };

    const draw = (t) => {
      if (!ready || !weightsDark) return;
      const root = document.documentElement;
      const isLight = root.dataset.theme === 'light';
      const css = getComputedStyle(root);
      const base = css.getPropertyValue('--ascii').trim();
      const hot = css.getPropertyValue('--ascii-hot').trim();
      const weights = isLight ? weightsLight : weightsDark;
      const scan = reduce ? -100 : ((t / 4800) % 1.4 - 0.2) * rows;
      const R = Math.max(90, W * 0.2);
      const hotCells = [];

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = base;
      for (let r = 0; r < rows; r++) {
        const sb = Math.exp(-((r - scan) ** 2) / 5);
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const w = weights[i];
          const x = c * cw, y = r * ch;
          const dx = x - pointer.x, dy = y - pointer.y;
          const d = Math.hypot(dx, dy);
          const near = d < R ? 1 - d / R : 0;
          const a = Math.min(1, w * 1.25 + sb * w * 1.2 + near * near * 0.7);
          if (a < 0.07) continue;

          let chr = STACK[i % STACK.length];
          if (near > 0.2 && Math.random() < near * 0.55) chr = GLITCH[(Math.random() * GLITCH.length) | 0];
          const push = near * near * 14;
          const ox = d ? (dx / d) * push : 0;
          const oy = d ? (dy / d) * push : 0;

          if (near > 0.45 || (sb > 0.5 && w > 0.25)) {
            hotCells.push(chr, x + ox, y + oy, a);
            continue;
          }
          ctx.globalAlpha = a;
          ctx.fillText(chr, x + ox, y + oy);
        }
      }
      ctx.fillStyle = hot;
      for (let k = 0; k < hotCells.length; k += 4) {
        ctx.globalAlpha = hotCells[k + 3];
        ctx.fillText(hotCells[k], hotCells[k + 1], hotCells[k + 2]);
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now) => {
      draw(now);
      raf = visible && !reduce ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      if (reduce) kick();
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
      if (reduce) kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    const ro = new ResizeObserver(() => {
      if (ready) { sample(); kick(); }
    });
    const mo = new MutationObserver(kick);

    img.onload = () => {
      ready = true;
      sample();
      kick();
      document.fonts?.ready.then(() => { sample(); kick(); });
    };
    img.src = portrait;

    io.observe(canvas);
    ro.observe(canvas);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ascii"
      role="img"
      aria-label="Portrait of Alaa Asaad, drawn in text characters spelling out the technologies Alaa works with"
    />
  );
}
