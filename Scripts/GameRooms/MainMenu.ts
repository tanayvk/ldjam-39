module GameRooms {
	export class MainMenu extends Phaser.State {

		constructor() {
			super();
		}

		preload() {
		}

		create() {
			UI.ui.mainMenu.show();
		}

		shutdown() {
			UI.ui.mainMenu.hide();
		}
	}
}
