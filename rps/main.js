import { Player } from "./game.js";
import { clear } from "./game.js";
import { cpChoise } from "./game.js";
import { delay } from "./constant.js";
import { score } from "./constant.js";

let player1 = new Player("you");
let player2 = new Player("cp");
document.getElementById("yourscore").textContent = player1.score;
document.getElementById("cpscore").innerHTML = player2.score;

function result() {
  let yourscore = document.getElementById("yourscore");
  let cpscore = document.getElementById("cpscore");
  let winner = document.getElementById("result");

  if (player1.choise == player2.choise) {
    player1.score += score.equle;
    player2.score += score.equle;
    yourscore.textContent = player1.score;
    document.getElementById("cpscore").textContent = player2.score;
  } else if ([1, -4, 3].includes(player1.choise.length - player2.choise.length)) {
    player1.score += score.win;
    document.getElementById("yourscore").textContent = player1.score;
  } else {
    player2.score += score.win;
    document.getElementById("cpscore").textContent = player2.score;
  }

  switch ((yourscore.textContent - cpscore.textContent) / Math.abs(yourscore.textContent - cpscore.textContent)) {
    case 1:
      winner.textContent = ">"; break;
    case -1:
      winner.textContent = "<"; break;
    default:
      winner.textContent = "="; break;
  }
}

function updateCp() {
  let cpChoised = cpChoise();
  document.getElementById("cpchois").innerHTML = document.querySelector(`.image[data-name="${cpChoised}"]`).innerHTML;
  player2.choise = document.querySelector(`.image[data-name="${cpChoised}"]`).getAttribute("data-name");
  player2.changeTurn();
  player1.changeTurn();
}

let rpsAll = document.querySelectorAll(".image");
rpsAll.forEach((rps) => {
  rps.addEventListener("click", userChoise);
  function userChoise() {
    if (player1.turn) {
      document.getElementById("yourchois").innerHTML = rps.innerHTML;
      player1.choise = rps.getAttribute("data-name");
      player1.changeTurn();
      player2.changeTurn();
      setTimeout(updateCp, delay.update);
      setTimeout(result, delay.result);
      setTimeout(clear, delay.clear);
    }
  }
})