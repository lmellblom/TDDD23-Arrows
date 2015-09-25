var GAME = GAME || {};

GAME.Boot = function() {};

GAME.Boot.prototype = {
	preload: function() {
        //this.load.image('background', 'assets/game-ui/bgSmaller.png');
        //this.load.image('background', 'assets/game-ui/background_wide.png');
        //this.load.image('spaceBackground', 'assets/space.jpg');

        this.load.image('background', 'assets/extraLargeBack.png');
        this.load.image('spaceBackground', 'assets/extraLargeSpace.png');


        this.load.image('mascotIcon', 'assets/mascot/beaver.png');

        this.load.image('progressBase', 'assets/game-ui/Base.png');
        this.load.image('progressBack', 'assets/game-ui/Bg.png');
        this.load.image('progressGreen', 'assets/game-ui/progressGreen.png');

        this.load.image('bubbleText', 'assets/bubble.png');
	},
	create: function() {
        // scales everything!!!
        this.input.maxPointers = 1;


          
        // funkar ej på mobiler om jag har såhär men ser snyggare ut i webben!!
        this.scale.pageAlignVertically = true;
        this.scale.setScreenSize=true;
         this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;  

        if (this.game.device.desktop) {
               
                //code for desktop devices
                /*this.scale.minWidth = gameWidth/2;
                this.scale.minHeight = gameHeight/2;
                this.scale.maxWidth = gameWidth;
                this.scale.maxHeight = gameHeight;*/
        } else {
                //this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
                //code for mobile devices
               // this.scale.setScreenSize=true;
                //this.scale.maxWidth = gameWidth;
                //this.scale.maxHeight = gameHeight
        }

        //this.scale.pageAlignHorizontally = true;
        this.scale.updateLayout(true);

        this.state.start('Preload');
        }
        
};
