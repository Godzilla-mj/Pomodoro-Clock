const pointDisplay = document.querySelector('.point')
const sessionDisplay = document.querySelector('.settings-session-display')
const breakDisplay = document.querySelector('.settings-break-display')
const clockDisplay = document.querySelector('.clock-display')

let sessionTime = 2
let breakTime = 1
let seconds

let pause = false;
let reset = false;
let isBeginning = true;
let onBreak = false;

function countdown(minutes) {
	let seconds = minutes * 60
	count = setInterval(function() {
		if(reset){
			clearInterval(count)
			reset = false
			let resetPlay = true
		}
		else if(!pause && seconds){
			console.log(seconds - 1)
			seconds--;
			let minRemaining = parseInt(seconds / 60)
			let secRemaining = parseInt(seconds % 360 % 60)
			clockDisplay.innerHTML = `${minRemaining}:${secRemaining}`
		}else if (seconds === 0 && !onBreak) {
			seconds = 0
			clearInterval(count)
			onBreak = true
			countdown(breakTime)
			pointDisplay.innerHTML = "Break Time!"
		}else if (seconds === 0 && onBreak) {
			clearInterval(count)
			clockDisplay.innerHTML = "DONE!"
		}
	},1000)
}

function startTimer() {
	if(isBeginning) {
		isBeginning = false
		pause = false
		countdown(sessionTime)
	} else {
		pause = false
	}
}

function resetTimer() {
  pauseTimer()
  reset = true
	isBeginning = true
  sessionTime = 1
  breakTime = 1
  clockDisplay.innerHTML = `${sessionTime}:00`;
}

function pauseTimer() {
  if (!pause) {
		pause = true
	}else {
		pause = false
	}
}

function stopTimer() {
  pauseTimer()
  resetTimer()
}


function updateSession(minutes) {
	let sessionSeconds = minutes * 60
	let minSession = parseInt(sessionSeconds / 60)
	let secSession = parseInt(sessionSeconds % 360 % 60)
	sessionDisplay.innerHTML = `${minSession}`
	clockDisplay.innerHTML = `${minSession}:00`
}

function updateBreak(minutes) {
	let breakSeconds = minutes * 60
	let minBreak = parseInt(breakSeconds / 60)
	let secBreak = parseInt(breakSeconds % 360 % 60)
	breakDisplay.innerHTML = `${minBreak}`
}

document.querySelector('.settings-session-down').addEventListener('click', () => {
	if (sessionTime > 1) {
		sessionTime--
		updateSession(sessionTime)
	}
})
document.querySelector('.settings-session-up').addEventListener('click', () => {
  sessionTime++
	updateSession(sessionTime)
})
document.querySelector('.settings-break-down').addEventListener('click', () => {
	if (breakTime > 1) {
		breakTime--
		updateBreak(breakTime)
	}
})
document.querySelector('.settings-break-up').addEventListener('click', () => {
  breakTime++
	updateBreak(breakTime)
})

document.querySelector('.clock-play').addEventListener('click', startTimer)
document.querySelector('.clock-reset').addEventListener('click', resetTimer)
document.querySelector('.clock-pause').addEventListener('click', pauseTimer)
document.querySelector('.clock-stop').addEventListener('click', stopTimer)

updateSession(sessionTime)
updateBreak(breakTime)
