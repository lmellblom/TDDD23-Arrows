var GAME = GAME || {};

GAME.Level2 = function() {};

GAME.Level2.prototype = {
	create: function() {
		//  We're going to be using physics, so enable the Arcade Physics system
	    this.physics.startSystem(Phaser.Physics.ARCADE);

	    //  A simple background for our game
	    //this.add.sprite(0, 0, 'sky'); //73FF8F
	    this.game.stage.backgroundColor = '#FF9266';

	    //  The platforms group contains the ground and the 2 ledges we can jump on
	    platforms = this.add.group();

	    //  We will enable physics for any object that is created in this group
	    platforms.enableBody = true;

	    // Here we create the ground.
	    var ground = platforms.create(0, this.world.height - 64, 'ground');

	    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    ground.scale.setTo(2, 2);

	    //  This stops it from falling away when you jump on it
	    ground.body.immovable = true;

	    //  Now let's create two ledges
	    var ledge = platforms.create(400, 400, 'ground');

	    ledge.body.immovable = true;

	    ledge = platforms.create(-150, 250, 'ground');

	    ledge.body.immovable = true;

	    // The player and its settings
	    player = this.add.sprite(32, this.world.height - 150, 'dude');

	    //  We need to enable physics on the player
	    this.physics.arcade.enable(player);

	    //  Player physics properties. Give the little guy a slight bounce.
	    player.body.bounce.y = 0.2;
	    player.body.gravity.y = 300;
	    player.body.collideWorldBounds = true;

	    //  Our two animations, walking left and right.
	    player.animations.add('left', [0, 1, 2, 3], 10, true);
	    player.animations.add('right', [5, 6, 7, 8], 10, true);

	    //  Finally some stars to collect
	    stars = this.add.group();

	    //  We will enable physics for any star that is created in this group
	    stars.enableBody = true;

	    //  Here we'll create 12 of them evenly spaced apart
	    for (var i = 0; i < 8; i++)
	    {
	        //  Create a star inside of the 'stars' group
	        var star = stars.create(i * 70, 0, 'star');

	        //  Let gravity do its thing
	        star.body.gravity.y = 300;

	        //  This just gives each star a slightly random bounce value
	        star.body.bounce.y = 0.7 + Math.random() * 0.2;
	    }


	    // the order is important so that this is displayed over everything
	    // create score text
	    scoreText = this.add.text(16,16, 'score: 0',  {fontSize: '32px', fill: '#000'});

	    qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);

	    cursors = this.input.keyboard.createCursorKeys();

	    // only debugmode to make the level in one keypress
	    nKey = this.input.keyboard.addKey(Phaser.Keyboard.N);

	    // add the diamond that will be visible after you have cleared the level
		diamond = this.add.sprite(32, this.world.height - 150, 'diamond');
	    this.physics.arcade.enable(diamond);
	    diamond.visible = false;


	},
	update: function() {

		// collide the player and the stars with the platform
	    this.physics.arcade.collide(player,platforms);
	    this.physics.arcade.collide(stars, platforms);

	     //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
	    this.physics.arcade.overlap(player, stars, this.collectStar, null, this);

	    this.physics.arcade.overlap(player, diamond, this.nextLevel, null, this);

	    //  Reset the players velocity (movement)
	    player.body.velocity.x = 0;

	    if (cursors.left.isDown)
	    {
	        //  Move to the left
	        player.body.velocity.x = -150;

	        player.animations.play('left');
	    }
	    else if (cursors.right.isDown)
	    {
	        //  Move to the right
	        player.body.velocity.x = 150;

	        player.animations.play('right');
	    }
	    else
	    {
	        //  Stand still
	        player.animations.stop();

	        player.frame = 4;
	    }

	    //  Allow the player to jump if they are touching the ground.
	    if (cursors.up.isDown && player.body.touching.down)
	    {
	        player.body.velocity.y = -350;
	    }
	    else if(cursors.down.isDown) {
	        player.body.velocity.y = 400; // go faster when pressing down button
	    }

	    // checking if you have cleared the first level, add the diamond to go to the next level
	    if (score == 80 && !diamond.visible) {
	    	// add a diamond..
	    	diamond.visible = true;
	    }

	    // quit to the menu
	    if (qKey.isDown) {
	    	this.quitGame(null); 
	    }
	    if (nKey.isDown) {
	    	diamond.visible=true;
	    	this.nextLevel(player,diamond);
	    }

	},

	nextLevel: function(player, diamond) {
		if (diamond.visible) {
			madeLevels[1] = true;
			this.resetForNextLevel();
			console.log("next level");
			this.state.start('MainMenu');
		}
	},
	collectStar: function(player, star) {
		// Removes the star from the screen
	    star.kill();

	    // add and update the score
	    score += 10;
	    scoreText.text = 'Score: ' + score;
	},
	resetForNextLevel : function() {
		diamond.visible = false;
		score = 0;
	},

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }
};
