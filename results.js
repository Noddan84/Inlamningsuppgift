
const scoreBoard = document.querySelector('#scoreBoard')

function results() {

  const games = JSON.parse(localStorage.getItem("games"))

  const table = document.createElement("table")
  const thead = document.createElement("thead")
  const tbody = document.createElement("tbody")
  const trHead = document.createElement("tr")

  const thWinner = document.createElement("th")
  const thLoser = document.createElement("th")
  const thRounds = document.createElement("th")

  thWinner.innerText = "Winners"
  thLoser.innerText = "Losers"
  thRounds.innerText = "Rounds"

  trHead.appendChild(thWinner)
  trHead.appendChild(thLoser)
  trHead.appendChild(thRounds)
  thead.appendChild(trHead)
  table.appendChild(thead)
  table.appendChild(tbody)

  scoreBoard.appendChild(table)

  for (let game of games) {
    const playerRow = document.createElement("tr")
    const winner = document.createElement("td")
    const loser = document.createElement("td")
    const rounds = document.createElement("td")

    winner.innerText = game.winner
    loser.innerText = game.loser
    rounds.innerText = game.rounds

    playerRow.appendChild(winner);
    playerRow.appendChild(loser);
    playerRow.appendChild(rounds);

    tbody.appendChild(playerRow);
  }
}
results()