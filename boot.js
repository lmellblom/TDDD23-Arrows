var GAME = GAME || {};

GAME.Boot = function() {};

GAME.Boot.prototype = {
	preload: function() {

	},
	create: function() {
        // scales everything!!!
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;    
        // funkar ej på mobiler om jag har såhär men ser snyggare ut i webben!!
        this.scale.pageAlignVertically = true;
        if (this.game.device.desktop) {
                //code for desktop devices
                this.scale.minWidth = gameWidth/2;
                this.scale.minHeight = gameHeight/2;
                this.scale.maxWidth = gameWidth;
                this.scale.maxHeight = gameHeight;
        } else {
                //code for mobile devices
                //this.scale.setScreenSize=true;
        }

        //this.scale.pageAlignHorizontally = true;
        this.scale.updateLayout(true);

        this.state.start('Preload');
        }
        
};
