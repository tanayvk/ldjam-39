module GameRooms {
	export class Loader extends Phaser.State {

		constructor() {
			super();
		}

		init() {
		}

		preload() {
			var loaderBar = this.game.add.sprite( this.game.world.centerX - 128, this.game.world.centerY + 256, "loaderBar" );
			this.game.load.setPreloadSprite( loaderBar );

			this.game.load.image( "spaceship", "Assets/Images/spaceship.png" );
			this.game.load.image( "enemyship", "Assets/Images/enemyship.png" );
			this.game.load.image( "planet", "Assets/Images/planet.png" );
			this.game.load.image( "bomb", "Assets/Images/bomb.png" );
		}

		create() {
			this.game.state.start( "main-menu" );
		}

	}
}
