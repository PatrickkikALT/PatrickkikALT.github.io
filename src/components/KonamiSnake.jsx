import { useEffect, useRef, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const CELL = 24;
const TICK_MS = 90;
const EDIBLE_SELECTOR = 'h1, h2, h3, h4, h5, h6, p, img, a, button, li, span, .card, figure';

function normalizeKey(key) {
  return key.length === 1 ? key.toLowerCase() : key;
}

function rectsIntersect(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

export function KonamiSnake() {
  const [active, setActive] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const progressRef = useRef(0);
  const canvasRef = useRef(null);

  // Listen for the Konami code regardless of game state.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (active) return;
      const key = normalizeKey(event.key);
      const expected = KONAMI_CODE[progressRef.current];

      if (key === expected) {
        progressRef.current += 1;
        if (progressRef.current === KONAMI_CODE.length) {
          progressRef.current = 0;
          setScore(0);
          setDone(false);
          setActive(true);
        }
        return;
      }

      progressRef.current = key === KONAMI_CODE[0] ? 1 : 0;
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  // The game itself.
  useEffect(() => {
    if (!active) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    const sizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    sizeCanvas();

    // Build the list of edible page elements.
    const collectEdibles = () => {
      const nodes = Array.from(document.querySelectorAll(EDIBLE_SELECTOR));
      return nodes
        .filter((el) => !el.closest('.snake-overlay'))
        .map((el) => ({ el, eaten: false }))
        .filter((entry) => {
          const r = entry.el.getBoundingClientRect();
          return r.width > 4 && r.height > 4;
        });
    };
    let edibles = collectEdibles();
    const remaining = () => edibles.filter((e) => !e.eaten).length;

    // Snake state, in grid cells.
    const startX = Math.floor(width / 2 / CELL);
    const startY = Math.floor(height / 2 / CELL);
    let snake = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ];
    let dir = { x: 1, y: 0 };
    let nextDir = { x: 1, y: 0 };
    let growth = 0;
    let eaten = 0;
    let finished = false;

    const cols = () => Math.floor(width / CELL);
    const rows = () => Math.floor(height / CELL);

    const headRect = (head) => ({
      left: head.x * CELL,
      top: head.y * CELL,
      right: head.x * CELL + CELL,
      bottom: head.y * CELL + CELL,
    });

    const step = () => {
      dir = nextDir;

      // Horizontal still wraps around the viewport edges.
      const nx = (snake[0].x + dir.x + cols()) % cols();

      // Vertical scrolls the page when there's more content, otherwise wraps.
      let ny = snake[0].y + dir.y;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (dir.y > 0 && ny >= rows()) {
        if (window.scrollY < maxScroll - 1) {
          window.scrollBy({ top: CELL, behavior: 'instant' });
          ny = rows() - 1;
        } else {
          ny = 0;
        }
      } else if (dir.y < 0 && ny < 0) {
        if (window.scrollY > 0) {
          window.scrollBy({ top: -CELL, behavior: 'instant' });
          ny = 0;
        } else {
          ny = rows() - 1;
        }
      }

      const head = { x: nx, y: ny };
      snake.unshift(head);

      // Check what the head is touching.
      const hr = headRect(head);
      for (const entry of edibles) {
        if (entry.eaten) continue;
        const r = entry.el.getBoundingClientRect();
        if (rectsIntersect(hr, r)) {
          entry.eaten = true;
          entry.el.classList.add('snake-eaten');
          growth += 2;
          eaten += 1;
          setScore(eaten);
        }
      }

      if (growth > 0) {
        growth -= 1;
      } else {
        snake.pop();
      }

      if (remaining() === 0 && !finished) {
        finished = true;
        setDone(true);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw the snake from tail to head so the head sits on top.
      for (let i = snake.length - 1; i >= 0; i -= 1) {
        const seg = snake[i];
        const px = seg.x * CELL;
        const py = seg.y * CELL;
        const isHead = i === 0;
        const t = 1 - i / Math.max(snake.length, 1);

        ctx.fillStyle = isHead
          ? '#9befff'
          : `hsl(191, 90%, ${42 + t * 24}%)`;
        ctx.shadowColor = 'rgba(111, 230, 255, 0.55)';
        ctx.shadowBlur = isHead ? 18 : 8;

        const pad = 2;
        const r = 7;
        const x = px + pad;
        const y = py + pad;
        const w = CELL - pad * 2;
        const h = CELL - pad * 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        ctx.fill();

        if (isHead) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#002b36';
          const eo = 4;
          const cx = px + CELL / 2;
          const cy = py + CELL / 2;
          const ex = dir.x * 4;
          const ey = dir.y * 4;
          ctx.beginPath();
          ctx.arc(cx + ex - dir.y * eo, cy + ey - dir.x * eo, 2.4, 0, Math.PI * 2);
          ctx.arc(cx + ex + dir.y * eo, cy + ey + dir.x * eo, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
    };

    let raf = 0;
    let last = 0;
    const loop = (ts) => {
      if (ts - last >= TICK_MS) {
        last = ts;
        step();
      }
      draw();
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    const handleKeyDown = (event) => {
      const key = event.key;
      if (key === 'Escape') {
        setActive(false);
        return;
      }
      let nd = null;
      if (key === 'ArrowUp' || key === 'w' || key === 'W') nd = { x: 0, y: -1 };
      else if (key === 'ArrowDown' || key === 's' || key === 'S') nd = { x: 0, y: 1 };
      else if (key === 'ArrowLeft' || key === 'a' || key === 'A') nd = { x: -1, y: 0 };
      else if (key === 'ArrowRight' || key === 'd' || key === 'D') nd = { x: 1, y: 0 };
      if (nd) {
        event.preventDefault();
        // Disallow reversing directly into the neck.
        if (nd.x !== -dir.x || nd.y !== -dir.y) nextDir = nd;
      }
    };

    const handleResize = () => {
      sizeCanvas();
      edibles = collectEdibles();
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      // Restore everything the snake ate.
      document.querySelectorAll('.snake-eaten').forEach((el) => el.classList.remove('snake-eaten'));
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="snake-overlay" aria-hidden="true">
      <canvas ref={canvasRef} className="snake-canvas" />
      <div className="snake-hud">
        <span className="snake-hud-score">{score} eaten</span>
        <span className="snake-hud-hint">
          {done ? 'You ate the whole page! · Esc to exit' : 'Arrows / WASD to move · Esc to exit'}
        </span>
      </div>
    </div>
  );
}
