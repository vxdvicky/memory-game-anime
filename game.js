
let level = 1;
let levelData = {
  1: ["🤣","🤣","❤","❤","👌","👌","🤢","🤢"],
  2: ["🐱","🐱","💕","💕","🎅","🎅","⏳","⏳","🌈","🌈","🍕","🍕"],
  3: ["⚽","⚽","🚀","🚀","🎧","🎧","👽","👽","🧠","🧠","🎉","🎉","🐍","🐍","🦊","🦊"]
};

let timer, timeLeft, flippedCards = 0;
const gameBox = document.getElementById("game");
const timerDisplay = document.getElementById("timer");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popupText");
const nextBtn = document.getElementById("nextBtn");

const flipSound = document.getElementById("flipSound");
const matchSound = document.getElementById("matchSound");
const winSound = document.getElementById("winSound");
const failSound = document.getElementById("failSound");

function startGame() {
  gameBox.innerHTML = "";
  flippedCards = 0;
  let emojis = [...levelData[level]];
  emojis = emojis.sort(() => Math.random() - 0.5);

  emojis.forEach(emoji => {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = emoji;
    box.onclick = function () {
      if (box.classList.contains("boxOpen") || box.classList.contains("boxMatch")) return;

      box.classList.add("boxOpen");
      flipSound.play();
      let openBoxes = document.querySelectorAll(".boxOpen");

      if (openBoxes.length === 2) {
        setTimeout(() => {
          if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
            openBoxes.forEach(el => el.classList.add("boxMatch"));
            matchSound.play();
            flippedCards += 2;
            if (flippedCards === emojis.length) {
              clearInterval(timer);
              winSound.play();
              popupText.innerText = level < 3 ? "🎉 Level Completed!" : "🏆 You Won All Levels!";
              nextBtn.innerText = level < 3 ? "Next Level" : "Play Again";
              popup.style.display = "flex";
            }
          }
          openBoxes.forEach(el => el.classList.remove("boxOpen"));
        }, 500);
      }
    };
    gameBox.appendChild(box);
  });

  startTimer();
}

function startTimer() {
  timeLeft = 40;
  timerDisplay.innerText = `Time: ${timeLeft}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time: ${timeLeft}s`;
    if (timeLeft === 0) {
      clearInterval(timer);
      failSound.play();
      popupText.innerText = "💀 Time Over!";
      nextBtn.innerText = "Try Again";
      popup.style.display = "flex";
    }
  }, 1000);
}

nextBtn.onclick = () => {
  popup.style.display = "none";
  if (timeLeft === 0 || level === 3) {
    level = 1;
  } else {
    level++;
  }
  startGame();
};

startGame();
