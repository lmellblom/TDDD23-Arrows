var GAME = GAME || {};

GAME.Boot = function() {};

GAME.Boot.prototype = {
	preload: function() {

	},
	create: function() {
        // scales everything!!!
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  

        /*this.scale.minWidth = gameWidth/2;
        this.scale.minHeight = gameHeight/2;*/
        // funkar ej på mobiler om jag har såhär men ser snyggare ut i webben!!
       /* this.scale.maxWidth = gameWidth;
        this.scale.maxHeight = gameHeight; */

        this.scale.pageAlignVertically = true;
        //this.scale.pageAlignHorizontally = true;
        this.scale.updateLayout(true);

        this.state.start('Preload');
	}
};
