var Pong = {};
Pong.Boot = function(game) {};
Pong.Boot.prototype = {
    preload: function() {
    },
    create: function() {
        console.log("Boot");

        // Reponsive and centered canvas
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.minWidth = 320;
        this.scale.minHeight = 200;
        this.scale.maxWidth = 720;
        this.scale.maxHeight = 450;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.scale.setScreenSize(true);

        this.state.start('Preloader');
    }
};
