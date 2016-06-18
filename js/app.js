$(document).ready(function(){



var Ingredient = function (name){
	this.name = name;
}

var Flavor = function (name, ingredients){
	this.name = name;
	this.ingredients = ingredients;
}

var pantry = {
	flavors:{},
	addFlavor : function(name,ingredientInputs){
		var ingredients = [];
		ingredientInputs.forEach(function(input){
			ingredients.push(new Ingredient(input));
		});
		var flavor = new Flavor(name, ingredients); 

		this.flavors[flavor.name] = flavor;
	}
};

var Bartender = function (name){
	this.name = name;
	this.questions = [];
}

Bartender.prototype.addQuestion = function(questionFlavor,questionText){
	this.questions.push(new Question(questionFlavor, questionText));
}

var Question = function(flavor, text){
	this.flavor = flavor;
	this.text = text;
	this.preference = false;
}

var blackbeard = new Bartender("Blackbeard");

//init pantry
pantry.addFlavor("salty",["olives","bacon","salt"]);
pantry.addFlavor("sweet",["sugar","honey","cola"]);
pantry.addFlavor("fruity",["orange","cassis","cherry"]);
pantry.addFlavor("bitter",["bitters","tonic","lemon"]);
pantry.addFlavor("strong",["rum","whiskey","gin"]);

//init questions
blackbeard.addQuestion("strong", "Do ye like yer drinks strong?");
blackbeard.addQuestion("salty", "Do ye like it with a salty tang?");
blackbeard.addQuestion("bitter","Are ye a lubber who likes it bitter?");
blackbeard.addQuestion("sweet","Would ye like a bit of sweetness with yer poison?");
blackbeard.addQuestion("fruity","Are ye one for a fruity finish?");


console.log(pantry);
console.log(blackbeard);

});



