/// <reference path="../GameObjects/ProgressBar.ts" />
/// <reference path="../GameObjects/SpaceShip.ts" />

module GameRooms {
	export class MainRoom extends Phaser.State {

		spaceShip: GameObjects.SpaceShip;
		worldGenerator: GameObjects.WorldGenerator;

		shipPreviousPart: GameObjects.Part;

		PART_SIZE: number = 1000;
		DIMENSION: number = 5;

		enemies: Array<GameObjects.EnemyShip>;

		constructor() {
			super();
		}

		init() {
			GameObjects.worldGenerator = this.worldGenerator = new GameObjects.WorldGenerator(this.PART_SIZE, this.DIMENSION);
			this.worldGenerator.generateWorld();
		}

		create() {
			// Show the menu
			UI.ui.roomMenu.show();

			GameObjects.spaceShip = this.spaceShip = new GameObjects.SpaceShip(this.game.world.width/2, this.game.world.height/2);
			UntitledGame.game.world.camera.follow(this.spaceShip.sprite);
			this.shipPreviousPart = this.worldGenerator.coordGetPart(this.spaceShip.sprite.x, this.spaceShip.sprite.y);


			this.createPlanets();
			this.createEnemies();

		}

		update() {

			this.spaceShip.update();
			this.wrapShip(this.spaceShip, -150);

			this.enemies.forEach(enemy => {
				this.wrapShip(enemy, 0);
			});

			var shipCurrentPart = this.worldGenerator.coordGetPart(this.spaceShip.wrappedX + this.spaceShip.sprite.x, this.spaceShip.wrappedY + this.spaceShip.sprite.y);
			if (!this.shipPreviousPart.equals(shipCurrentPart)) {
				this.shipPreviousPart = shipCurrentPart;
				this.shipChangedPart(shipCurrentPart);
				//console.log(this.worldGenerator.partExists(shipCurrentPart));
			}

		}

		render() {
			UntitledGame.game.debug.text(this.spaceShip.apparentX + " " + this.spaceShip.apparentY, 30, 700);
			UntitledGame.game.debug.text(this.enemies[0].apparentX + " " + this.enemies[0].apparentY, 30, 760);
		}

		shutdown() {
			UI.ui.roomMenu.hide();
		}

		createPlanets() {
			var planet = new GameObjects.Planet(600, 600);
		}

		shipChangedPart(currentPart: GameObjects.Part) {
			var startX = currentPart.x - 1;
			var startY = currentPart.y - 1;
			for(var i = 0; i < 3; i++) {
				for(var j = 0; j < 3; j++) {
					var part = new GameObjects.Part(startX + i, startY + j);
					if(!this.worldGenerator.partExists(part))
						this.worldGenerator.loadPart(part);

				}
			}
		}

		wrapShip(ship, padding) {
			var size = this.PART_SIZE*this.DIMENSION;

			if (ship.sprite.x + padding < UntitledGame.game.world.bounds.x)
			{
				ship.sprite.x = UntitledGame.game.world.bounds.right + padding;
				ship.wrappedX -= size;
			}
			else if (ship.sprite.x - padding > UntitledGame.game.world.bounds.right)
			{
				ship.sprite.x = UntitledGame.game.world.bounds.left - padding;
				ship.wrappedX += size;
			}

			if (ship.sprite.y + padding < UntitledGame.game.world.bounds.top)
			{
				ship.sprite.y = UntitledGame.game.world.bounds.bottom + padding;
				ship.wrappedY -= size;

			}
			else if (ship.sprite.y - padding > UntitledGame.game.world.bounds.bottom)
			{
				ship.sprite.y = UntitledGame.game.world.bounds.top - padding;
				ship.wrappedY += size;
			}
		}

		createEnemies() {
			GameObjects.enemies = this.enemies = [];

			var enemy = new GameObjects.EnemyShip(500, 500);
			this.enemies.push(enemy);
		}

	}
}
