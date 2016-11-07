//place ids for elements that need to be accessed
var objs = ['no_support','btn_start','btn_reset','btn_devby','user_select','msg','rock','paper','scissors','title','results'];
//values to place in local storage
var data = [{'in_progress':0}];

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
	var c = ['rock','paper','scissors'];
	var computer = c[pickRandomNumber()];
	var o; // o for outcome
	
	//use a switch case
	switch(this.id) {
		case "rock":
		  if(computer == "rock") {
			  o = 'tie';
		  }
		  if(computer == "paper") {
			  o = 'lose';
		  }
		  if(computer == "scissors") {
			  o = 'win';
		  }
		 break;
		case "paper":
		  if(computer == "rock") {
			  o = 'win';
		  }
		  if(computer == "paper") {
			  o = 'tie';
		  }
		  if(computer == "scissors") {
			  o = 'lose';
		  }
		 break; 
		case "scissors":
		  if(computer == "rock") {
			   o = 'lose';
		  }
		  if(computer == "paper") {
			  o = 'win';
		  }
		  if(computer == "scissors") {
			  o = 'tie';
		  }
		 break; 
	}
	
	console.log('player:' + this.id + ', computer: ' + computer + ', outcome: ' + o);
}

function enableChoice(s){
	if(s) {
		objs.user_select.style.color = 'hsla(0,0%,100%,1)';
		removeClass(objs.msg,'hidden');
		//enable click
		objs.rock.addEventListener('click', choiceClick, false);
		objs.paper.addEventListener('click', choiceClick, false);
		objs.scissors.addEventListener('click', choiceClick, false);
		
	} else {
		objs.user_select.style.color = 'hsla(0,0%,100%,.2)';
		addClass(objs.msg,'hidden');
		//disable click
		objs.paper.removeEventListener('click', choiceClick, false);
		objs.rock.removeEventListener('click', choiceClick, false);
		objs.scissors.removeEventListener('click', choiceClick, false);
	}
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
		showControls(false);
		inProgress();
		enableChoice(true);
		
		removeClass(objs.results,'hidden');
	});
	
	objs.btn_reset.addEventListener('click',function(){
		//btn_reset - how a game is reset
		data[0].in_progress = 0;
		localStorage.removeItem('rps_app');
		showControls(true);
		inProgress();
		enableChoice(false);
		
		addClass(objs.results,'hidden');
	});
	
	objs.btn_devby.addEventListener('click',function(){
		window.open('http://www.matthewbullweb.co.uk'); //open my website
	});
} ); 
