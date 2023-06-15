const flashcards = document.querySelector(".flashcards");
const createBox = document.querySelector(".create-box");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
let contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

// functions

function delFlashcards() {
  localStorage.clear();
  flashcards.innerHTML = "";
  contentArray = [];
}

function hideCreateBox() {
  createBox.style.display = "none";
}

function showCreateCardBox() {
  createBox.style.display = "block";
}

contentArray.forEach(divMaker);
function divMaker(content, contentIndex) {
  const flashcard = document.createElement("div");
  const questionFlashCard = document.createElement("h2");
  const answerFlashCard = document.createElement("h2");
  const deleteIcon = document.createElement("i");

  flashcard.classList.add("flashcard");

  questionFlashCard.setAttribute(
    "style",
    "border-top: 1px solid red; padding: 15px; margin-top: 30px "
  );
  questionFlashCard.innerHTML = content.my_question;

  answerFlashCard.setAttribute(
    "style",
    "text-align: center; display: none; color: red"
  );
  answerFlashCard.innerHTML = content.my_answer;
  deleteIcon.className = "fas fa-minus";
  deleteIcon.setAttribute(
    "style",
    "top: 5px; right: 5px; color: red; position: absolute; width: 20px; height: 20px; border: 1px solid, black"
  );

  flashcard.appendChild(questionFlashCard);
  flashcard.appendChild(answerFlashCard);
  flashcard.appendChild(deleteIcon);

  flashcard.addEventListener("click", () => {
    answerFlashCard.style.display == "none"
      ? (answerFlashCard.style.display = "block")
      : (answerFlashCard.style.display = "none");
  });

  deleteIcon.addEventListener("click", () => {
    contentArray.splice(contentIndex, 1);
    localStorage.setItem("items", JSON.stringify(contentArray));
    window.location.reload();
  });

  flashcards.appendChild(flashcard);
}

function addFlashcard(e) {
  let flashcard_info = {
    my_question: question.value,
    my_answer: answer.value,
  };

  contentArray.push(flashcard_info);
  localStorage.setItem("items", JSON.stringify(contentArray));
  divMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
  question.value = "";
  answer.value = "";
}
