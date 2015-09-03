var GAME = GAME || {};

GAME.LevelCreatorJump = function() {};

GAME.LevelCreatorJump.prototype = {

	init: function(levelSelector) { // add a custom variable to tell which level to load. 
		//var customParam1 = 'level1JSON';
		var levelName = "level" + levelSelector + "JSON";

		this.currentLevel = levelSelector; 

		// load the leveldata for this particular level. 
		this.levelData = JSON.parse(this.game.cache.getText(levelName)); 
	}, 

	create: function() {
		//  We're going to be using physics, so enable the Arcade Physics system
	    this.physics.startSystem(Phaser.Physics.ARCADE);

	    //  A simple background for our game -> this will add a background image instead. this.add.sprite(0, 0, 'sky'); //73FF8F
	    //this.game.stage.backgroundColor = '#73FF8F';
	    this.add.sprite(0, 0, 'sky');

	    //  The platforms group contains the ground and the 2 ledges we can jump on
	    platforms = this.add.group();

	    //  We will enable physics for any object that is created in this group
	    platforms.enableBody = true;

	    // Here we create the ground. (the same for all levels!!)
	    var ground = platforms.create(0, this.world.height - 64, 'ground');

	    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
	    ground.scale.setTo(2, 2);

	    //  This stops it from falling away when you jump on it
	    ground.body.immovable = true;

	    //  Now let's create the ledges
	    this.levelData.ledgeData.forEach(function(element){
	    	platforms.create(element.x, element.y, 'ground');
	    }, this);
	    platforms.setAll('body.immovable', true);

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

	    this.levelData.starsData.forEach(function(element){
	    	var star = stars.create(element.x, element.y, 'star');
	    }, this);
		stars.setAll('body.gravity.y', 300);
		stars.setAll('body.bounce.y', 0.7 + Math.random() * 0.2); //  This just gives each star a slightly random bounce value

	    // the order is important so that this is displayed over everything
	    // create score text
	    scoreText = this.add.text(16,16, 'score: 0',  {fontSize: '32px', fill: '#000'});

	    qKey = this.input.keyboard.addKey(Phaser.Keyboard.Q);

	    // only debugmode to make the level in one keypress
	    nKey = this.input.keyboard.addKey(Phaser.Keyboard.N);

	    cursors = this.input.keyboard.createCursorKeys();

	    // add the diamond that will be visible after you have cleared the level // use the level creator json file, goal variable
		diamond = this.add.sprite(this.levelData.goal[0].x, this.levelData.goal[0].y, 'diamond');
	    this.physics.arcade.enable(diamond);
	    diamond.visible = false;

	    this.maxScore = this.levelData.starsData.length * 10;


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
	    if (score == this.maxScore && !diamond.visible) {
	    	// add a diamond..
	    	diamond.visible = true;
	    }

	    // quit to the menu
	    if (qKey.isDown) {
	    	this.state.start('MainMenu');
	    }
	    if (nKey.isDown) {
	    	diamond.visible=true;
	    	this.nextLevel(player,diamond);
	    }

	},

	nextLevel: function(player, diamond) {
		if (diamond.visible) {
			madeLevels[this.currentLevel-1] = true; // currentlevel is 1,2,3 etc and indexing start at 0
			this.resetForNextLevel();
			this.currentLevel++; // the current level is now 1

			// check if you reached the end level, therefore you should go back to the menu instead numberOfLevels
			if (this.currentLevel <= numberOfLevels) 
				this.state.start('Level', true, false, '2');
			else 
				this.quitGame();
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
