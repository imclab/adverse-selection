var questions = new Array(); // stores: [answer id, question, image number]
var deck = new Array(); // stores: shuffled question indexes

function loadQuestions(callback){
    // TODO: Load XML Files here
	$.ajax("resources/questions/questions.xml", {
        complete: (function (JQXML, status){
            finishLoadingQuestions(JQXML, callback);
        })
    });
}

function finishLoadingQuestions(JQXML, callback){
    var XMLDoc = JQXML.responseXML;
    var questionSets = PlistParser.parse(XMLDoc);
	// create questions from only active categories
	for (var i = 0; i < questionSets.length; i ++){
		if ($.inArray(i, disabledCategories) == -1){
			questionSets[i].shift() //remove title of category
			questions = questions.concat(questionSets[i]);
		}
	}
    // shuffle questions
    makeDeck();
    callback("questions");
}

function makeDeck(){
    questionLengthPlusOne = questions.length;
    for (var i = 0; i < questionLengthPlusOne; i++){
        randomNumber = Math.floor(Math.random() * questionLengthPlusOne);
        deck.splice(randomNumber, 0, i)
    }
}

function getNextQuestion(){
    // if no question to get, create questions
    if (deck.length == 0){
        makeDeck();
    }
    // otherwise, get next question
    var nextCard = deck.pop();
    return questions[nextCard];
}