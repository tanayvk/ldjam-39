module GameRooms {
	export class Boot extends Phaser.State {

		constructor() {
			super();
		}

		preload() {
			this.game.load.image("loaderBar", "Assets/images/loader_bar.png");
		}

		create() {
			this.game.stage.backgroundColor = "#000";
			this.game.stage.disableVisibilityChange = true; // doesn't pause the game on changing focus
			this.game.physics.startSystem( Phaser.Physics.ARCADE );

			this.game.state.start( "loader" );
		}

	}
}
