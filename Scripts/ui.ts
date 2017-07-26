/// <reference path="app.ts" />

module UI {

    export var mainMenu;

    export class UI {

        constructor() {
            
            this.MainMenu();
            
        }

        MainMenu(): void {
            mainMenu = document.getElementById( "mainMenu" );
            var startGame = document.getElementById( "startGame" );
            
            startGame.onclick = () => {
                mainMenu.style.display = "none";
                UntitledGame.game.state.start( "main-room" );
            }
        }
    }

}