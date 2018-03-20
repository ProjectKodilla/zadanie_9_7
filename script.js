var newGameBtn = document.getElementById('js-newGameButton'),
pickRock = document.getElementById('js-playerPick_rock'),
pickPaper = document.getElementById('js-playerPick_paper'),
pickScissors = document.getElementById('js-playerPick_scissors'),
playerPointsElem = document.getElementById('js-playerPoints'),
playerNameElem = document.getElementById('js-playerName'),
computerPointsElem = document.getElementById('js-computerPoints'),
newGameElem = document.getElementById('js-newGameElement'),
pickElem = document.getElementById('js-playerPickElement'),
resultsElem = document.getElementById('js-resultsTableElement')
playerPickElem = document.getElementById('js-playerPick'),
computerPickElem = document.getElementById('js-computerPick'),
playerResultElem = document.getElementById('js-playerResult'),
computerResultElem = document.getElementById('js-computerResult')

newGameBtn.addEventListener('click', newGame)

pickRock.addEventListener('click', function () { playerPick('rock') })
pickPaper.addEventListener('click', function () { playerPick('paper') })
pickScissors.addEventListener('click', function () { playerPick('scissors') })

player = {
  name: '',
  score: 0
},
computer = {
  score: 0
}

function setGameElements (gameState) {
  switch (gameState) {
    case 'started':
    newGameElem.style.display = 'none'
    pickElem.style.display = 'block'
    resultsElem.style.display = 'block'
    break
    case 'ended':
    newGameBtn.innerText = 'Jeszcze raz'
    break
    case 'notStarted':
    default:
    newGameElem.style.display = 'block'
    pickElem.style.display = 'none'
    resultsElem.style.display = 'none'
  }
}
setGameElements('notStarted')

function newGame () {
  player.name = prompt('Please enter your name', 'imię gracza')
  if (player.name) {
    player.score = computer.score = 0
    // gameState = 'started'
    setGameElements('started')
    
    playerNameElem.innerHTML = player.name
    setGamePoints()
  }
}

function getComputerPick () {
  var possiblePicks = ['rock', 'paper', 'scissors']
  return possiblePicks[Math.floor(Math.random() * 3)]
}

function playerPick (playerPick) {
  var computerPick = getComputerPick()
  
  playerPickElem.innerHTML = playerPick
  computerPickElem.innerHTML = computerPick
  
  checkRoundWinner(playerPick, computerPick)
}

function checkRoundWinner (playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = ''
  
  var winnerIs = 'player'
  
  if (playerPick === computerPick) {
    winnerIs = 'noone' // remis
  } else if (
    (computerPick === 'rock' && playerPick === 'scissors') ||
    (computerPick === 'scissors' && playerPick === 'paper') ||
    (computerPick === 'paper' && playerPick === 'rock')) {
      winnerIs = 'computer'
    }
    if (winnerIs === 'player') {
      playerResultElem.innerHTML = 'Win!'
      player.score++
      document.getElementById('js-playerPoints').innerHTML = player.score
    } else if (winnerIs === 'computer') {
      computerResultElem.innerHTML = 'Win!'
      computer.score++
      document.getElementById('js-computerPoints').innerHTML = computer.score
    }
    
    if (player.score === 10) {
      alert('Wygrałeś!')
    } else if (computer.score === 10) {
      alert('Wygrał Komputer!')
    }
    if (player.score === 10 || computer.score === 10) {
      gameState = 'ended'
      setGameElements()
    }
  }
  
  function setGamePoints () {
    playerPointsElem.innerHTML = player.score
    computerPointsElem.innerHTML = computer.score
  }
  