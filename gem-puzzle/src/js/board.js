import Game from './game';
import '../styles/style.scss';

class Board {
  constructor() {
    this.game = new Game();
    this.boardSize = 4;
    this.generateBoard();
    this.changeSize();
    this.addImage();
  }

  generateBoard() {
    this.body = document.querySelector('body');
    this.field = document.createElement('div');
    this.body.append(this.field);
    this.field.className = 'field';
    this.field.classList.add(`field_${this.boardSize}`);
    this.clickDiv = document.createElement('div');
    this.checkSize = document.createElement('select');
    this.checkSize.innerHTML = '<option>3x3</option><option selected>4x4</option><option>5x5</option><option>6x6</option><option>7x7</option><option>8x8</option>';
    this.body.append(this.checkSize);
    // TODO: Implement style
    this.body.insertAdjacentHTML('beforeend', '<br />');
    this.checkImageLabel = document.createElement('label');
    this.body.appendChild(this.checkImageLabel);
    this.checkImageLabel.innerHTML = '<input type="checkbox" id="img_checkbox">img</input>';
    this.checkImage = document.querySelector('#img_checkbox');
  }

  changeSize() {
    this.checkSize.addEventListener('change', () => {
      const str = `field_${this.boardSize}`;
      this.field.classList.remove(str);
      [this.boardSize] = this.checkSize.value;
      this.game.createBoard(+this.boardSize, this.field.offsetHeight, this.checkImage.checked);
      this.field.classList.add(`field_${this.boardSize}`);
      this.init();
    });
  }

  addImage() {
    this.checkImage.addEventListener('change', () => {
      this.game.createBoard(this.boardSize, this.field.offsetHeight, this.checkImage.checked);
      this.init();
    });
  }

  init() {
    this.game.createBoard(this.boardSize, this.field.offsetHeight, this.checkImage.checked);
    this.game.cells.forEach((cell) => {
      cell.addEventListener('click', () => {
        if (this.game.isNear(cell)) {
          this.render();
        }
      });
    });
    this.render();
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
board.init();
