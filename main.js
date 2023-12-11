//  update score form local storage

let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  tie: 0,
  lose: 0,
};

updatescore();

// for autoplay

let autoplaying = false;
let interval_id;

function autoplay() {
  if (!autoplaying) {
    interval_id = setInterval(() => {
      const computer = computermove();
      playgame(computer);
    }, 1000);

    autoplaying = true;

    document.querySelector(".autoplay-btn").innerHTML = "stop";
    document.querySelector(".autoplay-btn").style.padding = "20px 40px";
  } else {
    clearInterval(interval_id);
    autoplaying = false;
    document.querySelector(".autoplay-btn").innerHTML = "autoplay";
    document.querySelector(".autoplay-btn").style.padding = "20px 25px";
  }
}

// using eventlistener instead of onclick in html

const rock_btn = document.getElementById("rock");
rock_btn.addEventListener("click", () => {
  playgame("rock");
});

const scissor_btn = document.getElementById("scissors");
scissor_btn.addEventListener("click", () => {
  playgame("scissors");
});

const paper_btn = document.getElementById("paper");
paper_btn.addEventListener("click", () => {
  playgame("paper");
});

// adding event lister to play the game using keyboard btns

alert(
  '\n " YOU CAN ALSO PLAY USING KEYBOARD " \n PRESS [r] FOR ROCK \n PRESS [p] FOR PAPER \n PRESS [s] FOR SCISSOR'
);

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playgame("rock");
  } else if (event.key === "p") {
    playgame("paper");
  } else if (event.key === "s") {
    playgame("scissors");
  }
});

// this is the main for game

let playgame = (playermove) => {
  const computer = computermove();

  let result = "";

  if (playermove === "rock") {
    if (computer === "rock") {
      result = "tie";
    } else if (computer === "paper") {
      result = "lose";
    } else {
      result = "win";
    }
  } else if (playermove === "scissors") {
    if (computer === "rock") {
      result = "lose";
    } else if (computer === "paper") {
      result = "win";
    } else {
      result = "tie";
    }
  } else if (playermove === "paper") {
    if (computer === "rock") {
      result = "win";
    } else if (computer === "paper") {
      result = "tie";
    } else {
      result = "lose";
    }
  }

  if (result === "win") {
    score.win += 1;
  } else if (result === "lose") {
    score.lose += 1;
  } else if (result === "tie") {
    score.tie += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".result").innerHTML = result;

  document.querySelector(
    ".move"
  ).innerHTML = ` you : <img src="${playermove}-emoji.png" alt="" class="r-c-p-img" /> computer :  <img src="${computer}-emoji.png" alt="" class="r-c-p-img" /> `;

  updatescore();
};

// to find computer move

function computermove() {
  const randomno = Math.random();

  let computer = "";

  if (randomno > 0 && randomno < 1 / 3) {
    computer = "rock";
  } else if (randomno > 1 / 3 && randomno < 2 / 3) {
    computer = "paper";
  } else {
    computer = "scissors";
  }

  return computer;
}

// reset score

let resetscore = () => {
  score.win = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem("score");
  updatescore();
};

// update score

function updatescore() {
  document.querySelector(
    ".score"
  ).innerHTML = `wins : ${score.win} | lose : ${score.lose} | tie : ${score.tie}`;
}

// audio

var audio = document.getElementById("myAudio");

function toggleSong() {
  if (audio.paused) {
    // If the audio is paused, play it
    audio.play();
  } else {
    // If the audio is playing, pause it
    audio.pause();
  }
}

