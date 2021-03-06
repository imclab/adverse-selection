function parseQuestions(txtData){
	var lines = txtData.replace(/(\r)/gm, "").split('\n');
	var questions = new Array();
	var currentSection = new Array();
	for (var i = 0; i < lines.length; i ++){
		// check for new section
		if (lines[i][0] == '#'){
			// don't add blank section if first line
			if (i != 0){
				questions.push(currentSection);
			}
			currentSection = []
			currentSection.push(htmlEncode(lines[i].substring(1)));
		}
		// check for new question
		else if (lines[i] == '' && lines[i + 2] != ''){
			var currentQuestion = new Array($.trim(lines[i + 1]), lines[i + 2], $.trim(lines[i + 3]));	
			currentSection.push(currentQuestion);
			i += 3;
		}
	}
	//push final section and return questions
	questions.push(currentSection);
	return questions;
}

function parseAnswers(txtData){
	var lines = txtData.replace(/(\r)/gm, "").split('\n');
	var answers = new Array();
	// add trimmed lines to answers array
	for (var i = 0; i < lines.length; i ++){
		answers.push($.trim(lines[i]));
	}
	return answers;
}

function htmlEncode(value){
    if (value){
        return jQuery("<div />").text(value).html();
    }
	else{
        return "";
    }
}