import '../styles/style.scss';

let win = [];
let clicks = 0;
const clickDiv = document.createElement('div');
let cells = [];
const body = document.querySelector('body');
const field = document.createElement('div');
body.append(field);
field.className = 'field';
field.classList.add('field_4');
const empty = document.createElement('div');
const checkSize = document.createElement('select');
body.append(checkSize);
checkSize.innerHTML = '<option>3x3</option><option selected>4x4</option><option>5x5</option><option>6x6</option><option>7x7</option><option>8x8</option>';
let boardSize = 4;
let cellNum = boardSize * boardSize - 1;

function clearBoard() {
  field.innerHTML = '';
}

function isNear(cell) {
  if (Math.abs(cells.indexOf(empty) - cells.indexOf(cell)) === 1) {
    return true;
  }
  if (Math.abs(cells.indexOf(empty) - cells.indexOf(cell)) === boardSize) {
    return true;
  }
  return false;
}

function render() {
  clearBoard();
  for (let i = 0; i <= cellNum; i += 1) {
    field.append(cells[i]);
  }
}

function move(cell) {
  const x = cells.indexOf(empty);
  const y = cells.indexOf(cell);
  [cells[x], cells[y]] = [cells[y], cells[x]];
  render();
}

function isSolvable() {
  cells.sort(() => Math.random() - 0.5);
  let inversions = 0;
  let isSolve = false;
  while (isSolve) {
    for (let i = 0; i < cellNum; i += 1) {
      for (let j = 0; j < i; j += 1) {
        if (cells[j].innerHTML > cells[i].innerHTML) {
          inversions += 1;
        }
      }
    }
    if (inversions % 2 === 0) {
      isSolve = true;
    } else {
      cells.sort(() => Math.random() - 0.5);
    }
  }
}

function setClick() {
  clicks += 1;
  clickDiv.innerHTML = clicks;
  body.append(clickDiv);
}

function isSolved() {
  if (cells.every((v, i) => v === win[i])) {
    console.log('Win');
    clickDiv.insertAdjacentElement('afterend', '<p>Вы выиграли!</p>');
  }
}
function createBoard() {
  cells = [];
  win = [];
  for (let i = 1; i <= cellNum; i += 1) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.innerHTML = i;
    cells.push(cell);
    win.push(cell);
    cell.addEventListener('click', () => {
      if (isNear(cell)) {
        move(cell);
        setClick();
        isSolved();
      }
    });
  }
}

function setEmpty() {
  cells.push(empty);
  win.push(empty);
  field.append(empty);
  empty.className = 'empty';
  console.log(win);
}

function changeBoardSize(oldBoardSize) {
  field.classList.remove(`field_${oldBoardSize}`);
  field.classList.add(`field_${boardSize}`);
}

checkSize.addEventListener('change', () => {
  const oldBoardSize = boardSize;
  const boardSizeStr = checkSize.value;
  console.log(boardSizeStr);
  boardSize = Number(boardSizeStr[0]);
  console.log(boardSize);
  cellNum = boardSize * boardSize - 1;
  console.log(boardSize);
  clearBoard();
  changeBoardSize(oldBoardSize);
  createBoard();
  isSolvable();
  setEmpty();
  render();
});

createBoard();
isSolvable();
setEmpty();
render();
