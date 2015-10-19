var GAME = GAME || {};

GAME.Boot = function() {};

GAME.Boot.prototype = {
	preload: function() {
        // load the backgrounds
        this.load.image('background', 'assets/extraLargeBack.png');
        this.load.image('spaceBackground', 'assets/extraLargeSpace.png');
        this.load.image('rainbowBackground', 'assets/extraLargeBackRainbow.png');

        this.load.image('arrowHeader', 'assets/header.png');

        // loading bar
        this.load.image('progressBase', 'assets/game-ui/Base.png');
        this.load.image('progressBack', 'assets/game-ui/Bg.png');
        this.load.image('progressGreen', 'assets/game-ui/progressGreen.png');
	},
	create: function() {
        // scales everything!!!
        this.input.maxPointers = 1;

        // funkar ej på mobiler om jag har såhär men ser snyggare ut i webben!!
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize=true;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  
        this.scale.updateLayout(true);

        this.state.start('Preload');
    }    
};
