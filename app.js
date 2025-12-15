let gameseq = [];
let userseq = [];
let btns = ["red", "yellow", "green", "purple"];

let h2 = document.querySelector("h2");

let started = false;
let level = 0;
let heighestScore = 0;

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userseq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameseq.push(randColor);
  // console.log(gameseq);

  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    heighestScore = Math.max(heighestScore, level);
    h2.innerHTML = `GAME OVER! Your Score is <b>${level}</b> <br>Heighest score is <b>${heighestScore}</b> <br>Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  let usreColor = this.getAttribute("id");
  userseq.push(usreColor);
  // console.log(userseq);
  checkAns(userseq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameseq = [];
  userseq = [];
  level = 0;
}
