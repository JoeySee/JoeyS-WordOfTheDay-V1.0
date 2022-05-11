var wordBox;
let defBox;
var phoneticsDiv;
var synoBox;
var antoBox;
let defUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
let wordInfo = [];
let currentDef = 0;
let currentSyno = 0;
let currentAnto = 0;
let currentVer = 0;
let currentPhone = 0;
let partOfSpeechVer = 0;

window.onload = function(){
	wordBox = document.getElementById("word");
	defBox = document.getElementById("definition");
	phoneticsDiv = document.getElementById("phonetics");
	synoBox = document.getElementById("synonym");
	antoBox = document.getElementById("antonym");
	
	getWord();
}


// get the word from the word of the day API, and then feed the word to the dictionaAPI
// if the word doesn't have a def, it finds a new word
function getWord(){
	wordBox.innerHTML = "GENERATING...";
	defBox.innerHTML = "";
	phoneticsDiv.innerHTML = "";
	synoBox.innerHTML = "";
	antoBox.innerHTML = "";
	phoneticsDiv.innerHTML = "";
	document.getElementById("src").innerHTML = "";
	
	
	fetch("https://random-word-api.herokuapp.com/word")
		.then(response => response.json())
		.then(data => fetch(defUrl + data))
		.then(response => response.json())
		.then(data => displayInfo(data, 0))
		.catch(function(){
			getWord();
		});
}

// function defineWord(word){
	// fetch(defUrl + word)
		// .then(response => response.json())
		// .then(data => displayWord(data))
		// .catch(function(){
			// getWord();
		// });	
// }

function displayInfo(defObj, ver){
	currentDef = 0;
	wordInfo = defObj;
	partOfSpeechVer = ver;
	
	defBox.innerHTML = "";
	wordBox.innerHTML = "";
	
	console.log(wordInfo);
	
	wordBox.innerHTML = wordInfo[0].word;
	
	defBox.innerHTML += "<br>" + wordInfo[0].meanings[ver].definitions[0].definition + "<br>";
	
	document.getElementById("src").innerHTML = "<a href=" + wordInfo[0].sourceUrls[0] + " class='button'>" + wordInfo[0].sourceUrls[0]+ "<a>";
	
	if(wordInfo[0].meanings[ver].synonyms[0] == undefined){
		synoBox.innerHTML = "";
	} else {
		synoBox.innerHTML = wordInfo[0].meanings[ver].synonyms[0];
	}
	
	if(wordInfo[0].meanings[ver].antonyms[0] == undefined){
		antoBox.innerHTML = "";
	} else{
		synoBox.innerHTML = wordInfo[0].meanings[ver].antonym[0];	
	}
	
	document.getElementById("partOfSpeech").innerHTML = wordInfo[0].meanings[ver].partOfSpeech;
	
	if(wordInfo[0].phonetics[0] != undefined){
		phoneticsDiv.innerHTML = wordInfo[0].phonetic;
	} else{
		phoneticsDiv.innerHTML = "";
	}
}

function changeDef(){
	
	try{
		console.log(wordInfo[0])
		currentDef++;
		
		if(currentDef > wordInfo.length){
			currentDef = 0;
		}
		
		defBox.innerHTML = wordInfo[0].meanings[partOfSpeechVer].definitions[currentDef].definition;
	} catch{
		changeDef();
	}
	
}

function changeSyno(){
	currentSyno++;
	
	if(currentSyno >= wordInfo[0].meanings[partOfSpeechVer].synonyms.length){
		currentSyno = 0;
	}
	
	if(wordInfo[0].meanings[partOfSpeechVer].synonyms[0] == undefined){
		synoBox.innerHTML = "";
	} else {
		synoBox.innerHTML = wordInfo[0].meanings[partOfSpeechVer].synonyms[0];
	}
}

function changeAnto(){
	currentAnto++;
	
	if(currentAnto >= wordInfo[0].meanings[partOfSpeechVer].antonyms.length){
		currentAnto = 0;
	}
	
	if(wordInfo[0].meanings[partOfSpeechVer].antonyms[0] == undefined){
		antoBox.innerHTML = "";
	} else{
		synoBox.innerHTML = wordInfo[0].meanings[partOfSpeechVer].antonym[0];	
	}
}

function playSound(){
	if(wordInfo[0].phonetics[0] == undefined || wordInfo[0].phonetics[0].audio == ""){
		alert("No Audio File");
	} else{
		document.getElementById("phoneticNoise").innerHTML = "<audio controls><source src=" + wordInfo[0].phonetics[currentPhone].audio + "></audio>";
		
		document.getElementById("phoneticNoise").play();
	}
}

function changePOS(){
	
		console.log(wordInfo[0])
		currentVer++;
		
		if(currentVer >= wordInfo[0].meanings.length){
			currentVer = 0;
		}
		
		displayInfo(wordInfo, currentVer);
}

function changePhone(){
	console.log("foobar");
	if(wordInfo[0].phonetics != undefined){
		currentPhone++;
	
		if(currentPhone >= wordInfo.length){
			currentPhone = 0;
		}
		
		phoneticsDiv.innerHTML =  wordInfo[0].phonetics[currentPhone].text;
	}
	
	
}

