import p5 from "p5";
import config from "./config";
import { glidernGun } from "./example/glider_gun";

const width = window.innerWidth;
const height = window.innerHeight;
const state = {
  field: [...glidernGun(config.CELL_SIZE)],
  isPaused: true,
};

const sketch = function (p) {
  p.setup = function () {
    p.createCanvas(width, height);
    p.frameRate(config.FPS);
    p.noLoop();
  };

  function getCellIndexByXY(x, y) {
    return state.field.findIndex((cell) => cell.x === x && cell.y === y);
  }

  function getAllNeighbours(x, y) {
    return [
      [x + config.CELL_SIZE, y], // R
      [x - config.CELL_SIZE, y], // L
      [x + config.CELL_SIZE, y + config.CELL_SIZE], // TR
      [x - config.CELL_SIZE, y - config.CELL_SIZE], // BL
      [x - config.CELL_SIZE, y + config.CELL_SIZE], // TL
      [x + config.CELL_SIZE, y - config.CELL_SIZE], // BR
      [x, y - config.CELL_SIZE], // B
      [x, y + config.CELL_SIZE], // T
    ].filter(([x, y]) => 
      // Filter cells which are outside the field
      x >= 0 && 
      y >= 0 && 
      y <= height + config.CELL_SIZE && 
      x <= width + config.CELL_SIZE
    );
  }

  function drawPieces() {
    p.clear();
    p.background("#262626");

    for (let x = 0; x < width; x += config.CELL_SIZE) {
      for (let y = 0; y < height; y += config.CELL_SIZE) {
        p.stroke("#202020");
        p.strokeWeight(1);
        p.line(x, 0, x, height);
        p.line(0, y, width, y);
      }
    }

    for (const { x, y } of state.field) {
      p.fill("lime");
      p.rect(x, y, config.CELL_SIZE);
    }
  }

  p.draw = function () {
    const changes = [];
    const cells = [];

    // Get all possible neighbours to check
    for (const { x, y } of state.field) {
      cells.push([x, y]);
      for (const neighbour of getAllNeighbours(x, y)) {
        if (!cells.find((e) => "" + e === "" + neighbour)) {
          cells.push([...neighbour]);
        }
      }
    }

    for (let i = 0; i < cells.length; i++) {
      const [x, y] = cells[i];
      const neighbours = getAllNeighbours(x, y).filter((e) => getCellIndexByXY(...e) !== -1).length;
      const cellIndex = getCellIndexByXY(x, y);
      const exists = cellIndex !== -1;

      if (!exists && neighbours === 3) {
        changes.push({ action: "create", x, y });
      } else if (exists && (neighbours < 2 || neighbours > 3)) {
        changes.push({ i: cellIndex, action: "remove", x, y });
      }
    }

    // Remove cells
    const removeChanges = changes.filter((e) => e.action === "remove");
    state.field = state.field.filter((_, i) => !removeChanges.find((e) => e.i === i));

    // Add new cells
    for (const { x, y } of changes.filter((e) => e.action === "create")) {
      state.field.push({ x, y });
    }

    drawPieces();
  };

  p.keyTyped = function () {
    state.isPaused = !state.isPaused;
    state.isPaused ? p.noLoop() : p.loop();
  };

  p.mouseDragged = function () {
    const x = Math.floor(p.mouseX / config.CELL_SIZE) * config.CELL_SIZE;
    const y = Math.floor(p.mouseY / config.CELL_SIZE) * config.CELL_SIZE;
    if (getCellIndexByXY(x, y) === -1) {
      state.field.push({ x, y });
      p.rect(x, y, config.CELL_SIZE);
    }
  };
};

new p5(sketch);
