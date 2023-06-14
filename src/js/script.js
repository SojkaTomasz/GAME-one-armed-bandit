class Games {
	constructor(cash) {
		this.color = document.querySelectorAll('.color');
		this.btnStart = document.querySelector('#start');
		this.btnRestart = document.querySelector('#restart');
		this.input = document.querySelector('#bid');
		this.result = document.querySelector('.result');
		this.wallet = document.querySelector('.wallet');
		this.number = document.querySelector('.number');
		this.win = document.querySelector('.win');
		this.loss = document.querySelector('.loss');
		this.error = document.querySelector('.error');
		this.whenLost = document.querySelector('.when-lost');
		this.walletCash = cash;
		this.numberGames = 0;
		this.numberWin = 0;
		this.numberLoss = 0;
		this.wallet.textContent = `${this.walletCash}$`;
		this.number.textContent = this.numberGames;
		this.win.textContent = this.numberWin;
		this.loss.textContent = this.numberLoss;
		this.drawResult = [];
		this.btnStart.addEventListener('click', this.inputValue.bind(this));
		this.btnRestart.addEventListener('click', () => location.reload());
		window.addEventListener('keydown', this.clickEnterStart.bind(this));
	}

	//START GRY NA ENTER
	clickEnterStart(e) {
		if (e.keyCode == 13) {
			this.inputValue();
		}
	}

	//SPRAWDZENIE WARTOŚCI INPUT
	inputValue() {
		this.inputTxt = this.input.value;
		const errorSond = new Audio('../audio/error.wav');
		if (this.inputTxt == '') {
			this.error.textContent = 'Musisz podać wartość stawki!';
			errorSond.play();
		} else if (this.inputTxt <= 0) {
			this.error.textContent = 'Stawka musi być większa niż 0!';
			errorSond.play();
		} else if (this.walletCash < this.inputTxt) {
			this.error.textContent = 'Masz za mało środków!';
			errorSond.play();
		} else {
			this.draw();
		}
	}

	//LOSOWANIE / WYŚWIETLENIE LOSOWANIA / DODANIE WARTOŚCI DO TABLICY
	draw() {
		this.error.textContent = '';
		this.drawResult.length = 0;
		this.color.forEach((item) => {
			const numberDrawn = Math.floor(Math.random() * 3);
			if (numberDrawn == 0) {
				item.style.backgroundColor = '#2CD3E1';
				item.innerHTML = '<i class="fa-solid fa-sack-dollar"></i>';
				this.drawResult.push(0);
			} else if (numberDrawn == 1) {
				item.style.backgroundColor = '#A459D1';
				item.innerHTML = '<i class="fa-solid fa-bomb"></i>';
				this.drawResult.push(1);
			} else {
				item.style.backgroundColor = '#F266AB';
				item.innerHTML = '<i class="fa-solid fa-gift"></i>';
				this.drawResult.push(3);
			}
		});
		this.gameResult();
	}

	//WARUNKI WYGRANEJ/PRZEGRANEJ
	gameResult() {
		this.numberGames++;
		this.number.textContent = this.numberGames;
		if (
			this.drawResult[0] == this.drawResult[1] &&
			this.drawResult[1] == this.drawResult[2]
		) {
			this.winer();
		} else if (
			this.drawResult[0] !== this.drawResult[1] &&
			this.drawResult[1] !== this.drawResult[2] &&
			this.drawResult[0] !== this.drawResult[2]
		) {
			this.winer();
		} else {
			this.lost();
		}
		this.input.value = '';
	}

	//WYGRANA
	winer() {
		const winnerSong = new Audio('../audio/winer.wav');
		winnerSong.play();
		this.numberWin++;
		this.win.textContent = this.numberWin;
		this.result.textContent = `Wygrałeś: +${this.inputTxt * 3}$`;
		this.result.style.color = '#2CD3E1';
		this.walletCash += this.inputTxt * 3;
		this.wallet.textContent = `${this.walletCash}$`;
	}

	//PRZEGRANA
	lost() {
		this.numberLoss++;
		this.loss.textContent = this.numberLoss;
		this.result.textContent = `Przegrałeś: -${this.inputTxt}$`;
		this.result.style.color = '#F266AB';
		this.walletCash -= this.inputTxt;
		this.wallet.textContent = `${this.walletCash}$`;
		if (this.walletCash !== 0) {
			const lostSong = new Audio('../audio/lost.wav');
			lostSong.play();
		}
		//JEŻELI STAN KONTA WYNOSI 0
		if (this.walletCash === 0) {
			this.whenLost.style.display = 'flex';
			window.addEventListener('keydown', this.clickEnterRestart.bind(this));
			const gameOverSong = new Audio('../audio/game-over.wav');
			gameOverSong.play();
		}
	}

	//RESET GRY NA ENTER
	clickEnterRestart(e) {
		if (e.keyCode == 13) {
			location.reload();
		}
	}
}

const click = new Games(100);
