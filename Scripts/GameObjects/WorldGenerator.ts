/// <reference path="../app.ts" />

module GameObjects {
    export class WorldGenerator {

        partSize: number;
        dimension: number;

        sprites: Array<Array<Array<Phaser.Sprite>>>;

        loadedParts: Array<Array<Part>>;

        PADDING = 200;

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

        }

        placePlanet(x, y) {
            var startX = x * this.partSize + this.PADDING;
            var endX = startX + this.partSize - 2 * this.PADDING;
            var startY = y * this.partSize + this.PADDING;
            var endY = startY + this.partSize - 2 * this.PADDING;

            var sprites = this.sprites[x][y];

            var planet = null;
            do {
                
                var planetX = startX + Math.random() * (endX - startX);
                var planetY = startY + Math.random() * (endY - startY);

                planet = new GameObjects.Planet(planetX, planetY);

                loop2: 
                    for (var i = 0; sprites && i < sprites.length; i++) {
                        var sprite = sprites[i];
                        if ( UntitledGame.game.physics.arcade.collide(planet.sprite, sprite) )
                        {
                            planet = null;
                            break loop2;
                        }
                    }

            } while (planet == null);


            this.sprites[x][y].push(planet.sprite);
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
            console.log("loading part...", part.x, part.y);
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