/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score.
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it is the next player's turn.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it iss the next player's turn.
- The first player to reach 100 points on GLOBAL score wins the game.

*/

var scores, roundScore, activePlayer, gamePlaying, previousScore, currentScore, winningScore, diceQuantity;

init();

document.querySelector('.btn-roll').addEventListener('click', function()
{
    if(gamePlaying)
    {
        var dice1, dice2, dice1DOM, dice2DOM;
        console.log("Check 0");
        console.log("DICE QUANTITY: " + diceQuantity);
        if(diceQuantity == 1)
        {
            console.log("Check 1");
            // 1. Random number                                                 
            dice1 = Math.floor((Math.random() * 6) + 1);
            currentScore = dice1;
            
            // 2. Display the result
            dice1DOM = document.querySelector('.dice-one');
            dice1DOM.style.display = 'block';
            dice1DOM.src = 'images/dice-' + dice1 + '.png';

            // 3. Update the round score IF the rolled number was not a 1
            if(dice1 !== 1)
            {
                if(previousScore == 6 && dice1 == 6)
                {
                    scores[activePlayer] = 0;
                    roundScore = 0;  
                    document.getElementById('score-' + activePlayer).textContent = 0;
                    document.getElementById('current-' + activePlayer).textContent = 0;
                }
                else
                {
                    // Add score
                    roundScore += dice1;
                    document.getElementById('current-' + activePlayer).textContent = roundScore;     
                    previousScore = dice1;  
                }
            }
            else
            {
                // next player
                nextPlayer();
            }    
        }
        
        else if(diceQuantity == 2)
        {
            console.log("Check 2");
            // 1. Random numbers
            dice1 = Math.floor((Math.random() * 6) + 1);
            dice2 = Math.floor((Math.random() * 6) + 1);
            currentScore = dice1 + dice2;
            console.log("Dice 1 - " + dice1);
            console.log("Dice 2 - " + dice2);
            console.log("Current score - " + currentScore);
            
            // 2. Display the result from 2 dices
            dice1DOM = document.querySelector('.dice-one');
            dice1DOM.style.display = 'block';
            dice1DOM.src = 'images/dice-' + dice1 + '.png';
            
            dice2DOM = document.querySelector('.dice-two');
            dice2DOM.style.display = 'block';
            dice2DOM.src = 'images/dice-' + dice2 + '.png';
            
            // 3. Update the round score IF the rolled number was not a 1
            if(dice1 == 1 || dice2 == 1)
            {
                console.log('Dice 1 or Dice 2 is 1');
                currentScore = 0;
                document.querySelector('#current-' + activePlayer).textContent = 'Nothing!';
                nextPlayer();
            }
            else
            {
                // Add score
                roundScore += dice1 + dice2;
                console.log('Round score: ' + roundScore);
                document.querySelector('#current-' + activePlayer).textContent = roundScore;
            }
        }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function()
{
    if(gamePlaying)
    {
           // Add CURRENT score to GLOBAL score
            scores[activePlayer] += roundScore;

            // Update the UI
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];


            // Check if player won the game
            if(scores[activePlayer] >= winningScore)
            {
                document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
                document.querySelector('.dice-one').style.display = 'none';
                
                if(diceQuantity == 2)
                {
                    document.querySelector('.dice-two').style.display = 'none';
                }
                
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                document.querySelector('.btn-hold').style.display = 'none';
                document.querySelector('.btn-roll').style.display = 'none';
                gamePlaying = false;
            }
            else
            {
                // Next player
                nextPlayer();      
            }        
    }
});

function nextPlayer()
{
            activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
            roundScore = 0;
            previousScore = -1;
            document.getElementById('current-0').textContent = '0';
            document.getElementById('current-1').textContent = '0';
            
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
            document.querySelector('.dice-one').style.display = 'none';
            if(diceQuantity == 2)
            {
                document.querySelector('.dice-two').style.display = 'none';
            }
}


document.querySelector('.btn-new').addEventListener('click', init);

function init()
{
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    previousScore = -1;
    gamePlaying = true;
    diceQuantity = prompt("Do you want to play 1 dice or 2 dices?");
    
    while(diceQuantity < 1 || diceQuantity > 2)
    {
        alert("The DICE QUANTITY entered is incorrect. Please enter enter either 1 or 2.");
        diceQuantity = prompt("Do you want to play 1 dice or 2 dices?");
    }
    
    winningScore = prompt("Enter winning score: ");
        
    //added error handling for input null value or a value less than 1
    while(winningScore === null || winningScore < 1)
    {
        alert("The WINNING SCORE entered is incorrect. Please try again.");
        winningScore = prompt("Enter winning score: ");
    }
        
    document.querySelector('.dice-one').style.display = 'none';
    document.querySelector('.dice-two').style.display = 'none';
    document.querySelector('.btn-hold').style.display = 'block';
    document.querySelector('.btn-roll').style.display = 'block';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    console.log("Pre-check 3");
}





// How to setup event handler:

//function btn(){// do something}
//document.querySelector('.btn-roll').addEventListener('click', btn;


//var x = document.querySelector('#score-0').textContent;

//dice = Math.floor(Math.random() * 6) + 1;

//document.querySelector('#current-0').textContent = dice;

//document.querySelector('#current-' + activePlayer).textContent = dice;

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';