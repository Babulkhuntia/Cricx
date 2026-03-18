let match = JSON.parse(localStorage.getItem("selectedMatch"));

document.getElementById("matchTitle").innerText =
match.team1 + " vs " + match.team2;

let teamRuns = 0;
let wickets = 0;
let balls = 0;

let b1Runs = 0;
let b1Balls = 0;

let b2Runs = 0;
let b2Balls = 0;

let striker = 1;

let bowlerRuns = 0;
let bowlerWickets = 0;

let history = [];


function updateDisplay(){

document.getElementById("teamScore").innerText =
teamRuns + " / " + wickets;

let overs = Math.floor(balls/6) + "." + (balls%6);

document.getElementById("oversDisplay").innerText =
"Overs: " + overs;

let star1 = striker === 1 ? " ★" : "";
let star2 = striker === 2 ? " ★" : "";

document.getElementById("batsman1Display").innerText =
b1Runs + " (" + b1Balls + ")" + star1;

document.getElementById("batsman2Display").innerText =
b2Runs + " (" + b2Balls + ")" + star2;

document.getElementById("bowlerStats").innerText =
"Overs: " + overs + " | Runs: " + bowlerRuns + " | Wickets: " + bowlerWickets;

document.getElementById("ballHistory").innerText =
history.join(" ");

}


function scoreRun(run){

teamRuns += run;
bowlerRuns += run;

balls++;

if(striker === 1){
b1Runs += run;
b1Balls++;
}else{
b2Runs += run;
b2Balls++;
}

history.push(run);

if(run % 2 === 1){
changeStrike();
}

if(balls % 6 === 0){
changeStrike();
}

updateDisplay();

}


function addWicket(){

wickets++;
bowlerWickets++;
balls++;

history.push("W");

updateDisplay();

}


function addWide(){

teamRuns++;
bowlerRuns++;

history.push("WD");

updateDisplay();

}


function addNoBall(){

teamRuns++;
bowlerRuns++;

history.push("NB");

updateDisplay();

}


function changeStrike(){

if(striker === 1){
striker = 2;
}else{
striker = 1;
}

}

updateDisplay();
