var db;
var pre = new Array();
var selected_value = 0;
var currCellValue = 0;
var sec = 0;
var min = 0;
var hour = 0;
var t;
var timer_is_on = false;

function test(){
	var h = document.getElementById("row1").getElementsByTagName("input")[0].value;
	alert(h);
}

function selectCell(event){
	var curr = event.currentTarget;
	if(pre.length != 0){
		for(var i = pre.length; i > 0; i--){
			if (pre[i - 1].className == 'cell selected' ){
				pre[i - 1].className = 'cell';
			}
			if (pre[i - 1].className == 'cell selected red' ){
				pre[i - 1].className ='cell red';
			}
			if (pre[i - 1].className == 'cell highlighted' ){
				pre[i - 1].className = 'cell';
			}
			if (pre[i - 1].className == 'cell highlighted red' ){
				pre[i - 1].className ='cell red';
			}
			if (pre[i - 1].className == 'readonlycell highlighted red' ){
				pre[i - 1].className ='readonlycell red';
			}
			if (pre[i - 1].className == 'readonlycell highlighted' ){
				pre[i - 1].className ='readonlycell';
			}
			pre.pop();
		}
	}
	if (curr.value != 0){
		pre.push(curr);
		var allCells = document.getElementsByTagName('input');
		if (curr.className == 'cell'){
			curr.className = 'cell highlighted';
		}
		if (curr.className == 'cell red'){
			curr.className = 'cell highlighted red';
		}

		for (var i = 0; i < allCells.length; i++){
			if (allCells[i].value == curr.value){
				pre.push(allCells[i]);
				if (allCells[i].className == "cell"){
					allCells[i].className = "cell highlighted";
				}
				if (allCells[i].className == "cell red"){
					allCells[i].className = "cell highlighted red";
				}

				if (allCells[i].className == "readonlycell"){
					allCells[i].className = "readonlycell highlighted";
				}
				if (allCells[i].className == "readonlycell red"){
					allCells[i].className = "readonlycell highlighted red";
				}
			}
		}
	}

	if(curr.value == 0){
		pre.push(curr);
		if (curr.className == 'cell'){
			curr.className = 'cell selected';
		}
		if (curr.className == 'cell red'){
			curr.className = 'cell selected red';
		}
	}
}

function redCell(curr){
	if(curr.className == 'cell' ||
	   curr.className == 'cell selected' ||
	   curr.className == 'cell highlighted' ||
	   curr.className == 'readonlycell' ||
	   curr.className == 'readonlycell selected' ||
	   curr.className == 'readonlycell highlighted'){
		curr.className = curr.className + " red";
	}
}

function hasRedCell(strClass){
	return strClass.substring(strClass.length - 3, strClass.length) == "red";
}

function currCellVal(event){
    // console.log("dddddd");
    var currCell = event.currentTarget;
    currCellValue = currCell.value;
    // console.log($(currCell).val);
    // var charCode = (event.which) ? event.which : event.keyCode;
    // console.log(charCode);
    // if (charCode >= 48 && charCode <= 57) {
    //     currCellValue = currCell.value;
    //     return true;
    // }
    // event.preventDefault();
}

function shuffle(array) {
    var tmp, current, top = array.length;
    var temArray = new Array();
    for(var i = 0; i < 9; i++) {
		temArray[i] = array[i];
    }
    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = temArray[current];
        temArray[current] = temArray[top];
        temArray[top] = tmp;
    }
    return temArray;
}

function staticSudokuArray() {
	var sudoku = new Array();
	for(var i = 0; i < 9; i++) {
		sudoku[i] = new Array();
	}

	sudoku[0][0] = 9;
	sudoku[0][1] = 8;
	sudoku[0][2] = 7;
	sudoku[0][3] = 6;
	sudoku[0][4] = 5;
	sudoku[0][5] = 4;
	sudoku[0][6] = 3;
	sudoku[0][7] = 2;
	sudoku[0][8] = 1;

	sudoku[1][0] = 2;
	sudoku[1][1] = 4;
	sudoku[1][2] = 6;
	sudoku[1][3] = 1;
	sudoku[1][4] = 7;
	sudoku[1][5] = 3;
	sudoku[1][6] = 9;
	sudoku[1][7] = 8;
	sudoku[1][8] = 5;

	sudoku[2][0] = 3;
	sudoku[2][1] = 5;
	sudoku[2][2] = 1;
	sudoku[2][3] = 9;
	sudoku[2][4] = 2;
	sudoku[2][5] = 8;
	sudoku[2][6] = 7;
	sudoku[2][7] = 4;
	sudoku[2][8] = 6;

	sudoku[3][0] = 1;
	sudoku[3][1] = 2;
	sudoku[3][2] = 8;
	sudoku[3][3] = 5;
	sudoku[3][4] = 3;
	sudoku[3][5] = 7;
	sudoku[3][6] = 6;
	sudoku[3][7] = 9;
	sudoku[3][8] = 4;

	sudoku[4][0] = 6;
	sudoku[4][1] = 3;
	sudoku[4][2] = 4;
	sudoku[4][3] = 8;
	sudoku[4][4] = 9;
	sudoku[4][5] = 2;
	sudoku[4][6] = 1;
	sudoku[4][7] = 5;
	sudoku[4][8] = 7;

	sudoku[5][0] = 7;
	sudoku[5][1] = 9;
	sudoku[5][2] = 5;
	sudoku[5][3] = 4;
	sudoku[5][4] = 6;
	sudoku[5][5] = 1;
	sudoku[5][6] = 8;
	sudoku[5][7] = 3;
	sudoku[5][8] = 2;

	sudoku[6][0] = 5;
	sudoku[6][1] = 1;
	sudoku[6][2] = 9;
	sudoku[6][3] = 2;
	sudoku[6][4] = 8;
	sudoku[6][5] = 6;
	sudoku[6][6] = 4;
	sudoku[6][7] = 7;
	sudoku[6][8] = 3;

	sudoku[7][0] = 4;
	sudoku[7][1] = 7;
	sudoku[7][2] = 2;
	sudoku[7][3] = 3;
	sudoku[7][4] = 1;
	sudoku[7][5] = 9;
	sudoku[7][6] = 5;
	sudoku[7][7] = 6;
	sudoku[7][8] = 8;

	sudoku[8][0] = 8;
	sudoku[8][1] = 6;
	sudoku[8][2] = 3;
	sudoku[8][3] = 7;
	sudoku[8][4] = 4;
	sudoku[8][5] = 5;
	sudoku[8][6] = 2;
	sudoku[8][7] = 1;
	sudoku[8][8] = 9;
	return sudoku;
}

function get() {
	var newSudoku = staticSudokuArray();
	var oldFirstRow = newSudoku[0];
	var newFirstRow = shuffle(oldFirstRow);
	for(var i = 0; i < 9; i++) {
		for(var j = 0; j < 9; j++) {
			var oldValue = newSudoku[i][j];
			newSudoku[i][j] = newFirstRow[9 - oldValue];
		}
	}
	return newSudoku;
}

function init(){
	var cells = document.getElementsByTagName("input");
	var sudokuArray = get();
	var count = 0;
	var newSudoku = new Array();
	var rows = document.all('row');
	for(var t = 0 ; t < 9; t++) {
		for(var m = 0; m < 9; m++) {
			var eachCell = rows[t].getElementsByTagName('input')[m];
			if(Math.random() > 0.6) {
				eachCell.value = sudokuArray[t][m];
			    eachCell.readOnly = true;
				eachCell.className = "readonlycell";
				// eachCell.style.color = "#000000";
			}
			else {
				eachCell.value = "";
			}

			eachCell.setAttribute("onfocus", "selectCell(event)");
            if (eachCell.className != "readonlycell") {
                eachCell.setAttribute("onkeyup","conflict(event)");
    			eachCell.setAttribute("onkeydown","currCellVal(event)");
            }
		}
	}

	try {
		if (window.openDatabase) {
			var dbName = "sudoku";
			var version = '1.0';
			var displayName = " suduku game save";
			maxSize = 200000;
			db = openDatabase(dbName, version, displayName, maxSize);
	        if (!db)
	            alert("Failed to open the database on disk.  This is probably because the version was bad or there is not enough space left in this domain's quota");
	} else
	        alert("Couldn't open the database.  Please try with a WebKit nightly with this feature enabled");
	} catch(e) {
		if (e == 2) {
			// Version number mismatch
			alert("Invalid database version.");
		} else {
			alert("Unknown error "+e+".");
			}
			return;
		}
		db.transaction(function (transaction) {
			transaction.executeSql("CREATE TABLE IF NOT EXISTS sudoku (value number, classname text, disabled text)", [],nullDataHandler);
		});
		db.transaction(function (transaction) {
			transaction.executeSql("CREATE TABLE IF NOT EXISTS timer (hour number, min text, sec text)", [],nullDataHandler);
		});

		db.transaction(function (transaction) {
			transaction.executeSql("SELECT * FROM test1", [], initCellHandler);
		});
}

function initCellHandler(tx, re){
	if(re.rows.length == 0){
		//if the database is empty, start generating a new solution
	}
	else{
		//restore the saved game
	}
}

function gen(){
	// random num 1 to 9
	var randomNum = Math.floor(Math.random() * 9) + 1;
	alert(randomNum);

}

function genarateRanNumExcept(a){
	var randomNum = Math.floor(Math.random() * 9) + 1;
	while (randomNum == a){
		randomNum = Math.floor(Math.random() * 9) + 1;
	}
	return randomNum;
}


function hightlightExsiting(event){
	var highlightValue = event.currentTarget;


}

function getSquareStartPos(num){
	var sqrStartPos;
	if(num == 1 || num == 2 || num == 3){
		sqrStartPos = 1;
	}
	else if (num == 4 || num == 5 || num == 6){
		sqrStartPos = 4;
	}
	else if (num == 7 || num == 8 || num == 9){
		sqrStartPos = 7;
	}
	return sqrStartPos;
}

function getCellPos(cell){
	var currCellRowNum = cell.parentNode.className;
	var currCellColNum = cell.id.charAt(3);
	var cellPos=new Array(currCellRowNum, currCellColNum);
	return cellPos;
}

function getCellByPos(a, b){
	var row = document.all("row")[a - 1];
	return row.getElementsByTagName("input")[b - 1];
}

function  rowConflict(currCell){
	var conf = false;
	var currRow = currCell.parentNode.childNodes;
	for (var i = 0; i < currRow.length; i++){
		if (currRow[i] != currCell && currCell.value == currRow[i].value){
			conf = true;
			redCell(currRow[i]);
		}
		if(currCell.value == 0 && currRow[i].className == 'cell red' && currRow[i].value == selected_value){
			currRow[i].className = 'cell';
		}

	}

   return conf;
}

function colConflict(currCell){
	var conf = false;
	var currCol = document.all(currCell.id);
	for (var i = 0; i < currCol.length; i++){
		if(currCol[i] != currCell && currCell.value == currCol[i].value){
			conf = true;
			redCell(currCol[i]);
		}
		if(currCell.value == 0 && currCol[i].className == 'cell red' && currCol[i].value == selected_value){
			currCol[i].className = 'cell';
		}
	}
	return conf;
}

function sqrConflict(currCell){
	var conf = false;
	var currCellPos = getCellPos(currCell);
	for (var i = getSquareStartPos(currCellPos[0]); i < getSquareStartPos(currCellPos[0]) + 3; i++){
		for(var j = getSquareStartPos(currCellPos[1]); j < getSquareStartPos(currCellPos[1]) + 3; j++){
			var each_cell = getCellByPos(i, j);
			// alert(each_cell.value);
			if(each_cell != currCell && each_cell.value == currCell.value){
				conf = true;
				redCell(each_cell);
			}
			if(currCell.value == 0 && each_cell.className == 'cell red' && each_cell.value == selected_value){
				each_cell.className = 'cell';
			}

		}
	}
	 return conf;
}

function checkRedWithinArray(cell, cellArray){
	var conf = false;
	var cellPos = getCellPos(cell);
	for (var i = 0; i < cellArray.length; i++){
		if(cell != cellArray[i]){
			var eachCellPos = getCellPos(cellArray[i]);
			if (cellPos[0] == eachCellPos[0] || cellPos[1] == eachCellPos[1] ||
				(getSquareStartPos(cellPos[0]) == getSquareStartPos(eachCellPos[0]) &&
				getSquareStartPos(cellPos[1]) == getSquareStartPos(eachCellPos[1]))){
				conf = true;
			}
		}
	}
	return conf;
}

function conflict(event){
    console.log("ddddddd");
	var currCell = event.currentTarget;
    if ( $.inArray( $(currCell).val(), ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]) == -1) {
        $(currCell).val("");
        return false;
    }

	if (currCell.value != 0){
		var rowCof = false;
		var colCof = false;
		var sqrCof = false;
		if ( rowConflict(currCell) ) {
			rowCof = true;
		}
		if ( colConflict(currCell) ) {
			colCof = true;
		}
		if ( sqrConflict(currCell) ) {
			sqrCof = true;
		}

		if(rowCof || colCof || sqrCof){
			redCell(currCell);
		}
	}
	else{
		if (currCell.className == 'cell selected red'){
			currCell.className = 'cell selected';
		}
		if (currCell.className == 'cell highlighted red'){
			currCell.className = 'cell selected';
		}

		var allCells = document.getElementsByTagName("input");
		var allRedCells = new Array();
		for (var i = 0; i < allCells.length; i++){
			if (hasRedCell(allCells[i].className) && allCells[i].value == currCellValue){
				allRedCells.push(allCells[i]);
			}
		}
		// alert(allRedCells.length);
		// 		alert(currCellValue);
		for(var j = 0; j < allRedCells.length; j++){
			// alert(getCellPos(allRedCells[j])[0]+" "+ getCellPos(allRedCells[j])[1]);
			if(!checkRedWithinArray(allRedCells[j], allRedCells)){
				if(allRedCells[j].className == 'cell red'){
					allRedCells[j].className = 'cell';
				}
				if(allRedCells[j].className == 'cell highlighted red'){
					// alert("come to here");
					allRedCells[j].className = 'cell highlighted';
				}
				if(allRedCells[j].className == 'readonlycell red'){
					// alert("come to here");
					allRedCells[j].className = 'readonlycell';
				}

				if(allRedCells[j].className == 'readonlycell highlighted red'){
					// alert("come to here");
					allRedCells[j].className = 'readonlycell highlighted';
				}
			}
		}
	}
}

function checkForInt(evt) {
	var charCode = ( evt.which ) ? evt.which : event.keyCode;
	alert( charCode >= 48 && charCode <= 57 );
}
function nullDataHandler(transaction, results) { }

function saveGame(){
	timer_is_on = false;
	db.transaction(function(transaction){
		transaction.executeSql('DELETE FROM sudoku', [],nullDataHandler);
	});
	db.transaction(function(transaction){
		transaction.executeSql('DELETE FROM timer', [],nullDataHandler);
	});
	db.transaction(function(transaction){
		var allCells = document.getElementsByTagName("input");
		for (var i = 0; i < allCells.length; i++){
			var v = allCells[i].value;
			var c = allCells[i].className;
			var d = allCells[i].disabled;
			transaction.executeSql('INSERT INTO sudoku (value, classname, disabled) VALUES (?, ?, ?)', [v,c,d],nullDataHandler);
		}
	});

	db.transaction(function(transaction){
		transaction.executeSql('INSERT INTO timer (hour, min, sec) VALUES (?, ?, ?)', [hour,min,sec],nullDataHandler);
	});
}
function setup(num){
	if (num < 10){
		return "0"+num;
	}
	else{
		return ''+num;
	}
}

function timedCount(){
	if(timer_is_on){
		if (sec == 60){
			sec = 0;
			min = min + 1;
		}
		if(min == 60){
			min = 0;
			hour = hour + 1;
		}
		t=setTimeout("timedCount()",1000);
		sec=sec+1;
	}
	document.getElementById('timer').innerHTML = setup(hour) + " : " + setup(min) + " : " + setup(sec);
}

function doTimer(){
	timer_is_on = true;
	if (timer_is_on == true){
	  timedCount();
	}
}
