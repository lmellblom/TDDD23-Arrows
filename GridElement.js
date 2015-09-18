function GridElement(sprite, type, selected, direction, color) {
	this.sprite = sprite;
	this.isSelected = selected || false;
	this.type = type || "empty"; // kanske typ empty, arrow, goal, hole
	this.direction = direction || "";
	this.color = color || "";

	// downpink, down, 
	this.textureName = function(c) {
		var color = c || this.color; 
		// beroende på is selected
		var name = (this.type == "arrow"? this.direction : this.type);
		name    += (this.isSelected ?  color : "");

		if (this.type == "star") {
			name = "star" + this.color;
		}
		else if(this.type == "hole") {
			name = "blackHole";
		}

		return name;
	};

	this.setType = function (type, dir) {
		this.type = type;

		var direction = dir || "";
		this.direction = direction;

		if(type != "empty")
			this.setSpriteAlpha(1.0);
	}

	this.isType = function(name) {
		return this.type==name;

	}

	this.isGoal = function() {
		return this.type=="goal";
	}

	this.isHole = function() {
		return this.type == "hole";
	}

	this.setSelected = function(s) {
		this.isSelected = s;
	}

	this.setActive = function (condition, col) {
		this.color = col || this.color;
		this.isSelected = condition;

		var alphaValue = condition ? 1.0 : (this.type=="arrow" || this.type=="hole") ? 1.0 : 0.4;
		this.setSpriteAlpha(alphaValue);

		this.changeTexture();
	}

	this.isStar = function() {
		return this.type == "star";
	}

	this.isArrow = function() {
		return this.type == "arrow";
	}

	this.setSpriteAlpha = function(alpha) {
		var a = alpha || 1.0;
		this.sprite.alpha = a; 
	}

	this.setColor = function(color) {
		this.color = color;
	}

	this.resetToEmpty = function() {
		this.isSelected = false;
		this.color = "";
		this.type = "empty";
		this.setSpriteAlpha(0.4);
		this.changeTexture();
	}

	this.changeTexture = function(col) {
		var color = col || this.color;  
		this.sprite.loadTexture(this.textureName(color),0);
	}

}