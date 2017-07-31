/// <reference path="../app.ts" />

module GameObjects {
    export class WorldGenerator {

        partSize: number;
        dimension: number;

        loadedParts: Array<Array<Part>>;

        constructor(partSize, dimension) {
            this.partSize = partSize;
            this.dimension = dimension;


            // Initialize loadedParts
            this.loadedParts = [];
            for (var i = 0; i < this.dimension; i++) {
                var column: Array<Part> = [];
                for(var j = 0; j < this.dimension; j++) {
                    column.push(null);
                }
                this.loadedParts.push(column);
            }
            
        }

        generateArea(x, y) {
            
        }

        clearArea(x, y) {
            
        }

        loadPart(part: Part) {
            // console.log("loading part...", part.x, part.y);
            var area = part.getArea(this.dimension);

            this.clearArea(area.x, area.y);
            this.generateArea(area.x, area.y);

            this.loadedParts[area.x][area.y] = part;
        }

        generateWorld() {
            UntitledGame.game.world.setBounds(0, 0, this.dimension*this.partSize, this.dimension*this.partSize);
            for( var i = 0; i < this.dimension; i++ ) {
                for ( var j = 0; j < this.dimension; j++ ) {
                    this.loadPart(new Part(i, j));
                }
            }
            this.loadPart(new Part(2, 2));
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