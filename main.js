/*
see tutorial http://codetowin.io/tutorials/nback-game-states-and-menus/
*/

var GAME = GAME || {};

var gameWidth = 400;
var gameHeight =  650;

GAME.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '');

var player;

var numberOfLevels = 2;

var madeLevels = []; // a list that holds if the levels is done or not (t/f)

// init that you have not made any levels yet!!
for (var i=0; i<numberOfLevels; i++) {
	madeLevels[i]=false;
}

var menuGroup;
var qKey;
var nKey;
var cursors;
var arrowGroup;
var goal;
var arrow;
var obstacleGroup;
var availableMoves;


// add all the states that the game has
GAME.game.state.add('Boot', GAME.Boot);
GAME.game.state.add('Preload', GAME.Preload);
GAME.game.state.add('MainMenu', GAME.MainMenu);
GAME.game.state.add('Level', GAME.LevelCreator);
GAME.game.state.add('Credits', GAME.Credits);
GAME.game.state.add('SelectLevels', GAME.SelectLevels);

// begin with the preloading
GAME.game.state.start('Boot');