const createBookFormBtn = document.querySelector("#create-book-form");
const addBookBtn = document.querySelector(".add-book-btn");
const createBookPopupElement = document.querySelector(".back-overlay");
const backOverlay = document.querySelector(".back-overlay");
const cardBtns = document.querySelector(".card-btns");
const card = document.querySelector(".card");
const midApp = document.querySelector(".mid-app");

const myLibrary = [
  {
    bookTitle: "Hobbit",
    bookAuthor: "Tolk",
    bookPageNumber: 212,
    bookUrl: "C:\\fakepath\\60309_1_ftc.jpg",
  },
  {
    bookTitle: "Hobbit",
    bookAuthor: "Tolk",
    bookPageNumber: 212,
    bookUrl: "C:\\fakepath\\60309_1_ftc.jpg",
  },
];

function Book(name, year, page, hasRead) {
  this.name = name;
  this.year = year;
  this.page = page;
  this.hasRead = hasRead;
}

Book.prototype.getName = function () {
  return this.name;
};

Book.prototype.getYear = function () {
  return this.year;
};

function addBookToLibrary(bookObject) {
  myLibrary.push(bookObject);
  return true;
}

function createBookObject(bookTitle, bookAuthor, bookPageNumber, bookUrl) {
  return { bookTitle, bookAuthor, bookPageNumber, bookUrl };
}

function toggleHide(e) {
  const eventClassName = e.target.classList[0];

  if (
    eventClassName === "back-overlay" ||
    eventClassName === "add-book-btn" ||
    eventClassName === "red-btn"
  ) {
    createBookPopupElement.classList.toggle("hide");
  }
}

function cardToggleHide(e) {
  e.stopPropagation();
  if (e.target.classList[0] === "card" && e.type === "mouseover") {
    e.target.firstElementChild.classList.toggle("hide");
  }

  if (e.target.classList[0] === "card-btns" && e.type === "mouseout") {
    e.target.classList.toggle("hide");
  }
}

createBookFormBtn.addEventListener("submit", (e) => {
  e.preventDefault();

  const bookTitle = e.target.title.value;
  const bookAuthor = e.target.author.value;
  const bookPageNumber = e.target["page-number"].value;
  const bookUrl = e.target["book-cover"].value;

  const bookObject = createBookObject(
    bookTitle,
    bookAuthor,
    bookPageNumber,
    bookUrl
  );

  addBookToLibrary(bookObject);
  console.log(myLibrary);
});

function createCardElement(cardObject, currentIndex) {
  const cardContainer = document.createElement("div");
  cardContainer.className = "card";
  cardContainer.setAttribute("background", cardObject.bookUrl);
  cardContainer.setAttribute("book-index", currentIndex);

  const cardBtnContainer = document.createElement("div");
  cardBtnContainer.className = "card-btns hide";

  const infoBtn = document.createElement("button");
  infoBtn.textContent = "Info";

  const divider = document.createElement("p");
  divider.textContent = "|";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  cardBtnContainer.appendChild(infoBtn);
  cardBtnContainer.appendChild(divider);
  cardBtnContainer.appendChild(deleteBtn);

  cardContainer.addEventListener("mouseover", cardToggleHide);
  cardContainer.addEventListener("mouseout", cardToggleHide);

  cardContainer.appendChild(cardBtnContainer);

  return cardContainer;
}

// Update Lib List
function updateLibList() {
  myLibrary.forEach((cardObject, index) => {
    midApp.appendChild(createCardElement(cardObject, index));
  });
}

addBookBtn.addEventListener("click", toggleHide);
backOverlay.addEventListener("click", toggleHide);

updateLibList();
