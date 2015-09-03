/*
see tutorial http://codetowin.io/tutorials/nback-game-states-and-menus/
*/

var GAME = GAME || {};

GAME.game = new Phaser.Game(800, 600, Phaser.AUTO, '');

var player;
var platforms;
var cursors;
var stars;

var score = 0; // holds the score on the current level you are on
var scoreText;

var numberOfLevels = 2;

var madeLevels = []; // a list that holds if the levels is done or not (t/f)

// init that you have not made any levels yet!!
for (var i=0; i<numberOfLevels; i++) {
	madeLevels[i]=false;
}

var menuGroup;
var diamond;
var qKey;
var nKey;

// add all the states that the game has
GAME.game.state.add('Preload', GAME.Preload);
GAME.game.state.add('MainMenu', GAME.MainMenu);
GAME.game.state.add('Level', GAME.LevelCreatorJump);
GAME.game.state.add('Credits', GAME.Credits);
GAME.game.state.add('SelectLevels', GAME.SelectLevels);

// begin with the preloading
GAME.game.state.start('Preload');