

let possibles = [1,2,3,4,5,6,7,8,9]
let arr = []
let alreadyGuessed = []
let count = {bulls: 0, cows: 0}
let guesses = 0
let currentGuess = 0
let main = document.querySelector('.main')
let wrappers = document.querySelectorAll('.wrapper')
let already_guessed_display = document.querySelector('already-guessed')
let scoreArea = document.querySelector('.score')
let buttons = document.getElementsByTagName('button')
let inputNumbers = document.querySelectorAll('.number')
let input = document.querySelectorAll('.number')[guesses]
let text = document.querySelector('.text')
let losingText = document.querySelector('.loser')
let losing_secret_num = document.querySelector('.losing_secret_num')
let winning_secret = document.querySelector('.winning_secret')
let winning_text = document.querySelector('.winning_text')
let cowIcon = 'images/cowIcon30.png'
let bullIcon = 'images/bullIcon30.png'


// this creates the secret number to guess
function createNumber() {
  while (arr.length < 4) {
    let randomNumber = (Math.floor(Math.random() * possibles.length))
      let number = possibles.splice(randomNumber,1)
      arr.push(number)
    }
    console.log('Secret number: ' + arr.join(''))
  }
  createNumber()

// this checks the player's guess against the secret number
function getScore() {
  currentGuess = inputNumbers[guesses].value
  secret = arr.join('')
  count.cows = 0
  count.bulls = 0

  // If x is Not a Number or less than one or greater than 10
  if (isNaN(currentGuess) || currentGuess < 1000 || currentGuess > 9999) {
    alert( "Guess is not valid")
    inputNumbers[guesses].value = null
    return
  } 


  for (i = 0; i < secret.length; i++) {
    let currDigit = currentGuess.search(secret[i]) != -1  // this searches through currentGuess, looking to see if secret[i] is in that string; if so, it returns the index where the first occurrance is.  If it's not in there at all, it returns -1
      if (secret[i] == currentGuess[i]) {
        count.bulls = count.bulls + 1
      } else if (currDigit) {
        count.cows = count.cows + 1
      }
  }
  alreadyGuessed.unshift([currentGuess, count.bulls, count.cows])
  // console.log('alreadyGuessed in getScore: ' + alreadyGuessed)

    scoreArea.innerHTML = `<p>Guess ${guesses + 1}: ${alreadyGuessed[0][0]} - ${count.bulls}<img src=${bullIcon}>    ${count.cows}<img src=${cowIcon}>  ${scoreArea.innerHTML}</p>`
  guesses++
    checkBovine()
}

// this checks to see if there is a winner
function checkBovine() {
      if (count.bulls < 4) {
        toggleMenu()
      } else if (count.bulls == 4) {
          playAgain.classList.remove('hidden')
          hideAllWrappers()
          text.classList.add('hidden')
          winning_secret.innerHTML = `${guesses}`
          winning_text.classList.remove('hidden')
          return
      } else {
        return
      }
  }
  function loser() {
    text.classList.add('hidden')
    losingText.classList.remove('hidden')
    losing_secret_num.innerHTML = `${secret}`
  }

  function toggleMenu() {
    hideAllWrappers()
    if (guesses < 10) {
    wrappers[guesses].classList.remove('hidden')
    input.focus()
    } else if (guesses == 10 && count.bulls != 4) {
      hideAllWrappers()
      document.querySelector('#playAgain').classList.remove('hidden')
      loser()
    }
  }

  function hideAllWrappers() {
    wrappers.forEach(function(el) {
      el.classList.add('hidden')
    })
  }


  main.addEventListener('keyup', function(event) {
    event.preventDefault()
    if(event.keyCode == 13) {
      buttons[guesses].click()
    }
  })
