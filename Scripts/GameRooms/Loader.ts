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

			this.game.load.image( "background-blank", "Assets/Images/background-blank.png");
			this.game.load.image( "background-full", "Assets/Images/background-full.png");

			this.game.load.image( "spaceship", "Assets/Images/player-ship.png" );
			this.game.load.image( "enemyship", "Assets/Images/enemy-ship.png" );
			this.game.load.image( "planet", "Assets/Images/planet.png" );
			this.game.load.image( "bomb", "Assets/Images/bomb.png" );

			this.game.load.image( "neptune", "Assets/Images/planets/neptune.png" );
			this.game.load.image( "mars", "Assets/Images/planets/mars.png" );
			this.game.load.image( "venus", "Assets/Images/planets/venus.png" );
			this.game.load.image( "h2o", "Assets/Images/planets/h2o.png" );
			this.game.load.image( "mobo", "Assets/Images/planets/mobo.png" );
			this.game.load.image( "jupiter", "Assets/Images/planets/jupiter.png" );
			this.game.load.image( "uranus", "Assets/Images/planets/uranus.png" );
			this.game.load.image( "stripe", "Assets/Images/planets/stripe.png" );
			this.game.load.image( "pluto", "Assets/Images/planets/pluto.png" );
			this.game.load.image( "wood", "Assets/Images/planets/wood.png" );
			this.game.load.image( "tile", "Assets/Images/planets/tile.png" );
			this.game.load.image( "iris", "Assets/Images/planets/iris.png" );
			this.game.load.image( "earth", "Assets/Images/planets/earth.png" );
			this.game.load.image( "mercury", "Assets/Images/planets/mercury.png" );
			this.game.load.image( "moon", "Assets/Images/planets/moon.png" );
		}

		create() {
			this.game.state.start( "main-menu" );
		}

	}
}
