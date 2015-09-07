/*
see tutorial http://codetowin.io/tutorials/nback-game-states-and-menus/
*/

var GAME = GAME || {};

var gameWidth = 448;
var gameHeight =  640;

GAME.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '');

var player;

var numberOfLevels = 2;

var madeLevels = []; // a list that holds if the levels is done or not (t/f)

// init that you have not made any levels yet!!
for (var i=0; i<numberOfLevels; i++) {
	madeLevels[i]=false;
}

var generalStyle = { font: "35px Arial", fill: "#FFF", align: "center" };

var menuGroup;
var qKey;
var nKey;
var cursors;
var arrowGroup;
var goal;
var arrow;
var obstacleGroup;
var availableMoves;

var allLevelData = [
	{
	    "arrows" : [ 
	        {"x": 1, "y": 1, "dir": "right", "selected": true},
	        {"x": 4, "y": 1, "dir": "down", "selected": false},
	        {"x": 4, "y": 5, "dir": "left", "selected": false},
	        {"x": 0, "y": 5, "dir": "down", "selected": false}
	     ],
	    "goalInfo" : [
	        {"x":0, "y":7}
	    ]
	},
	{
	    "arrows" : [ 
	        {"x": 1, "y": 1, "dir": "down", "selected": true},
	        {"x": 0, "y": 2, "dir": "down", "selected": false},
	        {"x": 3, "y": 2, "dir": "left", "selected": false},
	        {"x": 1, "y": 4, "dir": "right", "selected": false},
	        {"x": 2, "y": 4, "dir": "down", "selected": true},
	        {"x": 3, "y": 4, "dir": "up", "selected": false},
	        {"x": 2, "y": 6, "dir": "up", "selected": false},
	        {"x": 0, "y": 7, "dir": "right", "selected": false}
	     ],
	    "goalInfo" : [
	        {"x": 4, "y": 7}
	    ]
	}
];

	    var grids = [
	    	{"width": 5, "height": 8}
	    ];


// add all the states that the game has
GAME.game.state.add('Boot', GAME.Boot);
GAME.game.state.add('Preload', GAME.Preload);
GAME.game.state.add('MainMenu', GAME.MainMenu);
GAME.game.state.add('Level', GAME.LevelCreator);
GAME.game.state.add('Credits', GAME.Credits);
GAME.game.state.add('SelectLevels', GAME.SelectLevels);

// begin with the preloading
GAME.game.state.start('Boot');