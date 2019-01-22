

let possibles = [1,2,3,4,5,6,7,8,9]
let arr = []
let alreadyGuessed = []
let count = {bulls: 0, cows: 0}
let wrappers = document.querySelectorAll('.wrapper')
let guesses = 0
let already_guessed_display = document.querySelector('already-guessed')
let scoreArea = document.querySelector('.score')
let inputNumbers = document.querySelectorAll('.number')
// let currentFocus = inputNumbers[guesses].focus()
let currentGuess = 0
let text = document.querySelector('.text')
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
  // debugger
  // currentGuess = guess.value
  // console.log('getScore now running')
  secret = arr.join('')
  count.cows = 0
  count.bulls = 0
  for (i = 0; i < secret.length; i++) {
    let currDigit = currentGuess.search(secret[i]) != -1  // this searches through currentGuess, looking to see if secret[i] is in that string; if so, it returns the index where the first occurrance is.  If it's not in there at all, it returns -1
      if (secret[i] == currentGuess[i]) {
        count.bulls = count.bulls + 1
        // console.log('Bulls: ' + count.bulls)
      } else if (currDigit) {
        count.cows = count.cows + 1
        // console.log('Cows: ' + count.cows)
      }
  }
  alreadyGuessed.unshift([currentGuess, count.bulls, count.cows])
  console.log('alreadyGuessed in getScore: ' + alreadyGuessed)

    scoreArea.innerHTML = `<p>${alreadyGuessed[0][0]} - ${count.bulls}<img src=${bullIcon}>    ${count.cows}<img src=${cowIcon}>  ${scoreArea.innerHTML}</p>`
  guesses++
  // console.log('guesses now: ' + guesses)

    checkBovine()
}

// this checks to see if there is a winner
function checkBovine() {
  // debugger
      if (count.bulls < 4) {
        toggleMenu()
      } else if (count.bulls == 4) {
          playAgain.classList.remove('hidden')
          hideAllWrappers()
          // guessAgain.classList.add('hidden')
          scoreArea.innerHTML += `<p>You won using only ${guesses} guesses!</p>`
          return
      } else {
        return
      }
  }
  function loser() {
    text.textContent = `You did not guess the correct number, ${arr.join('')}.  Would you like to try again with a new number?`
  }

  function toggleMenu() {
    // console.log('toggleMenu now running')
    hideAllWrappers()
    if (guesses < 10) {
    wrappers[guesses].classList.remove('hidden')
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
