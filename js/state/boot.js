"use strict";
var orientated = false;
window.PhaserDemo.state.boot = {
    init: function () {
        //checks whether the device is mobile or desktop
        if (!this.game.device.desktop) {
            //centers the canvas
            this.scale.pageAlignVertically = true;
            this.scale.pageAlignHorizontally = true;

            // forces orientation. First parameter is for landscape, 2nd - portrait. Enable only one
            this.scale.forceOrientation(true, false);
            //orientation change callback functions
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }

    },
	preload: function(){
		// set world size
		this.game.world.setBounds(0, 0, mt.data.map.worldWidth, mt.data.map.worldHeight);
		
		// enable resize
		this.enableFitScreen();
		
		//init mt helper
		mt.init(this.game);
		
		//set background color - true (set also to document.body)
		mt.setBackgroundColor(true);
		
		// load assets for the Loading group ( if exists )
		mt.loadGroup("Loading");
	},
	create: function(){
		// add all game states
		for(var stateName in window.PhaserDemo.state){
			this.game.state.add(stateName, window.PhaserDemo.state[stateName]);
		}
		
		// goto load state
		this.game.state.start("load");
	},
	
	
	// reference to fit screen function - used to remove resize later
	_fitScreen: null,
	enableFitScreen: function(){
		var game = this.game;
		
		var resizeGame = this._fitScreen = function() {
			game.scale.setShowAll();
			game.scale.refresh();
		};
		
		window.addEventListener('resize', resizeGame, false);
		
		resizeGame();
	},
	disableFitScreen: function(){
		window.removeEventListener('resize', this._fitScreen);
	},
    //both functions change the orientation variable and settings of the 'orientation' div in index.html
    enterIncorrectOrientation: function() {

        orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

	leaveIncorrectOrientation: function() {

	    orientated = true;

	    document.getElementById('orientation').style.display = 'none';

	}
};
