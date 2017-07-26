module GameRooms {
	export class Loader extends Phaser.State {

		constructor() {
			super();
		}

		init() {
		}

		preload() {
			var loaderBar = this.game.add.sprite(this.game.world.centerX - 128, this.game.world.centerY + 256, "loaderBar");
			this.game.load.setPreloadSprite(loaderBar);
		}

		create() {
		}

	}
}
