import { useEffect, useRef } from 'react';

/* =========================
 * 🧱 TYPE DEFINITIONS
 * ========================= */

type Cell = {
  alive: boolean;
  opacity: number;
};

type Grid = Cell[][];

/* =========================
 * 🎨 VISUAL CONSTANTS
 * ========================= */

// Warna titik (abu-abu netral, aman di bg terang)
const DOT_COLOR = '100,100,100';

/* =========================
 * 🧠 GAME OF LIFE COMPONENT
 * ========================= */

const GameOfLife = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    /* =========================
     * 📐 CANVAS & GRID SETUP
     * ========================= */

    const cellSize = 6;
    const width = canvas.width;
    const height = canvas.height;

    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    /* =========================
     * 🎛️ ANIMATION TUNING
     * ========================= */

    const transitionSpeed = 0.015; // kecepatan fade titik
    const maxOpacity = 0.18; // opacity maksimum
    const lifeUpdateInterval = 6; // update logic tiap N frame

    let frame = 0;
    let animationFrameId = 0;

    /* =========================
     * 🌱 INIT GRID (DENSITY TENANG)
     * ========================= */

    let grid: Grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        alive: Math.random() > 0.87,
        opacity: 0,
      })),
    );

    /* =========================
     * 🔢 COUNT NEIGHBORS
     * ========================= */

    const countNeighbors = (row: number, col: number) => {
      let sum = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;

          const r = (row + i + rows) % rows;
          const c = (col + j + cols) % cols;

          if (grid[r][c].alive) sum++;
        }
      }

      return sum;
    };

    /* =========================
     * 🧠 GAME OF LIFE STEP
     * ========================= */

    const stepLife = () => {
      grid = grid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(i, j);

          const alive = cell.alive
            ? neighbors === 2 || neighbors === 3
            : neighbors === 3;

          return {
            alive,
            opacity: cell.opacity,
          };
        }),
      );
    };

    /* =========================
     * 🌫️ EDGE FADE (TRANSPARENT)
     * =========================
     * Menghapus opacity di tepi canvas
     * TANPA memberi warna apa pun
     */

    const drawEdgeFade = () => {
      // LEFT → RIGHT
      const hGradient = ctx.createLinearGradient(0, 0, width, 0);
      hGradient.addColorStop(0, 'rgba(255,255,255,1)');
      hGradient.addColorStop(0.12, 'rgba(255,255,255,0)');
      hGradient.addColorStop(0.88, 'rgba(255,255,255,0)');
      hGradient.addColorStop(1, 'rgba(255,255,255,1)');

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = hGradient;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // TOP → BOTTOM
      const vGradient = ctx.createLinearGradient(0, 0, 0, height);
      vGradient.addColorStop(0, 'rgba(255,255,255,1)');
      vGradient.addColorStop(0.18, 'rgba(255,255,255,0)');
      vGradient.addColorStop(0.82, 'rgba(255,255,255,0)');
      vGradient.addColorStop(1, 'rgba(255,255,255,1)');

      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = vGradient;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    };

    /* =========================
     * 🎨 DRAW LOOP
     * ========================= */

    const draw = () => {
      frame++;

      // 🧼 CLEAR CANVAS (TRANSPARENT TOTAL)
      ctx.clearRect(0, 0, width, height);

      // 🧠 UPDATE LIFE LOGIC
      if (frame % lifeUpdateInterval === 0) {
        stepLife();
      }

      // 🎨 DRAW DOTS
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          const cell = grid[i][j];

          if (cell.alive) {
            cell.opacity = Math.min(
              cell.opacity + transitionSpeed * (0.8 + Math.random() * 0.4),
              maxOpacity,
            );
          } else {
            cell.opacity = Math.max(cell.opacity - transitionSpeed, 0);
          }

          if (cell.opacity > 0.01) {
            ctx.fillStyle = `rgba(${DOT_COLOR},${0.3})`;
            ctx.beginPath();
            ctx.arc(
              j * cellSize + cellSize / 2,
              i * cellSize + cellSize / 2,
              1,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
        }
      }

      // 🌫️ SOFT EDGE FADE
      drawEdgeFade();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  /* =========================
   * 🧱 CANVAS LAYER (BACKGROUND)
   * ========================= */

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        width={1500}
        height={600}
        className="w-full h-full"
      />
    </div>
  );
};

export default GameOfLife;
