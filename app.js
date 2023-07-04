const API_KEY = "ztKY+zQfGMZns/2BH13STQ==PfX6fn3h6udAq18E";

const fetchQuestion = async (category, limit) => {
  try {
    let res = await fetch(
      ` https://api.api-ninjas.com/v1/trivia?category=${category}&limit=${limit}`,
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
      console.log("Error getting data");
    }
  } catch (error) {
    console.log("Error with the request");
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
let value = "";
riddle.className = "hide";

pickCategory.className = "hide";

const buttonPlay = () => {
  playButton.addEventListener("click", () => {
    welcomeDiv.className = "hide";
    riddle.className = "hide";
    playButton.className = "hide";
    pickCategory.className = "visible";
    pickCategory.style = "cursor:pointer";
  });
  choice.addEventListener("click", async () => {
    pickCategory.className = "hide";
    riddle.className = "visible";
    let title = document.createElement("h5");
    let p = document.createElement("p");
    let container = document.createElement("div");
    let input = document.createElement("input");
    let button = document.createElement("button");
    input.className = "inputRiddle";
    let question = await fetchIndovinello();
    p.innerText = question.question;
    title.innerText =
      "YOU MUST UNLOCK THE SECRET OF THE RIDDLE TO REVEAL THE HIDDEN PATH";
    button.innerHTML = "CHECK";
    riddle.appendChild(title);
    riddle.appendChild(p);
    riddle.append(container);
    container.style = "margin:2rem";
    container.appendChild(input);
    container.appendChild(button);

    const riddleInput = document.querySelector(".inputRiddle");
    const message = document.createElement("p");
    message.className = "message";
    riddle.appendChild(message);

    riddleInput.addEventListener("change", (e) => {
      value = e.target.value;
    });
    button.addEventListener("click", () => {
      if (
        value.toLowerCase() === question.answer.toLowerCase() ||
        value.toUpperCase() === question.answer.toUpperCase()
      ) {
        pickCategory.className = "visible";

        allCategoryArray.forEach((cat) => {
          const div = document.createElement("div");

          div.textContent = cat;

          category.appendChild(div);
          div.className = "category";
        });
        riddle.style = "display:none";
        const p = document.createElement("p");
        p.innerText = "Generate ranodm number";

        allCategory.appendChild(category);
        pickCategory.appendChild(p);
      } else {
        message.innerText = "Wrong answer. Try again.";
        setTimeout(() => {
          message.innerText = "";
        }, 1000);
        const div = document.createElement("div");
        riddle.appendChild(div);
        let timer = setTimeout(() => {
          div.innerText = "HELP";
          div.addEventListener("mouseover", () => {
            div.innerText = question.answer;
          });
          clearTimeout(timer);
        }, 10000);
      }
    });
  });
};

buttonPlay();
allCategory.addEventListener("mousemove", (event) => {
  const scrollSpeed = 5;
  const direction = event.movementX > 0 ? 1 : -1;
  allCategory.scrollLeft += direction * scrollSpeed;
});

let chooseCategory = "";
const chooseMyCategory = () => {
  category.addEventListener("click", (event) => {
    chooseCategory = event.target.textContent.toLowerCase().split(" ").join("");
    console.log(chooseCategory);
  });
};

document.addEventListener("DOMContentLoaded", chooseMyCategory);

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

/*
allCategoryArray.forEach((cat) => {
  const div = document.createElement("div");
  div.textContent = cat;

  category.appendChild(div);
  div.className = "category";
});

allCategory.appendChild(category);
*/
