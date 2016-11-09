//place ids for elements that need to be accessed
var objs = ['no_support','btn_start','btn_reset','btn_devby','user_select','msg','Rock','Paper','Scissors','title','results','player_counter','tie_counter','computer_counter'];
//values to place in local storage - add later as game is more important
var data = [{'in_progress':0,'player_wins':0,'ties':0,'computer_wins':0}];
var player_wins = 0; ties = 0; computer_wins = 0;
var begin_msg = "Now make a choice above.<br />Wins are shown below";

//create my own mini framework
function putObjs(){
	for (i = 0; i < objs.length; i++) {
		var obj = objs[i];
		objs[obj] = document.getElementById(obj);
	}
}

function addClass(obj, in_class){
	obj.className+= ' ' + in_class;
}

function removeClass(obj, in_class){
	obj.className =  obj.className.replace(new RegExp('(?:^|\\s)'+ in_class + '(?:\\s|$)'), ' ');
}

function showControls(show){
	if(show) {
		removeClass(objs.btn_start,'hidden');
		removeClass(objs.btn_reset,'hidden');
		removeClass(objs.title,'hidden');
		
	} else {
		addClass(objs.btn_start,'hidden');
		//addClass(objs.btn_reset,'hidden');
		addClass(objs.title,'hidden');

	}
}

function inProgress(){
	//is a game in progress?
	if(localStorage.getItem('rps_app') ){
		data = JSON.parse(localStorage.getItem('rps_app'));
		if(data[0].in_progress == 1) {
			objs.btn_start.innerHTML = '<i class="on-left">play_circle_outline</i>Continue';
			removeClass(objs.btn_reset,'disabled');
		} else { 
			objs.btn_start.innerHTML = '<i class="on-left">play_circle_outline</i>Play';
			addClass(objs.btn_reset,'disabled');
		}
		//console.log(data);
	} else { 
		objs.btn_start.innerHTML = '<i class="on-left">play_circle_outline</i>Play';
		addClass(objs.btn_reset,'disabled');
	}
}


/*
logic
1. rock beats scissors
2. paper beats rock
3. scissors beats paper
*/

function pickRandomNumber(){
	return Math.floor((Math.random() * 3)); // + 1);
}


function choiceClick(e){
	var c = ['Rock','Paper','Scissors'];
	var computer = c[pickRandomNumber()];
	var o; // o for outcome
	
	//use a switch case
	switch(this.id) {
		case "Rock":
		  if(computer == "Rock") {
			  o = 'Tie';
		  }
		  if(computer == "Paper") {
			  o = 'Lose';
		  }
		  if(computer == "Scissors") {
			  o = 'Win';
		  }
		 break;
		case "Paper":
		  if(computer == "Rock") {
			  o = 'Win';
		  }
		  if(computer == "Paper") {
			  o = 'Tie';
		  }
		  if(computer == "Scissors") {
			  o = 'Lose';
		  }
		 break; 
		case "Scissors":
		  if(computer == "Rock") {
			   o = 'Lose';
		  }
		  if(computer == "Paper") {
			  o = 'Win';
		  }
		  if(computer == "Scissors") {
			  o = 'Tie';
		  }
		 break; 
	}
	
	var txt = 'Player: ' + this.id + ', Computer: ' + computer + '\n<br/>Player outcome: ' + o, playagain = "\n<br/>Make another choice", overall = "";
	
	//update counter and display results
	if(o=='Win') {data[0].player_wins++; objs.player_counter.innerHTML = data[0].player_wins;}
	if(o=='Tie') {data[0].ties++; objs.tie_counter.innerHTML = data[0].ties;}
	if(o=='Lose') {data[0].computer_wins++; objs.computer_counter.innerHTML = data[0].computer_wins;}
	
	//decide on overall winner - disable choices then as game finishes
	if(data[0].player_wins>=3) { playagain = ''; overall = '\n<br/><b>Player wins overall</b>'; enableChoice(false); }
	if(data[0].computer_wins>=3) { playagain = ''; overall = '\n<br/><b>Computer wins overall</b>'; enableChoice(false);}
	
	console.log(txt);
	objs.msg.innerHTML = txt + playagain + overall;
	
	if (overall == "") {
		localStorage.setItem('rps_app',JSON.stringify(data)); //storge a game in progress
	} else {
		localStorage.removeItem('rps_app');	//game won so clear storage
	}
	
}

function enableChoice(s){
	if(s) {
		objs.user_select.style.color = 'hsla(0,0%,100%,1)';
		
		//enable click
		objs.Rock.addEventListener('click', choiceClick, false);
		objs.Paper.addEventListener('click', choiceClick, false);
		objs.Scissors.addEventListener('click', choiceClick, false);
		
	} else {
		objs.user_select.style.color = 'hsla(0,0%,100%,.2)';
		
		//disable click
		objs.Paper.removeEventListener('click', choiceClick, false);
		objs.Rock.removeEventListener('click', choiceClick, false);
		objs.Scissors.removeEventListener('click', choiceClick, false);
	}
}


function updateResults(){
	//update results
	objs.player_counter.innerHTML = data[0].player_wins; objs.tie_counter.innerHTML = data[0].ties; objs.computer_counter.innerHTML = data[0].computer_wins;
}

//ie8+ only
document.addEventListener('DOMContentLoaded', function(){
	// do this on document ready
	putObjs(); //load objects
	
	//browser test - is local storage supported?
	if(localStorage) {
		showControls(true);
		addClass(objs.no_support,'hidden');
	}
	
	inProgress();
	
	//set actions for elements
	objs.btn_start.addEventListener('click',function(){
		//btn_start - how a game is started
		
		data[0].in_progress = 1;
		localStorage.setItem('rps_app',JSON.stringify(data)); //storge a game in progress
		updateResults();
		
		//load starting message;
		objs.msg.innerHTML = begin_msg;
		
		
		showControls(false);
		inProgress();
		enableChoice(true);
		
		removeClass(objs.results,'hidden');
		removeClass(objs.msg,'hidden');
		
	});
	
	objs.btn_reset.addEventListener('click',function(){
		//btn_reset - how a game is reset
		
		data[0].in_progress = 0;
		localStorage.removeItem('rps_app');
		
		//reset counters
		data[0].player_wins = 0; data[0].ties = 0; data[0].computer_wins = 0;
		updateResults();
		
		showControls(true);
		inProgress();
		enableChoice(false);
		
		addClass(objs.results,'hidden');
		addClass(objs.msg,'hidden');
	});
	
	objs.btn_devby.addEventListener('click',function(){
		window.open('http://www.matthewbullweb.co.uk'); //open my website
	});
} ); 
