export default class Game {
  constructor() {
    this.win = [];
    this.clicks = 0;
    this.cells = [];
    this.empty = document.createElement('div');
    this.a = true;
  }

  createBoard(boardSize) {
    this.gameSize = boardSize;
    this.cellNum = boardSize * boardSize - 1;
    this.cells = [];
    this.win = [];
    for (let i = 1; i <= this.cellNum; i += 1) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.innerHTML = i;
      this.cells.push(cell);
      this.win.push(cell);
    }
    this.isSolvable();
    this.setEmpty();
  }

  isNear(cell) {
    if (Math.abs(this.cells.indexOf(this.empty) - this.cells.indexOf(cell)) === 1) {
      this.move(cell);
      return true;
    }
    if (Math.abs(this.cells.indexOf(this.empty) - this.cells.indexOf(cell)) === this.gameSize) {
      this.move(cell);
      return true;
    }
    return false;
  }

  move(cell) {
    const x = this.cells.indexOf(this.empty);
    const y = this.cells.indexOf(cell);
    [this.cells[x], this.cells[y]] = [this.cells[y], this.cells[x]];
  }

  isSolvable() {
    this.cells.sort(() => Math.random() - 0.5);
    let inversions = 0;
    let isSolve = false;
    while (isSolve) {
      for (let i = 0; i < this.cellNum; i += 1) {
        for (let j = 0; j < i; j += 1) {
          if (this.cells[j].innerHTML > this.cells[i].innerHTML) {
            inversions += 1;
          }
        }
      }
      if (inversions % 2 === 0) {
        isSolve = true;
      } else {
        this.cells.sort(() => Math.random() - 0.5);
      }
    }
  }

  setEmpty() {
    this.cells.push(this.empty);
    this.win.push(this.empty);
    this.empty.className = 'empty';
  }
}
