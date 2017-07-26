module GameRooms {
	export class MainMenu extends Phaser.State {

		constructor() {
			super();
		}

		preload() {
		}

		create() {
			UI.mainMenu.style.display = "block";
		}
	}
}
