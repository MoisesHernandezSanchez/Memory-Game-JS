const cardArray = [
  {
    name: 'Fries',
    img: 'images/fries.png',
  },
  {
    name: 'Cheesburger',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'Hotdog',
    img: 'images/hotdog.png',
  },
  {
    name: 'Ice Cream',
    img: 'images/ice-cream.png',
  },
  {
    name: 'Milkshake',
    img: 'images/milkshake.png',
  },
  {
    name: 'Pizza',
    img: 'images/pizza.png',
  },
  {
    name: 'Fries',
    img: 'images/fries.png',
  },
  {
    name: 'Cheesburger',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'Hotdog',
    img: 'images/hotdog.png',
  },
  {
    name: 'Ice Cream',
    img: 'images/ice-cream.png',
  },
  {
    name: 'Milkshake',
    img: 'images/milkshake.png',
  },
  {
    name: 'Pizza',
    img: 'images/pizza.png',
  },
]
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = $('#grid')
const messageDisplay = $('#message')
const attemptsDisplay = $('#attempts')
let attempts = 0
let message = 'Memory Match'
let cardsChosen = []
let cardsChosenIds = []
let cardsWon = []

function createBoard() {
  messageDisplay.text(message)
  attemptsDisplay.html(attempts)
  for (let i = 0; i < cardArray.length; i++) {
    $('<img/>')
      .attr('src', 'images/blank.png')
      .attr('data-id', i)
      .on('click', flipCard)
      .appendTo(gridDisplay)
  }
}

function flipCard() {
  const cardId = $(this).attr('data-id')

  cardsChosen.push(cardArray[cardId].name)
  cardsChosenIds.push(cardId)

  $(this).attr('src', cardArray[cardId].img)
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500)
  }
}

function checkMatch() {
  const cards = $('#grid img')
  const [item1, item2] = cardsChosen

  if (cardsChosenIds[0] == cardsChosenIds[1]) {
    alert('You have click the same image')
  }

  if (item1 === item2) {
    alert('match found')
    $(cards[cardsChosenIds[0]]).attr('src', 'images/white.png').off('click')
    $(cards[cardsChosenIds[1]]).attr('src', 'images/white.png').off('click')
    cardsWon.push(cardsChosen)
  } else {
    $(cards[cardsChosenIds[0]]).attr('src', 'images/blank.png')
    $(cards[cardsChosenIds[1]]).attr('src', 'images/blank.png')
    alert('Match not found')
    attempts++
    attemptsDisplay.html(attempts)
  }

  cardsChosen = []
  cardsChosenIds = []

  if (cardsWon.length === cardArray.length / 2) {
    $('#grid img').remove()
    messageDisplay.text('Game Over. You Win!')
    $('<btn>')
      .attr('class', 'btn btn-primary newGameBtn')
      .on('click', resetGame)
      .html('New game')
      .appendTo('#newGameBtn')
  }
}

function resetGame() {
  cardsChosen = []
  cardsChosenIds = []
  cardsWon = []
  attempts = 0
  message = 'Memory Match'
  $('.newGameBtn').remove()
  createBoard()
}

createBoard()
