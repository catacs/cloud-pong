(function() {
    var game = new Phaser.Game(720, 450, Phaser.AUTO, 'game');
    game.state.add('Boot', Pong.Boot);
    game.state.add('Preloader', Pong.Preloader);
    game.state.add('MainMenu', Pong.MainMenu);
    game.state.add('Game', Pong.Game);
    game.state.start('Boot');
})();