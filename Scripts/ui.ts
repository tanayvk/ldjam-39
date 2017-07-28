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
        constructor() {
            super();

            this.menu = document.getElementById( "roomMenu" );
            
            var pauseButton = document.getElementById( "pauseButton" );
            var pauseMenu = document.getElementById( "pauseMenu" );
            var pauseOverlay = document.getElementById( "pauseOverlay" ); 

            var continueButton = document.getElementById( "continueButton" );
            var backButton = document.getElementById( "backButton" );

            pauseButton.onclick = () => {
                UntitledGame.game.paused = true;

                pauseMenu.style.display = "block";
                pauseOverlay.style.display = "block";

                pauseButton.classList.add( "button-no-hover" );
                pauseButton.classList.remove( "button" );
            }

            continueButton.onclick = () => {
                UntitledGame.game.paused = false;
                
                pauseMenu.style.display = "none";
                pauseOverlay.style.display = "none";

                pauseButton.classList.add( "button" );
                pauseButton.classList.remove( "button-no-hover" );

            }

            backButton.onclick = () => {
                UntitledGame.game.paused = false;
                UntitledGame.game.state.start( "main-menu" );
            }

            pauseOverlay.style.display = "none";
            pauseMenu.style.display = "none";
            this.hide();
        }
    }

}