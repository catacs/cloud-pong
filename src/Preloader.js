Pong.Preloader = function(game){
    Pong.GAME_WIDTH = 800;
    Pong.GAME_HEIGHT = 600;
};
Pong.Preloader.prototype = {
    preload: function() {
        this.load.image('ball', 'assets/ball.png' );
        this.load.image('playerLeft', 'assets/paddle_left.png' );
        this.load.image('playerRight', 'assets/paddle_right.png' );
        this.load.image('menuBackground', 'assets/background.png');
        this.load.image('gameBackground', 'assets/background_game.png');
        this.load.image('title', 'assets/game_title.png' );
        this.load.spritesheet('button-start', 'assets/button-start.png', 196, 70);
    },
    create: function() {
        console.log("Preloader");
        this.state.start('MainMenu');
    }
};