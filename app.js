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
const fetchQuestion = async (category, limit) => {
  try {
    let res = await fetch(
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
      let data = await res.json();
      console.log(data);
      return data;
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
    welcomeDiv.className = "hide";
    riddle.className = "hide";
    playButton.className = "hide";
    pickCategory.className = "visible";
  });
  choice.addEventListener("click", async () => {
    pickCategory.className = "hide";
    riddle.className = "visible";
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

        const div = document.createElement("div");
        riddle.appendChild(div);
        let timer = setTimeout(() => {
          div.innerText = "HELP";
          div.addEventListener("mouseover", () => {
            div.innerText = question.answer;
          });
          clearTimeout(timer);
        }, 0);
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
    chooseCategory(selectedCategory); // Call the callback with the selected category
  });

  text.textContent = "CHOOSE DIFFICULTY";
  button1.innerHTML = "EASY";
  button1.className = "myButton";
  button2.className = "myButton";
  button3.className = "myButton";
  button2.innerHTML = "10";
  button3.innerHTML = "15";
  start.innerHTML = "START";
  question.appendChild(text);
  question.appendChild(button1);
  question.appendChild(button2);
  question.appendChild(button3);
  div.appendChild(start);
  div.appendChild(question);
  button1.addEventListener("click", (e) => {
    e.stopPropagation();
    let difficulty = chooseDifficulty("5");
    return difficulty;
  });
  button2.addEventListener("click", (e) => {
    e.stopPropagation();
    let difficulty = chooseDifficulty("10");
    return difficulty;
  });
  button3.addEventListener("click", (e) => {
    e.stopPropagation();
    let difficulty = chooseDifficulty("15");
    return difficulty;
  });
  start.addEventListener("click", async () => {
    const selectedCategory = document.querySelector(".picked").textContent;
    const selectedDifficulty = document.querySelector(".myButton").textContent;

    // Fetch questions based on the selected category and difficulty
    const questions = await fetchQuestion(selectedCategory.toLowerCase(), "10");

    // Call the startQuiz function with the fetched questions
    startQuiz(questions);
  });
};

appendSelectedCategory();
let correctCounter = 0;
let wrongCounter = 0;
const startQuiz = (questions) => {
  let correctCounter = 0;
  let wrongCounter = 0;

  const div = document.querySelectorAll(".categories");
  const section = document.querySelectorAll(".pickDivButton");
  div.forEach((cat) => (cat.className = "hide"));
  section.forEach((sec) => (sec.className = "hide"));
  let currentQuestionIndex = 0;
  const totalQuestions = questions.length;

  const showQuestion = (index) => {
    const questionContainer = document.querySelector("#question-container");
    questionContainer.innerHTML = ""; // Clear any existing content

    const questionElement = document.createElement("p");
    questionElement.textContent = questions[index].question;
    questionContainer.appendChild(questionElement);

    const input = document.createElement("input");
    input.type = "text";
    questionContainer.appendChild(input);

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", () => {
      const userAnswer = input.value.trim();
      checkAnswer(index, userAnswer);
    });
    questionContainer.appendChild(submitButton);

    allCategory.appendChild(questionContainer);
  };
  const skipButton = document.createElement("button");
  skipButton.textContent = "Skip";
  skipButton.addEventListener("click", () => {
    wrongCounter++;
    updateCounters();
    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
      showQuestion(currentQuestionIndex);
    } else {
      console.log("Quiz completed!"); // All questions answered
    }
  });
  allCategory.appendChild(skipButton);
  const checkAnswer = (index, userAnswer) => {
    let correctAnswer = questions[index].answer;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      console.log("Correct answer!");
      correctCounter++;

      // Move to the next question
      if (currentQuestionIndex < totalQuestions) {
        showQuestion(++currentQuestionIndex);
      } else {
        console.log("Quiz completed!"); // All questions answered
      }
    } else {
      console.log("Wrong answer!");
      wrongCounter++;
    }
    updateCounters(); // Update the counters after each answer
  };

  const updateCounters = () => {
    const correctCounterElement = document.querySelector("#correct-counter");
    const wrongCounterElement = document.querySelector("#wrong-counter");
    correctCounterElement.textContent = correctCounter;
    wrongCounterElement.textContent = wrongCounter;
  };

  // Create and append counters
  const countersContainer = document.createElement("div");
  countersContainer.innerHTML = `
    <p>Correct Answers: <span id="correct-counter">0</span></p>
    <p>Wrong Answers: <span id="wrong-counter">0</span></p>
  `;
  allCategory.appendChild(countersContainer);

  // Show the first question
  showQuestion(currentQuestionIndex);
};
