$(document).ready(function(){


//ingredient constructor - take name string
var Ingredient = function (name){
	this.name = name;
}

//flavor constructor - takes name string and ingredients array of Ingredients objects
var Flavor = function (name, ingredients){
	this.name = name;
	this.ingredients = ingredients;
}

var pantry = {
	//array of Flavor objects
	flavors:{},
	//addFlavor - takes flavor name string, array of ingredientInputs strings
	addFlavor : function(name,ingredientInputs){
		var ingredients = [];
		ingredientInputs.forEach(function(input){
			//constructs new ingredient with name string, adds to ingredients array
			ingredients.push(new Ingredient(input));
		});
		//constructs flavor with name and ingredients array
		var flavor = new Flavor(name, ingredients); 

		//adds flavor to pantry's flavors array using local flavor's name as the key
		this.flavors[flavor.name] = flavor;
	}
};

//Bartender constructor - takes name string
var Bartender = function (name){
	this.name = name;
	this.questions = [];
	this.questionCounter = 0;
}

//addQuestion method - takes questionFlavor string and questionText string
Bartender.prototype.addQuestion = function(questionFlavor,questionText){
	//constructs new Question with inputs then pushes into the Bartender's questions array
	this.questions.push(new Question(questionFlavor, questionText));
}

//displayQuestion method - takes no parameters
Bartender.prototype.displayQuestion = function(){
	//get the Bartenders's questionCounter for indexing
	var i = this.questionCounter;
	//get the text for question #i
	var text = this.questions[i].text;

	//clear .bartender-form
	$(".bartender-form").html("");
	//TODO - just update the text, leave the input on the page
	//adds question text to DOM with input field and submit button
$(".bartender-form").html("<h2>"+text+"</h2>"+
	"<input class=\"bartender-input\" type=\"radio\" value=\"yes\">Yarr!<br>"+
	"<input class=\"bartender-input\" type=\"radio\" value=\"no\">No<br>"+
	"<input class=\"btn btn-small\" type=\"submit\">");
}

//incrementQuestion method - take no parameters
Bartender.prototype.incrementQuestion = function(){
	//increase teh questionCounter by 1
	this.questionCounter +=1;
}

//recordResponse method - takes resp string
Bartender.prototype.recordResponse = function(resp){
	//get the Bartenders's questionCounter for indexing
	var i = this.questionCounter;
	//sets default success value
	var success = false;
		//if valid yes input
		if(resp === "yes"){
			//set the question's preference to true
			this.questions[i].preference = true;
			//set success flag to indicate a successful translation
			success = true;
		}
		//if valid no input
		else if(resp === "no"){
			//set the question's preference to false
			this.questions[i].preference = false;
			//set success flag to indicate a successful translation
			success = true;
		}
		//if invalid input, ask user to submit valid response (do not set success flag)
		else alert("Arrgh ye gotta pick yer poison");

	return success;
}

//createDrink method - takes no parameters
Bartender.prototype.createDrink = function(){
	//clear form
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
	$(".bartender-form").html("Here's your drink:<h2>"+result+"</h2>");

}

//Question constructor - takes flavor string and text string
var Question = function(flavor, text){
	this.flavor = flavor;
	this.text = text;
	this.preference = null;
}

//construct new Bartender
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
	var response = $(this).children(".bartender-input:checked").val();
	//record the response and store the return value
	var success = blackbeard.recordResponse(response);
	//if the record was successful ("y" or "n")
	if (success){
		//increase the question counter by 1
		blackbeard.incrementQuestion();
		//if we're not on the last question
		if(blackbeard.questionCounter !== blackbeard.questions.length){
			//display the next question
			blackbeard.displayQuestion();
		}
		//if we are on the last question, make the drink
		else blackbeard.createDrink();
	}
	//else do nothing
});


});



