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
	this.questionNumber = 0;
}

Bartender.prototype.addQuestion = function(questionFlavor,questionText){
	this.questions.push(new Question(questionFlavor, questionText));
}

Bartender.prototype.displayQuestion = function(){
	var i = this.questionNumber;
	var text = this.questions[i].text;

	$(".bartender-form").html("");
	//todo - just update the text, leave the input on the page
	$(".bartender-form").html(text+"<input class=\"bartender-input\" type=\"text\" autofocus><input type=\"submit\">");
}

Bartender.prototype.incrementQuestion = function(){
	this.questionNumber +=1;
}

Bartender.prototype.recordResponse = function(resp){
	var i = this.questionNumber;
	var success = false;
		if(resp === "y"){
			this.questions[i].preference = true;
			success = true;
		}
		else if(resp === "n"){
			this.questions[i].preference = false;
			success = true;
		}
		else alert("Please just respond \"y\" or \"n\" for now");
	return success;
}


Bartender.prototype.createDrink = function(){
	$(".bartender-form").html("");

	var result = "";
	this.questions.forEach(function(oneQuestion){
		if (oneQuestion.preference){
			var flavor = oneQuestion.flavor;
			var bound = pantry.flavors[flavor].ingredients.length;
			var rand = Math.floor(Math.random() * bound);
			result += pantry.flavors[flavor].ingredients[rand].name+" ";
		}
	});
	$(".bartender-form").html("Here's your drink: "+result);

}


var Question = function(flavor, text){
	this.flavor = flavor;
	this.text = text;
	this.preference = null;
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

//display the first question
$("#start").click(function(){
	blackbeard.displayQuestion();
});


//when submitting a response
$(".bartender-form").submit(function(event){
	//prevent the page from refreshing
	event.preventDefault();
	//get the response from the text box
	var response = $(this).children(".bartender-input").val();
	//record the response and store the return value
	var success = blackbeard.recordResponse(response);
	//if the record was successful ("y" or "n")
	if (success){
		//increase the question counter by 1
		blackbeard.incrementQuestion();
		//if we're not on the last question
		if(blackbeard.questionNumber !== blackbeard.questions.length){
			//display the next question
			blackbeard.displayQuestion();
		}
		else blackbeard.createDrink();
	}
	//else do nothing
});


});



