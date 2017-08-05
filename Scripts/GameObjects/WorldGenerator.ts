/// <reference path="../app.ts" />

module GameObjects {
    export class WorldGenerator {

        partSize: number;
        dimension: number;

        sprites: Array<Array<Array<Phaser.Sprite>>>;

        loadedParts: Array<Array<Part>>;

        constructor(partSize, dimension) {
            this.partSize = partSize;
            this.dimension = dimension;


            // Initialize loadedParts
            this.sprites = [];
            this.loadedParts = [];
            for (var i = 0; i < this.dimension; i++) {
                var column: Array<Part> = [];
                var column2: Array<Array<Phaser.Sprite>> = [];
                for(var j = 0; j < this.dimension; j++) {
                    column.push(null);
                    column2.push([]);
                }
                this.loadedParts.push(column);
                this.sprites.push(column2);
            }
        }

        generateArea(x, y) {
            
            this.placePlanet(x, y); 
            // this.placePlanet(x, y); 

        }

        placePlanet(x, y) {

            var planet = new GameObjects.Planet(0, 0);

            var startX = Math.max(UntitledGame.game.width, x * this.partSize + planet.sprite.width/2);
            var endX = Math.min(this.dimension * this.partSize - UntitledGame.game.width, startX + this.partSize - planet.sprite.width);
            var startY = Math.max(UntitledGame.game.height, y * this.partSize + planet.sprite.height/2);
            var endY = Math.min(this.dimension * this.partSize - UntitledGame.game.height, startY + this.partSize - planet.sprite.height);

            var sprites = this.sprites[x][y];

            do {
                
                planet.sprite.x = startX + Math.random() * (endX - startX);
                planet.sprite.y = startY + Math.random() * (endY - startY);

                loop2: 
                    for (var i = 0; sprites && i < sprites.length; i++) {
                        var sprite = sprites[i];
                        if ( UntitledGame.game.physics.arcade.collide(planet.sprite, sprite) )
                        {
                            planet.sprite.x = planet.sprite.y = 0;
                            break loop2;
                        }
                    }

            } while (planet.sprite.x == 0 && planet.sprite.y == 0);


            this.sprites[x][y].push(planet.sprite);
            console.log(planet.sprite.x, planet.sprite.y, planet.sprite.x - this.partSize*this.dimension, planet.sprite.y - this.partSize*this.dimension);
        }

        clearArea(x, y) {
            var sprites = this.sprites[x][y];

            if (sprites.length < 1)
                return;

            sprites.forEach(sprite => {
                sprite.destroy();
            });
        }

        loadPart(part: Part) {
            var area = part.getArea(this.dimension);

            this.clearArea(area.x, area.y);
            this.generateArea(area.x, area.y);

            this.loadedParts[area.x][area.y] = part;
        }

        generateWorld() {
            UntitledGame.game.world.setBounds(0, 0, this.dimension*this.partSize, this.dimension*this.partSize);
            // for( var i = 0; i < this.dimension; i++ ) {
            //     for ( var j = 0; j < this.dimension; j++ ) {
            //         this.loadPart(new Part(i, j));
            //     }
            // }
        }

        coordGetPart( x, y ) {
            var part: Part = new Part(Math.floor(x / this.partSize), Math.floor(y / this.partSize));
            return part;
        }

        spriteGetPart( sprite ) {
            var part: Part = new Part(Math.floor(sprite.x / this.partSize), Math.floor(sprite.y / this.partSize));
            return part;
        }

        partExists(part: Part): boolean {
            var area = part.getArea(this.dimension);
            if (this.loadedParts[area.x][area.y] && this.loadedParts[area.x][area.y].equals(part))
                return true;
            
            return false;
        }
    }

    export class Part {

        x: number;
        y: number;

        constructor( x: number, y: number ) {
            this.x = x;
            this.y = y;
        }

        getArea(dimension) : Part {
            var part = new Part(0, 0);
            
            part.x = this.x % dimension;
            if (part.x < 0)
                part.x += dimension;

            part.y = this.y % dimension;
            if (part.y < 0)
                part.y += dimension;
            
            return part;
        }

        equals(part: Part) : boolean {
            if(this.x === part.x && this.y === part.y)
                return true;

            return false;
        }

    }
}