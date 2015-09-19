/*
see tutorial http://codetowin.io/tutorials/nback-game-states-and-menus/
*/

var GAME = GAME || {};

var gameWidth = 448;
var gameHeight =  640; // 520 640+520 = 1160 // 1181 är bakgrunden
var backgroundHeight = 1181; 


GAME.game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '');

var player;
var numberOfLevels = 15;

//localStorage.clear();

// init that you have not made any levels yet!! OR get from the storage if the user have been on the site before !!!! 
  var madeLevels = []; // a list that holds if the levels is done or not (t/f)
  var madeLevelsStars = [];
  for (var i=0; i<numberOfLevels; i++) {
  	madeLevels[i]=false;
    madeLevelsStars[i] = 0;
  }
if ( localStorage.getItem("arrowMadeLevels")!=null ) {
  var mL = JSON.parse(localStorage.getItem("arrowMadeLevels"));
  var mLS = JSON.parse(localStorage.getItem("arrowLevelStars"));
  for (var i=0; i<mL.length; i++) {
    madeLevels[i] = mL[i];
    madeLevelsStars[i] = mLS[i];
  }
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
var allLevelData;

// variables that specifies if the backgroundm music and the clicks should be playes
var playMusic = true;
var backCalmMusic = true;
var backgroundMusicPlayer;
var clickSound;

	    var grids = [
	    	{"width": 5, "height": 8}
	    ];


// add all the states that the game has
GAME.game.state.add('Boot', GAME.Boot);
GAME.game.state.add('Preload', GAME.Preload);
GAME.game.state.add('MainMenu', GAME.MainMenu);
GAME.game.state.add('Finished', GAME.FinishedLevels);
GAME.game.state.add('Level', GAME.LevelCreator);
GAME.game.state.add('Credits', GAME.Credits);
GAME.game.state.add('SelectLevels', GAME.SelectLevels);


//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
   // active: function() { GAME.game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Carter One', 'Skranji']
    }

};

var generalStyle = { font: "25px Carter One", fill: "#FFF", align: "center",
 stroke: "#000", strokeThickness: 5 };
  var mediumStyle = { font: "18px Carter One", fill: "#FFF", align: "center",
 stroke: "#000", strokeThickness: 4 };

 var smallStyle = { font: "14px Carter One", fill: "#FFF", align: "center",
 stroke: "#000", strokeThickness: 3 };


// begin with the preloading
GAME.game.state.start('Boot');