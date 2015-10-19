/*
	A class that handles the grid elements. Holds what color, type and different attributes.
	Also holds a reference to the sprite.
*/

// kanske göra denna klassen att ärva av phaser sprite istället?? hmmm måste ha en reference till game?? whyyy

/*function GridElement(sprite, type, selected, direction, color) {


	//Phaser.Sprite.call(this,game,x,y, 'texureName');

	this.sprite = sprite; // a reference to the sprite element 
	this.isSelected = selected || false;
	this.type = type || "empty"; // Can be empty, arrow, goal, hole , splash ? etc.
	this.direction = direction || "";
	this.color = color || "";

	this.texture=this.textureName();

	Phaser.Sprite.call()

};
*/

function GridElement(sprite, type, selected, direction, color) {
	this.isSelected = selected || false;
	this.type = type || "empty"; // Can be empty, arrow, goal, hole , splash ? etc.
	this.direction = direction || "";
	this.color = color || "";
	this.sprite = sprite;

	//this.texture=this.textureName();

	//Phaser.Sprite.call(this, game, x, y, this.texture);

};

//GridElement.prototype = Object.create(Phaser.Sprite.prototype);
//GridElement.prototype.constructor = GridElement;

/*
	A class that handles the grid elements. Holds what color, type and different attributes.
	Also holds a reference to the sprite.
*/

// kanske göra denna klassen att ärva av phaser sprite istället?? hmmm

function GridElement(sprite, type, selected, direction, color) {
	this.sprite = sprite; // a reference to the sprite element 
	this.isSelected = selected || false;
	this.type = type || "empty"; // Can be empty, arrow, goal, hole , splash ? etc.
	this.direction = direction || "";
	this.color = color || "";
};

GridElement.prototype.textureName = function(c) {
	var color = c || this.color; 
	var name = (this.type == "arrow"? this.direction : this.type);
	name += (this.isSelected ?  color : "");

	if (this.type == "star" || this.type=="goal" || this.type=="bucket") {
		name = this.type + this.color;
	}
	else if(this.type == "hole") {
		name = "blackHole";
	}

	return name;
};

GridElement.prototype.setType = function (type, dir) {
	this.type = type;

	var direction = dir || "";
	this.direction = direction;

	if(type != "empty")
		this.setSpriteAlpha(1.0);
};

GridElement.prototype.isType = function(name) {
	return this.type==name;
};

GridElement.prototype.isGoal = function() {
	return this.type=="goal";
};

GridElement.prototype.isHole = function() {
	return this.type == "hole";
};

GridElement.prototype.setSelected = function(s) {
	this.isSelected = s;
};

GridElement.prototype.setActive = function (condition, col) {
	this.color = col || this.color;
	this.isSelected = condition;

	var alphaValue = condition ? 1.0 : (this.type=="arrow" || this.type=="hole") ? 1.0 : 0.4;
	this.setSpriteAlpha(alphaValue);

	this.changeTexture();
};

GridElement.prototype.isStar = function() {
	return this.type == "star";
};

GridElement.prototype.isArrow = function() {
	return this.type == "arrow";
};

GridElement.prototype.setSpriteAlpha = function(alpha) {
	var a = alpha || 1.0;
	this.sprite.alpha = a; 
};

GridElement.prototype.setColor = function(color) {
	this.color = color;
};

GridElement.prototype.resetToEmpty = function() {
	this.isSelected = false;
	this.color = "";
	this.type = "empty";
	this.setSpriteAlpha(0.4);
	this.changeTexture();
};

GridElement.prototype.changeTexture = function(col) {
	var color = col || this.color;  
	this.sprite.loadTexture(this.textureName(color),0);
};