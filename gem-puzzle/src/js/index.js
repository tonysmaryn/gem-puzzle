import '../styles/style.scss';
import '../assets/command.mp3';

/* const checkSize = document.createElement('select');

const audio = new Audio('command.mp3');

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

function addSound() {
  audio.play();
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
        addSound();
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
*/
