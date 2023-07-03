console.log("ciao");
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
pickCategory.className = "hide";

const buttonPlay = () => {
  playButton.addEventListener("click", () => {
    welcomeDiv.className = "hide";
    riddle.className = "hide";
    playButton.className = "hide";
    pickCategory.className = "visible";
    pickCategory.style = "cursor:pointer";
    choice.addEventListener("click", () => {
      riddle.className = "visible";
    });
  });
};

buttonPlay();
allCategory.addEventListener("mousemove", (event) => {
  const scrollSpeed = 5;
  const direction = event.movementX > 0 ? 1 : 0;
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
  fetch("riddles.json")
    .then((response) => response.json())
    .then((data) => {
      const riddles = data.riddles;
      const randomIndex = Math.floor(Math.random() * riddles.length);
      const randomRiddle = riddles[randomIndex];
      console.log(randomRiddle.question);
      return riddles;
    })
    .catch((error) => {
      console.error("Error fetching riddles:", error);
    });
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
