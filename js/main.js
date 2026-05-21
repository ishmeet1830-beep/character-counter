const themeToggleButtons =  document.querySelectorAll(".mode-style");
const textBox = document.getElementById('text-box');
const totalCharcters = document.getElementById("total-charcters");
const wordCount = document.getElementById("word-count");
const sentenceCount = document.getElementById("sentence-count");
const displayMinutesToRead = document.getElementById("display-minutes-to-read");
const limitCheckBox = document.getElementById("limit");
const maxNumberLimit =  document.querySelector(".max-number-limit");
const inputBox = document.getElementById("input-box");
const displayLimitCharacters = document.getElementById('display-limit-characters');
const excludeSpaceCheckBox = document.getElementById("space");
const densityListContainer = document.getElementById("density-list");
const densityEmptyState = document.querySelector(".density-no-characters");

const wordPerMinute = 20;
let isSpaceExcluded = false;


themeToggleButtons.forEach( function (singleButton) {
	singleButton.addEventListener("click", function () {
		document.documentElement.classList.toggle("light");
	})
})

textBox.addEventListener("input", function (event) {

	const value = event.target.value;
	calculateLetterDensity(value);
	// totalCharcters.innerText = value.length < 10 ? `0${value.length}` : value.length;
	calculateExcludeSpace();

	const words = value.split(" ");
	const filteredWords = words.filter( function ( singleWord){
		return singleWord;
	})
	wordCount.innerText = filteredWords.length < 10 ? `0${filteredWords.length}` : filteredWords.length;

	const sentence = value.split(".");
	const filteredSentence = sentence.filter( function ( singleWord){
		return singleWord;
	})
	sentenceCount.innerText = filteredSentence.length < 10 ? `0${filteredSentence.length}` : filteredSentence.length;
	const minutesToRead = filteredWords.length /  wordPerMinute;
	console.log(Math.ceil(minutesToRead) );
	if (Math.ceil(minutesToRead) < 1){
		displayMinutesToRead.innerText = `${Math.ceil(minutesToRead)}` ;
	}
	else{
		displayMinutesToRead.innerText = `<${Math.ceil(minutesToRead)}` ;
	}
	


})

limitCheckBox.addEventListener("input" ,function (event) {
	console.log(event.target.checked);
	if (event.target.checked) {
		maxNumberLimit.style.display = "block";
		// addRemoveErrorClass();

	}
	else{
		maxNumberLimit.style.display = "none";
		textBox.removeAttribute("maxLength")
	}

})


maxNumberLimit.addEventListener("input" , function (event) {
	console.log("event.target.value", event.target.value);
	textBox.maxLength = event.target.value;

	addRemoveErrorClass();

});

excludeSpaceCheckBox.addEventListener("input" , function(event){
	isSpaceExcluded = event.target.checked;
	calculateExcludeSpace();
})

const calculateExcludeSpace = function (){
	if(isSpaceExcluded){
				const message = textBox.value;
		const splittedValues = message.split("");
		const filteredvalues = splittedValues.filter( function ( singlevalue){
			return singlevalue !== " ";
		});
		totalCharcters.innerText = filteredvalues.length < 10 ? `0${filteredvalues.length}` : filteredvalues.length;

		console.log("textBox",filteredvalues.length)
	}
		else{
		totalCharcters.innerText = textBox.value.length < 10 ? `0${textBox.value.length}` : textBox.value.length;
	}
}


const addRemoveErrorClass = function (){
	if(textBox.value.length > maxNumberLimit.value){
		textBox.classList.add("error");
		textBox.nextElementSibling.classList.add("show");
		console.log("textBox.nextSibling", textBox.nextElementSibling);
		displayLimitCharacters.innerText = maxNumberLimit.value;
	}
	else{
		textBox.classList.remove("error");
		textBox.nextElementSibling.classList.remove("show");
	}
}

const calculateLetterDensity = (textAreavalue) => {
	const splittedtextAreavalue = textAreavalue.split("");
	const letterDensity = {};
	splittedtextAreavalue.forEach((singleValue) => {
		const upperCaseValue = singleValue.toUpperCase();
		if(letterDensity[upperCaseValue]){
			letterDensity[upperCaseValue].count++;
			letterDensity[upperCaseValue].percent = (letterDensity[upperCaseValue].count / splittedtextAreavalue.length) * 100;
		} else {
			letterDensity[upperCaseValue] = {
				letter: upperCaseValue,
				count: 1,
				percent: (1 / splittedtextAreavalue.length) * 100
			};
		}
	});

	const letterDensityValues = Object.values(letterDensity);

	const letterDensityHTMLMarkup = letterDensityValues.map((letterDensity) => {
		return `
				<div class="letter-density">
					<label for="W">${letterDensity.letter}</label>
					<div class="progress-bar">
						<span class="bar" style="width: ${letterDensity.percent.toFixed(2)}%"></span>
					</div>
					<p>${letterDensity.count} (${letterDensity.percent.toFixed(2)}%)</p>
				</div>
		`;
	}).join("");

	densityListContainer.innerHTML = letterDensityHTMLMarkup;

	if(letterDensityHTMLMarkup.length > 0){
		densityEmptyState.style.display = "none";
	}else {
		densityEmptyState.style.display = "block";
	}


}