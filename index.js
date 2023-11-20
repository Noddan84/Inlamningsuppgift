const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const playerMenu = document.querySelector("#playerMenu")
const tempGames = localStorage.getItem("games")
const games = tempGames ? JSON.parse(tempGames) : [];

let circleName = "";
let dotName = "";

const startCells = [
  "", "", "", "", "", "", "", "", ""
]

let go = 'circle'
let round = 1;
infoDisplay.textContent = "Circle begins!";

function createBoard() {
  startCells.forEach((_cell, index) => {
    const cellElement = document.createElement('div')
    cellElement.classList.add('square')
    cellElement.id = index
    cellElement.addEventListener('click', addGo)
    gameBoard.append(cellElement)
  })
}

createBoard()

function addGo(event) {
  if (isAllowedToPlace() && event.currentTarget.firstChild == null) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    event.currentTarget.append(goDisplay)
    go = go === 'circle' ? 'dot' : 'circle'
    infoDisplay.textContent = "It is now " + go + "'s turn to play."

    checkScore()
    round += 1
  }
  else if (!isAllowedToPlace() && event.currentTarget.firstChild?.classList.contains(go)) {
    infoDisplay.textContent = "It is now " + go + "'s turn to move."
    event.currentTarget.firstChild.remove()
  }
}

function isAllowedToPlace() {
  let count = 1;
  const allSquares = document.querySelectorAll('.square')
  for (i = 0; i < allSquares.length; i++) {
    if (allSquares[i].firstChild?.classList.contains(go)) {
      count += 1;
    }
  }
  return count <= 3
}

function checkScore() {
  const allSquares = document.querySelectorAll('.square')
  console.log(allSquares)
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  winningCombos.forEach(array => { 
    const circleWins = array.every(cell => 
      allSquares[cell].firstChild?.classList.contains('circle')) 
    
    if (circleWins) {
      infoDisplay.textContent = "Circle wins!"
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      const game = {
        winner: circleName,
        loser: dotName,
        rounds: round,
      };
      games.push(game)
      localStorage.setItem("games", JSON.stringify(games));
      return;
    }
  })

  winningCombos.forEach(array => {
    const dotWins = array.every(cell =>
      allSquares[cell].firstChild?.classList.contains('dot'))

    if (dotWins) {
      infoDisplay.textContent = "Dot Wins!"
      allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
      const game = {
        winner: dotName,
        loser: circleName,
        rounds: round,
      };
      games.push(game)
      localStorage.setItem("games", JSON.stringify(games));
      return;
    }
  })
}


function choosePlayers() {

  const tempPlayers = localStorage.getItem("players")
  const players = tempPlayers ? JSON.parse(tempPlayers) : [];
  const label1 = document.createElement('label')
  const form1 = document.createElement('form');
  const select1 = document.createElement('select');
  form1.setAttribute('id', 'playerMenu1');
  select1.setAttribute('id', 'playerSelect1');
  players.forEach(player => {
    const option = document.createElement('option');
    option.value = player.Name;
    option.textContent = player.Name;
    select1.appendChild(option);
  });

  const submitBtn = document.createElement('input');
  submitBtn.setAttribute('type', 'submit');
  submitBtn.value = 'OK'; 
  form1.appendChild(label1);
  label1.innerText = "Circle: "
  form1.appendChild(select1);
  form1.appendChild(submitBtn);  
  playerMenu.appendChild(form1);
  form1.addEventListener('submit', function (event) { 
    event.preventDefault();
    console.dir(select1)
    console.log(select1.selectedIndex);
    circleName = select1.options[select1.selectedIndex].value; 
  });  

  const label2 = document.createElement('label')
  const form2 = document.createElement('form');
  const select2 = document.createElement('select'); 
  form2.setAttribute('id', 'playerMenu2'); 
  select2.setAttribute('id', 'playerSelect2'); 
  players.forEach(player => {
    const option = document.createElement('option'); 
    option.value = player.Name;
    option.textContent = player.Name; 
    select2.appendChild(option); 
  });

  const submitBtn2 = document.createElement('input');
  submitBtn2.setAttribute('type', 'submit');
  submitBtn2.value = 'OK'; 
  form2.appendChild(label2);
  label2.innerText = "Dot: "
  form2.appendChild(select2);
  form2.appendChild(submitBtn2);  
  playerMenu.appendChild(form2);
  form2.addEventListener('submit', function (event) { 
    event.preventDefault();
    console.dir(select2)
    console.log(select2.selectedIndex);
    dotName = select2.options[select2.selectedIndex].value; 
  });
}

choosePlayers()
