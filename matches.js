// Load matches on homepage
document.addEventListener("DOMContentLoaded", function () {

loadMatches();

const matchForm = document.getElementById("matchForm");

if (matchForm) {

matchForm.addEventListener("submit", function (e) {

e.preventDefault();

const team1 = document.getElementById("team1").value;
const team2 = document.getElementById("team2").value;
const matchDate = document.getElementById("matchDate").value;
const matchStatus = document.getElementById("matchStatus").value;

let matches = JSON.parse(localStorage.getItem("matches")) || [];

const newMatch = {

id: Date.now(),

team1: team1,

team2: team2,

date: matchDate,

status: matchStatus,

team1Score: "0/0",

team2Score: "0/0",

team1Overs: "0.0",

team2Overs: "0.0"

};

matches.push(newMatch);

localStorage.setItem("matches", JSON.stringify(matches));

alert("Match added successfully!");

window.location.href = "index.html";

});

}

});



// Display matches on homepage
function loadMatches() {

const matches = JSON.parse(localStorage.getItem("matches")) || [];

const liveContainer = document.getElementById("liveMatches");
const upcomingContainer = document.getElementById("upcomingMatches");

if (!liveContainer || !upcomingContainer) return;

liveContainer.innerHTML = "";
upcomingContainer.innerHTML = "";

matches.forEach(match => {

const matchCard = document.createElement("div");

matchCard.classList.add("match-card");

matchCard.addEventListener("click", function () {
openScoreboard(match);
});
matchCard.innerHTML = `

<h3>${match.team1} vs ${match.team2}</h3>

<p>Date: ${match.date}</p>

<p>Score: ${match.team1Score} - ${match.team2Score}</p>

`;

if (match.status === "live") {

liveContainer.appendChild(matchCard);

} else {

upcomingContainer.appendChild(matchCard);

}

});

}
function openScoreboard(match.id) {
localStorage.setItem("selectedMatch", JSON.stringify(match));
window.location.href = "scoreboard.html";
}
