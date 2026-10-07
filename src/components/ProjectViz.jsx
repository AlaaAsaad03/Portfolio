import { useEffect, useRef } from 'react';

// Small live diagrams, one per project. Each scene draws in normalised space
// from a time value, so it is resize-safe and needs no per-frame state.

const hash = (n) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const MONO = '"Geist Mono", ui-monospace, monospace';

function label(ctx, text, x, y, color, size = 11, align = 'left') {
  ctx.font = `500 ${size}px ${MONO}`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
  ctx.textAlign = 'left';
}

function dot(ctx, x, y, r, color, alpha = 1) {
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

const SCENES = {
  // donors on the left, cases on the right, re-matched each round by similarity
  fillia(ctx, w, h, t, c) {
    const L = w * 0.16, R = w * 0.84, pad = h * 0.16;
    const yAt = (i, n) => pad + ((i + 0.5) / n) * (h - 2 * pad);
    const round = Math.floor(t / 3.2);
    const local = (t % 3.2) / 3.2;

    label(ctx, 'donors', L, pad * 0.45, c.mute, 11, 'center');
    label(ctx, 'cases', R, pad * 0.45, c.mute, 11, 'center');
    label(ctx, 'cosine similarity', w / 2, h - pad * 0.4, c.mute, 11, 'center');

    const matches = Array.from({ length: 7 }, (_, d) => ({
      d,
      k: Math.floor(hash(round * 13 + d) * 9),
      s: 0.42 + hash(round * 7 + d * 3) * 0.57,
    }));
    const best = matches.reduce((a, b) => (b.s > a.s ? b : a));

    matches.forEach((m) => {
      const y1 = yAt(m.d, 7) + Math.sin(t * 1.3 + m.d) * 2;
      const y2 = yAt(m.k, 9);
      const grow = clamp01((local - m.d * 0.035) * 3.2);
      const x2 = L + (R - L) * grow;
      const isBest = m === best;
      ctx.strokeStyle = isBest ? c.acc : c.fg;
      ctx.globalAlpha = isBest ? 0.95 : m.s * 0.32;
      ctx.lineWidth = isBest ? 1.6 : 1;
      ctx.beginPath();
      ctx.moveTo(L, y1);
      ctx.lineTo(x2, y1 + (y2 - y1) * grow);
      ctx.stroke();
      ctx.globalAlpha = 1;
      if (grow >= 1) {
        const k = (local * 2.4 + m.d * 0.13) % 1;
        dot(ctx, L + (R - L) * k, y1 + (y2 - y1) * k, isBest ? 2.6 : 1.8, isBest ? c.acc : c.fg, isBest ? 1 : 0.6);
      }
      if (isBest && grow >= 1) {
        label(ctx, m.s.toFixed(2), (L + R) / 2, (y1 + y2) / 2 - 12, c.acc, 12, 'center');
      }
    });

    for (let i = 0; i < 7; i++) dot(ctx, L, yAt(i, 7) + Math.sin(t * 1.3 + i) * 2, 4.5, c.fg);
    for (let i = 0; i < 9; i++) {
      const hit = matches.some((m) => m.k === i);
      dot(ctx, R, yAt(i, 9), 4.5, hit ? c.fg : c.mute, hit ? 1 : 0.45);
    }
  },

  // ~100 sensors; one reports a leak, the alert travels to the dashboard
  water(ctx, w, h, t, c) {
    const COLS = 15, ROWS = 7;
    const x0 = w * 0.07, x1 = w * 0.66, y0 = h * 0.2, y1 = h * 0.82;
    const hub = { x: w * 0.86, y: h * 0.5, w: Math.max(70, w * 0.16), h: 46 };
    const cycle = 2.6;
    const n = Math.floor(t / cycle);
    const phase = (t % cycle) / cycle;
    const leak = Math.floor(hash(n * 5.3) * COLS * ROWS);

    label(ctx, `${COLS * ROWS} sensors`, x0, h * 0.09, c.mute);
    let lx = 0, ly = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let k = 0; k < COLS; k++) {
        const i = r * COLS + k;
        const x = x0 + (k / (COLS - 1)) * (x1 - x0);
        const y = y0 + (r / (ROWS - 1)) * (y1 - y0);
        if (i === leak) { lx = x; ly = y; continue; }
        const pulse = 0.35 + 0.25 * Math.sin(t * 2.2 + hash(i) * 6.28);
        dot(ctx, x, y, 2.2, c.fg, pulse);
      }
    }

    // ripple at the leaking sensor
    ctx.strokeStyle = c.acc;
    ctx.lineWidth = 1.2;
    for (const off of [0, 0.35]) {
      const p = (phase + off) % 1;
      ctx.globalAlpha = 1 - p;
      ctx.beginPath();
      ctx.arc(lx, ly, 3 + p * 26, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    dot(ctx, lx, ly, 3.4, c.acc);

    // websocket hop to the hub
    ctx.setLineDash([3, 4]);
    ctx.strokeStyle = c.acc;
    ctx.globalAlpha = 0.45;
    ctx.beginPath();
    ctx.moveTo(lx, ly);
    ctx.lineTo(hub.x - hub.w / 2, hub.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    const k = clamp01((phase - 0.15) / 0.5);
    if (k > 0 && k < 1) dot(ctx, lx + (hub.x - hub.w / 2 - lx) * k, ly + (hub.y - ly) * k, 3, c.acc);

    const flash = phase > 0.65 ? 1 - (phase - 0.65) / 0.35 : 0;
    ctx.fillStyle = c.acc;
    ctx.globalAlpha = flash * 0.22;
    ctx.fillRect(hub.x - hub.w / 2, hub.y - hub.h / 2, hub.w, hub.h);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = flash > 0 ? c.acc : c.fg;
    ctx.lineWidth = 1.2;
    ctx.strokeRect(hub.x - hub.w / 2, hub.y - hub.h / 2, hub.w, hub.h);
    label(ctx, 'alerts', hub.x, hub.y - 8, c.mute, 10, 'center');
    label(ctx, String(n % 1000).padStart(3, '0'), hub.x, hub.y + 9, c.fg, 13, 'center');
  },

  // tables flip between free and booked; the evening timeline runs underneath
  booking(ctx, w, h, t, c) {
    const COLS = 4, ROWS = 3, N = COLS * ROWS;
    const x0 = w * 0.08, x1 = w * 0.66, y0 = h * 0.12, y1 = h * 0.7;
    const step = Math.floor(t / 0.75);
    const since = t - step * 0.75;
    const flipped = Math.floor(hash(step * 3.1) * N);
    let booked = 0;

    for (let i = 0; i < N; i++) {
      const col = i % COLS, row = Math.floor(i / COLS);
      const cx = x0 + ((col + 0.5) / COLS) * (x1 - x0);
      const cy = y0 + ((row + 0.5) / ROWS) * (y1 - y0);
      const size = Math.min((x1 - x0) / COLS, (y1 - y0) / ROWS) * 0.42;
      const isBooked = hash(i * 9.7 + Math.floor((step + i * 2) / 5)) > 0.45;
      if (isBooked) booked++;
      const fresh = i === flipped && since < 0.6;
      const seats = hash(i) > 0.5 ? 4 : 2;

      for (let s = 0; s < seats; s++) {
        const a = (s / seats) * Math.PI * 2 + (seats === 2 ? 0 : Math.PI / 4);
        dot(ctx, cx + Math.cos(a) * size * 1.15, cy + Math.sin(a) * size * 1.15, 2.4, isBooked ? c.fg : c.mute, isBooked ? 0.8 : 0.4);
      }
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = fresh ? c.acc : isBooked ? c.fg : c.mute;
      ctx.fillStyle = fresh ? c.acc : c.fg;
      ctx.globalAlpha = fresh ? 0.3 : isBooked ? 0.14 : 0;
      ctx.beginPath();
      ctx.roundRect(cx - size / 2, cy - size / 2, size, size, 3);
      ctx.fill();
      ctx.globalAlpha = 1;
      if (!isBooked && !fresh) ctx.setLineDash([2, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    const px = w * 0.78;
    label(ctx, 'booked', px, h * 0.2, c.mute, 10);
    label(ctx, `${booked}/${N}`, px, h * 0.3, c.fg, 22);
    label(ctx, 'free', px, h * 0.46, c.mute, 10);
    label(ctx, `${N - booked}`, px, h * 0.56, c.acc, 22);

    const ty = h * 0.86, tx0 = w * 0.08, tx1 = w * 0.92;
    ctx.strokeStyle = c.mute;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(tx0, ty);
    ctx.lineTo(tx1, ty);
    ctx.stroke();
    ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00'].forEach((hr, i, arr) => {
      const x = tx0 + (i / (arr.length - 1)) * (tx1 - tx0);
      ctx.beginPath();
      ctx.moveTo(x, ty - 3);
      ctx.lineTo(x, ty + 3);
      ctx.stroke();
      label(ctx, hr, x, ty + 14, c.mute, 9, 'center');
    });
    const now = tx0 + ((t / 14) % 1) * (tx1 - tx0);
    dot(ctx, now, ty, 4, c.acc);
  },

  // three buildings, windows on and off, the admin view cycling through them
  buildings(ctx, w, h, t, c) {
    const ground = h * 0.86;
    const specs = [
      { x: 0.1, floors: 8 },
      { x: 0.39, floors: 12 },
      { x: 0.68, floors: 6 },
    ];
    const bw = w * 0.22;
    const fh = (ground - h * 0.2) / 12;
    const selected = Math.floor(t / 2.6) % specs.length;

    specs.forEach((b, bi) => {
      const x = w * b.x;
      const top = ground - b.floors * fh;
      const sel = bi === selected;
      ctx.strokeStyle = sel ? c.acc : c.fg;
      ctx.lineWidth = sel ? 1.6 : 1;
      ctx.strokeRect(x, top, bw, b.floors * fh);
      for (let f = 0; f < b.floors; f++) {
        for (let k = 0; k < 4; k++) {
          const lit = hash(bi * 100 + f * 10 + k + Math.floor(t * 0.8 + hash(f + bi) * 5)) > 0.5;
          ctx.fillStyle = sel && lit ? c.acc : c.fg;
          ctx.globalAlpha = lit ? (sel ? 0.85 : 0.5) : 0.08;
          ctx.fillRect(x + 6 + k * ((bw - 12) / 4), top + f * fh + 4, (bw - 12) / 4 - 4, fh - 7);
        }
      }
      ctx.globalAlpha = 1;
      label(ctx, `B-${bi + 1}`, x, ground + 14, sel ? c.acc : c.mute, 10);
      if (sel) label(ctx, `admin › B-${bi + 1} · ${b.floors} floors`, x, top - 14, c.acc, 10);
    });

    ctx.strokeStyle = c.fg;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.05, ground);
    ctx.lineTo(w * 0.95, ground);
    ctx.stroke();
  },

  // a month of spending draws itself, category totals grow beside it
  waltrack(ctx, w, h, t, c) {
    const cycle = 7;
    const p = clamp01((t % cycle) / 5);
    const x0 = w * 0.07, x1 = w * 0.62, y0 = h * 0.14, y1 = h * 0.82;
    const days = 30;
    let sum = 0;
    const pts = Array.from({ length: days }, (_, i) => (sum += 0.4 + hash(i * 2.3) * (i % 7 === 5 ? 3 : 1.2)));
    const max = sum;
    const xAt = (i) => x0 + (i / (days - 1)) * (x1 - x0);
    const yAt = (v) => y1 - (v / max) * (y1 - y0);
    const shown = Math.max(1, Math.floor(p * days));

    ctx.strokeStyle = c.mute;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 1;
    for (let g = 0; g <= 3; g++) {
      const y = y0 + (g / 3) * (y1 - y0);
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.moveTo(xAt(0), y1);
    for (let i = 0; i < shown; i++) ctx.lineTo(xAt(i), yAt(pts[i]));
    ctx.lineTo(xAt(shown - 1), y1);
    ctx.closePath();
    ctx.fillStyle = c.acc;
    ctx.globalAlpha = 0.14;
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    for (let i = 0; i < shown; i++) (i ? ctx.lineTo : ctx.moveTo).call(ctx, xAt(i), yAt(pts[i]));
    ctx.strokeStyle = c.fg;
    ctx.lineWidth = 1.6;
    ctx.stroke();
    dot(ctx, xAt(shown - 1), yAt(pts[shown - 1]), 3.5, c.acc);
    label(ctx, `day ${shown}`, x0, h * 0.92, c.mute, 10);

    const cats = ['rent', 'food', 'transport', 'bills', 'fun'];
    const bx = w * 0.7, bwMax = w * 0.24;
    cats.forEach((name, i) => {
      const y = h * 0.2 + i * ((h * 0.62) / cats.length);
      const v = (0.25 + hash(i * 4.1) * 0.75) * p;
      label(ctx, name, bx, y, c.mute, 10);
      ctx.fillStyle = i === 0 ? c.acc : c.fg;
      ctx.globalAlpha = i === 0 ? 0.9 : 0.55;
      ctx.fillRect(bx, y + 9, bwMax * v, 5);
      ctx.globalAlpha = 1;
    });
  },
};

export default function ProjectViz({ kind, label: aria }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const scene = SCENES[kind];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now() - Math.random() * 4000;
    let W = 0, H = 0, raf = 0, visible = false;

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (now) => {
      const css = getComputedStyle(document.documentElement);
      const colors = {
        fg: css.getPropertyValue('--fg').trim(),
        mute: css.getPropertyValue('--mute').trim(),
        acc: css.getPropertyValue('--acc').trim(),
      };
      ctx.clearRect(0, 0, W, H);
      scene(ctx, W, H, reduce ? 4.2 : (now - start) / 1000, colors);
      raf = visible && !reduce ? requestAnimationFrame(frame) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    const ro = new ResizeObserver(() => { size(); kick(); });
    const mo = new MutationObserver(kick);
    io.observe(canvas);
    ro.observe(canvas);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
    };
  }, [kind]);

  return <canvas ref={ref} className="viz" role="img" aria-label={aria} />;
}
