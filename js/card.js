var first_select = "";
var second_select = "";
var first_select_element = null;
var second_select_element = null;
var matchNum = 0;
var totalNeedMatch = 0;

function flip(event) {
	var element = event.currentTarget;
	/* Toggle the setting of the classname attribute */
	element.className = 'card flipped';
	element.setAttribute("onclick","");

	var back = element.getElementsByTagName("img");
	if(first_select != "" && second_select != ""){
		first_select = "";
		second_select = "";
		first_select_element = null;
		second_select_element = null;
	}

	if(first_select != ""){
		second_select = back[1].alt;
		second_select_element = element;
	}
	else if (first_select == ""){
		first_select = back[1].alt ;
		first_select_element = element;
	}

	if (first_select == second_select && first_select != "" && second_select !=""){
		disableOnclick();
		setTimeout('matched(first_select_element, second_select_element)' ,1100);

	}

	else if(first_select != second_select && first_select != "" && second_select != ""){
		disableOnclick();
		setTimeout('notMatchedFlipBack(first_select_element, second_select_element)' ,1100);
	}

	else if(first_select == "" || second_select == ""){
		//setTimeout('notMatchedFlipBack(first_select_element, second_select_element)' ,2000);
	//	setTimeout('notMatchedFlipBack(first_select_element, second_select_element)' ,2000);
	}
}

function notMatchedFlipBack(a, b){
	a.className = 'card';
	b.className = 'card';
	a.setAttribute("onclick","flip(event)");
	b.setAttribute("onclick","flip(event)");
	enableOnclick();
}

function matched(a, b){
	matchNum += 1;
	//a.className = (a.className == 'card') ? 'card flipped' : 'card';
	a.className ='card flipped match';
	//b.className = (b.className == 'card') ? 'card flipped' : 'card';
    b.className = 'card flipped match';
	$(".match").stop().animate({opacity: "0"});
	a.parentNode.id = "placeHolder";
	b.parentNode.id = "placeHolder";
	setTimeout('removeMatchNodes()',500);
	//removeMatchNodes();
}

function removeMatchNodes(){
	first_select_element.parentNode.removeChild(first_select_element);
	second_select_element.parentNode.removeChild(second_select_element);
	enableOnclick();
	if(matchNum == totalNeedMatch){
		var cards_container = document.getElementById('cards_container');
		var placeholders = document.all("placeHolder");
		for (var i = 0; i < placeholders.length; i++){
			cards_container.removeChild(placeholders[i]);
		}
		var gamedone = document.createElement("div");
		gamedone.setAttribute("id","gamedone");
		var congrats = document.createElement("div");
		congrats.setAttribute("id","congrats");
		congrats.innerHTML = "Congratulations! <br/> You have completed this game!"
		var ul = document.createElement("ul");
		var li1 = document.createElement("li");
		var a1 = document.createElement("a")
		a1.setAttribute("href","/");
		a1.innerHTML = "Back Home";
		li1.appendChild(a1);
		var li2 = document.createElement("li");
		var a2 = document.createElement("a");
		a2.setAttribute("href","/memory-cards");
		a2.innerHTML = "Play Again";
		li2.appendChild(a2);
		ul.appendChild(li1);
		ul.appendChild(li2);
		gamedone.appendChild(congrats);
		gamedone.appendChild(ul);
		cards_container.appendChild(gamedone);
	}
}

function disableOnclick(){
	var allCards = document.all("card");
	for(var u =0; u<allCards.length; u++){
		allCards[u].setAttribute("onclick", "");
	}
}

function enableOnclick(){
	var allCards = document.all("card");
	if(allCards != null){
		for(var u =0; u<allCards.length; u++){
			allCards[u].setAttribute("onclick", "flip(event)");
		}
	}
}

function init(num){
	totalNeedMatch = 8;
	var genarateArr = new Array();
	var backImages = document.all("back_img");
	randomNum = Math.floor(Math.random() * num);
	for(var i = 0; i < num; i++){
		while (alreadyChosen(randomNum, genarateArr)){
			randomNum = Math.floor(Math.random() * num);
		}
		genarateArr.push(randomNum);
		backImages[i].setAttribute("src", "/img/card" + Math.floor(randomNum/2) + ".jpg");
		backImages[i].setAttribute("alt", Math.floor(randomNum/2));
	}
}

function alreadyChosen(num, arr){
	var chosen = false;
	for (var i = 0; i < arr.length; i++){
		if(num == arr[i]){
			chosen = true;
		}
	}
	return chosen;
}
