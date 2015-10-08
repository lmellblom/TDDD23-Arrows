var generateLevel = function() {
	var jsonObj = {};

	// add arrows
	jsonObj.arrows = [];
	var arrowColor = "blue";
	var nrArrows;
	for (var i=0; i<nrArrows; i++){
		var x,y, dir, selected; // get from something
		var arrow = {"x": x, "y":y, "dir": dir, "selected":selected, "color": arrowColor};
		jsonObj.arrows.push(arrow);
	}

	// add stars?
	jsonObj.stars = [];
	var nrStars = 0;
	var starColor = "pink";
	for (var i=0; i<nrStars; i++){
		var x,y; // get from something
		var star = {"x": x, "y":y, "color": starColor};
		jsonObj.stars.push(star);
	}

	// add black holes? 
	jsonObj.blackHole = [];
	// for each black hole
	var nrBlackHoles = 0;
	for (var i=0; i<nrBlackHoles; i++){
		var x,y; // get from something
		var hole = {"x": x, "y":y};
		jsonObj.blackHole.push(hole);
	}

	// add goalInfo
	var goalX, goalY, goalColor;
	jsonObj.goalInfo = [
		{"x": goalX, "y":goalY, "color":goalColor}
	];

	// add tip
	jsonObj.tip = "Jippeeeey";

	// add best
	jsonObj.best = 1;

	// add nrWidth
	jsonObj.nrWidth = 1;
	// add nrHeight	
	jsonObj.nrHeight = 1;

	return jsonObj; 
};