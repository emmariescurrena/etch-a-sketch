const DEFAULT_COLOR = "#000000";
const DEFAULT_MODE = "color";
const DEFAULT_SIZE = 4;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const colorPicker = document.getElementById("colorPicker");
const colorBtn = document.getElementById("colorBtn");
const rainbowBtn = document.getElementById("rainbowBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeValue = document.getElementById("sizeValue");
const sizeSlider = document.getElementById("sizeSlider");
const grid = document.getElementById("grid");

reloadGrid = function () {
  clearGrid();
  setupGrid(currentSize);
};
clearGrid = () => (grid.innerHTML = "");
clearBtn.onclick = () => reloadGrid();

function setupGrid(currentSize) {
  grid.style.gridTemplateColumns = `repeat(${currentSize}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${currentSize}, 1fr)`;
  for (i = 1; i <= currentSize * currentSize; i++) {
    const cell = document.createElement("cell");
    cell.classList.add("cell");
    cell.addEventListener("mousedown", changeCellColor);
    cell.addEventListener("mouseover", changeCellColor);
    cell.addEventListener("dragstart", (event) => event.preventDefault());
    cell.addEventListener("drop", (event) => event.preventDefault());
    grid.appendChild(cell);
  }
}

changeCurrentColor = (newColor) => (currentColor = newColor);
colorPicker.oninput = (e) => changeCurrentColor(e.target.value);

changeSize = (newSize) => {
  sizeValue.innerText = `${newSize} x ${newSize}`;
  currentSize = newSize;
};
sizeSlider.oninput = () => changeSize(sizeSlider.value);

function changeMode(newMode) {
  highlightButton(newMode);
  currentMode = newMode;
}

function highlightButton(newMode) {
  if (currentMode === "color") {
    colorBtn.classList.remove("on");
  } else if (currentMode === "rainbow") {
    rainbowBtn.classList.remove("on");
  } else if (currentMode === "eraser") {
    eraserBtn.classList.remove("on");
  }

  if (newMode === "color") {
    colorBtn.classList.add("on");
  } else if (newMode === "rainbow") {
    rainbowBtn.classList.add("on");
  } else if (newMode === "eraser") {
    eraserBtn.classList.add("on");
  }
}

colorBtn.onclick = () => changeMode("color");
rainbowBtn.onclick = () => changeMode("rainbow");
eraserBtn.onclick = () => changeMode("eraser");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeCellColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
  } else if (currentMode === "color") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "eraser") {
    e.target.style.backgroundColor = "#ffffff";
  }
}

window.onload = () => {
  setupGrid(DEFAULT_SIZE);
  changeMode(DEFAULT_MODE);
  changeCurrentColor(colorPicker.value);
};
