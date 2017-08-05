/// <reference path="3rdParty/phaser.d.ts" />

/// <reference path="GameRooms/Boot.ts" />
/// <reference path="GameRooms/Loader.ts" />
/// <reference path="GameRooms/MainMenu.ts" />
/// <reference path="GameRooms/MainRoom.ts" />
/// <reference path="GameRooms/GameOver.ts" />

module UntitledGame {
	export var game;
	export var tweenManager;

	export class Game {

		constructor() {
			game = new Phaser.Game( 800, 800, Phaser.CANVAS, 'game', {
				create: this.create
			} );

		}

		create() {
			game.state.add( "boot", GameRooms.Boot );
			game.state.add( "loader", GameRooms.Loader );
			game.state.add( "main-menu", GameRooms.MainMenu );
			game.state.add( "main-room", GameRooms.MainRoom );
			game.state.add( "game-over", GameRooms.GameOver );

			game.state.start( "boot" );

			game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
		}

	}
}

window.onload = () => {

	new UntitledGame.Game();
	UI.ui = new UI.UI();

}
