let player1Health = 100;
let player2Health = 100;
let isPlayer1Turn = true; // LeGion starts
const maxHealth = 100;
let gameEnded = false;

const p1HealthBar = document.getElementById('p1-health');
const p2HealthBar = document.getElementById('p2-health');
const gameMessage = document.getElementById('game-message');

function updateHealthBars() {
    player1Health = Math.max(0, player1Health);
    player2Health = Math.max(0, player2Health);

    p1HealthBar.style.width = (player1Health / maxHealth) * 100 + '%';
    p2HealthBar.style.width = (player2Health / maxHealth) * 100 + '%';

    // Change health bar color based on remaining health
    p1HealthBar.style.backgroundColor = player1Health > 50 ? '#00ffc4' : (player1Health > 20 ? 'orange' : 'red');
    p2HealthBar.style.backgroundColor = player2Health > 50 ? '#ff007f' : (player2Health > 20 ? 'orange' : 'red');
}

function checkGameOver() {
    if (gameEnded) return true;

    if (player1Health <= 0) {
        gameMessage.innerHTML = "<span style='color: #ff007f;'>FATALITY! The Wanderer Wins!</span>";
        gameEnded = true;
        return true;
    }
    if (player2Health <= 0) {
        gameMessage.innerHTML = "<span style='color: #00ffc4;'>VICTORY! LeGion Wins!</span>";
        gameEnded = true;
        return true;
    }
    return false;
}

function opponentTurn() {
    if (checkGameOver()) return;

    gameMessage.textContent = "The Wanderer is preparing an attack...";

    setTimeout(() => {
        const opponentMoves = [
            { name: "Lantern Swing", damage: 10 },
            { name: "Staff Bash", damage: 20 },
            { name: "Cyber Kick", damage: 30 }
        ];
        const randomMove = opponentMoves[Math.floor(Math.random() * opponentMoves.length)];
        
        player1Health -= randomMove.damage;
        gameMessage.innerHTML = `The Wanderer uses <span style='color: #ffcc00;'>${randomMove.name}</span> for ${randomMove.damage} damage!`;
        updateHealthBars();
        
        if (!checkGameOver()) {
            isPlayer1Turn = true;
            gameMessage.textContent += " LeGion's turn!";
        }
    }, 1500); // Opponent attacks after 1.5 seconds
}

function attack(player, damage, moveName) {
    if (!isPlayer1Turn || gameEnded) {
        gameMessage.textContent = "It's not LeGion's turn or the game has ended!";
        return;
    }

    if (player === 1) {
        player2Health -= damage;
        gameMessage.innerHTML = `LeGion uses <span style='color: #ffcc00;'>${moveName}</span> for ${damage} damage!`;
        updateHealthBars();
        
        isPlayer1Turn = false; // End Player 1's turn
        if (!checkGameOver()) {
            opponentTurn(); // Initiate Opponent's turn
        }
    }
}

// Initial update to show full health
updateHealthBars();
