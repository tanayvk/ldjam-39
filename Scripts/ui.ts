/// <reference path="app.ts" />

module UI {
    export var ui: UI;

    export class UI {
        public mainMenu: Menu;
        public roomMenu: Menu;

        constructor() {
            this.mainMenu = new MainMenu();
            this.roomMenu = new RoomMenu();
        }
    }


    class Menu {
        menu: HTMLElement;

        show(): void {
            this.menu.style.display = "block";
        }

        hide(): void {
            this.menu.style.display = "none";
        }
    }

    // Menus
    
    class MainMenu extends Menu {
        constructor() {
            super();

            this.menu = document.getElementById( "mainMenu" );
            var startGame = document.getElementById( "startGameButton" );
            
            startGame.onclick = () => {
                UntitledGame.game.state.start( "main-room" );
            }
            
            this.hide();
        }
    }

    class RoomMenu extends Menu {
        pauseButton = document.getElementById( "pauseButton" );
        pauseMenu = document.getElementById( "pauseMenu" );
        pauseOverlay = document.getElementById( "pauseOverlay" ); 

        continueButton = document.getElementById( "continueButton" );
        backButton = document.getElementById( "backButton" );

        constructor() {
            super();

            this.menu = document.getElementById( "roomMenu" );
            

            this.pauseButton.onclick = () => {
                this.pauseGame();
            }

            this.continueButton.onclick = () => {
                this.unpauseGame();
            }

            this.backButton.onclick = () => {
                UntitledGame.game.paused = false;
                UntitledGame.game.state.start( "main-menu" );
            }

            this.pauseOverlay.style.display = "none";
            this.pauseMenu.style.display = "none";
            this.hide();
        }

        hide(): void {
            this.unpauseGame();
        }

        pauseGame(): void {
                UntitledGame.game.paused = true;

                this.pauseMenu.style.display = "block";
                this.pauseOverlay.style.display = "block";

                this.pauseButton.classList.add( "button-no-hover" );
                this.pauseButton.classList.remove( "button" );
        }

        unpauseGame(): void {
            UntitledGame.game.paused = false;
            
            this.pauseMenu.style.display = "none";
            this.pauseOverlay.style.display = "none";

            this.pauseButton.classList.add( "button" );
            this.pauseButton.classList.remove( "button-no-hover" );
        }
    }
}