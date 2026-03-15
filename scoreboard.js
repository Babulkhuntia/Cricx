// scoreboard.js - Handle scoreboard modal and score updates

let currentMatch = null;
let scoreInterval = null;

// Modal elements
const modal = document.getElementById('scoreboardModal');
const closeBtn = document.querySelector('.close');

// Open scoreboard modal
function openScoreboard(match) {
    currentMatch = match;
    
    document.getElementById('matchTitle').textContent = `${match.team1} vs ${match.team2}`;
    document.getElementById('team1Name').textContent = match.team1;
    document.getElementById('team2Name').textContent = match.team2;
    
    updateScoreDisplay();
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Auto-update score for live matches every 5 seconds
    if (match.type === 'live' && !scoreInterval) {
        scoreInterval = setInterval(updateScoreDisplay, 5000);
    }
}

// Update score display
function updateScoreDisplay() {
    if (!currentMatch) return;
    
    const scores = currentMatch.scores;
    document.getElementById('team1ScoreDisplay').textContent = `${scores.runs}/${scores.wickets}`;
    document.getElementById('team1Overs').textContent = `${scores.overs.toFixed(1)} ov`;
    document.getElementById('team2ScoreDisplay').textContent = `${scores.runs}/${scores.wickets}`;
    document.getElementById('team2Overs').textContent = `${scores.overs.toFixed(1)} ov`;
}

// Update score for specific team
function updateScore(team) {
    if (!currentMatch) return;
    
    const scores = currentMatch.scores;
    scores.runs += 1;
    scores.overs += 0.1;
    
    // Save updated score
    updateMatchScore(currentMatch.id, scores);
    
    // Update display immediately
    updateScoreDisplay();
}

// Reset score
function resetScore() {
    if (!currentMatch || !confirm('Reset the scoreboard?')) return;
    
    currentMatch.scores = { runs: 0, wickets: 0, overs: 0 };
    updateMatchScore(currentMatch.id, currentMatch.scores);
    updateScoreDisplay();
}

// Modal event listeners
if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
}

window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear auto-update interval
    if (scoreInterval) {
        clearInterval(scoreInterval);
        scoreInterval = null;
    }
    currentMatch = null;
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
    if (e.key === '1' && modal.style.display === 'block') {
        updateScore('team1');
    }
    if (e.key === '2' && modal.style.display === 'block') {
        updateScore('team2');
    }
});

// Keyboard instructions
document.getElementById('scoreboardModal')?.addEventListener('click', function() {
    console.log('Scoreboard Controls:\n1 = +1 Run Team 1\n2 = +1 Run Team 2\nESC = Close');
});