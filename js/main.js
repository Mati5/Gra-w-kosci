let scores, 
    roundScore,
    activePlayer,
    gamePlaying,
    lastDice;

init();

document.getElementById('btn-roll').addEventListener("click", roll, false);
document.getElementById('btn-hold').addEventListener("click", hold, false);
document.getElementById('btn-new').addEventListener("click", init, false);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    counterSix = 0;

    document.getElementById('player-score-0').textContent = "0";
    document.getElementById('player-score-1').textContent = "0";
    document.getElementById('player-current-score-0').textContent = "0";
    document.getElementById('player-current-score-1').textContent = "0";
    document.getElementById('dice').style.display = "none";
    document.getElementById('player-panel-0').classList.remove('player-panel--active');
    document.getElementById('player-panel-1').classList.remove('player-panel--active');
    document.getElementById('player-panel-0').classList.add('player-panel--active');
    document.getElementById('player-panel-name-0').textContent = "Player 1";
    document.getElementById('player-panel-name-1').textContent = "Player 2";
}

function changePlayer() {
    roundScore = 0;
    activePlayer = activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.getElementById('player-current-score-0').textContent = "0";
    document.getElementById('player-current-score-1').textContent = "0";
    document.getElementById('player-panel-0').classList.toggle('player-panel--active');
    document.getElementById('player-panel-1').classList.toggle('player-panel--active');   
}

function roll() {
    if(gamePlaying) {
        let dice = Math.floor(Math.random()*6)+1;
        let diceDOM = document.getElementById('dice');
        diceDOM.style.display = "block";
        diceDOM.classList.remove(diceDOM.classList[1])
        diceDOM.classList.add('dice--' + dice);

        if(dice===6 && lastDice===6) {
            scores[activePlayer]=0;
            document.getElementById('player-score-' + activePlayer).textContent = "0";
            changePlayer();
        } else if(dice>1) {
            roundScore += dice;
            document.getElementById('player-current-score-' + activePlayer).textContent = roundScore;
        }
        else {
            changePlayer();
        }

        lastDice = dice;
    }
}

function hold() {
    if(gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById('player-score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('dice').style.display = "none";

        let gameGoal = document.getElementById('game-goal').value;
        let winningScore;
        if(gameGoal) {
            winningScore = gameGoal;
        }
        else {
            winningScore = 100;
        }

        if(scores[activePlayer]>=winningScore) {
            gamePlaying=false;
            document.getElementById('player-panel-name-' + activePlayer).textContent = "Winner!";
        }
        else {
            changePlayer();
        }
    }
}