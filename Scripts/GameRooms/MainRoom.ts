/// <reference path="../GameObjects/ProgressBar.ts" />

module GameRooms {
	export class MainRoom extends Phaser.State {

		constructor() {
			super();
		}

		create() {
			// Show the menu
			UI.ui.roomMenu.show();
		}

		update() {
		}

		shutdown() {
			UI.ui.roomMenu.hide();
		}
	}
}
