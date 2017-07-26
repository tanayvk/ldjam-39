module GameRooms {
	export class GameOver extends Phaser.State {

		hasWon: boolean;

		constructor(hasWon) {
			super();
		}

		init(hasWon) {
			this.hasWon = hasWon;
			this.game.add.sprite(0, 0, "game-over");
		}

		preload() {
		}

		create() {
		}

	}
}
