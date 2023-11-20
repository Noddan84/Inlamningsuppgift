document.querySelector('#button').addEventListener('click', handleLogin);

const tempPlayers = localStorage.getItem("players")
const players = tempPlayers ? JSON.parse(tempPlayers) : [];

function handleLogin() {
  const username = document.getElementById('username').value;
  const playerExists = players.some(players =>
    players.Name.toLowerCase() === username.toLowerCase());

  if (!playerExists) {
    const player =
    {
      Name: username,
      Score: 0,
    }
    alert('Username created!');
    players.push(player);
  }
  else {
    alert('Username already exists!');
  }
  localStorage.setItem("players", JSON.stringify(players));
}