/// <reference path="../GameObjects/ProgressBar.ts" />
/// <reference path="../GameObjects/SpaceShip.ts" />

module GameRooms {
	export class MainRoom extends Phaser.State {

		spaceShip: GameObjects.SpaceShip;
		worldGenerator: GameObjects.WorldGenerator;

		shipPreviousPart: GameObjects.Part = new GameObjects.Part(0, 0);

		PART_SIZE: number = 1920;
		DIMENSION: number = 12;

		enemies: Array<GameObjects.EnemyShip>;

		constructor() {
			super();
		}

		init() {
			GameObjects.worldGenerator = this.worldGenerator = new GameObjects.WorldGenerator(this.PART_SIZE, this.DIMENSION);
			this.worldGenerator.generateWorld();
			UntitledGame.game.add.tileSprite(0, 0, this.PART_SIZE*this.DIMENSION, this.PART_SIZE*this.DIMENSION, 'background-full');
		}

		create() {
			// Show the menu
			UI.ui.roomMenu.show();

			GameObjects.spaceShip = this.spaceShip = new GameObjects.SpaceShip(this.game.world.width/2, this.game.world.height/2);
			UntitledGame.game.world.camera.follow(this.spaceShip.sprite);
			this.shipPreviousPart = this.worldGenerator.coordGetPart(this.spaceShip.sprite.x, this.spaceShip.sprite.y);

			GameObjects.enemies = this.enemies = [];
			this.createEnemies();

		}

		update() {

			this.spaceShip.update();
			this.wrapShip(this.spaceShip, -400);

			this.enemies.forEach(enemy => {
				this.wrapShip(enemy, 0);
			});

			var shipCurrentPart = this.worldGenerator.coordGetPart(this.spaceShip.wrappedX + this.spaceShip.sprite.x, this.spaceShip.wrappedY + this.spaceShip.sprite.y);
			if (!this.shipPreviousPart.equals(shipCurrentPart)) {
				this.shipPreviousPart = shipCurrentPart;
				setTimeout(this.shipChangedPart(shipCurrentPart), 5);
				//console.log(this.worldGenerator.partExists(shipCurrentPart));
			}

		}

		render() {
			// UntitledGame.game.debug.text(this.spaceShip.apparentX + " " + this.spaceShip.apparentY, 30, 700);
			// UntitledGame.game.debug.text(this.enemies[0].apparentX + " " + this.enemies[0].apparentY, 30, 760);
			// UntitledGame.game.debug.text(Math.atan2(this.enemies[0].sprite.body.velocity.y, this.enemies[0].sprite.body.velocity.x), 30, 780);
		}

		shutdown() {
			UI.ui.roomMenu.hide();
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
			var enemy = new GameObjects.EnemyShip(500, 500);
			this.enemies.push(enemy);
		}

	}
}
