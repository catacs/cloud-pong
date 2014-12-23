Pong.MainMenu = function(game) {};
Pong.MainMenu.prototype = {
    create: function() {
        console.log("MainMenu");
        // Set Game title 
        
        this.add.sprite(0,0,'menuBackground');
        this.add.sprite((320-221)/2, 40, 'title');
        this.add.button(Pong.GAME_WIDTH/2, Pong.GAME_HEIGHT/2, 'button-start', this.startGame, this, 1, 0, 2);
        
    },
    startGame: function() {
        this.state.start('Game');
    }
};