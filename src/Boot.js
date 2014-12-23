var Pong = {};
Pong.Boot = function(game) {};
Pong.Boot.prototype = {
    preload: function() {
    },
    create: function() {
        console.log("Boot");
        this.state.start('Preloader');
    }
};
