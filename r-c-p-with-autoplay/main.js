let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  tie: 0,
  lose: 0,
};

updatescore();

let autoplaying = false;
let interval_id;

function autoplay() {
  if (!autoplaying) {
    interval_id = setInterval(function () {
      const computer = computermove();
      playgame(computer);
    }, 2000);
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
  ).innerHTML = ` you : <img src="/with js/rock-paper-scissor/${playermove}-emoji.png" alt="" class="r-c-p-img" /> computer :  <img src="/with js/rock-paper-scissor/${computer}-emoji.png" alt="" class="r-c-p-img" /> `;

  updatescore();
};

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

let resetscore = () => {
  score.win = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem("score");
  updatescore();
};

function updatescore() {
  document.querySelector(
    ".score"
  ).innerHTML = `wins : ${score.win} | lose : ${score.lose} | tie : ${score.tie}`;
}
