//Hide / Show the modal
const modalClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal_wrapper');
const rules = document.querySelector('.rules');

modalClose.addEventListener('click', function() {
    modal.style.display="none";
});

rules.addEventListener('click', function() {
    modal.style.display="block";
});

//Score

const gameResult = document.querySelector('.game_result');
const gameWin = document.querySelector('.game-win');
const gameEqual = document.querySelector('.game-equal')

let winStreak = 0;
const score = document.querySelector('span');
function Win() {
    document.querySelector(".player_pick").id='win';
    gameResult.style.display="block";
    gameWin.style.display="block";
    gameEqual.style.display="none";
    gameLoose.style.display="none";
    winStreak++;
    score.innerHTML = winStreak;
}

const gameLoose = document.querySelector('.game-loose');

function Loose() {
    document.querySelector(".house_pick").id='win';
    gameResult.style.display="block";
    gameLoose.style.display="block";
    gameWin.style.display="none";
    gameEqual.style.display="none";
    winStreak--;
    score.innerHTML = winStreak;
}

function Equal() {
    gameResult.style.display="block";
    gameEqual.style.display="block";
    gameWin.style.display="none";
    gameLoose.style.display="none";
}


//Game function
const gameOption = document.querySelector('.game-option');
//const gameIcon = document.querySelectorAll('.game-button');
const gamePick = document.querySelector('.game_pick');
    //gameIcon.forEach(element => {
        //element.addEventListener('click',
        function Start(element) {
            //Hide the Choice Picker
            gameOption.style.display="None";
            //Show the Game Pick panel
            gamePick.style.display="Flex";
            //Generate a random number
            Game(element);
        }
    //});

function Game(yourChoice){
	let human = yourChoice.id;
	let bot;
	bot = numberToChoice(roll());

	results = decideWinner(human,bot);
  
  	setTimeout(setScore,3200,results); //setScore(results)

	frontEnd(human,bot);
	  setTimeout(function(){
	      document.querySelector('.flip-card').style.display="none";
	      console.log("hi");
	      document.querySelector('.house_result').style.display="block";
	  }, 3000)

}
function roll(){
	return Math.floor(Math.random()*3);
}
function numberToChoice(num){
	return ['rock','paper','scissors'][num];
}
function decideWinner(yourChoice,botChoice){
	let Data = {
		'rock':{'scissors': 1,'rock':0.5, 'paper':0},
		'paper':{'scissors': 0,'rock':1, 'paper':0.5},
					'scissors':{'scissors': 0.5,'rock':0, 'paper':1}
	}
	let yourScore = Data[yourChoice][botChoice];
	let computerScore =  Data[botChoice][yourChoice];
	return [yourScore , computerScore];
}
function setScore([yourScore,computerScore]){
  if(yourScore  === 1){
    Win();
  }
  else if (yourScore ===  0.5){
    Equal();}
  else{
    Loose();
  }
}


function frontEnd(humanChoice,botChoice){
	//images database
	let Database = {
		'rock': document.querySelector('#rock > img').src,
		'paper': document.querySelector('#paper > img').src,
		'scissors': document.querySelector('#scissors > img').src	};

		let humanDiv = document.createElement('div');
		let botDiv = document.createElement('div');

		humanDiv.className="icon-bg";
		botDiv.className="icon-bg";

		const botImg = document.createElement("img");
		const humanImg = document.createElement("img");

    humanImg.src = Database[humanChoice];
		botImg.src = Database[botChoice];
    console.log(Database[humanChoice]);

		document.querySelector('.player_result').id = humanChoice;
		document.querySelector('.house_result').id = botChoice;

		humanDiv.id="player"
		document.querySelector('.player_result').appendChild(humanDiv);
		document.querySelector('#player').appendChild(humanImg);

		botDiv.id="house"
		document.querySelector('.house_result').appendChild(botDiv);
		document.querySelector('#house').appendChild(botImg);

    document.querySelector('.house_result').style.display="none";

}
function Reset() {
    gameOption.style.display = "Flex";
    gameResult.style.display = "none";
    gamePick.style.display = "none";

    const player = document.querySelector('#player');
    const house = document.querySelector('#house');
    player.remove();
    house.remove();
    document.querySelector(".player_pick").removeAttribute('id');
    document.querySelector(".house_pick").removeAttribute('id');
    document.querySelector('.flip-card').style.display="block";
    document.querySelector('.house_result').style.display="none";
}

const more = document.querySelector('.more');

if (more) {
    //When the buton more exist add a event listener
    more.addEventListener('click', function() {
        //If clicked restart the game
        Reset();
    });
}
