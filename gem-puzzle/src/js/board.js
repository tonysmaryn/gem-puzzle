import Game from './game';
import '../styles/style.scss';

class Board {
  constructor() {
    this.game = new Game();
    this.boardSize = 4;
    this.clicks = 0;
    this.min = 0;
    this.sec = 0;
    this.gameStart = false;
    this.generateBoard();
    this.changeSize();
    this.addImage();
    this.restart();
    this.setTimer();
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
    this.clicksDiv = document.createElement('div');
    this.body.appendChild(this.clickDiv);
    this.clickDiv.innerHTML = `Количество ходов: ${this.clicks}`;
    this.timerDiv = document.createElement('div');
    this.body.appendChild(this.timerDiv);
    this.restartButton = document.createElement('button');
    this.restartButton.innerHTML = 'Новая игра';
    this.body.appendChild(this.restartButton);
  }

  changeSize() {
    this.checkSize.addEventListener('change', () => {
      const str = `field_${this.boardSize}`;
      this.field.classList.remove(str);
      const [boardSizeStr] = this.checkSize.value;
      this.boardSize = Number(boardSizeStr);
      this.game.createBoard(this.boardSize, this.field.offsetHeight, this.checkImage.checked);
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
          this.clicks += 1;
          this.clickDiv.innerHTML = `Количество ходов: ${this.clicks}`;
          if (this.gameStart) {
            this.field.removeEventListener('click');
          }
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

  setTimer() {
    this.field.addEventListener('click', () => {
      this.gameStart = true;
      this.setTimer();
    });
    if (this.gameStart) {
      console.log('startTimer');
      setInterval(() => { this.tick(); }, 1000);
    }
  }

  tick() {
    this.sec += 1;
    if (this.sec >= 60) {
      this.min += 1;
      this.sec = 0;
    }
    if (this.sec < 10) {
      if (this.min < 10) {
        this.timerDiv.innerHTML = `0${this.min}:0${this.sec}`;
      } else {
        this.timerDiv.innerHTML = `${this.min}:0${this.sec}`;
      }
    } else if (this.min < 10) {
      this.timerDiv.innerHTML = `0${this.min}:${this.sec}`;
    } else {
      this.timerDiv.innerHTML = `${this.min}:${this.sec}`;
    }
  }

  restart() {
    this.restartButton.addEventListener('click', () => {
      this.init();
      this.min = 0;
      this.sec = 0;
    });
  }
}

const board = new Board();
board.init();
