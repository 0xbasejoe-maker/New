let player1Health = 100;
let player2Health = 100;
let isPlayer1Turn = true; // Simple turn-based system
const maxHealth = 100;

const p1HealthBar = document.getElementById('p1-health');
const p2HealthBar = document.getElementById('p2-health');
const gameMessage = document.getElementById('game-message');

function updateHealthBars() {
    // Ensure health doesn't go below zero
    player1Health = Math.max(0, player1Health);
    player2Health = Math.max(0, player2Health);

    // Update the visual width of the health bars
    p1HealthBar.style.width = (player1Health / maxHealth) * 100 + '%';
    p2HealthBar.style.width = (player2Health / maxHealth) * 100 + '%';
}

function checkGameOver() {
    if (player1Health <= 0) {
        gameMessage.textContent = "FATALITY! Opponent Wins!";
        return true;
    }
    if (player2Health <= 0) {
        gameMessage.textContent = "VICTORY! LeGion Wins!";
        return true;
    }
    return false;
}

function opponentTurn() {
    if (checkGameOver()) return;

    // Simple AI: Opponent chooses a random attack
    const opponentAttacks = [10, 20]; // Damage values
    const damage = opponentAttacks[Math.floor(Math.random() * opponentAttacks.length)];
    
    player1Health -= damage;
    gameMessage.textContent = `Opponent strikes back for ${damage} damage!`;
    updateHealthBars();
    
    checkGameOver();
    isPlayer1Turn = true; // Switch back to player 1
}

function attack(player, damage) {
    if (!isPlayer1Turn || checkGameOver()) {
        gameMessage.textContent = "It's not your turn!";
        return;
    }

    if (player === 1) {
        player2Health -= damage;
        gameMessage.textContent = `LeGion hits for ${damage} damage!`;
        updateHealthBars();
        
        // End Player 1's turn and initiate Opponent's turn
        isPlayer1Turn = false;
        setTimeout(opponentTurn, 1500); // Opponent attacks after 1.5 seconds
    }
}
