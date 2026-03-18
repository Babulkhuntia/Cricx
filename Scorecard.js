const params = new URLSearchParams(window.location.search);
const matchId = params.get("id");

const matches = JSON.parse(localStorage.getItem("matches")) || [];

const match = matches.find(m => m.id == matchId);

if(match){

document.getElementById("matchTitle").innerText =
match.team1 + " vs " + match.team2;

document.getElementById("team1Name").innerText = match.team1;
document.getElementById("team2Name").innerText = match.team2;

}
