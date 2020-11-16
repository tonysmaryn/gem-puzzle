import Game from './game';
import '../styles/style.scss';

class Board {
  constructor() {
    this.game = new Game();
    this.boardSize = 4;
    this.game.createBoard(this.boardSize);
    this.body = document.querySelector('body');
    this.field = document.createElement('div');
    this.body.append(this.field);
    this.field.className = 'field';
    this.field.classList.add(`field_${this.boardSize}`);
    this.clickDiv = document.createElement('div');
    this.checkSize = document.createElement('select');
    this.checkSize.innerHTML = '<option>3x3</option><option selected>4x4</option><option>5x5</option><option>6x6</option><option>7x7</option><option>8x8</option>';
    this.body.append(this.checkSize);
    this.init();
    this.changeSize();
  }

  changeSize() {
    this.checkSize.addEventListener('change', () => {
      const str = `field_${this.boardSize}`;
      this.field.classList.remove(str);
      [this.boardSize] = this.checkSize.value;
      this.game.createBoard(Number(this.boardSize));
      this.field.classList.add(`field_${this.boardSize}`);
      this.init();
      this.render();
    });
  }

  init() {
    this.game.cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        if (this.game.isNear(cell)) {
          this.render();
        }
      });
    });
  }

  clearBoard() {
    this.field.innerHTML = '';
  }

  render() {
    this.clearBoard();
    for (let i = 0; i <= this.game.cellNum; i += 1) {
      this.field.append(this.game.cells[i]);
    }
  }
}

const board = new Board();
board.render();
