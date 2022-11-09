const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log("Number: ", randomNum);

window.speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

let recognition = new window.speechRecognition();

//start recognition and game
recognition.start();

//capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

//check message against number
function checkNumber(msg) {
  const num = +msg;

  //check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML += `
		<div>
		Not a valid number 
		</div>
`;
    return;
  }

  //check in range
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `
		<div>
		Number must be between 1 and 100
		</div>
		`;
    return;
  }

  //check number
  if (num === randomNum) {
    document.body.innerHTML = `
		<h2>Congratulations! You have guessed the number <br> <br>
		It was ${num}</h2>
		<button class="play-again" id="play-again">
		Play Again
</button>
		`;
  } else if (num > randomNum) {
    msg.innerHTML += `
		<div>
		GO LOWER
     </div>
     `;
  } else {
    msgEl.innerHTML += `
	  <div>
	  GO HIGHER 
	  </div>
	  `;
  }
}

//write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
	<div>You said: </div>
	<span class="box">${msg}</span>
	`;
}

//generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//speak result
recognition.addEventListener("result", onSpeak);

//end speech recognition service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === `play-again`) {
    window.location.reload();
  }
});
