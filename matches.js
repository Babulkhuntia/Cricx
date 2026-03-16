// Load matches when page opens
document.addEventListener("DOMContentLoaded", loadMatches);

function loadMatches(){

let matches = JSON.parse(localStorage.getItem("matches")) || [];

const liveContainer = document.getElementById("liveMatches");
const upcomingContainer = document.getElementById("upcomingMatches");

liveContainer.innerHTML = "";
upcomingContainer.innerHTML = "";

matches.forEach(match => {

const card = document.createElement("div");

card.classList.add("match-card");

card.innerHTML = `
<h3>${match.team1} vs ${match.team2}</h3>
<p>Date: ${match.date}</p>
<p>Status: ${match.status}</p>
`;

card.addEventListener("click", function(){

localStorage.setItem("selectedMatch", JSON.stringify(match));

window.location.href = "scoreboard.html";

});

if(match.status === "live"){

liveContainer.appendChild(card);

}else{

upcomingContainer.appendChild(card);

}

});

}
