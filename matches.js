// matches.js - Handle match data and display

// Load and display all matches
function loadMatches() {
    const matches = getAllMatches();
    const liveMatches = matches.filter(match => match.type === 'live');
    const upcomingMatches = matches.filter(match => match.type === 'upcoming');
    
    displayMatches('liveMatches', liveMatches);
    displayMatches('upcomingMatches', upcomingMatches);
}

// Display matches in grid
function displayMatches(containerId, matches) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (matches.length === 0) {
        container.innerHTML = `
            <div class="no-matches">
                <i class="fas fa-${containerId === 'liveMatches' ? 'fire' : 'clock'} fa-3x" style="color: #999; margin-bottom: 1rem;"></i>
                <p style="color: #999; text-align: center;">No ${containerId === 'liveMatches' ? 'live' : 'upcoming'} matches</p>
            </div>
        `;
        return;
    }

    matches.forEach(match => {
        const matchCard = createMatchCard(match);
        container.appendChild(matchCard);
    });
}

// Create individual match card
function createMatchCard(match) {
    const card = document.createElement('div');
    card.className = `match-card ${match.type}`;
    card.dataset.matchId = match.id;
    card.addEventListener('click', () => openScoreboard(match));

    const statusClass = match.type === 'live' ? 'status-live' : 'status-upcoming';
    const statusText = match.type === 'live' ? 'LIVE' : 'UPCOMING';

    const score = match.scores ? `${match.scores.runs}/${match.scores.wickets}` : '0/0';
    const overs = match.scores ? `${match.scores.overs.toFixed(1)} ov` : '0.0 ov';

    card.innerHTML = `
        <div class="match-header">
            <div class="team-names">
                <div class="team-name">${match.team1}</div>
                <div class="team-name">${match.team2}</div>
            </div>
            <div class="status-badge ${statusClass}">${statusText}</div>
        </div>
        <div class="match-score">${score}</div>
        <div class="overs">${overs}</div>
        <div class="match-details">
            <span><i class="fas fa-map-marker-alt"></i> ${match.location}</span>
            <span><i class="fas fa-calendar"></i> ${formatDate(match.date)}</span>
        </div>
    `;

    return card;
}

// Get all matches from localStorage
function getAllMatches() {
    const matches = localStorage.getItem('matches');
    return matches ? JSON.parse(matches) : [];
}

// Save matches to localStorage
function saveMatches(matches) {
    localStorage.setItem('matches', JSON.stringify(matches));
}

// Add new match
function addMatch(matchData) {
    const matches = getAllMatches();
    const newMatch = {
        id: Date.now().toString(),
        ...matchData,
        scores: { runs: 0, wickets: 0, overs: 0 }
    };
    matches.push(newMatch);
    saveMatches(matches);
    return newMatch;
}

// Update match score
function updateMatchScore(matchId, scores) {
    const matches = getAllMatches();
    const matchIndex = matches.findIndex(m => m.id === matchId);
    if (matchIndex !== -1) {
        matches[matchIndex].scores = scores;
        saveMatches(matches);
        loadMatches(); // Refresh display
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    });
}

// Add match form handler (for add-match.html)
const addMatchForm = document.getElementById('addMatchForm');
if (addMatchForm) {
    addMatchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const matchData = {
            team1: document.getElementById('team1').value,
            team2: document.getElementById('team2').value,
            location: document.getElementById('location').value,
            date: document.getElementById('matchDate').value,
            time: document.getElementById('matchTime').value,
            type: document.getElementById('matchType').value
        };

        if (!getCurrentUser()) {
            alert('Please login first!');
            window.location.href = 'login.html';
            return;
        }

        addMatch(matchData);
        alert('Match added successfully!');
        window.location.href = 'index.html';
    });
}