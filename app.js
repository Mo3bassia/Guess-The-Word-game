let gameName = "Guess The Word";

document.title = gameName;
document.querySelector("h1").textContent = gameName;
document.querySelector(
  "footer"
).textContent = `${gameName} Game Created By Mo3bassia`;

let numberOfTries = 6;
let numberOfLetters = 8;
let currentTry = 1;
let inputs = document.querySelector(".inputs");
let guess = document.querySelector(".check");
let messageArea = document.querySelector(".message");

let totalHints = 3;

let wordToGuess = "";
let arr = [
  "monster",
  "bicycle",
  "college",
  "mystery",
  "silence",
  "special",
  "journey",
  "breathe",
  "sixteen",
  "whisper",
  "freedom",
  "mixture",
  "revolve",
  "capture",
  "protect",
  "stomach",
  "exercise",
  "chicken",
  "welcome",
  "outside",
  "fashion",
  "bizarre",
  "chamber",
  "drought",
  "singing",
  "balance",
  "stretch",
  "culture",
  "display",
  "nominee",
  "bracket",
  "massage",
  "awesome",
  "program",
  "picture",
  "physics",
  "ability",
  "kitchen",
  "formula",
  "feature",
  "honesty",
  "surface",
  "society",
  "product",
  "undergo",
  "tension",
  "serious",
  "present",
  "express",
  "private",
  "harvest",
  "package",
  "prudent",
  "improve",
  "journey",
  "network",
  "toddler",
  "brother",
  "purpose",
  "stretch",
  "mixture",
  "freedom",
  "journal",
  "deposit",
  "history",
  "straight",
  "license",
  "install",
  "chicken",
  "special",
  "derange",
  "reserve",
  "promise",
  "conduct",
  "revenge",
  "believe",
  "machine",
  "private",
  "confirm",
  "capture",
  "mohamedatefabassia",
  "usually",
  "bargain",
  "country",
  "starter",
  "perform",
  "deserve",
  "gesture",
  "account",
  "company",
  "actress",
  "stamina",
  "support",
  "program",
  "justice",
  "formula",
  "breathe",
  "install",
  "sixteen",
  "package",
];
let rand = Math.floor(Math.random() * arr.length);
wordToGuess = arr[rand];

numberOfLetters = wordToGuess.length;

function generateInputs() {
  for (let i = 0; i < numberOfTries; i++) {
    let tryDiv = document.createElement("div");
    if (i != 0) {
      tryDiv.classList.add("disabled");
    }
    inputs.append(tryDiv);
    tryDiv.innerHTML = `<span>Try ${i + 1}</span>`;
    tryDiv.id = `try-${i + 1}`;

    for (let j = 0; j < numberOfLetters; j++) {
      let input = document.createElement("input");
      input.id = `guess${i + 1}-letter${j + 1}`;
      tryDiv.append(input);

      input.setAttribute("maxLength", 1);
    }
  }

  const inputsInDisabledDiv = document.querySelectorAll(
    ".inputs div.disabled input"
  );

  inputsInDisabledDiv.forEach((e) => {
    e.disabled = true;
  });

  let allInputs = document.querySelectorAll("input");

  allInputs.forEach((input, index) => {
    input.oninput = function () {
      this.value = this.value.toLowerCase();
      if (index != allInputs.length - 1 && input.value != "") {
        allInputs[index + 1].focus();
      }
    };
    input.onkeydown = function (event) {
      let currentIndex = Array.from(allInputs).indexOf(event.target);

      if (event.key == "ArrowRight") {
        let nextIndex = currentIndex + 1;
        if (nextIndex < allInputs.length) {
          allInputs[nextIndex].focus();
        }
      }
      if (event.key == "ArrowLeft") {
        let previousIndex = currentIndex - 1;
        if (previousIndex >= 0) {
          allInputs[previousIndex].focus();
        }
      }
    };
  });
}

guess.addEventListener("click", handleGuess);

console.log(wordToGuess);
function handleGuess() {
  let successGuess = true;

  for (let i = 0; i < numberOfLetters; i++) {
    let inputField = document.querySelector(
      `#guess${currentTry}-letter${i + 1}`
    );

    let letter = inputField.value.toLowerCase();

    if (wordToGuess[i] == letter) {
      inputField.classList.add("yes-in-place");
    } else if (
      wordToGuess[i] != letter &&
      wordToGuess.split("").includes(letter)
    ) {
      inputField.classList.add("yes-not-in-place");
      successGuess = false;
    } else {
      inputField.classList.add("no");
      successGuess = false;
    }
  }

  if (successGuess) {
    messageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;

    let allTries = document.querySelectorAll(".inputs > div");

    allTries.forEach((tryDiv) => {
      console.log(tryDiv);
      tryDiv.classList.add("disabled");
      guess.disabled = true;
      document.querySelector(".hint").disabled = true;
    });
  } else {
    if (document.querySelectorAll(".inputs > div").length != currentTry) {
      document.querySelector(`#try-${currentTry}`).classList.add("disabled");
      document
        .querySelector(`#try-${currentTry}`)
        .querySelectorAll("input")
        .forEach((input) => {
          input.disabled = true;
        });
      currentTry++;
      document.querySelector(`#try-${currentTry}`).classList.remove("disabled");
      document
        .querySelector(`#try-${currentTry}`)
        .querySelectorAll("input")
        .forEach((input) => {
          input.removeAttribute("disabled");
        });
      document.querySelector(`#try-${currentTry}`).children[1].focus();
    } else {
      guess.disabled = true;
      document.querySelector(".hint").disabled = true;
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
  }
}

document.querySelector(".hint span").innerHTML = totalHints;

let hintBtn = document.querySelector(".hint");

hintBtn.addEventListener("click", getHint);

function getHint() {
  if (totalHints > 0) {
    totalHints--;
    document.querySelector(".hint span").innerHTML = totalHints;
  }
  if (totalHints == 0) {
    document.querySelector(".hint").disabled = true;
  }

  let enabledInputs = document.querySelectorAll(`#try-${currentTry} input`);
  let emptyEnabledInps = Array.from(enabledInputs).filter((e) => e.value == "");

  if (emptyEnabledInps.length > 0) {
    let randomIndex = Math.floor(Math.random() * emptyEnabledInps.length);
    let randomInput = emptyEnabledInps[randomIndex];
    let indexToFill = Array.from(enabledInputs).indexOf(randomInput);

    console.log(randomInput);
    console.log(wordToGuess[randomIndex]);
    randomInput.value = wordToGuess[indexToFill];
  }
}

function handleBackspace(event) {
  if (event.key === "Backspace") {
    let input = event.target;
    let allInputs = document.querySelectorAll("input:not([disabled])");
    let currentIndex = Array.from(allInputs).indexOf(input);

    if (currentIndex > 0) {
      let currentInput = allInputs[currentIndex];
      let previousIndex = currentIndex - 1;
      let previousInput = allInputs[previousIndex];

      currentInput.value = "";
      previousInput.focus();
    }
  }
}

document.addEventListener("keydown", handleBackspace);

window.onload = function () {
  generateInputs();
};
