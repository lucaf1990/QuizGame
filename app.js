const API_KEY = "opKq14C2gODXJ8QBWgGopDun2TxwxPdSDSIWNQcS";
const fetchIndovinello = async () => {
  try {
    const response = await fetch("riddles.json");
    if (response.ok) {
      const data = await response.json();
      const riddles = data.riddles;
      const randomIndex = Math.floor(Math.random() * riddles.length);
      const randomRiddle = riddles[randomIndex];
      console.log(randomRiddle.question);
      return randomRiddle;
    } else {
      console.error("Error fetching riddles:", response.status);
    }
  } catch (error) {
    console.error("Error fetching riddles:", error);
  }
};
const fetchQuestion = async (category, difficulty) => {
  let limit;

  if (difficulty === "EASY") {
    limit = 10;
  } else if (difficulty === "MEDIUM") {
    limit = 15;
  } else if (difficulty === "HARD") {
    limit = 25;
  } else if (difficulty === "CRAZY") {
    limit = 30;
  }

  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/trivia?category=${category}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    if (res.ok) {
      const data = await res.json();
      const questions = data.map((question) => ({
        question: question.question,
        answer: question.answer,
      }));
      return questions;
    } else {
      console.log("Error getting data:", res.status);
    }
  } catch (error) {
    console.log("Error with the request:", error);
  }
};

const allCategoryArray = [
  "Literature",
  "Language",
  "Science",
  "General",
  "People Places",
  "Geography",
  "History",
  "Entertainment",
  "Toys Game",
  "Music",
  "Mathematics",
  "Food and Drinks",
  "Mythology",
  "Sports",
];

const numberOfQuestions = [5, 10, 15, 30];
const playButton = document.querySelector(".button");
const welcomeDiv = document.querySelector("#welcome");
const pickCategory = document.querySelector(".pickCategory");
const category = document.querySelector(".category");
const allCategory = document.querySelector("#allCategory");
const choice = document.querySelector(".choose");
const riddle = document.querySelector("#riddle");
riddle.className = "hide";
const userChoice = document.createElement("h6");
pickCategory.className = "hide";
const body = document.querySelector("body");
const buttonPlay = () => {
  playButton.addEventListener("click", () => {
    riddle.className = "hide";
    playButton.className = "hide";
    pickCategory.className = "visible";
  });
  choice.addEventListener("click", async () => {
    pickCategory.className = "hide";
    riddle.className = "visible";
    welcomeDiv.className = "hide";
    let title = document.createElement("h5");
    let indovinello = document.createElement("p");
    let container = document.createElement("div");
    let input = document.createElement("input");
    input.placeholder = "";
    input.setAttribute("autofocus", "true");
    let button = document.createElement("button");
    input.className = "inputRiddle";
    let question = await fetchIndovinello();
    body.style = "animation:none";
    indovinello.innerText = question.question;
    title.innerText =
      "YOU MUST UNLOCK THE SECRET OF THE EYE \n TO REVEAL THE HIDDEN PATH";

    button.innerHTML = "TRY";
    riddle.appendChild(title);
    riddle.appendChild(indovinello);
    riddle.append(container);
    container.style = "margin:2rem";
    container.appendChild(input);
    container.appendChild(button);

    const riddleInput = document.querySelector(".inputRiddle");
    const message = document.createElement("span");
    message.className = "message";
    riddle.appendChild(message);
    setTimeout(() => {
      message.innerText = "If you never try you will never know";
    }, 1000);
    riddleInput.addEventListener("change", (e) => {
      value = e.target.value;
    });

    let helpButton;

    button.addEventListener("click", () => {
      if (
        value.toLowerCase() === question.answer.toLowerCase() ||
        value.toUpperCase() === question.answer.toUpperCase()
      ) {
        riddle.style = "display:none";
        pickCategory.className = "hide";
        allCategoryArray.forEach((cat) => {
          const div = document.createElement("div");
          const p = document.createElement("p");
          p.textContent = cat;

          div.appendChild(p);
          allCategory.appendChild(div);
          p.className = "singleCategory";
          div.className = "categories";
        });
      } else if (value === "") {
        message.innerText = "";
      } else {
        message.innerText = "Wrong";
        setTimeout(() => {
          message.innerText = "";
        }, 2000);

        if (!helpButton) {
          const div = document.createElement("div");
          riddle.appendChild(div);
          const input = document.querySelector(".inputRiddle");
          helpButton = input;

          let timer = setTimeout(() => {
            div.innerText = "HELP";
            div.addEventListener("mouseover", () => {
              div.innerText = "Click here if you like to know the answer";
            });
            div.addEventListener("click", () => {
              let answer = question.answer.toLowerCase();
              input.value = answer;
            });
            clearTimeout(timer);
          }, 0);
        }
      }
    });
  });
};

buttonPlay();
const singleCategory = document.querySelector(".singleCategory");
allCategory.addEventListener("mousemove", (event) => {
  const scrollSpeed = 5;
  const direction = event.movementX > 0 ? 1 : -1;
  allCategory.scrollLeft += direction * scrollSpeed;
});

const chooseMyCategory = (callback) => {
  allCategory.addEventListener("click", (event) => {
    if (event.target.classList.contains("singleCategory")) {
      const selectedCategory = event.target.textContent;
      callback(selectedCategory);
    }
  });
};

const chooseCategory = (selectedCategory) => {
  console.log(
    "Selected category:",
    selectedCategory.toLowerCase().split(" ").join("")
  );
};

const chooseDifficulty = (selectedDifficulty) => {
  console.log("Selected difficulty:", selectedDifficulty);
};

const appendSelectedCategory = async () => {
  let div = document.createElement("div");
  let question = document.createElement("section");
  let text = document.createElement("p");
  let button1 = document.createElement("button");
  let button2 = document.createElement("button");
  let button3 = document.createElement("button");
  let button4 = document.createElement("button");
  let start = document.createElement("button");
  start.className = "hide";
  allCategory.appendChild(div);
  div.className = "pickDiv";
  let p = document.createElement("p");
  p.className = "picked";
  div.appendChild(p);

  question.className = "hide";

  chooseMyCategory((selectedCategory) => {
    p.textContent = `${selectedCategory}`;
    question.className = "pickDivButton";
    start.className = "visible";
    chooseCategory(selectedCategory);
  });
  start.innerHTML = "START";
  text.textContent = "CHOOSE DIFFICULTY";
  button1.innerHTML = "EASY";
  button1.className = "myButton";
  button2.className = "myButton";
  button3.className = "myButton";
  button2.innerHTML = "MEDIUM";
  button3.innerHTML = "HARD";
  button4.innerHTML = "CRAZY";

  question.appendChild(text);
  question.appendChild(button1);
  question.appendChild(button2);
  question.appendChild(button3);
  question.appendChild(button4);

  div.appendChild(question);
  let selectedDifficulty;

  button1.addEventListener("click", (e) => {
    e.stopPropagation();
    selectedDifficulty = "EASY";
  });

  button2.addEventListener("click", (e) => {
    e.stopPropagation();
    selectedDifficulty = "MEDIUM";
  });

  button3.addEventListener("click", (e) => {
    e.stopPropagation();
    selectedDifficulty = "HARD";
  });

  button4.addEventListener("click", (e) => {
    e.stopPropagation();
    selectedDifficulty = "CRAZY";
  });

  div.appendChild(start);
  start.addEventListener("click", async () => {
    const selectedCategory = document.querySelector(".picked").textContent;

    const questions = await fetchQuestion(
      selectedCategory.toLowerCase(),
      selectedDifficulty
    );

    startQuiz(questions);
  });
};

appendSelectedCategory();
let correctCounter = 0;
let wrongCounter = 0;
const startQuiz = (questions) => {
  let correctCounter = 0;
  let wrongCounter = 0;
  const userAnswers = [];

  const showSummary = () => {
    const pickDiv = document.querySelector(".pickDiv");
    pickDiv.className = "hide";
    const questionContainer = document.querySelector("#question-container");
    questionContainer.className = "hide";
    const questionCounter = document.querySelector(".counter");
    questionCounter.className = "hide";
    const skip = document.querySelector(".skip");
    skip.className = "hide";
    const summaryContainer = document.createElement("div");
    summaryContainer.id = "summary-container";

    const summaryHeading = document.createElement("h2");
    summaryHeading.textContent = "Quiz Summary";
    summaryContainer.appendChild(summaryHeading);

    questions.forEach((question, index) => {
      const questionSummary = document.createElement("div");
      questionSummary.classList.add("question-summary");

      const questionElement = document.createElement("p");
      questionElement.textContent = `Question ${index + 1}: ${
        question.question
      }`;
      questionSummary.appendChild(questionElement);

      const userAnswerElement = document.createElement("p");
      userAnswerElement.textContent = `Your Answer: ${
        question.userAnswer !== undefined ? question.userAnswer : "SKIPPED"
      }`;
      questionSummary.appendChild(userAnswerElement);

      const correctAnswerElement = document.createElement("p");
      correctAnswerElement.textContent = `Correct Answer: ${question.answer}`;
      questionSummary.appendChild(correctAnswerElement);

      summaryContainer.appendChild(questionSummary);
    });

    allCategory.appendChild(summaryContainer);
  };

  const div = document.querySelectorAll(".categories");
  const section = document.querySelectorAll(".pickDivButton");
  div.forEach((cat) => (cat.className = "hide"));
  section.forEach((sec) => (sec.className = "hide"));
  let currentQuestionIndex = 0;
  const totalQuestions = questions.length;

  const showQuestion = (index) => {
    const questionContainer = document.querySelector("#question-container");
    questionContainer.innerHTML = "";

    const questionElement = document.createElement("p");
    questionElement.className = "questionPar";
    questionElement.textContent = questions[index].question;
    questionContainer.appendChild(questionElement);
    questionContainer.className = "questionContainer";
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "";
    input.setAttribute("autofocus", "true");
    questionContainer.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.textContent = "SUBMIT";
    submitButton.className = "submit";
    submitButton.addEventListener("click", () => {
      const userAnswer = input.value.trim();

      let confirmSubmit = true;
      if (confirmSubmit) {
        userAnswers.push(userAnswer);
        checkAnswer(index, userAnswer);
      }

      input.value = "";
    });

    questionContainer.appendChild(submitButton);
    allCategory.appendChild(questionContainer);
  };

  const skipButton = document.createElement("button");
  skipButton.textContent = "SKIP";
  skipButton.className = "skip";
  skipButton.addEventListener("click", () => {
    const userAnswer = "SKIPPED";
    wrongCounter++;
    updateCounters();
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
      showQuestion(currentQuestionIndex);
    } else {
      showSummary();
    }
  });

  allCategory.appendChild(skipButton);

  const checkAnswer = (index, userAnswer) => {
    let correctAnswer = questions[index].answer;
    questions[index].userAnswer = userAnswer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      console.log("Correct answer!");
      correctCounter++;
    } else {
      console.log("Wrong answer!");
      wrongCounter++;
    }

    updateCounters();

    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
      showQuestion(currentQuestionIndex);
    } else {
      showSummary();
    }
  };

  const updateCounters = () => {
    const correctCounterElement = document.querySelector("#correct-counter");
    const wrongCounterElement = document.querySelector("#wrong-counter");
    correctCounterElement.textContent = correctCounter;
    wrongCounterElement.textContent = wrongCounter;
  };

  const countersContainer = document.createElement("div");
  countersContainer.innerHTML = `
    <p>Correct Answers: <span id="correct-counter">0</span></p>
    <p>Wrong Answers: <span id="wrong-counter">0</span></p>
  `;
  countersContainer.className = "counter";
  allCategory.appendChild(countersContainer);

  showQuestion(currentQuestionIndex);
};
