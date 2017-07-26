/// <reference path="../GameObjects/ProgressBar.ts" />

module GameRooms {
	export class MainRoom extends Phaser.State {

		constructor() {
			super();
		}

		create() {
			new GameObjects.Player(100, 100);
		}

		update() {
		}
	}
}
