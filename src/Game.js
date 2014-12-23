Pong.Game = function(game){
    
    this.ball;
    this.ballDiameter = 40;
    
    //Player 1 defintions
    this.playerRight;
    this.playerRightUp;
    this.playerRightDown;
    this.playerRightSpeed = 8;
    this.playerRightMaxLife = 10;
    this.playerRightActualLife = 0;

    //Player 2 defintions
    this.playerLeft;
    this.playerLeftUp;
    this.playerLeftDown;
    this.playerLeftSpeed = 8;
    this.playerLeftMaxLife = 10;
    this.playerLeftActualLife = 0;
    
    // Scoreboard definitions
    var scoreLeft;
    var scoreRight; 
};
Pong.Game.prototype = {
    create: function() {
        console.log("Game Started");
        // Activate Physics Engine
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.checkCollision.right = false;
        this.physics.arcade.checkCollision.left = false;
        
        // set background image
        this.add.sprite(0, 0, 'gameBackground');

        // Create ball
        this.ball = this.add.sprite(this.world.centerX-this.ballDiameter/2, this.world.centerY-this.ballDiameter/2, 'ball', 'assets/ball.png');
        // Add physics to ball
        this.physics.enable(this.ball, Phaser.Physics.ARCADE);
        this.ball.checkWorldBounds = true;
        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.set(1);
        
        this.ball.body.velocity.x = 200 * ((Math.random() > 0.5) ? -1 :  1);
        this.ball.body.velocity.y = Math.random() * 100 * ((Math.random() > 0.5) ? -1 :  1);
        this.ball.events.onOutOfBounds.add(this.ballLost, this);

        // Create player right
        this.playerRight = this.add.sprite(this.world.width - (4*16), (this.world.height-30)/2, 'playerRight');
        this.physics.enable(this.playerRight, Phaser.Physics.ARCADE);
        this.playerRight.body.immovable = true;
        
        // Create player left
        this.playerLeft =  this.add.sprite(3*16, (this.world.height-30)/2, 'playerLeft');
        this.physics.enable(this.playerLeft, Phaser.Physics.ARCADE);
        this.playerLeft.body.immovable = true;
        
        // Add input keyboard controller
        this.playerLeftUp = this.input.keyboard.addKey(Phaser.Keyboard.W);
        this.playerLeftDown = this.input.keyboard.addKey(Phaser.Keyboard.S);
        this.playerRightUp = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.playerRightDown = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        // Render scoreboard
        var scoreLeftText = String(this.playerLeftActualLife);
        var styleLeft = { font: "40px Arial", fill: "#ffffff", align: "left" };
        this.scoreLeft = this.add.text(40, 0, scoreLeftText, styleLeft);
        
        var scoreRightText = String(this.playerRightActualLife);
        var styleRight = { font: "40px Arial", fill: "#ffffff", align: "right" };
        this.scoreRight = this.add.text(this.world.width - 80, 0, scoreRightText, styleRight);

    },
    update: function() {
        if (this.playerLeftUp.isDown)
        {
            if ( this.playerLeft.y > 0 )
                this.playerLeft.y-=this.playerLeftSpeed;
            
        }
        else if (this.playerLeftDown.isDown)
        {
            if (this.playerLeft.y + this.playerLeft.height < this.world.height)
                this.playerLeft.y+=this.playerLeftSpeed;
        }

        if (this.playerRightUp.isDown)
        {
            if ( this.playerRight.y > 0 )
               this.playerRight.y-=this.playerRightSpeed;
        }
        else if (this.playerRightDown.isDown)
        {
            if (this.playerRight.y + this.playerRight.height < this.world.height)
                this.playerRight.y+=this.playerRightSpeed;
        }
        
        this.physics.arcade.collide(this.ball, this.playerLeft, this.hitPlayerLeft, null, this);
        this.physics.arcade.collide(this.ball, this.playerRight, this.hitPlayerRight, null, this);
    },
    hitPlayerLeft: function(_ball, _player) {
        var diff = 0;

        if (_ball.x < _player.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = _player.x - _ball.x;
            _ball.body.velocity.x = (-10 * diff);
        }
        else if (_ball.x > _player.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = _ball.x -_player.x;
            _ball.body.velocity.x = (10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            _ball.body.velocity.x = 2 + Math.random() * 8;
        }
    },
    
    
    hitPlayerRight: function(_ball, _player)  {       
        var diff = 0;

        if (_ball.x < _player.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = _player.x - _ball.x;
            _ball.body.velocity.x = (-10 * diff);
        }
        else if (_ball.x > _player.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = _ball.x -_player.x;
            _ball.body.velocity.x = (10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            _ball.body.velocity.x = 2 + Math.random() * 8;
        }
    },
    
    ballLost: function() {
        
        if (this.ball.body.x < 0)
            this.playerLeftActualLife++;
        else
            this.playerRightActualLife++;
        console.log( "Score: Left " + this.playerLeftActualLife + " Right: " + this.playerRightActualLife);
        
        if (this.playerLeftActualLife === this.playerLeftMaxLife || this.playerRightActualLife === this.playerRightMaxLife)
        {
            this.gameOver();
        }
        else
        {
            this.scoreRight.setText(String(this.playerRightActualLife));
            this.scoreLeft.setText(String(this.playerLeftActualLife));
            this.ball.reset(this.world.centerX-this.ballDiameter/2, this.world.centerY-this.ballDiameter/2);
            this.ball.body.velocity.x = 200 * ((Math.random() > 0.5) ? -1 :  1);
            this.ball.body.velocity.y = Math.random() * 100 * ((Math.random() > 0.5) ? -1 :  1);
        }

    },    
    
    gameOver: function() {
        console.log("Game Over");
        var styleRight = { font: "80px Arial", fill: "#ff0000", align: "center" };
        this.scoreRight = this.add.text(200, this.world.height/2, "Game Over", styleRight);
    }
};