import { useEffect, useRef } from 'react';

type Cell = {
  alive: boolean;
  opacity: number;
};

type Grid = Cell[][];

// 🎨 WARNA BACKGROUND (MATCH TAILWIND bg-neutral-50)
const BG_RGB = '250,250,250';
const BG_HEX = '#fafafa';

const GameOfLife = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ============================
    // 📐 CANVAS & GRID CONFIG
    // ============================

    const cellSize = 6;
    const width = canvas.width;
    const height = canvas.height;

    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    // ============================
    // 🎛️ VISUAL TUNING (AMAN DI MATA)
    // ============================

    const transitionSpeed = 0.015; // kecepatan fade
    const maxOpacity = 0.14; // opacity maksimum titik
    const lifeUpdateInterval = 6; // update logic tiap N frame

    let frame = 0;
    let animationFrameId = 0;

    // ============================
    // 🌱 INIT GRID (RANDOM TENANG)
    // ============================

    let grid: Grid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        alive: Math.random() > 0.87, // density rendah
        opacity: 0,
      })),
    );

    // ============================
    // 🔢 COUNT NEIGHBORS
    // ============================

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

    // ============================
    // 🧠 GAME OF LIFE STEP
    // ============================

    const stepLife = () => {
      grid = grid.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(i, j);

          const alive = cell.alive
            ? neighbors === 2 || neighbors === 3
            : neighbors === 3;

          return {
            alive,
            opacity: cell.opacity, // opacity tetap smooth
          };
        }),
      );
    };

    // ============================
    // 🎨 DRAW LOOP
    // ============================

    const draw = () => {
      frame++;

      // ----------------------------
      // 🟢 FADE CANVAS (ANTI FLICKER)
      // ----------------------------
      ctx.fillStyle = `rgba(${BG_RGB},0.12)`;
      ctx.fillRect(0, 0, width, height);

      // ----------------------------
      // 🧠 UPDATE LOGIC PELAN
      // ----------------------------
      if (frame % lifeUpdateInterval === 0) {
        stepLife();
      }

      // ----------------------------
      // 🎨 DRAW CELLS (DOT STYLE)
      // ----------------------------
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
            ctx.fillStyle = `rgba(120,120,120,${cell.opacity})`;
            ctx.beginPath();
            ctx.arc(
              j * cellSize + cellSize / 2,
              i * cellSize + cellSize / 2,
              0.9,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
        }
      }

      // ----------------------------
      // 🌫️ HORIZONTAL FADE
      // ----------------------------
      const hGradient = ctx.createLinearGradient(0, 0, width, 0);
      hGradient.addColorStop(0, `rgba(${BG_RGB},1)`);
      hGradient.addColorStop(0.15, `rgba(${BG_RGB},0)`);
      hGradient.addColorStop(0.85, `rgba(${BG_RGB},0)`);
      hGradient.addColorStop(1, `rgba(${BG_RGB},1)`);

      ctx.fillStyle = hGradient;
      ctx.fillRect(0, 0, width, height);

      // ----------------------------
      // 🌫️ VERTICAL FADE
      // ----------------------------
      const vGradient = ctx.createLinearGradient(0, 0, 0, height);
      vGradient.addColorStop(0, `rgba(${BG_RGB},1)`);
      vGradient.addColorStop(0.18, `rgba(${BG_RGB},0)`);
      vGradient.addColorStop(0.82, `rgba(${BG_RGB},0)`);
      vGradient.addColorStop(1, `rgba(${BG_RGB},1)`);

      ctx.fillStyle = vGradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    // ============================
    // 🧼 INIT CLEAN BACKGROUND
    // ============================

    ctx.fillStyle = BG_HEX;
    ctx.fillRect(0, 0, width, height);

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // ============================
  // 🧱 CANVAS LAYER (BACKGROUND)
  // ============================

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      <canvas ref={canvasRef} width={1500} height={600} />
    </div>
  );
};

export default GameOfLife;
