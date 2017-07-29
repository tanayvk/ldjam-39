/// <reference path="../GameObjects/ProgressBar.ts" />
/// <reference path="../GameObjects/SpaceShip.ts" />

module GameRooms {
	export class MainRoom extends Phaser.State {

		spaceShip: GameObjects.SpaceShip;

		constructor() {
			super();
		}

		create() {
			// Show the menu
			UI.ui.roomMenu.show();

			this.spaceShip = new GameObjects.SpaceShip(100, 100);
		}

		update() {

			this.spaceShip.update();
			
		}

		shutdown() {
			UI.ui.roomMenu.hide();
		}
	}
}
